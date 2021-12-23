import { Card } from 'domains/board/models/Card'
import { post } from './apiService'

const createCard = (card: Omit<Card, 'id'>): Promise<void> => post('cards', card)

export { createCard }
