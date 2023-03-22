import ReactSelect, { GroupBase, MultiValue, Props } from 'react-select'

type Value = MultiValue<Option>

interface Option {
    value: string
    label: string
}

function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
    return (
        <ReactSelect
            {...props}
            theme={(theme) => ({ ...theme, borderRadius: 5 })}
        />
    )
}

type SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>

export default Select
export type { Option, SelectProps, Value, MultiValue }
