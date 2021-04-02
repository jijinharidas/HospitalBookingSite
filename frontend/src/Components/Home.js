import Login from './Login';
import Register from './Register';
import React  from "react";
import Bookings from './Bookings';
import { loadLoggedin } from "../localStorage";
import {url} from '../creds';
import Bar from '../Bar';

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
        if (loggedIn === "loggedIn"){
            return <Bookings url={url}/>
        }
        if (this.state.isLoginPage) {
            return <Login change={this.changeStatus} url={url}/>;
        }
        return <Register change={this.changeStatus} url={url}/>;
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