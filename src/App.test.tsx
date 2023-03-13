import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { listPokemons } from './api/fetch'
import toast from 'react-hot-toast'
import { updateURLQueryParams, getURLQueryParams } from './utils/urlUtils'

jest.mock('./api/fetch')
jest.mock('./features/PokeFilters', () => () => 'PokeAbilities')
jest.mock('react-hot-toast')
jest.mock('./utils/urlUtils');

const mockListPokemon = listPokemons as jest.MockedFunction<typeof listPokemons>
const mockUpdateURLQueryParams = updateURLQueryParams as jest.MockedFunction<typeof updateURLQueryParams>
const mockGetURLQueryParams = getURLQueryParams as jest.MockedFunction<typeof getURLQueryParams>

describe('<App/>', () => {
    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        mockGetURLQueryParams.mockReturnValue('pikachu');

        toast.error = jest.fn()
    })

    it('should render a pokemon list', async () => {
        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            }, {
                name: 'pikachu',
                url: 'url/pikachu',
            }
        ])

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('pikachu')).toBeInTheDocument()
        })
    })

    it('should call toast.error when rejecting api call', async () => {
        await mockListPokemon.mockRejectedValue(
            new Error('Something went wrong', { cause: 400 })
        )

        render(<App />)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Something went wrong with API call'
            )
        })
    })

    it('should set API indicator when 500 error codes are detected', async () => {
        await mockListPokemon.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<App />)

        await waitFor(() => {
            expect(
                screen.getByText(
                    'Red - 500 errors detected. API might be down.'
                )
            ).toBeInTheDocument()
        })
    })

    it ('should call getURLQueryParams() to retrieve name filter', async () => {

        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            }, {
                name: 'pikachu',
                url: 'url/pikachu',
            }
        ])

        render(<App />)

        await screen.findByText('pikachu');

        expect(mockGetURLQueryParams).toHaveBeenCalledWith('name');
    })
})
