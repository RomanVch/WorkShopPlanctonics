import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../redux/user-reducer";
import {ChatType, deleteMessageAC} from "../../redux/chat-reducer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import {EditMessage} from "./editMessage";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {chat} from "../../utils/ENUM";

const useStyles = makeStyles({
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    onlineBorder: {
        border: '2px solid green'
    },
    offlineBorder: {
        border: '2px solid grey'
    },
    messageBlock: {
        display: "flex",
        marginTop: 15,
        marginLeft: 20
    },
    authUser: {
        display: "flex",
        marginTop: 15,
        marginLeft: 15,
        marginRight: 28,

    },
    dataAuthUser: {
        marginLeft: 10,
        marginRight: 10
    },
    dataUser: {
        marginLeft: 10
    },
    deleteMessage: {
        marginTop: -12
    },
    imgMessage: {
        marginLeft: 20,
        marginTop: 15,
        marginRight: 40
    },
    wrapperAuthImg: {
        display: "flex",
        justifyContent: 'flex-end'
    },
    wrapperAvatar: {
        alignContent: "end",
        marginLeft: "auto"
    }

});
type ChatPropsType = {
    typeChat: chat.Work | chat.Flood
}
export const MessageArea = (props: ChatPropsType) => {
    const classes = useStyles();
    const users = useSelector<AppStateType, Array<UserType>>(state => state.user.users)
    const chatWork = useSelector<AppStateType, Array<ChatType>>(state => state.chat.chatWork)
    const floodChat = useSelector<AppStateType, Array<ChatType>>(state => state.chat.chatFlood)
    const chats = props.typeChat === chat.Work ? chatWork : floodChat
    const dispatch = useDispatch()

    const onClickDelete = (messageId: number) => {
        dispatch(deleteMessageAC(props.typeChat, messageId))
    }

    return (
        <div style={{maxWidth: 800}}>
            <List>
                {chats.map((m: ChatType) => {
                    if (users[m.userId].auth) {
                        return <div key={m.messageId}>
                            <div className={classes.authUser}>
                                <IconButton className={classes.deleteMessage} onClick={() => onClickDelete(m.messageId)}
                                            aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                                <div>
                                    <ListItemText className={classes.dataAuthUser} secondary={m.data}></ListItemText>

                                </div>
                                <div>

                                    <EditMessage typeChat={props.typeChat} messageId={m.messageId} message={m.message}/>
                                </div>
                                <ListItemIcon className={classes.wrapperAvatar}>
                                    <Avatar alt={users[m.userId].name} src={users[m.userId].avatar}
                                            className={users[m.userId].online
                                                ? classes.onlineBorder
                                                : classes.offlineBorder}/>
                                </ListItemIcon>

                            </div>

                            <div className={classes.wrapperAuthImg}>
                                {m.img ?
                                    <img alt={"изображение отправленное пользователем"}
                                         className={classes.imgMessage}
                                         src={m.img}/> : ""}
                            </div>
                        </div>
                    } else {
                        return <div key={m.messageId}>
                            <div className={classes.messageBlock}>
                                <ListItemIcon>
                                    <Avatar alt={users[m.userId].name} src={users[m.userId].avatar}
                                            className={users[m.userId].online ? classes.onlineBorder : classes.offlineBorder}/>
                                </ListItemIcon>
                                <Grid item xs={12}>
                                    <ListItemText key={m.messageId} primary={m.message}></ListItemText>
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText secondary={m.data} className={classes.dataUser}></ListItemText>
                                </Grid>
                            </div>
                            {m.img ?
                                <img alt={"изображение отправленное пользователями"} className={classes.imgMessage}
                                     src={m.img}/> : ""
                            }
                        </div>
                    }
                })}
            </List>
        </div>
    )
}
