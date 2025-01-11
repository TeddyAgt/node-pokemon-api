const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../Models/pokemon");
const pokemons = require("./mock-pokemon");

const sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        timezone: "Etc/GMT-2",
    },
    logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize
        .sync({ force: true })
        .then((_) => {
            pokemons.map((pokemon) => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                })
                    .then((pokemon) => console.log(pokemon.toJSON()))
                    .catch((error) =>
                        console.error(
                            `Erreur lors de la création du pokémon ${pokemon.name}. Errur: ${error}`
                        )
                    );
            });
            console.log(
                `La base de données "Pokedex" a bien été synchronisée.`
            );
        })
        .catch((error) =>
            console.error(
                `Erreur lors de la synchronisation de la base de données "Pokedex". Erreur: ${error}`
            )
        );
};

module.exports = {
    initDb,
    Pokemon,
};
