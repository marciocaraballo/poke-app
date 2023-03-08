import { Pokemon } from './app'

type SetPokemonList = (pokemonList: Array<Pokemon>) => void
type SetIsApiDown = (isApiDown: boolean) => void

export type { SetPokemonList, SetIsApiDown }
