import React from "react";
import { useState} from "react";
import axios from 'axios'
import nature from './happiness.jpg'
import { Link } from "react-router-dom";

const PostStruct=({id,title,topic,text,views,created_at,image,author,para})=>{

    return(

        <div className="post_home_cont">
            {console.log(title)}
            
        <div className="post_struct">
            <div className="author_info_home">
                <img src={image} className="author_home"></img>
            </div>
            <h2>{title}</h2>
            <h3>{topic}</h3>
            <p>{text.substring(0, 300)}</p>
            <span>{created_at}</span>
        </div>
        <div className="post_image">
            <img src={nature} alt='image' className="home_image"></img>
        </div>
        <div>
            <Link to={`/eachpost/${para}`}>View More</Link>
        </div>
        
        </div>
    )
}
export default  PostStruct