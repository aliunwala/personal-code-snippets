require("dotenv").config(); // Load environment variables at the very beginning
const express = require("express");
const db = require("./data/db"); // Our database module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// --- CRUD Endpoints for Products ---

// CREATE a new product
app.post("/products", async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, parseFloat(price)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating product:", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ all products
app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ a single product by ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE a product by ID
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || price === undefined) {
    return res
      .status(400)
      .json({ error: "Name and price are required for update" });
  }

  try {
    const result = await db.query(
      "UPDATE products SET name = $1, description = $2, price = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [name, description, parseFloat(price), id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error updating product ${id}:`, err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a product by ID
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    // res.json({ message: 'Product deleted successfully', deletedProduct: result.rows[0] });
    res.status(204).send(); // 204 No Content is common for successful DELETE
  } catch (err) {
    console.error(`Error deleting product ${id}:`, err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello from Express CRUD App!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
