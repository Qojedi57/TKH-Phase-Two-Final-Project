import express from "express";
import jwt, { verify } from "jsonwebtoken";
import argon2 from "argon2";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/signup", async (request, response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: request.body.username,
      },
    });

    if (user) {
      response.status(401).json({
        success: false,
        message: "User already exists",
      });
    } else {
      try {
        const hashedPassword = await argon2.hash(request.body.password);

        const newUser = await prisma.user.create({
          data: {
            username: request.body.username,
            password: hashedPassword,
          },
        });

        if (newUser) {
          response.status(201).json({
            success: true,
          });
        } else {
          response.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } catch (error) {
        response.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (e) {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;