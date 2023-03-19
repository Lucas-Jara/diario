import { groq } from "next-sanity";

export const postFieldsOptions = `
  _id,
  title,
  body,
  publishedAt,
  mainImage,
  description,
  "slug": slug.current,
  author->{
    _id,
    image,
    name,
    "slug":slug.current
  },
  categories[]->{
    _id,
    "slug": slug.current,
    title
  }
`;

export const postByCategory = groq`*[_type == "category"]{
  _id,
  title,
  "slug":slug.current ,
  "posts": *[_type == "post" && references(^._id)][0...6]{${postFieldsOptions}}
}`;

export const CategoryQuery = groq`*[_type == 'category'][0...6]{
  _id,
  title,  
  "slug": slug.current,
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug]{
  "currentPost": {${postFieldsOptions}},
  "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{${postFieldsOptions}},
  "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{${postFieldsOptions}},
  "morePosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{${postFieldsOptions}},
}|order(publishedAt)[0]`;

export const adsQuery = groq`*[_type == "ads"]{
  _id,
  name,
  mainImage,
  socials
}`;
