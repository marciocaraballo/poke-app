import styles from './PokeAbilities.module.css'

import { useEffect, useState } from 'react'
import Select, { Value } from '../components/Select'
import {
    listAbilities,
    listPokemons,
    getPokemonsByAbilities,
} from '../api/fetch'

import { SetIsApiDown, SetPokemonList } from '../types/functions'

import { Ability, Pokemon } from '../types/app'
import toast from 'react-hot-toast'

interface PokeAbilitiesProps {
    readonly setIsApiDown: SetIsApiDown
    readonly setPokemonList: SetPokemonList
}

const MAX_OPTIONS_LIMIT = 20

const PokeAbilities = (props: PokeAbilitiesProps) => {
    const { setIsApiDown, setPokemonList } = props

    const [selectedAbilities, setSelectedAbilities] = useState<Value>([])

    const [abilitiesList, setAbilitesList] = useState<Array<Ability>>([])

    useEffect(() => {
        async function fetchAbilitiesList() {
            try {
                const abilitiesListResponse = await listAbilities()

                setAbilitesList(abilitiesListResponse)
                setIsApiDown(false)
            } catch (e) {
                if (e instanceof Error && (e.cause as number) >= 500) {
                    setIsApiDown(true)
                }
                toast.error('Something went wrong with API call')
            }
        }

        fetchAbilitiesList()
    }, [setIsApiDown])

    const remainingAbilities = abilitiesList
        .filter((ability) => {
            return (
                selectedAbilities.find((option) => {
                    return option.label === ability.name
                }) === undefined
            )
        })
        .slice(0, MAX_OPTIONS_LIMIT)

    return (
        <div className={styles.abilities}>
            <label htmlFor="abilities">Filter by abilities: </label>
            <Select
                name="abilities"
                placeholder="Enter abilities"
                value={selectedAbilities}
                onChange={(options) => setSelectedAbilities(options)}
                options={remainingAbilities.map((ability) => ({
                    value: ability.name,
                    label: ability.name,
                }))}
            />
            <button
                data-testid="apply-button"
                onClick={async () => {
                    if (selectedAbilities.length !== 0) {
                        try {
                            const results = await getPokemonsByAbilities(
                                selectedAbilities.map(
                                    (abilityOption) => abilityOption.value
                                )
                            )

                            setPokemonList(results)
                            setIsApiDown(false)
                        } catch (e) {
                            if (
                                e instanceof Error &&
                                (e.cause as number) >= 500
                            ) {
                                setIsApiDown(true)
                            }
                            toast.error('Something went wrong with API call')
                        }
                    } else {
                        try {
                            const pokemonList = await listPokemons()

                            setPokemonList(pokemonList)
                            setIsApiDown(false)
                        } catch (e) {
                            if (
                                e instanceof Error &&
                                (e.cause as number) >= 500
                            ) {
                                setIsApiDown(true)
                            }
                            toast.error('Something went wrong with API call')
                        }
                    }
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default PokeAbilities
export type { PokeAbilitiesProps }
