import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import './modal.css';

export default class ModalDelete extends React.Component{
    constructor(props){
        super(props);
    }

    

    handleClose = () => {
        this.props.hide();
    }

    handleDelete = () => {
        this.props.onDelete();
        this.props.hide()
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div className="modal-content-mb">
                        Bạn có muốn xoá bài viết này không ?
                    </div>
                    <div>
                        
                        <button className="btn-delete" onClick={this.handleDelete}>
                            Xoá
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