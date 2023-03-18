import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  routes?: { path: string; name: string }[];
  currentPage: string;
};
export const Breadcrumbs = ({ routes, currentPage }: Props) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <div className="container mx-auto">
        <ol className="inline-flex items-center mb-3 space-x-1 md:space-x-3 sm:mb-0">
          <li>
            <div className="flex items-center">
              <Link href="/" className="ml-1 text-sm font-medium text-red-300">
                Diario
              </Link>
            </div>
          </li>
          { routes &&  routes.map((route) => (
            <li key={route.name}>
              <div className="flex items-center">
                <ChevronRightIcon className="w-4 h-4" />
                <Link
                  href={route.path}
                  className="ml-1 text-sm font-medium text-red-300"
                >
                  {route.name}
                </Link>
              </div>
            </li>
          ))}
          {currentPage && (
            <li className="text-gray-400 text-sm">
              <div className="flex items-center">
                <ChevronRightIcon className="w-4 h-4" />
                {currentPage}
              </div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};
