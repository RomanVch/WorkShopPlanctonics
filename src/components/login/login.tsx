import {Button, Dialog, Paper, TextField} from "@material-ui/core";

import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as yup from 'yup';
import {authAC} from "../../redux/user-reducer";


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    setOpenAlert: (openAlert: boolean) => void
}
const styleFormInput = {
    marginBottom: 20,
    marginLeft: "5%",
    marginRight: "5%",
    width: "90%"
}

const styleFormButton = {
    width: 237.5,
    margin: "auto",
    marginTop: 10
}

const styleFormBlock = {margin: "auto", width: 300, minHeight: 310}

export function Login(props: SimpleDialogProps) {

    const { onClose, selectedValue, open } = props;
const dispatch=useDispatch()
    const handleClose = () => {
        onClose(selectedValue);
    };


    const validationSchema = yup.object({
        login: yup
            .string()
            .min(2,'Минимальная длинна логина 2 символа')
            .required('Обязательное поле'),
        password: yup
            .string()
            .min(3,'Минимальная длинна пароля 3 символа')
            .required('Обязательное поле'),

    });

    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            dispatch(authAC(values.login,values.password))
            props.setOpenAlert(true)
            onClose(selectedValue)
            resetForm()
        },
    });
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Paper style={styleFormBlock} elevation={5}>
                <form className={"form"} onSubmit={formik.handleSubmit}>
                    <h2 className={"form__header"}>Авторизуйся!</h2>
                    <TextField
                        fullWidth
                        id="login"
                        label="Логин"
                        {...formik.getFieldProps("login")}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}
                        style={styleFormInput}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        label="Пароль"
                        {...formik.getFieldProps("password")}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        style={styleFormInput}
                        type={"password"}
                    />
                    <Button style={styleFormButton} color="primary" variant="contained" fullWidth type="submit">
                        Войти
                    </Button>
                </form>
            </Paper>
        </Dialog>
    );
}
