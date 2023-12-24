import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
 import './comment.css'
function Comments(props) {
  const userData = useSelector((state) => state.userDetail);

  const userId=(userData.value._id);
  console.log(userId)
  let[isEditing,setEditing]=useState(false);
 
  let[prevTitle,setTitle]=useState('');
  const Update=(id)=>{
    setEditing(!isEditing);
   
  }
  return (
    <Accordion defaultActiveKey={props.key} flush style={{width:"100%"}}>
      <Accordion.Item eventKey={props.key} style={{backgroundColor:"skyblue"}}>
        <Accordion.Header >Share Experience of this Trip</Accordion.Header>
        <Accordion.Body>
          <button onClick={()=>setEditing(!isEditing)}>+</button>
        {isEditing?
        (<><textarea value={prevTitle} onChange={(e)=>setTitle(e.target.value)}/>
          <Button onClick={()=>Update(props.id)} className='button update' style={{backgroundColor:"white",color:"black"}}>{isEditing?'Save':'Update'}</Button>
       
        </>):prevTitle}
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  );
}

export default Comments;
