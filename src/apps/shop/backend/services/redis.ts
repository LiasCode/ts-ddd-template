import { createClient } from "redis";
import { CheckConnection } from "../../../../Contexts/shared/infrastructure/CheckConnection";

export const redisClient = createClient({
  socket: {
    host: process.env.CACHE_IP || "localhost",
    port: Number(process.env.CACHE_PORT) || 6379,
  },
});

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

export async function redisGet<T>(key: string): Promise<T | null> {
  const response = await redisClient.get(key);
  if (!response) return null;
  const dataParsed = JSON.parse(response) as T;
  return dataParsed;
}

export async function redisSet<T>(
  key: string,
  data: T,
  cacheExpirationInSeg: number
): Promise<void> {
  try {
    const dataStringified = JSON.stringify(data);
    await redisClient.set(key, dataStringified, {
      EX: cacheExpirationInSeg,
      NX: true,
    });
    return;
  } catch (error) {
    console.error({ error });
    throw new Error("Error setting data in Redis");
  }
}

export const checkConnection: CheckConnection = async (): Promise<boolean> => {
  try {
    const redisTest = await redisClient.ping();
    if (!redisTest) {
      return false;
    }
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
