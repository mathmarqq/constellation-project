import { List } from 'domains/board/models/List'

type Board = {
    id: number
    title: string
    lists: List[]
}

export type { Board }
