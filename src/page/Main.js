import React, { useState, useEffect, useCallback } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';

import "../page/Main.css";
import PhotoList from '../components/PhotoList';
import Upload from '../userComponents/Upload';

//import filesData from '../file-data.json';

function Main() {

    const [filesDatas, setFilesDatas] = useState([]);
    const [resetKey, setResetKey] = useState(0);

    const addInfo = (id, info) => {
        console.log(id);
        console.log(info.location);
        const newDatas = filesDatas.map(file => file.info.id === id ? {
            ...file,
            info: {
                ...file.info,
                location: info.location,
                item: info.item,
                description: info.description
            }
        } : file)
        setFilesDatas(newDatas);

    }

    const deleteItem = (id) => {
        const newDatas = filesDatas.filter(item => item.info.id !== id);
        setFilesDatas(newDatas);
    }

    useEffect(() => {
        console.log('讀取結果');
        console.log(filesDatas);

    }, [filesDatas])

    const handleOnChange = (files) => {

        Object.values(files).forEach((temp, i) => {
            console.log("檔案" + i);
            console.log(temp);
            const reader = new FileReader()
            // 轉換成 DataURL
            reader.addEventListener('load', () => {
                // convert image file to base64 string
                let fileSrc = reader.result;
                console.log("load listener");
                //存到
                setFilesDatas((Prev) => (
                    [...Prev, {
                        info: {
                            id: Math.floor(Math.random() * (8999) + 1000),
                            title: "抽查照片",
                            name: temp.name,
                            type: temp.type,
                            size: temp.size,
                            item: "",
                            location: "",
                            description: ""
                        },
                        file: temp,
                        fileSrc: fileSrc
                    }]
                ))
            }, false);
            if (temp) reader.readAsDataURL(temp);

        });
    }

    const resetFile = () => {
        setFilesDatas([]);
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
                    <PhotoList datas={filesDatas} addInfo={addInfo} deleteItem={deleteItem} />
                </div>
            </Container>

        </>
    );
}

export default Main;