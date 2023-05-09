import React, {useEffect, useState} from 'react'
import getCookie from '../functions/cookies';

const csrftoken = getCookie('csrftoken')
const Sum = () => {
    let [sum, setSum] = useState();
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    
    useEffect(() => {
        const getSpends = async () =>{
            const data = await fetch("http://127.0.0.1:8000/api/v1/spended", {
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrftoken,
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            })
            const res = await data.json();
            setSum(res.sum.price__sum.toFixed(2));
        }
        getSpends();
    }, [])

    return (
        <div className="spends">
            <h1 className='sum_title'>Total spend:</h1>
            <h1 className='sum'>{sum}$</h1>
        </div>
        
    )
}

export default Sum