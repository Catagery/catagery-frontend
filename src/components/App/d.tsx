import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2'


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


const Chart = () => {
    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50],
            backgroundColor: ['black', 'white'],
            borderColor: ['black', 'white'],
        }]
    }

    const options = {

    }

    return(
        <Doughnut
        options={options}
        data={data}
        />
    )
}

export default Chart