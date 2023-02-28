import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const examples = await prisma.user.findMany({});

  res.status(200).json(examples);
};

export default userByIdHandler;
