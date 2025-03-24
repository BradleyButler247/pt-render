import { React, useState, useEffect, useRef } from "react";
import TokenTable from '../components/TokenTable'
import CryptoAPI from '../APIs/CryptoAPI'
import SortingClass from '../APIs/SortingAPI'
import LoadingIcon from '../components/LoadingIcon'
import './ProfileFavoritesTab.css'
import './TokenTable.css'


const ProfileFavoritesTab = ({ currUser, updateFavorite }) => {
    
    const [favTokens, setFavTokens] = useState()
    const sortBy = useRef('')
    const sortDirection = useRef('')

    const sortTokens = async ( header ) => {
        if ( header !== sortBy.current ) sortDirection.current = 'ascending'
        else {
            if ( sortDirection.current === 'ascending' ) sortDirection.current = 'descending'
            else if ( sortDirection.current === 'descending' ) sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }
        setFavTokens( SortingClass.sortTokens( favTokens, header, sortDirection.current ))    
        sortBy.current = header
    }

    useEffect(() => {
        const getFavorites = async () => {
            const res = await CryptoAPI.getFavoriteTokens(currUser.favorites.join(','));
            const favoriteTokensArray = res.token.data 
            ? Object.keys( res.token.data ).map( key => res.token.data[ key ] ) 
            : []

            sortBy.current === '' 
            ? setFavTokens( favoriteTokensArray.sort( (a,b) => a.cmc_rank - b.cmc_rank ))
            : setFavTokens( SortingClass.sortTokens( favoriteTokensArray, sortBy.current, sortDirection.current ))
        }
        getFavorites()
    }, [ currUser.favorites ])

    return (
        <>
        { !favTokens 
            ? <LoadingIcon /> 
            : favTokens.length === 0 
                ? <div className='no-favs'>No Favorites Yet</div> 
                : <div className='favorites-table-container'>
                    <TokenTable 
                        currUser={ currUser }
                        tokenList={ favTokens } 
                        updateFavorite={ updateFavorite }
                        sortBy={ sortBy.current } 
                        sortDirection={ sortDirection.current } 
                        sortTokens={ sortTokens }
                    /> 
                </div>
        }
        </>
    )
}

export default ProfileFavoritesTab