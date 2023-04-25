import React from 'react'
import Recent from './RecentBoughts'
import RandomGrafic from './RandomGrafic'
import Sum from './Sum'
import imgSrc from '../../assets/logo.png';
import Chart from './Chart'
import ModalAddPurchase from './ModalAddPurchase';
import ModalAddCategory from './ModalAddCategory';

const App = () => {

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
      </div>
    </div>
    )
}

export default App
