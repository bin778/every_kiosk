import express, { Request, Response } from 'express';
import path from 'path';
import { createServer } from 'http';
import api from './src/api/index';
import db from './src/api/db';

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 메인 페이지 접속 시 html 응답하기
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API 라우팅
app.use("/api", api);

// MySQL 연동하기
app.get("/api/test-db", async (req: Request, res: Response) => {
  try {
    const result = await db.TestDB();
    res.json(result);
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ error: "Database connection test failed" });
  }
});

// 서버 시작
const server = createServer(app);
server.listen(5000, () => {
  console.log("server listen start : 5000");
});

// 직원 호출 요청
app.get("/api/staff", (req: Request, res: Response) => {
  const call = "직원 호출이 요청되었습니다.";
  res.send(call);
  console.log(call);
});

