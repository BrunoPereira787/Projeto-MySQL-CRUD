const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

// inserindo dados
app.post("/pessoas/insertpessoas", (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const telephone = req.body.telephone;

  const sql = `INSERT INTO pessoas (??, ??, ??, ??) 
    VALUES (?, ?, ?, ?)`;

  const data = [
    "nome",
    "sobrenome",
    "email",
    "telefone",
    name,
    lastName,
    email,
    telephone,
  ];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/pessoas");
  });
});

//ler dados
app.get("/pessoas", (req, res) => {
  const sql = `SELECT * FROM pessoas`;

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
    }

    const pessoas = data;
    res.render("pessoas", { pessoas });
  });
});

// editar dados
app.get("/pessoas/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM pessoas WHERE ?? = ?`;

  const data = ["id", id];

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
    }

    const pessoa = data[0];
    res.render("editpessoa", { pessoa });
  });
});

app.post("/pessoas/updatepessoa", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const telephone = req.body.telephone;

  const sql = `UPDATE pessoas SET ?? = ?, ?? = ?, 
    ?? = ?, ?? = ? WHERE ?? = ?`;

  const data = [
    "nome",
    name,
    "sobrenome",
    lastName,
    "email",
    email,
    "telefone",
    telephone,
    "id",
    id,
  ];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/pessoas");
  });
});

// deletar dados
app.get("/pessoas/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM pessoas WHERE ?? = ?`;

  const data = ["id", id];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/pessoas");
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
