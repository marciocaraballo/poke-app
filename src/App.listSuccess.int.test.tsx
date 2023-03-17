/**
 * @TODO for some reason nock fails to clean mocks when tests are in the same file
 * For now similar API tests have to be in separated files. More investigation
 * is needed
 */

import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import httpMock from './utils/httpMock'

jest.mock('./features/PokeFilters', () => () => 'PokeAbilities')

describe('<App> - list success', () => {
    it('should render a pokemon list', async () => {
        let pokemonListApiMock = httpMock()

        pokemonListApiMock
            .get('/api/v2/pokemon', { limit: 3000 })
            .response(200, {
                count: 1,
                next: null,
                previous: null,
                results: [
                    {
                        name: 'bulbasaur',
                        url: 'https://pokeapi.co/api/v2/pokemon/1/',
                    },
                ],
            })

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('bulbasaur')).toBeInTheDocument()
        })
    })
})
