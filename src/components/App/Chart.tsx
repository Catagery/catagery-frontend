import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react';
import getCookie from '../functions/cookies';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const my_options = {
    plugins: {
        legend: {
            display: false,
            rotation: 45,
        }
    }
}

const csrftoken = getCookie('csrftoken')

const Chart = () => {
    const [listItems, setListItems] = useState<any>([])
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
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
        const fetchData = async () => {
            const data = await fetch(import.meta.env.VITE_TOP_CATEGORIES, {
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrftoken,
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            })
            const res = await data.json()
            //console.log(res)
            Object.values(res.top_categories).forEach((item: any) => {
                dataset.push(item);
            })
            Object.values(res.all_categories).forEach((item: any) => {
                chartData.push(item);
            })
            setData({
                labels: chartData.map((item: any) => item.title),
                datasets: [{
                    data: chartData.map((item: any) => item.total_spend.toFixed(2)),
                    backgroundColor: chartData.map((item: any) => item.color),
                    borderColor: 'black',
                    borderWidth: 1,

                }]
            })
            //console.log(dataset)
            setListItems(dataset.map((item: any) =>
                <li className='top_category_wrapper'>
                    <div className="cat_color" style={{ backgroundColor: item.color }}></div>
                    <p>{item.title}</p>
                </li>
            ))
        }
        fetchData();
    }, [])

    return (
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