import Image from "next/image";
import QuickLinks from "@/components/QuickLinks"; // Import only this as a client component

export default function Hero() {
  return (
    <div className="flex flex-row  lg:px-10 border ">
      <div className="hidden lg:flex flex-row lg:p-8 h-[90vh]">
        <Image
          src="/event.jpg"
          alt="A vibrant event scene with people networking"
          width={900}
          height={700}
          className="rounded-lg object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-start text-start pt-10 lg:pb-36 md:pb-36 pb-14 lg:px-4 border-r-black ">
        <div className="mb-8 flex gap-6 ">
          <Image
            src="/dio.png"
            alt="Diocese Logo"
            width={100}
            height={96}
            className="size-24"
          />
          <Image
            src="/madonnalogo.png"
            alt="Parish Logo"
            width={100}
            height={96}
            className="size-24"
          />
        </div>
        <h3 className="text-3xl instrument text-[#412121]">
          Roman Catholic Diocese of Paranaque
        </h3>
        <strong className="text-6xl font-extrabold mt-2 playfair">
          MADONNA DEL DIVINO AMORE PARISH
        </strong>
        <p className="mt-2 playfair text-xl text-gray-700 mb-12">
          Ayala Southvale Drive, Las Pinas City
        </p>

        {/* Client Component */}
        <div className="">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}
