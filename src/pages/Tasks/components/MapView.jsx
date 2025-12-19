import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const markers = [
  [30.0444, 31.2357], 
  [31.2001, 29.9187], 
  [30.7865, 31.0004],
  [29.9737, 32.5263],
];

const MapView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">خريطة مصر التفاعلية</CardTitle>
      </CardHeader>

      <CardContent className="h-[420px]">
        <MapContainer
          center={[30.8, 31]}
          zoom={6}
          className="h-full w-full rounded-md"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((pos, idx) => (
            <Marker key={idx} position={pos} />
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default MapView;
