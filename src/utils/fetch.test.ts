import {
    listPokemons,
    getPokemonDetails,
    getPokemonsByAbilities,
    listAbilities,
} from './fetch'

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

    afterAll(() => {
        global.fetch = unmockedFetch
    })
})
