// "use client";
// import { useEffect, useState, useCallback } from "react";

// const MapComponent = ({ onShapeDrawn }) => {
//   const [map, setMap] = useState(null);
//   const [drawingManager, setDrawingManager] = useState(null);

//   useEffect(() => {
//     const googleMapsScript = document.createElement("script");
//     googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=drawing,places,geometry`;
//     googleMapsScript.async = true;
//     googleMapsScript.defer = true;
//     googleMapsScript.onload = initMap;

//     document.head.appendChild(googleMapsScript);

//     return () => {
//       document.head.removeChild(googleMapsScript);
//     };
//   }, []);

//   const initMap = useCallback(() => {
//     const mapInstance = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 30.3753, lng: 69.3451 },
//       zoom: 6,
//     });
//     setMap(mapInstance);

//     const drawingManagerInstance = new google.maps.drawing.DrawingManager({
//       drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
//       drawingControl: true,
//       drawingControlOptions: {
//         position: google.maps.ControlPosition.TOP_CENTER,
//         drawingModes: [
//           google.maps.drawing.OverlayType.POLYGON,
//           google.maps.drawing.OverlayType.RECTANGLE,
//         ],
//       },
//     });

//     setDrawingManager(drawingManagerInstance);
//     drawingManagerInstance.setMap(mapInstance);

//     google.maps.event.addListener(
//       drawingManagerInstance,
//       "overlaycomplete",
//       (event) => {
//         onShapeDrawn(event);
//         drawingManagerInstance.setDrawingMode(null);
//       }
//     );
//   }, [onShapeDrawn]);

//   return <div id="map" className="w-full h-3/4"></div>;
// };

// export default MapComponent;
