import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const FilesInfoShow = ({ data }) => {

    if (data.length === 0) return (<p>尚未載入照片</p>);

    return (
        <>
            {
                data.map((item, i) => {
                    const { name, type, size } = item;
                    console.log(item);
                    return (
                        <Item id={i} name={name} type={type} size={size} file={item} />
                    );
                })
            }
        </>
    );

}

FilesInfoShow.propTypes = {
    /**
     * 傳入的file data 已轉成 array 再傳入
     */
    data: PropTypes.array
};

FilesInfoShow.defaultProps = {
    data: []
}

export default FilesInfoShow;