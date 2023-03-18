"use client"
import Link from "next/link";
import { useContext } from "react";
import { PostContext } from "./Post";

export const PostCategories = () => {
  const { categories } = useContext(PostContext);

  return (
    <div className="my-3">
      {categories.map((category) => (
        <span
          key={category._id}
          className="bg-slate-700 text-sm font-semibold text-white rounded-md px-3 py-2"
        >
          <Link href={`/category/${category.slug}`}>{category.title}</Link>
        </span>
      ))}
    </div>
  );
};
