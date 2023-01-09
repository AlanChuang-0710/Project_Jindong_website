/* 實現模糊查詢開始=============================== */
(function () {
    let keyword = document.querySelector(".keyword");
    let searchRemind = document.querySelector(".search-remind")

    // 自設一個數組(由後端數據庫提供)
    let searchArr = ["聖誕帽", "聖誕老人", "麋鹿", "交換禮物", "聖誕party", "聖誕大餐", "拐杖", "聖誕樹", "聖誕蛋糕", "薑糖餅乾", "薑餅屋", "禮盒"]

    keyword.oninput = () => {
        searchRemind.innerHTML = "";
        for (let i = 0; i < searchArr.length; i++) {
            if (searchArr[i].indexOf(keyword.value) !== -1) {
                searchRemind.innerHTML += `<p><a href="#">${searchArr[i]}</a></p>`;
                searchRemind.style.display = "block";
            }
        }
    }

    keyword.addEventListener("focus", () => {
        if (searchRemind.innerHTML) {
            searchRemind.style.display = "block";
        }
    })

    keyword.addEventListener("blur", () => {
        searchRemind.style.display = "none";
    })
})();

/* 實現main輪播圖效果===============================  */
(function () {
    let carouselImg = document.querySelector(".carousel-img");
    let imgArr = ["1.webp", "2.jpg", "3.jpg", "4.jpg", "5.webp", "6.webp", "7.jpg", "8.jpg"]
    let count = 0;
    let imgBtn = document.querySelectorAll(".carousel .banner-btn li")
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let carousel = document.querySelector(".carousel");

    // 輪播換圖
    function changeImg() {
        carouselImg.src = `./image/${imgArr[count]}`
        for (let key in imgBtn) {
            imgBtn[key].className = "";
        }
        imgBtn[count].className = "active";
    };


    let autoChange = setInterval(function () {
        count++;
        if (count > imgArr.length - 1) {
            count = 0;
        }
        changeImg();
    }, 1200);

    // 點擊上下換一張圖
    next.onclick = () => {
        count++;
        if (count > imgArr.length - 1) {
            count = 0;
        }
        changeImg();
    }

    prev.onclick = () => {
        count--;
        if (count < 0) {
            count = imgArr.length - 1;
        }
        changeImg();
    }

    //點擊下方按鈕更換圖片
    for (let index in imgBtn) {
        imgBtn[index].onclick = () => {
            count = index
            changeImg();
        }
    }

    // mouseover 暫停輪播圖
    carousel.onmouseover = () => {
        clearInterval(autoChange);
    };

    // mouseout 再次啟動輪播圖
    carousel.onmouseout = () => {
        autoChange = setInterval(function () {
            count++;
            if (count > imgArr.length - 1) {
                count = 0;
            }
            changeImg();
        }, 2000);
    }
})();

/* 實現main左側導航條的局部顯示圖 */
(function () {
    let leftNavItem = document.querySelectorAll(".banner .left-nav .item");
    let leftNavShow = document.querySelector(".left-nav-show");

    leftNavItem.forEach((item, index) => {
        item.addEventListener("mouseenter", _.throttle(
            (e) => {
                leftNavShow.classList.add("display-block");
                axios({
                    method: "GET",
                    url: "http://127.0.0.1:3000/server",
                    params: {
                        user: "Alan",
                        level: 40
                    },
                    timeout: 2000,
                }).then((response) => {
                    leftNavShow.innerHTML = response.data[index];
                }).catch((err) => {
                    console.log(err);
                })
            }, 50));
        item.addEventListener("mouseleave", (e) => {
            leftNavShow.classList.remove("display-block");
        });
    })
    // 要麼使用mouseover + mouseout 要麼使用mouseenter + mouseleave，後者組合屬於不會冒泡(頻繁觸發的發，使用後者)。
    // leftNavItem[0].addEventListener("mouseenter", (e) => {
    //     leftNavShow.classList.add("display-block");
    //     axios({
    //         method: "GET",
    //         url: "http://127.0.0.1:3000/server",
    //         params: {
    //             user: "Alan",
    //             level: 40
    //         },
    //         timeout: 2000,
    //     }).then((response) => {
    //         leftNavShow.innerHTML = response.data[0];
    //     })
    // });
    // leftNavItem[0].addEventListener("mouseleave", (e) => {
    //     leftNavShow.classList.remove("display-block");
    // });
    // leftNavItem[1].addEventListener("mouseenter", (e) => {
    //     leftNavShow.classList.add("display-block");
    //     axios({
    //         method: "GET",
    //         url: "http://127.0.0.1:3000/server",
    //         params: {
    //             user: "Alan",
    //             level: 40
    //         },
    //         timeout: 2000,
    //     }).then((response) => {
    //         // console.log(response);
    //         leftNavShow.innerHTML = response.data[1];
    //     })
    // });
    // leftNavItem[1].addEventListener("mouseleave", (e) => {
    //     leftNavShow.classList.remove("display-block");
    // });
})();

/* 實現elevator相關 =============================== */
(function () {
    let header = document.querySelector("header");
    let banner = document.querySelector(".banner");
    let elevator = document.querySelector(".elevator");
    let items = document.querySelectorAll(".content .item");
    let elevatorA = document.querySelectorAll(".elevator a");
    let base = header.offsetHeight + banner.offsetHeight;
    let elevatorArr = [];
    function clearColor() {
        for (let i = 0; i < elevatorA.length - 2; i++) {
            elevatorA[i].style.color = "";
        }
    }

    for (let i = 0; i < items.length; i++) {
        base += items[i].offsetHeight;
        elevatorArr.push(base);
    }

    // elevator的定位切換
    document.onscroll = () => {
        // 或許可以用window.pageYOffset 兼容性?
        let top = document.documentElement.scrollTop || document.body.scrollTop
        let headerHeight = header.offsetHeight;
        let bannerHeight = banner.offsetHeight;
        let search = document.querySelector(".search");


        if (top >= headerHeight + bannerHeight) {
            elevator.className = "elevator elevator-fix";
            search.classList.add("search-fix");
        } else {
            elevator.className = "elevator";
            search.className = "search";
        }

        if (top < headerHeight + bannerHeight) {
            clearColor();
        } else if (top >= header.offsetHeight + banner.offsetHeight && top < elevatorArr[0]) {
            clearColor();
            elevatorA[0].style.color = "red";
        } else if (top >= elevatorArr[0] && top < elevatorArr[1]) {
            clearColor();
            elevatorA[1].style.color = "red";
        } else if (top >= elevatorArr[1] && top < elevatorArr[2]) {
            clearColor();
            elevatorA[2].style.color = "red";
        } else if (top >= elevatorArr[2]) {
            clearColor();
            elevatorA[3].style.color = "red";
        }
    }
})();

/* 實現秒殺倒數計時 ============================*/
(function () {
    let miaosa = document.querySelector(".miaosa");
    let second = document.querySelector(".second");
    let minute = document.querySelector(".minute");
    let secondStart = 59;
    let minuteStart = 6;
    second.innerHTML = secondStart;
    minute.innerHTML = "0" + minuteStart;

    const miaosaTimer = setInterval(() => {
        if (secondStart <= 0) {
            secondStart = 59;
            minuteStart--;
            minute.innerHTML = "0" + minuteStart;
        }

        if (minuteStart < 0) {
            miaosa.style.display = "none";
            clearInterval(miaosaTimer);
        }

        secondStart--;

        if (secondStart < 10) {
            second.innerHTML = "0" + secondStart;
            return;
        } else {
            second.innerHTML = secondStart;
        }
    }, 1000)
})();

/* 實現秒殺物品輪播圖 */
(function () {
    let miaosaSlide = document.querySelector(".miaosa-slide");
    let imgWidth = document.querySelector(".miaosa-item").offsetWidth;
    let left = 0;

    miaosaSlide.onmouseover = () => {
        clearInterval(demo);
    };

    miaosaSlide.onmouseout = () => {
        demo = setInterval(() => {
            left -= 5;
            miaosaSlide.style.left = left + "px";
            if (left < -imgWidth * 7) {
                left = 0;
            }
        }, 100);
    };

    let demo = setInterval(() => {
        left -= 5;
        miaosaSlide.style.left = left + "px";
        if (left < -imgWidth * 7) {
            left = 0;
        }
    }, 100)
})();

/* 實現為你推薦圖片懶加載 */
(function () {
    const images = document.querySelectorAll('img[data-src]');

    // 設定在什麼情況下觸發 callback 函式
    const options = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    }

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const src = entry.target.getAttribute("data-src");
            if (!src) return;
            entry.target.src = src;
            observer.unobserve(entry.target);
        })
    };

    let observer = new IntersectionObserver(lazyLoad, options);
    images.forEach(image => observer.observe(image));
})()

/* 實現刷新後 回到頁頂的效果 */
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}







