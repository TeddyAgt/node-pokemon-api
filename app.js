// Imports **************************************************
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

// Configuration **************************************************
const app = express();
const port = process.env.PORT || 8000;

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
    .use(favicon(__dirname + "/favicon.ico"))
    .use(bodyParser.json());

// Routes **************************************************
app.get("/", (req, res) => {
    res.json("Hello Cosmo ! 🐈");
});
require("./src/Routes/login")(app);
require("./src/Routes/findAllPokemons")(app);
require("./src/Routes/findPokemonById")(app);
require("./src/Routes/createPokemon")(app);
require("./src/Routes/updatePokemon")(app);
require("./src/Routes/deletePokemon")(app);

app.use(({ res }) => {
    const message = "La ressource demandée est introuvable. Vérifiez l'URL.";
    res.status(404).json({ message });
});
