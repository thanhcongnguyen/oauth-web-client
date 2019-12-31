import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { hostname, RESPONSE_TYPE, SCOPE, REDIRECT_URI, CLIENT_ID, GRANT_TYPE, CLIENT_SECRET } from '../../constants';
const oauthClient = require('../../libraries/oauthClient');


class Redirect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: '',
            loading: true
        }
    }
    componentDidMount = async () => {
        let parsed = queryString.parse(this.props.location.search);
        let state = localStorage.getItem('state');
        if(state && state !== parsed.state){
            this.setState({
                error: 'state không trùng khớp!'
            });
            return;
        }
        if(parsed.code){
            this._getToken(parsed.code);
        }
    }

    _getToken = (code) => {
        oauthClient.getToken({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE,
            code,
            redirect_uri: REDIRECT_URI,
        }).then( async response => {
            let token = response.data.data;
            await localStorage.setItem('token', token);
            this.props.history.replace('/');
        })
        .catch( error => {
             this.setState({
                 error: _.get(error, 'response.data.error'),
                 loading: false
             });
        });
    }

    render(){
        if(this.state.loading){
            return ''
        }
        return(
            <div>
                {
                    this.state.error && <p>{this.state.error}</p>
                }
            </div>
        )
    }
}

export default withRouter(Redirect);