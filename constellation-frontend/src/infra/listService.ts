import { List } from 'domains/board/models/List'
import { get } from './apiService'

const getLists = (): Promise<List[]> => get('lists?_embed=cards')

export { getLists }
