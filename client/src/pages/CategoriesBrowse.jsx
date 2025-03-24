import { React, useEffect, useRef } from "react";
import CryptoAPI from '../APIs/CryptoAPI'
import SortingAPI from '../APIs/SortingAPI'
import CategoryTable from '../components/CategoryTable'
import LoadingIcon from '../components/LoadingIcon'
import './CategoriesBrowse.css'

const CategoriesBrowse = ({ categories, setCategories }) => {

    const sortBy = useRef()
    const sortDirection = useRef()

    const sortCats = (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }
        setCategories(SortingAPI.sortCats(categories, header, sortDirection.current))
        sortBy.current = header
    }

    useEffect(() => {
        const getCategories = async () => {
            if (categories) setCategories(SortingAPI.sortCats(categories, 'market_cap', sortDirection.current))
            else {
                const res = await CryptoAPI.getCats()
                setCategories(SortingAPI.sortCats(res.categories.data, 'market_cap', sortDirection.current))
                return res.categories.status.error_code
            }
        }
        getCategories()
    }, [])

    return (
        <div className='browse-cat-container'>
            <div className='browse-cat-header'>
                Categories
            </div>
            <div className='cat-table-container'>
                { categories ? (
                    <CategoryTable
                        categories={ categories } 
                        sortBy={ sortBy.current } 
                        sortDirection={ sortDirection.current } 
                        sortCats={ sortCats } 
                    />
                ) : (
                    <LoadingIcon />
                )}

            </div>
        </div>
    )
}

export default CategoriesBrowse