"use client"
import { Post as IPost } from "@/interfaces";
import Link from "next/link";
import React, { createContext } from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  post: IPost;
}

export const PostContext = createContext({} as IPost);
const { Provider } = PostContext;

export const Post = ({ children, post }: Props) => {
  return (
    <Provider value={post}>
      <Link href={`/post/${post.slug}`}>{children}</Link>
    </Provider>
  );
};