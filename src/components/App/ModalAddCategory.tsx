import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { HexColorPicker } from "react-colorful";

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

const ModalAddCategory = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        setText('')
    };
    const handleClose = () => setOpen(false);
    let [newCategory, setNewCategory] = useState<any>('')
    let [text, setText] = useState<any>('')
    const [color, setColor] = useState("#aabbcc");

    const save = async () =>{
        const data = await fetch(
            import.meta.env.VITE_ADD_CATEGORY_URL, 
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    category: newCategory,
                    color: color,
                })
            }
            )
        const res = await data.json()
        if(!res.created){
            setText("That category already exists or you didn't provide category name")
        }
        else{
            window.location.reload(); 
        }
    }

    const getCategory = (e) =>{
        setNewCategory(e.target.value)
    }
    return(
        <div className="new_cat">
            <button className='add_new_category_btn' onClick={handleOpen}>Add category</button>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={style}>
                    <h3>Choose a category color:</h3>
                    <HexColorPicker color={color} onChange={setColor} />
                  <input className='new_category_spended' type="text" placeholder='Enter category name' onChange={getCategory}/>
                  <p>{text}</p>
                  <button className='add_new_category_save' onClick={save}>Add</button>
                  <Button onClick={handleClose}>Close</Button>
                  </Box>
              </Modal>
        </div>
    )
}
export default ModalAddCategory
  