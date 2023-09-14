import { Paper, Typography, TextField, Box, Select, MenuItem, FormControl, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'


//draftjs editor imports 
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify  from 'dompurify';


export default function CreatePost() {

    const token = localStorage.getItem('access_token')
    //states
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [convertedContent, setConvertedContent] = useState(null)
    const [postTitle, setPostTitle] = useState('')
    const [postCategory, setPostCategory] = useState(2)
    const [postImage, setPostImage] = useState(null)
    useEffect(()=>{
              //fetch categories
      const fetchCategories = async ()=>{
        const response = await fetch('http://127.0.0.1:8000/api/categories')
        if(response.ok){
            const categories = await response.json()
            setFetchedCategories(categories.data)
            setEditorState(()=> EditorState.createEmpty(),)
        }
      }
      fetchCategories()
      console.log(fetchedCategories)
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

    const handleSubmit = ()=>{
        const submitPost = async ()=>{
            const formData = new FormData()
            formData.append('post_title', postTitle)
            formData.append('post_body', convertedContent)
            formData.append('category_id', postCategory)
            formData.append('post_image', postImage)

            const response = await fetch('http://localhost:8000/api/add/post',{
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                body: formData
            })
            if(response.ok){
                const data = response.json()
                console.log(data)
                alert('post created successfully!')
            }else{
                console.log('madazetch l post abbana')
                alert('nop')
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
        <Typography variant='h2' component='h1' align='center'>Create post</Typography>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5rem'}}>
            <form onSubmit={handleSubmit} sx={{border: '1px solid black', width :'75%'}}>
                <Box sx={{
                    width: '75%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0rem auto'
                }}>
                    <TextField id="outlined-basic" label="title" variant="outlined" onChange={e=>setPostTitle(e.target.value)} sx={{
                        width: '20rem',
                        marginX: '1rem'
                    }}/>
                    <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={2}
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
    <Typography variant='h2' component='p' sx={{margin: '5rem 2rem 3rem 2rem'}}>Preview: </Typography>
    <Box
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
    </Box>
    </>
  )
}
