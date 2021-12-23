import { createContext } from 'react'
import { List } from 'domains/board/models/List'

type BoardContextType = {
    refreshBoard: () => void
    lists: List[]
}

const SnackbarContext = createContext<BoardContextType>({
    refreshBoard: () => {},
    lists: [],
})

export default SnackbarContext
