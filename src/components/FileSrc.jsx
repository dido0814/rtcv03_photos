import React, { useState, useEffect } from "react";

const FileSrc = ({ file, addImageSrc = f => f }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            // convert image file to base64 string
            setImageSrc(reader.result);
            //addImageSrc(imageSrc, file.name);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
        console.log('useEffect');
        console.log(imageSrc);

    }, [file]);

    useEffect((imageSrc) => {
        //addImageSrc(imageSrc, file.name);
        console.log("imageSrc Eff事件");
        console.log(imageSrc);
    }, [imageSrc])


    return (
        <img src={imageSrc} alt="" style={{ marginTop: 20 }} />
    );
};

export default FileSrc;