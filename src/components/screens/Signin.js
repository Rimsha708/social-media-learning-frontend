//when sign in it should hide its button
import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Mo from "materialize-css";
import { UserContext } from "../../App";

export const Signin = () => {
 
  const {state, dispatch}=useContext(UserContext)
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const PostData = () => {
    console.log("data is sign in")
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
       {
      Mo.toast({ html: "invalid Email ID", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("data.error in sign in", data.error);
          Mo.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          console.log("data token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("data user", data.user);
          dispatch({type:"USER",payload:data.user})
          Mo.toast({
            html: "sign in successfully",
            classes: "#b39ddb deep-purple lighten-3",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("error is ", err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth_card">
        <h3>The Social Network</h3>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button  className="btn waves-effect waves-light  #e57373 purple lighten-2"  type="button" name="action" onClick={()=>{
            PostData()
          }}>
          Login
          <i className="material-icons right">send</i>
        </button>
        
        <h6><Link to="/signup">Don't have an account</Link> </h6>
      </div>
    </div>
  );
};
