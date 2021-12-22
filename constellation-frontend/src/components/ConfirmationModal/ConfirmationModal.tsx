import React, { ReactElement } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import styles from './ConfirmationModal.module.scss'

type ConfirmationModalProps = {
    title: string
    description: string
    continueButtonText: string
    closeButtonText: string
    onContinue: () => void
    onClose: () => void
}

function ConfirmationModal({
    title,
    description,
    continueButtonText,
    closeButtonText,
    onContinue,
    onClose,
}: ConfirmationModalProps): ReactElement {
    return (
        <Modal
            onClose={onClose}
            className={styles.modal}
            backgroundClassName={styles.modalBackground}
        >
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.actionButtons}>
                <Button type="button" onClick={onClose}>
                    {closeButtonText}
                </Button>
                <Button type="button" onClick={onContinue}>
                    {continueButtonText}
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal
export type { ConfirmationModalProps }
