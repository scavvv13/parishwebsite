import Image from "next/image";
import Clock from "./components/Clock";

export default function Home() {
  return (
    <div className=" flex flex-col lg:flex-row justify-between px-2 lg:px-14 py-8 h-screen lg:h-full ">
      {/* div for lg:left side sm:top ; saints */}
      <div className="flex flex-row gap-2 lg:gap-4 w-full lg:w-1/2 ">
        <Image src={"/Saint1.png"} alt="Saint 1" width={200} height={500} />
        <Image src={"/Saint2.png"} alt="Saint 2" width={200} height={500} />
        <Image src={"/Saint3.png"} alt="Saint 3" width={200} height={500} />
      </div>
      {/* div for lg:right side sm:bottom ; clock and date */}
      <div className="flex flex-col w-full lg:w-1/2 lg:justify-between justify-start">
        <div className="justify-start">
          <strong className=" playfair text-[30px] lg:text-[72px] font-normal">
            Mass Schedule
          </strong>
          <Clock />
        </div>
        {/* div for the two buttons */}
        <div className="flex justify-end gap-4 font-semibold text-md mt-8">
          <button
            title="Stream Online"
            className="px-[70px] py-[15px] border border-black"
          >
            Stream Online
          </button>
          <button
            title="Mass Archive"
            className="bg-black px-[70px] py-[15px] text-white"
          >
            Mass Archive
          </button>
        </div>
      </div>
    </div>
  );
}
