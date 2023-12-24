import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { fetchData } from '../../Redux/Slices/UserDetail.js';

import axios from 'axios';
function Welcome(props) {
  const dispatch=useDispatch();
  
    const navigate=useNavigate();
    const[cookies,removeCookie]=useCookies([]);
    const[username,setUsername]=useState('');
    useEffect(()=>{
       const verifyToken=async()=>{
             if(!cookies.token)
             {
                navigate ('/')
             }

            //  const {data}=await axios.post('http://localhost:8000/',{
               const {data} =await axios.post('https://travelandshare.onrender.com/',{

            //  const {data}=await axios.post('https://travelandshare.onrender.com',{
                

             },{
                withCredentials:true
             })
             console.log(data);
             const {status,userInfo}=data;
             console.log("this is uerInfo in welocme",userInfo);
             if(userInfo===undefined)
             {
              navigate("/register");
             }
             else{
              const user=userInfo.name;
              const userData = data;
              dispatch(fetchData(userInfo));
              setUsername(user);
              return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/register"));
             }
           
            
             

       }
       verifyToken();
    },[cookies,removeCookie,navigate])
    const Logout=()=>{
        removeCookie('token');
        navigate('/login');
    }
    return (
        <div>
            <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
        </div>
    );
}

export default Welcome;
