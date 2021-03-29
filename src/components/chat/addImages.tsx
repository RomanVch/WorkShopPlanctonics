import React from "react";
import Resizer from 'react-image-file-resizer';
import {Button, makeStyles} from "@material-ui/core";

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
const uploadButtonStyle = {
    margin: "auto"
}
export const UploadImg = (props: propsType) => {
    const classes = useStyles();
    const resizeFile = (file: any) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 145, 205, 'JPEG', 100, 0,
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
    <Button style={uploadButtonStyle} variant="contained" color="secondary" component="span">
        Добавить обложку книги
    </Button>
    </label>
    </div>
)

}