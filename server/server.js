import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import setupJWTStrategy from "./middlewares/auth.js";
import passport from "passport";

export default function createServer() {
    const app = express();

    app.use(express.json());

    app.use(morgan("tiny"));

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);

    return app;
}