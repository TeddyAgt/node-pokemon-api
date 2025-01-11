const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
    app.post("/api/login", (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then((user) => {
                if (!user) {
                    const message =
                        "Les identifiants de connexion ne sont pas correctes";
                    return res.status(401).json({ message });
                }

                bcrypt
                    .compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if (isPasswordValid) {
                            const token = jwt.sign(
                                { userId: user.id },
                                privateKey,
                                { expiresIn: "24h" }
                            );
                            const message = `L'utilisateur a été connecté avec succès.`;

                            return res.json({ message, data: user, token });
                        } else {
                            const message =
                                "Les identifiants de connexion ne sont pas correctes";
                            res.status(401).json({ message });
                        }
                    });
            })
            .catch((error) => {
                const message = "L'utilisateur n'a pas pu être connecté.";
                res.json({ message, data: error });
            });
    });
};
