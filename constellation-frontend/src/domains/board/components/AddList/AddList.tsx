import React, { ReactElement, useContext, useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import CloseIcon from 'components/Icons/CloseIcon'
import { createList } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
import styles from './AddList.module.scss'

type AddListProps = {
    listIndex: number
}

function AddList({ listIndex }: AddListProps): ReactElement {
    const { refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const [isCreatingList, setIsCreatingList] = useState(false)
    const [listTitle, setListTitle] = useState('')

    const handleListTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListTitle(event.target.value)
    }

    const saveNewList = (): void => {
        showLoading()
        createList({
            title: listTitle,
            index: listIndex,
        }).then(() => {
            setListTitle('')
            setIsCreatingList(false)
            closeLoading()
            refreshBoard()
        })
    }

    const cancelForm = () => {
        setListTitle('')
        setIsCreatingList(false)
    }

    return (
        <div className={styles.wrapper}>
            {isCreatingList ? (
                <>
                    <Input
                        value={listTitle}
                        onChange={handleListTitleChange}
                        placeholder="Enter list title..."
                    />
                    <div className={styles.actionButtons}>
                        <Button type="button" onClick={saveNewList} className={styles.saveButton}>
                            Save list
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
                    </div>
                </>
            ) : (
                <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => setIsCreatingList(true)}
                >
                    Add another list
                </button>
            )}
        </div>
    )
}

export default AddList
export type { AddListProps }
