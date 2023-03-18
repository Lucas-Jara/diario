"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Ads, Socials } from "@/interfaces";
import Image from "next/image";
import { urlFor } from "@/lib/urlFor";
import { SocialsIcons } from "./Socials";

export const Slider = ({ ads }: { ads: Ads[] }) => {
  return (
    <div className="h-96">
      <Swiper
        style={{
          height: "100%",
        }}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="w-full h-full relative">
              <Image
                src={urlFor(ad.mainImage).url()}
                alt={`${ad.name}`}
                fill
                className="object-contain md:object-cover"
                placeholder="blur"
                blurDataURL={urlFor(ad.mainImage).blur(50).url()}
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-black bg-opacity-25">
                <div className="px-6 py-3 text-white">
                  <h2 className="text-2xl font-bold">{ad.name}</h2>
                  <SocialsIcons socials={ad.socials} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
