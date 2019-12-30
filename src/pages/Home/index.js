import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './home.css';
class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = async () => {
        let token = await localStorage.getItem('token');
        if(token === null){
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                trang chủ
            </div>
        );
    }
}

export default withRouter(Home);