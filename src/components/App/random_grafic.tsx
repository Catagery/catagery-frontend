import React, {useLayoutEffect, useEffect, useState} from 'react'
import axios from 'axios'
// import * as V from 'victory';
// import { VictoryPie, VictoryLabel, VictoryTooltip, VictoryTheme, VictoryBar } from 'victory';

// const RandomGrafic = () => {
//     return (
//         <div className="random_grafic">
//             <div className="random_grafic_cont">
//                 <h1>Category</h1>
//                 <select className='category_select_random_grafic' name="" id="">
//                     <option value="Cat1">option1</option>
//                     <option value="Cat2">option2</option>
//                     <option value="Cat3">option3</option>
//                 </select>
//             </div>
//             <VictoryBar
//             data={[
//                 { y: 5, fill: "green" },
//                  {y: 4, fill: "green" },
//                 { y: 2, fill: "green" },
//                 { y: 3, fill: "green" },
//                 { y: 1, fill: "green" }
//               ]}
//             labels={({ datum }) => `y: ${datum.y}`}
//             />
//         </div>
//     )
// }

// export default RandomGrafic

import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const RandomGrafic = () => {
    let g_data: any[] = []
    // const handleFetchData = async () => {
    //     const response = await fetch(`http://127.0.0.1:8000/api/v1/category_grafic/`);
    //     const data = await response.json();
    //     for(let i = 0; i < data['category_grafic_1'].length; i++){
    //         g_data.push(data['category_grafic_1'][i]['price'])
    //     }
    //     console.log(data);
    // }
    
    // useEffect(() => {
    //     handleFetchData();
    // },[])
    
    
    // useEffect(() => {
    //      fetch("http://127.0.0.1:8000/api/v1/category_grafic/")
    //     .then(response => {
    //         if(response.ok) {
    //             return response.json();
    //         }
    //         throw response
    //     })
    //     .then(  data => {
    //         for(let i = 0; i < data['category_grafic_1'].length; i++){
    //             g_data.push(data['category_grafic_1'][i]['price'])
    //         }
    //         console.log(g_data)
    //         // Do something with the data
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    
    // })

    let myChart = document.getElementById('myChart');

    async function getData() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/category_grafic/");
        const fetch_data = await response.json();
        console.log(fetch_data);
        return fetch_data;
        }
        getData().then(fetch_data =>{
            const price = fetch_data.category_grafic_1.map(function(index){
                return index.price
            })
            console.log(price)
            //myChart.config.data.labels[0].data = price;
        })

    const data = {
        labels: ['27.01', '26.01', '25.01'],
        datasets:[{
            data: [1],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth:1,

        }]
    }
    const options ={
        plugins: {
            legend: false
        },
        responsive: true,
        maintainAspectRatio: false,
        //barThickness:20
    }



    return(
        <div className="random_grafic">
             <div className="random_grafic_cont">
                 <h1>Category</h1>
                 <select className='category_select_random_grafic' name="" id="">
                     <option value="Cat1">option1</option>
                     <option value="Cat2">option2</option>
                     <option value="Cat3">option3</option>
                 </select>
                 
             </div>
             <h2>100$</h2>
            <Bar id='myChart' data={data} options={options}> </Bar>
        </div>
    )
}

export default RandomGrafic
