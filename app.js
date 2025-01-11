// Imports **************************************************
const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");

// Configuration **************************************************
const app = express();
const port = 8000;
const sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        timezone: "Etc/GMT-2",
    },
    logging: false,
});

// Middlewares **************************************************
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
})
    .use(morgan("dev"))
    .use(favicon(__dirname + "/favicon.ico"))
    .use(bodyParser.json());

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

app.post("/api/pokemons", (req, res) => {
    const id = getUniqueId(pokemons);
    const createdPokemon = { ...req.body, ...{ id: id, created: new Date() } };
    pokemons.push(createdPokemon);
    const message = `Le pokémon ${createdPokemon.name} a bien été créé`;
    res.json(success(message, createdPokemon));
});

app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPokemon = { ...req.body, id: id };
    pokemons = pokemons.map((pokemon) => {
        return pokemon.id === id ? updatedPokemon : pokemon;
    });
    const message = `Le pokémon ${updatedPokemon.name} a bien été modifié`;
    res.json(success(message, updatedPokemon));
});

app.delete("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedPokemon = pokemons.find((pokemon) => pokemon.id === id);
    pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
    const message = `Le pokémon ${deletedPokemon.name} a bien été supprimé`;
    res.json(success(message, deletedPokemon));
});

// Server **************************************************
app.listen(port, () =>
    console.log(`Application started on http://localhost:${port}`)
);

sequelize
    .authenticate()
    .then((_) =>
        console.log(
            "La connection à la base de données a correctement été initialisée"
        )
    )
    .catch((error) =>
        console.error(
            `Impossible de se connecter à la base de données. Erreur: ${error}`
        )
    );
