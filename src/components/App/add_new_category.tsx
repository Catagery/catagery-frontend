import React from 'react';



const Modal = ({active, setActive}) =>{
    return (
        <div className={active ? "active" : "non_active"}  onClick={() => setActive(false)}>
            <p>Modal</p>
        </div>
    )
}

export default Modal