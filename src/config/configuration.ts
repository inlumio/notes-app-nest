export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'postgres',
  },
});
