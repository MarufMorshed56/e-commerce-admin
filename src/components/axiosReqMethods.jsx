import axios from 'axios'
import {useSelector } from 'react-redux'
const BaseUrl = "http://localhost:5000/api/v1"


// const Token =()=>{

//           const token = useSelector(state=>state.user.token)
//          // console.log("lllll",token)         
//           return(token)
// }
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTlmNzcxZTY5OWEzNzhkNzZmODBhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTc1NjI1OCwiZXhwIjoxNjQwMDE1NDU4fQ.D5HMS_JpCbVeHvdbnFXtKHP5miKpiAK3l4UrGALE5m4"


export const publicRequest =  axios.create({baseURL:BaseUrl}) //creating an Axios Instance

export const userRequest =  axios.create({
          baseURL:BaseUrl,
          headers:{
                    token:`Bearer ${Token}`
          }
})