import {createSlice} from '@reduxjs/toolkit'

export const productSlice = createSlice({
          name:"product",
          initialState:{
                    products:[],
                    isFetching:false,
                    error:false,
          },
          reducers:{// GET ALL
                 getProductStart:(state)=>{
                     state.isFetching=true;
                     state.error = false;
                 },
                  getProductSuccess: (state,action) => {
                        state.isFetching = false;
                        state.products = action.payload;
                 }, 
                 getProductFailure: (state) => {
                        state.isFetching = false;
                        state.error = true;
                     },
                 updateProduct: (state, action) => {
                        state.products[state.products.findIndex((item)=>item._id===action.payload._id)]=action.payload;
                 }// very important, this is how you mutate the original redux state, this can only be done using @redux/toolkit
                 }
})

export const { getProductFailure, getProductStart, getProductSuccess, updateProduct} = productSlice.actions

export  default productSlice.reducer