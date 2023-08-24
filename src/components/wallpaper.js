import React from "react";
import {Link } from 'react-router-dom'
const Large=()=>{
    const token=localStorage.getItem('jwtToken')
    console.log(token)
    return(
        <div className="large_image">
            <div className="large_text">
            <div>STAY TUNED</div>
            <div style={{fontSize:'20px'}}>Discover stories, thinking, gaining knowledge and expertise from writers on any topic.</div>
            <Link to='/signin'> <button className="start_reading">Start Reading</button></Link>
            </div>
        </div>
    )
}
export default Large