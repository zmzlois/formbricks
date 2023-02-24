"use client";

import { deleteForm, useForms } from "@/lib/forms";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSpinner from "../LoadingSpinner";
import FormContextMenu from "./FormContextMenu";

export default function FormsList({ organisationId }) {
  const { forms, isLoadingForms, mutateForms } = useForms(organisationId);

  const router = useRouter();

  const deleteFormAction = async (formId) => {
    try {
      await deleteForm(organisationId, formId);
      const formIdx = forms.findIndex((form) => form.id === formId);
      const updatedForms = JSON.parse(JSON.stringify(forms));
      updatedForms.splice(formIdx, 1);
      mutateForms(updatedForms);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingForms) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="h-full">
        <ul className="grid grid-cols-2 place-content-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 ">
          <Link href={`/organisations/${router.query.organisationId}/templates`}>
            <li className="col-span-1 h-56">
              <div className="from-brand-light to-brand-dark delay-50 flex h-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-b font-light text-white shadow transition ease-in-out hover:scale-105">
                <div className="px-4 py-8 sm:p-14 xl:p-10">
                  <PlusIcon className="stroke-thin mx-auto h-14 w-14" />
                  create form
                </div>
              </div>
            </li>
          </Link>
          {forms
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((form) => (
              <li key={form.id} className="relative col-span-1 h-56">
                <div className="delay-50 flex h-full flex-col justify-between rounded-md bg-white shadow transition ease-in-out hover:scale-105">
                  <div className="p-6">
                    <p className="line-clamp-3 text-lg">{form.label}</p>
                  </div>
                  <Link
                    href={`/organisations/${organisationId}/forms/${form.id}/${form.type}/`}
                    className="absolute h-full w-full"></Link>
                  <div className="divide-y divide-slate-100 ">
                    <div className="flex justify-between px-4 py-2 text-right sm:px-6">
                      <p className="text-xs text-slate-400 ">{form._count?.submissions} submissions</p>
                      <FormContextMenu
                        formId={form.id}
                        organisationId={organisationId}
                        delete={deleteFormAction}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
