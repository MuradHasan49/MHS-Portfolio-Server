import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

// Better Auth requires a pure MongoClient for its adapter
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET || "super_secret_dev_key",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    trustedOrigins: ["http://localhost:3000", "https://muradhasan49.vercel.app"],
});
