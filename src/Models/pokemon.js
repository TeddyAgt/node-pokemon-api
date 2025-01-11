const validTypes = [
    "Plante",
    "Poison",
    "Feu",
    "Eau",
    "Insecte",
    "Vol",
    "Normal",
    "Electrik",
    "Fée",
];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Pokemon",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Le nom est déjà pris",
                },
                validate: {
                    notEmpty: { msg: "Le nom ne peut pas être vide" },
                    notNull: { msg: "Le nom ne peut pas être vide" },
                },
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres" },
                    notNull: {
                        msg: "Les points de vie ne peuvent pas être nuls",
                    },
                    min: {
                        args: [0],
                        msg: "Les points de vie doivent être au minimum à 0",
                    },
                    max: {
                        args: [999],
                        msg: "Les points de vie ont un maximum de 999",
                    },
                },
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres" },
                    notNull: {
                        msg: "Les points de combat ne peuvent pas être nuls",
                    },
                    min: {
                        args: [0],
                        msg: "Les points de combat doivent être au minimum à 0",
                    },
                    max: {
                        args: [99],
                        msg: "Les points de combat ont un maximum de 99",
                    },
                },
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: { msg: "Utilisez une URL valide" },
                    notNull: {
                        msg: "L'image est requise",
                    },
                },
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue("types").split(",");
                },
                set(types) {
                    this.setDataValue("types", types.join());
                },
                validate: {
                    isTypeValid(value) {
                        if (!value) {
                            throw new Error(
                                "Un pokémon doit avoir au moins un type"
                            );
                        }
                        if (value.split(",").length > 3) {
                            throw new Error(
                                "Un pokémon doit avoir au maximum 3 types"
                            );
                        }
                        value.split(",").forEach((type) => {
                            if (!validTypes.includes(type)) {
                                throw new Error(
                                    `Le type "${type}  n'est pas valide. Liste des types: ${validTypes}`
                                );
                            }
                        });
                    },
                },
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
