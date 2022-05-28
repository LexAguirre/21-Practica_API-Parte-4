const mongoose = require("mongoose");
const express = require("express");
const personsRoutes = require("./routes/person"); //Ahora para tener un archivo server mas limpio se establece la ruta del archivo person el cual contendra una direccion a la cual se dirigira al iniciar el server

mongoose.Promise = global.Promise;
const app = express();
app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(personsRoutes); // Ejecutamos el enrutador

mongoose.connect(
  `mongodb+srv://Admin:admin@cluster0.esdny.mongodb.net/?retryWrites=true&w=majority`,
  /*Se ingresa el codigo de conexion del mongodb y se le remplaza el nombre de usuario y la contraseña*/ {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully"); //Al conectarse exitosamente enviara el anterior mensaje
});

app.listen(3000);
