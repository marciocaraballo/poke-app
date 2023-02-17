import { render, screen, waitFor } from '@testing-library/react'
import PokeDetailsPanel, { PokeDetailsProps } from './PokeDetails'
import { getPokemonDetails } from '../utils/fetch'
import { PokeDetails } from '../types'

jest.mock('../utils/fetch')

const mockGetPokemonDetails = getPokemonDetails as jest.MockedFunction<
    typeof getPokemonDetails
>

describe('<PokeDetailsPanel/>', () => {
    let props: PokeDetailsProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            selectedPokemonUrl: undefined,
            setIsApiDown: jest.fn(),
        }
    })

    it('should show a message when no url is selected', () => {
        render(<PokeDetailsPanel {...props} />)

        expect(
            screen.getByText('Please click on a PokeCard from the grid')
        ).toBeInTheDocument()
    })

    it('should show pokemon details', async () => {
        const pokeDetails: PokeDetails = {
            id: 'id',
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
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('pikachu')).toBeInTheDocument()
        })
    })

    it('should show pokemon abilities', async () => {
        const pokeDetails: PokeDetails = {
            id: 'id',
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
        }

        await mockGetPokemonDetails.mockResolvedValue(pokeDetails)

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('ability')).toBeInTheDocument()
        })
    })

    it('should show a message if data fails to load from API', async () => {
        await mockGetPokemonDetails.mockRejectedValue({
            id: undefined,
            name: '',
            height: 0,
            weight: 0,
            frontImageUrl: null,
            backImageUrl: null,
            abilities: [],
        })

        render(<PokeDetailsPanel {...props} selectedPokemonUrl="url/abra" />)

        await waitFor(() => {
            expect(screen.getByText('No data available')).toBeInTheDocument()
        })
    })
})
