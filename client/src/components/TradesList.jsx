import React from "react";
import { v4 as uuid } from 'uuid';
import './TradesList.css'

const TradesList = ({ tradesList }) => {
    const formatDatetime = (dt) => {
        const dateStr = dt.split('T')[0]
        const dateVals = dateStr.split('-')
        const date = `${dateVals[1]}-${dateVals[2]}-${dateVals[0]}`
        return date
    }

    return (
        <>
        { tradesList[0] === 'none' ? (
            <div className='trades-list none'>No trade history</div>
        ) : (
            <table className='trades-list-table'>
                <thead>
                    <tr className='trades-list-header-row'>
                        <th>Token</th>
                        <th className='txn-col'>Type</th>
                        <th>Quantity</th>
                        <th>Price ($)</th>
                        <th>Value</th>
                        <th>Date <div id='date-format'>(MM/DD/YYYY)</div></th>
                    </tr>
                </thead>
                <tbody>
                { tradesList.map(trade => {
                    return (
                        <tr key={ uuid() } className='trades-list-body-row'>
                            <td>
                                { trade.token_name }
                            </td>
                            <td className={ trade.type === 'buy' ? 'buy-txn' : 'sell-txn' }>
                                { trade.type.charAt(0).toUpperCase() + trade.type.slice(1) }
                            </td>
                            <td>
                                { trade.quantity > 1 ? Number(trade.quantity).toFixed(2) : Number(trade.quantity) }
                            </td>
                            <td>
                                { `$${trade.price}` }
                            </td>
                            <td>
                                { `$${ (trade.quantity * trade.price).toFixed(2) }` }
                            </td>
                            <td>
                                { formatDatetime(trade.date_added) }
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )}
        </>
    )
}

export default TradesList