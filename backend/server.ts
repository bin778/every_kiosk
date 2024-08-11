import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import api from './src/api/index';
import db from './src/api/db';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

// Iamport API를 사용하기 위한 인증 정보
const API_KEY = process.env.IMP_KEY;
const API_SECRET = process.env.IMP_SECRET;

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

// 액세스 토큰을 가져오기 위한 함수
const getAccessToken = async () => {
  try {
    const response = await axios.post('https://api.iamport.kr/users/getToken', {
      imp_key: API_KEY,
      imp_secret: API_SECRET,
    });
    return response.data.response.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// 결제 정보를 조회하기 위한 함수
const getPaymentByImpUid = async (imp_uid: string) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`https://api.iamport.kr/payments/${imp_uid}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting payment information:', error);
    throw error;
  }
};

// 결제 요청 엔드포인트
app.post('/api/payment', async (req: Request, res: Response) => {
  const { amount, imp_uid, merchant_uid } = req.body;

  try {
    const paymentInfo = await getPaymentByImpUid(imp_uid);

    if (paymentInfo.response.status === 'paid') {
      if (paymentInfo.response.amount === amount) {
        res.status(200).json({ success: true, message: '결제 성공' });
      } else {
        res.status(400).json({ success: false, message: '금액이 맞지 않습니다.' });
      }
    } else {
      res.status(400).json({ success: false, message: `결제 실패: ${paymentInfo.response.fail_reason}` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: '결제 처리 중 오류가 발생했습니다.' });
  }
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