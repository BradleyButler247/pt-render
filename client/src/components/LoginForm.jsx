import React, { useState } from "react";
// import { Row, Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Form.css'


const LoginForm = ({ login }) => {
    const initialState = {
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [passwordType, setPasswordType] = useState('password');

    const togglePassword = () => {
        passwordType === 'password' 
        ? setPasswordType('text')
        : setPasswordType('password')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ 
            user: {
                username: formData.username,
                password: formData.password,
            } 
        });
        setFormData(initialState)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className='form-title'>Login Here</div>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='username'>
                        Username
                    </label>
                </div>
                <input 
                    className='form-input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    maxLength='30'
                    value={ formData.username || '' }
                    onChange={ handleChange }
                    autoFocus
                    required
                />
            </span>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='password'>
                        Password
                    </label>
                </div>
                <div className='password-verification-input-container'>
                    <input 
                        className='form-input password-verification-input'
                        type={ passwordType }
                        name='password'
                        placeholder='Password'
                        minLength='8'
                        maxLength='20'
                        value={ formData.password || '' }
                        onChange={ handleChange }
                        autoFocus
                        required
                    />
                    <span className='password-show'>
                        <FontAwesomeIcon 
                            icon={ passwordType === 'password' ? faEye : faEyeSlash }
                            className='password-toggle-btn' 
                            onClick={ togglePassword }
                        />
                    </span>
                </div>
            </span>
            <span>
                <button className='form-submit-btn' type='submit'>Login</button>
            </span>
            <span className='form-link-container'>
                <a href='/SignUp' className='form-link'>Need an account? Register here!</a>
            </span>
    </form>
    )
}

export default LoginForm