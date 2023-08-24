import React from "react"
import axios from 'axios'
import { useState,useEffect } from "react"
import './Home.css'
import {Link} from 'react-router-dom'
const Filter=({filter})=>{
    const [filteredPosts, setFilteredPosts] =useState([])


    useEffect(()=>{
        if(filter.author!='')
        {
        axios.get(`http://127.0.0.1:3000/get/post/author/${filter.author}`).then((res)=>setFilteredPosts(res.data))
        .catch((err)=>{
            console.log('error in filter by author',err)
        })}

        else if(filter.sorting!=''){
        axios.get(`http://127.0.0.1:3000/get/post/filter/likesAndComments/${filter.sorting}`).then((res)=>setFilteredPosts(res.data))
        .catch((err)=>{
            console.log('error in filter by sorting',err)
        })}

        else if(filter.date!=''){
        axios.get(`http://127.0.0.1:3000/get/post/filter/date/${filter.date}`).then((res)=>setFilteredPosts(res.data))
        .catch((err)=>{
            console.log('error in date filter',err)
        })}
       
        else if(filter.query!=''){
        axios.get(`http://localhost:3000/posts/search?search=${filter.search}`)
        .then(
            (res)=>setFilteredPosts(res.data)
            )
        .catch((err)=>{
            console.log('error in searching',err)
        })}

        else{
        axios.get('http://127.0.0.1:3000/posts/all').then(
            (res)=>setFilteredPosts(res.data))
        .catch((err)=>{
            console.log('error in all posts',err)
        })}

    },[filter])
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return (
        <>
           <div className="All_posts">
            {
                filteredPosts.map((item)=>{
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
                                <div>{formattedDate}</div>
                                <Link to={`/eachpost/${item.id}`} onClick={()=>{
                                    axios.post(`http://127.0.0.1:3000/add/view/${item.id}`)

                                }} className="view_more">View More</Link>
                                <i class="fa-regular fa-eye"></i>
                                <span>{item.view_count}</span>
                                </div>
                        </div>
                        <img className="image_post" src={item.image}></img>
                        </div>                        
                    )
                })
            }
        </div>
        </>        
    )
}
export default Filter