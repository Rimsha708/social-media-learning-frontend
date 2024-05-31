import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';


export const SubscribedPost = () => {
  const {state, dispatch}=useContext(UserContext)
  const [data,setData]=useState([])

  useEffect(()=>{
    fetch('/getsubscribpost',{
      headers:{
        "Authorization":"Bearer " +localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log("post is ",result)
      setData(result)
      console.log('set data',data)
    }).catch((err)=>{
      console.log("err in allpost ",err)
    })
  },[])
  const likePost=(id)=>{
    fetch('/like',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })  
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id===result._id){
           return result
        }
        else{
          return item
        }
      })
      setData(newData)
      //console.log("result in unlike is :",result);
    }).catch((err)=>{
      console.log("err in like")
    })    
      
    .catch((err)=>{
      console.log("err in like",err)
    })  
  }
  const unlikePost=(id)=>{
    fetch('/unlike',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })    
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id===result._id){
           return result
        }
        else{
          return item
        }
      })
      setData(newData)
      //console.log("result in unlike is :",result);
    }).catch((err)=>{
      console.log("err in unlike")
    })    
      .catch(err=>{
      console.log("err in unlike",err)
    })
  }

  const makeComment=(text,postId)=>{
    fetch('/comment',{
      method:"put",
      headers:{
       "Content-Type":"application/json",
       "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId,
        name:localStorage.getItem("user").name,
        text
      })

    }).then(res=>res.json())
    .then(result=>{
      console.log("result is ",result);
     //to without reload page show all
      const newData=data.map(item=>{
        if(item._id===result._id){
           return result
        }
        else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log("err is ",err)
    })
  }
 
  const deletePost=(postId)=>{
  
  console.log("postdelete in home is: ",postId)
  console.log("in ",postId)
    fetch(`/deletepost/${postId}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      } 
    }).then(res=>res.json())
    .then(result=>{
      console.log("delete result is ",result)
      const newData=data.filter(item=>{
        console.log("in delete",result)
        console.log("item and result .id",item._id,result._id)
        return item._id!==result.id
              
      }) 
      setData(newData)
       
    }).catch((err)=>{
      console.log("err in delete")
    })
  }
  return (
    
    <div style={{color:"purple"}} className='home'>
      {data.map(item=>{
        return (
          <div  className='card home-card' key={item._id}>
          <h5><Link to={"/profile/"+item.postedby._id}>{item.postedby.name} </Link> <i class="material-icons"  style={{float:"right"}}
           onClick={()=>{
            deletePost(item._id)
           }} >
              delete</i> </h5>
            
          <div className='card-image'>
            <img src={item.photo}/>          
          </div>
          <div className='card-content'>
          {/* <i class="material-icons" style={{color:"red"}}>favorite</i> */}
          {item.likes.includes(state._id)? 
          <i class="material-icons"
          onClick={()=>{unlikePost(item._id)}}>
            thumb_down</i>:
            <i class="material-icons" 
            onClick={()=>{
              likePost(item._id)
              }}>
              thumb_up</i>         
          }        
          
            <h6>{item.likes.length} likes</h6>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
            {
              item.comments.map(record=>{
               return(
                <h6><span style={{fontWeight:"600"}}> 
                {/* {record.postedby} */}
                </span> 
                {record.text.name}
                </h6>
               )
              })
            }
            <form onSubmit={(e)=>{
              e.preventDefault()
            makeComment(e.target[0].value,item._id)
            }}>
            <input type='text' placeholder='add a comment'/>
  
            </form>
           
          </div>
          </div>
        )
      
    })}
     
     
    </div>
  )
}
