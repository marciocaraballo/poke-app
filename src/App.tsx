import './App.css'

import { useState, useEffect } from 'react'

import ApiStatus from './features/ApiStatus'
import PokeFilters from './features/PokeFilters'
import PokeGrid from './features/PokeGrid'
import PokeDetails from './features/PokeDetails'
import { listPokemons } from './utils/fetch'
import { Pokemon } from './types'

function App() {
    const [isApiDown, setIsApiDown] = useState(false)
    const [abilitiesFilter, setAbilitiesFilter] = useState('')
    const [pokemonList, setPokemonList] = useState<ReadonlyArray<Pokemon>>([])
    const [nameOrIdFilter, setNameOrIdFilter] = useState('')
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(undefined)
    const [pageSize, setPageSize] = useState(50)

    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const pokemonListResponse = await listPokemons()

                setPokemonList(pokemonListResponse.results)
            } catch (e) {
                if (e instanceof Response && e.status >= 500) {
                    setIsApiDown(true)
                }
            }
        }

        fetchPokemonList()
    }, [])

    return (
        <div className="poke-app">
            <header className="poke-header">
                <h1>Welcome to PokeApp!</h1>
            </header>
            <main className="poke-content">
                <ApiStatus isApiDown={isApiDown} />
                <PokeFilters
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    nameOrIdFilter={nameOrIdFilter}
                    setNameOrIdFilter={setNameOrIdFilter}
                    abilitiesFilter={abilitiesFilter}
                    setAbilitiesFilter={setAbilitiesFilter}
                    setPokemonList={setPokemonList}
                    setIsApiDown={setIsApiDown}
                />
                <div className="poke-layout">
                    <PokeGrid
                        pageSize={pageSize}
                        nameOrIdFilter={nameOrIdFilter}
                        pokemonList={pokemonList}
                        setSelectedPokemonUrl={setSelectedPokemonUrl}
                    />
                    <PokeDetails
                        selectedPokemonUrl={selectedPokemonUrl}
                        setIsApiDown={setIsApiDown}
                    />
                </div>
            </main>
        </div>
    )
}

export default App
