import { PostDate, PreviewBlogList, RichTextComponents } from "@/components";
import PreviewSuspense from "@/components/PreviewSuspense";
import { Post } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { previewData } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type Props = {
  currentPost: Post;
  previousPost: Post;
  nextPost: Post;
  morePosts: Post[];
};

const postFields = `
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

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == 'post']{
    "slug":slug.current
  }`);
  return slugs;
}
const query = groq`*[_type == "post" && slug.current == $slug]{
  "currentPost": {${postFields}},
  "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{${postFields}},
  "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{${postFields}},
  "morePosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{${postFields}},
}|order(publishedAt)[0]`;

const getData = async (slug: string) => {
  const data = await client.fetch(query, { slug });
  return data;
};

const PostPage = async ({ params }: any) => {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div>
            <p className="text-center text-lg animate-pulse text-[#f7ab0a]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} queryParams={params} />
      </PreviewSuspense>
    );
  }

  const data: Props = await getData(params.slug);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative w-full h-full sm:px-3">
        <div className="h-0 pb-[56.25%]">
          <Image
            src={urlFor(data.currentPost.mainImage).url()}
            alt={`${data.currentPost.title}`}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={urlFor(data.currentPost.mainImage).blur(50).url()}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="my-4">
          <h2 className="text-2xl md:text-4xl font-bold px-3">
            {data.currentPost.title}
          </h2>
        </div>
        <PortableText
          value={data.currentPost.body}
          components={RichTextComponents}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {data.previousPost && (
            <div key={data.previousPost._id} className="md:col-span-2">
              <Link href={`/post/${data.previousPost.slug}`}>
                <div className="">
                  <p className="text-lg font-bold">Preview Post</p>
                  <div className="relative w-full h-72">
                    <Image
                      src={urlFor(data.previousPost.mainImage).url()}
                      alt={`${data.previousPost.title}`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={urlFor(data.previousPost.mainImage)
                        .blur(50)
                        .url()}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link href={`/author/${data.previousPost.author.slug}`}>
                      <Image
                        src={urlFor(data.previousPost.author.image).url()}
                        alt={`${data.previousPost.title}`}
                        className="object-cover rounded-full grow-0"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <div className="grow flex flex-col">
                      <span className="text-lg">
                        <Link href={`/author/${data.previousPost.author.slug}`}>
                          {data.previousPost.author.name}
                        </Link>
                      </span>
                      <PostDate dateString={data.previousPost.publishedAt} />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold line-clamp-2">
                    {data.previousPost.title}
                  </h2>
                  <p className="line-clamp-3">
                    {data.previousPost.description}
                  </p>
                </div>
              </Link>
            </div>
          )}
          {data.nextPost && (
            <div key={data.nextPost._id} className="md:col-span-2 md:col-start-4">
              <Link href={`/post/${data.nextPost.slug}`}>
                <div className="">
                  <p className="text-lg font-bold">Next Post</p>
                  <div className="relative w-full h-72">
                    <Image
                      src={urlFor(data.nextPost.mainImage).url()}
                      alt={`${data.nextPost.title}`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={urlFor(data.nextPost.mainImage)
                        .blur(50)
                        .url()}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link href={`/author/${data.nextPost.author.slug}`}>
                      <Image
                        src={urlFor(data.nextPost.author.image).url()}
                        alt={`${data.nextPost.title}`}
                        className="object-cover rounded-full grow-0"
                        width={40}
                        height={40}
                      />
                    </Link>
                    <div className="grow flex flex-col">
                      <span className="text-lg">
                        <Link href={`/author/${data.nextPost.author.slug}`}>
                          {data.nextPost.author.name}
                        </Link>
                      </span>
                      <PostDate dateString={data.nextPost.publishedAt} />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold line-clamp-2">
                    {data.nextPost.title}
                  </h2>
                  <p className="line-clamp-3">{data.nextPost.description}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-3xl font-bold my-6">Más Posts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.morePosts.map((post: Post) => (
            <Link key={post._id} href={`/post/${post.slug}`}>
              <div className="">
                <div className="relative w-full h-72">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={`${post.title}`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={urlFor(post.mainImage).blur(50).url()}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Link href={`/author/${post.author.slug}`}>
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={`${post.title}`}
                      className="object-cover rounded-full grow-0"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <div className="grow flex flex-col">
                    <span className="text-lg">
                      <Link href={`/author/${post.author.slug}`}>
                        {post.author.name}
                      </Link>
                    </span>
                    <PostDate dateString={post.publishedAt} />
                  </div>
                </div>
                <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
                <p className="line-clamp-3">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
