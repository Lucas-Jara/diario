"use client"
import { useContext } from "react";
import { PostContext } from "./Post";

export const PostDescription = () => {
  const { description } = useContext(PostContext);
  return <p className="line-clamp-3">{description}</p>;
};
