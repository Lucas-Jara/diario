"use client"
import getYouTubeId from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export const YouTubePreview = (props: any) => {
  const { url } = props;
  if (!url) {
    return <div>Missing YouTube URL</div>;
  }
  const id = getYouTubeId(url);
  return (
    <div className="max-w-2xl mx-auto">
      <LiteYouTubeEmbed title="YouTube video" id={`${id}`} />
    </div>
  );
};
