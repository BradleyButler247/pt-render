// import { Navbar, NavItem, NavLink, Nav } from 'reactstrap';
import './NavBar.css';


const NavBar = ({ currUser, logout }) => {
    return (
        currUser.username !== '' ? ( 
        <div id='nav-container'>
            <div id='left-navbar' className='navbar'>
                <a href={`/User/${currUser.username}`} className='nav-item'>Home</a>
                <a href="/Crypto/Browse" className='nav-item'>Tokens</a>
                <a href="/Crypto/Categories" className='nav-item'>Categories</a>
            </div>
            <div id='right-navbar' className='navbar'>
                <a href="/" className='nav-item' onClick={logout}>Logout</a>
            </div>
        </div>
        ) : (
        <div id='nav-container'>
            <div id='left-navbar' className='navbar'>
                <a href="/Crypto/Browse" className='nav-item'>Tokens</a>
                <a href="/Crypto/Categories" className='nav-item'>Categories</a>
            </div>
            <div id='right-navbar' className='navbar'>
                <a href="/Login" className='nav-item'>Login</a>
                <a href="/SignUp" className='nav-item'>Sign Up</a>
            </div>
        </div>
        )
    )
}


export default NavBar