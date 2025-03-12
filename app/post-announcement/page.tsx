"use client";

import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function TodoList() {
  const createTodo = async () => {
    await client.models.announcements.create({
      content: window.prompt("Todo content?"),
    });
  };

  return (
    <div className="pt-22">
      <button onClick={createTodo}>Add new todo</button>
    </div>
  );
}
