import { listPokemons, getPokemonsByAbilities } from '../utils/fetch'

import InputLabel from '../components/InputLabel'

interface PokeFiltersProps {
    readonly pageSize: number
    readonly nameOrIdFilter: string
    readonly abilitiesFilter: string
    readonly setNameOrIdFilter: Function
    readonly setPageSize: Function
    readonly setAbilitiesFilter: Function
    readonly setPokemonList: Function
    readonly setIsApiDown: Function
}

const PokeFilters = (props: PokeFiltersProps) => {
    const {
        pageSize,
        setPageSize,
        nameOrIdFilter,
        setNameOrIdFilter,
        abilitiesFilter,
        setAbilitiesFilter,
        setIsApiDown,
        setPokemonList,
    } = props

    return (
        <section>
            <div>
                <span>Results to show: </span>
                <select
                    data-testid="page-size-select"
                    value={pageSize}
                    onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={150}>150</option>
                    <option value={200}>200</option>
                    <option value={3000}>all</option>
                </select>
            </div>
            <InputLabel
                label="Filter by"
                placeholder="Enter Pokemon name or ID"
                value={nameOrIdFilter}
                onChange={(value: string) => setNameOrIdFilter(value)}
            />
            <div>
                <InputLabel
                    label="Filter by"
                    placeholder="Enter abilities comma separated list"
                    value={abilitiesFilter}
                    onChange={(value: string) => setAbilitiesFilter(value)}
                />
                <button
                    data-testid="apply-button"
                    onClick={async () => {
                        if (abilitiesFilter !== '') {
                            try {
                                const results = await getPokemonsByAbilities(
                                    abilitiesFilter.split(',')
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
        </section>
    )
}

export default PokeFilters
export type { PokeFiltersProps }
