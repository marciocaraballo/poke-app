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

export { updateURLQueryParams, getURLQueryParams }
