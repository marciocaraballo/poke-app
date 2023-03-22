import styles from './PokeDetails.module.css'

import { useState, useEffect } from 'react'
import { getPokemonDetails } from '../api/fetch'

import { PokeDetails } from '../types/app'
import Spinner from '../components/Spinner'

import { SetIsApiDown } from '../types/functions'

import { notificationError } from '../components/Notifications'

interface PokeDetailsProps {
    readonly selectedPokemonUrl: string
    readonly setIsApiDown: SetIsApiDown
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
        types: [],
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
                if (e instanceof Error && (e.cause as number) >= 500) {
                    setIsApiDown(true)
                }
                setPokemonDetailsIsLoading(false)
                notificationError('Something went wrong with API call')
            }
        }

        if (selectedPokemonUrl !== '') {
            fetchPokemonDetails(selectedPokemonUrl)
        }
    }, [selectedPokemonUrl, setIsApiDown])

    if (!selectedPokemonUrl) {
        return (
            <aside className={styles.details}>
                Choose a pokemon card from the list
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
            <aside className={styles.details} aria-live="polite">
                <div className={styles.panel}>
                    <header>
                        <h2
                            data-testid="pokemon-details-name"
                            className={styles.name}
                        >
                            {pokemonDetails.name}
                        </h2>
                    </header>
                    <div>
                        {pokemonDetails.frontImageUrl === null ||
                        pokemonDetails.backImageUrl === null ? (
                            <p>No images available</p>
                        ) : (
                            <figure>
                                <div className={styles.images}>
                                    <img
                                        className={styles.image}
                                        src={pokemonDetails.frontImageUrl}
                                        alt=""
                                        height={96}
                                        width={96}
                                    />
                                    <img
                                        className={styles.image}
                                        src={pokemonDetails.backImageUrl}
                                        alt=""
                                        height={96}
                                        width={96}
                                    />
                                </div>
                                <figcaption>
                                    <i>Pokemon front and back images.</i>
                                </figcaption>
                            </figure>
                        )}
                    </div>
                    <ul className={styles.list}>
                        <li
                            className={styles.listItem}
                            aria-label={`Pokemon ID is ${pokemonDetails.id}.`}
                        >
                            <strong>ID: </strong> {pokemonDetails.id}
                        </li>
                        <li
                            className={styles.listItem}
                            aria-label={`Pokemon height is ${
                                pokemonDetails.height * DM_TO_CM_CONV
                            } cm.`}
                        >
                            <strong>Height: </strong>{' '}
                            {pokemonDetails.height * DM_TO_CM_CONV} cm
                        </li>
                        <li className={styles.listItem}>
                            <strong>Weight: </strong>{' '}
                            {(pokemonDetails.weight * HG_TO_KG_CONV).toFixed(2)}{' '}
                            kg
                        </li>
                        <li className={styles.listItem}>
                            <strong>Abilities: </strong>{' '}
                            {pokemonDetails.abilities
                                .map(
                                    (pokemonAbility) =>
                                        pokemonAbility.ability.name
                                )
                                .join(', ')}
                        </li>
                        <li className={styles.listItem}>
                            <strong>Types: </strong>{' '}
                            {pokemonDetails.types
                                .map((pokemonType) => pokemonType.name)
                                .join(', ')}
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }

    return <aside className={styles.details}>No pokemon data available</aside>
}

export default PokeDetailsPanel
export type { PokeDetailsProps }
