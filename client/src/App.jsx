import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
export default function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route  path="/" element={<Home/>}></Route>
      <Route  path='/about' element={<About/>}></Route>
      <Route  path='/signin' element={<SignIn/>}></Route>
      <Route  path='/signup' element={<SignUp/>}></Route>
      <Route  path='/profile' element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}