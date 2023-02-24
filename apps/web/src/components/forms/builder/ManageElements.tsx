import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddElementModal from "./AddElementModal";
import { useRouter } from "next/router";
import { persistForm, useForm } from "@/lib/forms";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SingleElement } from "./SingleElement";
import { Button } from "@formbricks/ui";
import { PlusIcon } from "@heroicons/react/24/outline";

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
      <div className="h-full overflow-y-auto bg-slate-100 px-5 py-5 shadow-inner">
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
        <Button variant="primary" type="button" className="py-3" onClick={() => setShowElementModal(true)}>
          Add Question <PlusIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <AddElementModal open={showElementModal} setOpen={setShowElementModal} addElement={addElement} />
    </>
  );
}
