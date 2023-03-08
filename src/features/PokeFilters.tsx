import InputLabel from '../components/InputLabel'
import PokeAbilities from './PokeAbilities'

import { SetIsApiDown, SetPokemonList } from '../types/functions'

interface PokeFiltersProps {
    readonly pageSize: number
    readonly nameOrIdFilter: string
    readonly setNameOrIdFilter: (nameOrIdFilter: string) => void
    readonly setPageSize: (pageSize: number) => void
    readonly setPokemonList: SetPokemonList
    readonly setIsApiDown: SetIsApiDown
}

const PokeFilters = (props: PokeFiltersProps) => {
    const {
        pageSize,
        setPageSize,
        nameOrIdFilter,
        setNameOrIdFilter,
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
            <PokeAbilities
                setPokemonList={setPokemonList}
                setIsApiDown={setIsApiDown}
            />
        </section>
    )
}

export default PokeFilters
export type { PokeFiltersProps }
