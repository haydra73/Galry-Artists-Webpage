const sliders = document.querySelectorAll(".slide");
const nav = document.querySelector(".header");
const mouse = document.querySelector(".cursor");
const mouseText = document.querySelector(".cursor__text");

//scenes
let slideScene;
let pageScene;

// initiate
const animateSlides = () => {
  // initiate the controller
  const controller = new ScrollMagic.Controller();
  // get the main elements

  //Loop over the element to manipulate children

  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal__img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal__text");

    // lets use gsap on these elements (using timeline)

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
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideT1)
      .addIndicators({ colorStart: "white", colorEnd: "white", name: "slide" })
      .addTo(controller);

    //page animations
    const pageT1 = gsap.timeline();
    const nextSlide = slides.length - 1 === index ? null : slides[index + 1];
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
      .addIndicators({
        colorStart: "white",
        colorEnd: "white",
        name: "page",
        indent: 200,
      })
      .addTo(controller);
  });
};

const cursorMove = (e) => {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
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
    mouseText.innerText = "Tap";
  } else {
    mouse.classList.remove("active-cursor-explore");
    mouseText.innerText = "";
  }
};

// control position of cursor
window.addEventListener("mousemove", cursorMove);
// animate cursor
window.addEventListener("mouseover", activeCursor);
animateSlides();
