import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './home.css';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { OauthClient } from '../../libraries/oauthClient';
import ModalDelete from '../../components/Modal';
import ModalSuccess from '../../components/Modal/success';
import ModalShare from '../../components/Modal/share';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            text: '',
            accessToken: '',
            showModal: false,
            showSuccess: false,
            showShare: false,
            dataShare: '',
            id: ''
        }
    }

    componentDidMount = async () => {
        let token = await localStorage.getItem('token');
        if(token){
            let parsed = JSON.parse(token);
            let accessToken = parsed.access_token;
            await this.setState({accessToken});
            this.getPosts(accessToken);
        }else{
            this.props.history.push('/login');
        } 
    }

    getPosts = async (accessToken) => {
        try {
            const response = await axios.get('https://petplus.vn/api/post/all', {
                headers: {
                    authorization: accessToken
                }
            });
            if(response.data.status){
                this.setState({
                    data: _.get(response, 'data.data')
                });
            }
        } catch (error) {
            
        }
    }

    createPost = async () => {
        try {
            const response = await axios.post('https://petplus.vn/api/post/create', 
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
                await this.setState({
                    text: '',
                    showSuccess: true
                });
                this.getPosts(this.state.accessToken);
            }

        } catch (error) {
            
        }
    }

    showDelete = async (id) => {
        await this.setState({
            showModal: true,
            id
        });
    }

    hide = async () => {
        await this.setState({
            showModal: false
        });
    }

    hideSuccess = async() => {
        await this.setState({
            showSuccess: false
        });
    }

    showShare = async (data) => {
        await this.setState({
            showShare: true,
            dataShare: data
        });
    }

    hideShare = async(id) => {
        await this.setState({
            showShare: false
        });
    }
   

    deletePost = async () => {
        try {
            const response = await axios.post('https://petplus.vn/api/post/delete', 
                {
                    id: this.state.id
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
                    showModal: false,
                    id: ''
                });
                this.getPosts(this.state.accessToken);
            }

        } catch (error) {
            
        }
    }

    sharePost = async() => {
        try {
            const response = await OauthClient.sharePost(this.state.accessToken, {
                content:  this.state.dataShare.content,
                id: this.state.dataShare.id,
                created_by: this.state.dataShare.created_by
            });
            if(response.data.status){
                console.log('sadasdas', response);
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
                    <ModalDelete
                        show={this.state.showModal}
                        onDelete={this.deletePost}
                        hide={this.hide}
                    />
                    <ModalSuccess 
                        show={this.state.showSuccess}
                        hide={this.hideSuccess}
                    />

                    <ModalShare
                        show = {this.state.showShare}
                        hide = {this.hideShare}
                        onShare = {this.sharePost}
                    />
                    <div className="create-post">
                            <div className="input"> 
                                <input
                                    id="input-content"
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
                                        <button className="col-1" style={{textAlign: 'right'}} onClick={() => this.showShare(element)}>
                                            <span className="share">
                                                <i className="fa fa-share-alt" aria-hidden="true"/>
                                            </span>
                                        </button>
                                        <button className="col-1 delete" style={{textAlign: 'left'}} onClick={() => this.showDelete(element.id)}>
                                            <span className="delete">
                                                <i className="fa fa-trash" aria-hidden="true"/>
                                            </span>
                                        </button>
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