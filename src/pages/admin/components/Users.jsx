import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

function createData(name, calories, fat, carbs, protein) {
return { name, calories, fat, carbs, protein };
}
  
const rows = [
createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
createData('Eclair', 262, 16.0, 24, 6.0),
createData('Cupcake', 305, 3.7, 67, 4.3),
createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function Users() {
//states 
const [users, setUsers] = useState([])
const [currentPage, setCurrentPage] = useState(2)
const token = localStorage.getItem('access_token')
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
  
//?page=${currentPage}

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
          {users.map((user) => (
            <TableRow
              key={user.id}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleLoadMore}>Load More</Button>
    </TableContainer>
    </Paper>
  )
}
