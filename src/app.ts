import dotenv from 'dotenv';
dotenv.config();

console.clear();

import { RedisDAO } from './redisDAO';
import { OracleDAO } from './oracleDAO';

const randomNumber = Math.floor(Math.random() * 1000);

const oracleClient = new OracleDAO();
const redisClient = new RedisDAO();

//oracleClient.executeAndPrint(`SELECT NAME FROM USER$ WHERE ROWNUM <= 10 ORDER BY USER#`);

redisClient.connect();

redisClient.set(`My message - ${randomNumber}`).then();
redisClient.get();

redisClient.setAsync(
  oracleClient.connectAndExecute(
    `SELECT NAME FROM USER$ WHERE ROWNUM <= 10 ORDER BY USER#`,
  ),
);
redisClient.getAsync();
