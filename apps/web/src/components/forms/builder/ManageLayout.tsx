import LoadingSpinner from "@/components/LoadingSpinner";
import { persistForm, useForm } from "@/lib/forms";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ColorPicker } from "./ColorPicker";

export default function ManageLayout({}) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, isLoadingForm, isErrorForm, mutateForm } = useForm(
    formId?.toString(),
    organisationId?.toString()
  );

  const setSurveyAttribute = (attribute: string, value: any) => {
    const updatedForm = JSON.parse(JSON.stringify(form));
    if (!updatedForm.schemaDraft?.config) {
      updatedForm.schemaDraft.config = {};
    }
    updatedForm.schemaDraft.config[attribute] = value;
    mutateForm(updatedForm, false);
    persistForm(updatedForm);
    console.log(updatedForm);
  };

  if (isLoadingForm) return <LoadingSpinner />;

  if (isErrorForm) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }

  return (
    <>
      <div className="mx-5 my-4 overflow-hidden overflow-y-auto rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-slate-900">Color Theme</h3>
            <p className="mt-1 text-sm text-slate-500">Choose the colors for your survey.</p>
          </div>
          <ColorPicker name="Primary Color" attribute="colorPrimary" />
          <ColorPicker name="Background Color" attribute="colorBackground" />
          <ColorPicker name="Question Text Color" attribute="colorText" />
          <ColorPicker name="Button Text Color" attribute="colorButtonText" />
        </div>
      </div>
      <div className="mx-5 my-4 rounded-lg bg-white shadow ">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Other</h3>
          </div>
          <div className="my-6">
            <label className="block text-sm font-semibold text-gray-500">
              Roundness <span className="font-normal">(border-radius in REM)</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.5"
              max="3"
              min="0"
              onBlur={(e) => setSurveyAttribute("borderRadius", e.target.value + "REM")}
              defaultValue={form.schemaDraft?.config?.borderRadius.replace("REM", "")}
              className="focus:border-brand-dark my-2 rounded-md border-gray-300"
            />
          </div>
          <div className="my-6">
            <label className="block text-sm font-semibold text-gray-500">Controls</label>
            <div className="mt-2">
              <Switch.Group as="div" className="flex items-center justify-between">
                <span className="flex flex-grow flex-col">
                  <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                    Show progress bar
                  </Switch.Label>
                </span>
                <Switch
                  checked={form.schemaDraft?.config?.progressBar}
                  onChange={() => setSurveyAttribute("progressBar", !form.schemaDraft?.config?.progressBar)}
                  className={clsx(
                    form.schemaDraft?.config?.progressBar ? "bg-pink-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  )}>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      form.schemaDraft?.config?.progressBar ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div className="mt-2">
              <Switch.Group as="div" className="flex items-center justify-between">
                <span className="flex flex-grow flex-col">
                  <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                    Show Back Navigation
                  </Switch.Label>
                </span>
                <Switch
                  checked={form.schemaDraft?.config?.backNavigation}
                  onChange={() =>
                    setSurveyAttribute("backNavigation", !form.schemaDraft?.config?.backNavigation)
                  }
                  className={clsx(
                    form.schemaDraft?.config?.backNavigation ? "bg-pink-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  )}>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      form.schemaDraft?.config?.backNavigation ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div className="mt-2">
              <Switch.Group as="div" className="flex items-center justify-between">
                <span className="flex flex-grow flex-col">
                  <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                    Remove close button
                  </Switch.Label>
                </span>
                <Switch
                  checked={form.schemaDraft?.config?.closeButton}
                  onChange={() => setSurveyAttribute("closeButton", !form.schemaDraft?.config?.closeButton)}
                  className={clsx(
                    form.schemaDraft?.config?.closeButton ? "bg-pink-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  )}>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      form.schemaDraft?.config?.closeButton ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div className="mt-2">
              <Switch.Group as="div" className="flex items-center justify-between">
                <span className="flex flex-grow flex-col">
                  <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                    Text Right-to-Left
                  </Switch.Label>
                </span>
                <Switch
                  checked={form.schemaDraft?.config?.textRTL}
                  onChange={() => setSurveyAttribute("textRTL", !form.schemaDraft?.config?.textRTL)}
                  className={clsx(
                    form.schemaDraft?.config?.textRTL ? "bg-pink-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  )}>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      form.schemaDraft?.config?.textRTL ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
