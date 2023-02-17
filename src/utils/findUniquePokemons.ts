import { Pokemon } from "../types";

/**
 * Removes duplicated pokemons in a collection by name
 * 
 * @param arrayToRemove Array<Pokemon>
 * @returns Array<Pokemon>
 */
const findUniquePokemons = (arrayToRemove: Array<Pokemon>): Array<Pokemon> => {
    return arrayToRemove.filter((currentElem, index, self) => self.findIndex(t => t.name === currentElem.name) === index)
}

export default findUniquePokemons;