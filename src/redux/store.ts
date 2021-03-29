import {combineReducers, createStore} from "redux";
import {bookReducer} from "./books-reduser";
import {loadState, saveState} from "../utils/localStorage";

const rootReducer = combineReducers(
    {books: bookReducer}
)


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
        saveState({
            books: store.getState().books
        })
        localStorage.setItem("app-state", JSON.stringify(store.getState()))
    }
)
