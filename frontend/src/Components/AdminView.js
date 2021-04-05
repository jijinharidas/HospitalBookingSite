import React, { useState, useEffect } from "react";
import axios from 'axios';
import { loadState } from "../localStorage";
import { saveLoggedin } from "../localStorage";
import '../App.css'
import { Typography } from "@material-ui/core";

const AdminView = (props) => {
    const [bookingsToday, changebookingsToday] = useState([]);

    const getBookings = () => {
        var token = loadState("token")
        const config = {
            headers: { Authorization: `Token ${token}` }
        };
        axios.get(`${props.url}/bookings`, config)
            .then((response) => {
                if (response.data.status === false) {
                    saveLoggedin('');
                    props.change();
                }
                else {
                    // changebookingsToday({...bookingsToday, response.data})
                    // console.log(response.data)
                    var today = response.data;
                    changebookingsToday(today);
                    // if (today.length !== bookingsToday.length) {
                    //     console.log(`Today ${today.length}`);
                    //     console.log(`Bookings Today ${bookingsToday.length}`);
                    //     changebookingsToday([today]);
                    // }
                }
            })
            .catch((e) => {
                return false;
            })
    }

    useEffect(() => {
        getBookings()
      }, [])

    const loadBookings = (props) => {
        if (Object.entries(bookingsToday).length === 0) {
            return <h1>No bookings for today</h1>
        }
        else {
            console.log(bookingsToday)

            return (
                <div>
                    <table id="patients">
                        <tr>
                            <th>Time Slot</th>
                            <th>Patient User#</th>
                        </tr>
                    {bookingsToday.map((e, i) => {
                        return (
                            <tr>
                                <td>{e["bookingID"]}</td>
                                <td>{e["bookingPatient"]}</td>

                                {console.log(e[i])}
                            </tr>
                        )
                    })}
                    </table>
                </div>

            )

        }
    }
    return (
        <div style={{"marginTop":"2vh"}}>
            <Typography component="h1" variant="h5">
                These are today's bookings
            </Typography>
            {loadBookings(props)}
        </div>
    )
}

export default AdminView;