import axios from 'axios';
import _ from 'lodash';

class OauthClient {
    constructor(){
        this.hostname = 'https://wecantalk.vn/api';
    }

    getToken(config){
        return axios.post(`${hostname}/token/`, {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: config.grant_type,
            code: config.code,
            redirect_uri: config.redirect_uri,
        });
    }

    sharePost(){
        return axios.post(`${hostname}/api/token/`, {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: config.grant_type,
            code: config.code,
            redirect_uri: config.redirect_uri,
        })
        .then( (response) => {
            return response.data.data;
        })
        .catch( (error) => {
            return _.get(error, 'response.data.error');
        });
    }

    getInstance(){
        return new OauthClient();
    }
}


module.exports = OauthClient.getInstance();