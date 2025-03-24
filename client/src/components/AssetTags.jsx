import { React, useState } from "react";
import { v4 as uuid } from 'uuid';
import './AssetTags.css'


const AssetTags = ({ categories }) => {

    // ********************************************************************************
    // Use token ID to get categories 
    // Create list using category data with links to tokens in that category
    // ********************************************************************************

    return (
        <ul className='tag-list'>
            { categories.map( tag => {
                return (
                    <li key={ uuid() } className='tag-badge'>
                        <a href={ `/Crypto/Browse?category=${ tag.id }` } className='tag-link'>
                            { tag.name }
                        </a>
                    </li>
                )
            })}
        </ul>
    )
} 

export default AssetTags