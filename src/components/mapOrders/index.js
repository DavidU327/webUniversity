import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import PropTypes from "prop-types";

const getAddress = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.name;
};

export default function MapOrders({ orders = [], recollectors }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (map.current) return;

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
  }, []);

  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    orders.forEach((order) => {
      const lat = parseFloat(order.latitude);
      const lng = parseFloat(order.longitude);

      if (!lat || !lng) return;

      const color = order.state?.color || "#3498DB";

      // 🧠 Popup inicial
      const popup = new maplibregl.Popup().setHTML(`
        <div style="font-size:12px">
          <strong>${order.user?.name || "Sin nombre"}</strong><br/>
          Estado: ${order.state?.name || "N/A"}<br/>
          Dirección: cargando...
        </div>
      `);

      const marker = new maplibregl.Marker({ color })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);

      markersRef.current.push(marker);

      // 🚀 Fetch async de dirección
      getAddress(lat, lng)
        .then((address) => {
          popup.setHTML(`
           <div style="
 font-size:12px;
  text-align:center;
  width:200px;
  max-height:300px;
  overflow-y:auto;
  padding:12px;
  font-family: Arial, sans-serif;
  ">

    <!-- 🖼️ AVATAR -->
    <img
      alt=""
      src="${order.user?.photo || 'https://via.placeholder.com/60'}"
      style="
        width:64px;
        height:64px;
        border-radius:50%;
        object-fit:cover;
        margin-bottom:10px;
      "
    />

    <!-- 👤 NOMBRE -->
    <div style="
      font-weight:700;
      font-size:13px;
      margin-bottom:4px;
      color:#222;
    ">
      ${order.user?.name || "Sin nombre"}
    </div>

    <!-- 📞 TELÉFONO -->
    <div style="
      font-size:11px;
      color:#555;
      margin-bottom:6px;
    ">
      📞 ${order.user?.phone || "N/A"}
    </div>

    <!-- 📍 ESTADO -->
    <div style="
      display:inline-block;
      background:${order.state?.color || '#3498DB'};
      color:white;
      padding:3px 8px;
      border-radius:12px;
      font-size:10px;
      margin-bottom:8px;
    ">
      ${order.state?.name || "N/A"}
    </div>

    <!-- 🏠 DIRECCIÓN -->
    <div style="
      font-size:11px;
      color:#666;
      margin-top:8px;
      line-height:1.3;
    ">
      📍 ${address}
    </div>

<!-- 🗑️ TIPOS DE RESIDUO -->
<div style="
  margin-top:10px;
  text-align:left;
  font-size:11px;
  background:#f7f7f7;
  padding:8px;
  border-radius:8px;
">
  <div style="font-weight:600; margin-bottom:5px;">
    ♻️ Tipos de residuos
  </div>

  ${
            order.type_waste?.length
              ? order.type_waste
                .map(
                  (w) => `
              <div style="margin-bottom:3px;">
                • ${w.name || "Sin tipo"} - ${w.weight} kg
              </div>
            `
                )
                .join("")
              : "<div>No hay residuos</div>"
          }
  </div>

<!-- 🧪 SELECTOR -->
          <div style="margin-top:10px;">
            <label style="font-size:11px;font-weight:600;">
              Asignar recolector
            </label>
            

            <select style="
              width:100%;
              margin-top:5px;
              padding:6px;
              border-radius:6px;
              border:1px solid #ddd;
              font-size:11px;
            ">
             <option value="" disabled selected>
    Seleccionar recolector
  </option>
              ${
            recollectors?.length
              ? recollectors
                .map(
                  (r) => `
                          <option value="${r.collector.id}">
                            ${r?.collector.user.name || "Sin nombre"}
                          </option>
                        `
                )
                .join("")
              : `<option>No hay recolector</option>`
          }
            </select>
          </div>
          
             <!-- 🔘 BOTÓN -->
          <button style="
            width:100%;
            margin-top:10px;
            padding:8px;
            background:${color};
            color:white;
            border:none;
            border-radius:8px;
            font-size:12px;
            cursor:pointer;
          ">
            Asignar
          </button>
  </div>
          `);
        });
    });
  }, [orders]);

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

MapOrders.propTypes = {
  orders: PropTypes.array,
  recollectors: PropTypes.array,
};
