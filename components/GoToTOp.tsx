"use client";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef } from "react";
export const GoToTop = () => {
  const refElement = useRef<HTMLDivElement>(null);

  const calcScrollValue = () => {
    const pos = document.documentElement.scrollTop;
    const calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    if (refElement.current != null) {
      if (pos > 100) {
        refElement.current.style.transform = "translateY(0px)";
        refElement.current.style.opacity = "1";
        refElement.current.style.background = `conic-gradient(#1d9d81 ${scrollValue}%, #fff ${scrollValue}%)`;
      } else {
        refElement.current.style.transform = "translateY(130px)";
        refElement.current.style.opacity = "0";
      }
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", calcScrollValue);

    return () => {
      window.removeEventListener("scroll", calcScrollValue);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={refElement}
      onClick={scrollTop}
      className="fixed z-50 bottom-4 right-6 lg:right-12 opacity-0 translate-y-28 shadow-lg transition-all duration-500 grid place-items-center w-12 h-12 md:w-20 md:h-20 bg-green rounded-full"
    >
      <div
        onClick={scrollUp}
        className="w-[calc(100%-theme(space.2))] md:w-[calc(100%-theme(space.4))] h-[calc(100%-theme(space.2))] md:h-[calc(100%-theme(space.4))] bg-white rounded-full flex items-center justify-center"
      >
        <ChevronUpIcon className="w-8 h-8 md:w-10 md:h-10 " />
      </div>
    </div>
  );
};
