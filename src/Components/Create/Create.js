import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom'
import {FirebaseContext,AuthContext} from '../../store/Context'

const Create = () => {
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [ image,setImage] = useState(null);
  const date = new Date()
  const [error,setError]=useState({})

  const datas={
    name,category,price,image
  }
   
  const handleSubmit =()=>{

    const errors=  validedata(datas)
    setError(errors)

    if (Object.keys(errors).length==0) {
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
  }
  }

  const validedata=(data)=>{
    const error = {};
    if (!data.name) {
      error.name = "name required"
    }
    if (!data.category) {
      error.category = "category required"
    }
    if (!data.price) {
      error.price = "price required"
    }
    if (!data.image) {
      error.image = "image required"
    }

    return error
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <p>{error.name}</p>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <p>{error.category}</p>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"
             value={price}
             onChange={(e)=> setPrice(e.target.value)}
            id="fname" name="Price" />
            <p>{error.price}</p>
            <br />
          
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <p>{error.image}</p>
            <br />
            <input 
            
             onChange={(e)=> setImage(e.target.files[0])}
            type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
       
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
