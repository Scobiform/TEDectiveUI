import React, { useCallback, useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import styles from './nutsMap.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import ThemeSwitch from '../Static/ThemeSwitch';

export interface NutsMapProps {
  apiPath: string;
  setApiPath: any;
  data: any;
}

const NutsMap = ({ data, apiPath, setApiPath }: NutsMapProps) => {
  const europeCenter: LatLngTuple = [51.505, 10.09]; // Centered on Europe

  const mapStyle = {
    width: '100%',
    height: '100%',
    top: '2.52rem',
  };

  const handleClick = useCallback(
    (apiPath: string) => {  
      setApiPath(apiPath);
    }
  , [setApiPath]);

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
                        <div className={styles.popup}>
                          <h2>{item.name}</h2>
                          <ul>
                            <li>{item.address.locality}</li>
                            <li>{item.address.postalCode}</li>
                            <li>{item.address.streetAddress}</li>
                            <li>{item.address.region}</li>
                          </ul>

                          {item.name !== undefined && (
                          <button onClick={() => handleClick(item.id+'')} aria-label="Load organization graph">Load organization graph</button>
                          )}
                        </div>
                      </>
                    </Popup>
                  </Marker>
                );
            }
            } catch (error) {
              //console.error('Error fetching geocoding data:', error);
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
  }, [data, setApiPath, handleClick]);

  const [markers, setMarkers] = useState<JSX.Element[]>([]);

  const ZoomInButton = () => {
    const map = useMap();
    const handleZoomIn = () => {
      map.setZoom(map.getZoom() + 1);
    };

    return (
      <>
        <button onClick={handleZoomIn} className={styles.customZoomButton} aria-label="Zoom in (+)" accessKey='+'>
          ➕
        </button>
      </>
    );
  };

  const ZoomOutButton = () => {
    const map = useMap();
    const handleZoomOut = () => {
      map.setZoom(map.getZoom() - 1);
    };

    return (
      <button onClick={handleZoomOut} className={styles.customZoomButton} aria-label='Zoom out (-)' accessKey='-'>
        ➖
      </button>
    );
  };

  return (
    <div className={styles.map}>
      <MapContainer center={europeCenter} zoom={4} style={mapStyle} minZoom={2} attributionControl={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        <div className={styles.zoomButtons}>
            <ZoomInButton />
            <ZoomOutButton />
        </div>
      </MapContainer>
    </div>
  );
};

export default NutsMap;
