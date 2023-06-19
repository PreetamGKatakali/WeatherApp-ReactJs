import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";



function App() {
  let [state,setstate]=useState()
  let [getdata,setgetdata]=useState(false)
  let [current,setcurrent]=useState()
  let [weather,setweather]=useState()
  let [humidity,sethumidity]=useState()
  let [temp,settemp]=useState()
  let [time,settime]=useState()
  let [place,setplace]=useState()
  let [windspeed,setwindspeed]=useState()
  let [title,settitle]=useState()
  let data;
  const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes();
  const api = {
    key: "<YOUR API ID>",
    base: `<BASE URL WITH SEARCH WORD>`
  }

  const fecthApiData=async (url)=>{
    try{
      const res=await fetch(url)
      data=await res.json()
      console.log(data)
      setgetdata(true)
      setcurrent(data.current.condition.icon)
      sethumidity(data.current.humidity)
      settemp(data.current.temp_c)
      settime(data.location.localtime)
      setplace(data.location.name)
      setstate(data.location.region)
      setwindspeed(data.current.wind_kph)
      settitle(data.current.condition.text)
      
    }
    catch(error){
      console.log(error)
    }
  }
  
  function search(){
    fecthApiData(api.base)
    console.log(weather)
  }
  function text(event){
    setweather(event.target.value)
  }
  


  return (
    <div>
    <h1 className='text-col'>Welcome Weather ReactJS</h1>
    <input type="text"  placeholder="Enter country or city" id='mytext'onChange={text}/>
    <button type='submit' onClick={search}>submit</button>
    {/* <h2 className='text-col'>{time}</h2> */}
    { (getdata===true) && <h2 className='text-col time'>{showTime}</h2>}
    <img src={current} className='img'/>
    { (getdata===true) && <h3 className='text-col place'>{place}/{state}</h3>}
    <h2 className={`text-col ${getdata ? "title":'title'}`}>{title}</h2>
    <div className={`container ${getdata ? "pos-container":'title'}`}>
      { (getdata===false) && <p className='sub-container'>humidity:_ /_</p>}
      { (getdata===true) && <p className='sub-container'>humidity:{humidity}</p>}
      { (getdata===true) && <p className='temp-cel'>{temp} &#8451;</p>}
      { (getdata===false) && <p className='sub-container'>windspeed :_ /_</p>}
      { (getdata===true) && <p className='sub-container'>windspeed :{windspeed}</p>}
    </div>
    </div>
  );
}

export default App;
