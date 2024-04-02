import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// 地图容器样式
const containerStyle = {
  width: '800px',  // 或者是100%等，根据需要设置
  height: '400px'  // 地图的高度
};


const defaultCenter = {
  lat: -34.397,
  lng: 150.644
};

function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error getting the location");
        }
      );
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAZ5Z93-PaKWNCbtS2u3lOB8pRabsMJrCs"  
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={20}  // 初始缩放级别
      >
        {/* 这里可以放置地图的其他组件，如标记等 */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
