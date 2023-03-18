"use client";
import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UIContext } from "@/context";

export const MenuSidebar = () => {
  const { onToggleMenu, isMenuSidebarOpen } = useContext(UIContext);

  return (
    <Transition.Root show={isMenuSidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onToggleMenu}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="p-4 flex h-full flex-col space-y-4 overflow-y-scroll bg-white py-6 shadow-xl">
                    <h2 className="self-start text-2xl font-bold">
                      Diario San Francisco
                    </h2>
                    <div className="relative6 flex-1">
                      {/* Replace with your content */}
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
