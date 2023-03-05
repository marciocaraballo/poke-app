import styles from './PokeDetails.module.css'

import { useState, useEffect } from 'react'
import { getPokemonDetails } from '../utils/fetch'

import { PokeDetails } from '../types'
import Spinner from '../components/Spinner'

interface PokeDetailsProps {
    readonly selectedPokemonUrl: string | undefined
    readonly setIsApiDown: Function
}

const PokeDetailsPanel = (props: PokeDetailsProps) => {
    const { selectedPokemonUrl, setIsApiDown } = props

    const [pokemonDetailsIsLoading, setPokemonDetailsIsLoading] =
        useState(false)
    const [pokemonDetails, setPokemonDetails] = useState<PokeDetails>({
        id: undefined,
        name: '',
        height: 0,
        weight: 0,
        frontImageUrl: null,
        backImageUrl: null,
        abilities: [],
    })

    useEffect(() => {
        async function fetchPokemonDetails(pokemonUrl: string) {
            setPokemonDetailsIsLoading(true)

            try {
                const pokemonDetailsResponse = await getPokemonDetails(
                    pokemonUrl
                )

                setPokemonDetails(pokemonDetailsResponse)
                setPokemonDetailsIsLoading(false)
                setIsApiDown(false)
            } catch (e) {
                if (e instanceof Response && e.status >= 500) {
                    setIsApiDown(true)
                }
                setPokemonDetailsIsLoading(false)
            }
        }

        if (selectedPokemonUrl) {
            fetchPokemonDetails(selectedPokemonUrl)
        }
    }, [selectedPokemonUrl, setIsApiDown])

    if (!selectedPokemonUrl) {
        return (
            <aside className={styles.details}>
                Please click on a PokeCard from the grid
            </aside>
        )
    }

    if (pokemonDetailsIsLoading) {
        return (
            <aside className={styles.details}>
                <Spinner dataTestId="poke-details-loading" />
            </aside>
        )
    }

    if (pokemonDetails.id) {
        return (
            <aside className={styles.details}>
                <div className={styles.panel}>
                    <header>
                        <h2 data-testid="pokemon-details-name">
                            {pokemonDetails.name}
                        </h2>
                    </header>
                    <div>
                        {pokemonDetails.frontImageUrl === null ||
                        pokemonDetails.backImageUrl === null ? (
                            <p>No images available</p>
                        ) : (
                            <>
                                <img
                                    src={pokemonDetails.frontImageUrl}
                                    alt={pokemonDetails.name}
                                />
                                <img
                                    src={pokemonDetails.backImageUrl}
                                    alt={pokemonDetails.name}
                                />
                            </>
                        )}
                    </div>
                    <div>
                        <p>
                            <strong>ID: </strong> {pokemonDetails.id}
                        </p>
                        <p>
                            <strong>Height: </strong> {pokemonDetails.height}
                        </p>
                        <p>
                            <strong>Weight: </strong> {pokemonDetails.weight}
                        </p>
                        <p>
                            <strong>Abilities: </strong>{' '}
                            {pokemonDetails.abilities
                                .map(
                                    (pokemonAbility) =>
                                        pokemonAbility.ability.name
                                )
                                .join(', ')}
                        </p>
                    </div>
                </div>
            </aside>
        )
    }

    return <aside className="poke-details">No data available</aside>
}

export default PokeDetailsPanel
export type { PokeDetailsProps }
