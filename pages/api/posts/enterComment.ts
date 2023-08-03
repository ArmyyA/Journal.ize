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

    // Fetch User

    const prismaUser = await prisma.user.findUnique({
      //@ts-ignore
      where: { email: session?.user?.email },
    });

    // Enter the comment
    try {
      const { title, entryId } = req.body.data;

      if (!title.length) {
        return res
          .status(401)
          .json({ message: "Can't post an empty comment!" });
      }

      const result = await prisma.comment.create({
        //@ts-ignore
        data: { comment: title, userId: prismaUser?.id, entryId },
      });
      res.status(200).json(result);

      // API handle Error
    } catch (err) {
      res.status(403).json({ err: "Unable to journalize" });
    }
  }
}
