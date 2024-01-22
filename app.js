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
const navTopLogoImage = document.querySelector(".img-top-logo");
const navHome = document.querySelector(".top-navigation-home");
const navAbout = document.querySelector(".top-navigation-about");
const navSupport = document.querySelector(".top-navigation-support");
const mobileNavHome = document.querySelector(".mobile-navigation-home");
const mobileNavAbout = document.querySelector(".mobile-navigation-about");
const mobileNavSupport = document.querySelector(".mobile-navigation-support");
const footerLogoImage = document.querySelector(".footer-hodu-logo");

const exceptModal = document.querySelectorAll("body > *:not(#modal)");

const mobileFooterAbout = document.querySelector(".footer-mobile-about");
const mobileFooterBlog = document.querySelector(".footer-mobile-blog");
const mobileFooterSupport = document.querySelector(".footer-mobile-support");

mobileFooterAbout.addEventListener('click', () => {
    const mainPosition = document.querySelector("#main"). getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top : mainPosition, behavior : "smooth"});
});

mobileFooterBlog.addEventListener('click', () => {
   window.open('https://www.notion.so/ko-kr');
});

mobileFooterSupport.addEventListener('click', () => {
    const subscribePosition = document.querySelector(".subscribe-box"). getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top : subscribePosition, behavior : "smooth"});
});

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
    if(document.body.clientHeight  * 0.6 < (window.scrollY + window.innerHeight)) {
        console.log("load");
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
        if(imageBox.style.display === "block") {
            imageList.innerHTML += "<img src=" + item.url + " alt=''>";
        }
    });
}

navTopLogoImage.addEventListener('click', () => {
    window.scrollTo({top : document.body.scrollHeight, behavior : "smooth"});
});

navHome.addEventListener('click', () => {
    const homePosition = document.querySelector("#header"). getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top : homePosition, behavior : "smooth"});
});

navAbout.addEventListener('click', () => {
    const mainPosition = document.querySelector("#main"). getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top : mainPosition, behavior : "smooth"});
});

navSupport.addEventListener('click', () => {
    const subscribePosition = document.querySelector(".subscribe-box"). getBoundingClientRect().top + window.scrollY;
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
    const inputEmail = document.querySelector(".input-email").value;

    if(inputEmail.match(emailForm) != null) {
        modalWindow.style.display = 'block';
        document.querySelector("body").style.overflow = "hidden";
        exceptModal.forEach(function(e) {
            e.style.filter = "saturate(10%)";
        });
    } else {
        alert("Your email is invalid!");
        document.querySelector(".input-email").value = null;
        document.querySelector(".input-email").focus();
    }
});

footerLogoImage.addEventListener('click', () => {
    window.scrollTo({top : 0, behavior : "smooth"});
});

modalBtn.addEventListener('click', () => {
    modalWindow.style.display = 'none';
    document.querySelector("body").style.overflow = "visible";
    exceptModal.forEach(function(e) {
        e.style.filter = "saturate(100%)";
    });
});

mobileMenuBtn.addEventListener('click', () => {
    mobileSideMenu.style.display = "block";

    const homePosition = document.querySelector("#header"). getBoundingClientRect().top + window.scrollY;
    const mainPosition = document.querySelector("#main"). getBoundingClientRect().top + window.scrollY;
    const subscribePosition = document.querySelector(".subscribe-box"). getBoundingClientRect().top + window.scrollY;

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




