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
} from "@mui/material";
import "../style.scss";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {isPasswordComplex} from "../helpers/checkPasswordComplexity";
import {useGetJWT} from "../useGetJWT";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, SetShowRepeatPassword] = useState(false);

    const [isSnackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState("")

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigate = useNavigate();
    const jwtToken = useGetJWT();

    const headers = {
        "Authorization": `Bearer ${jwtToken}`
    };

    useEffect(() => {
        if (jwtToken !== null) {
            axios.get('http://localhost:8000/api/records', {
                headers
            }).then(function (response) {
                navigate("/save");
            }).catch(function (error) {
                if (error.code !== 403) {
                    console.log(error)
                }
            });
        }
    })

    const submitForm = (e: any) => {
        e.preventDefault(); // Prevent page refresh
        if (repeatPassword === password) {
            if (isPasswordComplex(password)) {
                axios
                    .post(
                        "http://localhost:8000/api/auth/register",
                        {
                            username: username,
                            email: email,
                            password: password,
                        },
                        {
                            headers: {"Content-Type": "application/json"}
                        }
                    )
                    .then(function (response) {
                        console.log("=>", response.data);
                        document.cookie = "jwt=" + response.data?.auth_token + "; path=/;";
                        navigate("/save");
                    })
                    .catch(function (error) {
                        console.log(error)
                        setSnackbarVisible(true);
                        setSnackbarText(error.response.data);
                    });
            } else {
                setSnackbarText("Password must be 8 letters, include special characters and have at least one digit")
                setSnackbarVisible(true);
            }
        } else {
            console.log("here")
            setSnackbarText("Passwords do not match")
            setSnackbarVisible(true)
        }
    }

    const handleClose = () => {
        setSnackbarVisible(false);
    }

    return (
        <>
            <div className="container">
                <h1>Register</h1>
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
                                    label="Email or Username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type="text"
                                    label="Email or Username"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
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
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Repeat password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showRepeatPassword ? "text" : "password"}
                                    onChange={(e) => {
                                        setRepeatPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => SetShowRepeatPassword(!showRepeatPassword)}
                                                edge="end"
                                            >
                                                {showRepeatPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    required
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
                            <Link className="link" href="/login">
                                login
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

export default Register;
