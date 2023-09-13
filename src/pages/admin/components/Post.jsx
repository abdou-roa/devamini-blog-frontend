import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'

//my imports 
import { useParams } from 'react-router-dom'

export default function Post() {
    //hooks
    const params = useParams()
    const [postData, setPostData] = useState({})

    const postId = params.postId
    useEffect(()=>{
        const fetchPost = async ()=>{
            const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}`)
            const data = await response.json();
            setPostData(data)
        }
        fetchPost()
    }, [])
    /**this page must be protected by auth ofc
    then it will contain two form fields (post_title, category_id (a select input as a separate component which will render categories from an api endpoint) and post_image as a simple text field)
    then a texteditor field (draftjs)
    i will handle all of this using react useState hook (post_title, post_body, post_body, user_id #from local storage, ) **/
  return (
    <div>post {postId}</div>
  )
}
