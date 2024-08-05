import { pool } from "../db/pool";

class UserRepo {
    static async findAll() {
        const { rows } = await pool.query("SELECT id, username, created_at, updated_at FROM users;")

        return rows
    }

    static async create(username: string, password: string) {
        const { rows } = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;",
            [username, password]
        )

        return rows[0]
    }

    static async findById(id: number) {
        const { rows } = await pool.query(
            "SELECT id, username, created_at, updated_at FROM users WHERE id = $1",
            [id]
        )

        return rows
    }

    static async findByUsername(username: string) {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])

        return rows[0]
    }
}

export { UserRepo }