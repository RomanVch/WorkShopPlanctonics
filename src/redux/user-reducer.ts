import {initialStateUsers} from "./initial-state";

type UserType = {
    password: number;
    auth: boolean;
    name: string;
    id: number;
    position: string;
    avatar: string;
    login: string
}

type initialStateUsersType = {
    auth: boolean;
    users: Array<UserType>
}


export const bookReducer = (state: initialStateUsersType = initialStateUsers, action: any): initialStateUsersType => {

    switch (action.type) {

        case "AUTH": {
            const stateCopy = {...state}
            for (let i = 0; i < stateCopy.users.length; i++) {
                if (stateCopy.users[i].login === action.login) {
                    if (stateCopy.users[i].password === action.password) {
                        stateCopy.users[i].auth = true
                        stateCopy.auth = true
                    }
                }
            }
            return stateCopy
        }


        default:
            return state

    }
}
export const authAC = (login: string,password:string) => ({type: "AUTH", login,password} as const)
export type authACACType = ReturnType<typeof authAC>
