import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    // 🗺️ Inicializar mapa
    map.current = new maplibregl.Map({
      container: mapContainer.current,

      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm",
          },
        ],
      },

      center: [-74.0721, 4.711],
      zoom: 12,
    });

    // 📍 Punto 1 (verde)
    new maplibregl.Marker({ color: "green" })
      .setLngLat([-74.0721, 4.711])
      .setPopup(new maplibregl.Popup().setText("Punto verde - activo"))
      .addTo(map.current);

    // 📍 Punto 2 (rojo)
    new maplibregl.Marker({ color: "red" })
      .setLngLat([-74.0621, 4.721]) // un poco desplazado
      .setPopup(new maplibregl.Popup().setText("Punto rojo - inactivo"))
      .addTo(map.current);

  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
      }}
    />
  );
}
