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
} from "@mui/material";
import "../style.scss";
import Password from "./Password";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import { useState } from "react";
import PasswordDialog, { ModeType } from "./PasswordDialog";
import Options from "./Options";

const Save = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [mode, setMode] = useState<ModeType>();
  const [formData, setFormData] = useState({});

  const handleCreateOpen = () => {
    setOpenDialog(true);
    setMode(ModeType.Create);
  };

  const handleEditOpen = (formData: any) => {
    setOpenDialog(true);
    setMode(ModeType.Edit);
    setFormData(formData);
  };

  const handleCloseDialog = (value: string) => {
    setOpenDialog(false);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const navigate = useNavigate();

  const data = {
    username: "Silvan Dubach",
    email: "silvan.dubach@gmail.com",
    password: "nasdiji22e!",
    note: "Test Notiz",
  };

  const actions = [
    { icon: <AddIcon onClick={handleCreateOpen} />, name: "Add" },
    { icon: <SettingsIcon onClick={() => setOpenOptions(true)} />, name: "Options" },
  ];

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Save</h1>
      <IconButton
        className="logout-button"
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={logout}
      >
        <LogoutIcon sx={{ fontSize: 40, fontWeight: "large" }} />
      </IconButton>

      <Table sx={{ minWidth: 500, paddingRight: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Password</TableCell>
            <TableCell align="left">Note</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <Password data={data} handleEditOpen={handleEditOpen} />
        <Password data={data} handleEditOpen={handleEditOpen} />
      </Table>

      <Box className="speed-dial" sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
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

      <PasswordDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        mode={mode}
        formData={formData}
      />

      <Options 
      open={openOptions}
      handleClose={handleCloseOptions}
      ></Options>
    </div>
  );
};

export default Save;
