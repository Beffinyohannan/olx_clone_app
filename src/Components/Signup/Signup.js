import React, { useState, useContext, useEffect } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom'
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const [error, setError] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const signupData = {
    email, username, phone, password
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm(signupData)
    setError(errors)
    // setIsSubmit(true)
    // console.log(firebase)
    console.log(Object.keys(errors).length,'llkklk');
    if (Object.keys(errors).length==0) {
      console.log("hello");

      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({

            id: result.user.uid,
            username: username,
            phone: phone
          }).then(() => {
            history.push("/login")
          })
        })
      }).catch((err)=>{
        // alert(err)
        error.email = err.message
        setError(error)
      })
    }
  }

  

  const validateForm = (data) => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userRegex = /^[A-Za-z0-9_-]{3,15}$/;
    if (!data.username) {
      error.username = "user name required"
    }else if(!userRegex.test(data.username)){
      error.username="Invalide user name"
    }
    if (!data.email) {
      error.email = "email required"
    }else if(!regex.test(data.email)){
      error.email="enter valide email address"
    }
    if (!data.phone) {
      error.phone = " phone number required"
    }else if(data.phone.length!=10){
      error.phone="number should be 10 digits"
    }
    if (!data.password) {
      error.password = "password required"
    }else if(data.password.length!=6){
      error.password="password should be 6 digit"
    }

    return error;
  }

  // useEffect(() => {
  //   if(Object.keys(error).length==0 && isSubmit){
  //     console.log(signupData);
  //   }
  
   
  // }, [error])
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"

          />
          <p className='error'>{error.username}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <p className='error'>{error.email}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <p className='error'>{error.phone}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <p className='error'>{error.password}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* <a>Login</a> */}
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}
