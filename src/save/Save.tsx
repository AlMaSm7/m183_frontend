import {
    Box,
    IconButton,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import "../style.scss";
import Password from "./Password";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import PasswordDialog, {ModeType} from "./PasswordDialog";
import Options from "./Options";
import axios from "axios";
import {useGetJWT} from "../useGetJWT";
import {setCookieToNull} from "../helpers/setCookieToNull";

interface dataProp {
    recordId: number,
    name: string,
    username: string,
    email: string,
    password: string,
    url: string,
    note: string,
}

const Save = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [mode, setMode] = useState<ModeType>();
    const [formData, setFormData] = useState(null);
    const [data, setData] = useState<dataProp[]>();
    const jwtToken = useGetJWT();
    const headers = {
        "Authorization": `Bearer ${jwtToken}`
    };

    useEffect(() => {
        setOpenDialog(false);
        getRecords();
    }, []);

    useEffect(() => {
        if (formData) {
            console.log(formData);

            setOpenDialog(true);
        }
    }, [formData]);

    const handleCreateOpen = () => {
        setOpenDialog(true);
        setMode(ModeType.Create);
        setFormData({} as any)
    };

    const getRecords = () => {
        axios.get('http://localhost:8000/api/records', {
            headers
        }).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            if (error.response.status == 403) {
                console.log("JWT invalid!!!");
                setCookieToNull();
                navigate("/login");
            } else {
                console.log(error);
            }
        });
    }

    const handleEditOpen = (data: any) => {
        setMode(ModeType.Edit);
        setFormData(data);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCloseOptions = () => {
        setOpenOptions(false);
    };

    const navigate = useNavigate();

    const actions = [
        {icon: <AddIcon onClick={handleCreateOpen}/>, name: "Add password"},
        {
            icon: <SettingsIcon onClick={() => setOpenOptions(true)}/>,
            name: "Change Password",
        },
    ];

    const logout = () => {
        setCookieToNull();
        navigate("/login");
    };

    return (
        <div className="container">
            <h1>Save</h1>
            <Tooltip title="Logout">
                <IconButton
                    className="logout-button"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={logout}
                >
                    <LogoutIcon sx={{fontSize: 40, fontWeight: "large"}}/>
                </IconButton>
            </Tooltip>

            <Table sx={{minWidth: 500, paddingRight: 20}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Password</TableCell>
                        <TableCell align="left">Url</TableCell>
                        <TableCell align="left">Note</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                {data?.map((data, index) => (
                    <Password key={index} data={data} handleEditOpen={handleEditOpen}/>
                ))}
            </Table>

            <Box
                className="speed-dial"
                sx={{height: 320, transform: "translateZ(0px)", flexGrow: 1}}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{position: "absolute", bottom: 16, right: 16}}
                    icon={<SpeedDialIcon/>}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>

            {formData && <PasswordDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                mode={mode}
                formData={formData}
                setFormData={setFormData}
            />
            }
            <Options open={openOptions} handleClose={handleCloseOptions}></Options>
        </div>
    );
};

export default Save;
