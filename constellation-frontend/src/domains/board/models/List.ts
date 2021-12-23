import { Card } from 'domains/board/models/Card'

type List = {
    id: number
    index: number
    title: string
    cards: Card[]
}

export type { List }
