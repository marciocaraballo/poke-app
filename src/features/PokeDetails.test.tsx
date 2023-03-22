import { render, screen, waitFor } from '@testing-library/react'
import PokeDetailsPanel, { PokeDetailsProps } from './PokeDetails'
import { getPokemonDetails } from '../api/fetch'
import { PokeDetails } from '../types/app'
import { notificationError } from '../components/Notifications'

jest.mock('../api/fetch')
jest.mock('../components/Notifications')

const mockGetPokemonDetails = getPokemonDetails as jest.MockedFunction<
    typeof getPokemonDetails
>

const mockNotificationError = notificationError as jest.MockedFunction<
    typeof notificationError
>

describe('<PokeDetailsPanel/>', () => {
    let props: PokeDetailsProps

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        props = {
            selectedPokemonUrl: '',
            setIsApiDown: jest.fn(),
        }
    })

    it('should show a message when no url is selected', () => {
        render(<PokeDetailsPanel {...props} />)

        expect(
            screen.getByText('Choose a pokemon card from the list')
        ).toBeInTheDocument()
    })

    it('should show pokemon details', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 10,
            weight: 10,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('pikachu')).toBeInTheDocument()
        })
    })

    it('should call setIsApiDown(false) when API call was successful', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 10,
            weight: 10,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(props.setIsApiDown).toHaveBeenCalledWith(false)
        })
    })

    it('should call setIsApiDown(true) when API call was rejected', async () => {
        await mockGetPokemonDetails.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(props.setIsApiDown).toHaveBeenCalledWith(true)
        })
    })

    it('should show a message if data fails to load from API', async () => {
        await mockGetPokemonDetails.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(
                screen.getByText('No pokemon data available')
            ).toBeInTheDocument()
        })
    })

    it('should call toast.error when rejecting api call', async () => {
        await mockGetPokemonDetails.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(mockNotificationError).toHaveBeenCalledWith(
                'Something went wrong with API call'
            )
        })
    })

    it('should show pokemon abilities', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 10,
            weight: 10,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('ability')).toBeInTheDocument()
        })
    })

    it('should show pokemon types', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 10,
            weight: 10,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('grass')).toBeInTheDocument()
        })
    })

    it('should show pokemon height with expected format', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 15,
            weight: 15,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('150 cm')).toBeInTheDocument()
        })
    })

    it('should show pokemon weight with expected format', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 15,
            weight: 15,
            frontImageUrl: 'frontImageUrl',
            backImageUrl: 'backImageUrl',
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('1.50 kg')).toBeInTheDocument()
        })
    })

    it('should show a message when images are not available', async () => {
        const pokeDetails: PokeDetails = {
            id: 1,
            name: 'pikachu',
            height: 15,
            weight: 15,
            frontImageUrl: null,
            backImageUrl: null,
            abilities: [
                {
                    ability: { name: 'ability', url: 'url/ability' },
                    is_hidden: false,
                    slot: 1,
                },
            ],
            types: [{ name: 'grass' }, { name: 'water' }],
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('No images available')).toBeInTheDocument()
        })
    })
})
