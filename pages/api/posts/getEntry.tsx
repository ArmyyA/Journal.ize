import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

// Async API calls, allows for parallel fetching
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only handle if API request is POST
  if (req.method === "GET") {
    // Fetching all entries

    // Try creating a post in post, passed title and user who created the post
    try {
      const data = await prisma.post.findMany({
        include: { user: true },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).json(data);

      // API handle Error
    } catch (err) {
      res.status(403).json({ err: "Error, can't fetch user entries." });
    }
  }
}
