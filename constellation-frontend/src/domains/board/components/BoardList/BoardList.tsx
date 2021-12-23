/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useContext, useRef, useState } from 'react'
import { List } from 'domains/board/models/List'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import TrashIcon from 'components/Icons/TrashIcon'
import ConfirmationModal from 'components/ConfirmationModal'
import Input from 'components/Input'
import { ConfirmationModalProps } from 'components/ConfirmationModal/ConfirmationModal'
import { createCard, deleteList, editList } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
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
    const { refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const [isCreatingCard, setIsCreatingCard] = useState(false)
    const [newCardDescription, setNewCardDescription] = useState('')

    const [isEditingList, setIsEditingList] = useState(false)
    const [listTitle, setListTitle] = useState(list.title)

    const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleListTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListTitle(event.target.value)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCardDescription(event.target.value)
    }

    const handleDeleteList = (): void => {
        showLoading()
        deleteList(list.id).then(() => {
            setIsShowingConfirmationModal(false)
            closeLoading()
            refreshBoard()
        })
    }

    const saveNewCard = (): void => {
        showLoading()
        createCard({
            description: newCardDescription,
            index: list.cards.length,
            listId: list.id,
        }).then(() => {
            setNewCardDescription('')
            setIsCreatingCard(false)
            closeLoading()
            refreshBoard()
        })
    }

    const onUpdate = () => {
        setIsEditingList(true)

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 50)
    }

    const updateList = (): void => {
        if (list.title !== listTitle) {
            showLoading()

            editList(list.id, { title: listTitle, index: list.index }).then(() => {
                setIsEditingList(false)
                refreshBoard()
                closeLoading()
            })
        } else {
            setIsEditingList(false)
        }
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
                        <div className={styles.header} {...provided.dragHandleProps}>
                            {isEditingList ? (
                                <Input
                                    value={listTitle}
                                    onChange={handleListTitleChange}
                                    onBlur={updateList}
                                    ref={inputRef}
                                />
                            ) : (
                                <h2 onClick={onUpdate} className={styles.title}>
                                    {list.title}
                                </h2>
                            )}
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
                    onContinue={handleDeleteList}
                />
            ) : null}
        </>
    )
}

export default BoardList
export type { BoardListProps }
