import { useState, useEffect } from 'react';

import { Grid, Button, TextField, FormControlLabel, Switch } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import RefreshIcon from '@mui/icons-material/Refresh';
import DescriptionIcon from '@mui/icons-material/Description';

import Upload from '../userComponents/Upload';
import ExportAsImage from '../page/ExportAsImage';

const AddPhotoForm = (addPhotos = f => f, textChange = f => f, printStatus, exportRef) => {

    const [check, setCheck] = useState(0)
    const [resetKey, setResetKey] = useState(0);

    const [checkListInfo, setCheckListInfo] = useState({
        name: "大潭電廠7、8、9號機抽水機房暨進出水暗渠等新建工程",
        date: new Date().toLocaleDateString(),
        RtName: "OOO",
        BesName: "OOO"
    });

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
                //回call到 main
                addPhotos(temp, fileSrc);
            }, false);
            if (temp) reader.readAsDataURL(temp);
        });
    }

    const resetFile = () => {
        setResetKey(0);
        setCheck(false);
        printStatus.current = false;
    }

    const onPrint = () => {
        !check ? alert("請案鎖定按鈕") : alert("準備輸出")
        if (!check) return;
        ExportAsImage(exportRef.current, 'test');
    }

    return (
        <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
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
        </Grid>


    )
}

export default AddPhotoForm;