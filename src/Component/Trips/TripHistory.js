import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

import TripCard from './TripCard';
import Comments from './Comment';
import { useNavigate } from 'react-router-dom';

function TripHistory() {
    const[trips,setalltrip]=useState([]);
    const userData = useSelector((state) => state.userDetail);
    const navigate=useNavigate();
  const userId=(userData.value._id);
  console.log(userId)
        useEffect(()=>{
            fetchingData();
        },[])
      async  function fetchingData()
        {

            //  const fetched=await axios.get(`http://localhost:8000/trip/getalltrip/${userId}`,{

            //https://travelandshare.onrender.com
             const fetched=await axios.get(`https://travelandshare.onrender.com/trip/getalltrip/${userId}`,{


         
      },{withCredentials:true})
      setalltrip(fetched.data.alltrip);
        }
       console.log("this is trips",trips);
       let para="Hi this is my recent trip";
    return (
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:'wrap',margin:"12px"}}>
           {
            trips.map((item)=>{
                return userId===undefined?navigate ('/signin'):(
                    <>
                    <div style={{width:"30rem",margin:"12px",display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                   <TripCard source={item.source} destinations={item.destinationArr} start={item.startDate} end={item.endDate}
                     activity={item.activityArr} comments={item.comment}/>
                      <Comments key={item} para={para}/>
                     </div>
                    </>
                )

            })
           }
        </div>
    );
}

export default TripHistory;
