import React from "react";
import { Grid, AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { loadLoggedin, loadState } from "./localStorage";
import axios from "axios";
import {url} from './creds';

const getLogoutButton = (url) => {
    const loggedIn = loadLoggedin();
    const token = loadState("token");
    if (loggedIn === "loggedIn" || loggedIn == "adminLoggedIn") {
        return (
            <Button 
                variant="contained" 
                color="primary" 
                style={{ "border": "1px solid black" }}
                onClick={() => {
                    const config = {
                        headers: { Authorization: `Token ${token}` },
                      };
                    const req = {};
                    axios
                        .post(`${url}/users/api/auth/logout`, req, config)
                        .then((response) => {
                            localStorage.clear();
                            window.location.reload();
                        })
                        .catch((err) => {
                            alert('Something went wrong!')
                            console.log(err)
                        });
                }}>
                Logout
            </Button>
        )
    }
}
const Bar = (props) => {
    return (
        <div>
            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container justify="center" wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">
                                ABC Hospital
                            </Typography>
                        </Grid>
                    </Grid>
                    {getLogoutButton(url)}
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default Bar;