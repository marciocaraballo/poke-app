import './PokeAbilities.css'

import { useEffect, useState } from 'react'
import Select, { Value } from '../components/Select'
import {
    listAbilities,
    listPokemons,
    getPokemonsByAbilities,
} from '../utils/fetch'

import { Ability } from '../types'

interface PokeAbilitiesProps {
    readonly setIsApiDown: Function
    readonly setPokemonList: Function
}

const PokeAbilities = (props: PokeAbilitiesProps) => {
    const { setIsApiDown, setPokemonList } = props

    const [abilitiesFilterOptions, setAbilitiesFilterOptions] = useState<Value>(
        []
    )

    const [abilitiesList, setAbilitesList] = useState<Array<Ability>>([])

    useEffect(() => {
        async function fetchAbilitiesList() {
            try {
                const abilitiesListResponse = await listAbilities()

                setAbilitesList(abilitiesListResponse)
            } catch (e) {
                if (e instanceof Response && e.status >= 500) {
                    setIsApiDown(true)
                }
            }
        }

        fetchAbilitiesList()
    }, [setIsApiDown])

    return (
        <div className="poke-abilities">
            <label htmlFor="abilities">Filter by abilities: </label>
            <Select
                name="abilities"
                placeholder="Enter abilities"
                value={abilitiesFilterOptions}
                onChange={(options) => setAbilitiesFilterOptions(options)}
                options={abilitiesList.map((ability) => ({
                    value: ability.name,
                    label: ability.name,
                }))}
            />
            <button
                data-testid="apply-button"
                onClick={async () => {
                    if (abilitiesFilterOptions.length !== 0) {
                        try {
                            const results = await getPokemonsByAbilities(
                                abilitiesFilterOptions.map(
                                    (abilityOption) => abilityOption.value
                                )
                            )

                            setPokemonList(results)
                        } catch (e) {
                            if (e instanceof Response && e.status >= 500) {
                                setIsApiDown(true)
                            }
                        }
                    } else {
                        try {
                            const pokemonListResponse = await listPokemons()

                            setPokemonList(pokemonListResponse.results)
                        } catch (e) {
                            if (e instanceof Response && e.status >= 500) {
                                setIsApiDown(true)
                            }
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
