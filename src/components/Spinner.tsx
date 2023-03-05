import styles from './Spinner.module.css'

interface SpinnerProps {
    readonly dataTestId: string
}

const Spinner = (props: SpinnerProps) => {
    const { dataTestId } = props

    return (
        <div className={styles.spinner} data-testid={dataTestId}>
            <div className={styles.animation}></div>
        </div>
    )
}

export default Spinner
export type { SpinnerProps }
