// lib/mongoose.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_AUTH = process.env.MONGODB_AUTH;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI 환경 변수가 설정되지 않았습니다!");
}

// 글로벌 타입 확장
declare global {
  // allow global `var` caching across hot reloads in dev
  // eslint-disable-next-line no-var
  var _mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        authSource: MONGODB_AUTH,
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("🚀 MongoDB 연결 성공!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB 연결 실패:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
