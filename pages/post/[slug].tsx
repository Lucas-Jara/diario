import { Breadcrumbs, PostDate, RichTextComponents } from "@/components";
import { Layout } from "@/components/Layout";
import { Post } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import { postQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  currentPost: Post;
  previousPost: Post;
  nextPost: Post;
  morePosts: Post[];
};

const PostPage = ({
  currentPost,
  previousPost,
  nextPost,
  morePosts,
}: Props) => {
  return (
    <Layout
      title={currentPost.title}
      description={currentPost.description}
      imageUrl={urlFor(currentPost.mainImage).url()}
    >
      <Breadcrumbs
        routes={[
          {
            path: `/category/${currentPost.categories[0].slug}`,
            name: currentPost.categories[0].title,
          },
        ]}
        currentPage={currentPost.title}
      />
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full h-full sm:px-3">
          <div className="h-0 pb-[56.25%]">
            <Image
              src={urlFor(currentPost.mainImage).url()}
              alt={`${currentPost.title}`}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={urlFor(currentPost.mainImage).blur(50).url()}
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="my-4">
            <h2 className="text-2xl md:text-4xl font-bold px-3">
              {currentPost.title}
            </h2>
          </div>
          <PortableText
            value={currentPost.body}
            components={RichTextComponents}
          />
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {previousPost && (
                <div key={previousPost._id}>
                  <Link href={`/post/${previousPost.slug}`}>
                    <div>
                      <p className="text-lg font-bold">Preview Post</p>
                      <div className="relative w-full h-72">
                        <Image
                          src={urlFor(previousPost.mainImage).url()}
                          alt={`${previousPost.title}`}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={urlFor(previousPost.mainImage)
                            .blur(50)
                            .url()}
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link href={`/author/${previousPost.author.slug}`}>
                          <Image
                            src={urlFor(previousPost.author.image).url()}
                            alt={`${previousPost.title}`}
                            className="object-cover rounded-full grow-0"
                            width={40}
                            height={40}
                          />
                        </Link>
                        <div className="grow flex flex-col">
                          <span className="text-lg">
                            <Link href={`/author/${previousPost.author.slug}`}>
                              {previousPost.author.name}
                            </Link>
                          </span>
                          <PostDate dateString={previousPost.publishedAt} />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold line-clamp-2">
                        {previousPost.title}
                      </h2>
                      <p className="line-clamp-3">{previousPost.description}</p>
                    </div>
                  </Link>
                </div>
              )}
              {nextPost && (
                <div key={nextPost._id}>
                  <Link href={`/post/${nextPost.slug}`}>
                    <div>
                      <p className="text-lg font-bold">Next Post</p>
                      <div className="relative w-full h-72">
                        <Image
                          src={urlFor(nextPost.mainImage).url()}
                          alt={`${nextPost.title}`}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={urlFor(nextPost.mainImage)
                            .blur(50)
                            .url()}
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link href={`/author/${nextPost.author.slug}`}>
                          <Image
                            src={urlFor(nextPost.author.image).url()}
                            alt={`${nextPost.title}`}
                            className="object-cover rounded-full grow-0"
                            width={40}
                            height={40}
                          />
                        </Link>
                        <div className="grow flex flex-col">
                          <span className="text-lg">
                            <Link href={`/author/${nextPost.author.slug}`}>
                              {nextPost.author.name}
                            </Link>
                          </span>
                          <PostDate dateString={nextPost.publishedAt} />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold line-clamp-2">
                        {nextPost.title}
                      </h2>
                      <p className="line-clamp-3">{nextPost.description}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {morePosts.map((post: Post) => (
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
                    <h2 className="text-xl font-bold line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(`*[_type == 'post']{
      "params":{"slug":slug.current}
    }`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data: Props = await client.fetch(postQuery, { slug: ctx.params?.slug });

  return {
    props: {
      currentPost: data.currentPost,
      previousPost: data.previousPost,
      nextPost: data.nextPost,
      morePosts: data.morePosts,
    },
  };
};
