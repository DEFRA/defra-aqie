import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'some_database',
});

export async function getUser(username: string) {
  const [rows]: any = await connection.promise().query(
    `SELECT * 
      FROM users 
      WHERE username = ?`,
    [username]
  );

  return rows[0];
}

export async function createUser(username: string, password: string) {
  const { insertId } = await connection.promise().query(
    `INSERT INTO users (username, password) 
      VALUES (?, ?)`,
    [username, password]
  );

  return insertId;
}
