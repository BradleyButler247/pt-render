import React from "react";
import { Navigate } from "react-router-dom";
import SignUpForm from '../components/SignUpForm'
import FlashMsg from '../components/FlashMsg'
import './Credentials.css';


const SignUp = ({ register, currUser, flashMsg, setFlashMsg }) => {

    return (
        currUser.username !== '' ? <Navigate to='/' /> : (
            <>
            { flashMsg.for !== 'signup' ? <></> : (
                <div className='flash-container'>
                    <FlashMsg flashMsg={ flashMsg } setFlashMsg={ setFlashMsg } />
                </div>
            ) }
            <div className='form-container'>
                <SignUpForm register={ register } flashMsg={ flashMsg } setFlashMsg={ setFlashMsg } />  
            </div>
            </>
        )
    )
};



export default SignUp