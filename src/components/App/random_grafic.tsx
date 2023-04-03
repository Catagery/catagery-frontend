import React, {useLayoutEffect, useEffect, useState} from 'react'
import axios from 'axios'


import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)




const RandomGrafic = () => {
   

    const [data, setData] = useState({
        labels: ['27.01', '26.01', '25.01'],
        datasets:[{
            data: [1,2,3],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth:1,
    
        }]
    })
    useEffect(() => {
        const fetchData = async() =>{
            const dataset = [];
            await fetch("http://127.0.0.1:8000/api/v1/category_grafic/")
            .then(data => {
                const res = data.json()
                return res
                
            }).then((res) =>{
                console.log(res.category_grafic_1)
                for(const val of Object.keys(res.category_grafic_1)){
                    dataset.push(res.category_grafic_1[val].price)
                }
                setData({labels: ['27.01', '26.01', '25.01'],
                datasets:[{
                    data: dataset,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth:1,
            
                }]})
                //console.log(dataset)
            })
            .catch(error => {
                console.error(error);
            });
        }
       
        fetchData();       
    },[])

    

    // async function getData() {
    //     const response = await fetch("http://127.0.0.1:8000/api/v1/category_grafic/");
    //     const fetch_data = await response.json();
    //     console.log(fetch_data);
    //     return fetch_data;
    //     }
    //     getData().then(fetch_data =>{
    //         const price = fetch_data.category_grafic_1.map(function(index){
    //             return index.price
    //         })
    //         console.log(price)
    //     })

    // const data = {
    //     labels: ['27.01', '26.01', '25.01'],
    //     datasets:[{
    //         data: g_data,
    //         backgroundColor: 'black',
    //         borderColor: 'black',
    //         borderWidth:1,

    //     }]
    // }
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
            <Bar data={data} options={options}> </Bar>
        </div>
    )
}

export default RandomGrafic
