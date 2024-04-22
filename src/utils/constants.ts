import dotenv from 'dotenv';
dotenv.config();

export const PORT = parseInt(process.env.PORT!, 10) || 8080;
export const APP_NAME = process.env.APP_NAME || 'minimal-bundler-node';
export const ENVIRONMENT = process.env.NODE_ENV || 'dev';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
