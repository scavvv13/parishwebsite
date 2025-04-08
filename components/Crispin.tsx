"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const Crispin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const nodeRef = useRef<HTMLDivElement>((null as unknown) as HTMLDivElement); // Fix: Avoid `findDOMNode` error

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="fixed bottom-10 right-10 cursor-grab z-50">
        {isOpen ? (
          <Card className="w-64 p-1 shadow-lg rounded-lg flex flex-row">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </button>
            <Image
              src={"/chatbot.png"}
              alt="Crispin"
              width={50}
              height={50}
              className="pointer-events-none"
            />
            <div className="ml-5 leading-none content-center">
              <p className=" place-self-center font-bold text-md">
                Chat with Crispin
              </p>
              <span className="text-sm">Our church AI</span>
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className=" rounded-full"
            title="Open Crispin"
          ></button>
        )}
      </div>
    </Draggable>
  );
};

export default Crispin;
