import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Comments from './Comments';

function TripCard(props) {
    console.log('Props in tripCard coming from trip history',props);
    // const[destiny,setdestiny]=useState('');
   let destination= props.destinations;
  return (
  
    <Card style={{width:"30rem",backgroundColor:"rgb(0,0,0,0.8)",color:"white"}}>
      <Card.Header>{props.start}- {props.end}</Card.Header>
      <Card.Body>
        <Card.Title>Source : &nbsp; {props.source}</Card.Title>
        <Card.Text> Destination: &nbsp;
         {
            destination.map((item)=>{
                return(
                      <>
                       <span> {item.destination} </span>
                      </>
                )
               
            })
         }
        </Card.Text>
        <span>Activities: </span>
       {
        props.activity.map((item)=>{
            return(
                <>
                 <Button variant="danger" style={{margin:"12px"}}>{item}</Button>
                </>
            )
        })
       }
      </Card.Body>
      <Button variant='success'> Request connection to join this trip</Button>
 
    </Card>
  );
}

export default TripCard;
