import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
    gap: '20px',
    alignItems:'center',
  };

const ModalAddPurchase = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [allCategories, setAllCategories] = useState<any>([])
    let [selectedCategory, setSelectedCategory] = useState<any>('')
    let [purchaseSum, setPurchaseSum] = useState(0)
    const save = async () =>{
        const data = await fetch(
            import.meta.env.VITE_ADD_PURCHASE_URL, 
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    category:selectedCategory,
                    sum:purchaseSum
                })
            }
            )
        const res = await data.json()
        console.log(res)
    }

    const handleChange = (event) =>{
        setSelectedCategory(event.target.value)
    }

    const setSum = (e) =>{
        setPurchaseSum(parseFloat(e.target.value))
    }

    useEffect(() => {
        const fetchData  = async () =>{
            const categories: any[] = [];
            const data = await fetch(import.meta.env.VITE_ALL_CATEGORIES_URL)
            const res = await data.json()
            console.log(res)
            Object.values(res.categories).forEach((item: any) => {
                categories.push(item.title)
                })
            setAllCategories(categories.map((item: any) => 
                <option value={item}>
                    {item}
                </option>
            ))           
            setSelectedCategory(categories[0]) 
        }
        fetchData();       
    },[])

    return(
        <div className="new_cat">
            <button className='add_new_entry_btn' onClick={handleOpen}>Add purchase</button>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={style}>
                  <select className='new_category_select' name="" id="" onChange={handleChange}>
                    {allCategories}
                  </select>
                  <input className='new_category_spended' type="text" placeholder='Enter spended sum' onChange={setSum}/>
                  <button className='add_new_category_save' onClick={save}>Add</button>
                  <Button onClick={handleClose}>Close modal</Button>
                  </Box>
              </Modal>
        </div>
       
    )
     
}
export default ModalAddPurchase
  