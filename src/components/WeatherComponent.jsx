import React, { useState, useEffect } from 'react';

function Weather({ lat, lon }) {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        setIsLoading(true); // 开始加载数据时设置为true
        const apiKey = 'dd29d86718efada42adad4f7439f6776'; // 替换为您的OpenWeatherMap API密钥
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch weather data.');
            })
            .then(data => {
                setWeather(data);
                setIsLoading(false); // 加载完成
            })
            .catch(error => {
                setError('Unable to load weather data.');
                setIsLoading(false); // 加载完成
                console.error("There was a problem with the fetch operation:", error);
            });
    }, [lat, lon]);

    if (isLoading) {
        return <div>Loading weather...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weather) {
        return <div>No weather data available.</div>;
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
