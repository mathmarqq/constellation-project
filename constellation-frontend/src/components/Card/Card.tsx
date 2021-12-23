import React, { forwardRef, ReactNode } from 'react'
import styles from './Card.module.scss'

type CardProps = {
    children: ReactNode
    className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, ...props }: CardProps, ref) => {
        return (
            <div className={`${styles.card} ${className}`} data-testid="card" ref={ref} {...props}>
                {children}
            </div>
        )
    }
)

Card.defaultProps = {
    className: '',
}

export default Card
export type { CardProps }
