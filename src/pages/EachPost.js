import React, { useEffect, useState,useContext } from "react"
import {useNavigate,Link } from "react-router-dom"
import axios from 'axios'
import './EachPost.css'
import { useParams } from "react-router-dom"

const Eachpost =()=>{ 
    const token=localStorage.getItem('jwtToken')
    const [eachpost,setEachpost]=useState([])
    const [liked,setLiked]=useState(false)
    const [saved,setSaved]=useState(false)
    const [followed,setFollowed]=useState(false)
    const [commented,setCommented]=useState(false)
    const [comments,setComments]=useState([])
    const [addcommenttext,setAddcommenttext]=useState('')
    const [addcommentbox,setAddcommentbox]=useState(false)
    const {postId}=useParams()
    var flag=false
    const headers={
        'authToken':token
    }
    const dateTimeString = eachpost.published_at
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    useEffect(()=>{
              axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
              .then((res) => {
                setEachpost(res.data) 
                console.log(eachpost)              
              })
              .catch((error) => {
                console.error('Error fetching posts: ', error)      
              });
            } 
               
          
        , [])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3000/like/already/liked?post_id=${postId}`,{headers}).then((res)=>setLiked(res.data.success))
        .catch((err)=>console.log(err))
    },[liked])

    useEffect(()=>{
        axios.get(` http://127.0.0.1:3000/comment/all/${postId}`).then((res)=>setComments(res.data))
        .catch((err)=>console.log(err))

        axios.get(`http://127.0.0.1:3000/check/follow/${eachpost.author_id}`, {}, {headers})
        .then((res)=>setFollowed(res.data.success))
        .catch((err)=>console.log(' error',err))
    },[])

    const handlelike=()=>{
        axios.post(`http://127.0.0.1:3000/like/create/${postId}`,{},{headers}).then((res)=>setLiked(true))
        .catch((err)=>console.log(err))
    }

    const handledislike=()=>{
        axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`,{headers})
        .then((res)=>setLiked(false))
        .catch((err)=>console.log(err))
    }

    const handlefollow=()=>{
        axios.post(`http://127.0.0.1:3000/author/follow/${eachpost.author_id}`,{},{headers})
        .then((res)=>{
            setFollowed((prev)=>!prev)
        })
        .catch((err)=>console.log('error',err))
    }

    const handlesave=()=>{
        axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers}).then((res)=>setSaved(true))
        .catch((err)=>console.log(err))

    }

    const openbox=()=>{
        setAddcommentbox(true)
    }
    const closebox=()=>{
        setAddcommentbox(false)
        setAddcommenttext('')
    }

    const handleCommentChange=(e)=>{
        setAddcommenttext(e.target.value)
    }

    const handlecomment=()=>{
        if(addcommenttext!=='')
        {
            const eachcomment={
            post_id:postId,
            text:addcommenttext}
            setAddcommenttext('')
            axios.post('http://127.0.0.1:3000/comment/create', eachcomment, { headers })
            .then((res)=>{
                setCommented(true)
                flag=true
            })
            .catch((err)=>console.log(err))
            axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
            .then((res)=>{
                setComments(res.data)
                console.log(comments)
            })
            .catch((err)=>console.log(err))
    }
    }
    return (
        <>      
        <div className="each_post">
            <div className="content_each">
                <h1 className="each_post_title">{eachpost.title}</h1>
                <div className="userdetails">
                    <img src={eachpost.image} style={{width:'50px',height:'50px',borderRadius:'20px',padding:'5px'}}></img>
                    <div className="user"> 
                    <Link to={`/otheruser/${eachpost.author_id}`} className='eachpost_author'>{eachpost.author_name}</Link>
                    <p>Published-On :{formattedDate}</p></div>

                </div>
            <hr/>
            <div className="buttons_each">
            <div className="follow_btn">
                <button onClick={handlefollow}>{followed? 'Follow' : 'Following'}</button>
            </div>
            <div className="comment_btn">
                <button onClick={openbox}>Comment</button>
                <p>{eachpost.comments_count}</p>
            </div>
            <div className="like_btn">
                {liked?(<button onClick={handledislike}>DisLike</button>):(<button onClick={handlelike}>Like</button>)}
                {liked?(<p>{eachpost.likes_count+1}</p>):(<p>{eachpost.likes_count}</p>)}
            </div>
            <div className="saved">
                {
                    saved?(<div>Saved</div>):(<button onClick={handlesave}>Save</button>)
                }
                
            </div>
            </div>
            {
                addcommentbox&&(
                    <div className="comment_box">
                        <div className="close_button">
                            <button onClick={closebox}>X</button>
                        </div>
                        <textarea rows='3' cols='40' value={addcommenttext} onChange={handleCommentChange} placeholder="ENTER COMMENT"/>
                        <button onClick={handlecomment}>Submit</button>
                        <ul>
                            {comments.map((item,index)=>{
                                <li className="each_comment" key={index}>
                                    <p className="comm_author">{commented.author_name} </p>
                                    <p className="comm_date">
                                        {Comment.comment_date}
                                    </p>
                                    <p className="comm_text">{commented.text}</p>

                                </li>
                            })}
                        </ul>

                    </div>
                )
            }
            <img src={eachpost.image} className="blog_image"></img>                
            <p className="each_content">{eachpost.text}
            </p>                            
           
         </div>
        </div>
        </>
    )

}
export default Eachpost