function iniciarMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude,
                };

                InsertarCoords(coords);
            },
            () => {
                alert("Tu navegador está bien, algo falló");
            }
        );
    } else {
        alert("Tu navegador no dispone de la geolocalización");
    }
}

function initAutocomplete() {
    var input = document.getElementById('ubicacion');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("No se encontraron detalles del lugar: '" + place.name + "'");
            return;
        }

        var coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };

        InsertarCoords(coords);
    });
}

window.onload = function () {
    iniciarMap();
    initAutocomplete();
};

function InsertarCoords(coords) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coords
    });
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}
