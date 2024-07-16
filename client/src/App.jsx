import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./Components/Header";
import PrivateRoute  from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing.jsx";
import Search from "./pages/Search.jsx";


export default function App() {
  return (
    <BrowserRouter >
    <Header></Header>
    <Routes>
      <Route  path="/" element={<Home/>}></Route>
      <Route  path='/about' element={<About/>}></Route>
      <Route  path='/signin' element={<SignIn/>}></Route>
      <Route  path='/signup' element={<SignUp/>}></Route>
      <Route path='/search' element={<Search />} />
      <Route  path='/listing/:listingId' element={<Listing/>}></Route>
      <Route element={<PrivateRoute/>}>
        <Route  path='/profile' element={<Profile/>}></Route>
        <Route  path='/create' element={<CreateListing/>}></Route>
        <Route  path='/update/:listingId' element={<UpdateListing/>}></Route>
      </Route>
    
    </Routes>
    </BrowserRouter>

  )
}