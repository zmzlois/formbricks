"use client";

import { PMFIcon, FeedbackIcon, UserCommentIcon } from "@formbricks/ui";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useForms } from "@/lib/forms";
import { useOrganisation } from "@/lib/organisations";
import { useRouter } from "next/router";
import { createForm } from "@/lib/forms";
import { Button } from "@formbricks/ui";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import DummyPMF from "./DummyPMF";
import DummyFeedbackBox from "./DummyFeedbackBox";

export default function TemplatesPage({ organisationId }) {
  const router = useRouter();
  const { isLoadingForms, isErrorForms } = useForms(router.query.organisationId?.toString());

  const [label, setLabel] = useState("");
  const [formType, setFormType] = useState("feedback");
  const { organisation, isLoadingOrganisation, isErrorOrganisation } = useOrganisation(organisationId);

  function handleChange(value) {
    setFormType(value);
    if (value === "feedback") {
      setLabel("Feedback Box");
    } else if (value === "pmf") {
      setLabel("Product-Market Fit Survey");
    } else if (value === "custom") {
      setLabel("Custom Survey");
    } else {
      setLabel("New Survey");
    }
  }

  const formTypes = useMemo(
    () => [
      {
        id: "feedback",
        name: "Feedback Box",
        description: "A direct channel to feel the pulse of your users.",
        icon: FeedbackIcon,
      },
      {
        id: "pmf",
        name: "Product-Market Fit Survey",
        description: "Leverage the Superhuman PMF engine.",
        icon: PMFIcon,
        needsUpgrade: process.env.NEXT_PUBLIC_IS_FORMBRICKS_CLOUD && organisation?.plan === "free",
      },
      {
        id: "custom",
        name: "Custom Survey",
        description: "Create and analyze your custom survey.",
        icon: UserCommentIcon,
      },
    ],
    [organisation]
  );

  const createFormAction = async (e) => {
    e.preventDefault();
    let formTemplate;
    if (formType === "feedback") {
      formTemplate = {
        label,
        type: "feedback",
        schema: {
          schemaVersion: 1,
          config: {},
          pages: [
            {
              id: "feedbackTypePage",
              elements: [
                {
                  type: "radio",
                  name: "feedbackType",
                  label: "What's on your mind?",
                  options: [
                    { label: "Idea", value: "idea" },
                    { label: "Compliment", value: "compliment" },
                    { label: "Bug", value: "bug" },
                  ],
                },
              ],
            },
            {
              id: "messagePage",
              elements: [
                {
                  type: "textarea",
                  name: "message",
                  label: "What's your feedback?",
                },
              ],
            },
            {
              id: "thankYouPage",
              endScreen: true,
              elements: [
                {
                  type: "html",
                  name: "thankYou",
                },
              ],
            },
          ],
        },
      };
    } else if (formType === "custom") {
      formTemplate = {
        label,
        type: "custom",
      };
    } else if (formType === "pmf") {
      formTemplate = {
        label,
        type: "pmf",
        schema: {
          schemaVersion: 1,
          config: {},
          pages: [
            {
              id: "disappointmentPage",
              config: {
                autoSubmit: true,
              },
              elements: [
                {
                  id: "disappointment",
                  type: "radio",
                  name: "disappointment",
                  label: "How disappointed would you be if you could no longer use our service?",
                  options: [
                    { label: "Very disappointed", value: "veryDisappointed" },
                    { label: "Somewhat disappointed", value: "somewhatDisappointed" },
                    { label: "Not disappointed", value: "notDisappointed" },
                  ],
                },
              ],
            },
            {
              id: "mainBenefitPage",
              elements: [
                {
                  id: "mainBenefit",
                  type: "text",
                  name: "mainBenefit",
                  label: "What is the main benefit you receive from our service?",
                },
              ],
            },
            {
              id: "rolePage",
              config: {
                autoSubmit: true,
              },
              elements: [
                {
                  id: "role",
                  type: "radio",
                  name: "role",
                  label: "What is your role?",
                  options: [
                    { label: "Founder", value: "founder" },
                    { label: "Executive", value: "executive" },
                    { label: "Product Manager", value: "productManager" },
                    { label: "Product Owner", value: "productOwner" },
                    { label: "Software Engineer", value: "softwareEngineer" },
                  ],
                },
              ],
            },
            {
              id: "improvementPage",
              elements: [
                {
                  id: "improvement",
                  type: "text",
                  name: "improvement",
                  label: "How can we improve our service for you?",
                },
              ],
            },
            {
              id: "benefitingUsers",
              elements: [
                {
                  id: "benefitingUsers",
                  type: "text",
                  name: "benefitingUsers",
                  label: "What type of people would benefit most from using our service?",
                },
              ],
            },
            {
              id: "thankYouPage",
              endScreen: true,
              elements: [
                {
                  id: "thankYou",
                  type: "html",
                  name: "thankYou",
                },
              ],
            },
          ],
        },
      };
    } else {
      throw new Error("Unknown form type");
    }
    const form = await createForm(organisationId, formTemplate);
    router.push(`/organisations/${organisationId}/forms/${form.id}/${form.type}/`);
  };

  if (isLoadingForms || isLoadingOrganisation) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorForms || isErrorOrganisation) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }
  return (
    <div className="max-w-4xl py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
          Templates
          <span className="ml-4 inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-500">
            {organisation.name}
          </span>
        </h1>
      </header>

      <div className="">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form
            onSubmit={(e) => createFormAction(e)}
            className="inline-block w-full transform overflow-hidden p-2 text-left align-bottom transition-all sm:align-middle">
            {/* <div>
              <label htmlFor="email" className="text-sm font-light text-slate-800">
                Name your form
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="label"
                  className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                  placeholder="e.g. Feedback Box App"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div> */}
            <div className="grid grid-cols-5 gap-x-10">
              <div className="col-span-2">
                <RadioGroup value={formType} onChange={handleChange}>
                  {/*               <RadioGroup.Label className="text-sm font-light text-slate-800">
                Choose your form type
              </RadioGroup.Label> */}
                  <div className="space-y-4">
                    {formTypes.map((formType) => (
                      <div key={formType.name}>
                        <RadioGroup.Option
                          disabled={formType.needsUpgrade}
                          value={formType.id}
                          className={({ checked, active, disabled }) =>
                            clsx(
                              checked ? "border-transparent" : "border-slate-300",
                              active ? "border-brand ring-brand ring-2" : "",
                              disabled ? "bg-slate-100" : "bg-white",
                              "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex"
                            )
                          }>
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Description
                                as="span"
                                className="mt-2 mr-3 flex text-sm sm:mt-0 sm:flex-col sm:text-right">
                                <formType.icon className="h-8 w-8" />
                              </RadioGroup.Description>
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label as="span" className="font-medium text-slate-900">
                                    {formType.name}
                                  </RadioGroup.Label>
                                </span>
                              </span>

                              <span
                                className={clsx(
                                  active ? "border" : "border-2",
                                  checked ? "border-brand" : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-3">
                {formType === "feedback" && (
                  <div>
                    <h3 className="font-slate-700 mb-2 text-2xl font-bold text-slate-700">Feedback Box</h3>
                    <p className="text-slate-500">Feel the pulse of your user base:</p>
                    <div className="mt-4 flex h-80 items-end rounded-lg border-2 border-slate-300">
                      {/* <DummyFeedbackBox /> */}
                    </div>
                  </div>
                )}
                {formType === "pmf" && (
                  <div>
                    <h3 className="font-slate-700 mb-2 text-2xl font-bold text-slate-700">
                      Product-Market Fit Survey
                    </h3>
                    <p className="text-slate-500">Measure your Product-Market Fit continuously:</p>

                    <DummyPMF />
                  </div>
                )}
                {formType === "custom" && (
                  <div>
                    <h3 className="font-slate-700 mb-2 text-2xl font-bold text-slate-700">Custom Survey</h3>
                    <p className="text-slate-500">Freely set questions and answer options.</p>
                    <div className="mt-4 flex h-80 items-center justify-center rounded-lg bg-slate-100 font-semibold text-transparent/20">
                      Imagine your survey here 🌈
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 sm:mt-2">
              <Button type="submit" className="float-right">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
