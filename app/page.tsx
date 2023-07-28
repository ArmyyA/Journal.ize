"use client";

import CreateEntry from "@/components/CreateEntry";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Entry from "@/components/Entry";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useEffect } from "react";

// Display all entries through fetch
const globalEntries = async () => {
  const response = await axios.get("/api/posts/getEntry");
  return response.data;
};

export default function Home() {
  const [progress, setProgress] = useState(13);
  const { data, error, isLoading } = useQuery({
    queryFn: globalEntries,
    queryKey: ["posts"],
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 50);
    return () => clearTimeout(timer);
  }, []);

  if (error) return error;
  if (isLoading) {
    return <Progress value={progress} className="w-[60%]" />;
  }
  return (
    <main>
      <CreateEntry />
      <h1 className="font-medium text-2xl mt-10">What's hot</h1>
      <div className="mt-3">
        {data?.map((entry) => (
          <div className="py-3">
            <Entry
              key={entry.id}
              name={entry.user.name}
              avatar={entry.user.image}
              entryTitle={entry.title}
              id={entry.id}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
