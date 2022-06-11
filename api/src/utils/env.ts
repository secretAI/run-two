import * as dotenv from "dotenv";
import { ApplicationError, HTTPStatus } from "./etc";

dotenv.config();

export function getDotEnv(key: string): string {
  const value = process.env[key.toUpperCase()];
  if(!value)
    throw new ApplicationError(HTTPStatus.NOT_FOUND, `[!] Variable ${key} not found in .env`);
  
  return value;
} 
