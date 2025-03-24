import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import LoadingIcon from './LoadingIcon'
import './DropdownCat.css'


const DropdownCat = ({ options, catID }) => {

    const navigate = useNavigate()
    const [ page, setPage] = useState( 10 )
    const [ selectedCat, setSelectedCat ] = useState()
    const [ isOpen, setIsOpen ] = useState( false );

    const toggleDropdown = () => setIsOpen(( prevState ) => !prevState )
    const loadMore = () => { setPage( page + 10 ); }
    const clearCat = () => { setSelectedCat(''); navigate( `/Crypto/Browse` )}

    useEffect(() => {
        setIsOpen(false)
        if ( options && catID ) setSelectedCat( options.find( cat => cat.id === catID ))
    }, [ options, catID ])

    return (
        <div className='dropdown-container'>
            <div className={ `dropdown` }>
                { !selectedCat ? (
                    <>
                    <div onClick={ toggleDropdown }>Categories</div>
                    <div className='caretDown' >
                        <FontAwesomeIcon icon={ faCaretDown } onClick={ toggleDropdown } />
                    </div>
                    </>
                ) : (
                    <>
                    <div onClick={ toggleDropdown }>{ selectedCat.title }</div>
                    <div className='closeBtn' >
                        <FontAwesomeIcon icon={ faXmark }  onClick={ clearCat } />
                    </div>
                    </>
                )} 
            </div>
            <ul className={ `dropdown-content ${ isOpen }` }>
                { options ? (
                    <>
                    { options.map(( item, idx ) => {
                        if ( idx <= page ){
                            return (
                                <li className='dropdown-item' key={ uuid() } onClick={ () => navigate( `/Crypto/Browse?category=${ item.id }` ) }>
                                    { item.name }
                                </li>
                            )
                        }
                    })}
                    {/* <li className='load-more' onClick={ loadMore }>
                        <FontAwesomeIcon icon={ faCaretDown }/>
                    </li>       */}
                    </>             
                ) : (
                    <li className='dropdown-item'>
                        <LoadingIcon />
                    </li>
                )}  
            </ul>
            <div className={ `load-more ${ isOpen }` } onClick={ loadMore }>
                    <FontAwesomeIcon icon={ faCaretDown }/>
            </div> 
        </div>
        // <Dropdown isOpen={ dropdownOpen } toggle={ toggle } direction='down' className='d-flex mx-2'>

        //     <DropdownToggle caret  style={{ backgroundColor: '#A64E46' }}>
        //         {!selectedCat ? type : selectedCat.title}
        //     </DropdownToggle>
        //     <DropdownMenu dark className='pb-0'>
                // {options ? (
                //     options.map((item, idx) => {
                //         if (idx <= page){
                //             return (
                //                 <DropdownItem key={uuid()} onClick={() => navigate(`/Crypto/Browse?category=${item.id}`)}>
                //                         {item.name}
                //                 </DropdownItem>
                //             )
                //         }
                //     })                   
                // ) : (
                //     <DropdownItem>
                //         <LoadingIcon />
                //     </DropdownItem>
                // )}
        //         <DropdownItem className='text-center' onClick={() => loadMore()}>
        //             <FontAwesomeIcon icon={faCaretDown} />
        //         </DropdownItem>  
        //     </DropdownMenu>
        //     {selectedCat ? (
        //         <FontAwesomeIcon 
        //             icon={faXmark} 
        //             className='my-auto mx-2 p-1' 
        //             style={{cursor: 'pointer'}} 
        //             onClick={() =>  clearCat()}
        //         />
        //     ) : (
        //         <></>
        //     )}
            
        // </Dropdown>
    )
}

export default DropdownCat