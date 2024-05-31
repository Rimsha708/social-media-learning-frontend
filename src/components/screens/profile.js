import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { baseurl } from '../../Utils/constant';
//rafc

export const Profile = () => {
  const {state,dispatch}=useContext(UserContext)
  const [mypics, setPics]=useState([])

  useEffect (()=>{
    fetch(baseurl + '/mypost',{
      headers:{
        "Authorization": "Bearer " +localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
      .then(result=>{
      setPics(result.mypost)

    }).catch((err)=>{
      console.log("err in fetch my post")
    })
  },[])
  return (
    <div style={{maxWidth:"550px", margin:"0px auto"}}> 
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid purple"}}>
        <div>
          <img src={state?state.pic:"loading"} style={{width:"160px",height:"160px",borderRadius:"80px"}} />
        </div>
        <div>
          <h4 style={{color:"purple"}}>{state?state.name:"loading"}</h4>
          <div style={{
            display:"flex",
            justifyContent:"space-around",
            width:"100%"
          }}>
          <h6 style={{marginRight:"15px"}}>30 posts</h6>
          <h6 style={{marginRight:"15px"}}>30 followers</h6>
          <h6 style={{marginRight:"15px"}}>30 following</h6>
        </div>
        </div>
      
        
      </div>
      <div className='gallery'>
        {
          mypics.map(item=>{
            return(
              <img key={item._id} className="item" src={item.photo}/>

            )
          })
        }
     
      
     
      </div>
    </div>
  )
}


