import { InstagramPreview } from "@/components";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "instagramPost",
  title: "instagram post",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Visit an Instagram post in a browser and copy the URL.",
    }),
  ],
  preview: {
    select: { url: "url" },
  },
  components: {
    preview: InstagramPreview,
  },
});
