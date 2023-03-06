import styles from './ApiStatus.module.css'

interface ApiStatusProps {
    readonly isApiDown: boolean
    readonly isOnline: boolean
}

const ApiStatus = (props: ApiStatusProps) => {
    const { isApiDown, isOnline } = props

    const statusStyle = !isOnline
        ? styles.warning
        : isApiDown
        ? styles.error
        : styles.ok
    const statusMessage = !isOnline
        ? 'You seem to be offline.'
        : isApiDown
        ? 'Red - 500 errors detected. API might be down.'
        : 'Green - API working.'

    return (
        <span>
            Api status: <span className={statusStyle}>{statusMessage}</span>
        </span>
    )
}

export default ApiStatus
export type { ApiStatusProps }
