import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MediaCard from '../../components/MediaCard/MediaCard'

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [nextPage, setNexpage] = useState('')
    const fetchPosts = async ()=>{
        if(!nextPage){
            const response = await fetch('http://127.0.0.1:8000/api/posts')
            const data = await response.json()
            setNexpage(data.next_page_url)
            setPosts(data.data)
        }else{
            const response = await fetch(nextPage)
            const data = await response.json()
            setNexpage(data.next_page_url)
            setPosts(data.data)
        }
        
    }
    useEffect(()=>{
        fetchPosts()
    }, [])
  return (
    <div className='container'>
        <Grid container spacing={2} sx={{margin: '0rem auto'}}>
            {posts.map((post)=>{
                return (
                    <Grid key={post.id} item>
                        <MediaCard post={post}/>
                    </Grid>
                )
            })}
        </Grid>
        <Button variant='contained' sx={{margin:'2rem 0rem 0rem 0rem'}} onClick={fetchPosts}>Load More</Button>
    </div>
  )
}
