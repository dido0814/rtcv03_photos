import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from "../userComponents/Card";
import Meta from "../userComponents/Meta";
import FormControl from "../userComponents/FormControl";
import TextField from "../userComponents/TextField";

const divStyle = {
    // background: 'red',
    // height: '25px'
    margin: '1px'
};



const Item = ({ data, deleteItem = f => f, addInfo = f => f }) => {

    function onAddInfo(id) {
        const info = {
            item: item,
            location: location,
            description, description
        }
        addInfo(id, info)
        setChick(1);
        setLocation("");
        setItem("");
        setDescription("");
        // console.log(`id: ${id}`)
        // console.log(`info: ${info.item} ${info.loction} ${info.description}`)
    }

    const [item, setItem] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [chick, setChick] = useState(0);

    return (
        <div>
            <Card
                cover={<img src={data.fileSrc} alt="" style={{ marginTop: 20 }} />}
                variant="horizontal"
                footer={
                    <div style={{ height: 50 }}>
                        <Button
                            onClick={() => onAddInfo(data.info.id)}
                            variant="outlined"
                            color="primary"
                            startIcon={<DeleteIcon />}>
                            輸入
                        </Button>
                        <Button
                            onClick={() => deleteItem(data.info.id)}
                            variant="outlined"
                            color="primary"
                            startIcon={<DeleteIcon />}>
                            刪除
                        </Button>
                        {chick ? <label>輸入完成</label> : <label>未輸入</label>}
                    </div>
                }
            >
                <Meta
                    title={<h5>照片名稱:{data.info.name}</h5>}
                    description={
                        <form>
                            <div style={divStyle}>
                                <FormControl
                                    label="抽查位置："
                                    placement="left"
                                    value={location}
                                    onChange={event => setLocation(event.target.value)}
                                >
                                    <TextField placeholder="請輸入" />
                                </FormControl>
                            </div>
                            <div style={divStyle}>
                                <FormControl
                                    label="抽查項目："
                                    placement="left"
                                    value={item}
                                    onChange={event => setItem(event.target.value)}
                                >
                                    <TextField placeholder="請輸入" />
                                </FormControl>
                            </div>
                            <div style={divStyle}>
                                <FormControl
                                    label="抽查說明："
                                    placement="left"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                >
                                    <TextField placeholder="請輸入" />
                                </FormControl>
                            </div>

                        </form>}
                >
                </Meta>
                {/* // <div style={{ height: 50 }}>
                //     <Button
                //         onClick={deleteItem}
                //         variant="outlined"
                //         color="primary"
                //         startIcon={<DeleteIcon />}>
                //         修改
                //     </Button>
                //     <Button
                //         onClick={deleteItem}
                //         variant="outlined"
                //         color="primary"
                //         startIcon={<DeleteIcon />}>
                //         刪除
                //     </Button>
                // </div> */}
            </Card >
            {/* <div>
                <p>照片編號:{id + 1}</p>
                <p>檔案名稱:{name}</p>
                <p>檔案類型:{type}</p>
                <p>檔案大小:{size}</p>
                <FileSrc file={file} />
            </div> */}
            {/* <button onClick={deleteItem} className="remove">刪除</button> */}
        </div >
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