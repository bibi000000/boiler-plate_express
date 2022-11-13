const redisUtil = require('redis')
require('dotenv').config()
const redisClient = redisUtil.createClient({
  port: process.env.REDIS_PIRT
})
redisClient.on('connect', () => {
  console.log('Connected to Redis ~ !')
})
redisClient.on('error', (err) => {
  console.log('Redis Client Error ! ~', err)
})
redisClient.connect();

module.exports = redisClient;