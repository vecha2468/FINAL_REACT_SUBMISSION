import React,{useEffect, useState} from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Userposts.css'

const Userposts=()=>{
    const [userposts,setUserposts]=useState([])
    const [author,setAuthor]=useState('')
    const token=localStorage.getItem('jwtToken')
    const {postId}=useParams()
    const headers={
        'authToken':token
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
        .then((res)=>{
            setUserposts(res.data)
            console.log(userposts)
            setAuthor(res.data[0].author_name)
            console.log('Successfully fetched')    
        })
        .catch((err)=>{
            console.log(err)
        })       
    },[])

    const handledelete=(postId)=>{
        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
        .then((res)=>{
            console.log('successfully deleted')
        })
        .catch((err)=>{
            console.log('failed to delete')
        })

        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
        .then((res)=>{
            setUserposts(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <h3>Your Posts {author}</h3>
            <div className="All_posts">
            {
                
               userposts.map((item)=>{                
                return(
                    <div className="all_each_post" key={item.id}>
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
                            <Link to={`/eachpost/${item.id}/edit`}>Edit</Link>
                            <Link onClick={()=>handledelete(item.id)}>Delete</Link>
                            <Link to={`/eachpost/${item.id}`} className="view_more">View More</Link>
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
export default Userposts

