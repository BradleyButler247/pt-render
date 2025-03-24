import { React, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const FlashMsg = ({ flashMsg, setFlashMsg }) => {

    const [showMsg, setShowMsg] = useState(true)

    useEffect(() => {
        const toggleFlash = () => {
            setTimeout(() => {
                setShowMsg(false)
            }, 10000)

        }
        toggleFlash()   
    }, [flashMsg])

    useEffect(() => {
        const clearFlashMsg = () => {
            if (showMsg === false) {
                // Allow time for fade animation before clearing flash message
                setTimeout(() => {
                    setFlashMsg({
                        text: '',
                        type: '',
                        for: '',
                        repeat: flashMsg.repeat
                    })  
                }, 100)
            }
        }
        clearFlashMsg()
    }, [showMsg])

    // console.log(flashMsg)

    return (

        <Alert show={showMsg} className={`alert alert-${flashMsg.type}`}>
            {flashMsg.text}
        </Alert>
    )
}

export default FlashMsg