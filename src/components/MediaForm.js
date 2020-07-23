import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Input, Button} from 'reactstrap';

const MediaForm = ({myFile, id, media, setMedia, setUpdate}) => {
    let formFileName = myFile ? myFile.filename : "";
    let formDesc = myFile ? myFile.desc : "";
    let modalOpen = myFile ? true : false;
    const [filename, setFileName] = useState(formFileName);
    const [desc, setDesc] = useState(formDesc);
    const [modal, setModal] = useState(modalOpen);

    const closeForm = () => {
        setFileName("");
        setDesc("");
        setModal(!modal);
        setUpdate(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const tempS3 = "aws.com/file/myfile"    //Placeholder for when real S3 link is generated on backend
        const medium = {filename, desc, s3url : tempS3}
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
            fetch(`http://localhost:8000/api/media`, {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(medium)
            })
            .then(response => response.json())
            .then(res => {
                let mediaCopy = Object.assign({}, media);
                mediaCopy.data.push(res.data);
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
                        <Input placeholder = "File Name" value = {filename} type = "text" 
                            onChange = {({target}) => setFileName(target.value)} required/>
                        <Input placeholder = "Description" value = {desc} type = "textarea" 
                            onChange = {({target}) => setDesc(target.value)} required/>
                        {/* <Input type = "file" color = "primary"/> */}
                        {renderSubmit}
                        {cancel}
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default MediaForm;