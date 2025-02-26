"use client";

import { useEffect, useState } from "react";
import HouseDetailsModal from "./HouseDetailsModal";
import {Map as LeafletMap} from 'leaflet';

export interface House {
  title: string;
  price: string;
  lat: number;
  lng: number;
  description: string;
}

const houses: House[] = [
  {
    title: "Single Family House ",
    price: "$250,000",
    lat: 34.9438676,
    lng: -81.9958495,
    description: "A very good house with 3 beds and 2 baths.",
  },
  {
    title: "Modern townhouse",
    price: "$297,500",
    lat: 34.9472663,
    lng: -81.9965505,
    description: "A very good house with 3 beds and 2 baths.",
  },
  {
    title: "Modern townhouse 2",
    price: "$297,500",
    lat: 34.9397386,
    lng: -81.988074,
    description: "A very good house with 3 beds and 2 baths.",
  },
];

export default function Map() {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [map, setMap] = useState<LeafletMap | null>(null);
	const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
        const newMap = leaflet.map("map").setView([34.9438676, -81.9958495], 16);

        leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(newMap);

        houses.forEach((house) => {
          const marker = leaflet.marker([house.lat, house.lng]).addTo(newMap);
          marker.on("click", (event) => {
            const { containerPoint } = event;
            setModalPosition({ x: containerPoint.x, y: containerPoint.y });
            setSelectedHouse(house);
          });
        });

        newMap.on("click", () => setSelectedHouse(null));
        setMap(newMap);
      });
    }

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <div className="">
      <div className="h-[500px] w-full mt-8 rounded-lg shadow-lg z-10" id="map" />

      {selectedHouse && (
        <HouseDetailsModal
          title={selectedHouse.title}
          description={selectedHouse.description}
          price={selectedHouse.price}
          setSelectedHouse={() => setSelectedHouse(null)}
          position={modalPosition}
        />
      )}
    </div>
  );
}
