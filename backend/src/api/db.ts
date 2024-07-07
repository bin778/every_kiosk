import mysql from 'mysql2';  // mysql 모듈 로드

const conn: mysql.ConnectionOptions = {  // mysql 접속 설정
  host: '127.0.0.1', // DB 호스트 설정
  port: 3306, // DB 포트번호 설정
  user: 'everykiosk', // DB 유저 설정
  password: '1234', // DB 비밀번호 설정
  database: 'everykiosk' // DB 스키마 설정
};

const pool = mysql.createPool(conn);

const db: { [key: string]: () => Promise<unknown> } = {};

db.TestDB = () => {
  return new Promise(async (resolve, reject) => {
    const sql = 'SELECT * FROM test'; // SQL 쿼리

    pool.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export default db;
