import express, { Request, Response } from "express";
import db from "./db"; // db 모듈을 default로 가져옴

const router = express.Router();

// /api/test GET 데이터 전달
router.get("/test", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const test = await db.TestDB(); // TestDB 함수 호출
  res.send({ result: test });
});

export default router;
