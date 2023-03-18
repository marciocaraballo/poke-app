import styles from './App.module.css'

import { useState, useEffect } from 'react'

import ApiStatus from './features/ApiStatus'
import PokeFilters from './features/PokeFilters'
import PokeGrid from './features/PokeCards'
import PokeDetails from './features/PokeDetails'
import { listPokemons } from './api/fetch'
import { Pokemon } from './types/app'
import toast, { Toaster } from 'react-hot-toast'

import { updateURLQueryParams, getURLQueryParams } from './utils/urlUtils'

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [pokemonListIsLoading, setPokemonListIsLoading] = useState(false)
    const [isApiDown, setIsApiDown] = useState(false)
    const [pokemonList, setPokemonList] = useState<ReadonlyArray<Pokemon>>([])
    const [nameOrIdFilter, setNameOrIdFilter] = useState(
        getURLQueryParams('nameOrId') ?? ''
    )
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(
        getURLQueryParams('url') ?? ''
    )
    const [pageSize, setPageSize] = useState(
        getURLQueryParams('pageSize') !== undefined
            ? parseInt(getURLQueryParams('pageSize') as string, 10)
            : 50
    )

    useEffect(() => {
        async function fetchPokemonList() {
            setPokemonListIsLoading(true)

            try {
                const pokemonList = await listPokemons()

                setPokemonList(pokemonList)
                setPokemonListIsLoading(false)
                setIsApiDown(false)
            } catch (e) {
                if (e instanceof Error && (e.cause as number) >= 500) {
                    setIsApiDown(true)
                }
                setPokemonListIsLoading(false)
                toast.error('Something went wrong with API call')
            }
        }

        fetchPokemonList()
    }, [])

    useEffect(() => {
        const onOnlineStatusUpdate = () => setIsOnline(navigator.onLine)

        window.addEventListener('online', onOnlineStatusUpdate)
        window.addEventListener('offline', onOnlineStatusUpdate)

        return () => {
            window.removeEventListener('online', onOnlineStatusUpdate)
            window.removeEventListener('offline', onOnlineStatusUpdate)
        }
    }, [])

    useEffect(() => {
        updateURLQueryParams('nameOrId', nameOrIdFilter)
    }, [nameOrIdFilter])

    useEffect(() => {
        updateURLQueryParams('pageSize', pageSize.toString())
    }, [pageSize])

    useEffect(() => {
        updateURLQueryParams('url', selectedPokemonUrl)
    }, [selectedPokemonUrl])

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 data-testid="poke-app-welcome">Welcome to PokeApp!</h1>
                <ApiStatus isApiDown={isApiDown} isOnline={isOnline} />
            </header>
            <main className={styles.content}>
                <PokeFilters
                    pageSize={pageSize}
                    pokemonListIsLoading={pokemonListIsLoading}
                    setPokemonListIsLoading={setPokemonListIsLoading}
                    setPageSize={setPageSize}
                    nameOrIdFilter={nameOrIdFilter}
                    setNameOrIdFilter={setNameOrIdFilter}
                    setPokemonList={setPokemonList}
                    setIsApiDown={setIsApiDown}
                />
                <div className={styles.layout}>
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
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    )
}

export default App
