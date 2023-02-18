import { render, screen } from '@testing-library/react'
import App from './App'
import { listPokemons } from './utils/fetch'

jest.mock('./utils/fetch')
jest.mock('./features/PokeFilters', () => () => 'PokeAbilities')

const mockListPokemon = listPokemons as jest.MockedFunction<typeof listPokemons>

describe('<App/>', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('should render without crashing', () => {
        render(<App />)

        expect(screen.getByText('Welcome to PokeApp!')).toBeInTheDocument()
    })
})
