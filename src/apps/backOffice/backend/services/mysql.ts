import { Pool, PoolConnection, createPool } from "mysql";
import { CheckConnection } from "../../../../Contexts/shared/infrastructure/CheckConnection";
import { logger } from "../Logger";

export const pool: Pool = createPool({
  multipleStatements: true,
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: parseInt(process.env.MYSQL_DB_PORT ?? "3306"),
  timeout: 60000,
});

export function getConnection() {
  return new Promise<PoolConnection>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
}

getConnection()
  .then(() => {
    logger.info("MySQL connected");
  })
  .catch((error) => {
    logger.error("MySQL connection error");
    logger.error(error);
  });

export async function ExecQuery<Result>(query: string) {
  const connection = await getConnection();
  return new Promise<Result>((resolve, reject) => {
    connection.query(query, (err, result) => {
      connection.release();
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export async function ExecQueryWithValues<Result>(query: string, values: any[]) {
  const connection = await getConnection();
  return new Promise<Result>((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      connection.release();
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export const checkConnection: CheckConnection = async (): Promise<boolean> => {
  try {
    const mysqlTest = await getConnection();
    mysqlTest.release();
    if (!mysqlTest) {
      return false;
    }
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
