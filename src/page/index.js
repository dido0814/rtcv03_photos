import React, { useState, useEffect, useRef } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import { TextField, Grid, Switch, FormControlLabel } from '@material-ui/core';

import Pdf from "react-to-pdf";

// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker
// } from '@material-ui/pickers';

import "../page/Main.css";
import PhotoList from '../components/PhotoList';
// import Upload from '../userComponents/Upload';
// import ExportAsImage from './ExportAsImage';
import CtrlForm from '../components/CtrlForm';

// import { margin } from '@mui/system';
// import { Prev } from 'react-bootstrap/esm/PageItem';

//import filesData from '../file-data.json';

function Main() {

    const [filesDatas, setFilesDatas] = useState([]);
    const printStatus = useRef(false);
    const exportRef = useRef();
    const [checkListInfo, setCheckListInfo] = useState({
        name: "大潭電廠7、8、9號機抽水機房暨進出水暗渠等新建工程",
        date: "2022-06-01",
        RtName: "OOO",
        BesName: "OOO"
    });

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

    // const resetFile = () => {
    //     setFilesDatas([]);
    //     // setResetKey(0);
    //     // setCheck(false);
    //     printStatus.current = false;
    // }

    // const onPrint = () => {
    //     !check ? alert("請案鎖定按鈕") : alert("準備輸出")
    //     if (!check) return;
    //     ExportAsImage(exportRef.current, 'test');
    // }

    return (
        <>
            <CssBaseline />
            {/* <Container fixed>
                <div style={{ margin: '20px' }}>
                    <h1 style={{ textAlign: 'center' }}>監造抽查照片整理系統</h1>
                </div>
                <Grid container justifyContent="space-between">
                    <Upload resetKey={resetKey} accept="image/*" multiple onChange={handleOnChange} >
                        <Button
                            style={{ marginLeft: '10px' }}
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
                    <TextField
                        type="date"
                        defaultValue="2022-06-01"
                        label="抽查日期："
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '20ch' }}
                        value={checkListInfo.date}
                        onChange={event => setCheckListInfo((Prev) => (
                            {
                                ...Prev,
                                date: event.target.value
                            }
                        ))}
                    />
                    <TextField
                        type="text"
                        label="睿泰抽查人員："
                        style={{ width: '20ch' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={checkListInfo.RtName}
                        onChange={event => setCheckListInfo((Prev) => (
                            {
                                ...Prev,
                                RtName: event.target.value
                            }
                        ))}
                    />
                    <TextField
                        type="text"
                        label="中華陪同人員："
                        style={{ width: '20ch' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={checkListInfo.BesName}
                        onChange={event => setCheckListInfo((Prev) => (
                            {
                                ...Prev,
                                BesName: event.target.value
                            }
                        ))}
                    />
                    <FormControlLabel
                        control={<Switch
                            checked={check}
                            onChange={() => {
                                check ? printStatus.current = false : printStatus.current = true
                                setCheck((prev) => !prev);
                            }}
                            color="primary"
                            size="small"
                        />}
                        labelPlacement="top"

                        //value="top"
                        label="鎖定"
                    />
                    <Button
                        onClick={onPrint}
                        color="primary"
                        variant="outlined"
                    >
                        輸出報告
                    </Button>
                </Grid>
            </Container> */}
            <CtrlForm
                handleOnChange={handleOnChange}
                setCheckListInfo={setCheckListInfo}
            />
            <Container fixed style={{ marginTop: '20px' }}>
                <div ref={exportRef} id="demo" className="app">
                    <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{checkListInfo.name}</h2>
                    <h2 style={{ textAlign: 'center' }}>施工抽查照片({checkListInfo.date})</h2>
                    <h5 style={{ textAlign: 'right' }}>睿泰:{checkListInfo.RtName}、BES:{checkListInfo.BesName}</h5>
                    <PhotoList datas={filesDatas} addInfo={addInfo} deleteItem={deleteItem} printStatus={printStatus} />
                </div>
            </Container>
        </>
    );
}

export default Main;