/* Phone menu: the ☰ button shows and hides the nav links. */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("active");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
