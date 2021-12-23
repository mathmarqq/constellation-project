import { CriticityLevel } from '../enums/CriticityLevel'

type Card = {
    id: number
    index: number
    description: string
    label?: CriticityLevel
    listId: number
}

export type { Card }
