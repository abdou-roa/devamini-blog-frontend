import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ''
}

export const csrfSlice = createSlice({
    name: 'csrfSlice',
    initialState,
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload
        }
    }
}) 

export const {setToken} = csrfSlice.actions
export default csrfSlice.reducer