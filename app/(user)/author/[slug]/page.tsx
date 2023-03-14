import { PostDate } from "@/components";
import { Author, Post } from "@/interfaces/post";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == 'author']{
    "slug":slug.current
  }`);
  return slugs;
}

const getData = async (slug: string) => {
  const author = await client.fetch(
    `*[_type == "author" && $slug == slug.current][0]{
        _id,
        name,
        "slug":slug.current,
        "posts": *[_type == "post" && references(^._id)]{
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
        }
      }`,
    { slug }
  );
  return author;
};

const AuthorPage = async ({ params }: any) => {
  const author = await getData(params.slug);
  return (
    <div>
      <div className="p-4 container mx-auto">
        <div className="my-3">
          <h1 className="text-3xl font-bold">{author.name}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {author.posts.map((post: Post) => (
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

export default AuthorPage;
