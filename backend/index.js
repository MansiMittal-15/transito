
import express  from "express";
import { connectDB } from "./database/db.js";
import { config } from "dotenv";
import mainRouter from "./routes/index.js";
import cors from "cors";

config({});
const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/v1", mainRouter);

app.get("/", async (req, res)=>{
  return res.status(200).json({
    message: "Jai shree radhekrishna...",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
  console.log(`port listen at ${port}`);
  connectDB();
});

console.log('jai shree radhekrishna');