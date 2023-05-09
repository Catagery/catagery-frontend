import React, { useState, useEffect } from 'react'
import Recent from './RecentBoughts'
import RandomGrafic from './RandomGrafic'
import Sum from './Sum'
import imgSrc from '../../assets/logo.png';
import Chart from './Chart'
import ModalAddPurchase from './ModalAddPurchase';
import ModalAddCategory from './ModalAddCategory';
import getCookie from '../functions/cookies';
import jwt_decode from 'jwt-decode';

const csrftoken = getCookie('csrftoken')
const App = () => {

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
  let [loading, setLoading] = useState(true)
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  // Create the submit method.
  const login = async e => {
    e.preventDefault();
    // Create the POST requuest
    const response = await fetch('http://localhost:8000/users/token/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ 'username': username, 'password': password })
    });
    let data = await response.json()
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))

    } else {
      alert('Something went wrong!')
    }
  }

  const register = async e => {
    e.preventDefault();
    // Create the POST requuest
    const response = await fetch('http://localhost:8000/users/register/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ 'username': username, 'password': password, 'email': email })
    });
    let data = await response.json()
    if (response.status === 201) {
      alert("please login")

    } else {
      alert('Something went wrong!')
    }
  }

  let logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  let updateToken = async () => {

    let response = await fetch('http://127.0.0.1:8000/users/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ 'refresh': authTokens?.refresh })
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      logout()
    }

    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {

    if (loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loading])

  return (
    <div>
      {user ? <div className="div">
        <div className="left">
          <div className="container">
            <h1>Hello User</h1>
          </div>

          <div className="grafics">

            <Chart />

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
          <Recent />
          <button onClick={logout}>Logout</button>
        </div>
      </div>

        : <div className="form_cont">
            {registrationToggle ? (
              <form className='form' action="" method='POST'>
                <input className='data_input' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                <input className='data_input' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input className='data_input' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <input className='submit' type="submit" onClick={register}/>
              </form>
            ) : (
              <form className='form' action="" method='POST'>
                <input className='data_input' placeholder='Username' type="text" onChange={(e) => setUsername(e.target.value)}/>
                <input className='data_input' placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input className='submit' type="submit" onClick={login}/>
              </form>
            )}
            <button className='register_login_btn' id='form_btn' onClick={update_form_btn}>Register</button>
          </div>}
    </div>

  )
}

export default App
