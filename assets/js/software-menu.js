/* Software flyout under the "Software" nav link, like the Models menu of deepmind.google.
   Loaded in <head> of every page with a nav: add new software here (and a card in software.html). */
(function () {
  var GROUPS = [
    {
      title: "Neural representations",
      items: [
        { name: "Multigeom", href: "https://multigeom.github.io", icon: "images/software/multigeom_icon.webp",
          text: "Visualise the geometry of neural representations" }
      ]
    },
    {
      title: "Spike sorting",
      items: [
        { name: "Spikecurate", href: "https://steevelaquitaine.github.io/spikecurate/", icon: "images/software/spikecurate_icon.webp",
          text: "Curate sorted single units automatically" },
        { name: "Spikebias", href: "https://spikebias.github.io", icon: "images/software/spikebias_icon.webp",
          text: "Measure spike sorting biases against ground truth" }
      ]
    }
  ];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function build() {
    var panel = el("div", "swm-panel");

    var intro = el("div", "swm-intro");
    intro.appendChild(el("p", "swm-title", "Open-source Python packages"));
    var all = el("a", "swm-all", "All software");
    all.href = "software.html";
    intro.appendChild(all);
    panel.appendChild(intro);

    var columns = el("div", "swm-columns");
    GROUPS.forEach(function (group) {
      var col = el("div", "swm-column");
      col.appendChild(el("p", "swm-group", group.title));
      group.items.forEach(function (item) {
        var a = el("a", "swm-link");
        a.href = item.href;
        var img = el("img", "swm-icon");
        img.src = item.icon;
        img.alt = "";
        img.width = img.height = 48;
        var text = el("span", "swm-text");
        text.appendChild(el("span", "swm-name", item.name));
        text.appendChild(el("span", "swm-desc", item.text));
        a.appendChild(img);
        a.appendChild(text);
        col.appendChild(a);
      });
      columns.appendChild(col);
    });
    panel.appendChild(columns);

    var flyout = el("div", "swm-flyout");
    flyout.appendChild(panel);
    return flyout;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var link = document.querySelector('.nav-links a[href="software.html"]');
    if (!link) return;

    var wrap = el("div", "nav-menu");
    link.parentNode.insertBefore(wrap, link);
    wrap.appendChild(link);
    wrap.appendChild(build());
    link.setAttribute("aria-haspopup", "true");
    link.setAttribute("aria-expanded", "false");

    var timer, quiet = false;
    function open() {
      clearTimeout(timer);
      wrap.classList.add("open");
      link.setAttribute("aria-expanded", "true");
    }
    function close() {
      clearTimeout(timer);
      wrap.classList.remove("open");
      link.setAttribute("aria-expanded", "false");
    }

    // A short delay before closing lets the pointer cross from the link to the panel
    wrap.addEventListener("mouseenter", open);
    wrap.addEventListener("mouseleave", function () { timer = setTimeout(close, 150); });
    wrap.addEventListener("focusin", function () { if (!quiet) open(); });
    wrap.addEventListener("focusout", function (e) { if (!wrap.contains(e.relatedTarget)) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !wrap.classList.contains("open")) return;
      close();
      quiet = true;
      link.focus();
      quiet = false;
    });
  });
})();
