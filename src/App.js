import React, { useState,useEffect } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import SignUp from "./components/Signup"
import SignIn from "./components/SignIn"
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Add from './pages/Adding'
import Eachpost from "./pages/EachPost"
import EditPost from "./pages/EditPost"
import Userposts from "./pages/Userposts"
import Userprofile from "./pages/Profile" 
import Story from "./components/Ourstory"
import Membership from "./components/Membership"
import Saved from "./pages/Savedpost"
import Draftposts from "./pages/UserDrafts"
import Viewother from "./pages/Otherprofiles"
import Large from "./components/wallpaper"


const App=()=>{

  return(
    // HERE WE WILL DECLARE ROUTES FOR EVERY PATH .THIS PAGE IS THE MAIN PAGE 
  <Router>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path='/ourstory' element={<Story></Story>}/>
      <Route path="/membership" element={<Membership/>} />
      <Route path='/userposts' element={<Userposts/>}/>
      <Route path='/userprofile' element={<Userprofile/>}/>
      <Route path='/eachpost/:postId' element={<Eachpost/>}/>
      <Route path="/addpost" element={<Add/>} />
      <Route path="/eachpost/:postId/edit" element={<EditPost/>}/>  
      <Route path='/savedposts' element={<Saved/>}/>
      <Route path='/userdrafts' element={<Draftposts/>}/>
      <Route path='/otheruser/:authorId' element={<Viewother/>}/>
         
    </Routes>
  </Router>)
}

export default App

