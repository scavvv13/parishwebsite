import Image from "next/image";
import Clock from "./components/Clock";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row justify-between px-2 lg:px-14 py-8 min-h-screen w-full overflow-x-hidden">
      {/* div for lg:left side sm:top ; saints */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <div className="flex flex-row gap-2 lg:gap-4 justify-center lg:justify-start overflow-x-auto">
          <div className="flex-shrink">
            <Image src={"/Saint1.png"} alt="Saint 1" width={200} height={20} />
          </div>
          <div className="flex-shrink">
            <Image src={"/Saint2.png"} alt="Saint 2" width={200} height={20} />
          </div>
          <div className="flex-shrink">
            <Image src={"/Saint3.png"} alt="Saint 3" width={200} height={20} />
          </div>
        </div>
      </div>

      {/* div for lg:right side sm:bottom ; clock and date */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div className="mb-6 lg:mb-0">
          <strong className="playfair text-[30px] lg:text-[72px] font-normal block">
            Mass Schedule
          </strong>
          <Clock />
        </div>

        {/* div for the two buttons */}
        <div className="flex flex-col sm:flex-row lg:justify-end justify-center gap-4 font-semibold">
          <button
            title="Stream Online"
            className="px-6 sm:px-10 lg:px-[70px] py-[15px] text-xs border border-black lg:text-md whitespace-nowrap"
          >
            Stream Online
          </button>
          <button
            title="Mass Archive"
            className="bg-black px-6 sm:px-10 lg:px-[70px] py-[15px] text-xs lg:text-md text-white whitespace-nowrap"
          >
            Mass Archive
          </button>
        </div>
      </div>
    </div>
  );
}
