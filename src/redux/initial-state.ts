import {v1} from 'uuid'

export type bookType = {
    id: string,
    authorBook: string,
    nameBook: string
    img: string
}


const initialStates = [] as Array<bookType>

export type BooksStateType = typeof initialStates


export const bookReducer = (state = initialStates, action: any): BooksStateType => {

    switch (action.type) {

        case "ADD_BOOK":
            return [...state, {id: v1(), authorBook: action.authorBook, nameBook: action.nameBook, img: action.img}]
        case "DELETE_BOOK":
            return state.filter((b: bookType) => b.id !== action.id)
        case "CHANGE_NAME": {
            const newState = state.map((b: bookType) => {
                if (b.id === action.id) {
                    return {...b, nameBook: action.nameBook}
                } else {
                    return b
                }
            })
            return newState
        }
        case "CHANGE_AUTHOR": {
            const newState = state.map((b: bookType) => {
                if (b.id === action.id) {
                    return {...b, authorBook: action.authorBook}
                } else {
                    return b
                }
            })
            return newState
        }
        default:
            return state

    }
}
export type allTypeReducer = addBookACType | deleteBookACType
export const addBookAC = (authorBook: string, nameBook: string, img: string) => ({
    type: "ADD_BOOK",
    authorBook,
    nameBook,
    img
} as const)
export type addBookACType = ReturnType<typeof addBookAC>
export const deleteBookAC = (id: string) => ({type: "DELETE_BOOK", id} as const)
export type deleteBookACType = ReturnType<typeof deleteBookAC>
export const changeNameBookAC = (id: string, nameBook: string) => ({type: "CHANGE_NAME", id, nameBook} as const)
export type changeNameBookACType = ReturnType<typeof changeNameBookAC>
export const changeAuthorBookAC = (id: string, authorBook: string) => ({type: "CHANGE_AUTHOR", id, authorBook} as const)
export type changeNameAuthorACType = ReturnType<typeof changeAuthorBookAC>
