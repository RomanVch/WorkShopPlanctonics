import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";
import MoodIcon from '@material-ui/icons/Mood';
import {NavLink} from "react-router-dom";
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    button: {
        margin: theme.spacing(1),
    },
    textLinks:{
        color:"black",
        fontWeight:700
    }
}));

type Anchor = "bottom";

export const Navigation = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        bottom: false
    });


    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };
    const getNavLink = (text: string | undefined) => {
        if (text === "Работа") {
            return "/work"
        } else if (text === "Флудилка") {
            return "/flood"
        } else {
            return "/"
        }
    }
    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "bottom"
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {["Работа", "Флудилка"].map((text, index) => (
                    <NavLink key={index} to={getNavLink(text)}>
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <MailIcon/> : <MoodIcon/>}
                            </ListItemIcon>
                            <span className={classes.textLinks}>{text}</span>
                            {/*<ListItemText className={classes.textLink} primary={text} />*/}
                        </ListItem>
                    </NavLink>
                ))}
            </List>
            <Divider/>
        </div>
    );

    return (
        <div>
            {(["bottom"] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<MailOutlineIcon/>}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        чаты
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
