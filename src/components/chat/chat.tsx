import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {UserPanel} from "./userPanel";
import {MessageArea} from "./messageArea";
import {useMediaQuery} from "@material-ui/core";
import {SendMessageBlocks} from "./sendMessageBlock";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {NavLink, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {chat} from "../../utils/ENUM";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    chatHeader: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: 700,
        marginTop: 15,
        marginBottom: 25
    },
    arrowButton:{
        marginTop:10,
        marginLeft:10,
        border:"2px solid blue",
        width:25,
        height:25,
        borderRadius:15

    }

});
type ChatPropsType = {
    typeChat: chat.Work | chat.Flood
}

export const Chats = (props: ChatPropsType) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:700px)');
    const auth = useSelector<AppStateType, boolean>(state => state.user.auth)
    if (!auth) {
        return <Redirect to={"/"}/>
    }
    return (
        <div><div className={classes.arrowButton}>
            <NavLink  to={"/"}>
                <ArrowBackIcon/>
            </NavLink>
        </div>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.chatHeader}>
                    {props.typeChat === chat.Work ? "Рабочий чат" : "Флудилка"}
                </Typography>
            </Grid>

            <Grid container className={classes.chatSection}>
                {matches ? <UserPanel/> : ""}
                <Grid item xs={matches ? 9 : 12}>
                    <MessageArea typeChat={props.typeChat}/>
                    <Divider/>
                    <SendMessageBlocks typeChat={props.typeChat}/>
                </Grid>
            </Grid>
        </div>
    );
}

