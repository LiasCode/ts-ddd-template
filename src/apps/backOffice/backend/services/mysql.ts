import { Pool, PoolConnection, createPool } from "mysql";
import { CheckConnection } from "../../../../Contexts/shared/infrastructure/CheckConnection";

export const pool: Pool = createPool({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  timeout: 60000,
});

console.log("Connected to MySQL");

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

export async function ExecQuery<Result>(query: string) {
  const connection = await getConnection();
  return new Promise<Result>((resolve, reject) => {
    connection.query(query, (err, result) => {
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
    if (!mysqlTest) {
      return false;
    }
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
