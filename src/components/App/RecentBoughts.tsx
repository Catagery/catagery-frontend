import React, {useState, useEffect} from 'react'

const Recent = () => {
  const [recent, setRecent] = useState<any>([])

  useEffect(() => {
    const fetchData  = async () =>{
        const dataset: any[] = [];
        const data = await fetch(import.meta.env.VITE_RECENT_PURCHASES_URL)
        const res = await data.json()
        console.log(res)
        Object.values(res.recentPurchases).forEach((item: any) => {
            dataset.push(item);
            })

        setRecent(dataset.map((item: any) => 
        <div className="recent_item">
          <div className="c">
            <div className="color" style={{backgroundColor:'black'}}></div>
            <div className="textCont">
                <h2>{item.category_name}</h2>
                <p>{item.date}</p>
            </div>
          </div>
          <h2>{item.price}$</h2>
        </div>
        ))            
        
    }
    fetchData();       
  },[])

    return (
      <div className="recent_item_containers">
        <h1>Recent purchaces</h1>
          {recent}
      </div>
      )
  }
  
  export default Recent
