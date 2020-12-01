import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { useRouter } from "next/router";
import {
  Box,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  makeStyles,
} from "@material-ui/core";
import {
  AccountBox,
  Lock,
  Visibility,
  VisibilityOff,
  Close,
} from "@material-ui/icons";
import schema from "../utils/schema";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  barContent: {
    background: "#f44336",
  },
});

export default function SignInForm() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "admin",
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const styles = useStyles();

  const handleClickShowPassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const signIn = () => {
    // setLoading(true);

    // const userFetched = await fetch("/api/users/sign-in", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // }).then((res) => res.json()).catch(() => { setOpen(true); setLoading(false) });

    // setUser({ ...user });
    router.replace("/");
    // setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box pb="1rem">
        <FormControl fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            fullWidth
            disabled={isLoading}
            startAdornment={(
              <InputAdornment position="start">
                <AccountBox />
              </InputAdornment>
            )}
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box pb="1rem">
        <FormControl fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            disabled={isLoading}
            startAdornment={(
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleClickShowPassword}
                >
                  {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
            value={user.password}
            type={isPasswordVisible ? "text" : "password"}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </FormControl>
      </Box>
      <div className={styles.wrapper}>
        <Mutation
          mutation={schema.mutation.signIn}
          onCompleted={signIn}
          variables={{ input: { ...user } }}
        >
          {(mutation) => (
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disabled={isLoading}
              onClick={() => {
                setLoading(true);
                return mutation();
              }}
            >
              Sign In
            </Button>
          )}
        </Mutation>
        {isLoading && (
          <CircularProgress className={styles.buttonProgress} size={24} />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <SnackbarContent
            className={styles.barContent}
            message="Login Failed. Please Try Again."
            action={(
              <IconButton size="small" color="inherit" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            )}
          />
        </Snackbar>
      </div>
    </>
  );
}
