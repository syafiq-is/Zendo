// lib/mongo.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    bucket: GridFSBucket | null;
  };
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null, bucket: null };
}

const cached = global.mongoose;

export async function connectDB() {
  if (cached.conn && cached.bucket) {
    return { conn: cached.conn, bucket: cached.bucket };
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  console.log("✓ Connected to MongoDB");

  cached.conn = await cached.promise;

  cached.bucket = new mongoose.mongo.GridFSBucket(cached.conn.connection.db, {
    bucketName: "uploads",
  });

  console.log("✓ Connected to GridFS Bucket");

  return { conn: cached.conn, bucket: cached.bucket };
}
