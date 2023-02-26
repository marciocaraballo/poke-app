import filterPokemonList from './filterPokemonList'

describe('filterPokemonList()', () => {
    it('should return pokemonList if nameOrIdFilter is empty', () => {
        const pokemonList = [{ name: 'abra', url: 'url/abra' }]

        const result = filterPokemonList('', pokemonList)

        expect(result).toEqual(pokemonList)
    })

    it('should return empty pokemonList if name filter doesnt match', () => {
        const pokemonList = [
            { name: 'abra', url: 'url/abra' },
            { name: 'mew', url: 'url/mew' },
            { name: 'mewtwo', url: 'url/mewtwo' },
        ]

        const result = filterPokemonList('pika', pokemonList)

        expect(result).toEqual([])
    })

    it('should return pokemonList if name filter matches', () => {
        const pokemonList = [
            { name: 'abra', url: 'url/abra' },
            { name: 'mew', url: 'url/mew' },
            { name: 'mewtwo', url: 'url/mewtwo' },
        ]

        const result = filterPokemonList('mew', pokemonList)

        expect(result).toEqual([
            { name: 'mew', url: 'url/mew' },
            { name: 'mewtwo', url: 'url/mewtwo' },
        ])
    })

    it('should return pokemonList if name filter matches by caseUnsensitive filter', () => {
        const pokemonList = [
            { name: 'abra', url: 'url/abra' },
            { name: 'mew', url: 'url/mew' },
            { name: 'mewtwo', url: 'url/mewtwo' },
        ]

        const result = filterPokemonList('MEW', pokemonList)

        expect(result).toEqual([
            { name: 'mew', url: 'url/mew' },
            { name: 'mewtwo', url: 'url/mewtwo' },
        ])
    })


    it('should return empty pokemonList if ID filter doesnt match', () => {
        const pokemonList = [
            { name: 'abra', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ]

        const result = filterPokemonList('1', pokemonList)

        expect(result).toEqual([])
    })

    it('should return empty pokemonList if ID filter matches', () => {
        const pokemonList = [
            { name: 'abra', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ]

        const result = filterPokemonList('2', pokemonList)

        expect(result).toEqual([
            { name: 'abra', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ])
    })
})
