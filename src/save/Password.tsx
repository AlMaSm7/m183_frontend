import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import "../style.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Password = ({ data, handleEditOpen }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {

  }

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {data.username}
      </TableCell>
      <TableCell align="left">{data.email}</TableCell>
      <TableCell align="left">
        {showPassword ? data.password : "**********"}
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ mr: 1 }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
        <Tooltip title="Coppy">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(data.password);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="left">{data.note}</TableCell>
      <TableCell align="left">
        <div>
          <Tooltip title="Edit">
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{ mr: 1 }}
              onClick={() => handleEditOpen(data)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Password;
