const router = require("express").Router();
const Books = require("../models/Books");
const BookController = require ("../controller/booksController");
const authMidleware = require("../midleware/auth")

router.get("/",authMidleware.loggedMiddleware,BookController.fetshBooks);
router.get("/:ISBN",authMidleware.loggedMiddleware,BookController.getBookById);
router.post("/",authMidleware.loggedMiddleware,BookController.addBook);
router.put("/:ISBN",authMidleware.loggedMiddleware,BookController.updateBook);
router.delete("/:ISBN",authMidleware.loggedMiddleware,BookController.deleteBook);



module.exports = router;
