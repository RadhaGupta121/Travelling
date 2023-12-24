import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { fetchData } from '../../Redux/Slices/UserDetail';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './social.css'
// Implement a comprehensive social networking feature that enables users to search for, 
// connect or follow other users.
// https://randomuser.me/documentation#multiple
function Social(props) {
    const userData = useSelector((state) => state.userDetail);
   const navigate=useNavigate();
    const userId=(userData.value._id);
    console.log(userId);
    const [data, setdata] = useState('');
    const[connection,setConnection]=useState([]);
    const[follower,setFollower]=useState([]);
     const[visibility,setVisibility]=useState(true);
  console.log(userData)
    useEffect(() => {
        fetchData();
        setVisibility(true);
    }, [])
    async function fetchData() {
        await fetch('https://randomuser.me/api/?results=100')
            .then((res) => res.json())
            .then((json) => setdata(json.results))
    }
    console.log(data);
   async function handleConnect(item)
    {

    //   const fetched=await axios.post(`http://localhost:8000/trip/addconnection/${userId}`,{
      //https://travelandshare.onrender.com 
      const fetched=await axios.post(`https://travelandshare.onrender.com/trip/addconnection/${userId}`,{
      item


      },{withCredentials:true})
     
        
       console.log("this is fetchedResponse from handleConenct",fetched);
      
       setConnection([...connection,item]);
    }
    function handleFollow(item)
    {
        setFollower([...follower,item])
    }
  async function showConnection()
    {
        
        navigate('/myconnection');
    }
    // userId===undefined? 
    return data.length === 0  ? <h1>Loading...</h1> :(userId===undefined?navigate ('/signin'): (
        <>
           <div style={{display:"flex",justifyContent:"center",gap:"2rem",margin:"1rem"}}>
           <Button className='connection-btn'  variant='outline-dark'
     
  
           onClick={()=>showConnection()}>Connection</Button>
       
           </div>
           <hr/>
        <div style={{ display: "flex", gap: "3rem",flexWrap:"wrap",padding:"12px" ,justifyContent:"space-evenly",}}>

            {data.map((item) => {
                return (
                    <>
                      <div style={{ display: "flex", gap: "1rem",width:"18rem",flexWrap:"wrap",background:"linear-gradient(to bottom, teal,MediumAquamarine,white)" }}>
                        <div style={{ width: "18rem", border: "1px solid blue", padding: "16px "}}>

                            <div style={{ display: "flex", justifyContent: "center", border: "50%" }}>
                                <img src={visibility===true?item.picture.medium:item.picture} alt='not found' />
                            </div>
                            <hr />
                            <h4 style={{ textAlign: "center" }}>{item.name.first} {item.name.last}</h4>
                            <div>
                                <p>📧{item.email}</p>
                                <p>📞{visibility===true? item.phone:9999033234}</p>
                                <p>🏠{visibility===true? item.location.state:item.state} {visibility===true? item.location.country:item.country}</p>
                            </div>
                            <div style={{display:"flex",gap:"2rem"}}>
                            <Button className='connection-btn' onClick={()=>handleFollow(item)} >Follow</Button>
                            <Button className='connection-btn' onClick={()=>handleConnect(item)}>Connect</Button>
                            </div>
                            
                        </div>
                        </div>
                    </>
                )
            })}
        </div>
        </>
    ));
}

export default Social;
