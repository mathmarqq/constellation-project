import React, { TextareaHTMLAttributes, ReactElement } from 'react'
import styles from './Textarea.module.scss'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

function Textarea({ className, ...props }: TextareaProps): ReactElement {
    return <textarea className={`${styles.textarea} ${className}`} {...props} />
}

export default Textarea
export type { TextareaProps }
