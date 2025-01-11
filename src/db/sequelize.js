const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const PokemonModel = require("../Models/pokemon");
const UserModel = require("../Models/user");
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
const User = UserModel(sequelize, DataTypes);

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

            bcrypt
                .hash("cosmo", 10)
                .then((hash) =>
                    User.create({ username: "cosmo", password: hash }).then(
                        (user) => console.log(user.toJSON())
                    )
                );

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
    User,
};
