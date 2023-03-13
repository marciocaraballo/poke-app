import { render, screen, fireEvent } from '@testing-library/react'
import Card, { CardProps } from './Card'

describe('<Card/>', () => {
    let props: CardProps

    beforeEach(() => {
        props = {
            name: 'Abra',
            url: 'url/abra',
            onCardClick: jest.fn(),
            dataTestId: 'dataTestId',
        }
    })

    it('should render a PokeBall image with an alt text associated to the pokemon', () => {
        render(<Card {...props} />)

        expect(
            screen.getByAltText('PokeCard associated to Abra')
        ).toBeInTheDocument()
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

    it('should call onCardClick() with expected params onKeyDown with Enter key', () => {
        render(<Card {...props} />)
        const card = screen.getByRole('button')

        fireEvent.keyDown(card, { key: 'Enter', code: 'Enter', charCode: 13 })

        expect(props.onCardClick).toHaveBeenCalledWith('url/abra')
    })
})
