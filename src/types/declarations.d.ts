declare module '*.geojson' {
  const value: any;
  export default value;
}

declare global {
  var L: any;
  var GeoJSON: any;
}
