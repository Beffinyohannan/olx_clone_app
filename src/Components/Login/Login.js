import React,{useState,useContext, useEffect,useRef} from 'react';
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link, useHistory} from 'react-router-dom'



function Login() {
  const [email,setEmail] = useState('');
  const [password,setpassword] =useState('');
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const [loginError,setLoginError]=useState({})




  const handleLogin =(e)=>{
    e.preventDefault()
     const loginErr={}


    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      // alert('Logged In')
      history.push('/')
    }).catch((error)=>{
      // alert(error.message)
      loginErr.valide=error.message
      setLoginError(loginErr)
    })
  }

  return (
    <div>
      <div className="loginParentDiv">

        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange ={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            // defaultValue="John"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange ={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            // defaultValue="Doe"
           
          />
          
          <br />
          <p>{loginError.valide}</p>
          <br />
          <button>Login</button>
        </form>
        {/* <a>Signup</a> */}
        <Link to={"/signup"}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
