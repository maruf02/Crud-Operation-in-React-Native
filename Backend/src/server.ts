import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";

// App Initialization
const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(config.database_url as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define the Schema & Model
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("CrudItem", ItemSchema);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! Welcome to the CRUD API 🚀");
});

// Get all items
app.get("/api/items", async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// Add new item
app.post("/api/items", async (req: Request, res: Response) => {
  try {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
});

// Update item
app.put("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// Delete item
app.delete("/api/items/:id", async (req: Request, res: Response) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start Server
app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});
