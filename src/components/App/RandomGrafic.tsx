import React, {useEffect, useState} from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column' as 'column',
  };
  
const RandomGrafic = () => {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    let [category, SetCategory] = useState<any>()

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
        datasets:[{
            data: [1,2,3],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth:1,
    
        }]
    })

    const [allCategories, setAllCategories] = useState<any>([])

    let [spend, setSpend] = useState<any>('')

    const handleSelectChange = async (event) => {
        const dataset: any[] = [];
        const categories: any[] = [];
        const labels: any[] = [];
        SetCategory(event.target.value)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + event.target.value);
        const res = await response.json()
        const category_ = res.CategoryGrafic[0].category;
        Object.values(res.CategoryGrafic).forEach((item: any) => {
            dataset.push(item.price);
            labels.push(item.date);
            })
        Object.values(res.Categories).forEach((category: any) => {
            categories.push([category.title, category.id]);
            if(category.id === category_){
                setSpend(category.total_spend);
            }
            })

        setData({labels: labels,
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            }]})     
      };

    const handleDateChange = async () => {
        const dataset: any[] = [];
        const categories: any[] = [];
        const labels: any[] = [];
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + category + "/" + startDate + "/" + endDate);
        const res = await response.json()

        Object.values(res.CategoryGrafic).forEach((item: any) => {
            dataset.push(item.price);
            labels.push(item.date);
            })
        Object.values(res.Categories).forEach((category: any) => {
            categories.push([category.title, category.id]);
            if(category.id === category){
                setSpend(category.total_spend);
            }
            })

        setData({labels: labels,
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            }]})     
    }

        // Переписать из-зи смены сериализатора
    useEffect(() => {
        const fetchData  = async () =>{
            const dataset: any[] = [];
            const categories: any[] = [];
            const labels: any[] = [];
            const data = await fetch(import.meta.env.VITE_BACKEND_URL)
            const res = await data.json()
            const category_ = res.CategoryGrafic[0].category_name;
            SetCategory(category_)
            Object.values(res.CategoryGrafic).forEach((item: any) => {
                dataset.push(item.price);
                labels.push(item.date);
                })
            Object.values(res.Categories).forEach((category: any) => {
                categories.push(category.title);
                if(category.title === category_){
                    setSpend(category.total_spend);
                }
                })

            setData({labels: labels,
            datasets:[{
                data: dataset,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth:1,
            }]}) 

            setAllCategories(categories.map((item: any) => 
            <option value={item} selected={item === res.CategoryGrafic[0].category_name}>
                {item}
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
             <h2>{spend}$</h2>
             <Button onClick={handleOpen}>Open modal</Button>
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
