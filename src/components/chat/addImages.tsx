import React from "react";
import Resizer from 'react-image-file-resizer';
import {makeStyles} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import GetAppIcon from '@material-ui/icons/GetApp';


const sendBlock__button = {
    height: 47,
    width: 47,
    marginTop: 10,
    marginLeft: 20
}
type propsType = {
    setImg: (img: any) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",

    },
    input: {
        display: "none",

    },
}));

export const UploadImg = (props: propsType) => {
    const classes = useStyles();
    const resizeFile = (file: any) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 200, 200, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });
    const onChange = async (event: any) => {
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
            props.setImg(image);
        } catch (err) {
            props.setImg("");
        }

    }

    return (
        <div className={"upload__block"}>
            <input
                accept="image/png, image/jpeg"
                className={classes.input}

                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => onChange(e)}
            />
            <label htmlFor="contained-button-file">
                <Fab  style={sendBlock__button} component="span"  color="primary" aria-label="add"><GetAppIcon/></Fab>
            </label>
        </div>
    )

}