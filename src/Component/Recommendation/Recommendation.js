import React, { useEffect, useState } from 'react';
// Implement a comprehensive Recommendation networking feature that enables users to search for, 
// connect or follow other users.
// https://randomuser.me/documentation#multiple
function Recommendation(props) {
    const [data, setdata] = useState('');
    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        await fetch('https://randomuser.me/api/?results=10')
            .then((res) => res.json())
            .then((json) => setdata(json))
    }
    console.log(data);
    function handleConnect(item)
    {
        console.log(item);
    }
    function handleFollow(item)
    {
        console.log(item);
    }
    return data.length === 0 ? <h1>Loading...</h1> : (
        <>
           <div style={{display:"flex",justifyContent:"center",gap:"2rem",margin:"1rem"}}>
           <button>Invite your connection  to enjoy with you</button>
      
           </div>
           <hr/>
        <div style={{ display: "flex", gap: "3rem",flexWrap:"wrap",padding:"12px" ,justifyContent:"space-evenly"}}>

            {data.results.map((item) => {
                return (
                    <>
                      <div style={{ display: "flex", gap: "1rem",width:"18rem",flexWrap:"wrap",background:"linear-gradient(to bottom, teal,MediumAquamarine,white)" }}>
                        <div style={{ width: "18rem", border: "1px solid blue", padding: "16px "}}>

                            <div style={{ display: "flex", justifyContent: "center", border: "50%" }}>
                                <img src={item.picture.medium} alt='not found' />
                            </div>
                            <hr />
                            <h4 style={{ textAlign: "center" }}>{item.name.first} {item.name.last}</h4>
                            <div>
                                <p>📧{item.email}</p>
                                <p>📞{item.phone}</p>
                                <p>🏠{item.location.state} {item.location.country}</p>
                            </div>
                            <div style={{display:"flex",gap:"2rem"}}>
                            <button onClick={()=>handleFollow(item)} >Invite For trip</button>
                            {/* <button onClick={()=>handleConnect(item)}>Connect</button> */}
                            </div>
                            
                        </div>
                        </div>
                    </>
                )
            })}
        </div>
        </>
    );
}

export default Recommendation;
