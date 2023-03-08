import {
    PokemonListResponse,
    PokemonAbility,
    PokeDetails,
    AbilityPokemons,
    AbilityListResponse,
    Ability,
    PokemonType,
} from '../types/app'

import { AbilityResponse, PokemonResponse } from '../types/api'

import cacheStore from './cacheStore'

import findUniquePokemon from '../utils/findUniquePokemons'

const buildUrlWithHostname = (url: string) => `https://pokeapi.co/api/v2${url}`

const localCacheStore = cacheStore()

/**
 * Small utility to work with browser's fetch API
 * As PokeApi only accepts GET, this util will only
 * support that method.
 *
 * @param method
 * @param url
 * @returns
 */
const fetchUtil = async <T>(method: string, url: string): Promise<T> => {
    if (method !== 'GET') {
        throw new Error(`Unsupported method for API request: ${method}`)
    }

    if (localCacheStore.has(url)) {
        return localCacheStore.get(url) as T
    }

    let fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
        const data = await response.json()
        localCacheStore.put(url, data)
        return data
    } else {
        return Promise.reject(
            new Error('Something went wrong with the request', {
                cause: response.status,
            })
        )
    }
}

const listPokemons = async () => {
    const response = await fetchUtil<PokemonListResponse>(
        'GET',
        buildUrlWithHostname('/pokemon?limit=3000')
    )

    return response.results
}

const getPokemonDetails = async (url: string): Promise<PokeDetails> => {
    const response = await fetchUtil<PokemonResponse>('GET', url)

    const abilities: Array<PokemonAbility> = response.abilities
    const types: Array<PokemonType> = response.types.map((pokemonType) => ({
        name: pokemonType.type.name,
    }))

    const shapedResponse = {
        id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        frontImageUrl: response.sprites.front_default,
        backImageUrl: response.sprites.back_default,
        abilities,
        types,
    }

    return shapedResponse
}

/**
 * API allows to retrieve abilities one by one, in order to see what pokemons can
 * have them. This function takes the chance to shape the response as well,
 * since it retrieves many data pieces that are not relevant.
 *
 * @param abilityName string
 * @returns Promise<Pokemon>
 */
const getPokemonsByAbility = async (abilityName: string) => {
    const ability = await fetchUtil<AbilityResponse>(
        'GET',
        buildUrlWithHostname(`/ability/${abilityName}`)
    )

    const abilityPokemons: Array<AbilityPokemons> = ability.pokemon

    const shapedResponse = abilityPokemons.map((pokemon) => pokemon.pokemon)

    return shapedResponse
}

/**
 * Ability endpoint can only retrieve associated pokemon for each ability.
 * So for every selected ability, we need to call the ability endpoint and
 * merge the pokemon list that results.
 *
 * As this utility merges pokemons lists, likely they can be duplicated entries, so
 * we should remove them. Results might not follow any ordering.
 *
 * @param abilities string[]
 * @returns Promise<Pokemon>
 */
const getPokemonsByAbilities = async (abilities: Array<string>) => {
    const promises = abilities.map((abilityName) =>
        getPokemonsByAbility(abilityName)
    )

    const results = await Promise.all(promises)

    const concatResults = results.reduce(
        (acc, result) => acc.concat(result),
        []
    )

    return findUniquePokemon(concatResults)
}

/**
 * Get pokemon abilities list
 */
const listAbilities = async (): Promise<Array<Ability>> => {
    const abilities = await fetchUtil<AbilityListResponse>(
        'GET',
        buildUrlWithHostname(`/ability?limit=500`)
    )

    return abilities.results
}

export {
    listPokemons,
    getPokemonDetails,
    getPokemonsByAbilities,
    listAbilities,
}
