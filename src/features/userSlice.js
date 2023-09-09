import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    userId: '',
    roles: [],
    logged_in: false
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers:{
        setUserName: (state, action)=>{
            state.name = action.payload
        },
        setUserEmail: (state, action)=>{
            state.email = action.payload
        },
        setUserId: (state, action)=>{
            state.userId = action.payload
        },
        setUserRoles: (state, action)=>{
            state.roles = action.payload
        } ,
        setLoginStatus: (state, action)=>{
            state.logged_in = action.payload
        }
    }
})

export const {setUserName, setUserEmail, setUserId,setUserRoles, setLoginStatus} = userSlice.actions
export default userSlice.reducer