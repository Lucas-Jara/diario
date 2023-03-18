"use client"
import { urlFor } from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PostDate } from "../PostDate";
import { PostContext } from "./Post";

export const PostAuthor = () => {
  const { author, publishedAt } = useContext(PostContext);
  return (
    <div className="flex items-center space-x-3">
      <Link href={`/author/${author.slug}`}>
        <Image
          src={urlFor(author.image).url()}
          alt={`${author.name}`}
          className="object-cover rounded-full grow-0"
          width={40}
          height={40}
        />
      </Link>
      <div className="grow flex flex-col">
        <span className="text-lg">
          <Link href={`/author/${author.slug}`}>{author.name}</Link>
        </span>
        <PostDate dateString={publishedAt} />
      </div>
    </div>
  );
};
