import { React, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Form.css'

const SignUpForm = ({ register, flashMsg, setFlashMsg }) => {
    const initialState = {
        username: '',
        password: '',
        verification: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(initialState);
    const [passwordType, setPasswordType] = useState('password');
    const [verificationType, setVerificationType] = useState('password');

    const togglePassword = () => {
        passwordType === 'password' 
        ? setPasswordType('text')
        : setPasswordType('password')
    }

    const toggleVerification = () => {
        verificationType === 'password' 
        ? setVerificationType('text')
        : setVerificationType('password')
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
        formData.password === formData.verification ? (
            register({ 
                info: {
                    username: formData.username,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email
                }
            })
        ) : (
            setFlashMsg({
                text: `Passwords do not match`,
                type: 'danger',
                for: 'signup',
                repeat: flashMsg.repeat === true ? false : true
              })
        )
    }

    return (
        <form id='register-form' onSubmit={ handleSubmit }>
            <div className='form-title'>Register Here</div>
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
                    <span id='register-form-password-verification-show' className='password-show'>
                        <FontAwesomeIcon 
                            icon={ passwordType === 'password' ? faEye : faEyeSlash }
                            className='password-toggle-btn' 
                            onClick={ togglePassword }
                        />
                    </span>
                </div>
            </span>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='verification'>
                        Verify Password
                    </label>
                </div>
                <div className='password-verification-input-container'>
                    <input 
                        className='form-input password-verification-input'
                        type={ verificationType }
                        name='verification'
                        placeholder='Password'
                        minLength='8'
                        maxLength='20'
                        value={ formData.verification || '' }
                        onChange={ handleChange }
                        autoFocus
                        required
                    />
                    <span id='register-form-password-verification-show' className='password-show'>
                        <FontAwesomeIcon 
                            icon={ verificationType === 'password' ? faEye : faEyeSlash }
                            className='password-toggle-btn' 
                            onClick={ toggleVerification }
                        />
                    </span>
                </div>
            </span>
            <span className='form-field-container' id='name-grid'>
                <div id='first-name-container' className='name-container'>
                    <div id='first-name-label-container' className='form-label-container name'>
                        <label id='first-name-label' className='form-label' htmlFor='firstName'>
                            First Name
                        </label>
                    </div>
                    <div id='first-name-input-container' className='name-input-container'>
                        <input 
                            className='form-input name-input'
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            maxLength='30'
                            value={ formData.firstName || '' }
                            onChange={ handleChange }
                            autoFocus
                            required
                        />
                    </div>
                </div>

                <div id='last-name-container' className='name-container'>
                    <div className='form-label-container name'>
                        <label className='form-label' htmlFor='lastName'>
                            Last Name
                        </label>
                    </div>
                    <div className='name-input-container'>
                        <input 
                            className='form-input name-input'
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            maxLength='30'
                            value={ formData.lastName || '' }
                            onChange={ handleChange }
                            autoFocus
                            required
                        />
                    </div>
                </div>
            </span>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='email'>
                        Email
                    </label>
                </div>
                <input 
                    className='form-input'
                    type='email'
                    name='email'
                    placeholder='Email'
                    maxLength='50'
                    value={ formData.email || '' }
                    onChange={ handleChange }
                    autoFocus
                    required
                />
            </span>
            <span>
                <button className='form-submit-btn' type='submit'>Register</button>
            </span>
            <span className='form-link-container'>
                <a href='/Login' className='form-link'>Have an account already? Login here!</a>
            </span>
        </form>    
    )
}

export default SignUpForm