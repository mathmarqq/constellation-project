import React, { ReactElement, useState } from 'react'
import { List } from 'domains/board/models/List'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import TrashIcon from 'components/Icons/TrashIcon'
import ConfirmationModal from 'components/ConfirmationModal'
import { ConfirmationModalProps } from 'components/ConfirmationModal/ConfirmationModal'
import { createCard } from 'infra'
import styles from './BoardList.module.scss'
import BoardListFooter from './BoardListFooter'
import CardOrganizer from './CardOrganizer'

const confirmationModalProps: ConfirmationModalProps = {
    title: 'Delete List',
    description: 'Do you really want to delete this record?',
    continueButtonText: 'Continue',
    closeButtonText: 'Close',
    onContinue: () => {},
    onClose: () => {},
}

type BoardListProps = {
    list: List
}

function BoardList({ list }: BoardListProps): ReactElement {
    const [isCreatingCard, setIsCreatingCard] = useState(false)
    const [newCardDescription, setNewCardDescription] = useState('')
    const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false)

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCardDescription(event.target.value)
    }

    const saveNewCard = (): void => {
        createCard({
            description: newCardDescription,
            index: list.cards.length,
            listId: list.id,
        }).then(() => {
            setNewCardDescription('')
            setIsCreatingCard(false)
        })
    }

    const cancelForm = () => {
        setNewCardDescription('')
        setIsCreatingCard(false)
    }

    return (
        <>
            <Draggable draggableId={`${list.id}_list`} index={list.index}>
                {(provided: DraggableProvided) => (
                    <div
                        ref={provided.innerRef}
                        className={styles.list}
                        {...provided.draggableProps}
                    >
                        <div className={styles.header}>
                            <h2 {...provided.dragHandleProps}>{list.title}</h2>
                            <button
                                className={styles.deleteButton}
                                type="button"
                                title="Delete List"
                                aria-label="Delete List"
                                onClick={() => setIsShowingConfirmationModal(true)}
                            >
                                <span className={styles.hideInformation}>Delete List</span>
                                <TrashIcon aria-hidden="true" />
                            </button>
                        </div>
                        <CardOrganizer
                            list={list}
                            isCreatingCard={isCreatingCard}
                            newCardDescription={newCardDescription}
                            onDescriptionChange={handleDescriptionChange}
                        />
                        <BoardListFooter
                            isCreatingCard={isCreatingCard}
                            addCard={() => setIsCreatingCard(true)}
                            saveNewCard={saveNewCard}
                            cancelForm={cancelForm}
                        />
                    </div>
                )}
            </Draggable>
            {isShowingConfirmationModal ? (
                <ConfirmationModal
                    {...confirmationModalProps}
                    onClose={() => setIsShowingConfirmationModal(false)}
                    onContinue={() => setIsShowingConfirmationModal(false)}
                />
            ) : null}
        </>
    )
}

export default BoardList
export type { BoardListProps }
