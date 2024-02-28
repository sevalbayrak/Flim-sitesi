import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: false,
   

};
 const auht = createSlice({
    name:'auht',
    initialState,
    reducers:{
        loginol:(state,action) =>{
           
            state.user = action.payload


        },
        logoutol:state => {
            
            state.user =false
        }

    }
 })

 export const {loginol,logoutol} = auht.actions;
 export default auht.reducer;