import ReactSelect, { MultiValue, StylesConfig } from 'react-select'

type Value = MultiValue<Option>

type OnChangeFunction = (newValue: Value) => void

interface Option {
    value: string
    label: string
}

interface SelectProps {
    readonly value: Value
    readonly onChange: OnChangeFunction
    readonly options: ReadonlyArray<Option>
    readonly placeholder?: string
    readonly name: string
}

const colourStyles: StylesConfig<Option> = {
    container: (styles) => ({
        ...styles,
        width: '500px',
        marginRight: '4px',
        marginLeft: '4px',
    }),
}

const Select = (props: SelectProps) => {
    const { value, onChange, options, placeholder, name } = props

    return (
        <ReactSelect
            inputId={name}
            name={name}
            placeholder={placeholder}
            styles={colourStyles}
            value={value}
            onChange={onChange}
            isMulti={true}
            isSearchable={true}
            options={options}
        />
    )
}

export default Select
export type { Option, SelectProps, Value }
