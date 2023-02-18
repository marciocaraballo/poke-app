import './App.css'

import { useState, useEffect } from 'react'

import ApiStatus from './features/ApiStatus'
import PokeFilters from './features/PokeFilters'
import PokeGrid from './features/PokeCards'
import PokeDetails from './features/PokeDetails'
import { listPokemons } from './utils/fetch'
import { Pokemon } from './types'

function App() {
    const [pokemonListIsLoading, setPokemonListIsLoading] = useState(false)
    const [isApiDown, setIsApiDown] = useState(false)
    const [pokemonList, setPokemonList] = useState<ReadonlyArray<Pokemon>>([])
    const [nameOrIdFilter, setNameOrIdFilter] = useState('')
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(undefined)
    const [pageSize, setPageSize] = useState(50)

    useEffect(() => {
        async function fetchPokemonList() {
            setPokemonListIsLoading(true)

            try {
                const pokemonList = await listPokemons()

                setPokemonList(pokemonList)
                setPokemonListIsLoading(false)
            } catch (e) {
                if (e instanceof Response && e.status >= 500) {
                    setIsApiDown(true)
                }
                setPokemonListIsLoading(false)
            }
        }

        fetchPokemonList()
    }, [])

    return (
        <div className="poke-app">
            <header className="poke-header">
                <h1 data-testid="poke-app-welcome">Welcome to PokeApp!</h1>
            </header>
            <main className="poke-content">
                <ApiStatus isApiDown={isApiDown} />
                <PokeFilters
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    nameOrIdFilter={nameOrIdFilter}
                    setNameOrIdFilter={setNameOrIdFilter}
                    setPokemonList={setPokemonList}
                    setIsApiDown={setIsApiDown}
                />
                <div className="poke-layout">
                    <PokeGrid
                        pokemonListIsLoading={pokemonListIsLoading}
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
