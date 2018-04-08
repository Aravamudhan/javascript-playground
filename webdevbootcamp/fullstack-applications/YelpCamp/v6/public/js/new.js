let createForm = document.querySelector("#camp-submit-button");
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 20.5937,
            lng: 78.9629
        },
        zoom: 5
    });
    let input = document.querySelector("input[name='campLocation']");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

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
        let campName = document.querySelector("input[name='campName']").value;
        let campLocation = document.querySelector("input[name='campLocation']").value;
        var contentString =
            `
                <strong>${campName}<br/>
                ${campLocation}</strong>
              `;
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });

}

function submitCampgroundForm(e) {
    e.preventDefault();
    let locationObj = this.form.querySelector("input[name='campLocation']");
    let locationName = locationObj.value;
    if (locationObj) {
        let position = marker.position;
        const location = {
            name: locationName,
            lat: position.lat(),
            lng: position.lng()
        };
        locationObj.value = JSON.stringify(location);
        console.dir(JSON.parse(this.form.querySelector("input[name='campLocation']").value));
        this.form.submit();
    }
}
createForm.addEventListener("click", submitCampgroundForm);