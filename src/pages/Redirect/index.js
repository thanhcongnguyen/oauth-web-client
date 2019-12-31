import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import axios from 'axios';
import { hostname, RESPONSE_TYPE, SCOPE, REDIRECT_URI, CLIENT_ID, GRANT_TYPE, CLIENT_SECRET } from '../../constants';
import { OauthClient } from '../../libraries/oauthClient';


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
        if(parsed.error){
            this.setState({
                error: 'Yêu cầu uỷ quyền không được chấp nhận!'
            });
            return;
        }

        if(parsed.code){
            this._getToken(parsed.code);
            console.log('121212');
        }
    }

    _getToken = (code) => {
        OauthClient.getToken({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE,
            code,
            redirect_uri: REDIRECT_URI,
        }).then( async response => {
            console.log('response', response);
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