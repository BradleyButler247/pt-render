import { React, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import CryptoAPI from '../APIs/CryptoAPI'
import SortingAPI from '../APIs/SortingAPI'
import TokenTable from '../components/TokenTable'
import LoadingIcon from '../components/LoadingIcon'
import './CategoriesTokenList.css'


const CategoriesTokenList = ({ currUser, updateFavorite }) => {

    const [tokens, setTokens] = useState()
    const [tokenHeader, setTokenHeader] = useState()
    const desired = useParams()
    const sortBy = useRef('')
    const sortDirection = useRef('')

    const sortTokens = (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }

        setTokens(SortingAPI.sortTokens(tokens, header, sortDirection.current))
        sortBy.current = header
    }

    useEffect(() => {
        const getCatID = async () => {
            const res = await CryptoAPI.getTokensByCat(desired.ID)
            setTokens(res.tokens.data.coins)
            setTokenHeader(res.tokens.data.description)
        }
        getCatID()
    }, [])

    return (
        <div className='cat-token-container'>
            { !tokenHeader ? <></> : (
                <div className='cat-token-header'>
                    { `${ tokenHeader } Tokens` }
                </div>
            ) }
            <div className='cat-token-table-container'>
            { tokens ? (        
                <TokenTable 
                    currUser={ currUser }
                    tokenList={ tokens } 
                    updateFavorite={ updateFavorite }
                    sortBy={ sortBy.current } 
                    sortDirection={ sortDirection.current } 
                    sortTokens={ sortTokens }
                />      
            ) : (
                <LoadingIcon />
            )}
            </div>
        </div>
    )
}

export default CategoriesTokenList