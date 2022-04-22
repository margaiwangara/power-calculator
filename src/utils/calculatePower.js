export const calculateWatts = (volts, amps) => volts * amps;
export const shapeResponse = (params) => ({
  ...params,
  createdAt: new Date(params?.created_at).toLocaleDateString(),
  updatedAt: new Date(params?.updated_at).toLocaleDateString(),
});
