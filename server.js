const express = require('express');
const app = express();

app.listen(3000, console.log("servidor funcionando 3000"))

app.get("/", (req,res)=>{
    res.send("hola desde express")
})