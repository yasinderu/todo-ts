import { pool } from "../db/pool";

interface TodoObj {
  content: string;
}

interface CreateTodoObj extends TodoObj {
  userId: string;
}
class TodoRepo {
  static async findAll() {
    const { rows } = await pool.query("SELECT * FROM todos;");

    return rows;
  }

  static async findByUserId(userId: string) {
    const { rows } = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1;",
      [userId]
    );

    return rows;
  }

  static async create(obj: CreateTodoObj) {
    const { rows } = await pool.query(
      `
            INSERT INTO todos (content, user_id)
            VALUES ($1, $2) RETURNING*;
        `,
      [obj.content, obj.userId]
    );

    return rows[0];
  }

  static async update(obj: TodoObj, id: string) {
    const { rows } = await pool.query(
      `UPDATE todos SET content = COALESCE($1, content) 
            WHERE id = $2 RETURNIG*;`,
      [obj.content, id]
    );

    return rows[0];
  }

  static async delete(id: string) {
    const { rows } = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING*;",
      [id]
    );

    return rows[0];
  }
}

export { TodoRepo };
