"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import HouseDetailsModal from "./HouseDetailsModal";

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
	const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
		x: 0, y: 0
	});
  const [map, setMap] = useState<L.Map | null>(null);

  const initializeMap = () => {
    const newMap = L.map("map").setView([34.9438676, -81.9958495], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(newMap);

    setMap(newMap);
  };

  const addMarkers = (map: L.Map) => {
    houses.forEach((house) => {
      const marker = L.marker([house.lat, house.lng]).addTo(map);
      // marker.bindPopup(`
      //   <div style="text-align: center;">
      //     <b>${house.title}</b><br>
      //     Preço: ${house.price}<br>
      //     <button id="details-btn-${house.lat}" style="margin-top: 5px; padding: 5px 10px; background-color: #3B82F6; color: white; border: none; border-radius: 5px; cursor: pointer;">
      //       Ver detalhes
      //     </button>
      //   </div>
      // `);

			marker.on("click", (event) => {
				const { containerPoint } = event;
				setModalPosition({ x: containerPoint.x, y: containerPoint.y });
				setSelectedHouse(house);
			})

      // marker.on("popupopen", () => {
      //   setTimeout(() => {
      //     const btn = document.getElementById(`details-btn-${house.lat}`);
      //     if (btn) {
      //       btn.addEventListener("click", () => setSelectedHouse(house));
      //     }
      //   }, 100);
      // });
    });
  };

  const setUserLocation = (map: L.Map) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 17);
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("<b>Você está aqui!</b>")
            .openPopup();
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocalização não suportada pelo navegador");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeMap();
    }

    return () => {
      map?.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      addMarkers(map);
    }
  }, [map]);

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
