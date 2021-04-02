import React, { useState } from "react";
import { Button, TextField, Grid, Paper, Typography, } from "@material-ui/core";
import axios from "axios";
import { saveState, saveLoggedin } from '../localStorage';

const checkRegisterForm = (username, password, email) => {
    if (username.length > 0 && password.length > 0 && email.length > 0) {
        return null;
    }
    return "disabled";
}


const Register = (props) => {
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    const [email, changeEmail] = useState("");

    return (
        <div>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid containerdirection="column" justify="center" spacing={2} className="login-form">
                        <Paper variant="elevation" elevation={2} className="login-background">
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField type="text" placeholder="Username" fullWidthname="username" variant="outlined" value={username} onChange={(e) => changeUsername(e.target.value)} requiredautoFocus />
                                        </Grid>
                                        <Grid item>
                                            <TextField type="password" placeholder="Password" fullWidthname="password" variant="outlined" value={password} onChange={(e) => changePassword(e.target.value)} required />
                                        </Grid>
                                        <Grid item>
                                            <TextField type="email" placeholder="Email" fullWidthname="email" variant="outlined" value={email} onChange={(e) => changeEmail(e.target.value)} required />
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" type="submit" className="button-block"
                                            disabled={checkRegisterForm(username, password, email)}
                                            onClick={() => {
                                                const req = {};
                                                req["username"] = username;
                                                req["password"] = password;
                                                req["email"] = email;
                                                axios
                                                    .post(`${props.url}/users/api/auth/register`, req)
                                                    .then((response) => {
                                                        console.log(response.data);
                                                        saveState(response.data.token);
                                                        saveLoggedin('loggedIn');
                                                        props.change();
                                                    })
                                                    .catch((err) =>{ 
                                                        console.log(err);
                                                        alert("Username already taken");
                                                    });
                                            }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={props.change}>
                                    Login?
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid >
            </Grid >
        </div >
    );
}
export default Register;