$(document).ready(function() {
  
  function success(position) {
  
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var coords = new google.maps.LatLng(latitude, longitude);

      var options = {
        zoom: 15,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), options);

      var marker = new google.maps.Marker({
          position: coords,
          map: map,
          title:"You are here!"
      });

      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon=" +longitude+"&APPID=d46c7b701c35532b554c197123e598d4",function(data) {
        var city = data.name;
        var country = data.sys.country;
        $('#city').text(city + ', ' + country);
        
        var icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        $('#weather-img').attr("src", icon);
        
        var celsius = parseInt(data.main.temp - 273.15);
        $('#temp-nr').text(celsius);
        // console.log(JSON.stringify(data));
    });
    
 }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    error('Geo Location is not supported');
  }
  $('#unit').on('click', function() {
    var grade = parseInt($('#temp-nr').text());
    
    console.log(grade);
    console.log($('#unit').text());
    
    if($('#unit').text() == 'C') {
      var fahrenheit = Math.round(grade * 1.8 + 32);
      $('#temp-nr').text(fahrenheit);
      $('#unit').text('F');
    } else {
      var celsius = Math.round((grade - 32) / 1.8);
      console.log(celsius);
      $('#temp-nr').text(celsius);
      $('#unit').text('C');
    }
  });
  
});
