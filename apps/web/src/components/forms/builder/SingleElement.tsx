import { getElementType } from "@/lib/elements";
import { persistForm, useForm } from "@/lib/forms";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Draggable } from "react-beautiful-dnd";
import InstructionsForm from "./elementForms/InstructionsForm";
import MultipleChoiceForm from "./elementForms/MultipleChoiceForm";
import OpenForm from "./elementForms/OpenForm";

export function SingleElement({ element, elementIdx, activeElementId, setActiveElementId }) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, mutateForm } = useForm(formId?.toString(), organisationId?.toString());

  const setElement = (element, persist = false) => {
    const updatedSchemaDraft: any = [...form.schemaDraft];
    const idx = updatedSchemaDraft.elements.findIndex((e) => e.id === element.id);
    if (typeof idx !== "undefined") {
      updatedSchemaDraft.elements[idx] = element;
      const updatedForm = { ...form, schemaDraft: updatedSchemaDraft };
      mutateForm(updatedForm, false);
      if (persist) {
        persistForm(updatedForm);
      }
    }
  };

  const removeElement = (element) => {
    const updatedSchemaDraft: any = [...form.schemaDraft];
    const idx = updatedSchemaDraft.elements.findIndex((e) => e.id === element.id);
    if (typeof idx !== "undefined") {
      updatedSchemaDraft.elements.splice(idx, 1);
      const updatedForm = { ...form, schemaDraft: updatedSchemaDraft };
      setActiveElementId(null);
      mutateForm(updatedForm, false);
      persistForm(updatedForm);
    }
  };

  const getElementTypeIcon = (type) => {
    const elementType = getElementType(type);
    return elementType ? (
      <span
        className={clsx(
          `text-${elementType.color}-700`,
          `bg-${elementType.color}-50`,
          "inline-flex rounded-lg p-3 ring-4 ring-white"
        )}>
        <elementType.icon className="h-4 w-4" aria-hidden="true" />
      </span>
    ) : null;
  };

  const getElementForm = (type, element, setElement) => {
    if (type === "open") {
      return <OpenForm element={element} setElement={setElement} form={form} />;
    } else if (type === "multipleChoice") {
      return <MultipleChoiceForm element={element} setElement={setElement} form={form} />;
    } else if (type === "instructions") {
      return <InstructionsForm element={element} setElement={setElement} form={form} />;
    }
  };
  return (
    <Draggable key={element.id} draggableId={element.id} index={elementIdx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            activeElementId === element.id ? "border-2 border-pink-400 border-opacity-50" : "",
            "mb-5 divide-y divide-gray-200 rounded-lg bg-white shadow focus:outline-none"
          )}>
          <div
            className="w-full px-4 py-5 focus:outline-none sm:px-6"
            onClick={() => setActiveElementId(element.id)}>
            <div className="flex items-center">
              <div className="flex-shrink-0">{getElementTypeIcon(element.type)}</div>
              <div className="ml-4">
                <h3 className="text-md font-medium leading-6 text-gray-900">
                  {element.data.question || element.data.title || "New Element"}
                </h3>
              </div>
            </div>
          </div>
          {activeElementId === element.id && (
            <div>
              <div className="px-4 py-5 sm:p-6">{getElementForm(element.type, element, setElement)}</div>
              <div className="pr-2 pb-2 text-right ">
                <button
                  className="text-sm text-gray-400 hover:underline"
                  onClick={() => removeElement(element)}>
                  Remove Element
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
