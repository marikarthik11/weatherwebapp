import React from 'react'
import './weather.css'

const Daily = ({ data }) => {
    // data.shift()
    const secondsToTime = (seconds)=> {
        var date= new Date(seconds * 1000).toLocaleDateString();
        return date
    }

    return (
        <div className="day-forecast">
             {/* {console.log(data)}  */}
           <div className="day-forecast-iteam">
             <div className="map2">
             {  data.map( (elem,ind) => (
                    <div className="key" key={ind}>
        <div className="all">
            <div className="top ">
                <div className="forecast-item">
                 <div className="date"><h2>{secondsToTime(elem.dt)}</h2></div>
                 <div className="temp"><img className='icon' src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt={elem.weather[0].description}/></div>
                 <div className="temp">{Math.round(elem.temp.min)}<sup>°</sup> / {Math.round(elem.temp.max)}<sup>°</sup></div>
                </div>
            </div>
        </div>
            
            </div>
                   
                ))}
            </div>   
           </div>
        </div>





       


    )
}

export default Daily