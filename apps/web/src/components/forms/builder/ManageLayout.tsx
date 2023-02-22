import LoadingSpinner from "@/components/LoadingSpinner";
import { persistForm, useForm } from "@/lib/forms";
import { useRouter } from "next/router";
import { TwitterPicker } from "react-color";

export default function ManageLayout({}) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, isLoadingForm, isErrorForm, mutateForm } = useForm(
    formId?.toString(),
    organisationId?.toString()
  );

  const setPrimaryColor = (color) => {
    const updatedForm = JSON.parse(JSON.stringify(form));
    if (!updatedForm.schemaDraft?.config) {
      updatedForm.schemaDraft.config = {};
    }
    updatedForm.schemaDraft.config.colorPrimary = color;
    mutateForm(updatedForm, false);
    persistForm(updatedForm);
  };

  if (isLoadingForm) return <LoadingSpinner />;

  if (isErrorForm) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }

  return (
    <div className="mx-5 my-4 overflow-hidden overflow-y-auto rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Color Theme</h3>
          <p className="mt-1 text-sm text-gray-500">Choose the colors for your survey.</p>
        </div>
        <div className="my-6">
          <label className="block text-sm font-medium text-gray-700">Primary Color</label>
          <TwitterPicker
            color={form.schemaDraft?.config?.colorPrimary}
            onChangeComplete={(color) => setPrimaryColor(color.hex)}
            triangle={"hide"}
            className="my-2"
          />
        </div>
      </div>
    </div>
  );
}
