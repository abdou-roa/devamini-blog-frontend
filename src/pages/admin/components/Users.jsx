import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material'
  
export default function Users() {
  //get auth token
  const token = localStorage.getItem('access_token')
  //states 
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(2)
  const [roles, setRoles] = useState([])
  const [currentUser, setCurrentUser] = useState(0)
  //load more users in the list
  const handleLoadMore = ()=>{
      setCurrentPage(currentPage+1)
      const fetchUsers = async ()=>{
          const usersResp = await fetch(`http://localhost:8000/api/users?page=${currentPage}`,{
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          })
          const data = await usersResp.json()
          console.log(data.data)
          setUsers(data.data)
      }
      fetchUsers()
  }
  //fetch the first set of users 
  useEffect(()=>{
      const fetchUsers = async ()=>{
          const userResp = await fetch(`http://localhost:8000/api/users`,{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          const data = await userResp.json()
          setUsers(data.data)
      }
      fetchUsers()
  }, [])
//fetch roles
  useEffect(()=>{
    const fetchRoles = async ()=>{
      const response = await fetch('http://127.0.0.1:8000/api/roles',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(response.ok){
        const data = await response.json()
        const roles = data.data
        setRoles(roles)
      }
    }
    fetchRoles()
  },[])

  const setUserRole = (e)=>{
    const roleid = e.target.value
    const userId = currentUser
    const asignRole = async ()=>{
      const response = await fetch(`http://127.0.0.1:8000/api/asign/role/${userId}`,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': roleid
        })
      })
      const data = await response.json()
      console.log(data)
    }
    asignRole()
  }
  
  const  deleUser = ()=>{
    const userId = currentUser
    const deleteUser = async ()=>{
      const response = await  fetch(`http://127.0.0.1:8000/api/delete/user/${userId}`,{
        method: 'DELETE',
        headers:  {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      const data = response.json()
      console.log(data)
    }
    deleteUser()
    setUsers(prevState=>{
      return prevState.filter(user=>user.id !=  userId)
    })
  }
  return (
    <Paper elevation={3}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow
              key={user.id}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
              <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    label="Roles"
                    onMouseOver={()=>{
                      console.log(user.id)
                      setCurrentUser(user.id)
                    }}
                    onChange={setUserRole}
                    sx={{
                        width: '10rem',
                        marginX: '1rem',
                    }}
                    >
                        {roles.map((role)=>{
                            return (
                                <MenuItem key={parseInt(role.id)} value={parseInt(role.id)}>{role.name}</MenuItem>
                        )}
                        )}  
                    </Select>
              </TableCell>
              <TableCell>
                <Button 
                  onClick={deleUser}                     
                  onMouseOver={()=>{
                  console.log(user.id)
                  setCurrentUser(user.id)
                }}>
                      delete
                      </Button>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <Button onClick={handleLoadMore}>Load More</Button>
    </TableContainer>
    </Paper>
  )
}
