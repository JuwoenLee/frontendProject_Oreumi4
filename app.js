const subscribeBtn = document.querySelector(".btn-subscribe");
const modalWindow = document.querySelector("#modal");
const modalBtn = document.querySelector(".btn-modal");
const backToTopBtn = document.querySelector(".btn-back-to-top");
const showMoreBtn = document.querySelector(".btn-show-more");
const closeScrollBtn = document.querySelector(".btn-close-scroll");
const imageList = document.querySelector(".infinite-scroll-img-group");
const imageBox = document.querySelector("#infinite-scroll");
const mobileMenuBtn = document.querySelector(".btn-top-navigation-menu");
const mobileSideMenu = document.querySelector(".mobile-navigation-bar");
const mobileMenuCloseBtn = document.querySelector(".close-arrow");
const navHome = document.querySelector(".top-navigation-home");
const navAbout = document.querySelector(".top-navigation-about");
const navSupport = document.querySelector(".top-navigation-support");
const mobileNavHome = document.querySelector(".mobile-navigation-home");
const mobileNavAbout = document.querySelector(".mobile-navigation-about");
const mobileNavSupport = document.querySelector(".mobile-navigation-support");
const footerLogoImage = document.querySelector(".footer-hodu-logo");

const homePosition = document.querySelector("#header"). getBoundingClientRect().top + window.scrollY;;
const mainPosition = document.querySelector("#main"). getBoundingClientRect().top + window.scrollY;
const subscribePosition = document.querySelector(".subscribe-box"). getBoundingClientRect().top + window.scrollY;;


async function fetchImages(){
    try {
        const response = await fetch ('https://api.thecatapi.com/v1/images/search?limit=10');
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
    if(document.body.clientHeight > (window.scrollY + window.innerHeight) * 0.5) {
        console.log(document.body.clientHeight);
        console.log((window.scrollY + window.innerHeight) * 0.5);
        fetchImages();
    }
};

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
        imageList.innerHTML += "<img src=" + item.url + " alt=''>";
    });
}

navHome.addEventListener('click', () => {
    window.scrollTo({top : homePosition, behavior : "smooth"});
});

navAbout.addEventListener('click', () => {
    window.scrollTo({top : mainPosition, behavior : "smooth"});
});

navSupport.addEventListener('click', () => {
    window.scrollTo({top : subscribePosition, behavior : "smooth"});
});

showMoreBtn.addEventListener('click', () => {
        imageBox.style.display = "block";
        closeScrollBtn.style.display = "block";
        fetchImages();
        window.addEventListener('scroll', throttling(infinityScroll, 1000));
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
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({top : 0, behavior : "smooth"});
});

subscribeBtn.addEventListener('click', () => {
    const emailForm = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    console.log(document.querySelector(".input-email").value);
    const inputEmail = document.querySelector(".input-email").value;
    if(inputEmail.match(emailForm) != null) {
        modalWindow.style.display = 'block';
    } else {
        alert("Your email is invalid!");
        document.querySelector(".input-email").value = null;
        document.querySelector(".input-email").focus();
    }
});

modalBtn.addEventListener('click', () => {
    modalWindow.style.display = 'none';
});

mobileMenuBtn.addEventListener('click', () => {
    mobileSideMenu.style.display = "block";

    mobileNavHome.addEventListener('click', () => {
        window.scrollTo({top : homePosition, behavior : "smooth"});
        mobileSideMenu.style.display = "none";
    });
    mobileNavAbout.addEventListener('click', () => {
        window.scrollTo({top : mainPosition, behavior : "smooth"});
        mobileSideMenu.style.display = "none";
    });
    mobileNavSupport.addEventListener('click', () => {
        window.scrollTo({top : subscribePosition, behavior : "smooth"});
        mobileSideMenu.style.display = "none";
    });
});

mobileMenuCloseBtn.addEventListener('click', () => {
    mobileSideMenu.style.display = "none";
});

footerLogoImage.addEventListener('click', () => {
    window.scrollTo({top : 0, behavior : "smooth"});
});


