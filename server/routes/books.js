import express from "express";
import prisma from "../db/index.js";

export default function setupBookRouter(passport) {
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
})


router.delete(
    "/:booksId",
    passport.authenticate("jwt", { session: false }),
    async function (request, response) {
      const booksId = parseInt(request.params.bookId);
      try {
        await prisma.book.delete({
          where: {
            id: booksId,
          },
        });

        response.status(200).json({
          success: true,
        });
      } catch (e) {
        console.log(e);
        if (e.code == "P2025") {
          response.status(404).json({
            success: false,
          });
        } else {
          response.status(500).json({
            success: false,
          });
        }
    }
    }
    );

return router;
}