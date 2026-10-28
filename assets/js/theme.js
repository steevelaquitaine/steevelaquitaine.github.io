/* Light/dark toggle. Loaded in <head> so the theme is set before first paint. */
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function preferred() {
    var s = stored();
    if (s === "dark" || s === "light") return s;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "\u25D0 Light" : "\u25D0 Dark";
      btn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    }
  }

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.className = "theme-toggle";
    btn.type = "button";
    document.body.appendChild(btn);
    apply(root.getAttribute("data-theme"));
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  });
})();
