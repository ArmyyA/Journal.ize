"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DashEntries } from "../types/dashEntry";
import Edit from "./Edit";

const fetch = async () => {
  const response = await axios.get("/api/posts/dashEntry");
  return response.data;
};

export default function DashEntry() {
  const { data, isLoading } = useQuery<DashEntries>({
    queryFn: fetch,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Loading the entries...</h1>;
  console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <Edit
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          comments={post.comments}
          title={post.title}
        />
      ))}
    </div>
  );
}
