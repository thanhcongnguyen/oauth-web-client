import axios from 'axios';
import _ from 'lodash';

export class OauthClient {
    constructor(){
        this.hostname = 'https://wecantalk.vn/api';
    }

    static getToken(config){
        return axios.post(`${this.hostname}/token/`, {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: config.grant_type,
            code: config.code,
            redirect_uri: config.redirect_uri,
        });
    }

    static validateToken(){
        return true;
    }

    static sharePost(){
        return true;
    }
}
