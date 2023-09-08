import React, { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import styles from './nutsMap.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const NutsMap = ({ data }: any) => {
  const europeCenter: LatLngTuple = [51.505, 10.09]; // Centered on Europe

  const mapStyle = {
    width: '100%',
    height: '100%',
    top: '2.8rem',
  };

  useEffect(() => {
    const fetchData = async () => {
      const markers = await Promise.all(
        data.map(async (item: any, index: number) => {
          if (item.name && item.address && item.address.locality !== "") {
            try {
              // Fetch geocoding data for the locality
              const response = await fetch('api/geocode?q=' + item.address.locality);

              if (response.ok) {
                const geoData = await response.json();
                //console.log(geoData);
                return (
                  <Marker key={item.id} position={[geoData[0].lat, geoData[0].lon]}>
                    <Popup>
                      <>
                        <ul>
                          <li>{item.name}</li>
                          <li>{item.address.locality}</li>
                          <li>{item.address.postalCode}</li>
                          <li>{item.address.streetAddress}</li>
                        </ul>
                      </>
                    </Popup>
                  </Marker>
                );
              }
            } catch (error) {
              console.error('Error fetching geocoding data:', error);
            }
          }
          return null;
        })
      );

      // Filter out null markers (failed geocoding)
      const filteredMarkers = markers.filter((marker) => marker !== null);

      // Update the state with the markers
      setMarkers(filteredMarkers);
    };

    // Fetch data initially
    fetchData();
  }, [data]);

  const [markers, setMarkers] = useState<JSX.Element[]>([]);

  return (
    <div className={styles.map}>
      <MapContainer center={europeCenter} zoom={4} style={mapStyle} minZoom={2} attributionControl={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
};

export default NutsMap;
