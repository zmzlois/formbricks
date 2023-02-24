import { elementTypes } from "@/lib/elements";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

export default function AddElementModal({ open, setOpen, addElement }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 z-10 overflow-y-auto" open={open} onClose={setOpen}>
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block transform overflow-hidden rounded-lg bg-slate-200 text-left align-bottom shadow-xl transition-all sm:w-full sm:max-w-sm sm:align-middle lg:max-w-xl">
              <div className="divide-y divide-slate-200 overflow-hidden shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 lg:grid-cols-2">
                {elementTypes.map((elementType, elementTypeIdx) => (
                  <div
                    key={elementType.title}
                    className={clsx(
                      elementTypeIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
                      elementTypeIdx === 1 ? "sm:rounded-tr-lg" : "",
                      elementTypeIdx === elementTypes.length - 2 ? "sm:rounded-bl-lg" : "",
                      elementTypeIdx === elementTypes.length - 1
                        ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                        : "",
                      "group relative bg-white p-6 focus:outline-none"
                    )}>
                    <div>
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
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium">
                        <button
                          onClick={() => {
                            setOpen(false);
                            addElement(elementType.type);
                          }}
                          className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span className="absolute inset-0" aria-hidden="true" />
                          {elementType.title}
                        </button>
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">{elementType.description}</p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-slate-300 group-hover:text-slate-400"
                      aria-hidden="true">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
