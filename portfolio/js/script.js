(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  var desktopQuery = window.matchMedia("(min-width: 900px)");

  /* ---- Mobile menu ---- */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setMenu(false);
  });

  /* ---- Header border once the page is scrolled ---- */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Contact form: opens the visitor's email app (static site, no server) ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var subject = "Portfolio message from " + data.get("name");
      var body = data.get("message") + "\n\n" + data.get("name") + "\n" + data.get("email");
      window.location.href = "mailto:malikdawood123@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      document.getElementById("form-note").textContent =
        "Your email app should open now. If it does not, write to malikdawood123@gmail.com.";
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Highlight the nav link of the section in view ---- */
  var navLinks = document.querySelectorAll(".nav__link");
  var sectionIds = ["about", "skills", "experience", "projects", "education", "contact"];

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---- Scroll reveal ---- */
  var revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sectionIds.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) spy.observe(section);
  });
  // Clear the highlight when back in the hero
  var hero = document.querySelector(".hero");
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) navLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
  }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (el, index) {
    // Small stagger for the hero only; keeps delays short
    if (index < 7) el.style.transitionDelay = index * 70 + "ms";
    observer.observe(el);
  });
})();
