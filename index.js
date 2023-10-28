const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksRoute = require("./routes/books");
const authRoute = require("./routes/auth");
const authorRoute = require("./routes/Author");
const CategoryRoute = require("./routes/category");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!", e));

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

app.use("/api/books", booksRoute);
app.use("/api/auth", authRoute);
app.use("/api/author", authorRoute);
app.use("/api/category", CategoryRoute);

app.listen(5000, () => {});
