import './Spinner.css'

interface SpinnerProps {
    readonly dataTestId: string
}

const Spinner = (props: SpinnerProps) => {
    const { dataTestId } = props

    return (
        <div className="spinner" data-testid={dataTestId}>
            <div className="spinner_animation"></div>
        </div>
    )
}

export default Spinner
export type { SpinnerProps }
