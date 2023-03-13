import Link from "next/link";

const categories = [
  {
    name: "Policiales",
    slug: "/category/policiales",
  },
  {
    name: "Quilmes",
    slug: "/category/quilmes",
  },
  {
    name: "Quilmes Oeste",
    slug: "/category/quilmes-oeste",
  },
  {
    name: "Solano",
    slug: "/category/solano",
  },
  {
    name: "Florencio Varela",
    slug: "/category/florencio-varela",
  },
  {
    name: "Almirante Brown",
    slug: "/category/almirante-brown",
  },
];

export const Navbar = () => {
  return (
    <div className=" bg-white z-40 shadow-md">
      <div className="container mx-auto px-6">
        <header className="min-h-24">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="w-full lg:w-4/12 mt-4 lg:m-0 flex items-center">
              <span className="text-3xl font-bold">
                <Link href="/">Diario San Francisco</Link>
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <nav className="flex-1 my-4">
                <ul className="flex justify-center flex-wrap lg:justify-end space-x-3 md:space-x-6">
                  {categories.map((category) => (
                    <li
                      key={category.slug}
                      className="text-base md:text-lg font-semibold cursor-pointer"
                    >
                      <Link href={category.slug}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
