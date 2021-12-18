import React,{useState} from 'react'

import styled from "styled-components";

import { Link } from 'react-router-dom';

import {login} from "../redux/apiCall"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
          

const Container = styled.div`
          width: 100vw;
          height:100vh;
          background:url('https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png') center;
          background-size:cover;
          display:flex;
          overflow:hidden;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
`
const GlassBack = styled.div`
          opacity:0.8;
          background-color:white;
          height:60vh;
          border-radius: 15px;
          width: 370px;
          position: absolute;
          z-index: 2;
`

const Wrapper = styled.div`
          width: 300px;
          padding: 40px;
          position: absolute;
          z-index: 3;
`;

const Title = styled.h1`
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 800;
          text-align:center;

`;

const Form = styled.form`
          display: flex;
          flex-direction:column;
          align-items: center;
          justify-content: center;
`;

const Input = styled.input`
          flex: 1;
          min-width: 70%;
          margin-top: 10px;
          padding: 10px;
          background: transparent;
          border: 2px solid;
          border-radius: 10px;
          font-weight: 1000;
`;

const Buttons =styled.div`
          display:flex;
          width: 60%;  
          align-items: center;
          justify-content: space-around;
          margin-top: 20px;
          margin-bottom: 20px;

`

const SecondButtons =styled.div`
          display:flex;
          width: 100%;  
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          margin-bottom: 20px;

`

const Button = styled.button`
          width: 80px;     
          border: none;
          padding: 10px 20px;
          margin-left:10px ;
          background-color: teal;
          color: white;
          cursor: pointer;
          border-radius: 10px;
// ************************************************ //
          &:disabled{ // THIS SYNTAX MEANS "IF DISABLED"
                    color:black;
                    cursor:not-allowed;
          }
// ************************************************ //
`;

const ButtonTwo = styled.button` 
          width:150px;
          height:45px;
          border: none;
          padding: 10px 20px;
          margin-left:10px ;
          background-color:teal;
          color:black;
          cursor: pointer;
          border-radius: 10px;

`;

const Link2 = styled.a`
          margin: 5px 0px;
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
`;


const Login = () => {

          const [username, setUsername]= useState("")
          const [password, setPassword]= useState("")
          const dispatch = useDispatch()

          const handleClick =(e)=>{
                    e.preventDefault();
                    login(dispatch,{username,password}) // here we passed in values to "login" component which is "apiCall.js". & from "apiCall.js" we made "axios" req to the api & authenticated the user

                    //error && setTimeout(function () {document.getElementById('errorId').style.display='none'}, 3000)
                    // I have set a  timeout function so  after clicking "login" button if "error" occurs then "Error msg" will be shown for 3 seconds & then the "setTimeOut" funtion will set the "Error msg" component's display to "none", thus hidding it after 3 sec
                    
          }

          const {isFetching, error} = useSelector((state)=>state.user)
          return (
                    <Container>
                    <GlassBack/>
                    <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                    <Input onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
                    <Input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
                    <Buttons>
                              <Button disabled={isFetching} onClick={handleClick}>LOGIN</Button>
                              {/*  Basically at the begining "isFetching" is "false" so "disable=false" so button is enabled but when we click it  for a few moment "isFetching" goes from "false" to "true" & then "false" again, so button becomes diabled momenterily when database is getting accesed */}
                    </Buttons>
                    {/* {error &&  <Error id="errorId">Something Went Wrong</Error>} */}
                               {/* this means if condition so if error exists , then show this msg */}
                    <Link2>FORGOT PASSWORD !!!</Link2>
                    <Link2>CREATE A NEW ACCOUNT</Link2>
                    </Form>
                    <SecondButtons>
                    <ButtonTwo>
                    <Link style={{"textDecoration":"none","color":"white"}} to ="/">
                    Go to Home</Link>
                    </ButtonTwo>
                    {/* <ButtonTwo>
                    <Link  style={{"textDecoration":"none", "color":"white"}} to ="/products">Go to Products
                    </Link>
                    </ButtonTwo> */}
                    </SecondButtons>

                    </Wrapper>
                    </Container>
          )
}

export default Login