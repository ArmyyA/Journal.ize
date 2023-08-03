"use client";

import Image from "next/image";

import Link from "next/link";
import { Card } from "./ui/card";
import { CommentType } from "@/app/types/Comment";

type EntryProps = {
  avatar: string;
  name: string;
  entryTitle: string;
  id: string;
  comments: CommentType[];
};

export default function Entry({
  avatar,
  name,
  entryTitle,
  id,
  comments,
}: EntryProps) {
  return (
    <Card className="shadow-md">
      <div className="bg-white p-8 rounded-lg ">
        <div className="flex items-center gap-2">
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
          <p>{entryTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/entry/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
        </div>
      </div>
    </Card>
  );
}
