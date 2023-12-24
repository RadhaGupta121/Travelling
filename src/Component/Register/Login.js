import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../Redux/Slices/UserDetail';
import { Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
function Login(props) {
  const dispatch = useDispatch();
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
const navigate=useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: mail,
      password: password,
    };

    try {

      // const output = await axios.post('http://localhost:8000/login', data, { withCredentials: true });


       const output = await axios.post('https://travelandshare.onrender.com/login', data, { withCredentials: true });
      const userInfo = output.data.userInfo;
      console.log(userInfo);
      dispatch(fetchData(userInfo));

      
      setShowSuccessToast(true);
       navigate('/profile');
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error('Login failed:', error);
     
      setShowErrorToast(true);
     
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  }

  return (
    <div style={{width:"40%",margin:"auto",marginTop:"2rem",color:"white",padding:"24px",backgroundColor:"rgb(88,24,69,0.9)",}}>
        <h2 style={{textAlign:'center'}}>Login</h2>
      <form onSubmit={handleSubmit} style={{color:"white"}}>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} /> <br />
        <input className='input-btn' type="submit" value="Submit" /> &nbsp;&nbsp;&nbsp;
        <span style={{color:"yellow"}}>New user? <Link to='/register' style={{color:"red"}}>Register</Link></span> 
        
      </form>

      {/* Success Toast */}
      <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)}>
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Login successful!</Toast.Body>
      </Toast>

      {/* Error Toast */}
      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg="danger" text="white">
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Login failed. Please check your credentials.</Toast.Body>
      </Toast>
    </div>
  );
}

export default Login;
