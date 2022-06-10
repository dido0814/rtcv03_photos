import React, { useState, useEffect } from "react";

import FileSrc from "./FileSrc";

const Item = ({ id, name, type, size, file }) => {

    const [imageSrc, setImageSrc] = useState('');

    function deleteItem() {
        // deleteData(function (prev) {
        //     return prev.filter(item => item.id !== id)
        // })
    }

    return (
        <div>
            <div>
                <p>照片編號:{id + 1}</p>
                <p>檔案名稱:{name}</p>
                <p>檔案類型:{type}</p>
                <p>檔案大小:{size}</p>
                <FileSrc file={file} />
            </div>
            <button onClick={deleteItem} className="remove">刪除</button>
        </div>
    );
};

export default Item;