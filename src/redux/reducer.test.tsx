import React from 'react';
import {authAC, initialStateUsersType, userReducer} from "./user-reducer";
import {addMessageAC, deleteMessageAC, editMessageAC, initialStateChatType, messageReducer} from "./chat-reducer";


let startStateUser: initialStateUsersType;
let endStateUser: initialStateUsersType;

let startStateMessage: initialStateChatType;
let endStateUserMessage: initialStateChatType;


beforeEach(() => {

    startStateUser = {
        auth: false,
        users: [
            {
                id: 0,
                name: "Василий",
                position: "Админ",
                avatar: "https://avatarko.ru/img/avatar/19/kot_eda_18744.jpg",
                auth: false,
                login: "vasya",
                password: "111",
                online: false
            }, {
                id: 1,
                name: "Владимир",
                position: "Директор",
                avatar: "https://avatarko.ru/img/kartinka/17/muzhchina_16078.jpg",
                auth: false,
                login: "vova",
                password: "111",
                online: false
            }]
    }
    startStateMessage = {
        chatWork: [
            {userId: 0, messageId: 0, message: "Запускаю", img: "", data: "11:00 20.03.21"},
            {
                userId: 1,
                messageId: 1,
                message: "Всем привет это наш рабочий чат! прошу без мата и оффтопа",
                img: "",
                data: "11:04 20.03.21"
            },
        ],
        chatFlood: [
            {userId: 0, messageId: 0, message: "Запускаю", img: "", data: "11:00 20.03.21"},
            {
                userId: 1,
                messageId: 1,
                message: "Всем привет это наша флудилка! прошу меньше мата!",
                img: "",
                data: "11:04 20.03.21"
            },
        ]
    }
})

test('AuthUser', () => {
    endStateUser = userReducer(startStateUser, authAC("vova", "111"))
    expect(endStateUser.auth).toBe(true);
    expect(endStateUser.users[1].auth).toBe(true)
});
test('addMessage', () => {
    endStateUserMessage = messageReducer(startStateMessage, addMessageAC('work', 1, "привет", ""))
    expect(endStateUserMessage.chatWork.length).toBe(3);
    expect(startStateMessage !== endStateUserMessage).toBeTruthy()
});
test('deleteMessage', () => {
    endStateUserMessage = messageReducer(startStateMessage, deleteMessageAC('work', 1))
    expect(endStateUserMessage.chatWork.length).toBe(1);
    expect(startStateMessage !== endStateUserMessage).toBeTruthy()
});
test('editMessage', () => {
    endStateUserMessage = messageReducer(startStateMessage, editMessageAC('work', 1, "Привет"))
    expect(endStateUserMessage.chatWork[1].message).toBe("Привет");
    expect(startStateMessage !== endStateUserMessage).toBeTruthy()
});