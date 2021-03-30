import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {UserType} from "../redux/user-reducer";
import {Avatar} from "@material-ui/core";
import {Navigation} from "./Navigation";

const avatarStyle = {
    width: 150,
    height: 150,
    margin: "auto",
    marginTop: 30
}

export const Main = () => {
        const auth = useSelector<AppStateType, boolean>(state => state.user.auth)
        const users = useSelector<AppStateType, Array<UserType>>(state => state.user.users)
        const authUser: UserType = useSelector<AppStateType, UserType | any>(state => state.user.users.find((u) => u.auth))

        return (
            <div>{!auth
                ? <div className={"main__block"}>
                    <h2>Привет! Ты зашел в приложение компании Planktonics, для того чтобы продолжить, авторизуйся!</h2>
                    <p>!!логины и пароли:</p>
                    <div className={'title'}><span>Login</span> <span>Password</span></div>
                    <div className={'table'}>
                        {users.map((u: UserType) => <p key={u.id}><span>{u.login}</span> <span>{u.password}</span></p>)}
                    </div>
                </div>
                : <div className={"main__authBlock"}>
                    <Avatar style={avatarStyle} alt="Remy Sharp" src={authUser.avatar}/>
                    <div className={"main__info"}>
                        <h2>{authUser.name}</h2>
                        <p>{authUser.position}</p>
                        <Navigation/>
                    </div>
                    <div className={"main__dignity"}><h2> В данном приложении реализован следующий функционал:</h2>
                        <div className={"main__wrapperDignity"}>
                            <p><span className={"main__bold"}>1)</span>Локальная авторизация пользователя</p>
                            <p><span className={"main__bold"}>2)</span>Весь стейт хранится в Local Storage</p>
                            <p><span className={"main__bold"}>3)</span>Выбор из двух Чатов <span
                                className={"main__bold"}>I)</span> Работа <span
                                className={"main__bold"}>II)</span> Флудилка</p>
                            <p><span className={"main__bold"}>4)</span>Добавление сообщения</p>
                            <p><span className={"main__bold"}>5)</span>Редактирование сообщений авторизированного
                                пользователя</p>
                            <p><span className={"main__bold"}>6)</span>Удаление сообщений авторизированного
                                пользователя</p>
                            <p><span className={"main__bold"}>7)</span>Добавление emoji <span
                                className={"main__bold"}>I)</span> drag-and-drop</p>
                            <p><span className={"main__bold"}>8)</span>Добавление изображений и хранение его в Local
                                Storage (Base64)</p>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
;

