import { render, screen, fireEvent } from '@testing-library/react'
import InputLabel, { InputLabelProps } from './InputLabel'

describe('<InputLabel/>', () => {
    let props: InputLabelProps

    beforeEach(() => {
        props = {
            label: 'inputlabel',
            value: 'value',
            placeholder: 'placeholder',
            onChange: jest.fn(),
        }
    })

    it('should render defined label', () => {
        render(<InputLabel {...props} />)

        expect(screen.getByText('inputlabel:')).toBeInTheDocument()
    })

    it('should render a default placeholder', () => {
        render(<InputLabel {...props} placeholder={undefined} />)

        expect(screen.getByPlaceholderText('Enter a value')).toBeInTheDocument()
    })

    it('should render input with selected value', () => {
        render(<InputLabel {...props} />)

        expect(screen.getByDisplayValue('value')).toBeInTheDocument()
    })

    it('should call onChange() with expected params', () => {
        render(<InputLabel {...props} />)

        const input = screen.getByDisplayValue('value')

        fireEvent.change(input, { target: { value: 'newvalue' } })

        expect(props.onChange).toHaveBeenCalledWith('newvalue')
    })
})
