import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({

          name:"user",
          initialState:{
                    currentUser:null,
                    isFetching: false,
                    error:false,
                    token:null,
          },
          reducers:{
                    loginStart:(state)=>{
                              state.isFetching = true;
                    },
                    loginSuccess:(state,action)=>{
                              state.isFetching = false;
                              state.currentUser = action.payload;
                    },
                    loginFailure:(state)=>{
                              state.isFetching = false;
                              state.error = true;
                    },
                    loginToken:(state,action)=>{
                              state.token = action.payload;
                    },
                    logOut:(state)=>{
                              state.isFetching = false;
                              state.currentUser = null
                    }
          },
})

export const {loginStart,loginSuccess,loginFailure,logOut,loginToken} = userSlice.actions
export  default userSlice.reducer
