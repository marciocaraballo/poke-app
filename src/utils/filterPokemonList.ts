import { Pokemon } from '../types'

const filterByPokemonlist = (
    nameOrIdFilter: string,
    pokemonList: ReadonlyArray<Pokemon>
): ReadonlyArray<Pokemon> => {
    if (nameOrIdFilter === '') {
        return pokemonList
    }

    const parsedInput = parseInt(nameOrIdFilter, 10)

    /**
     * As there are no pokemons named as only numbers, we can assume the user entered
     * a string that can correspond to a name
     */
    if (Number.isNaN(parsedInput)) {
        return pokemonList.filter((pokemon) =>
            pokemon.name.startsWith(nameOrIdFilter)
        )
    } else {
        /**
         * The pokemon listing API does not surface an ID, but it does surface a url that is unique
         * with that ID. If the user added a number, we can assume it is an ID (no pokemons are named as pure numbers),
         * and a URL should exist for that pokemon ID, since it is the same URL used to get pokemon details
         */
        return pokemonList.filter(
            (pokemon) =>
                pokemon.url ===
                `https://pokeapi.co/api/v2/pokemon/${parsedInput}/`
        )
    }
}

export default filterByPokemonlist
