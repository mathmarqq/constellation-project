import React, { ButtonHTMLAttributes, ReactElement } from 'react'
import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...props }: ButtonProps): ReactElement {
    return (
        <button className={`${styles.button} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
export type { ButtonProps }
