export const {
  SECRET,
  BACKEND_URL,
  FRONTEND_URL,
  ADMIN_PASSWORD,
  ADMIN_NAME,
  ADMIN_EMAIL,
} = {
  SECRET: process.env.SECRET || "HopeHotel",
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:4000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  ADMIN_NAME: process.env.ADMIN_NAME || "DefaultAdmin",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123pass",
};
