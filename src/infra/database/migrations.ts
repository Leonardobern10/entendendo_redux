import { database } from "@/src";

export default async function runMigrations() {
  const db = await database();
  if (!db) throw new Error("Erro no DB");
  await db.execAsync(`PRAGMA foreign_keys = ON;`);
  await db.execAsync(`
DROP TABLE IF EXISTS products_orders;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS clients;

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(90) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
        price NUMERIC (10, 2) NOT NULL DEFAULT 0.0 CHECK (price >= 0.0)
    );

    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR (90) NOT NULL,
        email VARCHAR (255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value NUMERIC (10, 2) NOT NULL DEFAULT 0.0 CHECK (value >= 0.0),
        client_id INTEGER NOT NULL,
        CONSTRAINT orders_client_fk FOREIGN KEY (client_id)
        REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS products_orders (
      product_id INTEGER,
      order_id INTEGER,
      quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
      price_at_moment NUMERIC (10, 2) NOT NULL DEFAULT 0.0 CHECK (price_at_moment >= 0.0),
      CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT order_fk FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT products_orders_ok PRIMARY KEY (product_id, order_id)
    );

    INSERT INTO products (name, quantity, price)
    VALUES ('CANETA', 10, 2.50);
    `);
  console.log("Migrations executadas com sucesso!");
}
