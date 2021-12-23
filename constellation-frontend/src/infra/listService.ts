import { List } from 'domains/board/models/List'
import { get, remove, put } from './apiService'

const getLists = (): Promise<List[]> => get('lists?_embed=cards')

const editList = (id: number, card: Partial<Omit<List, 'id'>>): Promise<void> =>
    put('lists', id, card)

const deleteList = (id: number): Promise<void> => remove('lists', id)

export { getLists, deleteList, editList }
