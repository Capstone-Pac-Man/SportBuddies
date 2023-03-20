function Offset(long, lat) {
  const latOffset = 0.75;
  const longOffset = Math.abs(latOffset * Math.cos(lat));
  return { latOffset, longOffset };
}

module.exports = Offset;
