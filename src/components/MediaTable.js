import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import MediaForm from './MediaForm';
import MediaView from './MediaView';

const MediaTable = () => {
    const [media, setMedia] = useState({data : []});
    const [isUpdate, setUpdate] = useState(false);
    const [fileToUpdate, setFileToUpdate] = useState('');
    const [fileToView, setFileToView] = useState('');
    const [isView, setView] = useState(false);
    useEffect(() => {
        getMedia();
    }, [])
    const getMedia = () => {
        fetch(`http://localhost:8000/api/media`)
        .then(response => response.json())
        .then(media => setMedia(media))
    }
    const handleView = (file) => {
        setFileToView(file);
        setView(true);
    }
    const handleUpdate = (file) => {
        setFileToUpdate(file);
        setUpdate(true);
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/media/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(res => {
            let mediaCopy = Object.assign({}, media);
            mediaCopy.data = mediaCopy.data.filter(file => file.id !== id);
            setMedia(mediaCopy);
        });
    }
    const displayMedia = media.data.map((file) => {
        let fileType = file.filename.split('.').pop();
        let thumbnail = (fileType === "mp4") ? <video src = {file.s3url} width = "60px"/>
            : <img src = {file.s3url} alt = {file.desc} width = "60px"/>;
        return (
            <tr key = {file.id}>
                <td>{thumbnail}</td>
                <td>{file.filename}</td>
                <td>{file.desc}</td>
                <td><Button color = "primary" onClick = {() => handleView(file)} block>View</Button></td>
                <td><Button color = "primary" onClick = {() => handleUpdate(file)} block>Edit</Button></td>
                <td><Button color = "primary" onClick = {() => handleDelete(file.id)} block>Delete</Button></td>
            </tr>
        )
    });
    let renderForm = isUpdate ? 
        <MediaForm key = {fileToUpdate.id} myFile = {fileToUpdate} setUpdate = {setUpdate}
            media = {media} setMedia = {setMedia} id = {fileToUpdate.id}/> 
        : <MediaForm key = "add-item-form" media = {media} setMedia = {setMedia} setUpdate = {setUpdate}/>
    return (
        <Container>
            <MediaView myFile = {fileToView} setView = {setView} setFileToView= {setFileToView}/>
            {renderForm}
            <Table>
                <thead>
                    <tr>
                        <th>Thumbnail</th><th>File Name</th><th>Description</th><th>View</th><th>Edit</th><th>Delete</th>
                    </tr>
                    {displayMedia}
                </thead>
            </Table>
        </Container>
    )
}

export default MediaTable;