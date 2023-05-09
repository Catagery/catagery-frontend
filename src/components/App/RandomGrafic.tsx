import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import getCookie from '../functions/cookies';
import style from '../styles/ModalStyle';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const csrftoken = getCookie('csrftoken')

const RandomGrafic = () => {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    let [category, SetCategory] = useState<any>()
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    const handleStartDateChange = (date) => {
        setStartDate(date.format("YYYY-MM-DD"));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date.format("YYYY-MM-DD"));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        labels: ['27.01', '26.01', '25.01'],
        datasets: [{
            data: [1, 2, 3],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 1,

        }]
    })

    const [allCategories, setAllCategories] = useState<any>([])

    let [spend, setSpend] = useState<any>(0)

    const handleSelectChange = async (event) => {
        const dataset: any[] = [];
        const categories: any[] = [];
        const labels: any[] = [];
        SetCategory(event.target.value)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + event.target.value, {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
                'Authorization': 'Bearer ' + String(authTokens.access)
            },

        }
        );
        const res = await response.json()
        const category_ = res.Category
        if (res.found) {
            Object.values(res.CategoryGrafic).forEach((item: any) => {
                dataset.push(item.price.toFixed(2));
                labels.push(item.date);
            })
            Object.values(res.Categories).forEach((category: any) => {
                categories.push([category.title, category.id]);
                if (category.id === category_.id) {
                    setSpend(category.total_spend);
                }
            })
        }
        else {
            Object.values(res.Categories).forEach((category: any) => {
                categories.push([category.title, category.id]);
                if (category.id === category_.id) {
                    setSpend(category.total_spend);
                }
            })
        }
        setData({
            labels: labels,
            datasets: [{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
            }]
        })
    };

    const handleDateChange = async () => {
        const dataset: any[] = [];
        const categories: any[] = [];
        const labels: any[] = [];
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + category + "/" + startDate + "/" + endDate, {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        });
        const res = await response.json()

        Object.values(res.CategoryGrafic).forEach((item: any) => {
            dataset.push(item.price.toFixed(2));
            labels.push(item.date);
        })
        Object.values(res.Categories).forEach((category: any) => {
            categories.push([category.title, category.id]);
            if (category.id === category) {
                setSpend(category.total_spend);
                SetCategory(category.title)
            }
        })
        setSpend(res.price.price__sum)
        setData({
            labels: labels,
            datasets: [{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
            }]
        })
    }

    // Переписать из-зи смены сериализатора
    useEffect(() => {
        const fetchData = async () => {
            const dataset: any[] = [];
            const categories: any[] = [];
            const labels: any[] = [];
            const data = await fetch(import.meta.env.VITE_BACKEND_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrftoken,
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            })
            const res = await data.json()
            const category_ = res.Category
            if (res.found) {
                Object.values(res.CategoryGrafic).forEach((item: any) => {
                    dataset.push(item.price.toFixed(2));
                    labels.push(item.date);
                })
                Object.values(res.Categories).forEach((category: any) => {
                    categories.push([category.title, category.id]);
                    if (category.id === category_.id) {
                        setSpend(category.total_spend);
                        SetCategory(category.title)
                    }
                })
            }
            else {
                Object.values(res.Categories).forEach((category: any) => {
                    categories.push([category.title, category.id]);
                    if (category.id === category_.id) {
                        setSpend(category.total_spend);
                        SetCategory(category.title)
                    }
                })
            }
            setData({
                labels: labels,
                datasets: [{
                    data: dataset,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    borderWidth: 1,
                }]
            })

            setAllCategories(categories.map((item: any) =>
                <option value={item[0]} selected={item[1] === category_.id}>
                    {item[0]}
                </option>
            ))

        }
        fetchData();
    }, [])

    const options = {
        plugins: {
            legend: false
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="random_grafic">
            <div className="random_grafic_cont">
                <h1>{category}</h1>
                <select className='category_select_random_grafic' onChange={handleSelectChange} >
                    {allCategories}
                </select>

            </div>
            <div className="cont_date_and_sum">
                <h2>{spend.toFixed(2)}$</h2>
                <button className='select_date' onClick={handleOpen}>Select date</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="calendars">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select start date"
                                inputFormat="yyyy/MM/dd"
                                onChange={handleStartDateChange}
                                startText="Start date"
                                endText="End date"
                                renderInput={(params) => <input {...params.inputProps} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select end date"
                                inputFormat="yyyy/MM/dd"
                                onChange={handleEndDateChange}
                                startText="Start date"
                                endText="End date"
                                renderInput={(params) => <input {...params.inputProps} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button onClick={handleDateChange}>Save</Button>
                    <Button onClick={handleClose}>Close modal</Button>
                </Box>
            </Modal>
            <Bar data={data} options={options}> </Bar>
        </div>
    )
}

export default RandomGrafic
