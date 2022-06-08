import React from 'react';
// import { Button, Form, Card, Container } from 'react-bootstrap';
// import { BsCloudUpload } from "react-icons/bs";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';

import Upload from '../components/Upload';

function Main() {
    return (
        <>
            <CssBaseline />
            <Container fixed>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                    <Upload accept="image/*" multiple onChange={function noRefCheck() { }} >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<BackupIcon />}
                        >
                            上傳照片
                        </Button>
                    </Upload>
                </Typography>
            </Container>

        </>
    );
}

const handleOnPreview = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImageSrc(reader.result);
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

export default Main;