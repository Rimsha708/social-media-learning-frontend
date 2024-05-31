import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import { initialState } from "../../reducers/userReducer";
import { baseurl } from "../../Utils/constant";

//rafc

export const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext); 
  const [Profile, setProfile]=useState()
  const [userProfile, setuserProfile] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const { userid } = useParams();
  const [posts,setPosts]=useState([])
  const [Prof,setProf]=useState("")
  const [showfollow, setShowFollow]=useState(true);
  const [userPic, setuserPic]= useState("")
  const[Follower,setFollower]=useState("")
  // 
  console.log("i am in  userprofile", state);

  //setShowFollow(!state?state.includes(userid))
  useEffect(() => {
    //console.log("i am in useeffect");
    fetch(baseurl + `/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then(result=>{
        setuserProfile(result.user.name)
        setuserEmail(result.user.email)
        setProfile(result.posts.length)
        setPosts(result.posts)
        setProf(result)
        setuserPic(result.user.pic)
        setFollower(result.user.followers)
        
        console.log("profile",Profile)
        console.log("result",result)
         console.log("user profile",userEmail)
         console.log("i am in  result");
         
        
      }).catch((err)=>{
        console.log("not login ",err)
      })
  },[userid]);
  const followUser=()=>{
    console.log("i am in followers")
  fetch(baseurl + '/follow',{
    method:"Put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt'),
    },
    body:JSON.stringify({
      followId: userid 
      
    })

  }).then(res=>res.json())
     .then(data=>{
       dispatch({
        type:"UPDATE",
        payload:{following:data.following, followers:data.followers},
      })
       localStorage.setItem("user",JSON.stringify(data))
       setProf((prevState)=>{
        console.log("in follow");
        return {user:{
          ...prevState.user,
          followers:[...prevState.user.followers,data._id]

        }
      }
       })
       setShowFollow(false)
      }).catch(err=>{
        console.log("error is: ",err)
}) 
  }
const UnfollowUser=()=>{
  fetch(baseurl + '/unfollow',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      followId: userid    
      
    })

  }).then(res=>res.json())
     .then(data=>{
      
       dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
       localStorage.setItem("user",JSON.stringify(data))
       setProf((prevState)=>{
        const newFollower=prevState.user.followers.filter(item=>item!=data._id)
        console.log("newfollowers are:",newFollower)
        console.log("in unfollow");
        return {user:{
          ...prevState,
          user:{
                 ...prevState.user,
                 followers:newFollower
          },      
        },
      };
       });
       setShowFollow(true)
       window.location.reload()
  
      }).catch((err)=>{
        console.log("error is: ",err)
      })
     
}  
return (   
   <>
    {
      posts?
      <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid purple",
        }}
      >
        <div>
          <img
            src={userPic}
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          />
        </div>
        <div>
          {/* <h1> Hello</h1> */}
          <h4>{userProfile}</h4>
          <h5>{userEmail}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <h6 style={{ marginRight: "15px" }}>{Profile} post</h6>
            <h6 style={{ marginRight: "15px" }}>{Prof.user===undefined?"Loading":Prof.user.followers.length} followers</h6>
            <h6 style={{ marginRight: "15px" }}>{Prof.user===undefined?"Loading":Prof.user.following.length} following</h6>
               
          </div>
          {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow?<button onClick={()=>{
            followUser()
          }}  className="btn waves-effect waves-light  #e57373 blue lighten-2"  type="button" name="action" >Follow
            <i className="material-icons right" ></i>
        </button>:  <button onClick={()=>{
          UnfollowUser()
          }}  className="btn waves-effect waves-light  #e57373 purple lighten-2"  type="button" name="action" >Unfollow
             <i className="material-icons right" ></i>
        </button>}           
          <br/>
        <br/>         
        </div>       
        {/* live api kar dy  */}
      </div>
      <div className="gallery">
        {    posts.map(item=>{
              return(
                <img key={item._id} className='item' src={item.photo}/>
              ) 
            })
          } 
      </div>
    </div>
      :
      "Loading..."
    
  };
    </>    
  )}