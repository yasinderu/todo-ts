import { pool } from "../db/pool";

class TodoRepo {
    static async findAll() {
        const { rows } = await pool.query("SELECT * FROM todos;")

        return rows
    }

    static async findByUserId(userId: string) {
      const { rows } = await pool.query("SELECT * FROM todos WHERE user_id = $1;", [userId])

      return rows
    }
}

export { TodoRepo }