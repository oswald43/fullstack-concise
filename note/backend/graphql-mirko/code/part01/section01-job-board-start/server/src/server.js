import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";

const app = express();
app.use(cors(), express.json(), authMiddleware);
app.post("/login", handleLogin);

const port = 9000;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
});
