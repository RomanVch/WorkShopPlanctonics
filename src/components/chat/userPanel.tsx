import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../redux/user-reducer";

const useStyles = makeStyles({
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    borderBottom500:{
        borderBottom:'1px solid #e0e0e0'
    },
    onlineBorder:{
        border:'2px solid green'
    },
    offlineBorder:{
        border:'2px solid grey'
    },
    position:{
        fontSize:'10px'
    }
});

export const UserPanel = () => {

    const classes = useStyles();
    const users = useSelector<AppStateType, Array<UserType>>(state => state.user.users)
    const authUser: UserType | any = users.find(u => u.auth)
    const otherUsers = users.filter(u => !u.auth)
    return (
        <Grid item xs={3} className={classes.borderRight500}>
            <div className={classes.borderBottom500}>
                {authUser
                    ? <ListItem button key={authUser.id} >
                    <ListItemIcon >
                        <Avatar alt={authUser.name} src={authUser.avatar} className={authUser.online?classes.onlineBorder:classes.offlineBorder} />
                    </ListItemIcon>
                        <div >
                    <ListItemText primary={authUser.name}>{authUser.name}</ListItemText>
                        <p className={classes.position}>{authUser.position}</p>
                        </div>
                        </ListItem>
                    : ""
                }

            </div>
            <List>
                {otherUsers.map((u) => {
                    return <ListItem button key={u.id}>
                        <ListItemIcon>
                            <Avatar alt={u.name} src={u.avatar}  className={u.online?classes.onlineBorder:classes.offlineBorder}/>
                        </ListItemIcon>
                        <div>
                        <ListItemText primary={u.name}>{u.name}</ListItemText>
                        <p className={classes.position}>{u.position}</p>
                        </div>
                    </ListItem>
                })}
            </List>
        </Grid>)
}
