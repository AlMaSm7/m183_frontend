import {Visibility, VisibilityOff, ErrorRounded} from "@mui/icons-material";
import {
    Button,
    CardContent,
    Dialog,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useGetJWT} from "../useGetJWT";
import {isPasswordComplex} from "../helpers/checkPasswordComplexity";
import {setCookieToNull} from "../helpers/setCookieToNull";

export enum ModeType {
    Create = "create",
    Edit = "edit"
}

interface PasswordDialogProp {
    handleClose: (value: string) => void;
    open: boolean;
    mode: ModeType | undefined;
    formData: any;
    setFormData: any;
}

const PasswordDialog = ({
                            handleClose,
                            open,
                            mode,
                            formData,
                            setFormData
                        }: PasswordDialogProp) => {
    const modeIsCreate = mode === ModeType.Create;
    const [isSnackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const jwtToken = useGetJWT();

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log(formData);
        if(isPasswordComplex(formData.password)){
            if (modeIsCreate) {
                axios.post('http://localhost:8000/api/records', {
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    url: formData.url,
                    note: formData.note
                }, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    console.log(response);
                    window.location.reload();
                })
                    .catch(function (error) {
                        if (error.response.status === 403) {
                            console.log("JWT invalid!!!");
                            navigate("/login");
                        } else {
                            setCookieToNull();
                            console.log(error);
                        }
                    });
            } else {
                axios.put('http://localhost:8000/api/records', {
                    recordId: formData.recordId,
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    note: formData.note,
                    url: formData.url
                }, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                   console.log(response.data);
                   window.location.reload()
                })
                    .catch(function (error) {
                        if (error.response.status === 403) {
                            console.log("JWT invalid!!!");
                            navigate("/login");
                        } else {
                            console.log(error);
                        }
                    });
            }
        } else {
            setSnackbarVisible(true);
            setSnackbarText("Password must be 8 letters, include special characters and have at least one digit");
        }
    }

    const handleCloseSnackBar = () => {
        setSnackbarVisible(false);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle textAlign="center">
                    {modeIsCreate ? "Add new password" : "Edit password"}
                </DialogTitle>
                <CardContent>
                    <form className="login-form">
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Name
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                label="Name"
                                value={formData.name}
                                required={true}
                                onChange={(e) => setFormData({...formData, name: (e.target.value)})}
                                endAdornment={<ErrorRounded sx={{color: 'grey'}}/>}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Username
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                label="Username"
                                value={formData.username}
                                required={true}
                                onChange={(e) => setFormData({...formData, username: (e.target.value)})}
                                endAdornment={<ErrorRounded sx={{color: 'grey'}}/>}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                label="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: (e.target.value)})}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                required={true}
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
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: (e.target.value)})}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Url
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                label="Url"
                                value={formData.url}
                                onChange={(e) => setFormData({...formData, url: (e.target.value)})}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Note</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                label="Note"
                                multiline
                                rows={4}
                                value={formData.note}
                                onChange={(e) => setFormData({...formData, note: (e.target.value)})}
                            />
                        </FormControl>
                        <Button
                            sx={{width: 300, height: 56, marginTop: 1}}
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {modeIsCreate ? "add" : "edit"}
                        </Button>
                    </form>
                </CardContent>
            </Dialog>
            <Snackbar
                open={isSnackbarVisible}
                autoHideDuration={10000}
                onClose={handleCloseSnackBar}
                message={snackbarText}
                sx={{"backgroundColor": "FF4040"}}
            />
        </>
    );
};

export default PasswordDialog;
