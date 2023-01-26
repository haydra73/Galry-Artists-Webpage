// trials

const paintBtn = document.querySelector(".paint__explore");

console.log(paintBtn);

const controller = new ScrollMagic.Controller();
const exploreScene = new ScrollMagic.Scene({
  triggerElement: paintBtn,
  triggerHook: 0.5
})
  .addIndicators({ colorStart: "white", colorTrigger: "white" })
  .setClassToggle(".paint__explore", "active")
  .addTo(controller);
