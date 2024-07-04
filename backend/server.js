const express = require("express");
const path = require("path");
const app = express();

// 메인 페이지 접속 시 html 응답하기

// 미들웨어 : html, css, js, img 파일들이 담긴 곳 명시하기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const api = require("./src/api/index");
app.use("/api", api);

// MySQL 연동하기
const db = require("./src/api/db");

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.TestDB(); // TestDB 함수는 db 모듈에서 export된 함수입니다.
    res.json(result); // 결과를 JSON 형태로 반환합니다.
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ error: "Database connection test failed" });
  }
});

const http = require("http").createServer(app);
http.listen(5000, () => {
  console.log("server listen start : 5000");
});

// 직원 호출 요청
app.get('/api/staff',(req, res) => {
  let call = "직원 호출이 요청되었습니다."
  res.send(call);
  console.log(call);
});
