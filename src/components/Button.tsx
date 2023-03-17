import styles from './Button.module.css'

import cn from 'classnames'

interface ButtonProps {
    readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
    readonly variant: 'link' | 'submit' | 'default'
    readonly text: string
    readonly disabled?: boolean
    readonly className?: string
}

/**
 * We are assuming only two variations as they are the only ones necessary
 * for the app. Ideally they should be more, or might be added in the future.
 */
const Button = (props: ButtonProps) => {
    const { variant, disabled, onClick, text, className } = props

    if (variant === 'submit') {
        return (
            <input
                type="submit"
                value={text}
                disabled={disabled}
                className={className}
            />
        )
    }

    if (variant === 'link') {
        return (
            <button
                className={cn(styles.buttonLink, className)}
                onClick={(e) => {
                    if (!disabled && onClick !== undefined) {
                        onClick(e)
                    }
                }}
                disabled={disabled}
            >
                {text}
            </button>
        )
    }

    return (
        <button onClick={onClick} disabled={disabled} className={className}>
            {text}
        </button>
    )
}

export default Button
export type { ButtonProps }
