import Head from "next/head";
import { Footer, GoToTop, MenuSidebar, Navbar, SearchSidebar } from "./";

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
  imageUrl?:string
};

export const Layout = ({ children, title, description, imageUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}image.jpg` }: Props) => {
  return (
    <>
      <Head>
        <title>{title} | Diario San Francisco</title>
        <meta name="description" content={`${description} | Diario San Francisco`} />
        <meta name="og:image" content={imageUrl} />
      </Head>
      <Navbar />
      <GoToTop />
      <MenuSidebar />
      <SearchSidebar />
      {children}
      <Footer />
    </>
  );
};
