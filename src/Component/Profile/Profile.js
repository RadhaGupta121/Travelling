import {useEffect,useRef, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import img1 from '../../img/connect.jpg'
import { useSelector } from 'react-redux';
// import { fetchData } from '../../Redux/Slices/UserDetail';
import { useNavigate } from 'react-router-dom';
import ShowMap from '../MapFeature/MapFeatureShowMap';
import './profile.css'
function MyCard(props) {
  const userData = useSelector((state) => state.userDetail);
   const navigate=useNavigate();
   console.log(userData);
  const userId=(userData.value._id);
  console.log(userData.value);
  console.log(userId);
  const[editProfile,setEditProfile]=useState(false);
 
 const[showEmail,setShowEmail]=useState(false);
 const[showName,setShowName]=useState(false);
  let[isEditing,setEditing]=useState(false);
  let[prevTitle,setTitle]=useState(userData.value.name);
  const[detail,setDetail]=useState(prevTitle)
  let [prevUserId,setPrevUserId]=useState(userData.value.email);
 let [prevLocation,setPrevLocation]=useState(userData.value.address.city+" ,"+userData.value.address.state);
const fileref=useRef();
  
 const[resultantImage,setResultantImg]=useState(img1);
 const handleImgUpload=async()=>{
 console.log(fileref.current.value);
 const formInput=fileref.current;
 const formData=new FormData();
 formData.append("file",formInput.files[0]);
 const output=await axios.post('/upload',formData);
 console.log(output);
 const imgurl=output.data;
 setResultantImg(imgurl);
 }
  
  const Update=(id)=>{
    setEditing(!isEditing);
    props.onUpdate(id);
  }
  const handleEdit=()=>{
    setEditProfile(true);
    setEditing(!isEditing);
  }
function handleDetailVisibility(param)
{
   console.log(param);
   setDetail(param);
}
  return userId===undefined?navigate ('/signin'): (
   <>
    <div style={{width:"50%",margin:"auto",backgroundColor:"white",position:'relative'}}>
    
      <div style={{display:"flex",justifyContent:"center",backgroundColor:"lavender"}}>
      
         <img src={resultantImage} alt='not found' style={{width:"8rem",height:"8rem",marginTop:"3rem",marginBottom:"-3rem",borderRadius:"50%",border:"2px solid gray",padding:"4px"}}/>
  <input type='file' id='myfile' name='myfile' ref={fileref} />
 <button onClick={handleImgUpload}>Upload</button>      
  <span onClick={handleEdit} style={{position:"absolute",top:"12px",right:"12px"}}>
        {/* <FontAwesomeIcon icon={icon({name:'pencil'})}/> */}
        </span>
      </div>
      <hr/>
      <div style={{marginTop:"12px"}}>
      
        {/* <textarea style={{textAlign:"center",marginTop:"3rem",fontSize:"2rem"}} value={detail}/> */}
        <h2 style={{textAlign:"center",marginTop:"3rem",fontSize:"2rem"}}>{detail}</h2>
       <div style={{display:"flex",justifyContent:"space-around",fontSize:"1.5rem",padding:"1rem"}}>
        <span>{prevLocation}</span>
        <span>{prevUserId}</span>
       </div>
      </div>
    </div>
    
   </>
  );
}


const Profile=()=>{
     let[data,setdata]=useState([]);
     
     useEffect(()=>{
      getData();
  },[])

  const getData=async()=>{
    
     const json={name:"",email:""};
     
     setdata(json);
   }

const handleUpdate=(id)=>{
  console.log('update');
}
   
    return data.length==0?<h1>Loading...</h1>: (
        <>
        
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap", gap:"5rem"}}>
    
        <MyCard name={data.name} email={data.email} onUpdate={handleUpdate}/>
       
        </div>
        </>
    )
     }

export default Profile;
{/* <Card style={{ width: '18rem',border:"2px solid black",padding:"1rem",background:"linear-gradient(to bottom,white,plum, violet,purple)" }}>
<Card.Body>
  <Card.Title>{isEditing?<textarea value={prevTitle} onChange={(e)=>setTitle(e.target.value)}/>:prevTitle}</Card.Title>
  <Card.Text>
   {isEditing?<textarea value={prevUserId} onChange={(e)=>setPrevUserId(e.target.value)}/>:prevUserId}
  </Card.Text>
  <Card.Text>
   {isEditing?<textarea value={prevLocation} onChange={(e)=>setPrevLocation(e.target.value)}/>:prevLocation}
  </Card.Text>
  <Button onClick={()=>Update(props.id)} className='button update' style={{backgroundColor:"white",color:"black"}}>{isEditing?'Save':'Update'}</Button>
 
</Card.Body>
</Card> */}
