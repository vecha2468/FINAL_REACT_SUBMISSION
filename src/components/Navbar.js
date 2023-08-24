import React, { useContext,useState,useEffect} from "react"
import {Link } from 'react-router-dom'
import './file.css'
import { useNavigate } from "react-router-dom"

const Navbar=()=>{
    const [status,setStatus]=useState(false)
    const [flag,setFlag]=useState(false)
    const token=localStorage.getItem('jwtToken')
    const navigate=useNavigate()

    useEffect(()=>{
        setStatus(!!token)
    })

    const hanglelog=()=>{
        localStorage.removeItem('jwtToken')
        navigate('/')
        localStorage.clear()
        setStatus(false)
    }
    const toggleDropdown = () => {
        setFlag(!flag);
      }

    return(
        <div className="navbar">
            <div className="nav_container">
                <div >
                    Medium Clone
                </div>
                <div className="nav_elements">
                    <Link className="nav_home" to='/'>Home</Link>
                   <Link className="ourstory" to='/ourstory'>Our Story</Link>
                   <Link className="membership" to='/membership'>MemberShip</Link>
                   <Link className="write" to='/addpost'>Write</Link> 
                   {  status ?(<Link onClick={hanglelog}>Logout</Link>):(<Link to='/signin' className="sign_nav">Sign In</Link>)
                   }
                   <div className="Profile_view">
                   {status && (
                    <div>
                    <div className="nav_profile"><Link to='/userprofile'><i class="fa-solid fa-user" style={{marginRight:'8px'}}></i>My Profile</Link></div>
                 </div>
                  
                   )}
                   </div>
                </div>
            </div>

        </div>
    )
}
export default Navbar