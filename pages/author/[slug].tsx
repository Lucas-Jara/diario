import { PostDate } from "@/components";
import { Layout } from "@/components/Layout";
import { Post } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import { postFieldsOptions } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/urlFor";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  author:{
    name: string;
    posts: Post[];
  }
};

const AuthorPage = ({author}:Props) => {
  return (
    <Layout title={author.name}>
    <div>
      <div className="p-4 container mx-auto">
        <div className="my-3">
          <h1 className="text-3xl font-bold">{author.name}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {author.posts.map((post) => (
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
    </Layout>
  );
};

export default AuthorPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(`*[_type == 'author']{
      "params":{"slug":slug.current}
    }`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const author = await client.fetch(
    `*[_type == "author" && $slug == slug.current][0]{
        name,
        "posts": *[_type == "post" && references(^._id)]{${postFieldsOptions}}
    }`,
    { slug: ctx.params?.slug || "" }
  );

  return {
    props: { author },
  };
};
