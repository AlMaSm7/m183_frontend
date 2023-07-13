import {
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput, Snackbar,
    TextField,
} from "@mui/material";
import "../style.scss";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const [isSnackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState("")

    const [userNameInvalid, setUserNameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    let usernameEmpty = false;
    let passwordEmpty = false;

    const handleClose = () => {
        setSnackbarVisible(false);
    }

    const submitForm = async (e: any) => {
        e.preventDefault();

        usernameEmpty = username === null || username === "";
        passwordEmpty = password === null || password === "";
        setUserNameInvalid(usernameEmpty);
        setPasswordInvalid(passwordEmpty);
        if (usernameEmpty) {
            setSnackbarText("Please provide a username");
            setSnackbarVisible(true);
        }
        if (passwordEmpty) {
            setSnackbarText("Please provide a password");
            setSnackbarVisible(true);
        }

        if (! usernameEmpty && !passwordEmpty) {
            axios
                .post(
                    "http://localhost:8000/api/auth/login",
                    {
                        username: username,
                        password: password,
                    },
                    {
                        headers: {"Content-Type": "application/json"},
                    }
                )
                .then(function (response) {
                    console.log("=>", response.data);
                    document.cookie = "jwt=" + response.data?.auth_token + "; path=/;";
                    navigate("/save");
                })
                .catch(function (error) {
                    console.log(error);
                    setSnackbarVisible(true);
                    setSnackbarText(error.response.data);
                });
        }
    };

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <Card variant="outlined" sx={{minWidth: 350, minHeight: 350}}>
                    <CardContent>
                        <form className="login-form">
                            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Username
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type="text"
                                    required={true}
                                    label="Username"
                                    error={userNameInvalid}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" required={true}>
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required={true}
                                    error={passwordInvalid}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button
                                sx={{width: 300, height: 56, marginTop: 1}}
                                variant="contained"
                                type="submit"
                                onClick={submitForm}
                            >
                                submit
                            </Button>
                            <Link className="link" href="/">
                                register
                            </Link>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Snackbar
                open={isSnackbarVisible}
                autoHideDuration={10000}
                onClose={handleClose}
                message={snackbarText}
                sx={{"backgroundColor": "FF4040"}}
            />
        </>
    );
}

export default Login;
