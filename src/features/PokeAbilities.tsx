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

import { notificationError } from '../components/Notifications'

import { extractPokemonIdFromUrl, buildPokemonUrlById } from '../utils/urlUtils'

interface PokeAbilitiesProps {
    readonly setIsApiDown: SetIsApiDown
    readonly setPokemonList: SetPokemonList
    readonly setPokemonListIsLoading: SetPokemonListIsLoading
}

const MAX_OPTIONS_LIMIT = 20

const extractAbilitiesFromUrl = (queryParams: Array<string> | undefined) => {
    if (queryParams !== undefined) {
        return queryParams.map((queryParam) => {
            const values = queryParam.split('_')

            return {
                label: values[0],
                value: buildPokemonUrlById(values[1]),
            }
        })
    }

    return undefined
}

const PokeAbilities = (props: PokeAbilitiesProps) => {
    const { setIsApiDown, setPokemonList, setPokemonListIsLoading } = props

    const [selectedAbilities, setSelectedAbilities] = useState<
        MultiValue<Option>
    >(extractAbilitiesFromUrl(getAllURLQueryParams('ability')) ?? [])

    const [abilitiesList, setAbilitesList] = useState<Array<Ability>>([])

    const [abilitiesInputSearch, setAbilitiesInputSearch] = useState('')

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
                notificationError('Something went wrong with API call')
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
                            (abilityOption) => abilityOption.label
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
                notificationError('Something went wrong with API call')
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
            selectedAbilities.map(
                (selectedAbility) =>
                    `${selectedAbility.label}_${extractPokemonIdFromUrl(
                        selectedAbility.value
                    )}`
            )
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
        .filter((ability) => ability.name.startsWith(abilitiesInputSearch))
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
                    onInputChange={(searchText) =>
                        setAbilitiesInputSearch(searchText)
                    }
                    onChange={(options) => setSelectedAbilities(options)}
                    options={remainingAbilities.map((ability) => ({
                        value: ability.url,
                        label: ability.name,
                    }))}
                />
            </div>
        </div>
    )
}

export default PokeAbilities
export type { PokeAbilitiesProps }
