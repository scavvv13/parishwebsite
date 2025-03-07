"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { quickLinks } from "@/app/hooks/useQuickLinks";
import { useRouter } from "next/navigation";

export default function QuickLinks() {
  const router = useRouter();

  const navigateTo = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {quickLinks.map((btn, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigateTo(btn.href)}
        >
          <Image src={btn.iconPath} alt={btn.label} width={24} height={24} />
          {btn.label}
        </Button>
      ))}
    </div>
  );
}
