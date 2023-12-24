import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import Travel from './Travel';
import './home.css'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeAnimation from '../Animations/HomeAnimation';
function Popup({onClose,onSubmitting})
{
    const[data,setdata]=useState({});
    const[destination,setdestination]=useState([{destination:''}]);
    const[alldata,setalldata]=useState([]);
    let[activity,setActivity]=useState([]);
    const[publics,setPublics]=useState(true);
    const [cookies, setCookie] = useCookies(['token']);
    const userData = useSelector((state) => state.userDetail);
    console.log(userData);
    console.log("useData from home.js",userData.value._id);
    const userId=userData.value._id;

    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const [minDate, setMinDate] = useState(getCurrentDate());
    function handleChange(e)
    {
        setdata({...data,[e.target.name]:[e.target.value]});
    }
    
   
  async  function handleSubmit(e)
    {
           e.preventDefault();
          
          console.log("Data:",data);
          console.log("Destination:",destination);
          console.log("activity",activity);
         alldata.push(data);
         alldata.push(destination);
         alldata.push(activity);
         alldata.push(userData);
         setalldata([...alldata]);
         console.log(alldata);
         const fetchedData=await axios.post(`https://travelandshare.onrender.com/trip/newtrip/${userId}`,{
          alldata
        },{withCredentials:true})
        console.log("This is fetchedData",fetchedData);
    
 

      // const fetchedData=await axios.post(`http://localhost:8000/trip/newtrip/${userId}`,{
      //   alldata
      // },{withCredentials:true})
      // console.log("This is fetchedData",fetchedData);
  
  
  
        {onSubmitting(alldata)}
        onClose();
    
    }
    const handleDestinationChange = (index, value) => {
        const newDestinations = [...destination];
        newDestinations[index].destination = value;
        setdestination(newDestinations);
      };
    function addDestination()
    {
        
        setdestination([...destination,{destination:''}])
    }
    function DeleteDestinationBtn(id)
    {
        console.log('delete function',id);
        const newDestinations=[...destination];
        newDestinations.splice(id,1);
        setdestination(newDestinations);  
    }
    function handleCheck(e)
    {
     
        
           if(e.target.checked)
           {
               activity.push(e.target.value); 
               setActivity([...activity])
           }
           else{
          activity= activity.filter((item)=>item!==e.target.value);
          setActivity([...activity])
           }
           console.log(activity);
          
    }
    
  return(
    <>
      <div style={{display:"flex",justifyContent:"center",position:"relative",flexWrap:"wrap",zIndex:"10000"}}>
        
        <div className='form-container' style={{backgroundColor:"rgba(68, 158, 157, 0.9)",padding:"20px",margin:"-2rem"}}>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <span style={{color:"maroon",fontSize:"1.5rem",fontWeight:"bolder"}}>Get Your Travel Plan now</span>  <Button onClick={onClose} style={{background:"transparent"}}>❌</Button></div>
        
      
        <hr/>
        <span style={{fontSize:"1.2rem",fontWeight:"bold",color:'rgb(88, 24, 69 )',padding:"12px"}}>What do you want to explore?</span>
            <form onSubmit={handleSubmit}>
                <input type='text' name='source' placeholder='Enter Source' onChange={handleChange} required /><br/><br/>
                {destination.map((destination, index) => (
        <div key={index}>
          <input
            type="text"
            name="destination"
            placeholder='Enter Destination'
            value={destination.destination}
            onChange={(e) => handleDestinationChange(index, e.target.value)}
            required
          />
          <Button onClick={()=>DeleteDestinationBtn(index)} variant="outline-danger" style={{marginLeft:"12px"}}>⛔</Button>
          <br />
          <br />
        </div>
      ))}
                 <Button onClick={addDestination} variant="outline-dark" >Add destination</Button><br/><br/>
                 <hr/>
                 <span style={{fontSize:"1.2rem",fontWeight:"bold",color:'rgb(88, 24, 69 )'}} >When are you planning to travel</span >
                <br/> <label>Start date: &nbsp;</label>
                <input type='date' name='date' min={minDate}  onChange={handleChange} required/><br/><br/>
                <label>End date:&nbsp;&nbsp;</label>
                <input type='date' name='enddate' min={minDate}  onChange={handleChange} required/><br/><br/>
                <label>Activity Preference:&nbsp;&nbsp;</label>
                <input className='activity' type='checkbox' name='activity' value='Nature and Spiritual' onClick={(e)=>handleCheck(e)} /><label>Nature and Spiritual</label>
                &nbsp; <input className='activity' type='checkbox' name='activity' value='Heritage & Art' onClick={(e)=>handleCheck(e)} /><label>Heritage and Art</label>
                &nbsp; <input className='activity' type='checkbox' name='activity' value='Adventure' onClick={(e)=>handleCheck(e)}/><label>Adventure</label>
                <br/><br/>
                <label>Make your trip:</label>
                <button onClick={()=>setPublics(!publics)} >
                  {publics===true?<h1>🌍</h1>:<h1>🔏</h1>}</button><br/>
               <input type='submit' value='Continue'/>
               
            </form>
            
        </div>
      </div>
    </>
  )
}
function Home() {
  const navigate=useNavigate();
  const userData = useSelector((state) => state.userDetail);

  console.log("useData from home.js",userData.value._id);
  const userId=userData.value._id;
    const[showHomeAmination,setHomeAmination]=useState(true);
    const[isPopOpen,setPopOpen]=useState(false);
    const[alldata,setData]=useState('');
    console.log(alldata);
    function ClosePopUp()
    {
        setPopOpen(false);
       setHomeAmination(false);
        console.log("This is collected data of home",alldata);
    }
    function CollectallData(props)
    {
      console.log("Collected data from parents calling",props);
      setData(props);
      // setCollectData(props.data);
    }
    return  (
        <div className='home'>
          <div style={{display:"flex",justifyContent:"center",position:'absolute',left:"45%",top:"12%" , zIndex:'1000'}}>
          <Button className='connection-btn createTrip' onClick={()=>{if(userId===undefined)navigate('/login'); else {
             setHomeAmination(false);
            setPopOpen(true)
          }}}>Create a Trip</Button>
          </div>
        {
          showHomeAmination?<HomeAnimation/>:null
        }
         {
            isPopOpen?
            <Popup onClose={ClosePopUp} onSubmitting={CollectallData}/>:null
         }
        {/* <GetCords/> */}
       
         {
         alldata.length ===0?null:
         <Travel CollectallData={alldata}/>
          
         }
       
        </div>
    );
}

export default Home;
