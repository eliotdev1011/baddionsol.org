"use strict";

////////////////////////////////
// RELOAD ON THRESHOLD CHANGE //
////////////////////////////////

// V4 //

let doit;
let initialWidth = window.innerWidth;

window.addEventListener("resize", function () {
  if (window.innerWidth !== initialWidth) {
    clearTimeout(doit);
    doit = setTimeout(() => {
      location.reload();
    }, 200);

    initialWidth = window.innerWidth; // Update initial width after reload is triggered
  }
});

// /////////////////////////////
// // DISABLE SCROLL TEMPORAL //
// /////////////////////////////

// function disableScrolling() {
//   const scrollX = window.scrollX;
//   const scrollY = window.scrollY;

//   document.body.style.top = `-${scrollY}px`;
//   document.body.style.left = `-${scrollX}px`;
// }

// function enableScrolling() {
//   const scrollY = document.body.style.top;

//   document.body.style.top = "";
//   document.body.style.left = "";

//   // Restore scroll position
//   window.scrollTo(0, parseInt(scrollY || "0") * -1);
// }

// disableScrolling();

// ////////////////////////////
// // RESET SCROLL ON RELOAD //
// ////////////////////////////

// if (history.scrollRestoration) {
//   history.scrollRestoration = "manual";
// } else {
//   window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   };
// }

//////////////////////
// REVEAL ON SCROLL //
//////////////////////

const revealedContents = document.querySelectorAll(".revealed-content");

window.addEventListener("DOMContentLoaded", function () {
  revealedContents.forEach(function (content) {
    content.classList.add("reveal-from-bot");
  });
});

const revealContent = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("reveal-from-bot");
    observer.unobserve(entry.target);
  });
};

const revealObserver = new IntersectionObserver(revealContent, {
  root: null,
  threshold: 0.25,
  rootMargin: "0px",
});

revealedContents.forEach((content) => {
  revealObserver.observe(content);
});

// //////////////////
// // LOADING PAGE //
// //////////////////

// const body = document.querySelector("body");
// const loadingPage = document.querySelector(".loading-page");

// const loadingTextElement = document.querySelectorAll(".loading-text");
// const loadingTexts = ["Loading", "Loading.", "Loading..", "Loading..."];
// let index = 0;

// // LOADING ANIMATION //
// setInterval(() => {
//   loadingTextElement.forEach(function (text) {
//     text.textContent = loadingTexts[index];
//   });

//   index = (index + 1) % loadingTexts.length;
// }, 300);

// // LOADING PAGE REMOVE //

// window.addEventListener("load", function () {
//   setTimeout(() => {
//     enableScrolling(); // THIS
//     loadingPage.style.display = "none";
//   }, 200);
// });

// ///////////////////
// // SMOOTH SCROLL //
// ///////////////////

// const allLinks = document.querySelectorAll(".internal-link");

// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const href = link.getAttribute("href");

//     // Scroll to top
//     if (href === "#") {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//     if (href !== "#" && href.startsWith("#")) {
//       const sectionEl = document.querySelector(href);
//       sectionEl.scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });

////////////////////
// HAMBURGER MENU //
////////////////////

const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");
const hamburgerMenuBtnList = document.querySelector(".hamburger-menu-btn-list");

const mobileHiddenLink = document.querySelectorAll(".mobile-hidden-link");
const mainNavList = document.querySelector(".main-nav-list");
const header = document.querySelector(".header");
const mainNav = document.querySelector(".main-nav");
const navLastChild = document.querySelector(".main-nav-list-item:last-child");
const navLinks = document.querySelectorAll(".nav-link");

let mobileMenuStatus = "closed";

const openMobileMenu = function () {
  mobileMenuStatus = "open";
  mobileHiddenLink.forEach((menuItem) => {
    menuItem.style.display = "block";
  });

  mainNavList.style.flexDirection = "column";
  mainNav.style.height = "100%";
  mainNav.style.borderRadius = "2.8rem";
  navLastChild.style.marginLeft = "0";
  mainNavList.style.paddingTop = "8rem";
  mainNavList.style.paddingBottom = "4rem";
};

const closeMobileMenu = function () {
  mobileMenuStatus = "closed";
  mobileHiddenLink.forEach((menuItem) => {
    menuItem.style.display = "none";
  });

  mainNavList.style.flexDirection = "row";
  mainNav.style.height = "6.8rem";
  mainNav.style.borderRadius = "9999px";
  navLastChild.style.marginLeft = "auto";
  mainNavList.style.paddingTop = "0";
  mainNavList.style.paddingBottom = "0";
};

hamburgerMenuBtn.addEventListener("click", function () {
  mobileMenuStatus === "closed" ? openMobileMenu() : closeMobileMenu();
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (mobileMenuStatus === "open") {
      closeMobileMenu();
    }
  });
});

const responsiveMenuControl = function () {
  if (window.innerWidth > 768) {
    hamburgerMenuBtnList.style.display = "none";
    closeMobileMenu();
    mobileHiddenLink.forEach((menuItem) => {
      menuItem.style.display = "block";
    });
  }

  if (window.innerWidth <= 768) {
    hamburgerMenuBtnList.style.display = "flex";
    closeMobileMenu();
  }
};

window.addEventListener("resize", responsiveMenuControl);
window.addEventListener("load", responsiveMenuControl);
