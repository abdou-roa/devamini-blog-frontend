//lib... imports
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement} from '../features/counterSlice'

//file imports components...

import React from 'react'

export default function Counter() {
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch()
  return (
    <div>
        
        Welcome to Counter
        <br/>

        count : {count}

        <br/>

        <button onClick={()=>dispatch(increment())}>increment</button>
        <button onClick={()=>dispatch(decrement())}>decrement</button>

    </div>
  )
}
