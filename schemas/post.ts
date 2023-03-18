import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Posteos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule) => [
        Rule.required()
          .min(25)
          .error("Un título de min. Se requieren 10 caracteres"),
        Rule.max(120).warning("Los títulos más cortos suelen ser mejores"),
      ],
    }),
    defineField({
      name: "description", 
      title: "Descripción",
      type: "string",
      validation:Rule => [
        Rule.required().min(45).error("La descripción de min. Se requieren 45 caracteres"),
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
      title: "Autor",
      type: "reference",
      to: { type: "author" },
      validation: Rule => Rule.required().error("Debe seleccionar un autor")
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Debe de colocar una imagen")
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: Rule => Rule.required().length(1)
    }),
    defineField({
      name: "publishedAt",
      title: "Hora de públicación", 
      type: "datetime",
      initialValue: new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "blockContent",
    }),
    defineField({
      title: '¿Dónde sucedió tal hecho?',
      name: 'location',
      type: 'geopoint'
    })
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
