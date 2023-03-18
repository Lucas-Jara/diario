import { defineField, defineType } from "sanity";

export default defineType({
  name: "ads",
  title: "Ads",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "whatsapp", title: "Whatsapp", type: "url" },
      ],
    }),
  ],
});
