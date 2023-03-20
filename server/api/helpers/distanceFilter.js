const haversine = require("haversine");

const distanceFilter = (coords, users, dist) => {
  const filteredUsers = users.filter((e) => {
    const distance = dist ? dist : 10;
    const start = {
      latitude: coords.lat,
      longitude: coords.long,
    };
    const end = {
      latitude: e.latitude,
      longitude: e.longitude,
    };
    const curDistance = haversine(start, end, { unit: "mile" });
    if (curDistance <= distance) {
      e.dataValues.distance = curDistance;
      return e;
    }
  });
  filteredUsers.sort((a, b) => a.dataValues.distance - b.dataValues.distance);
  return filteredUsers;
};

module.exports = distanceFilter;
