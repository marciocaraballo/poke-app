import { render, screen } from '@testing-library/react'
import ApiStatus from './ApiStatus'

describe('<ApiStatus/>', () => {
    it('should render an error message if isApiDown=true', () => {
        render(<ApiStatus isApiDown={true} isOnline={true} />)

        expect(
            screen.getByText('Red - 500 errors detected. API might be down.')
        ).toBeInTheDocument()
    })

    it('should render an success message if isApiDown=true', () => {
        render(<ApiStatus isApiDown={false} isOnline={true} />)

        expect(screen.getByText('Green - API working.')).toBeInTheDocument()
    })

    it('should render an success message if connection is offline', () => {
        render(<ApiStatus isApiDown={false} isOnline={false} />)

        expect(screen.getByText('You seem to be offline.')).toBeInTheDocument()
    })
})
