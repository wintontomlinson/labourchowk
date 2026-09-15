"use client";

import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
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
    <span style="position:relative;display:block;width:22px;height:22px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:#2b6de8;opacity:0.25;animation:lcpulse 1.8s ease-out infinite;"></span>
      <span style="position:absolute;inset:5px;border-radius:9999px;background:#2b6de8;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></span>
    </span>`;
  return L.divIcon({
    html,
    className: "lc-user-pin",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
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

/** Floating "Locate me" button rendered as a Leaflet control (bottom-right). */
function LocateControl({
  onLocate,
  onError,
}: {
  onLocate: (p: LatLng) => void;
  onError?: (msg: string) => void;
}) {
  const map = useMap();
  const [busy, setBusy] = useState(false);

  function handle() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      onError?.("Location isn't supported on this device.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setBusy(false);
        onLocate(p);
        map.setView([p.lat, p.lng], 14, { animate: true });
      },
      (err) => {
        setBusy(false);
        onError?.(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied."
            : "Couldn't get your location."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar" style={{ border: "none", margin: "12px" }}>
        <button
          type="button"
          onClick={handle}
          title="Use my location"
          aria-label="Use my location"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#fff",
            color: "#171412",
            border: "1px solid rgba(23,20,18,0.12)",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(23,20,18,0.14)",
            cursor: "pointer",
          }}
        >
          {busy ? (
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "9999px",
                border: "2px solid rgba(23,20,18,0.2)",
                borderTopColor: "#2b6de8",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2b6de8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          )}
          {busy ? "Locating…" : "Locate me"}
        </button>
      </div>
    </div>
  );
}

export default function LeafletMap({
  center,
  zoom = 13,
  pins,
  radiusKm,
  className,
  showLocate = false,
  onLocate,
  onLocateError,
}: {
  center: LatLng;
  zoom?: number;
  pins: MapPin[];
  radiusKm?: number;
  className?: string;
  showLocate?: boolean;
  onLocate?: (p: LatLng) => void;
  onLocateError?: (msg: string) => void;
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
          icon={p.isUser ? userIcon() : pinIcon(pins.length === 1 && i === 0 && !pins.some((x) => x.isUser))}
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
      {showLocate && <LocateControl onLocate={(p) => onLocate?.(p)} onError={onLocateError} />}
    </MapContainer>
  );
}
