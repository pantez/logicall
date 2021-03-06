import { decode } from "./here-polyline";

export function mapStringToLatLng(result: Record<string, any>) {
  const [receiveLat, receiveLng] = result.receiveLatLng.split(",").map(Number);
  const [sendLat, sendLng] = result.sendLatLng.split(",").map(Number);

  return {
    ...result,
    receiveLatLng: { latitude: receiveLat, longitude: receiveLng },
    sendLatLng: { latitude: sendLat, longitude: sendLng },
  };
}

export function mapStatusToColor(status: string) {
  const colors = {
    Pending: "yellow",
    Rejected: "red",
    Cancelled: "gray",
    Approved: "teal",
    Collecting: "blue",
    Delivering: "cyan",
    Delivered: "green",
  };

  return colors[status];
}

export function mapStringToPolylines(raw: string) {
  return JSON.parse(raw).flatMap((polyline) => decode(polyline).polyline);
}

export function mapArrayToLatLng([latitude, longitude]: [
  latitude: number,
  longitude: number
]) {
  return { latitude, longitude };
}

export default {
  mapStringToLatLng,
  mapArrayToLatLng,
  mapStatusToColor,
  mapStringToPolylines,
};
