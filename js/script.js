$(document).ready(function() {

  document.fonts.load("18px Merriweather");
  document.fonts.load("18px Merriweather Bold");

  var corner1 = L.latLng(47.442,19.144);
  var corner2 = L.latLng(47.6, 18.984);
  var bounds = L.latLngBounds(corner1, corner2);
  var mymap = L.map('mapid').setView([47.4910, 19.0532], 15);

  var greenIcon = L.icon({
    iconUrl: 'images/marker.png',
    iconRetinaUrl: 'images/marker-2x.png',
    iconSize: [24, 24]
  });

  var greyIcon = L.icon({
    iconUrl: 'images/grey-marker.png',
    iconRetinaUrl: 'images/grey-marker-2x.png',
    iconSize: [24, 24]
  });

  L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=4be9ad68d7594b7783e012b23d980580', {
    attribution: '<a href="https://ebed.today">Ebed.today</a> | Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 13,
    maxZoom: 17,
    maxBounds: bounds
  }).addTo(mymap);
  mymap.setMaxBounds(bounds);

  $.get("https://ebed.today/menu.json", function(data) {
    $.each(data, function(_, restaurant) {
      var icon = restaurant.menu.length == 0 ? greyIcon : greenIcon;
      var coords;
      if ($.isArray(restaurant.coord[0])) {
        coords = restaurant.coord;
      } else {
        coords = [restaurant.coord];
      }
      $.each(coords, function(_idx, coord) {
        var marker = L.marker(coord, {
          icon: icon,
          riseOnHover: true
        }).addTo(mymap);
        marker.bindPopup("<h1><a target=\"_blank\" rel=\"noopener\" rel=\"nofollow\" href=" + restaurant.url + ">" + restaurant.name + "</a></h1><p>" + restaurant.menu.join('<br>') + "</p>");
        marker.bindTooltip(restaurant.name);
      });
    });
  });
});
