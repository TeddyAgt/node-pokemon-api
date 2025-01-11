const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
    app.get("/api/pokemons", (req, res) => {
        Pokemon.findAll()
            .then((pokemons) => {
                const message = "La liste des pokémons a bien été récupérée.";
                res.json({ message, data: pokemons });
            })
            .catch((error) =>
                console.error(
                    `Erreur lors de la récupération de la liste des pokémons: ${error}`
                )
            );
    });
};
