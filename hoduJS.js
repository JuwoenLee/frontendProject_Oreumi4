// let mapContainer = document.getElementById('map'), // 지도를 표시할 div
//     mapOption = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };
//
// // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
// const map = new kakao.maps.Map(mapContainer, mapOption);

const subscribeBtn = document.querySelector(".btn-subscribe");
const modalWindow = document.querySelector("#modal");
const modalBtn = document.querySelector(".modal-btn");
const gotoTopBtn = document.querySelector(".scroll-btn");
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

showMoreBtn.addEventListener('click', () => {
    imageBox.style.display = "block";
    closeScrollBtn.style.display = "block";
    window.addEventListener('scroll', ()=>{
        // 스크롤이 상단으로부터 얼마나 이동했는지 알아야합니다. (뷰포트의 높이 + 스크롤된 길이)
        // 화면에 로딩된 페이지의 전체 높이
        // 뷰포트의 높이 + 스크롤된 길이 + 10 === 화면에 로딩된 페이지의 전체 높이

        if(window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight){
            fetchImages(pageToFetch++);
        }
    });
    }
);

closeScrollBtn.addEventListener('click', () => {
   imageBox.style.display = "none";
   closeScrollBtn.style.display = "none";
});

gotoTopBtn.addEventListener('click', () => {
    if(window.scrollY !== 0) {
        window.scrollTo(0, 0);
    }
});

subscribeBtn.addEventListener('click', () => {
    console.log("subscribeBtn click");
    modalWindow.style.display = 'block';
});

modalBtn.addEventListener('click', () => {
    console.log("modalBtn click");
    modalWindow.style.display = 'none';
});


fetchImages();



