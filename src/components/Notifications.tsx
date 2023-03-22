import toast, { Toaster } from 'react-hot-toast'

const Notifications = () => {
    return <Toaster position="bottom-center" reverseOrder={false} />
}

const notificationError = (message: string) => toast.error(message)

export { Notifications, notificationError }

export default Notifications
