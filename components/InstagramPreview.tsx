import { InstagramEmbed } from "react-social-media-embed/dist/components/embeds/InstagramEmbed";

export const InstagramPreview = (props:any) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url={props.url}
        width={328}
      />
    </div>
  );
};
