import React from 'react';
import video1 from '../../img/travel-video.mp4';
import './animation.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function HomeAnimation(props) {
    const navigate=useNavigate();
    return (
        <div style={{position:"relative"}}>
           
          <video width="100%" height="100%" autoPlay loop disablePictureInPicture={true} 
          style={{ position: 'fixed', top: "3rem", left: 0, zIndex: 1 }}
          >
      <source src={video1} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div style={{ position: 'absolute', top: "50%", left: "50%",transform:"translate(-50%,100%)", zIndex: 2, color: 'white', }}>
        <span className='embark' >
            Embark on a journey of discovery and adventure with Us!
            <p>Join us and turn your travel dreams into reality!</p>
            </span>
      

<h1 className='ready' >Ready to begin your next adventure?<br/>
<span className='planning' >Start planning now!</span> </h1>
<Button variant='outline-dark'  onClick={()=>navigate ('/trendingtrip')}
style={{color:"white",backgroundColor:"purple",marginTop:"1rem"}}>
    Explore Now</Button>
      </div>
        </div>
    );
}

export default HomeAnimation;