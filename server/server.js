import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import setupJWTStrategy from "./middlewares/auth.js";
import passport from "passport";
import authorRouter from "./routes/author.js";
import cors from "cors";

export default function createServer() {
    const app = express();
    app.use(cors())
    app.use(express.json());

    app.use(morgan("tiny"));

    // app.use(cors());

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);
    app.use("/books", bookRouter(passport));
    app.use("/author", authorRouter(passport));

    return app;
}