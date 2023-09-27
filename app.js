
const express = require("express");
const path = require("path");
const hbs = require("hbs");

//la función 
const app = express();

//puerto
const port = 8080;

//páginas estáticas
app.use(express.static("public"));

//confi directorio vistas hbs
app.set("views", path.join(__dirname + "/public"));

hbs.registerPartials(__dirname + "/public/partials");

//interpretar hbs
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    twbs: "The Warrior Barber Shop",
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Página no encontrada",
  });
});

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});
