/* =========================================================
   MorningFlake — interactions
   Progressive enhancement: the page is fully usable without JS.
   ========================================================= */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile navigation ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  function closeNav() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---- Menu filter ---- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var rows = document.querySelectorAll(".menu-row");
  var groups = document.querySelectorAll(".menu-group");
  var featured = document.querySelector(".featured");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;

      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      rows.forEach(function (row) {
        var match = filter === "all" || row.dataset.cat === filter;
        row.classList.toggle("is-hidden", !match);
      });

      if (featured) {
        featured.classList.toggle("is-hidden", filter !== "all" && filter !== "pastry");
      }

      groups.forEach(function (group) {
        var visible = group.querySelectorAll(".menu-row:not(.is-hidden)").length > 0;
        group.classList.toggle("is-hidden", !visible);
      });
    });
  });

  /* ---- Header shadow + active nav link ---- */
  var header = document.querySelector(".site-header");
  var navLinks = document.querySelectorAll(".main-nav a:not(.header-cta)");
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var target = document.querySelector(id);
      if (target) sections.push({ link: link, target: target });
    }
  });

  function updateNav() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);

    var current = null;
    sections.forEach(function (item) {
      if (item.target.offsetTop - 140 <= y) current = item;
    });
    navLinks.forEach(function (l) { l.classList.remove("is-active"); });
    if (current) current.link.classList.add("is-active");
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
})();
