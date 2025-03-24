import { React, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import './Form.css'

const ProfileEditForm = ({ currUser, toggleForm, editUser }) => {

    const initialState = {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    } 

    const [formData, setFormData] = useState(initialState);
    const [passwordType, setPasswordType] = useState('password');

    const closeForm = () => {
        setFormData(initialState)
        toggleForm();
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editUser({ 
            user: {
                email: formData.email ? formData.email : currUser.email,
                firstName: formData.firstName ? formData.firstName : currUser.firstName,
                lastName: formData.lastName ? formData.lastName : currUser.lastName,
                password: formData.password
            } 
        });
        setFormData(initialState)
        toggleForm()
    }

    return (
        <div id='profile-edit-form-container' className='form-container'>
            <div id='cancel-btn-container'>
                <button id='cancel-btn' onClick={ closeForm }>
                    <FontAwesomeIcon icon={ faCircleXmark } />
                </button>
            </div>
            <form id='profile-edit-form' onSubmit={ handleSubmit }>
                <div className='form-title'>
                    Edit { currUser.username }
                </div>

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
                    />
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
                            />
                        </div>
                    </div>
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
                <span className='edit-form-btn-container submit'>
                    <button className='form-submit-btn edit' type='submit'>Submit</button>
                </span>
            </form>
        </div>

    )
}

export default ProfileEditForm