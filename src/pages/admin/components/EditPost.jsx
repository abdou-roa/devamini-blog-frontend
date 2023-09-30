import { Paper, Typography, TextField, Box, Select, MenuItem, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'


//draftjs editor imports 
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify  from 'dompurify';
import { useParams } from 'react-router-dom';



export default function EditPost() {
    //getting the authentication token from the local storage
    const token = localStorage.getItem('access_token')

    //fetch the post with the specified id
    const {postId} = useParams()

    //states
    const [editorContent, setEditorContent] = useState('body not provided')
    const [editorState, setEditorState] = useState(
        () => {
            const blocksFromHTML = convertFromHTML(editorContent);
            const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
            );
            return EditorState.createWithContent(contentState)               
        },
    );
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [convertedContent, setConvertedContent] = useState(null)
    const [postTitle, setPostTitle] = useState('')
    const [postCategory, setPostCategory] = useState('')
    const [postImage, setPostImage] = useState()

    useEffect(()=>{
        const blocksFromHTML = convertFromHTML(editorContent);
        const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
        );
        setEditorState(EditorState.createWithContent(contentState))
    }, [editorContent])
    
    useEffect(()=>{
        const fetchPost = async ()=>{
            const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}`)
            if(response.ok){
                const post = await response.json()
                setEditorContent(post.post_body)
                setPostTitle(post.post_title)
                setPostCategory(post.category_id)
                setPostImage(post.post_image)
            }else{
                console.log('couldn\' fetch this particular post')
            }
        }
        fetchPost()
    }, [])

    useEffect(()=>{
    //fetch categories
      const fetchCategories = async ()=>{
        const response = await fetch('http://127.0.0.1:8000/api/categories')
        if(response.ok){
            const categories = await response.json()
            setFetchedCategories(categories.data)
        }
      }
      fetchCategories()
    }, [])

    
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);


    function createMarkup(html) {
        return {
          __html: DOMPurify.sanitize(html)
        }
    }

    const handleUpload = (e)=>{
        const file = e.target.files[0]
        setPostImage(file)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const submitPost = async ()=>{
            try{
                // const formData = new FormData()
                // formData.append('_method', 'PUT')
                // formData.append('post_title', postTitle)
                // formData.append('post_body', convertedContent)
                // formData.append('category_id', postCategory)
                // formData.append('post_image', postImage)
                const response = await fetch(`http://127.0.0.1:8000/api/update/post/${postId}`,{
                    method: 'put',
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'post_title': postTitle,
                        'post_body' : convertedContent,
                        'category_id' : postCategory
                    })
                })
                
                if(response.ok){
                    const data = response.json()
                    console.log(data)
                    alert('post edited successfully!')
                }else{
                    console.log('post wasn\'t edited successfully')
                    //alert('nop')
                }
        }catch(error){
            console.log(error)
        }
        }
        submitPost()
    }

  return (
    <>
    <Paper elevation={3} sx={{
        borderRadius: '.6rem',
        padding: '3rem'
    }}>
        <Typography variant='h2' component='h1' align='center'>Edit post</Typography>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5rem'}}>
            <form onSubmit={handleSubmit} sx={{border: '1px solid black', width :'75%'}}>
                <Box sx={{
                    width: '75%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0rem auto'
                }}>
                    <TextField id="outlined-basic" label="title" variant="outlined" value={postTitle} onChange={e=>setPostTitle(e.target.value)} sx={{
                        width: '20rem',
                        marginX: '1rem'
                    }}/>
                    <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={postCategory}
                    label="Age"
                    onChange={e=>setPostCategory(e.target.value)}
                    sx={{
                        width: '20rem',
                        marginX: '1rem'
                    }}
                    >
                        {fetchedCategories.map((category)=>{
                            return (
                                <MenuItem key={parseInt(category.id)} value={parseInt(category.id)}>{category.category_name}</MenuItem>
                        )}
                        )}  
                    </Select>
                </Box>

                <Box sx={{
                    margin: '4rem auto 1rem auto',
                    width: '75%',
                    }}>
                    <Typography variant='h4' component='h3' sx={{marginY: '.5rem'}}>Post body</Typography>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />
                </Box> 

                <Box sx={{
                    margin: '3rem auto',
                    width: '75%',
                    }}>                    
                        <input type='file' onChange={handleUpload}/>            
                </Box>

                <Box sx={{
                    margin: '0rem auto',
                    width: '75%',
                    }}>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Box>
            </form>
        </Box>
    </Paper>
    {/* <Typography variant='h2' component='p' sx={{margin: '5rem 2rem 3rem 2rem'}}>Preview: </Typography>
    <Box
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
    </Box> */}
    </>
  )
}
