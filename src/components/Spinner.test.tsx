import { render, screen } from '@testing-library/react'
import Spinner, { SpinnerProps } from './Spinner'

describe('<Spinner/>', () => {
    let props: SpinnerProps

    beforeEach(() => {
        props = {
            dataTestId: 'dataTestId',
        }
    })

    it('should render without breaking', () => {
        render(<Spinner {...props} />)

        expect(screen.getByTestId('dataTestId')).toBeInTheDocument()
    })
})
