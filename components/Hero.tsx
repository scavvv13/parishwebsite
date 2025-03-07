import Image from "next/image";
import QuickLinks from "@/components/QuickLinks"; // Import only this as a client component

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center pt-14 pb-40 px-4 border  border-x-black">
      <div className="mb-8 flex gap-6">
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
      <h3 className="text-3xl instrument">
        Roman Catholic Diocese of Paranaque
      </h3>
      <strong className="text-6xl font-extrabold mt-2 playfair">
        MADONNA DEL DIVINO AMORE PARISH
      </strong>
      <p className="mt-2 playfair text-xl text-gray-700 mb-12">
        Ayala Southvale Drive, Las Pinas City
      </p>

      {/* Client Component */}
      <QuickLinks />
    </div>
  );
}
