import { loginFailure,loginStart, loginSuccess,loginToken } from "./userRedux";
import { publicRequest,userRequest } from "../components/axiosReqMethods";
import { getProductStart,getProductSuccess,getProductFailure , updateProduct } from "./productRedux";


// import { useDispatch } from "react-redux";
// we can't import dispatch here...  this is why we will impor"t "useDispatch" in "login.js" &                   make "dispatch= useDispatch()" sent it from there & here we will  get it inside "dispatch" & "user" will containe the login "username" & "password"


export const login = async(dispatch,user)=>{
          dispatch(loginStart()); // first do this 

          try { // then 2nd try doing this
                    const res = await publicRequest.post("/auth/login",user)
                    dispatch(loginSuccess(res.data))
                    // console.log(res.data)
                    dispatch(loginToken(res.data.accessToken))


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    dispatch(loginFailure())
          }
}

export const getProducts = async(dispatch)=>{
          dispatch(getProductStart()); // first do this 

          try { // then 2nd try doing this
                    const res = await publicRequest.get("/products")
                    dispatch(getProductSuccess(res.data))
                    // console.log(res.data)


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    dispatch(getProductFailure())
          }
}

export const deleteProducts = async(dispatch,id)=>{

          try { // then 2nd try doing this
                    const res = await userRequest.delete(`/products/${id}`)
                    dispatch(getProductSuccess(res.data))
                    // console.log(res.data)


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    dispatch(getProductFailure())
          }
}

export const updateProducts = async(dispatch,id,product)=>{

          try { // then 2nd try doing this
                    const res = await userRequest.update(`/products/${id}`,product)
                    dispatch(updateProduct(res.data))
                    // console.log(res.data)


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    //dispatch(getProductFailure())
          }
}

export const addProduct = async(dispatch,product)=>{

          try { // then 2nd try doing this
                    const res = await userRequest.post("/products/",product)
                  dispatch(getProductSuccess(res.data))
                    // console.log(res.data)


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    //dispatch(getProductFailure())
          }
}

//Delete User

export const deleteUser = async(dispatch,id)=>{

          try { // then 2nd try doing this
                    const res = await userRequest.delete(`/user/${id}`)
                    // console.log(res.data)


          } catch (error) {// if 2nd fails then do this
                    console.log(error)
                    dispatch(getProductFailure())
          }
}