import express from "express";
import morgan from "morgan";

export default function createServer() {
    const app = express();

    app.use(express.json());

    app.use(morgan("tiny"))

    return app;
}