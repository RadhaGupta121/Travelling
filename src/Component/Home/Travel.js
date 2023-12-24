import React, { useEffect, useState } from 'react';
import ShowMap from './ShowMap';
import './showmap.css';
// import './travel.css'
import UserConnection from '../Social/UserConnection';
import MapFeatureShowMap from '../MapFeature/MapFeatureShowMap';
function Travel({ CollectallData }) {
  const [isEditable, setEditable] = useState(false);
  const [activities, setActivity] = useState(CollectallData[2]);
  const [destinationActivities, setDestinationActivities] = useState([]);
  let source = CollectallData[0].source;
  let destinations = CollectallData[1];
  let startDate = CollectallData[0].date;
  let enddate = CollectallData[0].enddate;
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(enddate)) {
    dates.push(new Date(currentDate).toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  let allplaces = destinations.map((item) => item.destination);

  const dest_act = destinations.map((item) => {
    return { destination: item, activities: [...activities] };
  });
  let totalplace = allplaces.length;
  let totaldays = dates.length;
  let staytimes = totaldays / totalplace;

  useEffect(() => {
    const destAct = destinations.map((item) => {
      return { destination: item, activities: [...activities] };
    });
    setDestinationActivities(destAct);
  }, [activities, destinations]);

  function handleDelete(activity, destination) {
    const updatedActivities = destinationActivities.map((dest) => {
      if (dest.destination === destination) {
        dest.activities = dest.activities.filter((act) => act !== activity);
      }
      return dest;
    });
    setDestinationActivities(updatedActivities);
  }

  function handleAdd(destination) {
    const newActivity = prompt('Enter the new activity:');
    if (newActivity) {
      const updatedActivities = destinationActivities.map((dest) => {
        if (dest.destination === destination) {
          dest.activities.push(newActivity);
        }
        return dest;
      });
      setDestinationActivities(updatedActivities);
    }
  }
const[newactivity,setNewactivity]=useState('');
  function handleEditSave(destination, oldActivity, newActivity) {
    const updatedActivities = destinationActivities.map((dest) => {
      if (dest.destination === destination) {
        dest.activities = dest.activities.map((act) => (act === oldActivity ? newActivity : act));
      }
      return dest;
    });
    setDestinationActivities(updatedActivities);
    setEditable(false); // Disable editing after saving
  }

  return CollectallData.length===0?null: (
    <>
     
    <div className='trip-container'>
     
      <div className='dates'>
        {dates.map((item, index) => (
          <div key={index} className='date-button'>
            <button>{item}</button>
          </div>
        ))}
      </div>
      <div className='source' >
      <div key={source[0]} className='destination-container'style={{marginTop:"12px"}}>
              <div className='destination-header'>
                <h5>{source[0]}</h5>
                {/* <button onClick={() => handleAdd(destination)}>➕</button> */}
              </div>
            
            </div>
        {destinationActivities.map((item) => {
          const { destination, activities: activity } = item;
          return (
            <div key={destination.destination} className='destination-container'style={{marginTop:`${staytimes}rem`}}>
              <div className='destination-header'>
                <h5>{destination.destination}</h5>
                <button onClick={() => handleAdd(destination)}>➕</button>
              </div>
              <div className='activity-container'>
                {activity.map((act, index) => (
                  <div key={index} className='activity'>
                    <button onClick={() => setEditable(!isEditable)}>✏️</button>
                    {isEditable ? (
                      <>
                        <input type='text' placeholder='Title' onChange={(e)=>setNewactivity(e.target.value)} />
                        <textarea placeholder='Description' />
                        <input type='datetime-local' />
                        <input type='text' placeholder='Location' />
                        <button onClick={() => handleEditSave(destination, act, newactivity)}>✅</button>
                      </>
                    ) : (
                      <input type='text' value={act} disabled />
                    )}
                    <button onClick={() => handleDelete(act, destination)}>❌</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
     
      <MapFeatureShowMap/>
       
   
    </div>
    <hr/>
   
    <hr/>
   <div style={{marginTop:"5rem",padding:"12px",backgroundColor:"rgb(23,24,53,0.8)"}}>

    <div style={{textAlign:"center",color:"white",fontSize:"2rem"}}>
      
      <span >Invite your Connection
        </span>
      </div>
    
      <UserConnection invitation="Send Invitation"/>
      </div>

      </>
  );
}

export default Travel;
