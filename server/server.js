import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import setupJWTStrategy from "./middlewares/auth.js";
import passport from "passport";

export default function createServer() {
    const app = express();

    app.use(express.json());

    app.use(morgan("tiny"));

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);
    app.use("/books", bookRouter)

    return app;
}