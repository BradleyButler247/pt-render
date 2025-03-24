import { React, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ProfileFavoritesTab from './ProfileFavoritesTab'
import ProfileTradesTab from './ProfileTradesTab'
import './ProfileInfo.css'


const ProfileInfo = ({ 
    currUser, 
    toggleForm, 
    userTradeTotal, 
    addTrade, 
    updateFavorite, 
    tradesList 
}) => {

    const [tradesTabClass, setTradesTabClass] = useState('active')
    const [favoritesTabClass, setFavoritesTabClass] = useState('')

    const viewTrades = () => { 
        if (!tradesTabClass) {
            setTradesTabClass('active')
            setFavoritesTabClass('')
        }
    }

    const viewFavorites = () => {
        if (!favoritesTabClass) {
            setFavoritesTabClass('active')
            setTradesTabClass('')
        }
    }


    return (
        <div id='profile-info-container'>
            <div id='user-info'>
                <div id='title-toggle-container'>
                    <div id='toggle-edit-form-btn'>                        
                        <FontAwesomeIcon 
                            icon={ faEdit } 
                            onClick={ toggleForm }
                            className='edit-btn'
                        />
                    </div>
                    <div id='username-title'>
                        { currUser.username }
                    </div>
                </div>

                <div id='user-pnl-container'>
                    <div id='pnl-label'>PnL: </div>
                    <div id='user-pnl' className={ userTradeTotal === 0 ? 'pnl' : 
                                                 ( userTradeTotal > 0 ? 'pnl-positive' : 'pnl-negative' ) }>
                        { `$${ userTradeTotal.toFixed(2) }` } 
                    </div>
                </div>
            </div>

            <div id='tabs-container'>
                <div id='trades-tab' className={ `tab ${ tradesTabClass }` } onClick={ viewTrades }>
                    Trades
                </div>
                <div id='favorites-tab' className={ `tab ${ favoritesTabClass }` } onClick={ viewFavorites }>
                    Favorites
                </div>
            </div>

            <div id='content-container'>
                <div id='trades-container'>
                    <div id='trades-content' className={ `content ${ tradesTabClass }` }>
                        <ProfileTradesTab addTrade={ addTrade } tradesList={ tradesList } />
                    </div>
                </div>

                <div id='favorites-container'>
                    <div id='favorites-content' className={ `content ${ favoritesTabClass }` }>
                        <ProfileFavoritesTab currUser={ currUser } updateFavorite={ updateFavorite } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo