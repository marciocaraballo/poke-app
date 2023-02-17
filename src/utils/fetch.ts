import {
    PokemonListResponse,
    PokemonAbility,
    PokeDetails,
    AbilityPokemons,
} from '../types'

import findUniquePokemon from './findUniquePokemons'

const buildUrlWithHostname = (url: string) => `https://pokeapi.co/api/v2${url}`

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

    let fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
        return await response.json()
    } else {
        return Promise.reject(response)
    }
}

const listPokemons = async () =>
    await fetchUtil<PokemonListResponse>(
        'GET',
        buildUrlWithHostname('/pokemon?limit=3000')
    )

/**
 * Response object is quite complex and returns many information pieces that
 * are not going to be used across the app. The idea is to shape the result
 * into something easier to consume. We define response as "any" to avoid
 * adding lots of types just to support the expected response type.
 *
 * @param url string
 * @returns Promise<PokeDetails>
 */
const getPokemonDetails = async (url: string): Promise<PokeDetails> => {
    const response = await fetchUtil<any>('GET', url)

    const abilities: Array<PokemonAbility> = response.abilities

    const shapedResponse = {
        id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        frontImageUrl: response.sprites.front_default,
        backImageUrl: response.sprites.back_default,
        abilities: abilities,
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
    const ability = await fetchUtil<any>(
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

export { listPokemons, getPokemonDetails, getPokemonsByAbilities }
