import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
} from "@mui/material";
import "../style.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, SetShowRepeatPassword] = useState(false);

  return (
    <div className="container">
      <h1>Register</h1>
      <Card variant="outlined" sx={{ minWidth: 350, minHeight: 350 }}>
        <CardContent>
          <form className="login-form">
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                required
                label="Email or Username"
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
            <Button
              sx={{ width: 300, height: 56, marginTop: 1 }}
              variant="contained"
              type="submit"
            >
              submit
            </Button>
            <Link className="link" href="/login">login</Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
