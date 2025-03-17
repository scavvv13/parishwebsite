"use client";

import type { Schema } from "@/amplify/data/resource";
import { Button } from "@/components/ui/button";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function TodoList() {
  const createTodo = async () => {
    await client.models.announcements.create({
      content: window.prompt("Todo content?"),
    });
  };

  return (
    <div className="flex flex-col px-12">
      <h1 className=" text-6xl font-black">Announcements</h1>
      <Button onClick={createTodo} className="">
        Post Announcement
      </Button>
    </div>
  );
}
