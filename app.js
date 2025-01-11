// Imports **************************************************
const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

// Configuration **************************************************
const app = express();
const port = 8000;

// Server **************************************************
app.listen(port, () =>
    console.log(`L'application a bien démarré sur http://localhost:${port}`)
);

sequelize.initDb();

// Middlewares **************************************************
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
})
    .use(morgan("dev"))
    .use(favicon(__dirname + "/favicon.ico"))
    .use(bodyParser.json());

// Routes **************************************************
require("./src/Routes/findAllPokemons")(app);
require("./src/Routes/findPokemonById")(app);
require("./src/Routes/createPokemon")(app);
