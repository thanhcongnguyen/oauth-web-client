import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './home.css';
class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = async () => {
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
                                />
                            </div>
                            <div className="btn">
                                <button>Đăng bài viết</button>
                            </div>
                            
                    </div>
                    <div className="post">
                            <div className="content">nội dung</div>
                            <div className="row mt-10 mb-10">
                                <button className="col-11" style={{textAlign: 'right'}}><span className="share"><i className="fa fa-share-alt" aria-hidden="true"/></span></button>
                                <button className="col-1 delete" style={{textAlign: 'left'}}><span className="delete"><i className="fa fa-trash" aria-hidden="true"/></span></button>
                            </div>
                    </div>
                    <div className="post">
                            <div className="content">nội dung</div>
                            <div className="row mt-10 mb-10">
                                <button className="col-11" style={{textAlign: 'right'}}><span className="share"><i className="fa fa-share-alt" aria-hidden="true"/></span></button>
                                <button className="col-1 delete" style={{textAlign: 'left'}}><span className="delete"><i className="fa fa-trash" aria-hidden="true"/></span></button>
                            </div>
                    </div>
                    <div className="post">
                            <div className="content">nội dung</div>
                            <div className="row mt-10 mb-10">
                                <button className="col-11" style={{textAlign: 'right'}}><span className="share"><i className="fa fa-share-alt" aria-hidden="true"/></span></button>
                                <button className="col-1 delete" style={{textAlign: 'left'}}><span className="delete"><i className="fa fa-trash" aria-hidden="true"/></span></button>
                            </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);