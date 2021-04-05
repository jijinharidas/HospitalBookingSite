import React, { useState } from "react";
import { Button, Select, MenuItem, Grid, Paper, Typography, } from "@material-ui/core";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { loadState } from "../localStorage";

const checkLoginForm = (date, timeSlot) => {
    if (date === "" || timeSlot === "") {
        return "disabled";
    }
    // console.log(date);
    // console.log(timeSlot);
    return null;
}


const Bookings = (props) => {
    const [date, changeDate] = useState(new Date());
    const [timeSlot, changeTimeSlot] = useState("");
    const [booked, changeBooked] = useState(false);
    const token = loadState("token");


    const handleTimeChange = (event) => {
        changeTimeSlot(event.target.value);
    };

    const getDate = (date) => {
        console.log(date);
        var day = date.getDate();
        if(day<10){
            day = `0${day}`;
        }
        else{
            day = String(day)
        }
        var month = date.getMonth() + 1;
        if(month<10){
            month = `0${month}`;
        }
        else{
            month = String(month);
        }
        var year = date.getFullYear();

        return `${year} ${month} ${day}`;
    };
    if(booked){
        return (
            <Typography variant="h3" component="h3" style={{"color":"green", "padding": "3vh"}}>Your booking has successfully confirmed!</Typography>
        )
    }
    return (
        <div>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid containerdirection="column" justify="center" spacing={2} className="login-form">
                        <Paper variant="elevation" elevation={2} className="login-background">
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Book an appoinment
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item style={{ "paddingTop": '2vw'}}>
                                            <label for="TimeSelector" style={{ "padding": '2vw', "paddingBottom":"0vw" }}>Time Slot:</label>
                                            <Select
                                                labelId="TimeSelector"
                                                id="TimeSelector"
                                                value={timeSlot}
                                                onChange={handleTimeChange}
                                            >
                                                <MenuItem value={1}>9.30 am - 10.00 am</MenuItem>
                                                <MenuItem value={2}>10.00 am - 10.30 am</MenuItem>
                                                <MenuItem value={3}>10.30 am - 11.00 am</MenuItem>
                                                <MenuItem value={4}>11.00 am - 11.30 am</MenuItem>
                                                <MenuItem value={5}>11.30 am - 12.00 am</MenuItem>
                                                <MenuItem value={6}>2.00 pm - 2.30 pm</MenuItem>
                                                <MenuItem value={7}>2.30 pm - 3.00 am</MenuItem>
                                            </Select>
                                        </Grid>

                                        <Grid item>
                                            <label for="DateSelector" style={{ "padding": '2vw' }}>Date:</label>
                                            <Calendar
                                                onChange={changeDate}
                                                value={date}
                                                minDate={new Date()}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" color="primary" type="submit" className="button-block"
                                                disabled={checkLoginForm(date, timeSlot)}
                                                onClick={() => {
                                                    const config = {
                                                        headers: { Authorization: `Token ${token}` },
                                                      };
                                                    const req = {};
                                                    var bookingDate = getDate(date);
                                                    req['timeSlot'] = timeSlot;
                                                    req['bookingDate'] = bookingDate;
                                                    axios
                                                        .post(`${props.url}/bookings/booking`, req, config)
                                                        .then((response) => {
                                                            if(response.data['status'] === true){
                                                                changeBooked(true);
                                                            }
                                                            else{
                                                                alert('That slot is already taken!')
                                                            }
                                                        })
                                                        .catch((err) => {
                                                            alert('That slot is already taken!')
                                                            console.log(err)
                                                        });
                                                }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid >
            </Grid >
        </div >
    );
}


export default Bookings;