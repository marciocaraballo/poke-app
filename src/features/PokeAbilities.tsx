import styles from './PokeAbilities.module.css'

import { useEffect, useState } from 'react'
import Select, { MultiValue, Option } from '../components/Select'
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

import { updateURLQueryParams, getAllURLQueryParams } from '../utils/urlUtils'

import { Ability } from '../types/app'
import toast from 'react-hot-toast'

interface PokeAbilitiesProps {
    readonly setIsApiDown: SetIsApiDown
    readonly setPokemonList: SetPokemonList
    readonly setPokemonListIsLoading: SetPokemonListIsLoading
}

const MAX_OPTIONS_LIMIT = 20

const PokeAbilities = (props: PokeAbilitiesProps) => {
    const { setIsApiDown, setPokemonList, setPokemonListIsLoading } = props

    const [selectedAbilities, setSelectedAbilities] = useState<
        MultiValue<Option>
    >([])

    const [abilitiesList, setAbilitesList] = useState<Array<Ability>>([])

    useEffect(() => {
        async function fetchAbilitiesList() {
            try {
                const abilitiesListResponse = await listAbilities()

                const abilitiesFromParams = getAllURLQueryParams('ability')

                if (abilitiesFromParams === undefined) {
                    setAbilitesList(abilitiesListResponse)
                } else {

                    const initialAbilities: Array<Ability> = [];

                    abilitiesFromParams.forEach(abilityFromParam => {
                        const matchedAbility = abilitiesListResponse.find(ability => ability.name === abilityFromParam)

                        if (matchedAbility !== undefined) {
                            initialAbilities.push(matchedAbility)
                        }
                    })

                    setAbilitesList(initialAbilities);
                }

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

    useEffect(() => {
        let ignore = false

        async function updatePokemonList() {
            setPokemonListIsLoading(true)

            try {
                if (selectedAbilities.length !== 0) {
                    const results = await getPokemonsByAbilities(
                        selectedAbilities.map(
                            (abilityOption) => abilityOption.value
                        )
                    )

                    if (!ignore) {
                        setPokemonList(results)
                        setIsApiDown(false)
                    }
                } else {
                    const pokemonList = await listPokemons()

                    if (!ignore) {
                        setPokemonList(pokemonList)
                        setIsApiDown(false)
                    }
                }
            } catch (e) {
                if (e instanceof Error && (e.cause as number) >= 500) {
                    setIsApiDown(true)
                }
                toast.error('Something went wrong with API call')
            }

            setPokemonListIsLoading(false)
        }

        updatePokemonList()

        return () => {
            ignore = true
        }
    }, [
        selectedAbilities,
        setIsApiDown,
        setPokemonList,
        setPokemonListIsLoading,
    ])

    useEffect(() => {
        updateURLQueryParams(
            'ability',
            selectedAbilities.map((selectedAbility) => selectedAbility.value)
        )
    }, [selectedAbilities])

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
            <div data-testid="abilities-select">
                <Select
                    isMulti
                    name="abilities"
                    inputId="abilities"
                    placeholder="abilities"
                    value={selectedAbilities}
                    onChange={(options) => setSelectedAbilities(options)}
                    options={remainingAbilities.map((ability) => ({
                        value: ability.name,
                        label: ability.name,
                    }))}
                />
            </div>
        </div>
    )
}

export default PokeAbilities
export type { PokeAbilitiesProps }
