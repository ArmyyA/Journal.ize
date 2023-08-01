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
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (!session) {
      //console.log("reached");
      return res.status(401).json({ message: "You are not signed in" });
    }
    const title: string = req.body.title;

    // Get user entries in dashboard
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });

      res.status(200).json(data);

      // API handle Error
    } catch (err) {
      res.status(403).json({ err: "Unable to journalize" });
    }
  }
}
