import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { listPokemons, listAbilities } from './api/fetch'
import { notificationError } from './components/Notifications'
import { getURLQueryParams } from './utils/urlUtils'

jest.mock('./api/fetch')
jest.mock('./components/Notifications')
jest.mock('./utils/urlUtils')

const mockListPokemon = listPokemons as jest.MockedFunction<typeof listPokemons>
const mockGetURLQueryParams = getURLQueryParams as jest.MockedFunction<
    typeof getURLQueryParams
>

const mockNotificationError = notificationError as jest.MockedFunction<
    typeof notificationError
>

const mockListAbilities = listAbilities as jest.MockedFunction<
    typeof listAbilities
>

describe('<App/>', () => {
    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()
    })

    it('should render a pokemon list', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            },
            {
                name: 'pikachu',
                url: 'url/pikachu',
            },
        ])

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('pikachu')).toBeInTheDocument()
        })
    })

    it('should call toast.error when rejecting api call', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        await mockListPokemon.mockRejectedValue(
            new Error('Something went wrong', { cause: 400 })
        )

        render(<App />)

        await waitFor(() => {
            expect(mockNotificationError).toHaveBeenCalledWith(
                'Something went wrong with API call'
            )
        })
    })

    it('should set API indicator when 500 error codes are detected', async () => {
        await mockListAbilities.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        await mockListPokemon.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<App />)

        await waitFor(() => {
            expect(
                screen.getByText(
                    'Red - Some 500 errors detected, API might be down'
                )
            ).toBeInTheDocument()
        })
    })

    it('should call getURLQueryParams() to retrieve nameOrId filter', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            },
            {
                name: 'pikachu',
                url: 'url/pikachu',
            },
        ])

        render(<App />)

        await screen.findByText('pikachu')

        expect(mockGetURLQueryParams.mock.calls[0][0]).toEqual('nameOrId')
    })

    it('should call getURLQueryParams() to retrieve selectedId filter', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            },
            {
                name: 'pikachu',
                url: 'url/pikachu',
            },
        ])

        render(<App />)

        await screen.findByText('pikachu')

        expect(mockGetURLQueryParams.mock.calls[1][0]).toEqual('selectedId')
    })

    it('should call getURLQueryParams() to retrieve pageSize filter', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        await mockListPokemon.mockResolvedValue([
            {
                name: 'abra',
                url: 'url/abra',
            },
            {
                name: 'pikachu',
                url: 'url/pikachu',
            },
        ])

        render(<App />)

        await screen.findByText('pikachu')

        expect(mockGetURLQueryParams.mock.calls[2][0]).toEqual('pageSize')
    })
})
