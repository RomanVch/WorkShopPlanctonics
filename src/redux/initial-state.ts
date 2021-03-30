

export const initialStateUsers = {
    auth:false,
    users: [
        {
            id: 0,
            name: "Василий",
            position: "Админ",
            avatar: "https://avatarko.ru/img/avatar/19/kot_eda_18744.jpg",
            auth:false,
            login:"vasya",
            password:"111",
            online:false
        }, {
            id: 1,
            name: "Владимир",
            position: "Директор",
            avatar: "https://avatarko.ru/img/kartinka/17/muzhchina_16078.jpg",
            auth:false,
            login:"vova",
            password:"111",
            online:false
        }, {
            id: 2,
            name: "Василий",
            position: "Менеджер Проектов",
            avatar: "https://avatarko.ru/img/avatar/3/film_muzhchina_2735.jpg",
            auth:false,
            login:"vasylyi",
            password:"111",
            online:false
        }, {
            id: 3,
            name: "Иван",
            position: "Разработчик",
            avatar: "https://avatarko.ru/img/avatar/19/serial_pistolet_18696.jpg",
            auth:false,
            login:"ivan",
            password:"111",
            online:false
        }, {
            id: 4,
            name: "Мария",
            position: "Админимистор",
            avatar: "https://i.pinimg.com/originals/27/3f/e7/273fe77d76db3cfe657a8734890cab1f.png",
            auth:false,
            login:"maria",
            password:"111",
            online:false
        }, {
            id: 5,
            name: "Петрович",
            position: "Завхоз",
            avatar: "https://avatarko.ru/img/avatar/16/muzhchina_napitok_15967.jpg",
            auth:false,
            login:"petrovich",
            password:"111",
            online:false
        }, {
            id: 6,
            name: "Катя",
            position: "Менеджер",
            avatar: "https://avatarko.ru/img/avatar/33/more_devushka_spinoj_34308.jpg",
            auth:false,
            login:"katya",
            password:"111",
            online:false
        }, {
            id: 7,
            name: "Рома",
            position: "Разработчик",
            avatar: "https://avatarko.ru/img/avatar/25/multfilm_Simpsons_24744.jpg",
            auth:false,
            login:"roma",
            password:"111",
            online:false
        }
    ],
}

export const initialStateChat={
    chatWork:[
        {userId:0,messageId:0,message:"Запускаю",img:"",data:"11:00 20.03.21"},
        {userId:1,messageId:1,message:"Всем привет это наш рабочий чат! прошу без мата и оффтопа",img:"",data:"11:04 20.03.21"},
        {userId:2,messageId:2,message:"Хэлоу все отписались, что зашли!",img:"",data:"11:20 20.03.21"},
        {userId:3,messageId:3,message:"Я тут",img:"",data:"11:25 20.03.21"},
        {userId:4,messageId:4,message:"И я тут",img:"",data:"11:36 20.03.21"},
        {userId:5,messageId:5,message:"На месте",img:"",data:"11:55 20.03.21"},
        {userId:6, messageId: 6,message: "Тут", img:"",data:"12:04 20.03.21"}
    ],
    chatFlood:[
        {userId:0,messageId:0,message:"Запускаю",img:"",data:"11:00 20.03.21"},
        {userId:1,messageId:1,message:"Всем привет это наша флудилка! прошу меньше мата!",img:"",data:"11:04 20.03.21"},
        {userId:2,messageId:2,message:"Хэлоу, По пивку?",img:"",data:"11:14 20.03.21"},
        {userId:3,messageId:3,message:"Я тут",img:"",data:"11:44 20.03.21"},
        {userId:4,messageId:4,message:"И я тут",img:"",data:"12:04 20.03.21"},
        {userId:5,messageId:5,message:"На месте",img:"",data:"13:54 20.03.21"},
        {userId:6, messageId: 6,message: "Тут", img:"",data:"14:54 20.03.21"}
    ]
}
