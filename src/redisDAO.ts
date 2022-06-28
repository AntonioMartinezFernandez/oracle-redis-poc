import OracleDB from 'oracledb';
import { createClient } from 'redis';

export class RedisDAO {
  client = createClient({
    url: process.env.REDIS_URL,
  });

  async connect(): Promise<void> {
    await this.client.connect();
    this.client.on('error', (err) => console.log('Redis Client Error: ', err));
  }

  async set(msg: string): Promise<void> {
    await this.client.expire(
      'stringKey',
      parseInt(process.env.REDIS_EXPIRATION || '60'),
    );

    await this.client.set('stringKey', msg);
  }

  async get(): Promise<void> {
    const response = await this.client.get('stringKey');
    console.log('String message from redis:');
    console.log(response);
  }

  async setAsync(
    oraclePromise: Promise<OracleDB.Result<unknown> | null>,
  ): Promise<void> {
    if (oraclePromise === null) {
      this.client.set('asyncKey', 'null');
    }

    const msg = await oraclePromise;
    const msgAsString = JSON.stringify(msg?.rows);

    await this.client.expire(
      'asyncKey',
      parseInt(process.env.REDIS_EXPIRATION || '60'),
    );

    await this.client.set('asyncKey', msgAsString);
  }

  async getAsync(): Promise<void> {
    const response = await this.client.get('asyncKey');
    console.log('Oracle message from redis:');
    console.log(response);
  }
}
