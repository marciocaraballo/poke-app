import { render, screen } from '@testing-library/react'
import Select, { SelectProps } from './Select'

describe('<Select/>', () => {
    let props: SelectProps

    beforeEach(() => {
        props = {
            value: [{ label: 'label', value: 'value' }],
            onChange: jest.fn(),
            options: [{ label: 'label', value: 'value' }],
            placeholder: 'placeholder',
            name: 'name',
        }
    })

    it('should render without breaking', () => {
        render(<Select {...props} />)

        expect(screen.getByText('label')).toBeInTheDocument()
    })
})
