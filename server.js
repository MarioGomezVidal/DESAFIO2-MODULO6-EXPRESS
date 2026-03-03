const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


app.listen(3000, console.log("servidor funcionando localhost:3000"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

//funcion GET - obtener canciones

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(
    fs.readFileSync("repertorio.json", "utf8")
  );

  res.json(canciones);
});

// funcion GET - Obtener cancion x ID

app.get("/canciones/:id", (req, res) => {
  const { id } = req.params;

  const todasLasCanciones = JSON.parse(
    fs.readFileSync("repertorio.json", "utf8")
  );

  const cancion = todasLasCanciones.find(c => c.id == id);

  if (!cancion) {
    return res.send("No existe una canción con este ID");
  }

  res.json(cancion);
});

// funcion POST

app.post("/canciones", (req, res) => {
  const todasLasCanciones = JSON.parse(
    fs.readFileSync("repertorio.json", "utf8")
  );

  let id = todasLasCanciones.length + 1;

  const nuevaCancion = {
    id,
    titulo: req.body.titulo,
    artista: req.body.artista,
    tono: req.body.tono,
  };

  todasLasCanciones.push(nuevaCancion);

  fs.writeFileSync(
    "repertorio.json",
    JSON.stringify(todasLasCanciones)
  );

  res.json(todasLasCanciones);
});



