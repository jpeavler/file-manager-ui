import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Input, Button} from 'reactstrap';
import axios from 'axios';

const MediaForm = ({myFile, id, media, setMedia, setUpdate}) => {
    let formFileName = myFile ? myFile.filename : "";
    let formDesc = myFile ? myFile.desc : "";
    let modalOpen = myFile ? true : false;
    const [filename, setFilename] = useState(formFileName);
    const [file, setFile] = useState('');
    const [desc, setDesc] = useState(formDesc);
    const [modal, setModal] = useState(modalOpen);

    const closeForm = () => {
        setFilename("");
        setDesc("");
        setModal(!modal);
        setUpdate(false);
    }
    const onFileChage = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);
        formData.append('desc', desc);
        const medium = {file, filename, desc};
        if(myFile) {
            fetch(`http://localhost:8000/api/media/${id}`, {
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(medium)
            })
            .then(response => response.json())
            .then(res => {
                let mediaCopy = Object.assign({}, media);
                mediaCopy.data.forEach((item, index) => {
                    if(item.id === res.data.id) {
                        mediaCopy.data[index] = res.data;
                    }
                });
                setMedia(mediaCopy);
            })
            .then(() => closeForm());
        } else {
            const result = await axios.post(`http://localhost:8000/api/media`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            })
            .then(res => {
                let mediaCopy = Object.assign({}, media);
                mediaCopy.data.push(res.data.data);
                setMedia(mediaCopy);
            })
            .then(() => closeForm());
        }
    }
    const toggle = () => {setModal(!modal)}
    let renderSubmit = myFile ? <Button color = "primary" key = "edit" type = "submit" block>Edit File</Button>
        : <Button color = "primary" key = "add" type = "submit" block>Add File</Button>
    let cancel = myFile ? <Button type = "button" key = "cancel-edit" onClick = {() => closeForm()} block>Cancel Edit</Button>
        : <Button type = "button" key = "cancel-add" onClick = {toggle} block>Cancel Add</Button>
    let formHeader = myFile ? <ModalHeader key = "edit-head">Edit File: {myFile.filename}</ModalHeader>
        : <ModalHeader key = "add-head">Add a New File</ModalHeader>
    return (
        <>
            <Button color = "primary" onClick={toggle}>Add New Media File</Button>
            <Modal isOpen = {modal} toggle = {toggle}>
                {formHeader}
                <ModalBody>
                    <Form onSubmit = {handleSubmit}>
                        <Input placeholder = "Description" value = {desc} type = "textarea" 
                            onChange = {({target}) => setDesc(target.value)} required/>
                        <Input type = "file" color = "primary" onChange = {onFileChage} required/>
                        {renderSubmit}
                        {cancel}
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default MediaForm;