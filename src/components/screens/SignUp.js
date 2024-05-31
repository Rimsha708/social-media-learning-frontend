import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { baseurl } from "../../Utils/constant";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [url, setUrl] = useState(undefined);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadpic = () => {
    const data = new FormData(); //   https://console.cloudinary.com/pm/c-d7e9a564268e313faf6df30e645fdc/developer-dashboard   search formdata (helps us uploading the data)
    data.append("file", image);
    data.append("upload_preset", "Social_network");
    data.append("cloud_name", "rimshacloud");
    console.log("data in create profile is: ", data);
    fetch("https://api.cloudinary.com/v1_1/rimshacloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is: ", data);
        setUrl(data.url);
        console.log("data.url", data.url);
      })
      .catch((err) => {
        console.log("error is :", err);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      //email regex( regular expression)
      M.toast({ html: "invalid Email ID", classes: "#c62828 red darken-3" });
      return;
    }
    // console.log("this is working in sign up")
    fetch(baseurl + "/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          console.log("data in signup is ", data);
          M.toast({
            html: data.message,
            classes: "#b39ddb deep-purple lighten-3",
          });
          navigate("/signin");
        }
        // console.log(data)
      })
      .catch((err) => {
        console.log("error is ", err);
      });
  };
  const PostData = () => {
    if (image) {
      uploadpic();
    } else {
      uploadFields();
    }
  };
  return (
    <div>
      <div className="mycard">
        <div className="card auth_card">
          <h3>The Social Network</h3>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div className="file-field input-field">
            <div className="btn  waves-effect waves-light  #e57373 purple  lighten-2 ">
              <span>Upload photo</span>
              {/* to upload  file for cloud...........cloudinary */}
              <input
                type="file"
                //value={image}
                onClick={(e) => {
                  console.log("files ", e.target.files);
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            onClick={() => {
              PostData();
            }}
            className="btn waves-effect waves-light  #e57373 purple  lighten-2"
            type="submit"
            name="action"
          >
            SignUp
            <i className="material-icons right">send</i>
          </button>
          <h6>
            <Link to="/signin">Already Have an account?</Link>{" "}
          </h6>
        </div>
      </div>
    </div>
  );
};
