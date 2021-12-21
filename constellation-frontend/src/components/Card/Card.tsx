import React, { ReactElement, ReactNode } from 'react'
import styles from './Card.module.scss'

type CardProps = {
    children: ReactNode
    className?: string
}

function Card({ children, className }: CardProps): ReactElement {
    return <div className={`${styles.card} ${className}`}>{children}</div>
}

Card.defaultProps = {
    className: '',
}

export default Card
export type { CardProps }
