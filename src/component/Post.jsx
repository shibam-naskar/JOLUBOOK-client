import React from 'react'
import { useState } from 'react';
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import { useEffect } from 'react';
import { create } from "../api/api-post"
import { toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import BarLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import { useReducer } from 'react';

const Post = (props1) => {

  const [Text, setText] = useState('');
  const [pic, setPic] = useState();
  const [image, setImage] = useState()
  const [picLoading, setPicLoading] = useState(false);
  const [picLoading1, setPicLoading1] = useState(false);
  const [demopic, setDemopic] = useState(null);
  const [type, setType] = useState("")
  const jwt = auth.isAuthenticated()
  const user = (jwt1(jwt.token))




  const submitHandler = async (event,props) => {

    setPicLoading(true);

    if (!Text && !pic) {
      toast.warning('Please Type anything ', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
      setPicLoading(false);
      return
    }

    try {
      const PostData = {
        Text,
        pic,
        user,
      }
      create({
        userId: user.id
      }, {
        t: jwt.token
      }, PostData).then((d) => {

        setPic('')
        setText('')
        props1.onAdd1(d)

      })
      setText('')
      // document.getElementById('file').value = "";
      setPicLoading(false);
    } catch (error) {
      setPicLoading(false);
      // console.log(error)
      toast.error('SomeThing Wrong', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
    };
    setPicLoading(false);
    event.preventDefault()

  };

  const ImageHander = (pics) => {
    setPicLoading1(true)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setImage(pics)
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dwjy0lwss");
      fetch("https://api.cloudinary.com/v1_1/dwjy0lwss/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data.url.toString());
          // console.log(data)
          setType(data.resource_type.toString())
          setDemopic(data.url.toString())
          setPicLoading1(false);
          return
        })
        .catch((err) => {
          toast.error('Some Thing Wron1g', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
          setPicLoading1(false);
        });
    } else if (pics.type == "video/mp4") {
      // console.log(pics)
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dwjy0lwss");
      fetch("https://api.cloudinary.com/v1_1/dwjy0lwss/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data.url.toString());
          // console.log(data)
          setType(data.resource_type.toString())
          setDemopic(data.url.toString());
          setPicLoading1(false);
          return
        })
        .catch((err) => {
          toast.error('Some Thing Wron1g', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
          setPicLoading1(false);
        });
    }
    else {
      toast.error('Photo is invalid', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
      setPicLoading1(false);
      return;
    }
  };


  return (
    <section className="post border_radius border-info border_radius white overflow-hidden pb-4  position-relative">
      <div className="d-flex align-items-center p-3 ps-4  mb-0">
      </div>
      <div className="">
        <form action="" className=" d-flex flex-column ms-4 ">
          <div>
            <textarea
              value={Text}
              name=""
              id=""
              cols={30}
              rows={2}
              onChange={(e) => setText(e.target.value)}
              className="outline w-75 "
              placeholder={"Share your thoughts " + user.name}
            />
            <button onClick={submitHandler} className="btn btn-primary btn-md ms-4 px-4 b-post">
              Post
            </button>
            <PulseLoader loading={picLoading} size={15} />
          </div>
          <div className="image-upload">
            <label htmlFor="file-input">
              <i className="fa-solid fa-camera-retro fs-3 mt-2 blue" />
            </label>
            <input id="file-input" onChange={(e) => {
              ImageHander(e.target.files[0]);

            }}
              name="photo" accept="image/*,video/*" type="file" className="d-none" />
            <BarLoader loading={picLoading1} size={15} />
          </div>
          {type == "image" ? (<img src={demopic} style={{ marginRight: 20, borderRadius: "35px" }}></img>) : (
            <div></div>
          )}

          {type == "video" ? (
            <video height={500} autoPlay controls >
            <source src={demopic} type="video/mp4"/>
           </video>
          ) : (
            <div></div>
          )}

          {/* {pic && <img src={demopic} style={{marginRight:20,borderRadius:"35px"}}></img>} */}
        </form>
      </div>
    </section>



  )
}
export default Post