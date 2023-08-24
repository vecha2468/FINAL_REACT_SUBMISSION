import React, { useEffect, useState,useContext} from "react";
import {Link } from 'react-router-dom'
import axios from "axios"
import Filter from "./FilterPost"
import Large from "../components/wallpaper"
import './Home.css'

const Home=()=>{
    const [posts,setPosts]=useState([])
    const [top,setTop]=useState([])
    const [recommend,setRecommend]=useState([])
    const token=localStorage.getItem('jwtToken')
    useEffect(()=>{
       axios.get('http://127.0.0.1:3000/author/showAll').then((res)=>{
        setPosts(res.data)
       }).catch((err)=>console.log('Error in Show All Posts'))

       axios.get('http://127.0.0.1:3000/get/topPosts').then((res)=>setTop(res.data))
        .catch((err)=>{
            console.log(err)
        })
        },[])
    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/post/recommended').then((res)=>{
            setRecommend(res.data)
        })
        .catch((err)=>console.log(err))
    })
    
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const [filter,setQuery]=useState({
        date:'',
        author:'',
        sort:'',
        search:''
    })
                
    const handleAuthchange=(e)=>{
        setQuery({...filter,author:e.target.value})
    }
    const handledatachange=(e)=>{
        setQuery({...filter,date:e.target.value})

    }
    const handlesortchange=(e)=>{
        setQuery({...filter,sort:e.target.value})
    }
    const handlesearchchange=(e)=>{
        setQuery({...filter,search:e.target.value})
    }    
    if (top.length > 6) {
        top.splice(6, top.length - 6);
      }
    var num=1
            
    return(
        <div className="Home">
            <div className='wallpaper'>
               {token?(''):(<Large/>)}
            </div>
            <div className="trending">
                <div className="trend_head"><i class="fa-solid fa-arrow-trend-up" style={{marginRight:'5px'}}></i>Trending On Medium Clone</div>
                <div className="each_trending">
                {                   
                    top.map((item)=>{
                        return(
                        <div className='each_tre' key={item.id}>
                            <div className="trend_num">{num++}</div>
                            <div className="trend_cont">
                                <div className="image_cont" >
                                    <img src={item.image} className="trend_img"></img>
                                    <span >{item.author_name}</span>
                                 </div>
                                 <span>{item.title}</span>
                                 <div className="trend_time">
                                    <span>{formattedDate}</span>
                                 </div>
                            </div>
                        </div>                       
                    )})
                }
                </div>
            </div> 
        <div className="bottom_cont">
        <div><Filter filter={filter}/></div>  
        <div className="aside">
            <div className="filter_cont">
                <h4>Filters</h4>
            <div className="inputs">
            <input type='text' placeholder="Author NAME" onChange={handleAuthchange} value={filter.author}></input>
            <input type='date' placeholder="Date" value={filter.date} onChange={handledatachange}></input>
            </div>
            <div>
                <select value={filter.sort} onChange={handlesortchange} className="select">
                    <option value=''>Sort By</option>
                    <option value='likes'>By Likes</option>
                    <option value='comments'>By Comments</option>
                </select>
            </div>
            <div>
                <input type='text' placeholder="search" value={filter.search} onChange={handlesearchchange} className="search_box"/>
            </div>
            </div>
            <div>
                <h4 className="topic_name">Topics</h4>
                </div>  
                {token &&
                <div className="following_btn">
                    <h4>Recommendations</h4>
                    {
                        recommend.map((item)=>{
                            return(

                                <div className="recommend_each">
                                <img src={item.featured_image} className="recommend_img"/>
                                <div>{item.title}</div>
                                <i class="fa-solid fa-book-open"></i>
                                </div>
                            )
                            })

                    }

                </div>
            }
        </div>
        
        </div>                    
        </div>
    )
}
export default Home
