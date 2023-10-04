import React,{useState , useEffect} from 'react'
import axios from "axios";
import { Button, ButtonGroup } from '@chakra-ui/react'
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import './home.css'


const Login = ({history}) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");

const nav = useNavigate();


 useEffect(()=>{
    if(localStorage.getItem("userInfo1"))
    {
         nav('/s')
    }
  },[history])


const [data,setData] = useState({})
const handleClick = async (event) => {
      event.preventDefault();
    setLoading(true)
    if (!data.email || !data.password) {
      toast.warning('Please Fill all the Feilds',{position: toast.POSITION.TOP_LEFT})
      return;
    }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        
    };
    try{
    const response = await fetch('https://jolubook-backend-production.up.railway.app/api/users/login', requestOptions);
    const Data = await response.json();
    console.log("USER INFO I")
    console.log(Data);
    
    if(Data.success){
    localStorage.setItem("userInfo1", JSON.stringify(Data));
    toast.success('Successful Login',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    setLoading(false)
    nav('/s')
    }
  else 
  {
    throw Data
  }
  }catch(Data){
      console.log(Data)
      toast.warning(Data.errors,{position: toast.POSITION.TOP_LEFT,autoClose:1000})
      setLoading(false)

  }
    
  }
function handleChange(event)
  {
       const {name,value} = event.target;

       setData((pre)=>{
         return {
         ...pre,
         [name]:value,

         }
       })

  }

  return (
    <div>
      


      <div class="area" >
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >



      <div class="context">
        <BrowserView>
        <h1>Welcome To JOLUBOOK</h1>
        <a href="/register" role="button">
        <button class="button">
          <span class="button-text">Continue..</span>
          <div class="fill-container"></div>
        </button>
        </a>
        </BrowserView>
        <MobileView>
        <h1>Bro/Sis WHY tf You are using mobile to open this website.. You are an EMGINEER atleast use laptop ..</h1>
        </MobileView>
      </div>
    </div>
  )
}
export default Login