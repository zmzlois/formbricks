import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddElementModal from "./AddElementModal";
import { useRouter } from "next/router";
import { persistForm, useForm } from "@/lib/forms";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SingleElement } from "./SingleElement";

export default function ManageElements({ activeElementId, setActiveElementId }) {
  const router = useRouter();
  const { formId, organisationId } = router.query;
  const { form, isLoadingForm, isErrorForm, mutateForm } = useForm(
    formId?.toString(),
    organisationId?.toString()
  );
  const [showElementModal, setShowElementModal] = useState(false);

  const addElement = async (type) => {
    const updatedSchemaDraft = JSON.parse(JSON.stringify(form.schemaDraft));
    const element: any = {
      id: uuidv4(),
      type,
      name: uuidv4(),
      label: "",
    };
    if (type === "multipleChoice") {
      element.options = "";
    }
    if (!("elements" in updatedSchemaDraft)) {
      updatedSchemaDraft.elements = [];
    }
    updatedSchemaDraft.elements.push(element);
    const updatedForm = { ...form, schemaDraft: updatedSchemaDraft };
    await persistForm(updatedForm);
    mutateForm(updatedForm, false);
    setActiveElementId(element.id);
  };

  // Drag & Drop
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const updatedElements = reorder(form.schemaDraft.elements, result.source.index, result.destination.index);
    const updatedForm = { ...form, schemaDraft: { ...form.schema, elements: updatedElements } };
    mutateForm(updatedForm, false);
    persistForm(updatedForm);
  };

  if (isLoadingForm) return <LoadingSpinner />;

  if (isErrorForm) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }

  return (
    <>
      <div className="h-full min-h-screen overflow-y-auto bg-gray-100 px-5 py-5 shadow-inner">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {form.schemaDraft.elements?.map((element, elementIdx) => (
                  <SingleElement
                    key={elementIdx}
                    elementId={element.id}
                    activeElementId={activeElementId}
                    setActiveElementId={setActiveElementId}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="w-full border-t border-gray-200">
        <button
          type="button"
          className="w-full content-center bg-pink-600 px-4 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none"
          onClick={() => setShowElementModal(true)}>
          + Add Element
        </button>
      </div>
      <AddElementModal open={showElementModal} setOpen={setShowElementModal} addElement={addElement} />
    </>
  );
}
