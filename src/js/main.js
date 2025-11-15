import gsap from "gsap";

let lastScroll = 0;
const nav = document.querySelector("#omniNav");
const navHeight = nav.offsetHeight;

gsap.set(nav, { y: 0 }); // Initial position

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScroll && currentScroll > navHeight) {
    // Scroll down → hide nav
    gsap.to(nav, { y: -navHeight - 20, duration: 0.5, ease: "power2.out" });
  } else if (currentScroll < lastScroll) {
    // Scroll up → show nav
    gsap.to(nav, { y: 0, duration: 0.5, ease: "power2.out" });
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});
