"use client";
import { UIContext } from "@/context";
import { Ads } from "@/interfaces";
import { client } from "@/lib/sanity.client";
import { adsQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/urlFor";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MenuIcon from "../public/icon/icon-menu.svg";
import { Slider } from "./Slider";

const categories = [
  {
    name: "Policiales",
    slug: "/category/policiales",
  },
  {
    name: "Quilmes",
    slug: "/category/quilmes",
  },
  {
    name: "Quilmes Oeste",
    slug: "/category/quilmes-oeste",
  },
  {
    name: "Solano",
    slug: "/category/solano",
  },
  {
    name: "Florencio Varela",
    slug: "/category/florencio-varela",
  },
  {
    name: "Almirante Brown",
    slug: "/category/almirante-brown",
  },
];

const WrapperIcon = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (event: any) => void;
}) => {
  return (
    <div
      className="relative w-12 h-12 fill-white cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Navbar = () => {
  const { onToggleMenu, onToggleSearch } = useContext(UIContext);
  const [ads, setAds] = useState<Ads[]>([]);

  useEffect(() => {
    client.fetch(adsQuery).then(setAds);
  }, []);

  return (
    <header className="bg-zinc-900 p-0 lg:py-5 shadow-sm border-b-2 z-40 flex flex-col items-center">
      <div className="container w-full p-3 flex items-center lg:hidden">
        <div className="flex-auto flex justify-start">
          <div onClick={onToggleMenu}>
            <Bars3Icon className="text-white w-8 h-8" />
          </div>
        </div>
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="" width={300} height={20} />
          </Link>
        </div>
        <div className="flex-auto flex justify-end">
          <div onClick={onToggleSearch}>
            <MagnifyingGlassIcon className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="hidden lg:block container w-full px-5">
        <div className="h-36 max-h-36 flex justify-between pb-5 mb-5 border-b-2 border-zinc-800">
          <div className="h-full flex flex-col justify-between max-w-lg w-full">
            <h1>
              <Link href="/">
                <Image src="/logo.png" alt="" width={350} height={20} />
              </Link>
            </h1>
            <span className="max-w-md text-neutral-400 text-sm font-light">
              Diario San Francisco | El Diario de San Francisco Solano. Noticias
              de Solano, Quilmes, Almirante Brown, Quilmes oeste, La Florida
            </span>
          </div>
          <div className="flex justify-end flex-auto overflow-hidden">
            <div className="h-full max-w-4xl w-full">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper w-full h-full"
              >
                {ads.map((ad) => (
                  <SwiperSlide key={ad._id}>
                    <div className="relative w-full h-full">
                    <Image src={urlFor(ad.mainImage).url()} alt={ad.name} fill className="object-cover"/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-auto flex justify-start">
            <div onClick={onToggleMenu}>
              <Bars3Icon className="text-white w-8 h-8" />
            </div>
          </div>
          <nav>
            <ul className="flex items-center justify-center space-x-3">
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="text-white text-lg font-semibold"
                >
                  <Link href={category.slug}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-auto flex justify-end">
            <div onClick={onToggleSearch}>
              <MagnifyingGlassIcon className="text-white w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
