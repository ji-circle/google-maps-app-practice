// import React, { useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// // import {MarkerF} from '@react-google-maps/api';

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 37.5665, // 기본값: 서울
//   lng: 126.978,
// };

// const MapComponent = () => {
//   const [mapCenter, setMapCenter] = useState(center);
//   const [markerPosition, setMarkerPosition] = useState(center);
//   const [address, setAddress] = useState("");

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g", // 여기에 API 키를 입력
//     libraries: ["places"],
//   });

//   const handleAddressSubmit = async () => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//           address
//         )}&key=AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g`
//       );
//       const data = await response.json();

//       if (data.status === "OK" && data.results[0]) {
//         const location = data.results[0].geometry.location;
//         setMapCenter(location);
//         setMarkerPosition(location);
//       } else {
//         alert("주소를 찾을 수 없습니다.");
//       }
//     } catch (error) {
//       console.error("Geocoding Error:", error);
//       alert("주소를 변환하는 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="주소를 입력하세요"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           style={{ width: "300px", marginRight: "10px" }}
//         />
//         <button onClick={handleAddressSubmit}>지도 표시</button>
//       </div>

//       {isLoaded ? (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={mapCenter}
//           zoom={12}
//         >
//           <Marker position={markerPosition} />
//         </GoogleMap>
//       ) : (
//         <p>지도를 불러오는 중입니다...</p>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// 기본 지도 중심 좌표 (서울)
const initialCenter = {
  lat: 37.5665,
  lng: 126.978,
};

// Google Maps API에서 필요한 라이브러리
const libraries = ["places"];

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(initialCenter); // 지도 중심 상태
  const [markerPosition, setMarkerPosition] = useState(initialCenter); // 마커 위치 상태
  const [address, setAddress] = useState(""); // 입력된 주소

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g", // API 키 입력
    libraries,
  });

  const handleAddressSubmit = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setMapCenter(location); // 지도 중심 업데이트
        setMarkerPosition(location); // 마커 위치 업데이트
      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      alert("주소를 변환하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleAddressSubmit}>지도 표시</button>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {/* Marker 컴포넌트로 마커 위치 관리 */}
          <Marker position={markerPosition} />
        </GoogleMap>
      ) : loadError ? (
        <p>지도를 불러오는 중 오류가 발생했습니다.</p>
      ) : (
        <p>지도를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default MapComponent;