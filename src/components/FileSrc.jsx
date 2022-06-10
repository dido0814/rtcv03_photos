import React, { useState, useEffect } from "react";

const FileSrc = ({ file }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            // convert image file to base64 string
            setImageSrc(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
        console.log('useEffect');
    }, [file]);

    return (
        <img src={imageSrc} alt="" style={{ marginTop: 20 }} />
    );
};

export default FileSrc;