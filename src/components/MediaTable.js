import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';

const MediaTable = () => {
    const [media, setMedia] = useState({data : []});
    useEffect(() => {
        getMedia();
    }, [])
    const getMedia = () => {
        fetch(`http://localhost:8000/api/media`)
        .then(response => response.json())
        .then(media => setMedia(media))
    }
    const displayMedia = media.data.map((file) => {
        return (
            <tr key = {file.id}>
                <td>{file.filename}</td>
                <td>{file.desc}</td>
                <td><Button color = "primary">View</Button></td>
            </tr>
        )
    })
    return (
        <Table>
            <thead>
                <tr>
                    <th>File Name</th><th>Description</th><th>View</th>
                </tr>
                {displayMedia}
            </thead>
        </Table>
    )
}

export default MediaTable;