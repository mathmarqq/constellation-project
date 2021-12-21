import { CriticityLevel } from '../enums/CriticityLevel'

type Card = {
    id: number
    description: string
    label?: CriticityLevel
}

export type { Card }
