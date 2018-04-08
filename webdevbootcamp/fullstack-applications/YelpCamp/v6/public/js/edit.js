let campSubmit = document.querySelector("#camp-submit-button");
var marker;

function initMap() {
    let lat;
    let lng;
    let center = {};
    if (latValue && latValue.length > 0) {
        lat = parseFloat(latValue);
        center.lat = lat;
    }
    if (lngValue && lngValue.length > 0) {
        lng = parseFloat(lngValue);
        center.lng = lng;
    } else {
        center.lng = 0;
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
        scrollwheel: false
    });
    let campName = document.querySelector("input[name='campground[name]']").value;
    let campLocation = document.querySelector("input[name='campground[location]']").value;
    var contentString =
        `
            <strong>${campName}<br/>
            ${campLocation}</strong>
          `
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker = new google.maps.Marker({
        position: center,
        map: map
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    // Setting autocomplete
    let input = document.querySelector("input[name='campground[location]'");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); 
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindow.open(map, marker);
    });
}

function submitCampgroundForm(e) {
    e.preventDefault();
    let locationObj = this.form.querySelector("input[name='campground[location]'");
    let locationName = locationObj.value;
    if (locationObj) {
        const location = {
            name: locationName,
            lat: marker.position.lat(),
            lng: marker.position.lng()
        };
        locationObj.value = JSON.stringify(location);
        console.dir(JSON.parse(this.form.querySelector("input[name='campground[location]']").value));
        this.form.submit();
    }
}
campSubmit.addEventListener("click", submitCampgroundForm);