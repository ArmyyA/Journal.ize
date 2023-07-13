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
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (!session) {
      //console.log("reached");
      return res.status(401).json({ message: "You are not signed in" });
    }
    const title: string = req.body.title;

    // Fetching user using PrismaUser
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Title is too long, when trying to create an entry
    if (title.length > 300) {
      return res.status(403).json({ message: "Your entry is too long!" });
    }

    // Title is empty
    if (!title.length) {
      return res
        .status(403)
        .json({ message: "You haven't captured your thoughts yet." });
    }

    // Try creating a post in post, passed title and user who created the post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id,
        },
      });

      res.status(200).json(result);

      // API handle Error
    } catch (err) {
      res.status(403).json({ err: "Unable to journalize" });
    }
  }
}
