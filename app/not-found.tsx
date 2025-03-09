import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-60 h-screen">
      <h1 className="text-6xl font-black text-black playfair">
        Page Not Found
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 px-4 py-2">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
