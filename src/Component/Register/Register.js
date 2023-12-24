import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../Redux/Slices/UserDetail';
import './login.css'
import { Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
function Register(props) {
    const navigate=useNavigate();
      const dispatch=useDispatch();
      const [showSuccessToast, setShowSuccessToast] = useState(false);
      const [showErrorToast, setShowErrorToast] = useState(false);
      const[mail,setEmail]=useState('');
      const[password,setPassword]=useState('');
      const[city,setCity]=useState('');
      const[state,setState]=useState('');
      const[name,setName]=useState('');
async function handleSubmit(e)
{          e.preventDefault();
            const data={
                email:mail,
                password:password,
                name:name,
                city:city,
                state:state
            }
            console.log(data);
            try {

                //  const output = await axios.post('http://localhost:8000/register', data, { withCredentials: true });
               //https://travelandshare.onrender.com
               const output = await axios.post('https://travelandshare.onrender.com/register', data, { withCredentials: true });
              

 
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
        <div style={{width:"50%",margin:"auto",marginTop:"2rem",color:"white",padding:"24px",backgroundColor:"rgb(88,24,69,0.9)"}}>
         <h2 style={{textAlign:"center"}}>Register</h2>
         <form onSubmit={handleSubmit} style={{}}>
         <input type='text' placeholder='Enter you name' onChange={(e)=>setName (e.target.value)} /> <br/>
         <input type='text' placeholder='Enter you city' onChange={(e)=>setCity (e.target.value)} /> <br/>
         <input type='text' placeholder='Enter you state' onChange={(e)=>setState (e.target.value)} /> <br/>
         
         <input type='email' placeholder='Enter you email' onChange={(e)=>setEmail (e.target.value)} /> <br/>
          <input type='password' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/> <br/>
          <input className='input-btn' type='submit' value='Submit'/> &nbsp; &nbsp;
         <span style={{color:"yellow"}}>Already a user? <Link to='/login' style={{color:"red"}}>Login</Link></span> 
         </form>
        </div>
    );
}

export default Register;
