import LoadingSpinner from "@/components/LoadingSpinner";
import { persistForm, useForm } from "@/lib/forms";
import { useEffect, useState } from "react";
import ManageElements from "./ManageElements";
import ManageLayout from "./ManageLayout";
import SidebarTabs from "./SidebarTabs";
import { useRouter } from "next/router";

const sidebarTabs = [
  { name: "Elements", id: "elements" },
  { name: "Layout", id: "layout" },
];

export default function Builder({}) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, isLoadingForm, isErrorForm, mutateForm } = useForm(
    formId?.toString(),
    organisationId?.toString()
  );
  const [activeElementId, setActiveElementId] = useState<string>(null);
  const [sidebarMode, setSidebarMode] = useState(sidebarTabs[0].id);

  useEffect(() => {
    if (!isLoadingForm && !form.schemaDraft) {
      const updatedForm = { ...form, schemaDraft: { ...form.schema } };
      mutateForm(updatedForm, false);
      persistForm(updatedForm);
    }
  }, [isLoadingForm]);

  if (isLoadingForm || !form.schemaDraft) return <LoadingSpinner />;

  if (isErrorForm) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }

  const getActiveElementCard = () => {
    if (activeElementId === null) return null;
    return <div>Preview Survey (TODO)</div>;
  };
  return (
    <div className="flex flex-1 items-stretch overflow-hidden">
      <main className="flex w-full flex-col border-r border-gray-200 bg-gray-100 md:w-1/3">
        <h1 id="primary-heading" className="sr-only">
          Manage Questions
        </h1>
        <SidebarTabs tabs={sidebarTabs} state={sidebarMode} setState={setSidebarMode} />
        {sidebarMode === "elements" && (
          <ManageElements activeElementId={activeElementId} setActiveElementId={setActiveElementId} />
        )}
        {sidebarMode === "layout" && <ManageLayout />}
      </main>
      <aside className="hidden flex-1 overflow-y-auto md:block" style={{ pointerEvents: "none" }}>
        {/* Primary column */}
        <section
          aria-labelledby="primary-heading"
          className="relative flex h-full min-w-0 flex-1 flex-col justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 py-12 shadow-inner sm:px-6 lg:order-last lg:px-8">
          <div className="absolute right-4 bottom-4">
            <span className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-1.5 text-lg font-medium text-gray-500">
              Element Preview
            </span>
          </div>
          <h1 id="primary-heading" className="sr-only">
            Element Preview
          </h1>

          <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-2xl">{getActiveElementCard()}</div>
        </section>
      </aside>
    </div>
  );
}
