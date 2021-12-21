import { Card } from 'domains/board/models/Card'

type List = {
    id: number
    title: string
    cards: Card[]
}

export type { List }
