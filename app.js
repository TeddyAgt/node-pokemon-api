// Imports **************************************************
const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const { success } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 8000;

// Middlewares **************************************************
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
})
    .use(morgan("dev"))
    .use(favicon(__dirname + "/favicon.ico"));

// Routes **************************************************
app.get("/", (req, res) => res.send("Hello express !"));

app.get("/api/pokemons", (req, res) => {
    const message = "La liste des pokémons a bien été récupérée.";
    res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    const message = "Un pokémon a bien été trouvé.";
    res.json(success(message, pokemon));
});

// Server **************************************************
app.listen(port, () =>
    console.log(`Application started on http://localhost:${port}`)
);
