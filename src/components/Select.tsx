import ReactSelect, { GroupBase, MultiValue, Props } from 'react-select'

enum SizeVariants {
    SMALL = 50,
    MEDIUM = 130,
}

interface SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
    variant?: 's' | 'm'
}

type Value = MultiValue<Option>

interface Option {
    value: string
    label: string
}

function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
    const { variant } = props

    return (
        <ReactSelect
            {...props}
            theme={(theme) => ({ ...theme, borderRadius: 5 })}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    minWidth:
                        variant === 's'
                            ? SizeVariants.SMALL
                            : SizeVariants.MEDIUM,
                }),
            }}
        />
    )
}

export default Select
export type { Option, SelectProps, Value, MultiValue }
