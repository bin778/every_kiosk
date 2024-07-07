import mysql, { Pool, QueryResult } from 'mysql2';

const conn = {
  host: '127.0.0.1',
  port: 3306,
  user: 'everykiosk',
  password: '1234',
  database: 'everykiosk'
};

const pool: Pool = mysql.createPool(conn);

interface DbInterface {
  TestDB: () => Promise<unknown>;
}

const db: DbInterface = {
  TestDB: async () => {
    const sql = `SELECT * FROM test`;
  
    try {
      const results = await new Promise<QueryResult>((resolve, reject) => {
        pool.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      
      return results;
    } catch (error) {
      throw error;
    }
  }
};

export default db;
