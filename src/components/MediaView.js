import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Container, Button} from 'reactstrap';

const MediaView = ({myFile, setView, setFileToView}) => {
    let modalOpen = myFile ? true : false;
    const [modal, setModal] = useState(modalOpen);
    
    const toggle = () => {
        setModal(!modal);
        setFileToView("");
    }
    return (
        <Modal isOpen={modalOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>{myFile.filename}</ModalHeader>
            <ModalBody>
                <img src = {myFile.s3url}/>
            </ModalBody>
            <ModalFooter>{myFile.desc}</ModalFooter>
        </Modal>
    )
}

export default MediaView;