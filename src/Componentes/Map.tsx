import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    setCoordinates({lat: -34.67070450645612, lng: -58.562792494133724})
    // fetch('http://tu-api.com/endpoint')
    //   .then(response => response.json())
    //   .then(data => {
    //     setCoordinates(data.coordinates); 
    //   })
    //   .catch(error => console.error('Error fetching coordinates:', error));
  }, []);
  var link:string = `http://maps.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}&z=16&output=embed`
  return (
    <div className="mapContainer">
      <div className="map">
        <iframe width="600" height="500" className='mapFrame' 
          id="gmap_canvas" 
          src = {link} >
        </iframe>
      </div>
    </div>
  );
};

export default Map;
