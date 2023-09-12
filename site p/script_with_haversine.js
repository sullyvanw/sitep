function findNearest(type) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      var places = {
        'hospital': [[45.270512556049624, 1.7698822850503648], [45.270512556049624, 1.7698822850503648]],
        'bank': [[48.8566, 2.3522], [40.7128, -74.0060]]
      };

      var closestPlace = null;
      var closestDistance = Infinity;

      for (var i = 0; i < places[type].length; i++) {
        var distance = haversineDistance([lat, lon], places[type][i]);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPlace = places[type][i];
        }
      }

      alert(`Le lieu le plus proche est à ${closestDistance.toFixed(2)} km.`);
    });
  } else {
    alert("La géolocalisation n'est pas disponible sur votre appareil.");
  }
}

function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // Rayon de la Terre en kilomètres

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}