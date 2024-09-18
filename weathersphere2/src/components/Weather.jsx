  import React, { useEffect, useRef, useState } from 'react'
  import './Weather.css'
  import Clearicon from '../assets/clear.png'
  import Cloudicon from '../assets/cloud.png'
  import Drizzleicon from '../assets/drizzle.png'
  import Humidityicon from '../assets/humidity.png'
  import Rainicon from '../assets/rain.png'
  import Snowicon from '../assets/snow.png'
  import Windicon from '../assets/wind.png'
  import Searchicon from '../assets/search.png'
  import Misticon from '../assets/haze.png'
  import CLearbg from '../assets/sunnyday.gif'
  import Rainbg from '../assets/Rainyb.gif'
  import Mistbg from '../assets/mistB.gif'
  import Snowbg from '../assets/snowb.gif'
  import clouds from '../assets/clouds.gif'
  import sun from '../assets/utmjeB.gif'



  const Weather = () => {
    const allicons={
      "01d": Clearicon,
      "01n": Clearicon,
      "02d": Cloudicon,
      "02n": Cloudicon,
      "03d": Cloudicon,
      "03n": Cloudicon,
      "04d": Drizzleicon,
      "04n": Drizzleicon,
      "09d": Rainicon,
      "09n": Rainicon,"10d": Rainicon,
      "10n": Rainicon,"11d": Snowicon,
      "11n": Rainicon,"13d": Snowicon,
      "13n": Snowicon,
      "50d": Misticon,
      "50n": Misticon
    }
    
    const [weatherDetail, setweatherDeatils]= useState(false);
    const[background, setbackground]= useState('');
    const inputref=useRef()
      const APIkey="aa487e12ed67ff2cd436540c7f72c10d";
    const search = async(city)=>{
      if(city===""){
        alert("Bhai City toh Daal De!!");
        return;
      }
      try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const weatherIconCode = data.weather[0].icon;
      const selectedIcon = allicons[weatherIconCode];
      const mainweather= data.weather[0].main;
      switch(mainweather){
        case "Clear":
          setbackground(sun);
          break;
        case "Clouds":
          setbackground(clouds);
          break;
        case "Rain":
        case "Drizzle":
          setbackground(Rainbg);
          break;
        case "Snow":
          setbackground(Snowbg);
          break;
        case "Mist":
        case "Fog":
        case "Haze":
          setbackground(Mistbg);
          break;
        default:
          setbackground(CLearbg); 
      }

      
        setweatherDeatils({
          humidity: data.main.humidity,
          windSpeed: Math.floor(data.wind.speed),
          temperature: Math.floor(data.main.temp),
          mintemp: Math.floor(data.main.temp_min),
          maxtemp: Math.floor(data.main.temp_max),
          feels: Math.floor(data.main.feels_like), 
          location: data.name,
          icon: selectedIcon,
          descript: data.weather[0].description,
          main: data.weather[0].main       
        })
        
      } catch (error) {
        alert("Bhai aap thoda idhar udhar nikal gye!! ");
        
      }
    }
    useEffect(()=>{
      search("chennai")

    },[])
    const getcloth = ()=>{
      if(!weatherDetail)
        return''
      const{main, temperature}= weatherDetail;
      if(main==="Clear" && temperature>=25){
        return "It's clear Brooo, You can Wear anything light and breathable..!!"
      }
      if(main==="Clear" && temperature<25){
        return "It's clear Brooo, You can wear a little warm clothes or a full sleeve shirt or T-shirt"
      }
      if(main==="Clouds" && temperature>=25){
        return"Its Cloudy Brooo, You Can Wear  light clothes and do carry an umbrella..!!"
      }
      if(main==="Clouds" && temperature<25){
        return"Its Cloudy Brooo, You Can Wear a warm clothes and do carry an umbrella..!!"
      }
      if(main==="Mist"){
        return"Its Misty Brooo, You can wear a warm clothes and some water-resistant layer...!!"
      }
      if(main==="Rain"){
        return"It's Rainy Brooo, You can wear a Raincoat and taking an umbrella is must..!!"
      }
      if(main==="Snow"){
        return"Its Snowing Brooo, You can wear Heavy jackets and warm clothes and try to be inside..!!"
      }
      return "Mausam Badiya Hai Bro Chill Kar Kuch Bhi Pehan Le..!!"
    }
    
    return (
      <>
      <div className='weather ' style={{ backgroundImage: `url(${background})` }}>
        <div className="searchbar">
          <input ref={inputref} type="text" placeholder='Search' />
          <img  className="searchicon" src={Searchicon} alt="icon" onClick={()=>search(inputref.current.value)} />
          </div>
          <img className='Clear' src={weatherDetail.icon} alt="Clear"/> 
          <p className='Temp'>{weatherDetail.temperature}°C</p>
          <p className='description'>{weatherDetail.descript}</p>
          <p className='Location'>{weatherDetail.location}</p>
          <p className='feel'>Feels Like:<span>{weatherDetail.feels}°C</span></p>
          <div className="other">
          <div className="detail1">
              <img src={Humidityicon} alt="humid" />
              <p className='humidity'>{weatherDetail.humidity}% </p>

          </div>
          <div className="detail2">
              <img src={Windicon} alt="wind" />
              <p className='wind'>{weatherDetail.windSpeed}km/h </p>
          
            
          </div>
          </div>
          <div className="minmax">
            <p>Min Temp: <span>{weatherDetail.mintemp}°C</span></p>
            <p>Max Temp:<span>{weatherDetail.maxtemp}°C</span></p>
          </div>
      </div>
      <div className="cloth">
        <h1 className='head1'>Clothing Suggestions</h1>
        <h2 className="head2">Suggestions for your dressing on the basis of weather are:</h2>
        <p className='tp'>Temperature: <span>{weatherDetail.temperature}°C</span></p>
        <p className="sugg">{getcloth()} </p>
        <img className='botimg' src={weatherDetail.icon} alt="Clear"/> 
        <img className='botimg2
        ' src={weatherDetail.icon} alt="Clear"/> 

      </div>
      </>
    )
  }


  export default Weather
