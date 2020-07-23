import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import MediaForm from './MediaForm';

const MediaTable = () => {
    const [media, setMedia] = useState({data : []});
    const [isUpdate, setUpdate] = useState(false);
    const [fileToUpdate, setFileToUpdate] = useState('');
    useEffect(() => {
        getMedia();
    }, [])
    const getMedia = () => {
        fetch(`http://localhost:8000/api/media`)
        .then(response => response.json())
        .then(media => setMedia(media))
    }
    const handleUpdate = (file) => {
        setFileToUpdate(file);
        setUpdate(true);
    }
    const displayMedia = media.data.map((file) => {
        return (
            <tr key = {file.id}>
                <td>{file.filename}</td>
                <td>{file.desc}</td>
                <td><Button color = "primary">View</Button></td>
            </tr>
        )
    });
    let renderForm = isUpdate ? 
        <MediaForm key = {fileToUpdate.id} myFile = {fileToUpdate} setUpdate = {setUpdate}
            media = {media} setMedia = {setMedia} id = {fileToUpdate.id}/> 
        : <MediaForm key = "add-item-form" media = {media} setMedia = {setMedia} setUpdate = {setUpdate}/>
    return (
        <Container>
            {renderForm}
            <Table>
                <thead>
                    <tr>
                        <th>File Name</th><th>Description</th><th>View</th>
                    </tr>
                    {displayMedia}
                </thead>
            </Table>
        </Container>
    )
}

export default MediaTable;