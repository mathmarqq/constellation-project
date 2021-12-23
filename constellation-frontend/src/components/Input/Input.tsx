import React, { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }: InputProps, ref) => {
        return <input className={`${styles.input} ${className}`} {...props} ref={ref} />
    }
)

export default Input
export type { InputProps }
