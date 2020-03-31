
import React, { useState, useEffect } from 'react';

function App() {
  const [city,setcity]=useState("berlin")
  const [data,setData]=useState([])
  const [checkdata,setloading]=useState(false)
  const [err,setErr]=useState("")

const getData=(e)=>{
  e.preventDefault();
  FetchData()
}
const FetchData=()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_KEY}&units=metric`)
  .then(res=>res.json())
  .then(res1=>{
    
    if(Object.keys(res1).includes("message")){
       setErr(res1.message)
    } else{
      setData(res1)
      setloading(true)
    }
   
    console.log(res1)
  })
}


useEffect(()=>{
  FetchData()
},[])



  return (
    <div className="App">
      <h1>Weather App</h1>

      <div>
        <form onSubmit={getData}>
          <label>
            <input type="text" placeholder="city name" onChange={e=>setcity(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
         <h2>{err}</h2>
        <h2>City: {checkdata ? data.name:null }</h2>
        <h2>Current Temperature: {checkdata ? data.main.temp :null } C° </h2>
        <h3>Max-Temperature: {checkdata ? data.main.temp_max:null} C°</h3>
        <h3>Min-Temperature: {checkdata ? data.main.temp_min:null} C°</h3>
          <h4>Humidity: {checkdata ? data.main.humidity:null} %</h4>
      </div>
    </div>
  );
}


export default App;