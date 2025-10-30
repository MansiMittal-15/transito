import express from "express";
import { getBalance, transfer } from "../controllers/account.js";
import { authMiddleware } from "../middleware/user.js";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalance);
accountRouter.post("/transfer", authMiddleware, transfer);

export default accountRouter;