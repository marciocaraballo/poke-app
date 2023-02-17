import { render, screen, fireEvent } from '@testing-library/react'
import Card, { CardProps } from './Card'

describe('<Card/>', () => {
    let props: CardProps

    beforeEach(() => {
        props = {
            name: 'Abra',
            url: 'url/abra',
            onCardClick: jest.fn(),
        }
    })

    it('should render a PokeBall image', () => {
        render(<Card {...props} />)

        expect(screen.getByAltText('pokeball')).toBeInTheDocument()
    })

    it('should render Pokemon name', () => {
        render(<Card {...props} />)

        expect(screen.getByText('Abra')).toBeInTheDocument()
    })

    it('should call onCardClick() with expected params onClick', () => {
        render(<Card {...props} />)
        const card = screen.getByRole('button')

        fireEvent.click(card)

        expect(props.onCardClick).toHaveBeenCalledWith('url/abra')
    })
})
