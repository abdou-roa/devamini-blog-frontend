import { Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Posts() {

    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch('http://127.0.0.1:8000/api/posts')
            const data = await response.json()
            const fetchedPosts = data.data
            setPosts(fetchedPosts)
            console.log(posts)
        }
        fetchPosts()
    }, [])
  return (
    <Paper elevation={3} sx={{
        padding: '1rem',
        borderRadius: '.6rem'
    }}>
        <Typography variant="h5" component="h2" align='center' sx={{
            marginY: '.5rem'
        }}>
            Latest Posts
        </Typography>
        <List dense={false} >

            {posts.map((post)=>{
                return (
                <div key={post.id}>
                    <ListItem>
                    <Link to={`/admin/post/${post.id}`}>{post.post_title}</Link>
                    </ListItem>
                    <Divider/>
                </div>
                )
            })}
        </List>
    </Paper>
  )
}
