import React, { useState, useEffect } from 'react'
import Recent from './RecentBoughts'
import RandomGrafic from './RandomGrafic'
import Sum from './Sum'
import imgSrc from '../../assets/logo.png';
import Chart from './Chart'
import ModalAddPurchase from './ModalAddPurchase';
import ModalAddCategory from './ModalAddCategory';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const App = () => {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_USER, {method:'get'})
    .then(function(e){
        setCurrentUser(true);
      })
      .catch(function(error){
        setCurrentUser(false);
      })
  }, [])

  function update_form_btn(){
    if(registrationToggle){
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false)
    } else{
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true)
    }
  }

  const submitRegistration = (e)=>{
    e.preventDefault()
    fetch(
      import.meta.env.VITE_REGISTER, 
      {
          method:"POST",
          headers:{
              'Content-Type':'application/json',
              "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
              email: email,
              username: username,
              password:password,
          })
      }
      ).then(function(res){
        fetch(
          import.meta.env.VITE_LOGIN, 
          {
              method:"POST",
              headers:{
                  'Content-Type':'application/json',
                  "X-CSRFToken": csrftoken,
              },
              body: JSON.stringify({
                  email: email,
                  username: username,
                  password:password,
              })
          })
      }).then(function(res){
        setCurrentUser(true);
      })
  }

  function submitLogin(e){
    e.preventDefault()
    fetch(
      import.meta.env.VITE_LOGIN, 
      {
          method:"POST",
          headers:{
              'Content-Type':'application/json',
              "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
              //email: email,
              username: username,
              password:password,
          })
      }
      ).then(function(res){
        setCurrentUser(true);
      })
  }

  function submitLogout(e){
    e.preventDefault()
    fetch(
      import.meta.env.VITE_LOGOUT, 
      {
          method:"get",
          headers:{
              'Content-Type':'application/json',
              "X-CSRFToken": csrftoken,
          },
      }
      ).then(function(res){
        setCurrentUser(false);
      })
  }

  if(currentUser){
    return (
      <div className="div">
        <div className="left">
          {/* <div className="container">
            <h1>Hello User</h1>
          </div> */}
          
          <div className="grafics">
          
            <Chart/>
          
            <div className="random_grafics">
                <RandomGrafic />                
                <RandomGrafic />
            </div>
          </div>
        </div>
  
        <div className="right">
        <img className='logo' src={imgSrc} alt="" />
            <Sum />       
            <ModalAddPurchase />
            <ModalAddCategory />
            <Recent/>
            <button onClick={submitLogout}>Logout</button>
        </div>
      </div>
      )
  }
  return(
    <div className="div">
      <button id='form_btn' onClick={update_form_btn}>Register</button>
      {registrationToggle ? (
        <form action="" method='POST'>
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" onClick={submitRegistration}/>
        </form>
      ) : (
        <form action="" method='POST'>
          <input type="text" onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" onClick={submitLogin}/>
        </form>
      )}
      
    </div>
  )
  
}

export default App
