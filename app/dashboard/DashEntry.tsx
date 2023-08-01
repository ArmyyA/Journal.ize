"use client";
import { motion, Variants } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DashEntries } from "../types/dashEntry";
import Edit from "./Edit";

const fetch = async () => {
  const response = await axios.get("/api/posts/dashEntry");
  return response.data;
};

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 10,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1,
    },
  },
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
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div variants={cardVariants}>
            <Edit
              id={post.id}
              key={post.id}
              avatar={data.image}
              name={data.name}
              comments={post.Comment}
              title={post.title}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
