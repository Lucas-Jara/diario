"use client"
import { BlogList } from "./BlogList";
import { usePreview } from "../lib/sanity.preview";
import Link from "next/link";

type Props = { query: string, queryParams: {[key: string]: any} }

export const PreviewBlogList = ({ query,queryParams }: Props) => {
  console.log({ query,queryParams });
  
  const posts = usePreview(null, query, queryParams);
  return (
    <>
      <BlogList categories={posts}  />
      <Link
        className="bg-blue-500 p-6 text-white font-bold fixed bottom-0 right-0"
        href="/api/exit-preview"
      >
        Exit Preview
      </Link>
    </>
  )
};
