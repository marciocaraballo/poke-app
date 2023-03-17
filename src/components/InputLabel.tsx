import styles from './InputLabel.module.css'

interface InputLabelProps {
    readonly label: string
    readonly value: string
    readonly onChange: (value: string) => void
    readonly placeholder?: string
    readonly id: string
}

const InputLabel = (props: InputLabelProps) => {
    const { label, value, onChange, placeholder, id } = props

    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <input
                id={id}
                className={styles.input}
                placeholder={placeholder ? placeholder : 'Enter a value'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputLabel
export type { InputLabelProps }
