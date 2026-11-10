import express from "express";
import {config} from "dotenv";
import {connectDB, disconnectDB} from "./config/db.js";

//Import routes
import prodRoutes from "./routes/prodRoutes.js";

//config
config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//API routes
app.use("/product", prodRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// error handling outside the code and database

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});