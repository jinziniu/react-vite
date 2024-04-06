import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// 地图容器样式
const containerStyle = {
    width: '100%',  // 使用100%宽度以适应父容器
    height: '50vh'  // 使用视口高度的50%，您可以根据需要调整
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
     
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
