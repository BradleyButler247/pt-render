import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
// import { Button } from "reactstrap";
// import DropdownAsset from './DropdownAsset'
import './Form.css';



const ProfileTradesForm = ({ addTrade }) => {
    const initialState = {
        asset: '',
        quantity: '',
        price: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [showDropdown, setShowDropdown] = useState('')
    const [assetIDType, setAssetIDType] = useState('Symbol');
    const [assetPlaceholder, setAssetPlaceholder] = useState('ETH');

    const [buysClass, setBuysClass] = useState('')
    const [sellsClass, setSellsClass] = useState('')
    const [txnType, setTxnType] = useState('buy')

    const toggleDropdown = () => showDropdown ? setShowDropdown('') : setShowDropdown('show') 

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData, 
            txnType: txnType, 
            assetIDType: assetIDType
        }

        addTrade(data);
        setFormData(initialState)
    }

    useEffect(() => {
        if (assetIDType === 'Name') setAssetPlaceholder('Ethereum')
        else if (assetIDType === 'Symbol')setAssetPlaceholder('ETH')
        else if (assetIDType === 'Contract Address')setAssetPlaceholder('0x000000000000000000000000000000000000dEaD')
    }, [assetIDType])

    useEffect(() => { 
        if (txnType === 'buy') {
            setBuysClass('active') 
            setSellsClass('')
        } else if (txnType === 'sell') {
            setSellsClass('active')
            setBuysClass('')
        } else {
            setSellsClass('')
            setBuysClass('')
        }
    }, [txnType])

    return (
        <>
        <form onSubmit={ handleSubmit } className='trade-form'>
            <div className='txn-select-container'>
                <div className={ `txn-select-tab buy ${ buysClass }` } onClick={ () => setTxnType('buy') }>Add Buy</div>
                <div className={ `txn-select-tab sell ${ sellsClass }` } onClick={ () => setTxnType('sell') }>Add Sell</div>
            </div>
            <span className='form-field-container'>
                <div className='form-label-container with-icon' onClick={ toggleDropdown }>
                    <label className='form-label' htmlFor='asset'>
                        { assetIDType }
                    </label>
                    <div className='asset-type-dropdown-icon-container'>
                        { showDropdown ? (
                            <FontAwesomeIcon icon={ faCaretUp } className='asset-type-dropdown-icon' />
                        ) : (
                            <FontAwesomeIcon icon={ faCaretDown } className='asset-type-dropdown-icon' />
                        )}
                    </div>
                    <div className={ `asset-type-dropdown ${ showDropdown }` }>
                        <div className={ `asset-dropdown-item ${ showDropdown }` } onClick={ () => setAssetIDType('Name') }>Name</div>
                        <div className={ `asset-dropdown-item ${ showDropdown }` } onClick={ () => setAssetIDType('Symbol') }>Symbol</div>
                        <div className={ `asset-dropdown-item ${ showDropdown }` } onClick={ () => setAssetIDType('Contract Address') }>Contract Address</div>
                    </div>
                </div>
                <input 
                    className='form-input'
                    type='text'
                    name='asset'
                    placeholder={ assetPlaceholder }
                    maxLength='100'
                    value={ formData.asset || '' }
                    onChange={ handleChange }
                    autoFocus
                    required
                />
            </span>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='quantity'>
                        Quantity
                    </label>
                </div>
                <input 
                    className='form-input'
                    type='text'
                    name='quantity'
                    placeholder='1'
                    maxLength='20'
                    value={ formData.quantity || '' }
                    onChange={ handleChange }
                    autoFocus
                    required
                />
            </span>
            <span className='form-field-container'>
                <div className='form-label-container'>
                    <label className='form-label' htmlFor='price'>
                        Price ($)
                    </label>
                </div>
                <input 
                    className='form-input'
                    type='text'
                    name='price'
                    placeholder='1.00'
                    maxLength='30'
                    value={ formData.price || '' }
                    onChange={ handleChange }
                    autoFocus
                    required
                />
            </span>
            <button className='trades-form-submit-btn' type='submit'>
                { txnType === 'buy' ? 'Add Buy' : 'Add Sell' }
            </button>
        </form>
        </>
    )
}

export default ProfileTradesForm