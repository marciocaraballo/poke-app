import findUniquePokemons from './findUniquePokemons';

describe('findUniquePokemons()', () => {
    it ('should return a list without repeated pokemons', () => {

        const pokelist = [{ name: 'abra', url: 'url/abra'}, { name: 'pikachu', url: 'url/pikachu'}, { name: 'abra', url: 'url/abra'}];

        const result = findUniquePokemons(pokelist);

        expect(result).toEqual([{ name: 'abra', url: 'url/abra'}, { name: 'pikachu', url: 'url/pikachu'}]);
    });
});