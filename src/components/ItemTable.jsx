import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

import { TextField, Switch, IconButton, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';

import Card from "../userComponents/Card";
import Meta from "../userComponents/Meta";



const ItemForm = styled.form`
    margin-top: 10px;

    div {
        margin-top: 10px;
    }

    TextField {
        width: '10ch';
    }
`;

const Item = ({ data, printStatus, deleteItem = f => f, addInfo = f => f }) => {

    const [item, setItem] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [check, setCheck] = useState(false);

    function onAddInfo(id) {
        if (!check) {
            const info = {
                item: item,
                location: location,
                description: description
            }
            addInfo(id, info)
            setCheck(true);
        }
        if (check) setCheck(false);
    }

    return (
        <div>
            <Card
                style={{ margin: 10 }}
                cover={<img src={data.fileSrc} alt="" style={{ margin: 5 }} />}
                variant="vertical"
                footer={
                    printStatus.current ? <div></div> :
                        <div id="itemFooter" >
                            {/* <Switch
                                checked={check}
                                onChange={() => onAddInfo(data.info.id)}
                                name="checkedA"
                                color="primary"
                            />
                            {check ? <label>鎖定</label> : <label>未輸入</label>} */}
                            <IconButton
                                onClick={() => deleteItem(data.info.id)}
                                variant="outlined"
                                color="secondary"
                            >
                                <DeleteIcon />
                                刪除項目
                            </IconButton >
                        </div>
                }
            >
                <Meta
                    description={
                        <Grid item container spacing={1.5}>
                            <Grid item xs={4}>
                                <TextField
                                    label="抽查位置："
                                    value={location}
                                    onChange={event => setLocation(event.target.value)}
                                    disabled={check}
                                    variant="standard"
                                    // style={{ width: '16ch' }}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="抽查項目："
                                    value={item}
                                    onChange={event => setItem(event.target.value)}
                                    disabled={check}
                                    variant="standard"
                                    // style={{ width: '16ch' }}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="抽查說明："
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    disabled={check}
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    }
                >
                </Meta>
            </Card >
        </div>
    );
};



Item.propTypes = {
    /**
     * 傳入的file data 已轉成 array 再傳入
     */
    data: PropTypes.object,
    /**
     * 刪除檔案時的 callback
     */
    deleteItem: PropTypes.func,
    /**
    * 修改照片名稱時的 callback
    */
    addInfo: PropTypes.func,
};

Item.defaultProps = {
    data: [],
    deleteItem: () => { },
    addInfo: () => { },
}

export default Item;