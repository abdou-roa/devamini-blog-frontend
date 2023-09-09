//lib and packages imports 
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counterSlice";
import userCreationSlice from "../features/userCreationSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
    reducer:{
        counter: counterSlice,
        userSignUp: userCreationSlice,
        userInfo: userSlice
    },
})