import React, { CSSProperties, ReactElement, useState } from 'react'
import Modal from 'components/Modal'
import Card from 'components/Card'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import CardLabel from 'domains/board/components/CardLabel'
import { Card as CardType } from 'domains/board/models/Card'
import styles from './EditCardModal.module.scss'

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

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardDescription(event.target.value)
    }

    const saveCard = () => {
        onSave()
    }

    const deleteCard = () => {
        onDelete()
    }

    return (
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
                <Button type="button" onClick={deleteCard}>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

EditCardModal.defaultProps = {
    style: undefined,
}

export default EditCardModal
export type { EditCardModalProps }
