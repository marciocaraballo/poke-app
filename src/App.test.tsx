import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { listPokemons } from './utils/fetch'

jest.mock('./utils/fetch')
jest.mock('./features/PokeFilters', () => () => 'PokeAbilities')
jest.mock('react-hot-toast')

const mockListPokemon = listPokemons as jest.MockedFunction<typeof listPokemons>

describe('<App/>', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('should render a pokemon list', async () => {
        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            },
        ])

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('abra')).toBeInTheDocument()
        })
    })
})
