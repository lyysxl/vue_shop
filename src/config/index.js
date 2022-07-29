// 判断开发和生产环境
const isDev = process.env.NODE_ENV === 'development';
/**
 * 配置文件
 */
export const BASE_URL = isDev ? 'http://127.0.0.1:8888/api/private/v1' : 'http://localhost:3000';