import axios from 'axios';

const hostname = 'https://wecantalk.vn/api';
const config = {
    client_id: '123456',
    client_secret: 'Aa@123456',
    grant_type: 'authorization_code',
    code: 'read write',
    redirect_uri: 'https://petplus.vn',
}
export class OauthClient{

    static getToken(code){
        return axios.post(`${hostname}/token/`, {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: config.grant_type,
            code,
            redirect_uri: config.redirect_uri,
        });
    }

    static sharePost(accessToken, content){
        let conf = {
            headers: {
                authorization: 'Bearer ' + accessToken
            },
            data: {
                content
            }
        }
        return axios.post(`${hostname}/post/share`, conf);
    }

}