import React, { useState, useEffect } from 'react';

function Weather({ lat, lon }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        const apiKey = 'dd29d86718efada42adad4f7439f6776'; // 替换为您的OpenWeatherMap API密钥
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                setError(error.message);
                console.error("There was a problem with the fetch operation:", error);
            });
    }, [lat, lon]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weather) {
        return <div>Loading weather...</div>;
    }

    return (
        <div>
            <h2>Weather Information for {weather.name}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].main}</p>
            <p>Description: {weather.weather[0].description}</p>
            {/* 更多天气信息可以根据需要展示 */}
        </div>
    );
}

export default Weather;
