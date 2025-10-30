import express from "express"
import { signin, signup, updateDetails, userFilter } from "../controllers/user.js";
import { authMiddleware } from "../middleware/user.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);
userRouter.route("/update").put(authMiddleware, updateDetails);
userRouter.route("/").get(userFilter);

export default userRouter;