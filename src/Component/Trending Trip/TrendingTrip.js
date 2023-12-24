import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './trending.css'
function TrendingTrip(props) {
    useEffect(() => {
        fetchPlaces();
    }, [])
    const [placeImageArr, setPlaceImageArr] = useState([{}]);
    async function fetchPlaces() {
        try {
            //http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off
            //https://random-data-api.com/api/v2/addresses
            //https://api.api-ninjas.com/v1/city?name=India  ==>search by city name ==>apikey==EwxRA3g56kT6NencU5ktYA==pfwaOrOA1Qneb6lP
            const slugarr = ['london', 'paris', 'delhi', 'mumbai', 'tokyo', 'sydney', 'new-york', 'singapore', 'berlin',
                'dubai', 'toronto', 'singapore', 'los-angeles'];
            const newPlaceImgArr = [];
            for (let i = 0; i < slugarr.length; i++) {
                const placeImage = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${slugarr[i]}/images/`);
                const image = placeImage.data.photos[0].image.web;
                console.log(image);
                newPlaceImgArr.push({city:slugarr[i].toUpperCase(),image:image});


            }
            setPlaceImageArr([...newPlaceImgArr]);
            console.log(placeImageArr);
        } catch (error) {
            console.log(error);
        }
    }
    return placeImageArr.length === 0 ? <h1>Loading...</h1> : (
        <div id="portfolio">


            <div class="container" style={{
                display: "flex", justifyContent: "space-evenly", gap: "12px", flexWrap: "wrap",
                backgroundColor: "rgb(0,0,0,0.8)", paddingTop: "2rem"
            }}>
                {
               placeImageArr.length===0?<h2>Loading....</h2>  :   placeImageArr.map((item) => {
                        return (
                            <>
                                    
                                <div className='work-list' style={{ width: "40rem", height: "25rem" }}>
                                   
                                    <div className='work'>
                                 
                                        <img src={item.image} alt="not found" style={{ width: "100%", height: "80%" }} />
                                        <h1 style={{textAlign:"center",color:"white"}}>{item.city}</h1>
                                        <div className='layer'>
                                            <h3>{item.city}</h3>
                                            <p>
                                           {item.city}, the City of Light, enchants with timeless beauty along the Seine. Iconic landmarks like the
                                             Eiffel Tower define its skyline, a symbol of sophistication. Cobblestone streets, museums like the
                                              Louvre, and romantic evenings by the Seine immerse visitors in cultural richness. Montmartre's bohemian
                                               charm and exquisite gardens offer peaceful respites. Culinary delights in{item.city}ian bistros showcase the 
                                               essence of French gastronomy. Each arrondissement unveils a new facet,
                                             leaving an indelible impression.{item.city}, a city transcending time, exudes grace and unrivaled elegance.    
                                            </p>
                                            <Link to="/home">Create {item.city} Trip</Link>
                          
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default TrendingTrip;