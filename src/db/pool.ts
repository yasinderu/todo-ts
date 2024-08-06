import pg from "pg";

class Pool {
  _pool: pg.Pool;

  constructor(dbConfig: pg.PoolConfig) {
    this._pool = new pg.Pool(dbConfig);

    this._pool.on("error", (err: Error, _client: any) => {
      console.log(err);
    });
  }

  connect(): Promise<pg.QueryResult> {
    return this._pool.query("SELECT 1 + 1;");
  }

  close() {
    return this._pool.end();
  }

  query(sql: string, params?: any) {
    return this._pool.query(sql, params);
  }
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export { pool };
