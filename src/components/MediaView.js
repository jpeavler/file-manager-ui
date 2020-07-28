import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Container, Button} from 'reactstrap';

const MediaView = ({myFile, setView, setFileToView}) => {
    let modalOpen = myFile ? true : false;
    const [modal, setModal] = useState(modalOpen);
    
    const toggle = () => {
        setModal(!modal);
        setFileToView("");
    }
    let mediaDisplay;
    if(myFile) {
        let fileType = myFile.filename.split('.').pop();
        console.log("fileType: ", fileType);
        mediaDisplay = (fileType === "mp4") ? <video src = {myFile.s3url} controls width = "100%"/>
            : <img src = {myFile.s3url}/>
    }
    return (
        <Modal isOpen={modalOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>{myFile.filename}</ModalHeader>
            <ModalBody>
                {mediaDisplay}
            </ModalBody>
            <ModalFooter>{myFile.desc}</ModalFooter>
        </Modal>
    )
}

export default MediaView;