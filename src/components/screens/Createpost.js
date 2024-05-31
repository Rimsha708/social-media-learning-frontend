import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mo from "materialize-css";
import { baseurl } from "../../Utils/constant";

export const Createpost = () => {
  // console.log("create post");

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch(baseurl + "/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("data.error in postcreating", data.error);
            Mo.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            console.log("created post succesfully");
            Mo.toast({
              html: "Created post successfully",
              classes: "#b39ddb deep-purple lighten-3",
            });
            navigate("/");
          }
          // console.log(data)
        })
        .catch((err) => {
          console.log("error is this ", err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
    console.log("hey");
  };
  return (
    <div
      className="card input-filed"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      Create post
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <div className="file-field input-field">
        <div className="btn  waves-effect waves-light  #e57373 purple  lighten-2 ">
          <span>Upload photo</span>
          {/* to upload  file for cloud...........cloudinary */}
          <input
            type="file"
            //value={image}
            onChange={(e) => {
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
        className="btn waves-effect waves-light  #e57373 purple  lighten-2"
        onClick={() => postDetails()}
      >
        Upload Post
      </button>
    </div>
  );
};
