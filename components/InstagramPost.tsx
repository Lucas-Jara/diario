"use client"
import { InstagramEmbed } from "react-social-media-embed"

export const InstagramPost = ({url}:{url:string}) => {
  return (
    <div className="max-w-2xl mx-auto m-6">
      <InstagramEmbed
        url={url}
        width="100%"
      />
    </div>
  )
}
