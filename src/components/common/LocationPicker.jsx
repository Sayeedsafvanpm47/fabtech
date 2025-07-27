import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import styled from '@emotion/styled';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--primary-red);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.5rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? <Marker position={position} /> : null;
}

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newPosition = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          setPosition(newPosition);
          onLocationSelect(newPosition);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please select manually on the map.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (position) {
      onLocationSelect(position);
    }
  }, [position]);

  const defaultCenter = { lat: 25.2854, lng: 51.5310 }; // Default center at Doha, Qatar

  return (
    <div>
      <MapWrapper>
        <MapContainer
          center={position || defaultCenter}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </MapWrapper>
      <LocationButton 
        type="button" 
        onClick={handleGetCurrentLocation}
        disabled={loading}
      >
        {loading ? 'Getting Location...' : 'Use Current Location'}
      </LocationButton>
    </div>
  );
};

export default LocationPicker; 