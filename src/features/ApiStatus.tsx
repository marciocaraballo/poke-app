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
        ? 'Warning - You seem to be offline'
        : isApiDown
        ? 'Red - Some 500 errors detected, API might be down'
        : 'Green - API is working as expected'

    return (
        <span tabIndex={0} aria-live="polite">
            PokeApi status: <span className={statusStyle}>{statusMessage}</span>
        </span>
    )
}

export default ApiStatus
export type { ApiStatusProps }
