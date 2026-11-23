// api/server.js
// Simple Express server to expose mock data for HuertoHogar
import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Helper to load JSON files from the api folder
async function loadJson(file) {
  const filePath = path.join(__dirname, file);
  const data = await readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
}

// GET /products – returns the product catalog
app.get("/products", async (req, res) => {
  try {
    const products = await loadJson("products.json");
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load products" });
  }
});

// GET /orders – returns a static empty array (placeholder)
app.get("/orders", async (req, res) => {
  try {
    const orders = await loadJson("orders.json");
    res.json(orders);
  } catch (e) {
    // If orders file does not exist, return empty array
    res.json([]);
  }
});

// POST /orders – receive an order and echo it back (in‑memory storage)
const orders = [];
app.post("/orders", (req, res) => {
  const order = req.body;
  order.id = orders.length + 1;
  orders.push(order);
  res.status(201).json(order);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`HuertoHogar API listening on http://localhost:${PORT}`);
});
