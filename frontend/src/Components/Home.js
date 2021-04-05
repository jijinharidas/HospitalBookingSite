import Login from './Login';
import Register from './Register';
import React  from "react";
import Bookings from './Bookings';
import { loadLoggedin, saveLoggedin } from "../localStorage";
import {url} from '../creds';
import Bar from '../Bar';
import axios from 'axios';
import AdminView from './AdminView';
import { loadState } from "../localStorage";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginPage: true };
    }
    changeStatus = () => {
        this.setState({ isLoginPage: !this.state.isLoginPage });
    };
    getComponent = () => {
        const loggedIn = loadLoggedin();
        if(loggedIn == "adminLoggedIn"){
            return <AdminView change={this.changeStatus} url={url}/>
        }
        if (loggedIn === "loggedIn"){
            this.checkIfStaff();
            return <Bookings url={url}/>
        }
        if (this.state.isLoginPage) {
            return <Login change={this.changeStatus} url={url}/>;
        }
        return <Register change={this.changeStatus} url={url}/>;
    }
    checkIfStaff = () => {
        var token = loadState("token")
        const config = {
            headers: { Authorization: `Token ${token}` }
          };
        axios.get(`${url}/bookings`, config)
            .then((response) => {
                if(response.data.status !== false){
                    saveLoggedin('adminLoggedIn');
                    this.changeStatus();
                }
            })
            .catch((e) =>{
                return false;
            })
    }
    render() {
        return (
            <div>
                <Bar />
                {this.getComponent()}
            </div>
        );
    }
}

export default Home;