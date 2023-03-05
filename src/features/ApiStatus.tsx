import styles from './ApiStatus.module.css'

interface ApiStatusProps {
    readonly isApiDown: boolean
}

const ApiStatus = (props: ApiStatusProps) => {
    const { isApiDown } = props

    return (
        <span>
            Api status:{' '}
            <span
                className={isApiDown ? styles.error : styles.ok}
            >
                {isApiDown
                    ? 'Red - 500 errors detected. API might be down.'
                    : 'Green - API working.'}
            </span>
        </span>
    )
}

export default ApiStatus
export type { ApiStatusProps }
