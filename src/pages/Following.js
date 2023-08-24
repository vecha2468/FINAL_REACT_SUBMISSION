import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherProfile =({authorId})=>{
    const [author, setAuthor] = useState({})
    const [Following, setFollowing] = useState(false)
   /*useEffect(() => {
        axios.get().then((response) => {setAuthor(response.data)})
        axios.get(`/api/authors/${authorId}/isFollowing`).then((response) => 
        {
            setFollowing(response.data.Following)
          })
        }, [authorId])*/

    const handleFollow = () => {           
        axios.post().then((response) => {
        setFollowing(true);
            })
        }

    const handleUnfollow = () => {
        axios.post().then((response) => {
              setFollowing(false)
            })
        }
    
    
    return(
        <div>
            <h2>Other author Info</h2>
            <p>Other author bio</p>
            {Following ? 
            (<button onClick={handleUnfollow}>Unfollow</button>) 
            : 
            (<button onClick={handleFollow}>Follow</button>)
            }

        </div>
    )
}

export default OtherProfile;