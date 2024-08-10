import dotenv from 'dotenv'; // DB 계정 환경변수 설정
import mysql from 'mysql2';  // mysql 모듈 로드
dotenv.config();

const conn: mysql.ConnectionOptions = {  // mysql 접속 설정
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
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

// 메뉴 DB 목록 가져오기
db.selectItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 햄버거세트 DB 목록 가져오기
db.selectSets = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from sets;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 추천 메뉴 DB 목록 가져오기
db.selectRecommendItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item where item_recommend = TRUE;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 햄버거단품 DB 목록 가져오기
db.selectHamburgerItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "hamburger";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 사이드 DB 목록 가져오기
db.selectSideItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "side";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 음료 DB 목록 가져오기
db.selectDrinkItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from item JOIN itemgroup ON item.itemgroup_id = itemgroup.itemgroup_id WHERE itemgroup_name = "drink";`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 재료 DB 목록 가져오기
db.selectIngredientItem = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from ingredient;`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 장바구니 DB 목록 가져오기
db.selectCart = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM ORDERS;`

    const result = await queryFunc(sql);
    resolve(result);
  });
}

// 장바구니 DB 목록 추가하기
export const insertCart = async (title: string, image: string, quantity: number, price: number): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `INSERT INTO ORDERS (orders_title, orders_image, orders_quantity, orders_price) VALUES ('${title}', '${image}', '${quantity}', '${price}');`;

      const result = await queryFunc(sql);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// 장바구니 DB 목록 추가하기(세트 상품)
export const insertSetCart = async (title: string, image: string, quantity: number, price: number, ingredient: string, side: string, drink: string): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `INSERT INTO ORDERS (orders_title, orders_image, orders_quantity, orders_price, sets_ingredient, sets_side, sets_drink) VALUES ('${title}', '${image}', '${quantity}', '${price}', '${ingredient}', '${side}', '${drink}');`;

      const result = await queryFunc(sql);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// 장바구니 DB 목록 삭제하기
export const deleteCart = async (id: number): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `DELETE FROM ORDERS WHERE orders_id = ${id};`

      const result = await queryFunc(sql);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// 모든 장바구니 DB 목록 가져오기
db.allDelete = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `DELETE FROM ORDERS;`

    const result = await queryFunc(sql);
    resolve(result);
  });
}

export default db;