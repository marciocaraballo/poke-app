const updateURLQueryParams = (name: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(name, encodeURI(value))
    window.history.replaceState(null, '', '?' + queryParams.toString())
}

const getURLQueryParams = (name: string) => {
    const queryParams = new URLSearchParams(window.location.search)

    const query = queryParams.get(name)

    if (query !== null) {
        return decodeURI(query)
    }

    return undefined
}

const buildUrlWithHostname = (url: string) => `https://pokeapi.co/api/v2${url}`
const buildPokemonUrlById = (abilityId: string) =>
    `${buildUrlWithHostname('/pokemon/' + abilityId)}`

const extractPokemonIdFromUrl = (url: string) => url.split('/')[6]

export {
    updateURLQueryParams,
    getURLQueryParams,
    buildUrlWithHostname,
    buildPokemonUrlById,
    extractPokemonIdFromUrl,
}
