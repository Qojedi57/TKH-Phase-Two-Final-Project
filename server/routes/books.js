import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

//get all books in database
router.get("/", async(req, res) => {
    const allBooks = await prisma.book.findMany();

    res.status(200).json({
        success: true,
        books: allBooks
    })
})

//get books by id
router.get("/:id", async(req, res) => {
    const id = req.params.id;

    const getBook = await prisma.book.findFirst({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        success: true,
        getBook
    })
})

//get book by author id
router.get("/author/:authorId", async(req, res) => {
    const id = req.params.authorId;

    const getBookByAuthor = await prisma.book.findFirst({
        where: {
            authorId: Number(id)
        }
    })
    console.log("newAuthor");
    res.status(200).json({
        success: true,
        getBookByAuthor
    })
})

//get book by genre
router.get("/genre/:genre", async(req, res) => {
    const id = req.params.genre;

    const getBookByAuthor = await prisma.book.findFirst({
        where: {
            genre: id
        }
    })

    res.status(200).json({
        success: true,
        getBookByAuthor
    })

    router.post(
        "/",
        passport.authenticate("jwt", { session: false }),
        async function (request, response) {""
          const newBooks = await prisma.book.create({
            data: {
              title: request.body.title,
              genre: request.user.id,
              description: request.body.description,
            },
          });
    
          console.log(newBooks);
    
          response.status(201).json({
            success: true,
          });
        }
      );
})




export default router;