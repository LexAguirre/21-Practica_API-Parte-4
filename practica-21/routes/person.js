const express = require("express");
const router = express.Router();
//Ejecutamos una extencion de express donde enviara como enrutar al archivo server.js
const mongoose = require("../node_modules/mongoose"); //busca un directorio en especial
let Person = require("../models/person");
const person = require("../models/person");

router.get("/", function (req, res) {
  res.render("main");
}); //Se crea una ruta raiz para cuando ingrese al localhost y esta ejecuta el index.ejs

router.get("/listPerson", (req, res, next) => {
  Person.find(function (err, person) {
    if (err) return next(err);
    //res.json(person); Ahora en lugar de renderizar el json de person
    res.render("personIndex", { person }); //Ejecutara el archivo 'personIndex' y tambien le envia el json
  });
}); //Se crea la ruta para ver el listo de registros en la coleccion

router.get("/addPerson", function (req, res) {
  res.render("person");
}); //Se crea el render con el objetivo poder ver el formulario donde podremos enviar los datos

router.post("/addPerson", function (req, res) {
  const myPerson = new Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  }); //Se creo una nueva identidad para que permita agregar a un nuevo objeto en el coleccion de MongoDB
  myPerson.save();
});
// Se crea una ruta a la cual va a poder acceder el servidor para poder observar la colecion

//DELETE PERSON - findByIdAndRemove
router.get("/deletePerson/:id", function (req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.redirect("/listPerson");
  });
});

//EDIT PERSON - findById
router.get("/findById/:id", function (req, res, next) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return next(err);
    res.render("personUpdate", { person });
  });
});

router.post("/updatePerson", function (req, res, next) {
  Person.findByIdAndUpdate(
    req.body.objId,
    {
      nombre: req.body.nombre,
      edad: req.body.edad,
      tipoSangre: req.body.tipoSangre,
      nss: req.body.nss,
    },
    function (err, post) {
      if (err) return next(err);
      res.redirect("/listPerson");
    }
  ); //Se creo una nueva identidad para que permita agregar a un nuevo objeto en el coleccion de MongoDB
});

module.exports = router;
