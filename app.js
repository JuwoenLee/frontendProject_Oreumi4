// kakao map api --------------------------------------------------------------

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

// connecting with html --------------------------------------------------------------

const subscribeBtn = document.querySelector(".btn-subscribe");
const modalWindow = document.querySelector("#modal");
const modalBtn = document.querySelector(".btn-modal");
const backToTopBtn = document.querySelector(".btn-back-to-top");
const showMoreBtn = document.querySelector(".btn-show-more");
const closeScrollBtn = document.querySelector(".btn-close-scroll");
const imageList = document.querySelector(".infinite-scroll-list");
const imageBox = document.querySelector("#infinite-scroll");
let pageToFetch = 1;

async function fetchImages(){
    try {
        const response = await fetch ('https://api.thecatapi.com/v1/images/search?limit=5');
        if (!response.ok) {
            throw new Error('network error');
        }
        const datas = await response.json();
        makeImageList(datas);
    } catch (error) {
        console.error('load data error :', error);
    }
}

const infinityScroll = () => {
    fetchImages();
}

const throttling = (callback, delay) => {
    let timer = null; // 클로저

    return () => {
        if (timer === null) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        }
    };
};

function makeImageList(datas) {
    datas.forEach((item) => {
        imageList.innerHTML += "<li><img src=" + item.url + " alt=''></li>";
    });
}

function backToTop() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    if(position) {
        window.requestAnimationFrame(() => {
            window.scrollTo(0, position - position / 10);
            backToTop();
        });
    }
}

showMoreBtn.addEventListener('click', () => {
        imageBox.style.display = "block";
        closeScrollBtn.style.display = "block";
        fetchImages();
        window.addEventListener('scroll', throttling(infinityScroll, 3000));
    }
);

closeScrollBtn.addEventListener('click', () => {
   imageBox.style.display = "none";
   closeScrollBtn.style.display = "none";
});

window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 150 ||
        document.body.scrollTop > 150) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
})

backToTopBtn.addEventListener('click', () => {
    backToTop();
});

subscribeBtn.addEventListener('click', () => {
    modalWindow.style.display = 'block';
});

modalBtn.addEventListener('click', () => {
    modalWindow.style.display = 'none';
});
