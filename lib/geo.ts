export const REGION_VIEW = { x: 0, y: 0, width: 1000, height: 720 };
export type Camera = typeof REGION_VIEW;
export function project(longitude: number, latitude: number) {
  const mercator = (lat: number) => 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
  return { x: (longitude - 50) * 125, y: (mercator(27) - mercator(latitude)) * 125 };
}
// City centre for camera framing, not a run coordinate. Source: GeoNames 292968.
export const abuDhabi = project(54.39696, 24.45118);
export const CITY_VIEW: Camera = { x: abuDhabi.x - 140, y: abuDhabi.y - 100.8, width: 280, height: 201.6 };
export function cameraString(camera: Camera) { return `${camera.x} ${camera.y} ${camera.width} ${camera.height}`; }
