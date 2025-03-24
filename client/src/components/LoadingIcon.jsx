import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import './LoadingIcon.css';

const LoadingIcon = () => {
    return (
        <div className='loading-icon-container'>
            <FontAwesomeIcon className='icon' icon={ faCircleNotch } /> 
        </div>
    )
}


export default LoadingIcon;