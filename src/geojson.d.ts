declare module '@/assets/GeoJSON.json' {
  interface Geometry {
    type: string;
    coordinates: [number, number][];
  }

  interface Properties {
    Road_Type: string;
    Sur_Type: string;
    Route: string;
    Remark: string;
  }

  interface Properties2 {
    name: string;
  }

  interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    geometry_name: string;
    properties: Properties;
  }

  interface Crs {
    type: string;
    properties: Properties2;
  }

  interface GeoJSONRoot {
    type: string;
    totalFeatures: number;
    features: Feature[];
    crs: Crs;
  }

  const value: GeoJSONRoot;
  export default value;
}
