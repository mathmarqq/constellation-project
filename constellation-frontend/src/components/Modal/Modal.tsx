import React, { CSSProperties, ReactElement, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import globalStyles from 'styles/themes.module.scss'
import styles from './Modal.module.scss'

type ModalProps = {
    children: ReactNode
    backgroundClassName?: string
    className?: string
    style?: CSSProperties
    onClose: () => void
}

function Modal({
    children,
    backgroundClassName,
    className,
    style,
    onClose,
}: ModalProps): ReactElement | null {
    useEffect(() => {
        function onClick(event: MouseEvent) {
            if (event.target === event.currentTarget) {
                onClose()
            }
        }
        document.getElementById('dialog-backdrop')?.addEventListener('click', onClick)

        return () => {
            document.getElementById('dialog-backdrop')?.removeEventListener('click', onClick)
        }
    }, [onClose])

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onClose])

    const getModalWrapper = () => (
        <div
            id="dialog-backdrop"
            data-testid="dialog-backdrop"
            className={`${globalStyles.defaultTheme} ${styles.background} ${backgroundClassName}`}
        >
            <div className={className} aria-modal="true" role="dialog" style={style}>
                {children}
            </div>
        </div>
    )

    return ReactDOM.createPortal(getModalWrapper(), document.body)
}

Modal.defaultProps = {
    backgroundClassName: '',
    className: '',
    style: undefined,
}

export default Modal
export type { ModalProps }
