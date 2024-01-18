const mapContainer = document.querySelector('.map-box'),
    mapOption = {
        center: new kakao.maps.LatLng(33.4423379727783, 126.571449734542 ),
        level: 3
    };

const map = new kakao.maps.Map(mapContainer, mapOption);
const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();
const geocoder = new kakao.maps.services.Geocoder();
const marker = new kakao.maps.Marker();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

searchAddrFromCoords(map.getCenter(), displayCenterInfo);
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {

            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            const infoTxt = document.querySelector(".map-top-txt-02");
            infoTxt.innerHTML = result[0].address.address_name;
        }
    });
});

kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {

    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {

    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
    }
}