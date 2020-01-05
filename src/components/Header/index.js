import React from 'react';
import './header.css';
export default class Header extends React.Component{
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
                                <span>Đăng xuất</span>    
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}