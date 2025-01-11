exports.success = (message, data) => {
    return { message, data };
};

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
    const maxId = Math.max(...pokemonsIds);
    return maxId + 1;
};
