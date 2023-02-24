import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { deleteForm, useForms } from "@/lib/forms";

export default function FormContextMenu({ formId, organisationId, delete }) {
  const { forms, mutateForms } = useForms(organisationId);

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

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="text-red -m-2 flex items-center rounded-full p-2">
              <span className="sr-only">Open options</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              static
              className="absolute left-0 mt-2 w-56 origin-top-right rounded-sm bg-white px-1 shadow-lg">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={delete}
                      className={clsx(
                        active ? "text-ui-black rounded-sm bg-slate-100" : "text-slate-800",
                        "flex w-full px-4 py-2 text-sm"
                      )}>
                      <TrashIcon className="mr-3 h-5 w-5 text-slate-800" aria-hidden="true" />
                      <span>Delete Form</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
