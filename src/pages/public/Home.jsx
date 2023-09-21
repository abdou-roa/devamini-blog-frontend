import React from 'react'
import Layout1 from '../../layouts/layout1'
import { Container } from '@mui/material'
import { Outlet, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts/Posts'
import Post from './pages/Post/Post'

export default function Home() {
  return (
    <Layout1>
        <Container sx={{
          padding: '2rem 0rem',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Routes>
            <Route index element={<Posts/>}/>
            <Route path="post/:postId" element={<Post/>}/>
          </Routes>
          <Outlet/>
        </Container>
    </Layout1>
  )
}
