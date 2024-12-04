"use strict";

/////////////////////////////
// DISABLE SCROLL TEMPORAL //
/////////////////////////////

function disableScrolling() {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = `-${scrollX}px`;
}

function enableScrolling() {
  const scrollY = document.body.style.top;

  document.body.style.top = "";
  document.body.style.left = "";

  // Restore scroll position
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}

disableScrolling();

////////////////////////////
// RESET SCROLL ON RELOAD //
////////////////////////////

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

//////////////////
// LOADING PAGE //
//////////////////

const body = document.querySelector("body");
const loadingPage = document.querySelector(".loading-page");

const loadingTextElement = document.querySelectorAll(".loading-text");
const loadingTexts = ["Loading", "Loading.", "Loading..", "Loading..."];
let index = 0;

// LOADING ANIMATION //
setInterval(() => {
  loadingTextElement.forEach(function (text) {
    text.textContent = loadingTexts[index];
  });

  index = (index + 1) % loadingTexts.length;
}, 300);

// LOADING PAGE REMOVE //

window.addEventListener("load", function () {
  setTimeout(() => {
    enableScrolling(); // THIS
    loadingPage.style.display = "none";
  }, 200);
});

///////////////////
// SMOOTH SCROLL //
///////////////////

const allLinks = document.querySelectorAll(".internal-link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
