import { db } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../types";

const delayResponse = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const delayNumber = Number(req.body.delay);

  try {
    console.log("delayNumber en update task name", delayNumber);
    await delayResponse(delayNumber);
    const queryText = "UPDATE tasks SET title = $2 WHERE id = $1";
    await db.query<Task>(queryText, [req.body.id, req.body.title]);
    console.log(req.body);
    res.status(200).json({ message: "Tarea actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando la tarea" });
  }
}
