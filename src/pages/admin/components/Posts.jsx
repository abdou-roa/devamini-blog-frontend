import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Posts() {

    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    
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
        borderRadius: '.6rem',
        height: '30rem',
        padding: '1rem',
        overflowY: 'auto',
        overflowX: 'none'
    }}>
        <Typography variant="h5" component="h2" align='center' sx={{
            marginY: '.5rem'
        }}>
            Latest Posts
        </Typography>
        <TableContainer component={Paper}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                <Button align='right' variant='contained' onClick={()=>{navigate('createPost')}}>Create Post</Button>
            </Box>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Id</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {posts.map((post) => (
                        <TableRow
                        key={post.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>
                            <Link to={`/admin/dashboard/post/${post.id}`}>{post.post_title}</Link>
                        </TableCell>
                        <TableCell>{post.id}</TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            <Button align="right" onClick={()=>{navigate('posts')}}>More posts</Button>
        </TableContainer>
    </Paper>
  )
}
