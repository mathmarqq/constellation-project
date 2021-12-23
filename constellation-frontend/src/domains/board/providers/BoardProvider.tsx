import React, { ReactElement, ReactNode, useCallback, useState } from 'react'
import { List } from 'domains/board/models/List'
import { getLists } from 'infra'
import BoardContext from '../contexts/BoardContext'

type BoardProviderProps = {
    children: ReactNode
}

const BoardProvider = ({ children }: BoardProviderProps): ReactElement => {
    const [lists, setLists] = useState<List[]>([])

    const refreshBoard = useCallback(function refreshBoard() {
        getLists().then((fetchedLists: List[]) => {
            setLists(fetchedLists)
        })
    }, [])

    const value = React.useMemo(
        () => ({
            lists,
            refreshBoard,
        }),
        [refreshBoard, lists]
    )

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

export default BoardProvider
