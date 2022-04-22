export const calculateWatts = (volts, amps) => volts * amps;
export const shapeResponse = (params) => ({
  ...params,
  createdAt: params?.createdAt.toLocaleString(),
  updatedAt: params?.updatedAt.toLocaleString(),
});
