import React from "react";
import { v4 as uuid } from 'uuid';
import FilterIcon from './FilterIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import './TokenTable.css'

const TokenTable = ({ currUser, tokenList, updateFavorite, sortBy, sortDirection, sortTokens }) => {

    return (
        <table className='token-table'>
            <thead>
                <tr>
                    <th className='token-col-header blank'></th>
                    <th className='token-col-header name' onClick={ ()=> sortTokens('name') }>
                        <div className='token-header-content'>
                            Name
                            <FilterIcon 
                                type='name' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header' onClick={ ()=> sortTokens('price') }>
                        <div className='token-header-content'>
                            Price
                            <FilterIcon 
                                type='price' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header change' onClick={ ()=> sortTokens('percent_change_24h') }>
                        <div className='token-header-content'>
                            ∆P (24hr)
                            <FilterIcon 
                                type='percent_change_24h' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header volume' onClick={ ()=> sortTokens('volume_24h') }>
                        <div className='token-header-content'>
                            Volume (24hr)
                            <FilterIcon 
                                type='volume_24h' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header change' onClick={ ()=> sortTokens('volume_change_24h') }>
                        <div className='token-header-content'>
                            ∆V (24hr)
                            <FilterIcon 
                                type='volume_change_24h' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header mcap' onClick={ ()=> sortTokens('market_cap') }>
                        <div className='token-header-content'>
                            Market Cap
                            <FilterIcon 
                                type='market_cap' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='token-col-header blank'></th>
                </tr>
            </thead>
            <tbody>
                { tokenList.map( token => {
                    return (
                        // Filter out inactive tokens or tokens with market cap of $0
                        token.cmc_rank === null || token.quote.USD.market_cap === 0 ? null : (
                            <tr className='token-row' key={ uuid() }>
                                <td className='token-col blank-title'>
                                    { token.cmc_rank }.
                                </td>
                                <td className='token-col name'>
                                    <a href={ `/Crypto/${ token.id }` } className='token-link'>
                                        <div className='token-name'>{ token.name }</div>
                                        <div className='token-symbol'>({ token.symbol })</div>
                                    </a>
                                </td>
                                <td className='token-col'>
                                    { token.quote.USD.price > 0.01 ? (
                                        `${ token.quote.USD.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }`
                                    ) : (
                                        token.quote.USD.price.toFixed(10)
                                    )}
                                </td>
                                <td className='token-col change'>
                                    {/* Round is needed to compare near zero values, when .toFixed(2) shows 0.00 it is not equal to 0.00 */}
                                    { Math.round(token.quote.USD.percent_change_24h * 100) / 100 === 0.00 
                                        ? '0.00%' 
                                        : `${ token.quote.USD.percent_change_24h.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }%` }
                                        
                                    { Math.round(token.quote.USD.percent_change_24h * 100) / 100 === 0.00 
                                        ? <></> 
                                        : (
                                            <div className='direction-arrow'>
                                                <FontAwesomeIcon 
                                                    icon={ token.quote.USD.percent_change_24h.toFixed(2) > 0 
                                                        ? faArrowUp 
                                                        : faArrowDown } 

                                                    className={ token.quote.USD.percent_change_24h.toFixed(2) > 0 
                                                        ? 'positive' 
                                                        : 'negative' } 
                                                />
                                            </div>
                                        )}
                                </td>
                                <td className='token-col volume'>
                                    ${ token.quote.USD.volume_24h.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                                </td>
                                <td className='token-col change'>
                                    { Math.round(token.quote.USD.volume_change_24h * 100) / 100 === 0.00 
                                        ? '0.00%' 
                                        : `${ token.quote.USD.volume_change_24h.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }%` }
                                        
                                    { Math.round(token.quote.USD.volume_change_24h * 100) / 100 === 0.00 
                                        ? <></> 
                                        : (
                                            <div className='direction-arrow'>
                                                <FontAwesomeIcon 
                                                    icon={ token.quote.USD.volume_change_24h.toFixed(2) > 0 
                                                        ? faArrowUp 
                                                        : faArrowDown } 

                                                    className={ token.quote.USD.volume_change_24h.toFixed(2) > 0 
                                                        ? 'positive' 
                                                        : 'negative' } 
                                                />
                                            </div>
                                        )}
                                </td>
                                <td className='token-col mcap'>
                                    ${ token.quote.USD.market_cap.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                                </td>
                                <td className='token-col blank-title'>
                                    { currUser.favorites.indexOf( token.id ) > -1 ? (
                                        <FontAwesomeIcon icon={ faStarSolid } onClick={() => updateFavorite('-', token.id)} />
                                    ) : (
                                        <FontAwesomeIcon icon={ faStarRegular } onClick={() => updateFavorite('+', token.id)} />
                                    )}
                                </td>
                            </tr>
                        )
                    )
                })}
            </tbody>
        </table>
    )
}

export default TokenTable