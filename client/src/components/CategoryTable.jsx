import { React } from "react";
import { v4 as uuid } from 'uuid';
import FilterIcon from './FilterIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import './CategoryTable.css'

const CategoryTable = ({ categories, sortBy, sortDirection, sortCats }) => {

    return (
        <table className='cat-table'>
            <thead>
                <tr>
                    <th className='cat-col-header' onClick={ ()=> sortCats( 'name' ) }>
                        <div className='cat-header-content'>
                            Name
                            <FilterIcon 
                                type='name' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='cat-col-header' onClick={ () => sortCats( 'num_tokens' ) }>
                        <div className='cat-header-content'>
                            Tokens
                            <FilterIcon 
                                type='num_tokens' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='cat-col-header mcap' onClick={ () => sortCats( 'market_cap' ) }>
                        <div className='cat-header-content'>
                            Market Cap (USD)
                            <FilterIcon 
                                type='market_cap' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='cat-col-header change' onClick={ () => sortCats( 'market_cap_change' ) }>
                        <div className='cat-header-content'>
                            ∆MCap (24hr)
                            <FilterIcon 
                                type='market_cap_change' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='cat-col-header volume' onClick={ () => sortCats( 'volume' ) }>
                        <div className='cat-header-content'>
                            Volume (USD)
                            <FilterIcon 
                                type='volume' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                    <th className='cat-col-header change' onClick={ () => sortCats( 'volume_change' ) }>
                        <div className='cat-header-content'>
                            ∆V (24hr)
                            <FilterIcon 
                                type='volume_change' 
                                currentFilter={ sortBy } 
                                direction={ sortDirection } 
                            />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                { categories.map( cat => {
                    return (
                        !cat.market_cap ? null : (
                            <tr key={ uuid() } className='cat-row'>
                                <td className='cat-col'>
                                    <a href={ `/Crypto/Categories/${ cat.id }` } className='cat-link'>
                                        { cat.title }
                                    </a>
                                </td>
                                <td className='cat-col'>
                                    { cat.num_tokens.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                                </td>
                                <td className='cat-col mcap'>
                                    ${ cat.market_cap.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }         
                                </td>
                                <td className='cat-col change'>
                                    { !cat.market_cap_change ? '-' : (
                                        Math.round( cat.market_cap_change * 100 ) / 100 === 0.00
                                            ? '0.00%' 
                                            : `${ cat.market_cap_change.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }%`
                                        )
                                    } 
                                    <div className='direction-arrow'>
                                        <FontAwesomeIcon 
                                            icon={ Math.round( cat.market_cap_change * 100 ) / 100 === 0.00 ? null : (
                                                    cat.market_cap_change.toFixed(2) > 0 
                                                        ? faArrowUp 
                                                        : faArrowDown
                                            ) } 
                                            className={ Math.round( cat.market_cap * 100 ) / 100 === 0.00 ? null : (
                                                        cat.market_cap_change.toFixed(2) > 0 
                                                            ? 'positive' 
                                                            : 'negative' 
                                                        )} 
                                        />
                                    </div>
                                </td>
                                <td className='cat-col volume'>
                                    { cat.volume ? `$${ cat.volume.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }` : '-' }
                                </td>
                                <td className='cat-col change'>
                                    { !cat.volume_change ? '-' : (
                                        Math.round( cat.volume_change * 100 ) / 100 === 0.00
                                            ? '0.00%' 
                                            : `${ cat.volume_change.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }%`
                                        )
                                    } 
                                    <div className='direction-arrow'>
                                        <FontAwesomeIcon 
                                            icon={ Math.round( cat.volume_change * 100 ) / 100 === 0.00 ? null : (
                                                    cat.volume_change.toFixed(0) > 0 
                                                        ? faArrowUp 
                                                        : faArrowDown )} 
                                            className={ Math.round( cat.volume_change * 100 ) / 100 === 0.00 ? null : (
                                                        cat.volume_change.toFixed(0) > 0 
                                                            ? 'positive' 
                                                            : 'negative' )} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                    )
                })}
            </tbody>
        </table>
    )
}

export default CategoryTable