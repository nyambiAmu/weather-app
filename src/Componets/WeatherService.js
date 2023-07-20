import React, { useEffect, useState } from 'react'


const WeatherService = (cityName) => {
    const [weather, setWeather] = useState()
    const apiKey = 'ba6704ed3d70ea9cadddd1dd58219724'

    const fetchData = async () => {
        await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + apiKey).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                if (res.status === 404) {
                    console.log('error');
                }
            }
        }).then((data) => {
            setWeather(data)
        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        fetchData();
    };

    return { weather, refetch }



}

export default WeatherService