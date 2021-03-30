import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

type propsType = {
    openAlert: boolean,
    setOpenAlert: (openAlert: boolean) => void
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export function MessageGood(props: propsType) {
    const classes = useStyles();


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenAlert(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={props.openAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Молодец! Ты авторизовался!
                </Alert>
            </Snackbar>
        </div>
    );
}