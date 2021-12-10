import React, { useEffect, useState } from "react";
import { Visibility,CloudQueue,Opacity } from '@material-ui/icons';
import Daily from "./Daily";
import Hourly from "./Hourly";
import ".././scss/Forecast.scss";

import "./weather.css";

const Forcast = ({ lat, lon, details }) => {
  const [forecast, setForecast] = useState("");
  // console.log(lat, lon);
 let country= new Intl.DisplayNames(['en'], {type: 'region'})
  // console.log(forecast);
  // console.log(details);
  const error = {
    cod: "404",
    message: "city not found",
  };
  const secondsToTime = (seconds)=> {
    var time= new Date(seconds * 1000).toLocaleTimeString()
    return time
}
  useEffect(() => {
    const getForecast = async () => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1f88de141e5da64033516996d4642279&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setForecast(data);
      // console.log(url);
    };
    getForecast();
  }, [lat, lon]);
  return (
    <div className="forecast">
      {details.message !== error.message
        ? forecast && (
            <div>
              <div className="main">
                <div className="city_name-div">
                  <h1 className="city_name">
                    {details.name} 
                    <img
                      className="main_logo"
                      src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`}
                      alt={details.weather[0].description}
                    />
                  </h1>
                  <p className="country">{country.of(details.sys.country)}</p>
                </div>

                <span className="temp">
                  {Math.round(details.main.temp)} <sup>°</sup>C
                </span>
                <p className="description">{details.weather[0].description}</p>
                <p>
                  {forecast.daily[0].temp.min}°C / {forecast.daily[0].temp.max}
                  °C
                </p>

                {/* <p>{weather.weather[0].description}</p> */}
              </div>
              <p className="last">Last updated at {secondsToTime(forecast.current.dt)}</p>
              <Hourly data={forecast.hourly} />
              <Daily data={forecast.daily} />
          
              <div className="day_details">
                <div className="others">
                  <div>
                  <img className="iconn" src="https://img.icons8.com/ios/50/000000/rain--v1.png"/>
                    <span>Precipitation <br /> {forecast.hourly[0].pop *100}%</span>
                  </div>

                  <div>
                    <img className="iconn" src="https://image.flaticon.com/icons/png/128/632/632517.png"/>
                  <span>Pressure <br />{forecast.hourly[0].pressure} hPa </span>
                  </div>
                  <div>
                  <img className="iconn" src="https://img.icons8.com/ios/50/000000/cloud.png"/>
                  <span>Cloudiness <br /> {forecast.hourly[0].clouds} %</span>
                  </div>
                  <div>
                  <img className="iconn" src="https://img.icons8.com/ios/50/000000/visible--v1.png"/>
                    <span>Visibility <br />{forecast.hourly[0].visibility}m</span>
                  </div>
                </div>
                  <hr />
            
                <div className="humidity">
                  <h1 className='section'> Comfort Level  <Opacity /></h1>
                 
                  <div>
                    <div>
                      <span>Humidity</span>
                      <span id="humidity_value">
                        {forecast.hourly[0].humidity}%
                      </span>
                    </div>
                    <div className='content'>
                      <span>feels like: {forecast.hourly[0].feels_like}°</span>
                      <span>UV: {forecast.hourly[0].uvi}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="wind">
                  <h1 className='section'>Wind <img className="iconn" src="https://img.icons8.com/ios-glyphs/30/000000/wind--v1.png"/></h1>
                  {/* ▷ */}
                 
                  <div>
                    <div>
                      {/* <img src="https://www.pinclipart.com/picdir/big/73-735391_wind-turbine-blades-png-jpg-free-download-wind.png" alt="" /> */}
                      <img
                        className="windmill"
                        src="https://media4.giphy.com/media/xVFpxZnIhW4CuQTJ1M/giphy.gif?cid=790b7611d180eee79af402a5fcfcb4b5219382d32ddba23b&rid=giphy.gif&ct=s"
                        alt=""
                      />
                      {/* <img className='windmill' src="https://media1.giphy.com/media/SQSxROvkJ74zEtzB0Q/giphy.gif?cid=790b7611e25126e47859c545227353d0f6f7c2c8fdc3e835&rid=giphy.gif&ct=s"></img> */}
                    </div>
                    <div className='content'>
                      <span>Direction: {forecast.hourly[0].wind_deg}°</span>
                      <span>Speed: {Math.round(forecast.hourly[0].wind_speed * 18/5)} km/s</span>
                    </div>
                  </div>
                </div>
                  <hr />
                <div className="sun_moon">
                  <h1 className='section'> Sun / Moon  <img className="iconn" src="https://img.icons8.com/ios/50/000000/sun--v1.png"/></h1>

                  <div className='sun'>
                      <i class="icon fas fa-sun"></i>
                      <div>
                      <img className="sunimg" src="https://www.animatedimages.org/data/media/278/animated-sun-image-0856.gif" alt="" />
                        <p>Sunrise: {secondsToTime(forecast.daily[0].sunrise)}</p>
                        <p>Sunset: {secondsToTime(forecast.daily[0].sunset)}</p>
                      </div>
                  </div>
                  <hr />
                  <div className="moon">
                      <img className="moonimg" src="https://bestanimations.com/Earth&Space/Moon/moon-animation37.gif" alt="" />
                      <i class="icon fas fa-moon"></i>
                      <div>
                        <p>Moonrise: {secondsToTime(forecast.daily[0].moonrise)}</p>
                        <p>Moonset: {secondsToTime(forecast.daily[0].moonset)}</p>
                      </div>
                  </div>

                </div>
                
              </div>
            </div>
          )
        : <div><div className="oopsmsg"><h1>"Opps! City Not Found"</h1></div>
      
      <a href="https://weatherpoints.netlify.app/">
        <img className="oops" src="https://cdn.dribbble.com/users/469578/screenshots/2597126/404-drib23.gif" alt="City Not Found"/>
</a>
        </div>}

     
    </div>
    
  );
};

export default Forcast;