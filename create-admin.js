import { auth } from './src/config/auth.js';
import dotenv from 'dotenv';
dotenv.config();

async function createAdmin() {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "mhs@admin.com",
        password: "MURAD#SHUVO",
        name: "Admin",
      },
    });
    console.log("✅ Admin user created successfully!");
    console.log("Email: mhs@admin.com");
    console.log("Password: MURAD#SHUVO");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
}

createAdmin();
