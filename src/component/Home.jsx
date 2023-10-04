import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './home.css'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Home = ({ history }) => {

  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo1")) {
      nav('/s')
    }
  }, [history])

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
        <p>Made With 💛 by SHIBAM</p>
        </BrowserView>
        <MobileView>
        <h1>Bro/Sis WHY tf You are using mobile to open this website.. You are an EMGINEER atleast use laptop ..</h1>
        </MobileView>
      </div>
    </div>




    //     <div>
    //     <div class="jumbotron centered align-items-center">
    //     <div class="container  ">
    //     <h1 class="display-3 mt-3 mb-3">JOLUBOOK</h1>
    //     <a class="btn btn-light btn-lg mr-2" href="/register" role="button">Register</a>
    //     <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>
    //   </div>
    //   </div>
    // </div>
  )
}
export default Home;