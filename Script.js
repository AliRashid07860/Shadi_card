/* =================================
   PAGE NAVIGATION
================================= */

let currentPage = 0;

const pages = document.querySelectorAll(".page");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");

let isTransitioning = false;


/* =================================
   GO TO PAGE
================================= */

function goToPage(index) {

    /* Prevent multiple clicks/swipes */
    if (isTransitioning) {
        return;
    }

    /* Loop to last page */
    if (index < 0) {
        index = pages.length - 1;
    }

    /* Loop to first page */
    if (index >= pages.length) {
        index = 0;
    }

    /* Same page */
    if (index === currentPage) {
        return;
    }

    isTransitioning = true;


    /* =================================
       FIND DIRECTION
    ================================= */

    let direction;

    /*
       Normal next / previous
    */

    if (index > currentPage) {
        direction = "next";
    } else {
        direction = "prev";
    }


    /*
       Special case:
       Last page -> First page
    */

    if (
        currentPage === pages.length - 1 &&
        index === 0
    ) {
        direction = "next";
    }


    /*
       First page -> Last page
    */

    if (
        currentPage === 0 &&
        index === pages.length - 1
    ) {
        direction = "prev";
    }


    /* =================================
       RESET OLD ANIMATIONS
    ================================= */

    slider.classList.remove(
        "gate-opening",
        "slide-next",
        "slide-prev"
    );


    /*
       Force browser to restart animation
    */

    void slider.offsetWidth;


    /* =================================
       START DOOR
    ================================= */

    slider.classList.add("gate-opening");


    /* =================================
       START PAGE SLIDE
    ================================= */

    if (direction === "next") {

        slider.classList.add("slide-next");

    } else {

        slider.classList.add("slide-prev");

    }


    /* =================================
       CHANGE PAGE
    ================================= */

    setTimeout(() => {

        pages.forEach((page, i) => {

            page.classList.toggle(
                "active",
                i === index
            );

        });


        /* =================================
           UPDATE DOTS
        ================================= */

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        /* =================================
           UPDATE CURRENT PAGE
        ================================= */

        currentPage = index;


        /* =================================
           EXTRA FLOWERS ON PAGE 4
        ================================= */

        if (currentPage === 3) {
            createExtraFlowers();
        }

    }, 350);


    /* =================================
       CLEAN TRANSITION
    ================================= */

    setTimeout(() => {

        slider.classList.remove(
            "gate-opening",
            "slide-next",
            "slide-prev"
        );

        isTransitioning = false;

    }, 1250);
}


/* =================================
   DOT CLICK
================================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        goToPage(index);

    });

});


/* =================================
   MOBILE SWIPE
================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


/* =================================
   TOUCH START
================================= */

document.addEventListener(
    "touchstart",
    function (e) {

        touchStartX =
            e.changedTouches[0].clientX;

        touchStartY =
            e.changedTouches[0].clientY;

    },
    {
        passive: true
    }
);


/* =================================
   TOUCH END
================================= */

document.addEventListener(
    "touchend",
    function (e) {

        touchEndX =
            e.changedTouches[0].clientX;

        touchEndY =
            e.changedTouches[0].clientY;

        handleSwipe();

    },
    {
        passive: true
    }
);


/* =================================
   HANDLE SWIPE
================================= */

function handleSwipe() {

    const horizontalDistance =
        touchEndX - touchStartX;

    const verticalDistance =
        touchEndY - touchStartY;


    /*
       If vertical movement is greater,
       ignore the swipe.
    */

    if (
        Math.abs(verticalDistance) >
        Math.abs(horizontalDistance)
    ) {

        return;

    }


    /*
       Ignore small movement
    */

    if (
        Math.abs(horizontalDistance) < 50
    ) {

        return;

    }


    /*
       Finger moved LEFT
       = NEXT PAGE
    */

    if (horizontalDistance < 0) {

        goToPage(currentPage + 1);

    }


    /*
       Finger moved RIGHT
       = PREVIOUS PAGE
    */

    else {

        goToPage(currentPage - 1);

    }
}


/* =================================
   KEYBOARD NAVIGATION
================================= */

document.addEventListener(
    "keydown",
    (e) => {

        if (e.key === "ArrowRight") {

            goToPage(currentPage + 1);

        }


        if (e.key === "ArrowLeft") {

            goToPage(currentPage - 1);

        }

    }
);


/* =================================
   MUSIC
================================= */

const music =
    document.getElementById("weddingMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicBtn.innerHTML = "🎵";

        musicPlaying = false;

    }

    else {

        music.play()
            .then(() => {

                musicBtn.innerHTML = "🔊";

                musicPlaying = true;

            })
            .catch(() => {

                alert(
                    "Please tap the music button again to start the music."
                );

            });

    }
}


/* =================================
   COLORFUL FLOWERS
================================= */

const flowerTypes = [

    {
        symbol: "✿",
        color: "#ff4f81"
    },

    {
        symbol: "❀",
        color: "#ff9f43"
    },

    {
        symbol: "✽",
        color: "#ffd166"
    },

    {
        symbol: "❁",
        color: "#ef5da8"
    },

    {
        symbol: "✾",
        color: "#8e7dff"
    },

    {
        symbol: "✿",
        color: "#4dc9ff"
    },

    {
        symbol: "❀",
        color: "#7ed957"
    },

    {
        symbol: "✽",
        color: "#d58cff"
    },

    {
        symbol: "❁",
        color: "#ff6b6b"
    },

    {
        symbol: "✾",
        color: "#f7c948"
    }

];


const flowerContainer =
    document.getElementById("flowerContainer");


/* =================================
   CREATE FLOWER
================================= */

function createFlower() {

    if (!flowerContainer) {
        return;
    }


    const flower =
        document.createElement("span");


    flower.className = "flower";


    /*
       Random flower type
    */

    const type =
        flowerTypes[
            Math.floor(
                Math.random() *
                flowerTypes.length
            )
        ];


    flower.innerHTML =
        type.symbol;


    flower.style.color =
        type.color;


    /*
       Random horizontal position
    */

    flower.style.left =
        Math.random() * 100 + "vw";


    /*
       Random size
    */

    flower.style.fontSize =
        (
            12 +
            Math.random() * 17
        ) + "px";


    /*
       Random horizontal movement
    */

    flower.style.setProperty(
        "--drift",
        (
            -80 +
            Math.random() * 160
        ) + "px"
    );


    /*
       Random falling speed
    */

    const duration =
        7 +
        Math.random() * 7;


    flower.style.animationDuration =
        duration + "s";


    /*
       Random opacity
    */

    flower.style.opacity =
        .65 +
        Math.random() * .35;


    /*
       Add flower
    */

    flowerContainer.appendChild(
        flower
    );


    /*
       Remove after animation
    */

    setTimeout(() => {

        flower.remove();

    }, (duration + 1) * 1200);

}


/* =================================
   EXTRA FLOWERS FOR PAGE 4
================================= */

function createExtraFlowers() {

    /*
       Page 4 open hone par
       extra flowers
    */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(() => {

            createFlower();

        }, i * 120);

    }
}


/* =================================
   NORMAL FLOWERS
================================= */

setInterval(
    createFlower,
    300
);


/* =================================
   INITIAL FLOWERS
================================= */

for (
    let i = 0;
    i < 15;
    i++
) {

    setTimeout(() => {

        createFlower();

    }, i * 150);

}


/* =================================
   INITIAL PAGE
================================= */

pages.forEach((page, index) => {

    page.classList.toggle(
        "active",
        index === currentPage
    );

});


dots.forEach((dot, index) => {

    dot.classList.toggle(
        "active",
        index === currentPage
    );

});
