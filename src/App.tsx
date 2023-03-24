import styles from './App.module.css'

import { useState, useEffect } from 'react'

import ApiStatus from './features/ApiStatus'
import PokeFilters from './features/PokeFilters'
import PokeGrid from './features/PokeCards'
import PokeDetails from './features/PokeDetails'
import { Pokemon } from './types/app'

import { Notifications } from './components/Notifications'

import {
    updateURLQueryParams,
    getURLQueryParams,
    extractPokemonIdFromUrl,
    buildPokemonUrlById,
} from './utils/urlUtils'

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [pokemonListIsLoading, setPokemonListIsLoading] = useState(false)
    const [isApiDown, setIsApiDown] = useState(false)
    const [pokemonList, setPokemonList] = useState<ReadonlyArray<Pokemon>>([])
    const [nameOrIdFilter, setNameOrIdFilter] = useState(
        getURLQueryParams('nameOrId') ?? ''
    )
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(
        getURLQueryParams('selectedId')
            ? buildPokemonUrlById(getURLQueryParams('selectedId') as string)
            : ''
    )
    const [pageSize, setPageSize] = useState(
        getURLQueryParams('pageSize') !== undefined
            ? parseInt(getURLQueryParams('pageSize') as string, 10)
            : 50
    )

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
        updateURLQueryParams(
            'selectedId',
            extractPokemonIdFromUrl(selectedPokemonUrl) ?? ''
        )
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
            <Notifications />
        </div>
    )
}

export default App
