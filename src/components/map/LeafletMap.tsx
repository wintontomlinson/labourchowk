"use client";

import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { LatLng } from "@/lib/types";

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  href?: string;
  /** render as the "you are here" marker */
  isUser?: boolean;
}

/** Custom amber pin — avoids the default Leaflet marker asset (which 404s under bundlers). */
function pinIcon(highlight = false) {
  const color = highlight ? "#e8792b" : "#171412";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10 15 25 15 25s15-15 15-25C30 6.7 23.3 0 15 0Z" fill="${color}"/>
      <circle cx="15" cy="15" r="6" fill="#faf7f2"/>
      <circle cx="15" cy="15" r="2.6" fill="${color}"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "lc-pin",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
  });
}

/** Pulsing "you are here" dot. */
function userIcon() {
  const html = `
    <span style="position:relative;display:block;width:20px;height:20px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:#3f8f5f;opacity:0.25;animation:lcpulse 1.8s ease-out infinite;"></span>
      <span style="position:absolute;inset:5px;border-radius:9999px;background:#3f8f5f;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></span>
    </span>`;
  return L.divIcon({
    html,
    className: "lc-user-pin",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

/** Keeps the map centred/zoomed when props change (client-side nav). */
function Recenter({ center, zoom }: { center: LatLng; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [center.lat, center.lng, zoom, map]);
  return null;
}

export default function LeafletMap({
  center,
  zoom = 13,
  pins,
  radiusKm,
  className,
}: {
  center: LatLng;
  zoom?: number;
  pins: MapPin[];
  radiusKm?: number;
  className?: string;
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <Recenter center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {radiusKm != null && (
        <Circle
          center={[center.lat, center.lng]}
          radius={radiusKm * 1000}
          pathOptions={{ color: "#e8792b", fillColor: "#e8792b", fillOpacity: 0.08, weight: 1.5 }}
        />
      )}
      {pins.map((p, i) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={p.isUser ? userIcon() : pinIcon(pins.length === 1 && i === 0)}
          zIndexOffset={p.isUser ? 1000 : 0}
        >
          <Popup>
            <div className="min-w-[140px]">
              <p className="text-[13px] font-semibold text-ink">{p.title}</p>
              {p.subtitle && <p className="text-xs text-ink-500">{p.subtitle}</p>}
              {p.href && (
                <a href={p.href} className="mt-1 inline-block text-xs font-semibold text-amber-600">
                  View profile →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
