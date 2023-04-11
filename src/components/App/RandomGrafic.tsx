import React, {useEffect, useState} from 'react'
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
        const fetchData  = async () =>{
            const dataset: any[] = [];
            const data = await fetch(import.meta.env.VITE_BACKEND_URL)
            const res = await data.json()
            
            Object.values(res.CategoryGrafic1).forEach((item: any) => {
                dataset.push(item.price);
                })
            setData({labels: ['27.01', '26.01', '25.01'],
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            
            }]}) 
        }
       
        fetchData();       
    },[])
    
    const options ={
        plugins: {
            legend: false
        },
        responsive: true,
        maintainAspectRatio: false,
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
