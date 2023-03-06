import styles from './PokeDetails.module.css'

import { useState, useEffect } from 'react'
import { getPokemonDetails } from '../api/fetch'

import { PokeDetails } from '../types'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

interface PokeDetailsProps {
    readonly selectedPokemonUrl: string | undefined
    readonly setIsApiDown: Function
}

const HG_TO_KG_CONV = 0.1
const DM_TO_CM_CONV = 10

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
                toast.error('Something went wrong with API call')
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
                    <div className={styles.list}>
                        <p className={styles.listItem}>
                            <strong>ID: </strong> {pokemonDetails.id}
                        </p>
                        <p className={styles.listItem}>
                            <strong>Height: </strong>{' '}
                            {pokemonDetails.height * DM_TO_CM_CONV} cm
                        </p>
                        <p className={styles.listItem}>
                            <strong>Weight: </strong>{' '}
                            {pokemonDetails.weight * HG_TO_KG_CONV} kg
                        </p>
                        <p className={styles.listItem}>
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
