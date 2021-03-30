import {initialStateChat} from "./initial-state";
import {chat} from "../utils/ENUM";
export type ChatType = {
    userId: number,
    messageId: number,
    message: string,
    img: string,
    data: string
}

export type initialStateChatType = {
    chatWork: Array<ChatType>
    chatFlood: Array<ChatType>
}
let creatTime2string = (getTime: number) => {
    return getTime < 10 ? "0" + getTime : getTime
}

const Time = () => {
    let today: Date = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear().toString().substr(-2);
    let hour = today.getHours();
    let min = creatTime2string(today.getMinutes());
    let Times = hour + ":" + min + " " + dd + '.' + mm + '.' + yyyy;
    return Times
}


export const addMessageAC = (chat: "work" | "flood", userId: number, message: string, img: string) => ({
    type: "CHAT_ADD_MESSAGE",
    chat,
    userId,
    message,
    img
} as const)
export type addMessageACType = ReturnType<typeof addMessageAC>
export const editMessageAC = (chat: "work" | "flood", messageId: number, message: string) => ({
    type: "CHAT_EDIT_MESSAGE",
    chat,
    messageId,
    message
} as const)
export type editMessageACType = ReturnType<typeof editMessageAC>
export const deleteMessageAC = (chat: "work" | "flood", messageId: number) => ({
    type: "CHAT_DELETE_MESSAGE",
    chat,
    messageId
} as const)
export type deleteMessageACType = ReturnType<typeof deleteMessageAC>
type allActionCreaterType = addMessageACType | editMessageACType | deleteMessageACType
export const messageReducer = (state: initialStateChatType = initialStateChat, action: allActionCreaterType): initialStateChatType => {

    switch (action.type) {
        case "CHAT_ADD_MESSAGE": {
            const copyState = {...state}
            if (action.chat === chat.Work) {
                copyState.chatWork = [...copyState.chatWork,
                    {
                        userId: action.userId,
                        messageId: copyState.chatWork[copyState.chatWork.length - 1].messageId + 1,
                        message: action.message,
                        img: action.img,
                        data: Time()
                    }]
                return copyState
            } else if (action.chat === chat.Flood) {
                copyState.chatFlood = [...copyState.chatFlood,
                    {
                        userId: action.userId,
                        messageId: copyState.chatFlood[copyState.chatFlood.length - 1].messageId + 1,
                        message: action.message,
                        img: "",
                        data: Time()
                    }]
            }
            return copyState
        }
        case "CHAT_EDIT_MESSAGE": {
            const copyState = {...state}
            if (action.chat === chat.Work) {
                copyState.chatWork = copyState.chatWork.map((ch) => {
                    if (ch.messageId === action.messageId) {
                        return {...ch, message: action.message}
                    } else {
                        return ch
                    }
                })
            } else if (action.chat === chat.Flood) {
                copyState.chatFlood = copyState.chatFlood.map((ch) => {
                    if (ch.messageId === action.messageId) {
                        return {...ch, message: action.message}
                    } else {
                        return ch
                    }
                })
            }
            return copyState
        }
        case "CHAT_DELETE_MESSAGE": {
            const copyState = {...state}
            if (action.chat === chat.Work) {
                copyState.chatWork = copyState.chatWork.filter((ch) => ch.messageId !== action.messageId)
                return copyState
            } else if (action.chat === chat.Flood) {
                copyState.chatFlood = copyState.chatFlood.filter((ch) => ch.messageId !== action.messageId)
                return copyState
            }

            return copyState
        }

        default:
            return state

    }
}
