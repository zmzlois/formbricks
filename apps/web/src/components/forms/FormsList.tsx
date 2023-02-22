"use client";

import { deleteForm, useForms } from "@/lib/forms";
import { Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function FormsList({ organisationId }) {
  const { forms, mutateForms, isLoadingForms } = useForms(organisationId);

  const router = useRouter();

  const deleteFormAction = async (form, formIdx) => {
    try {
      await deleteForm(organisationId, form.id);
      // remove locally
      const updatedForms = JSON.parse(JSON.stringify(forms));
      updatedForms.splice(formIdx, 1);
      mutateForms(updatedForms);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingForms) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="h-full">
        <ul className="grid grid-cols-2 place-content-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 ">
          <Link href={`/organisations/${router.query.organisationId}/templates`}>
            <li className="col-span-1 h-56">
              <div className="from-brand-light to-brand-dark delay-50 flex h-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-b font-light text-white shadow transition ease-in-out hover:scale-105">
                <div className="px-4 py-8 sm:p-14 xl:p-10">
                  <PlusIcon className="stroke-thin mx-auto h-14 w-14" />
                  create form
                </div>
              </div>
            </li>
          </Link>
          {forms
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((form, formIdx) => (
              <li key={form.id} className="relative col-span-1 h-56">
                <div className="delay-50 flex h-full flex-col justify-between rounded-md bg-white shadow transition ease-in-out hover:scale-105">
                  <div className="p-6">
                    <p className="line-clamp-3 text-lg">{form.label}</p>
                  </div>
                  <Link
                    href={`/organisations/${organisationId}/forms/${form.id}/${form.type}/`}
                    className="absolute h-full w-full"></Link>
                  <div className="divide-y divide-slate-100 ">
                    <div className="flex justify-between px-4 py-2 text-right sm:px-6">
                      <p className="text-xs text-slate-400 ">{form._count?.submissions} submissions</p>
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
                                        onClick={() => {
                                          if (
                                            confirm(
                                              "Are you sure you want to delete this form? This also deletes all submissions that are captured with this form. This action cannot be undone."
                                            )
                                          ) {
                                            deleteFormAction(form, formIdx);
                                          }
                                        }}
                                        className={clsx(
                                          active ? "text-ui-black rounded-sm bg-slate-100" : "text-slate-800",
                                          "flex w-full px-4 py-2 text-sm"
                                        )}>
                                        <TrashIcon
                                          className="mr-3 h-5 w-5 text-slate-800"
                                          aria-hidden="true"
                                        />
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
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
