import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import FlashMsg from '../components/FlashMsg'
import ProfileEditForm from '../components/ProfileEditForm'
import ProfileInfo from '../components/ProfileInfo'
import './Profile.css'


const Profile = ({ editUser, currUser, flashMsg, setFlashMsg, addTrade, updateFavorite }) => {
    const [formDisplay, setFormDisplay] = useState('none');
    const [userTradeTotal, setUserTradeTotal] = useState(0.00);
    const [tradesList, setTradesList] = useState([])

    const toggleForm = () => {
        formDisplay === 'none' 
        ? setFormDisplay('') 
        : setFormDisplay('none')
    }

    const calculateTradeTotal = () => {
        let totalSpent;
        let totalEarned;

        if (currUser.username !== '' && currUser.buys[0]) {
            totalSpent = currUser.buys.map(buy => buy.quantity * buy.price).reduce((total, spent) => total + spent, 0);
        } 
        else totalSpent = 0

        if (currUser.username !== '' && currUser.sells[0]) {
            totalEarned = currUser.sells.map(sell => sell.quantity * sell.price).reduce((total, spent) => total + spent, 0);
        } 
        else totalEarned = 0

        setUserTradeTotal(totalEarned - totalSpent)
    }

    const getTradeHistory = () => {
        if (currUser.buys[0] || currUser.sells[0]) {
            const txns = [...currUser.buys, ...currUser.sells]
            const sortedTxns = txns.sort((a,b) => b.date_added.localeCompare(a.date_added))
            
            setTradesList(sortedTxns)
        } else {
            setTradesList(['none'])
        }
    }

    useEffect(() => {
        calculateTradeTotal();
        getTradeHistory()
    }, [currUser.buys, currUser.sells])



    return (
        currUser.username === '' ? <Navigate to='/Login' /> : (
            <>
            <div id='form-modal' style={{ display: formDisplay }}>
                <ProfileEditForm 
                    currUser={ currUser } 
                    toggleForm={ toggleForm }
                    editUser={ editUser } />
            </div>
            <div className='page-container profile'>
                { flashMsg.for !== 'profile' ? <></> : (
                    <div className='flash-container'>
                        <FlashMsg flashMsg={ flashMsg } setFlashMsg={ setFlashMsg } />
                    </div>
                ) }
                <div className='user-profile-container'>
                    <ProfileInfo 
                        currUser={ currUser } 
                        toggleForm={ toggleForm } 
                        userTradeTotal={ userTradeTotal } 
                        addTrade={ addTrade }
                        updateFavorite={ updateFavorite }
                        tradesList={ tradesList } />
                </div> 

            </div>
            </>
        )
    )
}

export default Profile