import React, { ReactElement, ReactNode, useCallback, useContext, useState } from 'react'
import { List } from 'domains/board/models/List'
import { getLists } from 'infra'
import LoadingContext from 'contexts/LoadingContext'
import BoardContext from '../contexts/BoardContext'

type BoardProviderProps = {
    children: ReactNode
}

const BoardProvider = ({ children }: BoardProviderProps): ReactElement => {
    const [lists, setLists] = useState<List[]>([])
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const refreshBoard = useCallback(
        function refreshBoard() {
            showLoading()
            getLists().then((fetchedLists: List[]) => {
                setLists(fetchedLists)
                closeLoading()
            })
        },
        [showLoading, closeLoading]
    )

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
