import axios from "axios";
import { useState, useEffect } from "react";
import "./app.css";
import { nanoid } from 'nanoid'
/*this object will have your keys and the base urs*/
/* please get your key from https://home.openweathermap.org/users/sign_up */

const api = {
  key: "118f17ba2e1c4f519f67d7813b826767",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const cities = ["Select a City", "Bishkek",'Batken', "California", "Sonsonate", "Warsaw", "Oslo", "Jalal-Abad"];
  
  const [selectedCity, setSelectedCity] = useState(cities[1]);
  const [weather, setWeather] = useState([])

  /*create a fuction to call the api*/
  /* here you have a model of the api*/
  /* `${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`*/
  const apiCall = async() => {
    const req = await axios.get(`${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`)
    setWeather(req.data)
  }
  
  useEffect(() => {
    apiCall()
  },[selectedCity])

  console.log(weather)

  const handleChange = (e) => {
    setSelectedCity(e.target.value)
  }
  // here is needed to filter the data that you aredy got from your API
  //
  // HINT !!!! maybe when you call the API the will be empty and you will have an error

  // const newData = weather ? [weather] : []
  // console.log(newData);
  return (
    <div className="container warm">
      
      <div className=" app warm">
        <main>
          <div className="top">
            <div className="location">{Object.keys(weather).length ? <h4>{weather.name} {weather.sys.country}</h4> : ''}</div>
            {/* render The city*/}
            <div>
              <div className="temp">
                <h2>{Object.keys(weather).length ? weather.main.temp : ''}°</h2> {/*render the temperature*/}
              </div>
              <div>
                <div className="situation">
                  <h3>{Object.keys(weather).length ? weather.weather[0].description : ''}</h3> {/*render Situation*/}
                </div>
              </div>
            </div>
          </div>
          <div className="select-area">
            {" "}
            {/*create a selector to show the cities
            on change you need to update your selectedCity*/}
            <select className="custom-select" value={selectedCity} onChange={handleChange}>
              {cities.map(city => {
                return <option key={nanoid()} value={city}>{city}</option>
              })}

              
            </select>
            <br />
          </div>
        </main>
      </div>
    </div>)
}

export default App;
