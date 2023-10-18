const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Books = require("./models/Books");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mohamedounissi2021:8X7izLlLVWYXvL0h@cluster0.mxf6yyh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("connected to mongodb"))
  .catch((err) => console.log(err));

// app.get("/api/tasks", (req, res, next) => {
//   Task.find()
//     .then((tasks) => {
//       res.status(200).json({
//         model: tasks,
//         message: "success",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error.message,
//         message: "probleme d'extraction",
//       });
//     });
// });
// app.get("/api/tasks/:id", (req, res) => {
//   Task.findOneAndUpdate({
//     _id: req.params.id,
//   })
//     .then((task) => {
//       if (!task) {
//         res.status(404).json({
//           message: "Objet non trouvé",
//         });
//       } else {
//         res.status(200).json({
//           model: task,
//           message: "Objet trouvé",
//         });
//       }
//     })
//     .catch((error) => res.status(400).json({ error: error.message }));
// });
// app.post("/api/tasks", (req, res) => {
//   const task = new Task(req.body);
//   task
//     .save()
//     .then(() => {
//       res.status(201).json({
//         model: task,
//         message: "objet créé !",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error.message,
//         message: "Donnée invalides",
//       });
//     });
// });
// app.patch("/api/tasks/:id", (req, res) => {
//   Task.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     req.body,
//     { new: true }
//   )
//     .then((task) => {
//       if (!task) {
//         res.status(404).json({
//           message: "Objet non trouvé",
//         });
//       } else {
//         res.status(200).json({
//           model: task,
//           message: "Objet modifié",
//         });
//       }
//     })
//     .catch((error) => res.status(400).json({ error: error.message }));
// });
// app.delete("/api/tasks/:id", (req, res) => {
//   console.log(req.params.id);
//   res.send(req.body);
// });

//Create Book
app.post("/api/books", async (req, res) => {
  const newBook = new Books(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//GET Books
app.get("/api/books/:ISBN", async (req, res) => {
  try {
   
    const Bookstoget = await Books.findOne({ ISBN: req.params.ISBN });
    res.status(200).json(Bookstoget);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    let BooksToget;
    BooksToget = await Books.find();
    res.status(200).json(BooksToget);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//PUT books
app.put("/api/books/:ISBN", async (req, res) => {
  try {
    const updatedBooks = await Books.findOneAndUpdate(
      { ISBN: req.params.ISBN },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete book

app.delete("/api/books/:ISBN", async (req, res) => {
  try {
    const Bookstodelete = await Books.findOneAndDelete({
      ISBN: req.params.ISBN,
    });

    if (Bookstodelete) {
      res
        .status(200)
        .json("Book with ISBN: " + req.params.ISBN + " was deleted");
    }else
    {
      res
      .status(404)
      .json("Book with ISBN: " + req.params.ISBN + " not found");
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.listen(5000, () => {});
