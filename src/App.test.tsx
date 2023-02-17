import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { listPokemons } from './utils/fetch'

jest.mock('./utils/fetch')

const mockListPokemons = listPokemons as jest.MockedFunction<
    typeof listPokemons
>

describe('<App/>', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('should render without crashing', () => {
        render(<App />)

        expect(screen.getByText('Welcome to PokeApp!')).toBeInTheDocument()
    })

    it('should render a pokemon list', async () => {
        await mockListPokemons.mockResolvedValue({
            count: 1,
            next: null,
            previous: null,
            results: [{ name: 'abra', url: 'url/abra' }],
        })

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('abra')).toBeInTheDocument()
        })
    })
})
