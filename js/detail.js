/* preview-wrap */
(function () {
    // 實現小圖左右滑動 
    let prev = document.querySelector(".spec-list .prev");
    let next = document.querySelector(".spec-list .next");
    let ul = document.querySelector(".spec-item ul");
    let liArr = document.querySelectorAll(".spec-item ul li");
    let middleImg = document.querySelector(".main-img .middle-img")
    let imgDetail = document.querySelector(".img-detail");

    prev.onclick = () => {
        ul.style.left = "0";
        prev.style.background = "url('./image/detail_prev_sprite.png')"
        next.style.background = "";
    }

    next.onclick = () => {
        ul.style.left = "-116px";
        prev.style.background = "";
        next.style.background = "url('./image/detail_next_sprite.png')";
    }

    // 實現點擊小圖更換中圖
    liArr.forEach((item) => {
        item.onmouseover = () => {
            for (let index in liArr) {
                liArr[index].className = "";
            }
            item.className = "img-hover";
            middleImg.src = item.children[0].src;
            imgDetail.src = item.children[0].src;
        }
    })

    // 實現中圖的放大鏡隨箭頭移動
    let mainImg = document.querySelector(".preview-wrap .main-img");
    let magnifier = document.querySelector(".main-img .magnifier");
    let bigImg = document.querySelector(".main-img .big-img");
    mainImg.onmouseover = (event) => {
        magnifier.style.display = "block";
        bigImg.style.display = "block";
    };

    mainImg.onmouseout = (event) => {
        magnifier.style.display = "none";
        bigImg.style.display = "none";
    }

    mainImg.onmousemove = (event) => {
        let pageY = event.pageY;
        let pageX = event.pageX;
        let offsetTop = mainImg.offsetTop;
        let offsetLeft = mainImg.offsetLeft;
        let top = pageY - offsetTop - magnifier.clientHeight / 2;
        let left = pageX - offsetLeft - magnifier.clientWidth / 2;
        if (top <= 0) {
            top = 0;
        } else if (top >= mainImg.clientHeight - magnifier.clientHeight) {
            top = mainImg.clientHeight - magnifier.clientHeight;
        }

        if (left <= 0) {
            left = 0;
        } else if (left >= mainImg.clientWidth - magnifier.clientWidth) {
            left = mainImg.clientWidth - magnifier.clientWidth;
        }
        magnifier.style.top = top + "px";
        magnifier.style.left = left + "px";

        let bigTop = top * 800 / 230;
        let bigLeft = left * 800 / 230;

        if (bigLeft > imgDetail.clientWidth - bigImg.clientWidth) {
            bigLeft = imgDetail.clientWidth - bigImg.clientWidth;
        }

        if (bigTop > imgDetail.clientHeight - bigImg.clientHeight) {
            bigTop = imgDetail.clientHeight - bigImg.clientHeight;
        }

        imgDetail.style.left = -1 * bigLeft + "px";
        imgDetail.style.top = -1 * bigTop + "px";
    }
})();

/* itemInfo-wrap 購物車數量*/
(function () {
    let minus = document.querySelector(".minus");
    let plus = document.querySelector(".plus");
    let buyNum = document.querySelector(".buy-number");

    plus.onclick = () => {
        buyNum.value++;
        if (buyNum.value > 1) {
            minus.classList.remove("disable");
        }
    }

    minus.onclick = () => {
        if (buyNum.value > 1) {
            buyNum.value--;
        } else if (buyNum.value <= 1) {
            minus.classList.add("disable");
        }
    }

})();

/* itemInfo-wrap 選擇樣式 */
(function () {
    let specItem = document.querySelectorAll(".specItem li");
    specItem.forEach((item) => {
        item.addEventListener("click", () => {
            specItem.forEach((item) => {
                item.style.border = ""
            })
            item.style.border = "1px solid red";
        })
    })
})();

/* section.product-detail 更改展示區*/
(function () {
    let navOption = document.querySelectorAll(".nav-option");
    let productDemo = document.querySelectorAll(".product > div");
    let productDescription = document.querySelector(".product > .product-description");
    let prodcutSpec = document.querySelector(".product > .product-spec");
    let guarantee = document.querySelector(".product > .guarantee");
    let comment = document.querySelector(".product > .comment");

    navOption.forEach((option) => {
        option.addEventListener("click", () => {
            navOption.forEach((option) => {
                option.classList.remove("actived");
            })
            option.classList.toggle("actived");
        })
    })
    navOption[0].addEventListener("click", () => {
        productDemo.forEach((demo) => {
            demo.style.display = "";
        });
    })

    navOption[1].addEventListener("click", () => {
        productDemo.forEach((demo) => {
            demo.style.display = "";
        })
        productDescription.style.display = "none";
    })

    navOption[2].addEventListener("click", () => {
        productDemo.forEach((demo) => {
            demo.style.display = "";
        })
        productDescription.style.display = "none";
        prodcutSpec.style.display = "none";
    })

    navOption[3].addEventListener("click", () => {
        productDemo.forEach((demo) => {
            demo.style.display = "";
        });
        productDescription.style.display = "none";
        prodcutSpec.style.display = "none";
        guarantee.style.display = "none";
    })

    navOption[4].addEventListener("click", () => {
        productDescription.style.display = "none";
        prodcutSpec.style.display = "none";
        guarantee.style.display = "none";
        comment.style.display = "none";
    })
})()
