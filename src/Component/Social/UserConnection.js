
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';

function UserConnection(props) {
    const[data,setdata]=useState([]);
    const userData = useSelector((state) => state.userDetail);
    console.log("this is props invitation",props.invitation);
    const userId=(userData.value._id);
    console.log(userId);
    useEffect(()=>{
        fetchData();
    },[])
    async function fetchData()
    {
       
        console.log('showconnection called');
        console.log(userId);

        // const showConnections=await axios.get(`http://localhost:8000/trip/getallconnection/${userId}`,{
        //     // https://travelandshare.onrender.com 
         const showConnections=await axios.get(`https://travelandshare.onrender.com/trip/getallconnection/${userId}`,{
         

         },{withCredentials:true})
         console.log("connected with user",showConnections.data.data[0].connections);
        const output=(showConnections.data.data[0].connections);
        setdata(output);
      
    }
    console.log(data);
    return (
        <div>
            <div style={{ display: "flex", gap: "3rem",flexWrap:"wrap",padding:"12px" ,justifyContent:"space-evenly",}}>

{data.map((item) => {
    return (
        <>
          <div style={{ display: "flex", gap: "1rem",width:"18rem",flexWrap:"wrap",background:"linear-gradient(to bottom, teal,MediumAquamarine,white)" }}>
            <div style={{ width: "18rem", border: "1px solid blue", padding: "16px "}}>

                <div style={{ display: "flex", justifyContent: "center", border: "50%" }}>
                    <img src={item.picture} alt='not found' />
                </div>
                <hr />
                <h4 style={{ textAlign: "center" }}>{item.name.first} </h4>
                <div>
                   
                    <p>📧{item.email}</p>
                  
                    <p>🏠{item.city}{item.state} {item.country}</p>
                  {props.invitation===undefined?null:<button>{props.invitation}</button>}
                </div>
                <div style={{display:"flex",gap:"2rem"}}>
                
                </div>
                
            </div>
            </div>
        </>
    )
})}
</div> 
        </div>
    );
}

export default UserConnection;
