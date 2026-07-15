import express from "express";
import { ticketRoutes } from "./routes/ticketRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();

// Habilitar o parse de JSON no Express
app.use(express.json());

// GET /health - Rota obrigatória
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRoutes);
app.use('/tickets', ticketRoutes);

export { app };
      