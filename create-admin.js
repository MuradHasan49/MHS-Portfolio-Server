import { auth } from './auth.js';
import dotenv from 'dotenv';
dotenv.config();

async function createAdmin() {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@example.com",
        password: "password123",
        name: "Admin",
      },
    });
    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: password123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
}

createAdmin();
