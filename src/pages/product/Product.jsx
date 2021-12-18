import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

import { useSelector } from "react-redux";
//import {useState, useEffect} from "react"
import { userRequest } from "../../components/axiosReqMethods";
//firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"


import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProducts } from "../../redux/apiCall";


export default function Product() {

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({}) // at first this is gonna be an empty object

    const location = useLocation()
    const url_id = location.pathname.split("/")[2]
    //console.log("id",url_id)
   // const [data, setData]= useState([])

   const product = useSelector((state)=>state.product.products.find(item => item._id === url_id))
   
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCat = (e) => {
        setCategory(e.target.value.split(','))
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(','))

    }
    const handleColor = (e) => {
        setColor(e.target.value.split(','))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + image.name

        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            }, (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL, categories: category, size: size, color: color };

                    updateProducts(dispatch,url_id, product)
                });
            }
        );
    }







   //console.log(product)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create New Product</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue"> {product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  {/* <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div> */}
                      <div className="productInfoItem">
                          <span className="productInfoKey">price:</span>
                          <span className="productInfoValue">${product.price}</span>
                      </div>
                      <div className="productInfoItem">
                          <span className="productInfoKey">description:</span>
                          <p className="productDescription">{product.description}</p>
                      </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                          {product.inStock ? <span className="productInfoValue">yes</span> : <span className="productInfoValue">n0</span>}
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                      <input type="text" placeholder={product.title} />
                    <label>Product Description</label>
                      <input type="text" placeholder={product.description} onChange={handleChange} />

                    <label>Category</label>
                      <input type="text" placeholder="man,woman,shirt " name="category" onChange={handleCat} />
                      
                    <label>Size</label>
                      <input type="text" placeholder="M,L,XL" name="size" onChange={handleSize} />

                    <label>Color</label>
                      <input type="text" placeholder="red,blue" name="color" onChange={handleColor} />

                    <label>Product Price</label>
                      <input type="text" placeholder={product.price} onChange={handleChange}/>

                  <label>In Stock</label>
                      <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  {/* <label>Active</label>
                  <select name="active" id="active">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select> */}
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                          <input type="file" id="file" style={{ display: "none" }} onChange={e => setImage(e.target.files[0])} />
                  </div>
                  <button type="submit" onSubmit={(e)=>handleSubmit(e)} className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
