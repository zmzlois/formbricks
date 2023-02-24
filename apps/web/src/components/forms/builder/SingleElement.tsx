import { getElementType } from "@/lib/elements";
import { persistForm, useForm } from "@/lib/forms";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import InstructionsForm from "./elementTypes/InstructionsType";
import MultipleChoiceForm from "./elementTypes/MultipleChoiceType";
import OpenForm from "./elementTypes/FreeTextType";

import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export function SingleElement({ elementId, activeElementId, setActiveElementId }) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, mutateForm } = useForm(formId?.toString(), organisationId?.toString());

  const setElement = (element, persist = false) => {
    const updatedSchemaDraft: any = JSON.parse(JSON.stringify(form.schemaDraft));
    const idx = updatedSchemaDraft.elements.findIndex((e) => e.id === element.id);
    if (typeof idx !== "undefined") {
      updatedSchemaDraft.elements[idx] = element;
      const updatedForm = JSON.parse(JSON.stringify(form));
      updatedForm.schemaDraft = updatedSchemaDraft;
      mutateForm(updatedForm, false);
      if (persist) {
        persistForm(updatedForm);
      }
    }
  };

  const removeElement = (element) => {
    const updatedSchemaDraft: any = JSON.parse(JSON.stringify(form.schemaDraft));
    const idx = updatedSchemaDraft.elements.findIndex((e) => e.id === element.id);
    if (typeof idx !== "undefined") {
      updatedSchemaDraft.elements.splice(idx, 1);
      const updatedForm = JSON.parse(JSON.stringify(form));
      updatedForm.schemaDraft = updatedSchemaDraft;
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
          elementType.color === "purple"
            ? "bg-purple-100 text-purple-700"
            : elementType.color === "pink"
            ? "bg-pink-100 text-pink-700"
            : elementType.color === "blue"
            ? "bg-blue-100 text-blue-700"
            : elementType.color === "orange"
            ? "bg-amber-100 text-amber-700"
            : "text-slate-700",
          "inline-flex rounded-lg p-2 ring-4 ring-white"
        )}>
        <elementType.icon className="h-5 w-5" aria-hidden="true" />
      </span>
    ) : null;
  };

  const element = useMemo(
    () => form.schemaDraft.elements.find((e) => e.id === elementId),
    [form.schemaDraft.elements, elementId]
  );

  const elementIdx = useMemo(
    () => form.schemaDraft.elements.findIndex((e) => e.id === elementId),
    [form.schemaDraft.elements, elementId]
  );

  return (
    <Draggable draggableId={element.id} index={elementIdx}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            activeElementId === element.id ? "border-brand-dark border-2 border-opacity-50" : "",
            "mb-5 divide-y divide-slate-200 rounded-lg bg-white shadow focus:outline-none"
          )}>
          <div
            className="w-full px-1.5 py-2 focus:outline-none sm:px-6"
            onClick={() => setActiveElementId(element.id)}>
            <div className="flex items-center">
              <div className="flex-shrink-0">{getElementTypeIcon(element.type)}</div>
              <div className="ml-4">
                <h3 className="font-medium leading-6 text-slate-900">
                  {element.label ||
                    (element.type === "open"
                      ? "Open Question"
                      : element.type === "multipleChoice"
                      ? "Multiple Choice"
                      : element.type === "instructions"
                      ? "Instruction"
                      : element.type === "thankyou"
                      ? "Thank You 🤍"
                      : "New Element")}
                </h3>
              </div>
            </div>
          </div>
          {activeElementId === element.id && (
            <div>
              <div className="px-4 py-3">
                {element.type === "open" ? (
                  <OpenForm element={element} setElement={setElement} form={form} />
                ) : element.type === "multipleChoice" ? (
                  <MultipleChoiceForm element={element} setElement={setElement} form={form} />
                ) : element.type === "instructions" ? (
                  <InstructionsForm element={element} setElement={setElement} form={form} />
                ) : null}
              </div>
              <div className="space-x-3 pr-6 pb-2 text-right">
                <button className="text-sm text-slate-400">
                  <ChevronDownIcon className="hover:text-brand-dark inline-block h-4 w-4" />
                </button>
                <button className="text-sm text-slate-400">
                  <ChevronUpIcon className="hover:text-brand-dark inline-block h-4 w-4" />
                </button>
                <button className="text-sm text-slate-400" onClick={() => removeElement(element)}>
                  <TrashIcon className="inline-block h-4 w-4 hover:text-red-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
