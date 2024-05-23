import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// 地图容器样式
const containerStyle = {
    width: '100%',
    height: '50vh'  // 使用视口高度的50%，您可以根据需要调整
};

function MapComponent({ center }) {
  // 确保center属性已被正确传递到组件中
  // center的结构应为{ lat: x, lng: y }
  return (
    <LoadScript
    googleMapsApiKey=""   // 请替换为您的Google Maps API密钥
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}  // 使用传入的坐标作为地图中心
        zoom={15}  // 初始缩放级别，您可以根据需要调整
      >
        {/* 这里可以添加地图的其他组件，如标记等 */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
