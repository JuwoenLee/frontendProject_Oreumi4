// kakao map api --------------------------------------------------------------

let mapContainer = document.querySelector('.map-box'),
    mapOption = {
        center: new kakao.maps.LatLng(33.4423379727783, 126.571449734542 ),
        level: 3
    };

const map = new kakao.maps.Map(mapContainer, mapOption);
const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();
const geocoder = new kakao.maps.services.Geocoder();
let marker = new kakao.maps.Marker();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
searchAddrFromCoords(map.getCenter());

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            let infoDiv = document.querySelector('.top-map-place');
            infoDiv.innerHTML = result[0].address.address_name;
        }
    });
});

kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter());
});

function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// connecting with html --------------------------------------------------------------

const subscribeBtn = document.querySelector(".btn-subscribe");
const modalWindow = document.querySelector("#modal");
const modalBtn = document.querySelector(".btn-modal");
const gotoTopBtn = document.querySelector(".btn-back-to-top");
const showMoreBtn = document.querySelector(".btn-show-more");
const closeScrollBtn = document.querySelector(".btn-close-scroll");
const imageList = document.querySelector(".infinite-scroll-list");
const imageBox = document.querySelector("#infinite-scroll");
let pageToFetch = 1;

async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum + '&limit=5');
        if (!response.ok) {
            throw new Error('network error');
        }

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);

    } catch (error) {
        console.error('load data error :', error);
    }
}

function makeImageList(datas) {
    datas.forEach((item) => {
        imageList.innerHTML += "<li><img src=" + item.download_url + " alt=''></li>";
    });
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight * 0.8 && imageBox.style.display === "block"){
        fetchImages(pageToFetch++);
    }
});

showMoreBtn.addEventListener('click', () => {
        imageBox.style.display = "block";
        closeScrollBtn.style.display = "block";
        fetchImages();
    }
);

closeScrollBtn.addEventListener('click', () => {
   imageBox.style.display = "none";
   closeScrollBtn.style.display = "none";
});

window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 150 ||
        document.body.scrollTop > 150) {
        document.querySelector('.btn-back-to-top').style.display = 'block';
    } else {
        document.querySelector('.btn-back-to-top').style.display = 'none';
    }
})

function backToTop() {
    const position = document.documentElement.scrollTop || document.body.scrollTop;
    if(position) {
       window.requestAnimationFrame(() => {
           window.scrollTo(0, position - position / 10);
           backToTop();
       });
    }
}

gotoTopBtn.addEventListener('click', () => {
    backToTop();
});

subscribeBtn.addEventListener('click', () => {
    console.log("subscribeBtn click");
    modalWindow.style.display = 'block';
});

modalBtn.addEventListener('click', () => {
    console.log("modalBtn click");
    modalWindow.style.display = 'none';
});