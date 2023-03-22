import { render } from '@testing-library/react'
import { notificationError, Notifications } from './Notifications'

import toast from 'react-hot-toast'

jest.mock('react-hot-toast')

describe('<Notifications/>', () => {
    it('call toaster.error() with expected message', () => {
        render(<Notifications />)

        notificationError('error message')

        expect(toast.error).toHaveBeenCalledWith('error message')
    })
})
