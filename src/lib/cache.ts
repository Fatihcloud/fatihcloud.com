import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.cache');

export async function withCache<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  const cacheFile = path.join(CACHE_DIR, `${key}.json`);

  try {
    if (fs.existsSync(cacheFile)) {
      const stats = fs.statSync(cacheFile);
      const isExpired = (Date.now() - stats.mtimeMs) / 1000 > ttlSeconds;

      if (!isExpired) {
        const data = fs.readFileSync(cacheFile, 'utf-8');
        return JSON.parse(data) as T;
      }
    }
  } catch (error) {
    console.error(`Cache read error for ${key}:`, error);
  }

  const data = await fetcher();

  try {
    fs.writeFileSync(cacheFile, JSON.stringify(data), 'utf-8');
  } catch (error) {
    console.error(`Cache write error for ${key}:`, error);
  }

  return data;
}
