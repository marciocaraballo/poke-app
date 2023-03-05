import styles from './InputLabel.module.css'

interface InputLabelProps {
    readonly label: string
    readonly value: string
    readonly onChange: Function
    readonly placeholder?: string
}

const InputLabel = (props: InputLabelProps) => {
    const { label, value, onChange, placeholder } = props

    return (
        <div>
            <span>{label}: </span>
            <input
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
