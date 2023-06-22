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
  TextField,
} from "@mui/material";
import "../style.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const submitForm = () => {
    console.log({
      user,
      password
    });
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <Card variant="outlined" sx={{ minWidth: 350, minHeight: 350 }}>
        <CardContent>
          <form className="login-form">
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email or Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                required
                label="Email or Username"
                onChange={(e) => {setUser(e.target.value)}}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {setPassword(e.target.value)}}
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
            <Button sx={{width: 300, height: 56, marginTop: 1}} variant="contained" type="submit" onClick={submitForm}>
              submit
            </Button>
            <Link className="link" href="/">register</Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
