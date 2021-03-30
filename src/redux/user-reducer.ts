import {initialStateUsers} from "./initial-state";

export type UserType = {
    password: string;
    auth: boolean;
    name: string;
    id: number;
    position: string;
    avatar: string;
    login: string,
    online: boolean
}

export type initialStateUsersType = {
    auth: boolean;
    users: Array<UserType>
}
export const authAC = (login: string, password: string) => ({type: "AUTH", login, password} as const)
export type authACType = ReturnType<typeof authAC>
export const exitAC = () => ({type: "EXIT"} as const)
export type exitACType = ReturnType<typeof exitAC>
type allActionCreaterType = authACType | exitACType
export const userReducer = (state: initialStateUsersType = initialStateUsers, action: allActionCreaterType): initialStateUsersType => {

    switch (action.type) {
        case "AUTH": {
            const stateCopy = {...state}
            for (let i = 0; i < stateCopy.users.length; i++) {
                if (stateCopy.users[i].login === action.login) {
                    if (stateCopy.users[i].password === action.password) {
                        stateCopy.users[i].auth = true
                        stateCopy.auth = true
                        stateCopy.users[i].online = true
                    }
                }
            }
            return stateCopy
        }
        case "EXIT": {
            const stateCopy = {...state}
            stateCopy.auth = false
            for (let i = 0; i < stateCopy.users.length; i++) {
                stateCopy.users[i].auth = false
            }
            return {
                ...state,
                auth: false,
                users: state.users.map(user => {
                    return {...user, auth: false, online:false}
                })
            }
        }

        default:
            return state

    }
}


