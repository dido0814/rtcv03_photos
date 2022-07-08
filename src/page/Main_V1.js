import { useState, useEffect, useRef } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import { Button, TextField, Switch, FormControlLabel } from '@mui/material';

import BackupIcon from '@mui/icons-material/Backup';
import RefreshIcon from '@mui/icons-material/Refresh';
import DescriptionIcon from '@mui/icons-material/Description';

import "../page/Main.css";
import PhotoList from '../components/PhotoList';
// import Upload from '../userComponents/Upload';
// import ExportAsImage from './ExportAsImage';
import HeadlineForm from '../components/HeadlineForm';
import PhotosAppBar from '../components/PhotosAppBar';
import CtrlFrom from '../components/AddPhotoForm';

function Main() {

    const [filesDatas, setFilesDatas] = useState([]);
    const printStatus = useRef(false);
    const exportRef = useRef();
    const [checkListInfo, setCheckListInfo] = useState({
        name: "大潭電廠7、8、9號機抽水機房暨進出水暗渠等新建工程",
        date: new Date().toLocaleDateString(),
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

    const addPhotos = (temp, fileSrc) => {
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
        ));
    };



    // const resetFile = () => {
    //     setFilesDatas([]);
    //     setResetKey(0);
    //     setCheck(false);
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
            <Container fixed>
                <PhotosAppBar />
                <CtrlFrom
                    // setFilesDatas={setFilesDatas}
                    // setCheckListInfo={setCheckListInfo}
                    // handleOnChange={handleOnChange}
                    addPhotos={addPhotos}
                    printStatus={printStatus}
                    exportRef={exportRef}
                />
                {/* <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
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
                        startIcon={<RefreshIcon />}
                        color="primary"
                        variant="outlined"
                    >
                        重設
                    </Button>
                    <TextField
                        type="date"
                        defaultValue="111-06-01"
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
                        label="鎖定"
                    />
                    <Button
                        onClick={onPrint}
                        color="primary"
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                    >
                        輸出PDF
                    </Button>
                </Grid> */}
            </Container>
            <Container fixed style={{ marginTop: '20px' }}>
                <div ref={exportRef} id="demo" className="app">
                    <HeadlineForm checkListInfo={checkListInfo} />
                    <PhotoList datas={filesDatas} addInfo={addInfo} deleteItem={deleteItem} printStatus={printStatus} />
                </div>
            </Container>
        </>
    );
}

export default Main;