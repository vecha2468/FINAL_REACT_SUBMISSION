import React,{useState,useEffect} from "react";
import axios from 'axios' 
import './style1.css'
import { useNavigate } from "react-router-dom";

// THIS PAGE Is for creating the new post 
const Add = ()=> {
    const [title, setTitle] = useState('')
    const [topic,setTopic]=useState('')
    const [content,setContent]=useState('')
    const [img,setImg]=useState(null)
    const navigate=useNavigate()
    const token=localStorage.getItem('jwtToken')
    
    const headers={'authToken':token}

    useEffect(()=>{
        if(!token)
        {
            navigate('/signin')
        }
    })

    const handleImage=(e)=>{
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });

        axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((res)=>{
            setImg(res.data.file_url)
        })
        .catch((err)=>console.log('upload failed'))
        setImg(file)
    }

    const handlepublish=()=>{
        const postdata={
            title:title,
            topic:topic,
            text:content,
            featured_image:img,
        }
        console.log(postdata);

        axios.post('http://127.0.0.1:3000/create/post',postdata,{headers})
        .then((res)=>console.log('Post Drafted'))
        .catch((err)=>console.log(err))
        navigate('/')        
    }

    const handleDraft=()=>{
        const postdata={
            title:title,
            topic:topic,
            text:content,
            featured_image:img
        }
        console.log(postdata);
        axios.post('http://127.0.0.1:3000/draft/create',postdata,{headers})
        .then((res)=>console.log('Post Drafted'))
        .catch((err)=>console.log(err))
        navigate('/') 
    }
    
    return(
        <>
        <div className="add_post">
            <h3 className='adding_title' style={{marginLeft:'-70px'}}>Add</h3>
            <div className="add_form">
                <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title..."/>
                <input type='text' value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="Enter Topic..."/> 
                <textarea  value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Enter Content..."/>

                <input type="file" accept="image/*" onChange={handleImage} />
                <button onClick={handlepublish}>Publish</button>
                <button onClick={handleDraft}>Draft</button>
            </div>
        </div>
        </>
    )
}
export default Add

