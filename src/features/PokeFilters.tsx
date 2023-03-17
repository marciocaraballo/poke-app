import styles from './PokeFilters.module.css'

import InputLabel from '../components/InputLabel'
import PokeAbilities from './PokeAbilities'

import {
    SetIsApiDown,
    SetPokemonList,
    SetPokemonListIsLoading,
} from '../types/functions'

import Button from '../components/Button'

import Select from '../components/Select'

interface PokeFiltersProps {
    readonly pageSize: number
    readonly nameOrIdFilter: string
    readonly setNameOrIdFilter: (nameOrIdFilter: string) => void
    readonly setPageSize: (pageSize: number) => void
    readonly setPokemonList: SetPokemonList
    readonly setIsApiDown: SetIsApiDown
    readonly setPokemonListIsLoading: SetPokemonListIsLoading
    readonly pokemonListIsLoading: boolean
}

const pageSizeOptions = [
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 150,
        label: '150',
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 3000,
        label: 'all',
    },
]

const PokeFilters = (props: PokeFiltersProps) => {
    const {
        pageSize,
        setPageSize,
        nameOrIdFilter,
        setNameOrIdFilter,
        setIsApiDown,
        setPokemonList,
        setPokemonListIsLoading,
        pokemonListIsLoading,
    } = props

    return (
        <section className={styles.filters}>
            <div className={styles.nameFilter}>
                <InputLabel
                    id="nameOrIDFilter"
                    label="Filter by name or ID"
                    placeholder="Name or ID"
                    value={nameOrIdFilter}
                    onChange={(value: string) => setNameOrIdFilter(value)}
                />
                <Button
                    variant="link"
                    text="Clear"
                    onClick={() => setNameOrIdFilter('')}
                    disabled={nameOrIdFilter === ''}
                />
            </div>
            <div className={styles.dropdownFilters}>
                <PokeAbilities
                    pokemonListIsLoading={pokemonListIsLoading}
                    setPokemonListIsLoading={setPokemonListIsLoading}
                    setPokemonList={setPokemonList}
                    setIsApiDown={setIsApiDown}
                />
                <div className={styles.pageSizeFilter}>
                    <label htmlFor="pageSize">Results per page to show: </label>
                    <Select
                        value={pageSizeOptions.find(
                            (option) => option.value === pageSize
                        )}
                        name="pageSize"
                        inputId="pageSize"
                        onChange={(option) => {
                            if (option !== null) {
                                setPageSize(option.value)
                            }
                        }}
                        options={[
                            {
                                value: 50,
                                label: '50',
                            },
                            {
                                value: 100,
                                label: '100',
                            },
                            {
                                value: 150,
                                label: '150',
                            },
                            {
                                value: 200,
                                label: '200',
                            },
                            {
                                value: 3000,
                                label: 'all',
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

export default PokeFilters
export type { PokeFiltersProps }
