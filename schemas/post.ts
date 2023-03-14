import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => [
        Rule.required()
          .min(40)
          .error("Un título de min. Se requieren 10 caracteres"),
        Rule.max(120).warning("Los títulos más cortos suelen ser mejores"),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation:Rule => [
        Rule.required().min(50).error("La descripción de min. Se requieren 15 caracteres"),
        Rule.max(360).error("Se debe tener 50 caracteres como máximo")
      ]
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 120,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: Rule => Rule.required().error("Debe seleccionar un autor")
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Debe de colocar una imagen")
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: Rule => Rule.required().length(1)
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
