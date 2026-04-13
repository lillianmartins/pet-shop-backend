import mysql from "mysql2/promise";

export default async function obterConexao() {
  if (globalThis.poolConexoes) {
    return await globalThis.poolConexoes.getConnection();
  } else {
    globalThis.poolConexoes = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "pet-shop",
      charset: "utf8mb4",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      acquireTimeout: 60000,
    });

    console.log('✅ Conectado ao banco de dados MySQL');
    return await globalThis.poolConexoes.getConnection();
  }
}
