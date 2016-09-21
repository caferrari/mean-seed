
module.exports = {
  SECRET: process.env.SECRET || "xpto",
  SESSION_TIMEOUT: process.env.SESSION_TIMEOUT || 600,
  MONGO_DSN: process.env.MONGO_DSN || "mongodb://mongo/database",
  ADMIN_USER: process.env.ADMIN_USER || "admin@admin.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "123456"
};
