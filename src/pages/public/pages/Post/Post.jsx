import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify  from 'dompurify';
import './Post.css'

export default function Post() {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(()=>{
        const fetchPost = async ()=>{
            const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}`)
            if(response.ok){
                const data = await response.json()
                setPost(data)
            }
        }
        fetchPost()
    }, [])

    function createMarkup(html) {
        return {
          __html: DOMPurify.sanitize(html)
        }
    }
return (
    <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
            <img className='img' src={`http://127.0.0.1:8000/storage/${post.post_image}`} alt="" />
            <Typography variant='h2' component='h1' sx={{
                margin: '2rem 0rem'
            }}>{post.post_title}</Typography>
                <Box
                    className="preview"
                    dangerouslySetInnerHTML={createMarkup(post.post_body)}>
                </Box>
        </Box>
    </Box>
)
}
