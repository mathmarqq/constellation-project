import { Card } from 'domains/board/models/Card'
import { post, put } from './apiService'

const createCard = (card: Omit<Card, 'id'>): Promise<void> => post('cards', card)

const editCard = (id: number, card: Partial<Omit<Card, 'id'>>): Promise<void> =>
    put('cards', id, card)

export { createCard, editCard }
