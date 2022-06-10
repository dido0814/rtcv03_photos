import React, { useState, useCallback } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';

import "../page/Main.css";

import Upload from '../components/Upload';
import FilesInfoShow from '../components/FilesInfoShow';

function Main() {

    const [filesData, setFilesData] = useState([]);
    const [resetKey, setResetKey] = useState(0);

    const handleOnChange = (files) => {
        console.log('自訂事件:');
        console.log(files);
        console.log(Object.values(files));
        setFilesData(Object.values(files));
    }

    const resetFile = () => {
        setFilesData([]);
        setResetKey(0);
    }

    return (
        <>
            <CssBaseline />
            <Container fixed>
                <div className="app">
                    <Upload resetKey={resetKey} accept="image/*" multiple onChange={handleOnChange} >
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<BackupIcon />}
                        >
                            上傳照片
                        </Button>
                    </Upload>
                    <Button
                        onClick={resetFile}
                        startIcon={<BackupIcon />}
                        color="primary"
                        variant="outlined"
                    >
                        重設
                    </Button>
                    <FilesInfoShow data={filesData} />
                </div>
            </Container>

        </>
    );
}

export default Main;