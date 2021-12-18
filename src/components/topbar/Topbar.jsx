import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch} from "react-redux"
import { useSelector } from "react-redux";
import {logOut} from "../../redux/userRedux"
import { useHistory } from "react-router-dom";
export default function Topbar() {

  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick=()=>{
    dispatch(logOut())
    history.push("/login")
  }
  const user = useSelector((state)=>state.user.currentUser);
  // console.log(user)
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <button className="logout" onClick={()=>handleClick()}>Log Out</button>
          </div>

          <div className="topbarIconContainer">
            <h2 className="userName">{user.username}</h2>
          </div>

          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
  );
}
