import express from "express";
import prisma from "../db/index.js";

export default function setupBookRouter(passport) {
  const router = express.Router();

  //get all books in database
  router.get("/", async (req, res) => {
    const allBooks = await prisma.book.findMany();

    res.status(200).json({
      success: true,
      books: allBooks
    })
  })

  //get book by author id
  router.get("/author/:authorId", async (req, res) => {
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
  router.get("/genre/:genre", async (req, res) => {
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
  });

    //get books by id
    router.get("/:id", async (req, res) => {
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

    router.post("/:authorId", passport.authenticate("jwt", { session: false }), async (req, res) => {
      const authorId = req.params.authorId;
      console.log(req.body)
      const newBooks = await prisma.book.create({
        data: {
          title: req.body.title,
          genre: req.body.genre,
          desc: req.body.desc,
          authorId: Number(authorId),
          userId: req.user.id
        },
      });

      console.log(newBooks);

      res.status(201).json({
        success: true,
      });
      //     }
      //   );
    });


    router.delete("/:booksId", passport.authenticate("jwt", { session: false }),
    
      async function (request, response) {
        const booksId = parseInt(request.params.booksId);
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

    router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
      const id = req.params.id;

      const editBook = await prisma.book.update({
        where: {
          id: Number(id)
        },
        data: {
          title: req.body.title,
          genre: req.body.genre,
          desc: req.body.desc
        }
      })

      res.status(200).json({
        success: true,
        editBook
      })
    });

    router.delete("/author/:authorid", passport.authenticate("jwt", { session: false }), async (req, res) => {
      const authorId = req.params.authorid;

      console.log(authorId)

      const deleteBooks = prisma.book.deleteMany({
        where: {
          authorId: Number(authorId),
        },
      })

      const deleteAuthor = prisma.author.delete({
        where: {
          id: Number(authorId),
        },
      })

      const transaction = await prisma.$transaction([deleteBooks, deleteAuthor]);

      console.log(transaction)

      res.status(200).json({
        success: true
      })
    });
  
  return router;
}













