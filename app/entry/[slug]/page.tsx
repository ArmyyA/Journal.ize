"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Entry from "@/components/Entry";
import { EntryType } from "@/app/types/Entry";
import Comment from "@/components/Comment";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

type URL = {
  params: {
    slug: string;
  };
};

const fetch = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function EntryDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["entry-detail"],
    queryFn: () => fetch(url.params.slug),
  });

  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <div>
      <Entry
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        entryTitle={data.title}
        comments={data.Comment}
      />
      <Comment id={data?.id} />
      <Separator className="mt-8" />
      <h1 className="mt-8 font-semibold text-lg">Comments</h1>
      {data?.Comment?.map((comment) => (
        <Card className="my-4 shadow-md">
          <div key={comment.id} className=" bg-white p-8 rounded-lg">
            <div className="flex items-center">
              <Image
                className="rounded-full"
                width={24}
                height={24}
                src={comment.user?.image}
                alt="avatar"
              />
              <h3 className="font-semibold text-sm px-2">
                {comment?.user?.name}
              </h3>
              <h2 className="font-normal text-xs text-slate-400 px-2">
                {comment.createdAt}
              </h2>
            </div>
            <p className="py-5">{comment.comment}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
