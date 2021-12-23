import { List } from 'domains/board/models/List'
import { get, remove, put, post } from './apiService'

const getLists = (): Promise<List[]> => get('lists?_embed=cards')

const createList = (list: Partial<Omit<List, 'id'>>): Promise<void> => post('lists', list)

const editList = (id: number, list: Partial<Omit<List, 'id'>>): Promise<void> =>
    put('lists', id, list)

const deleteList = (id: number): Promise<void> => remove('lists', id)

export { getLists, deleteList, editList, createList }
