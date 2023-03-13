import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/urlFor";
import localfont from "next/font/local";

const fontello = localfont({
  src: "../public/fontello/font/blockquote.woff2",
  display: "swap",
});

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative max-w-lg mx-auto h-full my-6">
          <div className="h-0 pb-[56.25%]">
            <Image
              src={urlFor(value).url()}
              alt={`${value}`}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={urlFor(value).blur(50).url()}
            />
          </div>
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="m-6 md:m-10 pl-6 md:pl-10 list-disc space-y-2 marker:text-[#f7ab0a]">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="m-6 sm:m-10 pl-6 sm:pl-10 list-decimal space-y-2">{children}</ol>
    ),
  },
  block: {
    normal: ({ children, index }: any) => (
      <p key={index} className={`text-text-normal text-lg te mx-3 my-2 font-normal`}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl my-6 px-3 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl my-6 px-3 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl my-6 px-3 font-bold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
        <blockquote className={`${fontello.style.fontFamily} m-10 text-3xl text-red-400 `}>
        <b className="icon-quote-left-1"></b>
          {/* border-l-[#f7ab0a] border-l-4 */}
          {children}
        <b className="icon-quote-right-1"></b>
        </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer nooponer"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoration-[#f7ab0a] hover:decoration-black"
        >
          {children}
        </Link>
      );
    },
  },
};
