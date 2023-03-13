const updateURLQueryParams = (name: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(name, value)
    window.history.replaceState(null, '', '?' + queryParams.toString())
}

const getURLQueryParams = (name: string) => {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get(name)
}

export { updateURLQueryParams, getURLQueryParams }
