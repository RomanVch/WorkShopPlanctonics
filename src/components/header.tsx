import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from "../img/logo-small.png"
import {Login} from "./login/login";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {exitAC} from "../redux/user-reducer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            alignItems: "flex-start"
        },
    }),
);

type PropsType = {
    setOpenAlert: (openAlert: boolean) => void
}

export default function Header(props: PropsType) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const auth = useSelector<AppStateType, boolean>(state => state.user.auth)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onClickExit = () => {
        dispatch(exitAC())
    }

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img alt="Логотип" src={logo}/>
                    <Typography variant="h6" className={classes.title}>
                        Planktonics
                    </Typography>
                    {!auth ?
                        <Button color="inherit" onClick={handleClickOpen}>Авторизуйся!</Button> :
                        <Button color="inherit" onClick={onClickExit}>Выйти</Button>
                    }
                    <Login setOpenAlert={props.setOpenAlert} selectedValue={selectedValue} open={open}
                           onClose={handleClose}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
