import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {useState, useEffect} from "react"
import { publicRequest, userRequest } from "../axiosReqMethods";
import { useSelector } from "react-redux"

export default function WidgetSm() {
  const [users, setUsers] =  useState([])

  useEffect(() => {
    const getUsers = async()=>{
    try{ const user = await userRequest.get("user/?new=true")
          setUsers(user.data)
  }catch(err){
    console.log(err)
  }
  }
  getUsers()
}, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Newly Joined Members</span>
      <ul className="widgetSmList">
        {users.map(user =>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src="https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1114445501.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
