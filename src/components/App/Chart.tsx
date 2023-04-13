import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2'
import { useEffect, useState} from 'react';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const my_options ={
    plugins: {
        legend: false
    },
}

const Chart = () => {
    const [listItems, setListItems] = useState<any>([])

    const [data, setData] = useState<any>({
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50],
            backgroundColor: ['black', 'white'],
            borderColor: ['black', 'white'],
        }]
    })
    
    const dataset: any[] = [];
    const chartData: any[] = [];
    
    useEffect(() => {
        const fetchData  = async () =>{
           
            const data = await fetch(import.meta.env.VITE_TOP_CATEGORIES)
            const res = await data.json()
            //console.log(res)
            Object.values(res.top_categories).forEach((item: any) => {
                dataset.push(item);
                })
            Object.values(res.all_categories).forEach((item: any) => {
                chartData.push(item);
                })
            setData({labels: null,
            datasets:[{
                data: chartData.map((item: any) => item.total_spend),
                backgroundColor: dataset.map((item: any) => item.color),
                borderColor: 'black',
                borderWidth:1,
            
            }]}) 
            //console.log(dataset)
            setListItems(dataset.map((item: any) => 
            <li className='top_category_wrapper'>
                <div className="cat_color" style={{backgroundColor: item.color}}></div>
                <p>{item.title}</p>
            </li>
            ))
        }
       
        fetchData();       
    },[])

    return(
        <div className="pieGrafic">
             <Doughnut
            options={my_options}
            data={data}
            />
            <ul className="categories">
                {listItems}
            </ul>

        </div>
       
    )
}

export default Chart