import { React } from "react";
import ProfileTradesForm from './ProfileTradesForm'
import TradeList from './TradesList'
import LoadingIcon from './LoadingIcon'

import './ProfileTradesTab.css';


const ProfileTradesTab = ({ addTrade, tradesList }) => {
    return (
        <>
        <div id='trades-list-title'>Trade History</div>
        <div id='sub-content-container'>
            <div id='trade-list-container'>
                { tradesList.length > 0 ? (
                    <TradeList tradesList={ tradesList } />
                ) : (
                    <LoadingIcon />
                ) }
                
            </div>
            <div className={ `trade-form-container` }>
                <ProfileTradesForm 
                    addTrade={ addTrade } />
            </div>
        </div>
        </>
    )
}

export default ProfileTradesTab