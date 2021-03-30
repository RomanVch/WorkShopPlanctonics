import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import * as yup from "yup";
import {useFormik} from "formik";
import Picker, {IEmojiData, SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';
import {useDispatch, useSelector} from "react-redux";
import {addMessageAC} from "../../redux/chat-reducer";
import {UserType} from "../../redux/user-reducer";
import {AppStateType} from "../../redux/store";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Draggable from "react-draggable";
import {UploadImg} from "./addImages";
import {chat} from "../../utils/ENUM";
import {IconButton} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';


const sendBlock__button = {
    height: 47,
    width: 60,
    marginTop: 10,
    marginLeft: 20
}

type ChatPropsType = {
    typeChat: chat.Work | chat.Flood
}

export const SendMessageBlocks = (props: ChatPropsType) => {
    const dispatch = useDispatch()
    const authUser = useSelector<AppStateType, UserType>(state => state.user.users.filter((u) => u.auth)[0])
    const [img, setImg] = useState<string>("")
    const validationSchema = yup.object({
        message: yup
            .string()
            .min(1, 'Минимальная длинна 1 символ')
            .required('Обязательное поле'),

    });

    const formik = useFormik({
        initialValues: {
            message: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {

            dispatch(addMessageAC(props.typeChat, authUser.id, values.message, img))
            values.message = ""
            resetForm()
        },
    });
    const [addEmoji, setAddEmoji] = useState<boolean>(false);

    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        formik.setFormikState(state => ({
            ...state,
            values: {...state.values, message: state.values.message + emojiObject.emoji}
        }))
    };
    const openEmoji = () => {
        setAddEmoji(!addEmoji)
    }
    const closeEmoji = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.key === "Escape") {
            setAddEmoji(false)
        }

    }
    const onCloseButton = () => {
        setAddEmoji(false)
    }
    return (<form onSubmit={formik.handleSubmit}>
        <Grid container style={{padding: '20px', position: "relative"}}>
            {addEmoji ? <Draggable>
                <div className={"emojiBlock"} onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    closeEmoji(e)
                }}><IconButton onClick={onCloseButton} aria-label="delete">
                    <CancelIcon/>
                </IconButton>
                    <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
                </div>
            </Draggable> : ""}
            <div className={"sendBlock__Message"}>

                <TextField id="message"
                           label="Сообщение"
                           {...formik.getFieldProps("message")}
                           error={formik.touched.message && Boolean(formik.errors.message)}
                           helperText={formik.touched.message && formik.errors.message}
                           fullWidth/>

                <UploadImg setImg={setImg}/>
                <Fab style={sendBlock__button} type={"button"} onClick={openEmoji} color="primary"
                     aria-label="add"><SentimentVerySatisfiedIcon/></Fab>
                <Fab style={sendBlock__button} type={"submit"} color="primary" aria-label="add"><SendIcon/></Fab>

            </div>
        </Grid></form>)
}



