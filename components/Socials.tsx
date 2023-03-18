import { Socials } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";

type Props = {
  socials: Socials;
};

export const SocialsIcons = ({ socials }: Props) => {
  return (
    <div className="flex space-x-3">
      {Object.entries(socials).map(([prop, value]) => (
        <div key={prop} className="bg-white rounded-full relative p-2 h-10 w-10 grid place-content-center">
          <Link href={{pathname:`${value}`}} passHref={true} target="_blank">
              <Image src={`/icon/icon-${prop}.svg`} alt={prop} width={30} height={30} />
          </Link>
        </div>
      ))}
    </div>
  );
};
