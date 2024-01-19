import { Pool, QueryResultRow } from "pg";
import { CheckConnection } from "../../../../Contexts/shared/infrastructure/CheckConnection";

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: Number(process.env.POSTGRES_DB_PORT),
});

export async function ExecQuery<Result extends QueryResultRow>(
  query: string,
  values?: any[]
): Promise<Result[] | null> {
  try {
    const result = await pool.query<Result>(query, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const checkConnection: CheckConnection = async (): Promise<boolean> => {
  try {
    const result = await pool.connect();
    result.release();
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

checkConnection().then((result) => {
  console.log("POSTGRESQL connection: ", result);
});
