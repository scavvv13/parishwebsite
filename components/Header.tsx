import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientHeader from "@/components/ClientHeader"; // Import client components wrapped in Suspense

const Header = () => {
  return (
    <>
      <motion.header
        initial={{ backdropFilter: "blur(0px)", borderBottom: "1px solid" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-2 py-2 lg:px-3 lg:py-2 z-50 border-b border-black"
      >
        {/* Left Side */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/madonnalogo.png" width={50} height={50} alt="Logo" />
          </Link>
          <div className="ml-4">
            <strong className="text-xl">Madonna Del Divino Amore Parish</strong>
            <span className="text-sm">Diocese of Parañaque</span>
          </div>
        </div>

        {/* Right Side */}
        <Suspense fallback={null}>
          <ClientHeader />
        </Suspense>
      </motion.header>
    </>
  );
};

export default Header;
