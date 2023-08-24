import React, { useEffect, useState } from "react"
import axios from "axios"
import {Link} from 'react-router-dom'
import './Savedposts.css'

const Saved=()=>{
    const [savedposts,setSavedposts]=useState([])
    const token=localStorage.getItem('jwtToken')
    const headers={
        'authToken':token
    }
    const [change,setChange]=useState('false');
    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/author/savedPosts', {headers})
        .then((res)=>{
            setSavedposts(res.data)
            console.log(savedposts)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[change])
    return(
        <div>
            <h3>Saved Posts {}</h3>
             <div className="All_posts">
            {
                
               savedposts.map((item,index)=>{
                
                return(
                    <div className="all_each_post" key={index}>
                    <div className="details">
                        <div className="author">
                            <img src={item.image} className="author_img"/>
                            <div>{item.author_name}</div>
                        </div>
                        <div>
                            <h2 className="title">{item.title}</h2>                                
                        </div>
                        <div className="des" >{item.text.substring(0,50)}</div>
                        <div className="datetime">
                            <div>Publish_date</div>
                            <Link to={`/eachpost/${item.id}`} className="view_more">View More</Link>
                              {console.log(item.id)}
                            </div>
                    </div>
                    <img className="image_post" src={item.image}></img>
                    </div>                        
                )
                
            })
           
            }
            </div>
            
        </div>
    )


}
export default Saved