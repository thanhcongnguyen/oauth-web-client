import React from 'react';
import { withRouter } from 'react-router-dom';
import './header.css';
class Header extends React.Component{

    logout = async () => {
        await localStorage.removeItem('token');
        this.props.history.replace('/login');
    }

    render(){
        return(
            <div id="header">
                <div className="row">
                    <div className="col-6 logo">Pet+</div>  
                    <div className="col-6 info">
                        <div className="row">
                            <div className="col-8 avatar">
                                <img src={require('./avatar.png')} alt="avatar"/>
                                <span className="fullname">Nguyễn Thành Công</span>
                            </div>
                            <div className="col-4 logout">
                                <span onClick={this.logout}>Đăng xuất</span>    
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default withRouter(Header);