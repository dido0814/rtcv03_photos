import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import Item from './Item';

const PhotoList = ({ datas, printStatus, deleteItem = f => f, addInfo = f => f }) => {

    if (datas.length === 0) return (<p>尚未載入照片</p>);

    return (
        <>
            <Grid container>
                {
                    datas.map((item, i) => {
                        return (
                            <Grid item key={i} xs={6} spacing={1}>
                                <Item key={i} data={item} deleteItem={deleteItem} addInfo={addInfo} printStatus={printStatus} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </>
    );
}

PhotoList.propTypes = {
    /**
     * 傳入的file data 已轉成 array 再傳入
     */
    data: PropTypes.array,
    /**
     * 刪除檔案時的 callback
     */
    deleteItem: PropTypes.func,
    /**
    * 修改照片名稱時的 callback
    */
    addInfo: PropTypes.func,
};

PhotoList.defaultProps = {
    data: [],
    deleteItem: () => { },
    addInfo: () => { },
}

export default PhotoList;