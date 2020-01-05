import React from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';

export default class ModalDelete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.show != prevProps.show){
            this.setState({
                show: this.props.show
            });
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleDelete = () => {
        this.props.onDelete();
        this.setState({
            show: false
        });
    }

    render(){
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div>
                        Bạn có muốn xoá bài viết này không ?
                    </div>
                    <div>
                        <button variant="secondary" onClick={this.handleClose}>
                            Huỷ
                        </button>
                        <button variant="primary" onClick={this.handleDelete}>
                            Xoá
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}