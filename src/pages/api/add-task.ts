import { db } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../types";

const delayResponse = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let time = new Date();

  const delayNumber = Number(req.body.delay);

  try {
    console.log("delayNumber en add", delayNumber);
    await delayResponse(delayNumber);
    const queryText =
      "INSERT INTO tasks (title, created_at, username) VALUES ($1, $2, $3) RETURNING *";
    await db.query<Task>(queryText, [req.body.title, time, req.body.user]);
    res.status(200).json({ message: "Tarea creada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la tarea" });
  }
}
