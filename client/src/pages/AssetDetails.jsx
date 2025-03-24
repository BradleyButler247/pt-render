import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import CryptoAPI from '../APIs/CryptoAPI'
import CryptoChartWidget from '../components/CryptoChartWidget'
import AssetTags from '../components/AssetTags'
import LoadingIcon from '../components/LoadingIcon'
import './AssetDetails.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const AssetDetails = ({ token, setToken }) => {

    const [tokenCategories, setTokenCategories] = useState()
    const tokenID = useParams()

    useEffect(() => {
        const getToken = async () => {
            const res = await CryptoAPI.getToken('id', tokenID.ID)
            // Categories given with token don't match categories received by query with token ID so two requests must be made
            const cats = await CryptoAPI.getCatID(tokenID.ID)
            
            setToken(res.token.data[`${tokenID.ID}`])
            setTokenCategories(cats.category.data)
            
            return 'Success'
        }
        getToken()
    }, [])

    return (
        token ? (
            <div className='asset-page-container'>       
                <div className='asset-header-container'>
                    <div className='img-container'>
                        <img src={ token.logo } 
                             alt={ `${ token.name } logo` } 
                             className='asset-img' 
                        />
                    </div>
                    <div>
                        <h1 className='asset-title'>
                            { token.name } ({ token.symbol })
                        </h1>
                    </div>
                </div> 
                <div className='asset-info-container'>
                    <div className='widget-container'>
                        {/* Unable to incorporate TradingView chart socket without paying so it's just a black rectangle */}
                        <CryptoChartWidget />
                    </div>
                    <div className='tags-container'>
                        <AssetTags categories={ tokenCategories } /> 
                    </div>
                    <div className='asset-description'>
                        { token.description.slice( 0, token.description.indexOf( token.urls.website[0] ))}
                        <a href={ token.urls.website[0] }>
                            { token.urls.website[0] }
                        </a>
                        { token.description.slice( token.description.indexOf( token.urls.website[0] ) + token.urls.website[0].length )}
                    </div>
                </div>
            </div>
        ) : (
            <LoadingIcon />
        )
    )
}

export default AssetDetails