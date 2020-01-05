import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './home.css';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            text: '',
            accessToken: ''
        }
    }

    componentDidMount = async () => {
        let token = await localStorage.getItem('token');
        if(token){
            let parsed = JSON.parse(token);
            let accessToken = parsed.access_token;
            await this.setState({accessToken});
            this.getPosts(accessToken);
        } 
    }

    getPosts = async (accessToken) => {
        try {
            const response = await axios.get('http://localhost:4000/api/post/all', {
                headers: {
                    authorization: accessToken
                }
            });
            if(response.data.status){
                this.setState({
                    data: _.get(response, 'data.data')
                });
            }
            console.log('response', this.state.data);
        } catch (error) {
            
        }
    }

    createPost = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/post/create', 
                {
                    content: this.state.text
                },
                {
                    headers: {
                        'authorization': `${this.state.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if(response.data.status){
                this.setState({
                    text: ''
                });
                this.getPosts(this.state.accessToken);
            }

        } catch (error) {
            
        }
    }

    onchangePost = (text) => {
        this.setState({ text });
    }

    render() {
        return (
            <React.Fragment>
                 <Helmet>
                    <title>Petplus.vn - Trang chủ</title>
                </Helmet>
                <div id="home">
                    <div className="create-post">
                            <div className="input"> 
                                <input
                                    placeholder="Bạn đang nghĩ gì ?"
                                    onChange = {(e) => this.onchangePost(e.target.value)} 
                                />
                            </div>
                            <div className="btn">
                                <button onClick = {this.createPost} >Đăng bài viết</button>
                            </div>
                            
                    </div>
                    {
                        this.state.data.map( (element, index) => {
                            return (
                                <div className="post" key={index}>
                                    <div className="content">{element.content}</div>
                                    <div className="row mt-10 mb-10">
                                        <div className="col-10 date">{moment(element.createdAt).format('hh:mm:ss DD-MM-YYYY')}</div>
                                        <button className="col-1" style={{textAlign: 'right'}}><span className="share"><i className="fa fa-share-alt" aria-hidden="true"/></span></button>
                                        <button className="col-1 delete" style={{textAlign: 'left'}}><span className="delete"><i className="fa fa-trash" aria-hidden="true"/></span></button>
                                    </div>
                                </div>
                            )   
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);