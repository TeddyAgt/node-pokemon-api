const express = require("express");
const { success } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 8000;

// Routes
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

// Server
app.listen(port, () =>
    console.log(`Application started on http://localhost:${port}`)
);
