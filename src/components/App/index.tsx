import React, {Component, Fragment, useState} from 'react'
import MainPage from './mainpage'
import Recent from './recent_boughts'
import RandomGrafic from './random_grafic'
import Sum from './sum'
import imgSrc from '../../assets/logo.png';
import Modal from './add_new_category'
import Chart from './d'


const App = () => {

  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="div">
      <div className="left">
        <div className="container">
          <h1>Hello User</h1>
        </div>
        
        <div className="grafics">

          <div className="random_grafics">
            <div id="mychart"></div>
            <Fragment>
              <RandomGrafic />
            </Fragment>

            {/* <Fragment>
              <RandomGrafic />
            </Fragment>

            <Fragment>
              <RandomGrafic />
            </Fragment> */}
          </div>

          <div className="pieGrafic">
            <Fragment >
              <Chart />
            </Fragment>
          </div>

        </div>

      </div>

      <div className="right">
      <img className='logo' src={imgSrc} alt="" />
          <Fragment>
            <Sum />
          </Fragment>
          <Fragment>
            <Modal active={modalActive} setActive={setModalActive}/>
          </Fragment> 
          <button className='add_new_entry_btn' onClick={() => setModalActive(true)}>Add New Entry</button>
          <Fragment>
            <Recent />
          </Fragment>


      </div>
    </div>
    )
}

export default App