const logo = document.querySelector("#logo");
const mouse = document.querySelector(".cursor");
const mouseText = document.querySelector(".cursor__text");
const burger = document.querySelector(".burger");

//////////////////////////////////////cursor movement
const cursorMove = (e) => {
  mouse.style.top = e.clientY + "px";
  mouse.style.left = e.clientX + "px";
};

const activeCursor = (e) => {
  const item = e.target;

  if (item.id === "logo" || item.id === "burger") {
    mouse.classList.add("active-cursor-nav");
  } else {
    mouse.classList.remove("active-cursor-nav");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("active-cursor-explore");
    gsap.to(".title__swipe", 1, { y: "0%" });
    mouseText.innerText = "Tap";
  } else {
    mouse.classList.remove("active-cursor-explore");
    gsap.to(".title__swipe", 1, { y: "100%" });
    mouseText.innerText = "";
  }
};

/////////////////////////////////////navToggle

const navToggle = (e) => {
  if (!e.target.classList.contains("nav__active")) {
    e.target.classList.add("nav__active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to(".logo", 1, { color: "black" });
    gsap.to(".main__nav", 1, { clipPath: "circle(4000px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("nav__active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".logo", 1, { color: "white" });
    gsap.to(".main__nav", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
};

/////////////////////////////////////scenes
let slideScene;
let pageScene;
let detailScene;
let controller;

gsap.config({
  nullTargetWarn: false,
});

/////////////////HOME PAGE

// initiate
const animateSlides = () => {
  // initiate the controller
  controller = new ScrollMagic.Controller();
  // get the main elements
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".header");
  //Loop over the element to manipulate children

  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal__img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal__text");

    // lets use gsap on these elements (using timeline)
    //slide setup
    const slideT1 = gsap.timeline({
      defaults: { duration: 1, ease: "power2.easeOut" },
    });

    slideT1.fromTo(
      revealImg,
      { x: "0%", scale: "2" },
      { x: "100%", scale: "1" }
    );
    slideT1.fromTo(img, { scale: "2" }, { scale: "1" }, "-=1");
    slideT1.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideT1.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    // slide animations

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.2,
      reverse: false,
    })
      .setTween(slideT1)
      .addTo(controller);

    // page setup
    const pageT1 = gsap.timeline();
    const nextSlide =
      slides.length - 1 === index ? undefined : slides[index + 1];

    //page animations
    pageT1.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageT1.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageT1.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setTween(pageT1)
      .setPin(slide, { pushFollowers: false })
      .addTo(controller);
  });
};

/////////////////HOME PAGE

const animateDetails = () => {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail__slide");
  slides.forEach((slide, index, slides) => {
    const slideT1 = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? null : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideT1.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideT1.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideT1.fromTo(nextImg, { x: "50%" }, { x: "0%" });

    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideT1)
      .addTo(controller);
  });
};

// Initiate barba

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "home.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        animateDetails();
        logo.href = "home.html";
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],

  transitions: [
    {
      leave({ current }) {
        // completion
        let done = this.async();

        //add a page transition animation
        const timeline1 = gsap.timeline({
          defaults: { ease: "power2.easeOut" },
        });
        timeline1.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        timeline1.fromTo(
          ".flash",
          0.75,
          { x: "-100%" },
          { x: "0%", stagger: 0.2, onComplete: done },
          "-=0.5"
        );
      },

      enter({ current, next }) {
        // completion
        let done = this.async();
        window.scrollTo(0, 107);
        //add a page transition animation
        const timeline1 = gsap.timeline({
          defaults: { ease: "power2.easeOut" },
        });
        timeline1.fromTo(
          ".flash",
          0.75,
          { x: "0" },
          { x: "100%", stagger: 0.2, onComplete: done }
        );
        timeline1.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        timeline1.fromTo(
          ".header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.easeOut" },
          "-=1.5"
        );
      },
    },
  ],
});

/////////////////////Event Listeners
window.addEventListener("mousemove", cursorMove);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);
// animateSlides();
