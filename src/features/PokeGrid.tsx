import './PokeGrid.css';
import { useMemo } from 'react';
import Card from '../components/Card';
import { Pokemon } from '../types';
import filterPokemonList from '../utils/filterPokemonList';

interface PokeGridProps {
  readonly nameOrIdFilter: string;
  pokemonList: ReadonlyArray<Pokemon>;
  readonly setSelectedPokemonUrl: Function;
  readonly pageSize: number;
}

const PokeGrid = (props: PokeGridProps) => {

  const { pokemonList, setSelectedPokemonUrl, nameOrIdFilter, pageSize } = props;

  const filteredPokemons = useMemo(
    () => filterPokemonList(nameOrIdFilter, pokemonList),
    [pokemonList, nameOrIdFilter]
  );

  if (filteredPokemons.length === 0) {
    return (<div className="poke-content--not-available"><p>No pokemons are available!</p></div>);
  }

  return (
    <div className="poke-grid poke-content">{
      filteredPokemons.slice(0, pageSize).map(
        pokemon => 
          <Card 
            key={pokemon.name} 
            name={pokemon.name} 
            url={pokemon.url} 
            onCardClick={() => setSelectedPokemonUrl(pokemon.url)}/>)
    }</div>
  );
}

export default PokeGrid;
export type { PokeGridProps };