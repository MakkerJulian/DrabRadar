export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    uri: `${process.env.DB_SOCKET === 'true' ? 'socket' : 'postgres'}://${
      process.env.DB_USERNAME
    }:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${
      process.env.DB_SOCKET === 'true' ? '' : `:${process.env.DB_PORT}`
    }?db=${process.env.DB_DATABASE}`,
  },
});
