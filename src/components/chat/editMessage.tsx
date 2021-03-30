import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {TextField} from "@material-ui/core";
import './../../App.css';
import ListItemText from "@material-ui/core/ListItemText";
import {editMessageAC} from "../../redux/chat-reducer";
import {chat} from "../../utils/ENUM";


type PropsType = {
    message: string
    messageId:number
    typeChat:chat.Work|chat.Flood
}

const styleTextField = {
    marginBottom: 8,
    marginRight:30,
    maxWidth:200
}



export const EditMessage = (props: PropsType) => {
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.message);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const activateViewMode = () => {
        dispatch(editMessageAC(props.typeChat,props.messageId, title))
        setEditMode(false);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (<>{!editMode

            ?<ListItemText   key={props.messageId} primary={props.message} onDoubleClick={activateEditMode}></ListItemText>
            : <TextField
                fullWidth
                style={styleTextField}
                autoFocus={true}
                label="Измените сообщение"
                onChange={changeTitle}
                onBlur={activateViewMode}
                value={title}
            />}
        </>
    );
}