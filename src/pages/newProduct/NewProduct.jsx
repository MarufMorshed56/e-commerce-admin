import "./newProduct.css";
import { useState } from "react"

import { useDispatch } from "react-redux"

// firebase storage
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"


import { addProduct } from "../../redux/apiCall";

export default function NewProduct() {

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({}) // at first this is gonna be an empty object

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

  const handleClick=(e)=>{
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
      },(error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs , img:downloadURL ,categories: category , size:size,color:color};

          addProduct(dispatch, product)
        });
      }
    );
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setImage(e.target.files[0])} />
          {/* to get files from your local device */}
          {/* inside {e => setImage(e.target.files[0])} here the [0] is so that we can only take on picture */}
        </div>

        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Product Name" name="title" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Desciption</label>
          <input type="text" placeholder="Product Description" name="description" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Category</label>
          <input type="text" placeholder="man,woman,shirt " name="category" onChange={handleCat} />
        </div>

        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="M,L,XL" name="size" onChange={handleSize} />
        </div>

        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="red,blue" name="color" onChange={handleColor} />
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="$ 100" name="price" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" id="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button className="addProductButton" onClick={(e)=>handleClick(e)}>Create</button>
      </form>
    </div>
  );
}
