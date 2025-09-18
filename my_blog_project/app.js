const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Guardamos los posts en memoria (no hay base de datos)
let posts = [];

// Configuración
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas
app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
