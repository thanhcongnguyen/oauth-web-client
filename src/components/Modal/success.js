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
                    <div>
                        Thao tác thành Công
                    </div>
                    <div>
                        
                        <button className="btn-success" onClick={this.handleClose}>
                            Xác nhận
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}