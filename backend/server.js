const express = require("express");
const path = require("path");
const app = express();

// 메인 페이지 접속 시 html 응답하기

// 미들웨어 : html, css, js, img 파일들이 담긴 곳 명시하기
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
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
