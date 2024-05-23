import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh'
};

function Map({ currentLocation }) {  // 接收 currentLocation 作为 prop
  return (
    <LoadScript
      googleMapsApiKey="" 
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}  // 使用传入的 currentLocation 作为中心
        zoom={20}
      >
        {/* 其他地图内容如标记等 */}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
