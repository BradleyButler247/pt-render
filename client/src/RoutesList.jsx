import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Browse from './pages/Browse'
import CategoriesBrowse from './pages/CategoriesBrowse'
import CategoriesTokenList from './pages/CategoriesTokenList'
import AssetDetails from './pages/AssetDetails'

const RoutesList = ({ register, login, editUser, currUser, flashMsg, setFlashMsg, token, setToken, categories, setCategories, updateFavorite, addTrade }) => {
    return (
        <Routes>
            <Route exact={true} path="/Login" element={<Login 
                                                            currUser={currUser} 
                                                            login={login} 
                                                            flashMsg={flashMsg} 
                                                            setFlashMsg={setFlashMsg} 
                                                        />} />

            <Route exact={true} path="/Signup" element={<SignUp 
                                                            register={register} 
                                                            currUser={currUser} 
                                                            flashMsg={flashMsg} 
                                                            setFlashMsg={setFlashMsg} 
                                                        />} />

            <Route exact={true} path="/User/:username" element={<Profile 
                                                        editUser={editUser}
                                                        currUser={currUser} 
                                                        flashMsg={flashMsg} 
                                                        setFlashMsg={setFlashMsg} 
                                                        addTrade={addTrade}
                                                        updateFavorite={updateFavorite}
                                                    />} />


            <Route exact={true} path="/Crypto/Browse" element={<Browse 
                                                                    currUser={currUser} 
                                                                    categories={categories}
                                                                    setCategories={setCategories}
                                                                    updateFavorite={updateFavorite}
                                                                />} />

            <Route exact={true} path="/Crypto/Categories" element={<CategoriesBrowse
                                                                        categories={categories}
                                                                        setCategories={setCategories}
                                                                    />} />

            <Route exact={true} path="/Crypto/Categories/:ID" element={<CategoriesTokenList 
                                                                            currUser={currUser} 
                                                                            updateFavorite={updateFavorite}
                                                                        />} />

            <Route exact={true} path="/Crypto/:ID" element={<AssetDetails
                                                                setToken={setToken}
                                                                token={token}
                                                            />} /> 

            <Route exact={ true } path="*" element={ 
                currUser.username === '' 
                    ? <Navigate to='/Login' /> 
                    : <Navigate to={ `/User/${ currUser.username }` }  
                /> } 
            />
        </Routes>
      );
}

export default RoutesList