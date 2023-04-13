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

    const [allCategories, setAllCategories] = useState<any>([])

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = async (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
        const dataset: any[] = [];
        const categories: any[] = [];
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + selectedValue);
        const res = await response.json()

        Object.values(res.CategoryGrafic).forEach((item: any) => {
            dataset.push(item.price);
            })
        Object.values(res.Categories).forEach((category: any) => {
            categories.push([category.title, category.id]);
            })

        setData({labels: ['27.01', '26.01', '25.01'],
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            }]})     
      };
    
    useEffect(() => {
        const fetchData  = async () =>{
            const dataset: any[] = [];
            const categories: any[] = [];
            const data = await fetch(import.meta.env.VITE_BACKEND_URL)
            const res = await data.json()

            Object.values(res.CategoryGrafic).forEach((item: any) => {
                dataset.push(item.price);
                })
            Object.values(res.Categories).forEach((category: any) => {
                categories.push([category.title, category.id]);
                })

            setData({labels: ['27.01', '26.01', '25.01'],
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            }]}) 

            setAllCategories(categories.map((item: any) => 
            <option value={item[0]} selected={item[1] === res.CategoryGrafic[0].category}>
                {item[0]}
            </option>
            ))            
            
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
                 <select className='category_select_random_grafic' onChange={handleSelectChange} >
                    {allCategories}
                 </select>
                 
             </div>
             <h2>100$</h2>
            <Bar data={data} options={options}> </Bar>
        </div>
    )
}

export default RandomGrafic
