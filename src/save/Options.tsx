import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Button,
    CardContent,
    Dialog,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {isPasswordComplex} from "../helpers/checkPasswordComplexity";
import {useGetJWT} from "../useGetJWT";
import {useNavigate} from "react-router";
import {setCookieToNull} from "../helpers/setCookieToNull";

export enum ModeType {
    Create = "create",
    Edit = "edit",
}

interface OptionsProps {
    handleClose: () => void;
    open: boolean;
}

const Options = ({handleClose, open}: OptionsProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [snackBarOpen, setSnackbarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");
    const jwtToken = useGetJWT();
    const navigate = useNavigate();

    const handleCloseSnackBar = () => {
        setSnackbarOpen(false);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (password === repeatPassword) {
            if (isPasswordComplex(password)) {
                axios
                    .put("http://localhost:8000/api/auth", {
                        passwordToUpdate: password,
                    }, {
                        headers: {
                            "Authorization": `Bearer ${jwtToken}`,
                            "Content-Type": "application/json"
                        }
                    }).then((response) => {
                    console.log(response)
                    window.location.reload();
                    handleCloseSnackBar();
                })
                    .catch(function (error) {
                        if (error.response.status == 403) {
                            console.log("JWT invalid!!!");
                            setCookieToNull();
                            navigate("/login");
                        } else {
                            console.log(error);
                        }
                    });
            } else {
                setSnackbarOpen(true);
                setSnackBarText("Password must be 8 letters, include special characters and have at least one digit")
            }
        } else {
            setSnackbarOpen(true);
            setSnackBarText("Password must match");
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign="center">Change master password</DialogTitle>
            <CardContent>
                <form className="login-form">
                    <FormControl fullWidth sx={{m: 1}} variant="outlined">
                        <Snackbar
                            open={snackBarOpen}
                            autoHideDuration={10000}
                            onClose={handleCloseSnackBar}
                            message={snackBarText}
                        />
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <FormControl fullWidth sx={{m: 1}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Repeat password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            type={showRepeatPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                        edge="end"
                                    >
                                        {showRepeatPassword ? <VisibilityOff/> : <Visibility/>}
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
                        onClick={handleSubmit}
                    >
                        save
                    </Button>
                </form>
            </CardContent>
        </Dialog>
    );
};

export default Options;
