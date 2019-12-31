import React from 'react';
import {Helmet} from "react-helmet";
import _ from 'lodash';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FormLogin from './form';
import ConfirmLogin from './confirm';
import './login.css';
import { hostname, RESPONSE_TYPE, SCOPE, REDIRECT_URI, CLIENT_ID, GRANT_TYPE, CLIENT_SECRET } from '../../constants';
import { randomString } from '../../utils/randomString';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: '',
            error: ''
        }
    }

    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        if(token){
            this.props.history.push('/');
        }
    } 

    goLogin = async () => {
        let state = randomString(20);
        await localStorage.setItem('state', state);
        const stringified = queryString.stringify({
            response_type: RESPONSE_TYPE,
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: SCOPE,
            state
        });
        let url = `${hostname}/oauth/v2/authorize?${stringified}`;
        window.location.href = url;
    }

    render(){
        return(
        <React.Fragment>
        <Helmet>
        <title>Petplus.vn - Đăng nhập</title>
        </Helmet>
            {
                this.state.data === '' 
                && <FormLogin 
                    goLogin={this.goLogin}

                />
            }

            {
                this.state.data !== '' 
                && <ConfirmLogin 
                />
            }

        </React.Fragment>)
    }
}

export default withRouter(Login);