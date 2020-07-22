import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Input, Button} from 'reactstrap';

const MediaForm = () => {
    const [filename, setFileName] = useState("");
    const [desc, setDesc] = useState("");
    const [modal, setModal] = useState(false);

    const addMedia = () => {

    }
    const toggle = () => {setModal(!modal)}
    return (
        <>
            <Button color = "primary" onClick={toggle}>Add New Media File</Button>
            <Modal isOpen = {modal} toggle = {toggle}>
                <ModalHeader toggle = {toggle}>Add a New File</ModalHeader>
                <ModalBody>
                    <Form>
                        <Input placeholder = "File Name" value = {filename} type = "text" 
                            onChange = {({target}) => setFileName(target.value)} required/>
                        <Input placeholder = "Description" value = {desc} type = "textarea" 
                            onChange = {({target}) => setDesc(target.value)} required/>
                        <Input type = "file" color = "primary"/>
                        <Button color = "primary" type = "submit" block>Add File</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default MediaForm;