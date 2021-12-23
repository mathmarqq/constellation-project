import React, { ReactElement } from 'react'
import Button from 'components/Button'
import CloseIcon from 'components/Icons/CloseIcon'
import styles from './BoardListFooter.module.scss'

type BoardListFooterProps = {
    isCreatingCard: boolean
    addCard: () => void
    saveNewCard: () => void
    cancelForm: () => void
}

function BoardListFooter({
    isCreatingCard,
    addCard,
    saveNewCard,
    cancelForm,
}: BoardListFooterProps): ReactElement {
    return (
        <div className={styles.footer}>
            {isCreatingCard ? (
                <>
                    <Button type="button" onClick={saveNewCard} className={styles.saveButton}>
                        Save card
                    </Button>
                    <button
                        className={styles.closeButton}
                        type="button"
                        title="Cancel Form"
                        aria-label="Cancel Form"
                        onClick={cancelForm}
                    >
                        <span className={styles.hideInformation}>Cancel Form</span>
                        <CloseIcon aria-hidden="true" />
                    </button>
                </>
            ) : (
                <button className={styles.addButton} type="button" onClick={addCard}>
                    Add a card
                </button>
            )}
        </div>
    )
}

export default BoardListFooter
export type { BoardListFooterProps }
