import EmptyPageFiller from "@/components/EmptyPageFiller";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useForm } from "@/lib/forms";
import { MergeWithSchema, persistSubmission, useSubmissions } from "@/lib/submissions";
import { convertDateTimeString, parseUserAgent, timeSince } from "@/lib/utils";
import { Button, CheckMarkIcon, ClockIcon } from "@formbricks/ui";
import { InboxIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function PMFTimeline({ submissions }) {
  const router = useRouter();

  const {
    submissions: allSubmissions,
    mutateSubmissions,
    isLoadingSubmissions,
    isErrorSubmissions,
  } = useSubmissions(router.query.organisationId?.toString(), router.query.formId?.toString());

  const { form, isLoadingForm, isErrorForm } = useForm(
    router.query.formId?.toString(),
    router.query.organisationId?.toString()
  );

  const toggleArchiveSubmission = (submission) => {
    const updatedSubmission = JSON.parse(JSON.stringify(submission));
    updatedSubmission.archived = !updatedSubmission.archived;
    // save submission without customer
    const submissionWoCustomer = { ...updatedSubmission };
    delete submissionWoCustomer.customer;
    persistSubmission(submissionWoCustomer, router.query.organisationId?.toString());
    // update all submissions
    const submissionIdx = allSubmissions.findIndex((s) => s.id === submission.id);
    const updatedSubmissions = JSON.parse(JSON.stringify(allSubmissions));
    updatedSubmissions[submissionIdx] = updatedSubmission;
    mutateSubmissions(updatedSubmissions, false);
    if (updatedSubmission.archived) {
      toast.success("Submission archived");
    } else {
      toast.success("Submission restored");
    }
  };

  if (isLoadingForm || isLoadingSubmissions) return <LoadingSpinner />;

  if (isErrorForm || isErrorSubmissions) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {submissions.length === 0 ? (
          <EmptyPageFiller
            alertText="There are no submission matching this filter."
            hintText="Try changing the filter or wait for new submissions."
            borderStyles="border-4 border-dotted border-red">
            <InboxIcon className="stroke-thin mx-auto h-24 w-24 text-slate-300" />
          </EmptyPageFiller>
        ) : (
          <>
            {submissions.map((submission, submissionIdx) => (
              <li key={submission.id}>
                <div className="relative pb-8">
                  {submissionIdx !== submissions.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={clsx(
                          "bg-white",
                          "flex h-8 w-8 items-center justify-center rounded-full ring ring-gray-50"
                        )}>
                        {submission.finished ? (
                          <CheckMarkIcon className="h-7 w-7" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="h-7 w-7" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                    <div className="w-full overflow-hidden rounded-lg bg-white shadow">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex w-full justify-between">
                          {submission.data.disappointment === "veryDisappointed" ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Very disappointed
                            </span>
                          ) : submission.data.disappointment === "notDisappointed" ? (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Not disappointed
                            </span>
                          ) : submission.data.disappointment === "somewhatDisappointed" ? (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Somewhat disappointed
                            </span>
                          ) : null}

                          <div className="text-sm text-gray-400">
                            <time dateTime={convertDateTimeString(submission.createdAt)}>
                              {
                                //check if date is older than 14 days, if so show convertDateTimeString if not use timeSince
                                new Date().getTime() - new Date(submission.createdAt).getTime() >
                                14 * 24 * 60 * 60 * 1000
                                  ? convertDateTimeString(submission.createdAt)
                                  : timeSince(submission.createdAt)
                              }
                            </time>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ul className="whitespace-pre-wrap text-sm text-gray-500">
                            {Object.entries(MergeWithSchema(submission.data, form.schema)).map(
                              ([key, value]) => (
                                <li key={key} className="py-5">
                                  <p className="text-sm font-semibold text-gray-800">{key}</p>
                                  <p
                                    className={clsx(
                                      value ? "text-gray-600" : "text-gray-400",
                                      "whitespace-pre-line pt-1 text-sm text-gray-600"
                                    )}>
                                    {value.toString()}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className=" bg-gray-50 p-4 sm:p-6">
                        <div className="flex w-full justify-between gap-4">
                          <div>
                            <p className="text-sm font-thin text-gray-500">User</p>
                            {submission.customerEmail ? (
                              <Link
                                className="text-sm font-medium text-gray-700"
                                href={`${form.id.startsWith("demo") ? "/demo" : ""}/organisations/${
                                  router.query.organisationId
                                }/customers/${submission.customerEmail}`}>
                                {submission.customerEmail}
                              </Link>
                            ) : (
                              <p className="text-sm text-gray-500">Anonymous</p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-thin text-gray-500">Device</p>
                            <p className="text-sm text-gray-500">
                              {parseUserAgent(submission.meta.userAgent)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex w-full justify-end">
                          {!submission.archived ? (
                            <button
                              className="text-base text-gray-500 underline"
                              onClick={() => toggleArchiveSubmission(submission)}>
                              Archive
                            </button>
                          ) : (
                            <button
                              className="text-base text-gray-500 underline"
                              onClick={() => toggleArchiveSubmission(submission)}>
                              Restore
                            </button>
                          )}
                          {submission.customerEmail && (
                            <Button
                              variant="primary"
                              href={`mailto:${submission.customerEmail}`}
                              className="ml-4">
                              Send Email
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
