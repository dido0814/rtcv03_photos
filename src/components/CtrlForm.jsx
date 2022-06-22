import { useState } from "react";

import { Container, Grid } from "@material-ui/core";
import { Button, TextField, FormControlLabel, Switch } from "@material-ui/core";
import { BackupIcon } from "@material-ui/icons";

import Upload from "../userComponents/Upload";
import ExportAsImage from './ExportAsImage';

const CtrlForm = ({ exportRef, checkListInfo,setCheckListInfo = f => f, handleOnChange = f => f, setFilesDatas = f => f, printStatus }) => {

    const [resetKey, setResetKey] = useState(0);
    const [check, setCheck] = useState(false);


    const onPrint = () => {
        !check ? alert("請案鎖定按鈕") : alert("準備輸出")
        if (!check) return;
        ExportAsImage(exportRef.current, 'test');
    }

    const resetFile = () => {
        setFilesDatas([]);
        setResetKey(0);
        setCheck(false);
        printStatus.current = false;
    }

    return (
        <>
            <Container fixed>
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
            </Container>
        </>
    )
}

export default CtrlForm;