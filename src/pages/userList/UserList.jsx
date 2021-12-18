import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../components/axiosReqMethods";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/apiCall";

// import

export default function UserList() {

  const [users, setUsers] = useState([])
  const [sure, setSure] = useState(false)
  const i=1
  const [confirm, setConfirm] = useState(0)
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const user = await userRequest.get("user/")
        setUsers(user.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [confirm])
  
  const dispatch = useDispatch()
  

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
    deleteUser(dispatch, id)
    setConfirm(i+1)
  }


  

  // const user = useSelector((state) => state.users)
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => setSure(params.row._id)} />
            {(sure === params.row._id) && <> <button className="userListClick" onClick={() => handleDelete(params.row._id)}>confirm</button> <button className="productListClick" onClick={() => setSure(false)}>cancel</button></>}
    
          </>
        );
      },
    },
  ];


  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
