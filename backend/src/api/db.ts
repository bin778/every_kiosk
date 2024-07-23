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

const queryFunc = (sql: string) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    connection.query(sql, (err, results) => {
      if (err) {
        console.trace(err);
        reject(err);
      } else {
        connection.end();
        resolve(results);
      }
    });
  });
};

// Item DB 목록 가져오기
db.selectItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// RecommendItem DB 목록 가져오기
db.selectRecommendItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item where item_recommend = TRUE;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// HamburgerItem DB 목록 가져오기
db.selectHamburgerItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "hamburger";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// SideItem DB 목록 가져오기
db.selectSideItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "side";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// DrinkItem DB 목록 가져오기
db.selectDrinkItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "drink";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

export default db;
