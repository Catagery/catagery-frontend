import React, {Component, Fragment, useState} from 'react'

import Recent from './RecentBoughts'
import RandomGrafic from './RandomGrafic'
import Sum from './Sum'
import imgSrc from '../../assets/logo.png';
import Modal from './AddNewCategory'
import Chart from './Chart'


const App = () => {

  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="div">
      <div className="left">
        <div className="container">
          <h1>Hello User</h1>
        </div>
        
        <div className="grafics">
          <div className="pieGrafic">
            <Chart />
          </div>
          <div className="random_grafics">
              <RandomGrafic />                
              <RandomGrafic />
          </div>
        </div>
      </div>

      <div className="right">
      <img className='logo' src={imgSrc} alt="" />
          <Sum />
          <button className='add_new_entry_btn' onClick={() => setModalActive(true)}>Add New Entry</button>
          <Recent />
      </div>
    </div>
    )
}

export default App