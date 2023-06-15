import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CardContent, Dialog, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export enum ModeType {
    Create = 'create',
    Edit = 'edit',
}

interface OptionsProps {
    handleClose: ()=>void;
    open: boolean;
}

const Options = ({handleClose, open}: OptionsProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, SetShowRepeatPassword] = useState(false)

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">Change master password</DialogTitle>
      <CardContent>
        <form className="login-form">
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
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Repeat password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showRepeatPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => SetShowRepeatPassword(!showRepeatPassword)}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button sx={{width: 300, height: 56, marginTop: 1}} variant="contained" type="submit">
              save
          </Button>
        </form>
      </CardContent>
    </Dialog>
  );
};

export default Options;
