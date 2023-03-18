"use client"
import { urlFor } from "@/lib/urlFor";
import NextImage from "next/image";
import { useContext } from "react";
import { PostContext } from "./Post";

export const PostImage = () => {
  const { mainImage,title } = useContext(PostContext);
  return (
    <div className="relative w-full h-72">
      <NextImage
        src={urlFor(mainImage).url()}
        alt={`${title}`}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={urlFor(mainImage).blur(50).url()}
      />
    </div>
  );
};
