"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Edit({ avatar, title, name, id, comments }: EditProps) {
  return (
    <Card className="shadow-md">
      <div className="bg-white p-8 rounded-lg">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-semibold">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button className="text-sm font-semibold text-red-600">Delete</button>
        </div>
      </div>
    </Card>
  );
}
