import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { openNotification } from '../../utility/notification';

const getAddress = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('No se pudo obtener la dirección');
    }

    const data = await res.json();

    return data.name || data.display_name || 'Dirección no disponible';
  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    return 'Dirección no disponible';
  }
};

export default function MapOrders({ orders = [], recollectors = [], assignCollector }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const rootsRef = useRef([]);

  // Inicializar el mapa
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [-74.0721, 4.711],
      zoom: 12,
    });

    return () => {
      rootsRef.current.forEach((root) => {
        root.unmount();
      });

      rootsRef.current = [];

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Crear los marcadores y sus ventanas emergentes
  useEffect(() => {
    if (!map.current) return;

    // Limpiar los marcadores anteriores
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Desmontar los Select de los popups anteriores
    rootsRef.current.forEach((root) => root.unmount());
    rootsRef.current = [];

    orders.forEach((order) => {
      const lat = parseFloat(order.latitude);
      const lng = parseFloat(order.longitude);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return;

      const color = order.state?.color || '#3498DB';
      const buttonId = `assign-btn-${order.id}`;
      const selectContainerId = `collector-select-${order.id}`;

      const canAssign = order.state?.id === 1 || order.state?.id === 7;

      const popup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: true,
      });

      const container = document.createElement('div');

      container.style.fontSize = '12px';
      container.style.textAlign = 'center';
      container.style.width = '200px';
      container.style.maxHeight = '300px';
      container.style.overflowY = 'auto';
      container.style.padding = '12px';
      container.style.fontFamily = 'Arial, sans-serif';

      const assignBlock = canAssign
        ? `
          <div style="margin-top:10px;text-align:left;">
            <label
              style="font-size:11px;font-weight:600;display:block;"
            >
              Asignar recolector
            </label>

            <div
              id="${selectContainerId}"
              style="width:100%;margin-top:5px;"
            ></div>
          </div>

          <button
            id="${buttonId}"
            style="width:100%;margin-top:10px;padding:8px;background:${color};color:white;border:none;border-radius:8px;font-size:12px;cursor:pointer;"
          >
            Asignar
          </button>
        `
        : '';

      // Construir el contenido del popup
      container.innerHTML = `
        <img
          alt=""
          src="${order.user?.photo || 'https://via.placeholder.com/60'}"
          style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:10px;"
        />

        <div style="font-weight:700;font-size:13px;margin-bottom:4px;">
          ${order.user?.name || 'Sin nombre'}
        </div>

        <div style="font-size:11px;color:#555;margin-bottom:6px;">
          📞 ${order.user?.phone || 'N/A'}
        </div>

        <div style="display:inline-block;background:${color};color:white;padding:3px 8px;border-radius:12px;font-size:10px;margin-bottom:8px;">
          ${order.state?.name || 'N/A'}
        </div>

        <div
          data-address
          style="font-size:11px;color:#666;margin-top:8px;"
        >
          📍 Cargando dirección...
        </div>

        <div style="margin-top:10px;text-align:left;font-size:11px;background:#f7f7f7;padding:8px;border-radius:8px;">
          <div style="font-weight:600;margin-bottom:5px;">
            ♻️ Tipos de residuos
          </div>

          ${
            order.type_waste?.length
              ? order.type_waste
                  .map(
                    (w) => `
                      <div>
                        • ${w.name || 'Sin tipo'} - ${w.weight} kg
                      </div>
                    `,
                  )
                  .join('')
              : '<div>No hay residuos</div>'
          }
        </div>

        ${assignBlock}
      `;

      popup.setDOMContent(container);

      // Crear el Select de Ant Design con búsqueda integrada
      if (canAssign) {
        const selectContainer = container.querySelector(`#${selectContainerId}`);

        if (selectContainer) {
          let selectedCollectorId = '';

          const options = recollectors
            .filter((r) => r?.collector?.id != null)
            .map((r) => ({
              value: r.collector.id,
              label: r?.collector?.user?.name || 'Sin nombre',
            }));

          const root = createRoot(selectContainer);

          rootsRef.current.push(root);

          root.render(
            <Select
              showSearch
              allowClear
              placeholder="Seleccionar recolector"
              optionFilterProp="label"
              filterOption={(input, option) =>
                String(option?.label || '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              notFoundContent="No se encontraron recolectores"
              options={options}
              style={{ width: '100%', textAlign: 'left' }}
              size="small"
              getPopupContainer={(trigger) => trigger.parentElement}
              onChange={(value) => {
                selectedCollectorId = value ?? '';
              }}
            />,
          );

          // Evento del botón de asignación
          container.querySelector(`#${buttonId}`)?.addEventListener('click', () => {
            if (selectedCollectorId === '') {
              openNotification('error', '¡Espera!', 'Debes seleccionar un recolector');
              return;
            }

            assignCollector(order.id, parseInt(selectedCollectorId, 10));
          });
        }
      }

      // Crear el marcador
      const marker = new maplibregl.Marker({ color }).setLngLat([lng, lat]).setPopup(popup).addTo(map.current);

      markersRef.current.push(marker);

      // Obtener la dirección
      getAddress(lat, lng).then((address) => {
        const addressElement = container.querySelector('[data-address]');

        if (addressElement) {
          addressElement.textContent = `📍 ${address}`;
        }
      });
    });
  }, [orders, recollectors, assignCollector]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '12px',
      }}
    />
  );
}

MapOrders.propTypes = {
  orders: PropTypes.array,
  recollectors: PropTypes.array,
  assignCollector: PropTypes.func,
};
