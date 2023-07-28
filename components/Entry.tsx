"use client";

import Image from "next/image";

import Link from "next/link";
import { Card } from "./ui/card";

export default function Entry({ avatar, name, entryTitle, id }) {
  return (
    <Card>
      <div className="bg-white  p-8 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold">{name}</h3>
        </div>
        <div className="my-8">
          <p>{entryTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/entry/${id}`}>
            <p className="text-sm font-bold text-gray-700">Comments</p>
          </Link>
        </div>
      </div>
    </Card>
  );
}
