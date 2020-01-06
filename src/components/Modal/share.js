import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import './modal.css';

export default class ModalShare extends React.Component{
    constructor(props){
        super(props);
    }

    handleClose = () => {
        this.props.hide();
    }

    handleShare = () => {
        this.props.onShare();
        this.props.hide()
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div>
                        Bạn có muốn chia sẻ bài viết này không ?
                    </div>
                    <div>
                        
                        <button className="btn-delete" onClick={this.handleShare}>
                            Chia sẻ
                        </button>
                        <button className="btn-cancel" onClick={this.handleClose}>
                            Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}