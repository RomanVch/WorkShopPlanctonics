import {combineReducers, createStore} from "redux";
import {userReducer} from "./user-reducer";
import {messageReducer} from "./chat-reducer";
import {loadState, saveState} from "../utils/localStorage";

const rootReducer = combineReducers({
    user: userReducer,
    chat: messageReducer
})


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
        saveState({
            user: store.getState().user,
            chat: store.getState().chat
        })
        localStorage.setItem("app-state", JSON.stringify(store.getState()))
    }
)