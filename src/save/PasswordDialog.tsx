import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CardContent, Dialog, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export enum ModeType {
    Create = 'create',
    Edit = 'edit',
}

interface PasswordDialogProp {
    handleClose: (value: string)=>void;
    open: boolean;
    mode: ModeType | undefined;
    formData: any;
}

const PasswordDialog = ({handleClose, open, mode, formData}: PasswordDialogProp) => {
    const [showPassword, setShowPassword] = useState(false)
    const modeIsCreate = mode === ModeType.Create;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">{modeIsCreate ? "Add new password" : "Edit password"}</DialogTitle>
      <CardContent>
        <form className="login-form">
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Password"
              value={formData?.username}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                required
                label="Email or Username"
                value={formData?.email}
              />
            </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
              value={formData?.password}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Note
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                required
                label="Email or Username"
                multiline
                rows={4}
                value={formData?.note}
              />
            </FormControl>
          <Button sx={{width: 300, height: 56, marginTop: 1}} variant="contained" type="submit">
              {modeIsCreate ? "add" : "edit"}
          </Button>
        </form>
      </CardContent>
    </Dialog>
  );
};

export default PasswordDialog;
