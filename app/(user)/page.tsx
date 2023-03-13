import { PostDate } from "@/components";
import { Post } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";

type Props = {
  _id: string;
  title: string;
  slug: string;
  posts: Post[];
};
export const dynamic = "error"

const query = groq`*[_type == "category"]{
  _id,
  title,
  "slug":slug.current ,
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
}`;

const getData = async () => {
  const posts = await client.fetch(query);
  return posts;
};

const HomePage = async () => {
  const categories: Props[] = await getData();
  return (
    <>
      <div className="p-4 container mx-auto">
        <div className="flex flex-col space-y-6">
          {categories.map((category) => (
            <div key={category._id}>
              <div>
                <div className="flex justify-between">
                  <div className="py-3">
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  <div>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-sm text-green-500 hover:underline underline-offset-2"
                    >
                      Ver Más
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.posts.map((post) => (
                      <Link key={post._id} href={`/post/${post.slug}`}>
                        <div className="">
                          <div className="relative w-full h-72">
                            <Image
                              src={urlFor(post.mainImage).url()}
                              alt={`${post.title}`}
                              fill
                              className="object-cover"
                              placeholder="blur"
                              blurDataURL={urlFor(post.mainImage)
                                .blur(50)
                                .url()}
                            />
                          </div>
                          <div className="my-3">
                            {post.categories.map((category) => (
                              <span
                                key={category._id}
                                className="bg-slate-700 text-sm font-semibold text-white rounded-md px-3 py-2"
                              >
                                <Link href={`/category/${category.slug}`}>
                                  {category.title}
                                </Link>
                              </span>
                            ))}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
