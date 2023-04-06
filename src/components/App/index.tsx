import React from 'react'
import Recent from './RecentBoughts'
import RandomGrafic from './RandomGrafic'
import Sum from './Sum2'
import imgSrc from '../../assets/logo.png';
import Chart from './Chart'

const App = () => {

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
          <button className='add_new_entry_btn'>Add New Entry</button>
          <Recent />
      </div>
    </div>
    )
}

export default App