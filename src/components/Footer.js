import React from "react";
import {Link} from 'react-router-dom'
import './file.css'

const Footer=()=>{
    return(
        <div className="footer">
            <Link className='About'>About</Link>
            <Link className='Terms'>Terms</Link>
            <Link className='Help'> Help</Link>
        </div>
    )
}
export default Footer