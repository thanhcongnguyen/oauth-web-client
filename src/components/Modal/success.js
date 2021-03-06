import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import './modal.css';

export default class ModalSuccess extends React.Component{
    constructor(props){
        super(props);
    }

    
    handleClose = () => {
        this.props.hide();
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div className="content-success">
                        {
                            this.props.message
                        }
                    </div>
                    <div className="wrap-btn-success">
                        
                        <button className="btn-success" onClick={this.handleClose}>
                            Xác nhận
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}