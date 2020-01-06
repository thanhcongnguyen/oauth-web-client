import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import { OauthClient } from '../../libraries/oauthClient';
import './redirect.css';


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
        
        if(!parsed.error && state && state !== parsed.state){
            this.setState({
                error: 'state không trùng khớp!',
                loading: false
            });
            return;
        }
        if(parsed.error == 'access_denied'){
            this.setState({
                error: 'Yêu cầu uỷ quyền không được chấp nhận!',
                loading: false
            });
            return;
        }

        if(parsed.code){
            this._getToken(parsed.code);
        }
    }

    _getToken = (code) => {
        OauthClient.getToken(code)
        .then( async response => {
            let token = response.data.data;
            await localStorage.setItem('token', JSON.stringify(token));
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
            <div id="redirect">
                <div className="content">
                {
                    this.state.error && <p>{this.state.error}</p>
                }
                </div>
            </div>
        )
    }
}

export default withRouter(Redirect);