'use client'

import './page.css'
import Image from 'next/image'

import florest from '../../public/florest.jpg'
import rain from '../../public/rain.jpg'
import beach from '../../public/beach.jpg'
import cloudy from '../../public/cloudy.jpg'

import React, { useEffect, useState } from 'react';


export default function Home() {
  const [weather, setWeather] = useState<any>();

  const key = "f57cdc353b6e46f5af451736242306";
  const currentCity = "São Paulo";
  const callAPI = async () => {
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?q=${currentCity}&lang=pt&key=${key}`);
      const data = await res.json();
      console.log("data: ", data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    callAPI().then((data) => {
      setWeather(data)
    }).catch((error) => setWeather(error))
  }, [])

  function handleIcon() {
    switch (weather?.current.condition.text) {
      case ("Sol"):
        return (
          <span className="material-symbols-outlined" style={{ color: "orange", fontSize: "48pt" }}>
            sunny
          </span>
        )
      case ("Nublado"):
        return (
          <span className="material-symbols-outlined" style={{ color: "white", fontSize: "48pt" }}>
            partly_cloudy_day
          </span>
        )
      case ("Chuva"):
        return (
          <span className="material-symbols-outlined" style={{ color: "gray", fontSize: "48pt" }}>
            rainy
          </span>
        )
      case ("Tempo limpo"):
        return (
          <span className="material-symbols-outlined" style={{ color: "yellow", fontSize: "48pt" }}>
            clear_day
          </span>
        )
    }
  }

  return (
    <main>
      <div className="background">
        {
          weather?.current.condition.text === "Chuva" &&
          <Image className='img' src={rain} alt="rain" />
        }
        {
          weather?.current.condition.text === "Nublado" &&
          <Image className='img' src={cloudy} alt="cloudy" />
        }
        {
          weather?.current.condition.text === "Sol" &&
          <Image className='img' src={beach} alt="beach" />
        }
        {
          weather?.current.condition.text === "Tempo limpo" &&
          <Image className='img' src={florest} alt="florest" />
        }
        <div className="glass">
          <h4 className='text' style={{fontSize: "36pt", marginTop: "0.5em"}}>
            {
              weather?.location.localtime.split(" ")[1]
            }
          </h4>
          <h4 className='text'>{handleIcon()}</h4>
          <div className='text' style={{marginBottom: "0.5em"}}>
            <h4 style={{fontSize: "36pt"}}>{weather?.current.temp_c}ºC</h4>
            <h4 style={{fontSize: "24pt"}}>{weather?.location.region}</h4>
          </div>
        </div>
      </div>
    </main>
  );
}
