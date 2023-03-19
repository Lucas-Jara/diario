import {
  Post,
  PostAuthor,
  PostCategories,
  PostDescription,
  PostImage,
  PostTitle,
  Slider,
} from "@/components";
import { Ads, Post as IPost } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { adsQuery, postByCategory } from "@/lib/sanity.queries";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";

type Props = {
  categories: {
    _id: string;
    title: string;
    slug: string;
    posts: IPost[];
  }[];
  ads: Ads[];
};

const HomePage = ({ categories, ads }: Props) => {
  return (
    <Layout
      title="Diario San Francisco | El Diario de Solano"
      description="Diario San Francisco | El Diario de San Francisco Solano. Noticias de Solano, Quilmes, Almirante Brown, Quilmes oeste, La Florida"
    >
      <div className="p-4 container mx-auto">
        <Slider ads={ads} />
        <div className="my-6 flex flex-col space-y-6">
          {categories.map((category) => (
            <div key={category._id}>
              <div>
                <div className="flex justify-between items-center">
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
                      <Post post={post} key={post._id}>
                        <PostImage />
                        <PostCategories />
                        <PostAuthor />
                        <PostTitle />
                        <PostDescription />
                      </Post>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const [postOrderByCategory, ads] = await Promise.all([
    await client.fetch(postByCategory),
    await client.fetch(adsQuery),
  ]);

  return {
    props: { categories: postOrderByCategory, ads },
    revalidate: 50,
  };
};
