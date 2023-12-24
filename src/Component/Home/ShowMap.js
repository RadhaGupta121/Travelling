import { useJsApiLoader, GoogleMap,Marker,DirectionsRenderer } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import './showmap.css'
import axios from 'axios';

function ShowMap(props) {
    const[map,setMap]=useState(/** @type google.maps.Maps */(null));
    const[center,setCenter]=useState({lat:48.8584,lng:2.2945})
    let originref=useRef();
    let destinationref=useRef();
    const[distance,setdistance]=useState(null);
    const[duration,setduration]=useState(null);
    const[directionresponse,setDirectionResponse]=useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCqL-qAvDQmfHGSxpLuLAFoTetaQiJCU2Y",
      
    });
    console.log('Type of center is',typeof center.lat);
    async function fetchmyCoordinate(cityName) {
        try {
          const output = await axios.get(`https://geocode.maps.co/search?q=${cityName}`);
          console.log(output);
      
        let latitude='';
        let longitude='';
        console.log(cityName)
        if(cityName===originref.value)
        {
             latitude = output.data[0]?.lat;
             longitude = output.data[0]?.lon;
        }
        else{
            latitude=output.data[1]?.lat;
            longitude=output.data[1]?.lon;
        }
         
             latitude=Number(parseFloat(latitude).toFixed(4));
             longitude=Number(parseFloat(longitude).toFixed(4));
          if (latitude !== undefined && longitude !== undefined) {
            console.log('Setting center:', { lat: latitude, lng: longitude });
            setCenter({ lat: latitude, lng: longitude });
          } else {
            console.error('Invalid coordinates retrieved from geocoding service:', output);
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
      
   async function calculateRoute()
    {
        if(originref.current.value===''|| destinationref.current.value==='')
        {
            return;
        }
        // eslint-disable-next-line no-undef
        const directionService=new google.maps.DirectionsService();
        const result= await directionService.route({
             origin:originref.current.value,
             destination:destinationref.current.value,
             // eslint-disable-next-line no-undef
             travelMode:google.maps.TravelMode.DRIVING
        })
        setdistance(result.routes[0].legs[0].distance.text);
        setduration(result.routes[0].legs[0].duration.text);
        setDirectionResponse(result);
    }
    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }
    const handleMapLoad = (map) => {
        // This will set the map object when it's loaded
        console.log("this is origin cord after page loading",center);
        setMap(map);
    };
    console.log(isLoaded);
   const center2={lat:51.3434,lng:29.32232};
   const handleLocateOrigin = async (cityName) => {
    console.log('cityname',cityName,originref.value)
    await fetchmyCoordinate(cityName);
      if (map && center) {
            map.panTo(center);
          }
   
   
  };
  
    return (
        <div style={{width:"30vw",height:"40vh"}}>
           
            <div className='map-input' style={{width:"100%",}}>
                <input type='text' placeholder='Enter origin' ref={originref}/>
                <Button onClick={()=>handleLocateOrigin(originref.current.value)}>Locate Origin</Button>
                <br/>
                <input type='text' placeholder='enter destination' ref={destinationref}/>
               <Button onClick={()=>handleLocateOrigin(destinationref.current.value)}>Locate Destination</Button>
               {distance}{duration}
            </div>
          
              <GoogleMap center={center}  zoom={12} mapContainerStyle={{width:"100%", height:"100%"}}
         options={{
            zoomControl:false,
            streetViewControl:false,
            mapTypeControl:false,
            fullscreenControl:false,
            mapTypeControlOptions:true,
         }}
         onLoad={handleMapLoad}
         >
       {map && <Marker position={{ lat: center.lat, lng: center.lng }} />}
        {map && <Marker position={center2}/>}
        
           </GoogleMap>   
        </div>
    );
}

export default ShowMap;
