import {IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import "../style.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import {useNavigate} from "react-router";
import {useGetJWT} from "../useGetJWT";
import {setCookieToNull} from "../helpers/setCookieToNull";

const Password = ({data, handleEditOpen}: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const jwtToken = useGetJWT();


    const handleDelete = () => {
            axios.delete(`http://localhost:8000/api/records/${data.recordId}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                    console.log(response);
                    window.location.reload();
                }
            ).catch((err) => {
                if (err.response.status == 403) {
                    console.log("JWT invalid!!!");
                    setCookieToNull();
                    navigate("/login");
                } else {
                    console.log(err);
                }
            });
        }
    ;

    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {border: 0},
            }}
        >
            <TableCell component="th" scope="row">
                {data.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {data.username}
            </TableCell>
            <TableCell align="left">{data.email}</TableCell>
            <TableCell align="left">
                {showPassword ? data.password : "**********"}
                <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{mr: 1}}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </IconButton>
                <Tooltip title="Copy">
                    <IconButton
                        onClick={() => {
                            navigator.clipboard.writeText(data.password);
                        }}
                    >
                        <ContentCopyIcon/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell component="th" scope="row">
                {data.url}
            </TableCell>
            <TableCell align="left">{data.note}</TableCell>
            <TableCell align="left">
                <div>
                    <Tooltip title="Edit">
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            sx={{mr: 1}}
                            onClick={() => {

                                handleEditOpen(data)
                                console.log("handle open", data);
                            }}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon sx={{
                                ':hover': {
                                    'color': 'red'
                                }
                            }}/>
                        </IconButton>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default Password;
