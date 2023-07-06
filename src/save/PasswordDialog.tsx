import { Visibility, VisibilityOff } from "@mui/icons-material";
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
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetJWT } from "../useGetJWT";

export enum ModeType {
  Create = "create",
  Edit = "edit",
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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const jwtToken = useGetJWT();

  const handleSubmit = () => {
    console.log(formData);

    if(modeIsCreate) {
      axios.post('http://localhost:8000/api/records',{
        username: formData.username,
        email: formData.email,
        password: formData.password,
        note: formData.note,
      }, { headers: {"Authorization" : `Bearer ${jwtToken}`, "Content-Type": "application/json"}}).then(function (response) {
        navigate("/save");
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      axios.put('http://localhost:8000/api/records', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        note: formData.note,
      }, { headers: {"Authorization" : `Bearer ${jwtToken}`, "Content-Type": "application/json"}}).then(function (response) {
        navigate("/save");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">
        {modeIsCreate ? "Add new password" : "Edit password"}
      </DialogTitle>
      <CardContent>
        <form className="login-form">
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Username"
              value={formData.username}
              required
              onChange={(e) => setFormData({...formData, username: (e.target.value)})}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              required
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: (e.target.value)})}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: (e.target.value)})}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
            sx={{ width: 300, height: 56, marginTop: 1 }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            {modeIsCreate ? "add" : "edit"}
          </Button>
        </form>
      </CardContent>
    </Dialog>
  );
};

export default PasswordDialog;
