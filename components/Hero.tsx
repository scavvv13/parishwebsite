import Image from "next/image";
import QuickLinks from "@/components/QuickLinks"; // Import only this as a client component
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col  items-center text-center  pt-10 lg:pt-20 lg:pb-36 md:pb-36 pb-14 lg:px-4 border-r-black ">
        <div className="mb-8 flex gap-6 ">
          <Image
            src="/dio.png"
            alt="Diocese Logo"
            width={100}
            height={96}
            className="lg:size-24 size-16"
          />
          <Image
            src="/madonnalogo.png"
            alt="Parish Logo"
            width={100}
            height={96}
            className="lg:size-24 size-16"
          />
        </div>
        <h3 className="text-md lg:text-3xl instrument text-[#412121] dark:text-gray-300">
          Roman Catholic Diocese of Paranaque
        </h3>
        <strong className="text-3xl lg:text-6xl font-extrabold lg:mt-2 playfair">
          MADONNA DEL DIVINO AMORE PARISH
        </strong>
        <p className="lg:mt-2 playfair text-sm lg:text-xl text-gray-700 dark:text-gray-400 mb-12">
          Ayala Southvale Drive, Las Pinas City
        </p>

        {/* Client Component */}
        <div className="flex sm:flex-col lg:flex-row lg:gap-x-3 sm:gap-y-3">
          <Button variant="default" aria-label="Mass schedule">
            Mass Schedule{" "}
          </Button>
          <Button variant="outline" aria-label="Be part of our community">
            Be part of our community
            <Users className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </>
  );
}
