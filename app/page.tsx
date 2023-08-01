"use client";

import CreateEntry from "@/components/CreateEntry";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Entry from "@/components/Entry";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useEffect } from "react";
import { EntryType } from "./types/Entry";
import { Separator } from "@/components/ui/separator";
import { motion, Variants } from "framer-motion";

// Display all entries through fetch
const globalEntries = async () => {
  const response = await axios.get("/api/posts/getEntry");
  return response.data;
};

const cardVariants: Variants = {
  offscreen: {
    y: 200,
  },
  onscreen: {
    y: 10,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

export default function Home() {
  const [progress, setProgress] = useState(13);
  const { data, error, isLoading } = useQuery<EntryType[]>({
    queryFn: globalEntries,
    queryKey: ["posts"],
  });

  // Effect for progress
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 50);
    return () => clearTimeout(timer);
  }, []);

  if (error) return error;
  // Progress bar for loading
  if (isLoading) {
    return (
      <div className="flex justify-center mt-4">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }
  return (
    <main>
      <CreateEntry />
      <Separator className="mt-10" />
      <h1 className="font-medium text-2xl mt-10">What's hot</h1>

      <div className="mt-3">
        {data?.map((entry) => (
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div variants={cardVariants}>
              <div className="py-3">
                <Entry
                  key={entry.id}
                  name={entry.user.name}
                  avatar={entry.user.image}
                  entryTitle={entry.title}
                  id={entry.id}
                  comments={entry.Comment}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
