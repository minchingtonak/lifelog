import { NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import initDb from "@db/db";

export default function db() {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    await initDb();
    return next();
  };
}
