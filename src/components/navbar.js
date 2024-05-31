import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar=()=>{
  const {state, dispatch}=useContext(UserContext)
  const navigate= useNavigate()
  console.log("state is: ",state);
  
  const renderList =()=>{
  
    if(state){
      console.log("i am signed in");
      return (
        <>
        
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        <li><Link to="/myfollowerspost">My following posts</Link></li>
      <li>
      <button className="btn waves-effect waves-light  #e57373 white lighten-2" style={{color:"purple"}}  type="button" name="action"
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate("/signin")
      }
      }
       >        
          Logout
         
        </button>
      </li>
        </>
      )
     
    }else{
      console.log("i am not signin");
 

      return (
        <>
         <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        </>
      );
    }
  }
    return (  <nav style={{background:"purple"}}>
    <div className="nav-wrapper  ">
      
      <Link to={state? "/" : "/signin" }className="brand-logo left  b"> The Social Network</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
      </ul>
    </div>
  </nav>)
}
export default  Navbar;     //fucntional comp