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
        let parsed = queryString.parse(this.props.location.search);
        let state = localStorage.getItem('state');
        if(state && state !== parsed.state){
            this.setState({
                error: 'state không trùng khớp!'
            });
            return;
        }

        if(parsed.code){
            let token = await this.getToken(parsed.code);
            await localStorage.setItem('token', token);
            this.props.history.push('/');
        }
    } 

    getToken = async (code) => {
        return axios.post(`${hostname}/api/token/`, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE,
            code,
            redirect_uri: REDIRECT_URI,
        })
        .then( (response) => {
            return response.data.data;
        })
        .catch( (error) => {
            let errorMessage = _.get(error, 'response.data.error');
            this.setState({
                error: 'Yêu cầu không hợp lệ, vui lòng kiểm tra lại!'
            });
        });
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