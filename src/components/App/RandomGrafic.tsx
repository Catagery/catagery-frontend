import React, {useLayoutEffect, useEffect, useState} from 'react'
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
            const dataset: any[] = [];
            await fetch(import.meta.env.VITE_BACKEND_URL)
            .then(data => {
                const res = data.json()
                return res
                
            }).then((res) =>{
                for(const val of Object.keys(res.CategoryGrafic1)){
                    dataset.push(res.CategoryGrafic1[val].price)
                }
                setData({labels: ['27.01', '26.01', '25.01'],
                datasets:[{
                    data: dataset,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth:1,
            
                }]})
            })
            .catch(error => {
                console.error(error);
            });
        }
       
        fetchData();       
    },[])

    
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
