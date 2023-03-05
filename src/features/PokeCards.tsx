import styles from './PokeCards.module.css'
import { useMemo } from 'react'
import Card from '../components/Card'
import { Pokemon } from '../types'
import filterPokemonList from '../utils/filterPokemonList'
import Spinner from '../components/Spinner'

interface PokeCardsProps {
    readonly nameOrIdFilter: string
    pokemonList: ReadonlyArray<Pokemon>
    readonly setSelectedPokemonUrl: Function
    readonly pageSize: number
    readonly pokemonListIsLoading: boolean
}

const PokeCards = (props: PokeCardsProps) => {
    const {
        pokemonList,
        setSelectedPokemonUrl,
        nameOrIdFilter,
        pageSize,
        pokemonListIsLoading,
    } = props

    const filteredPokemons = useMemo(
        () => filterPokemonList(nameOrIdFilter, pokemonList),
        [pokemonList, nameOrIdFilter]
    )

    if (pokemonListIsLoading) {
        return (
            <div className={styles.cards}>
                <Spinner dataTestId="poke-cards-loading" />
            </div>
        )
    }

    if (filteredPokemons.length === 0) {
        return (
            <div className={styles.cards}>
                <p>No pokemons are available!</p>
            </div>
        )
    }

    return (
        <div className={styles.cards}>
            <div className={styles.grid}>
                {filteredPokemons.slice(0, pageSize).map((pokemon) => (
                    <Card
                        dataTestId="poke-card"
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                        onCardClick={() => setSelectedPokemonUrl(pokemon.url)}
                    />
                ))}
            </div>
        </div>
    )
}

export default PokeCards
export type { PokeCardsProps }
