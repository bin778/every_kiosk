import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import api from './src/api/index';
import db from './src/api/db';
import Iamport from 'iamport'

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const iamport = new Iamport({
  impKey: process.env.IMP_KEY,
  impSecret: process.env.IMP_SECRET
});

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

// 직원 호출 요청
app.post("/api/staff", (req: Request, res: Response) => {
  const { reason } = req.body;
  const call = `직원 호출이 요청되었습니다. 사유: ${reason}`;
  res.send(call);
  io.emit('staffCall', call);
  console.log(call);
});

// 결제 요청 엔드포인트
app.post("/api/payment", async (req: Request, res: Response) => {
  const { amount, imp_uid, merchant_uid } = req.body;

  iamport.payment.getByImpUid({ imp_uid: imp_uid }).then(function(payment) {
    // 결제 금액 확인
    if (payment.amount === amount) {
      res.status(200).json({ success: true, message: "결제 성공" });
    } else {
      res.status(400).json({ success: false, message: "금액이 맞지 않습니다." });
    }
  }).catch(function(error){
    console.error("Error processing payment:", error);
  });
});

// 서버 시작
server.listen(5000, () => {
  console.log("server listen start : 5000");
});

// WebSocket 연결
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});