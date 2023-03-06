interface NamedResource {
    readonly name: string
    readonly url: string
}

type Pokemon = NamedResource
type Ability = NamedResource

interface PokemonType {
    readonly name: string
}

interface ApiResponse<ResultType> {
    readonly count: number
    readonly next: string | null
    readonly previous: string | null
    readonly results: Array<ResultType>
}

type PokemonListResponse = ApiResponse<Pokemon>
type AbilityListResponse = ApiResponse<Ability>

interface PokemonAbility {
    readonly ability: Ability
    readonly is_hidden: boolean
    readonly slot: number
}

interface PokeDetails {
    readonly id: number | undefined
    readonly name: string
    readonly height: number
    readonly weight: number
    readonly frontImageUrl:
        | string
        | null /** Some pokemons don't have images associated */
    readonly backImageUrl:
        | string
        | null /** Some pokemons don't have images associated */
    abilities: ReadonlyArray<PokemonAbility>
    types: ReadonlyArray<PokemonType>
}

interface AbilityPokemons {
    readonly is_hidden: boolean
    readonly slot: number
    readonly pokemon: Pokemon
}

export type {
    Pokemon,
    PokemonListResponse,
    PokemonAbility,
    Ability,
    PokeDetails,
    AbilityPokemons,
    AbilityListResponse,
    PokemonType,
}
