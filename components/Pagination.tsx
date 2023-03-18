import { ArrowLeftIcon, ArrowRightIcon } from "@sanity/icons";

export const Pagination = () => {
  return (
    <div className="m-6 flex justify-center">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Mostrando{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
          /{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10
          </span>{" "}
          de{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <ArrowLeftIcon className="text-white w-8 h-8" />
            Prev
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
            <ArrowRightIcon className="text-white w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
