import { List } from 'domains/board/models/List'
import { get, remove } from './apiService'

const getLists = (): Promise<List[]> => get('lists?_embed=cards')

const deleteList = (id: number): Promise<void> => remove('lists', id)

export { getLists, deleteList }
