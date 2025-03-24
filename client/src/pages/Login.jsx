import React from 'react';
import { Navigate } from "react-router-dom";
import LoginForm from '../components/LoginForm'
import FlashMsg from '../components/FlashMsg'
import './Credentials.css';

const Login = ({ login, currUser, flashMsg, setFlashMsg }) => {
    return (
        currUser.username !== '' ? <Navigate to={ `/User/${ currUser.username }` } /> : (
            <>
            { flashMsg.for !== 'login' ? <></> : (
                <div className='flash-container'>
                    <FlashMsg flashMsg={ flashMsg } setFlashMsg={ setFlashMsg } />
                </div>
            ) }
            <div className='form-container'>
                <LoginForm login={ login } />  
            </div>
            </>
        )
    )
}


export default Login;