"use client";
import { useContext } from "react";
import { PostContext } from "./Post";

export const PostTitle = () => {
  const { title } = useContext(PostContext);
  return <h2 className="text-xl font-bold line-clamp-2">{title}</h2>;
};
