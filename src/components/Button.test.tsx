import { render, screen, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

describe('<Button/>', () => {
    let props: ButtonProps

    beforeEach(() => {
        props = {
            variant: 'default',
            disabled: false,
            text: 'myButton',
        }
    })

    it('should render a default variant without breaking', () => {
        render(<Button {...props} />)

        expect(screen.getByText('myButton')).toBeInTheDocument()
    })

    it('should render a default variant with disabled state', () => {
        render(<Button {...props} disabled={true} />)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should call onClick() when clicking default variant', () => {
        let onClick = jest.fn()

        render(<Button {...props} onClick={onClick} />)

        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(onClick).toHaveBeenCalled()
    })

    it('should render a submit variant without breaking', () => {
        render(<Button {...props} variant="submit" />)

        expect(screen.getByText('myButton')).toBeInTheDocument()
    })

    it('should render a submit variant with disabled state', () => {
        render(<Button {...props} variant="submit" disabled={true} />)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should render a link variant without breaking', () => {
        render(<Button {...props} variant="link" />)

        expect(screen.getByText('myButton')).toBeInTheDocument()
    })

    it('should render a link variant with disabled state', () => {
        render(<Button {...props} variant="link" disabled={true} />)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should call onClick() when clicking a link variant', () => {
        let onClick = jest.fn()

        render(<Button {...props} onClick={onClick} />)

        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(onClick).toHaveBeenCalled()
    })

    it('should not call onClick() when clicking a disabled link variant', () => {
        let onClick = jest.fn()

        render(<Button {...props} disabled={true} onClick={onClick} />)

        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(onClick).not.toHaveBeenCalled()
    })
})
