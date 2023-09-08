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

  return (
    <div className={styles.map}>
      <MapContainer center={europeCenter} zoom={4} style={mapStyle} minZoom={2} attributionControl={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {data.map((item: any, index: number) => {
          if (item.name && item.address) {
            return (
              <Marker key={item.id} position={[51.505 + item.index / 100, 10.09 + item.index / 100]}>
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
          return null; // Don't render a marker for items that don't meet the criteria
        })}
      </MapContainer>
    </div>
  );
};

export default NutsMap;
