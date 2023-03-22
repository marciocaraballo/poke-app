/**
 * @TODO for some reason nock fails to clean mocks when tests are in the same file
 * For now similar API tests have to be in separated files. More investigation
 * is needed
 */

import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import httpMock from './utils/httpMock'

describe('<App> - list error', () => {
    it('should render an error message if pokemon listing API fails', async () => {
        let pokemonListApiMock = httpMock()
        let abilitesApiMock = httpMock()

        pokemonListApiMock.get('/api/v2/pokemon', { limit: 3000 }).response(500)

        abilitesApiMock.get('/api/v2/ability', { limit: 500 }).response(200, {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'stench',
                    url: 'https://pokeapi.co/api/v2/ability/1/',
                },
            ],
        })

        render(<App />)

        await waitFor(() => {
            expect(
                screen.getByText('Something went wrong with API call')
            ).toBeInTheDocument()
        })
    })
})
