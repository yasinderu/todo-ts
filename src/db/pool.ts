import pg from 'pg'

class Pool {
  _pool: pg.Pool

  constructor(dbConfig: pg.PoolConfig) {
    this._pool = new pg.Pool(dbConfig)

    this._pool.on('error', (err: Error, _client: any) => {
      console.log(err)
    })
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
  host: "db",
    port: 5432,
    database: "todo",
    user: "postgres",
    password: "password123",
})

export { pool }
