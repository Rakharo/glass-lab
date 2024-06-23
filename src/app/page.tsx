'use client'

import './page.css'
import Image from 'next/image'

import florest from '../../public/florest.jpg'
import rain from '../../public/rain.jpg'
import beach from '../../public/beach.jpg'
import cloudy from '../../public/cloudy.jpg'
import night from '../../public/night.jpg'

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
    if (weather?.current.condition.text.includes("Sol" || "Nublado" || "Chuva" || "Tempo limpo")) {
      switch (weather?.current.condition.text) {
        case ("Sol"):
          if (+weather?.location.localtime.split(" ")[1] < 18) {
            return (
              <span className="material-symbols-outlined" style={{ color: "orange", fontSize: "48pt" }}>
                sunny
              </span>
            )
          } else {
            return (
              <span className="material-symbols-outlined" style={{ fontSize: "48pt", color: "white" }}>
                clear_night
              </span>
            )
          }
        case ("Nublado"):
          if (+weather?.location.localtime.split(" ")[1] < 18) {
            return (
              <span className="material-symbols-outlined" style={{ color: "white", fontSize: "48pt" }}>
                partly_cloudy_day
              </span>
            )
          } else {
            return (
              <span className="material-symbols-outlined" style={{ fontSize: "48pt", color: "white" }}>
                partly_cloudy_night
              </span>
            )
          }
        case ("Chuva"):
          return (
            <span className="material-symbols-outlined" style={{ color: "gray", fontSize: "48pt" }}>
              rainy
            </span>
          )
        case ("Tempo limpo"):
          if (+weather?.location.localtime.split(" ")[1] < 18) {
            return (
              <span className="material-symbols-outlined" style={{ color: "yellow", fontSize: "48pt" }}>
                clear_day
              </span>
            )
          } else {
            return (
              <span className="material-symbols-outlined" style={{ fontSize: "48pt", color: "white" }}>
                nightlight
              </span>
            )
          }
      }
    } else {
      if (+weather?.location.localtime.split(" ")[1] < 18) {
        return (
          <span className="material-symbols-outlined" style={{ color: "yellow", fontSize: "48pt" }}>
            clear_day
          </span>
        )
      } else {
        return (
          <span className="material-symbols-outlined" style={{ fontSize: "48pt", color: "white" }}>
            nightlight
          </span>
        )
      }
    }
  }

  function handleImage() {
    if (weather?.current.condition.text.includes("Sol" || "Nublado" || "Chuva" || "Tempo limpo")) {
      switch (weather?.current.condition.text) {
        case ("Sol"):
          return (
            <Image className='img' src={beach} alt="beach" />
          )
        case ("Nublado"):
          return (
            <Image className='img' src={cloudy} alt="cloudy" />
          )
        case ("Chuva"):
          return (
            <Image className='img' src={rain} alt="rain" />
          )
        case ("Tempo limpo"):
          return (
            <Image className='img' src={florest} alt="florest" />
          )
      }
    } else {

      if (+weather?.location.localtime.split(" ")[1] < 18) {
        return (
          <Image className='img' src={florest} alt="florest" />
        )
      } else {
        return (
          <Image className='img' src={night} alt="night" />
        )
      }
    }
  }

  return (
    <main>
      <div className="background">
        {

          handleImage()
        }
        <div className="glass">
          <h4 className='text' style={{ fontSize: "36pt", marginTop: "0.5em" }}>
            {
              weather?.location.localtime.split(" ")[1]
            }
          </h4>
          <h4 className='text'>{handleIcon()}</h4>
          <div className='text' style={{ marginBottom: "0.5em" }}>
            <h4 style={{ fontSize: "36pt" }}>{weather?.current.temp_c}ºC</h4>
            <h4 style={{ fontSize: "24pt" }}>{weather?.location.region}</h4>
          </div>
        </div>
      </div>
    </main>
  );
}
