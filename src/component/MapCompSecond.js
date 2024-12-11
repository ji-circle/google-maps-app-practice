import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapCompSecond = () => {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 초기 위치
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const handleSearch = () => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const location = data.results[0].geometry.location;
          setCenter(location);
          setMarkerPosition(location);
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      })
      .catch((error) => console.error("Geocoding API Error:", error));
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="주소를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      <LoadScript googleMapsApiKey="AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapCompSecond;
