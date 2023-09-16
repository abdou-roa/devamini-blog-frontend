import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Posts() {
    const [fetchedPosts, setFetchedPosts]=useState([])
    const [nextPage, setNextpage]=useState(2)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch('http://127.0.0.1:8000/api/posts')
            if(response.ok){
                const posts = await response.json()
                const data = posts.data
                setFetchedPosts(data)
            }else{
                console.log('no data fetched!')
            }
        }
        fetchPosts()
        console.log(fetchedPosts)
    }, [])

    const loadMorePosts = async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/api/posts?page=${nextPage}`)
            if(response.ok){
                const posts = await response.json()
                const data = posts.data
                setFetchedPosts(prevState=>{
                    return [...prevState, ...data]
                })
            }else{
                console.log('no data fetched!')
            }
            handleLoadMore()
    }
    const handleLoadMore = ()=>{
        setNextpage(nextPage+1)
    }

  return (
    <>
    <Paper elevation={3} sx={{
        borderRadius: '.6rem',
        padding: '3rem'
    }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Post Id</TableCell>
                    <TableCell>Post Title</TableCell>
                    <TableCell>Post Author</TableCell>
                    <TableCell>action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                fetchedPosts.map((post)=>{
                    return (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>{post.post_title}</TableCell>
                            <TableCell>{post.user_id}</TableCell>
                            <TableCell>
                                <Button onClick={()=>{navigate(`/admin/dashboard/editPost/${post.id}`)}}>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )
                })
                }
            </TableBody>
        </Table>
        <Button onClick={loadMorePosts}>Load More</Button>
    </Paper>
    </>
  )
}
