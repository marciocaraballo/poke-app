import { useState, useEffect } from 'react'

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const onOnlineStatusUpdate = () => setIsOnline(navigator.onLine)

        window.addEventListener('online', onOnlineStatusUpdate)
        window.addEventListener('offline', onOnlineStatusUpdate)

        return () => {
            window.removeEventListener('online', onOnlineStatusUpdate)
            window.removeEventListener('offline', onOnlineStatusUpdate)
        }
    }, [])

    return isOnline;
}

export default useOnlineStatus;