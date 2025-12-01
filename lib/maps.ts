import type { Location } from "@/app/(marketing)/locations/page";

/**
 * Generate Google Maps directions URL (no API key needed for basic directions)
 * Opens in Google Maps app or browser
 */
export function getDirectionsUrl(
  location: Location,
  userLocation?: { lat: number; lng: number }
): string {
  const destination = `${location.latitude},${location.longitude}`;

  if (userLocation) {
    // Use current location as origin
    return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination}`;
  }

  // Just show destination (user can set origin manually)
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

/**
 * Alternative: OpenStreetMap routing (completely free, no Google dependency)
 */
export function getOSMDirectionsUrl(
  location: Location,
  userLocation?: { lat: number; lng: number }
): string {
  if (userLocation) {
    return `https://www.openstreetmap.org/directions?from=${userLocation.lat},${userLocation.lng}&to=${location.latitude},${location.longitude}`;
  }
  return `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`;
}
