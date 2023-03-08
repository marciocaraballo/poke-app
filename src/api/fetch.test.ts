import {
    listPokemons,
    getPokemonDetails,
    getPokemonsByAbilities,
    listAbilities,
} from './fetch'

jest.mock('./cacheStore', () => () => ({
    get: jest.fn(),
    put: jest.fn(),
    has: jest.fn(),
}))

const unmockedFetch = global.fetch

describe('fetchUtils', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call fetch() correctly for listPokemons()', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ test: 100 }),
                ok: 'OK',
            })
        ) as jest.Mock

        await listPokemons()

        expect(global.fetch).toHaveBeenCalledWith(
            'https://pokeapi.co/api/v2/pokemon?limit=3000',
            { headers: { 'Content-Type': 'application/json' }, method: 'GET' }
        )
    })

    it('should call fetch() correctly for getPokemonDetails()', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        id: 'id',
                        name: 'name',
                        height: 0,
                        weight: 0,
                        sprites: {
                            front_default: 'front_default',
                            back_default: 'back_default',
                        },
                        abilities: [],
                        types: [],
                    }),
                ok: 'OK',
            })
        ) as jest.Mock

        await getPokemonDetails('/detailsUrl')

        expect(global.fetch).toHaveBeenCalledWith('/detailsUrl', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
    })

    it('should call fetch() correctly for getPokemonsByAbilities()', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        pokemon: [
                            {
                                pokemon: {
                                    name: 'abra',
                                    url: 'url/abra',
                                },
                            },
                        ],
                    }),
                ok: 'OK',
            })
        ) as jest.Mock

        await getPokemonsByAbilities(['overgrow', 'rust'])

        expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it('should call fetch() correctly for listAbilities()', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ test: 100 }),
                ok: 'OK',
            })
        ) as jest.Mock

        await listAbilities()

        expect(global.fetch).toHaveBeenCalledWith(
            'https://pokeapi.co/api/v2/ability?limit=500',
            { headers: { 'Content-Type': 'application/json' }, method: 'GET' }
        )
    })

    it('should reject with an error message', async () => {
        expect.assertions(1)

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ test: 100 }),
                ok: undefined,
                status: 500,
            })
        ) as jest.Mock

        let errorMsg = ''

        try {
            await listPokemons()
        } catch (e) {
            if (e instanceof Error) {
                errorMsg = e.message
            }
        }

        expect(errorMsg).toEqual('Something went wrong with the request')
    })

    it('should reject with a status code', async () => {
        expect.assertions(1)

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ test: 100 }),
                ok: undefined,
                status: 500,
            })
        ) as jest.Mock

        let cause

        try {
            await listPokemons()
        } catch (e) {
            if (e instanceof Error) {
                cause = e.cause
            }
        }

        expect(cause).toEqual(500)
    })

    afterAll(() => {
        global.fetch = unmockedFetch
    })
})
