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
                <div>
                    trang chủ
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);