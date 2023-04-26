import React, { useEffect } from 'react'

function ShowImage({ imageShow, setImageShow }) {

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setImageShow("")
            }
        };
        window?.addEventListener('keydown', handleEsc);

        return () => {
            window?.removeEventListener('keydown', handleEsc);
        };
    }, [setImageShow]);

    return (
        <div className='modal imageModal'
            style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}>
            <img src={imageShow} alt="" style={{height: "90%", width: "90%", objectFit: "cover"}}/>
        </div>
    )
}

export default ShowImage