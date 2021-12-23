import React, { CSSProperties, ReactElement, useContext, useState } from 'react'
import Modal from 'components/Modal'
import Card from 'components/Card'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import CardLabel from 'domains/board/components/CardLabel'
import { Card as CardType } from 'domains/board/models/Card'
import ConfirmationModal from 'components/ConfirmationModal'
import { ConfirmationModalProps } from 'components/ConfirmationModal/ConfirmationModal'
import { editCard, deleteCard } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import styles from './EditCardModal.module.scss'

const confirmationModalProps: ConfirmationModalProps = {
    title: 'Delete Card',
    description: 'Do you really want to delete this record?',
    continueButtonText: 'Continue',
    closeButtonText: 'Close',
    onContinue: () => {},
    onClose: () => {},
}

type EditCardModalProps = {
    card: CardType
    style?: CSSProperties
    onSave: () => void
    onClose: () => void
    onDelete: () => void
}

function EditCardModal({
    card,
    style,
    onSave,
    onDelete,
    onClose,
}: EditCardModalProps): ReactElement {
    const [cardDescription, setCardDescription] = useState(card.description)
    const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false)
    const { refreshBoard } = useContext(BoardContext)

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardDescription(event.target.value)
    }

    const saveCard = () => {
        editCard(card.id, {
            index: card.index,
            description: cardDescription,
            label: card.label,
            listId: card.listId,
        }).then(() => {
            refreshBoard()
            onSave()
        })
    }

    const handleDeleteCard = () => {
        deleteCard(card.id).then(() => {
            refreshBoard()
            onDelete()
        })
    }

    return (
        <>
            <Modal onClose={onClose} className={styles.modal} style={style}>
                <Card className={styles.card}>
                    <CardLabel label={card.label} />
                    <Textarea
                        placeholder="Enter a description for this card…"
                        value={cardDescription}
                        onChange={handleTextareaChange}
                    />
                </Card>
                <div className={styles.actionButtons}>
                    <Button type="button" onClick={saveCard}>
                        Save
                    </Button>
                    <Button type="button" onClick={() => setIsShowingConfirmationModal(true)}>
                        Delete
                    </Button>
                </div>
            </Modal>
            {isShowingConfirmationModal ? (
                <ConfirmationModal
                    {...confirmationModalProps}
                    onClose={() => setIsShowingConfirmationModal(false)}
                    onContinue={handleDeleteCard}
                />
            ) : null}
        </>
    )
}

EditCardModal.defaultProps = {
    style: undefined,
}

export default EditCardModal
export type { EditCardModalProps }
