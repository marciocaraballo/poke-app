import styles from './PokeAbilities.module.css'

import { useEffect, useState } from 'react'
import Select, { Value } from '../components/Select'
import {
    listAbilities,
    listPokemons,
    getPokemonsByAbilities,
} from '../api/fetch'

import {
    SetIsApiDown,
    SetPokemonList,
    SetPokemonListIsLoading,
} from '../types/functions'

import { Ability } from '../types/app'
import toast from 'react-hot-toast'

import Button from '../components/Button'

interface PokeAbilitiesProps {
    readonly setIsApiDown: SetIsApiDown
    readonly setPokemonList: SetPokemonList
    readonly setPokemonListIsLoading: SetPokemonListIsLoading
    readonly pokemonListIsLoading: boolean
}

const MAX_OPTIONS_LIMIT = 20

const PokeAbilities = (props: PokeAbilitiesProps) => {
    const {
        setIsApiDown,
        setPokemonList,
        setPokemonListIsLoading,
        pokemonListIsLoading,
    } = props

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
        <form
            className={styles.abilities}
            onSubmit={async (e) => {
                e.preventDefault()

                setPokemonListIsLoading(true)

                try {
                    if (selectedAbilities.length !== 0) {
                        const results = await getPokemonsByAbilities(
                            selectedAbilities.map(
                                (abilityOption) => abilityOption.value
                            )
                        )

                        setPokemonList(results)
                        setIsApiDown(false)
                    } else {
                        const pokemonList = await listPokemons()

                        setPokemonList(pokemonList)
                        setIsApiDown(false)
                    }
                } catch (e) {
                    if (e instanceof Error && (e.cause as number) >= 500) {
                        setIsApiDown(true)
                    }
                    toast.error('Something went wrong with API call')
                }

                setPokemonListIsLoading(false)
            }}
        >
            <label htmlFor="abilities">Filter by abilities: </label>
            <div data-testid="abilities-select">
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
            </div>
            <Button
                variant="submit"
                text="Apply"
                disabled={pokemonListIsLoading}
            />
        </form>
    )
}

export default PokeAbilities
export type { PokeAbilitiesProps }
