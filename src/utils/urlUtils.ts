const updateURLQueryParams = (name: string, value: string | Array<string>) => {
    const queryParams = new URLSearchParams(window.location.search)

    if (Array.isArray(value)) {
        queryParams.delete(name)
        value.map((val) => queryParams.append(name, encodeURI(val)))
    } else {
        queryParams.set(name, encodeURI(value))
    }
    window.history.replaceState(null, '', '?' + queryParams.toString())
}

const getURLQueryParams = (name: string) => {
    const queryParams = new URLSearchParams(window.location.search)

    const param = queryParams.get(name)

    if (param !== null) {
        return decodeURI(param)
    }

    return undefined
}

const getAllURLQueryParams = (name: string) => {
    const queryParams = new URLSearchParams(window.location.search)

    const params = queryParams.getAll(name)

    if (params.length !== 0) {
        return params.map((param) => decodeURI(param))
    }

    return undefined
}

const buildUrlWithHostname = (url: string) => `https://pokeapi.co/api/v2${url}`
const buildPokemonUrlById = (abilityId: string) =>
    `${buildUrlWithHostname('/pokemon/' + abilityId)}`

const extractPokemonIdFromUrl = (url: string): string | undefined =>
    url.split('/')[6]

export {
    updateURLQueryParams,
    getURLQueryParams,
    buildUrlWithHostname,
    buildPokemonUrlById,
    extractPokemonIdFromUrl,
    getAllURLQueryParams,
}
