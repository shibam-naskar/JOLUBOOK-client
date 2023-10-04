import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from 'react-router-dom';
import { auth, provider } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button'

const Register = ({ history }) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");

  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo1")) {
      nav('/s')
    }
  }, [history])
  const [data, setData] = useState({})



  const [value, setValue] = useState('')


  function handleChange(event) {
    const { name, value } = event.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,

      }
    })

  }

  async function handleClick(event) {

    event.preventDefault();

    signInWithPopup(auth, new GoogleAuthProvider()).then((data) => {
      console.log(data.user)
      var finaldata = {
        "email": data.user.email,
        "name": data.user.displayName,
        "dp":data.user.photoURL
      }
      CallApiReg(finaldata);


      // setValue(data.user.email)
      // localStorage.setItem("email", data.user.email)
    })
    console.log(data)







    //console.log(data);
    //  event.preventDefault();
    setLoading(true)

    // const newDate = data;
    // if (!data.name || !data.password || !data.email || !data.password2) {
    //   toast.warning('Please Fill all the Feilds', { position: toast.POSITION.TOP_LEFT })
    //   setLoading(false)
    //   return;
    // }
    // console.log(newDate)

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)

    // };

    // const response = await fetch('https://jolubook-backend-production.up.railway.app/api/users/register', requestOptions)
    // const Data = await response.json();

    // if (!Data.error) {
    //   toast.success('Successful Register', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
    //   setLoading(false)
    //   nav('/login')
    // }
    // else {
    //   toast.warning(Data.error, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
    //   setLoading(false)
    // }


  }

  async function CallApiReg(finaldata) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finaldata)

    };

    const response = await fetch('https://jolubook-backend-production.up.railway.app/api/users/register', requestOptions)
    const Data = await response.json();

    if (!Data.error) {
      toast.success('Successful Register', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
      localStorage.setItem("userInfo1", JSON.stringify(Data));
      setLoading(false)
      nav('/s')
    }
    else {
      toast.warning(Data.error, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
      setLoading(false)
    }
  }

  return (
    <div class="container mt-5">
      <h1>Continue with Google</h1>
      <PulseLoader color={color} loading={loading} size={15} />
      <div class="row">
        <div class="col-sm-8">
          <GoogleButton
            style={{ borderRadius: 60 }}
            type="light" // can be light or dark
            onClick={handleClick}
          />

        </div>

      </div>
    </div>
  )
}
export default Register