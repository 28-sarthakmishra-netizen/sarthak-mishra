/* =====================================================================
   script.js — builds the page from content.js.
   You don't need to edit this file to change any text.
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  // *word* becomes the italic accent word
  function fmt(value) {
    return esc(value).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function list(value) { return Array.isArray(value) ? value : []; }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : undefined; }, obj);
  }
  function safely(name, fn) {
    try { fn(); } catch (err) {
      if (window.console) console.warn("Section '" + name + "' could not be built:", err);
    }
  }
  function chips(items) {
    return list(items).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }
  function hideSection(id) {
    var el = document.getElementById(id);
    if (el) el.hidden = true;
    var link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link && link.parentElement) link.parentElement.hidden = true;
  }

  var S = window.SITE;

  /* ---------- content.js could not load ---------- */
  if (!S || typeof S !== "object") {
    var info = window.__contentError;
    var box = $("#load-error");
    var where = info && info.line ? " near <b style=\"display:inline;font:inherit;font-weight:700\">line " + info.line + "</b>" : "";
    var why = info && info.message ? " The browser says: <code>" + esc(info.message) + "</code>." : "";
    box.innerHTML =
      "<b>This page couldn't load its content.</b>" +
      "There is a mistake in <code>content.js</code>" + where + "." + why +
      " It is usually a missing comma, or a quote that was opened and not closed. " +
      "Fix that line on GitHub, or undo the last change to <code>content.js</code>.";
    box.hidden = false;
    document.querySelectorAll(".hero, .sec").forEach(function (el) { el.hidden = true; });
    return;
  }

  /* ---------- simple fills (data-fill="...") ---------- */
  safely("fills", function () {
    document.querySelectorAll("[data-fill]").forEach(function (el) {
      var key = el.getAttribute("data-fill");
      var val = get(S, key);
      if (val == null || val === "") return;
      if (key === "headline") el.innerHTML = fmt(val);
      else el.textContent = val;
    });
    if (S.name) document.title = S.name + " | " + (S.label || "Portfolio").split("·")[0].trim();
  });

  /* ---------- hero ---------- */
  safely("hero", function () {
    var img = $("#portrait-img");
    if (S.photo) { img.src = S.photo; img.alt = "Portrait of " + (S.name || ""); }
    else { $(".portrait").hidden = true; }

    var resume = $("#resume-btn");
    if (S.resume) resume.href = S.resume; else resume.hidden = true;

    var stats = list(S.stats);
    $("#stats").innerHTML = stats.map(function (s) {
      return '<li class="stat"><span class="stat-value">' + esc(s.value) + '</span><span class="stat-label">' + esc(s.label) + "</span></li>";
    }).join("");
    if (!stats.length) $("#stats").hidden = true;

    var up = $("#qc-up");
    if (stats[0] && stats[0].value) up.textContent = "▲ " + String(stats[0].value).replace(/^\+/, "");

    var items = list(S.ticker);
    if (!items.length) { $(".ticker").hidden = true; return; }
    var one = items.map(function (t) {
      var html = esc(t).replace(/(▲[^◆]*)$/, '<span class="up">$1</span>');
      return '<span class="ticker-item">' + html + "</span>";
    }).join("");
    var dup = items.map(function (t) {
      var html = esc(t).replace(/(▲[^◆]*)$/, '<span class="up">$1</span>');
      return '<span class="ticker-item dup">' + html + "</span>";
    }).join("");
    $("#ticker").innerHTML = one + dup;
  });

  /* ---------- about ---------- */
  safely("about", function () {
    var about = S.about || {};
    $("#about-text").innerHTML = list(about.paragraphs).map(function (p) { return "<p>" + fmt(p) + "</p>"; }).join("");
    $("#edu").innerHTML = list(S.education).map(function (e) {
      return '<li><span class="edu-years">' + esc(e.years) + '</span><span class="edu-course">' + esc(e.course) +
        '</span><span class="edu-school">' + esc(e.school) + (e.place ? ", " + esc(e.place) : "") + "</span></li>";
    }).join("");
    if (!list(S.education).length) $("#edu").closest(".panel").hidden = true;
    $("#looking-for").innerHTML = chips(about.lookingFor);
    if (!list(about.lookingFor).length) $("#looking-for").closest(".panel").hidden = true;
  });

  /* ---------- experience ---------- */
  safely("experience", function () {
    var jobs = list(S.experience);
    if (!jobs.length) { hideSection("experience"); return; }
    $("#timeline").innerHTML = jobs.map(function (j, i) {
      var groups = list(j.groups).map(function (g) {
        return '<div class="job-group">' + (g.title ? "<h4>" + esc(g.title) + "</h4>" : "") +
          '<ul class="points">' + list(g.points).map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + "</ul></div>";
      }).join("");
      var dates = esc(j.start) + (j.end ? " — " + esc(j.end) : "");
      return '<li class="job">' +
        '<div class="job-when"><span class="job-dates">' + dates + "</span>" +
          (j.type ? '<span class="pill' + (i > 0 ? " pill-soft" : "") + '">' + esc(j.type) + "</span>" : "") + "</div>" +
        '<article class="job-card"><div><h3>' + esc(j.role) + '</h3><p class="job-org"><b>' + esc(j.company) + "</b>" +
          (j.note ? " · " + esc(j.note) : "") + "</p></div>" + groups +
          (list(j.tags).length ? '<ul class="chips">' + chips(j.tags) + "</ul>" : "") +
        "</article></li>";
    }).join("");
  });

  /* ---------- projects ---------- */
  safely("projects", function () {
    var projects = list(S.projects);
    if (!projects.length) { hideSection("projects"); return; }
    $("#project-list").innerHTML = projects.map(function (p, i) {
      var num = String(i + 1).padStart(2, "0");
      var more = '<ul class="points">' + list(p.details).map(function (d) { return "<li>" + fmt(d) + "</li>"; }).join("") + "</ul>" +
        (p.link ? '<a class="link-out" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || "Open project") + ' <span aria-hidden="true">↗</span></a>' : "");
      return '<article class="project">' +
        '<div class="project-top"><div class="project-meta"><span class="pid">P/' + num + "</span><span>" + esc(p.kind) + "</span></div>" +
        "<h3>" + esc(p.title) + '</h3><p class="project-sum">' + fmt(p.summary) + "</p>" +
        (list(p.tags).length ? '<ul class="chips">' + chips(p.tags) + "</ul>" : "") + "</div>" +
        "<details><summary>Details <span class=\"plus\" aria-hidden=\"true\">+</span></summary>" +
        '<div class="project-more">' + more + "</div></details></article>";
    }).join("");
  });

  /* ---------- skills ---------- */
  safely("skills", function () {
    var groups = list(S.skills);
    if (!groups.length) { hideSection("skills"); return; }
    $("#skill-list").innerHTML = groups.map(function (g) {
      return '<div class="skill-group"><h3>' + esc(g.group) + '</h3><ul class="chips">' + chips(g.items) + "</ul></div>";
    }).join("");
  });

  /* ---------- certifications ---------- */
  safely("certifications", function () {
    var certs = list(S.certifications);
    if (!certs.length) { hideSection("certifications"); return; }
    $("#cert-list").innerHTML = certs.map(function (c) {
      return '<article class="cert"><p class="cert-meta"><b>' + esc(c.issuer) + "</b><span>" + esc(c.date) + "</span></p>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<div><ul class="chips">' + chips(c.skills) + "</ul>" + (c.extra ? '<p class="cert-extra" style="margin-top:10px">' + esc(c.extra) + "</p>" : "") + "</div>" +
        (c.file ? '<a class="link-out" href="' + esc(c.file) + '" target="_blank" rel="noopener">View certificate <span aria-hidden="true">↗</span></a>' : "") +
        "</article>";
    }).join("");
  });

  /* ---------- testimonials ---------- */
  safely("testimonials", function () {
    var quotes = list(S.testimonials).filter(function (q) { return q && q.quote; });
    if (!quotes.length) return;
    $("#quote-list").innerHTML = quotes.map(function (q) {
      return '<figure class="quote"><blockquote>“' + esc(q.quote) + '”</blockquote><figcaption><b>' + esc(q.name) + "</b>" + esc(q.title) + "</figcaption></figure>";
    }).join("");
    document.getElementById("testimonials").hidden = false;
  });

  /* ---------- contact + footer ---------- */
  safely("contact", function () {
    var actions = [];
    if (S.email) {
      $("#email-text").textContent = S.email;
      actions.push('<a class="btn btn-light" href="mailto:' + esc(S.email) + '">Email me</a>');
    } else { $(".email-row").hidden = true; }
    if (S.linkedin) actions.push('<a class="btn btn-ghost-light" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>');
    if (S.phone) actions.push('<a class="btn btn-ghost-light" href="tel:' + esc(String(S.phone).replace(/[^+\d]/g, "")) + '">Call ' + esc(S.phone) + "</a>");
    $("#contact-actions").innerHTML = actions.join("");
    $("#contact-meta").textContent = S.location ? "Based in " + S.location : "";

    var photo = $("#contact-photo");
    if (S.photoStanding) { photo.src = S.photoStanding; photo.alt = ""; } else { photo.hidden = true; }

    $("#copy-email").addEventListener("click", function () {
      var btn = this;
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy email"; }, 2000); };
      var fallback = function () {
        var range = document.createRange();
        range.selectNodeContents($("#email-text"));
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        btn.textContent = "Selected, press copy";
        setTimeout(function () { btn.textContent = "Copy email"; }, 2500);
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(S.email).then(done, fallback);
        else fallback();
      } catch (e) { fallback(); }
    });

    $("#foot-copy").textContent = "© " + new Date().getFullYear() + " " + (S.name || "") + (S.location ? " · " + S.location : "");
  });

  /* ---------- playground: time value of money ---------- */
  safely("playground", function () {
    var pg = S.playground || {};
    if (pg.show === false) { hideSection("playground"); return; }
    $("#tvm-title").textContent = pg.title || "Money has a time value";
    $("#tvm-text").textContent = pg.text || "";

    var amount = $("#tvm-amount"), rate = $("#tvm-rate"), years = $("#tvm-years");
    var mode = "fv";

    function inr(x) { return "₹" + Math.round(x).toLocaleString("en-IN"); }
    function short(x) {
      if (x >= 1e7) return (x / 1e7).toFixed(x >= 1e8 ? 0 : 1).replace(/\.0$/, "") + " Cr";
      if (x >= 1e5) return (x / 1e5).toFixed(x >= 1e6 ? 0 : 1).replace(/\.0$/, "") + " L";
      if (x >= 1e3) return Math.round(x / 1e3) + "K";
      return String(Math.round(x));
    }
    function niceStep(raw) {
      var p = Math.pow(10, Math.floor(Math.log10(raw)));
      var f = raw / p;
      var n = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
      return n * p;
    }
    function fill(input) {
      var pct = (input.value - input.min) / (input.max - input.min) * 100;
      input.style.setProperty("--fill", pct + "%");
    }

    function draw(base, r, n) {
      // base = the amount at year 0; bars show base + growth for every year
      var box = document.querySelector(".chart-box");
      var W = Math.max(300, Math.round((box && box.clientWidth) || 560));
      var H = W < 440 ? 200 : 220, L = 48, R = 8, T = 10, B = 26;
      $("#tvm-chart").setAttribute("viewBox", "0 0 " + W + " " + H);
      var values = [];
      for (var t = 0; t <= n; t++) values.push(base * Math.pow(1 + r, t));
      var max = values[values.length - 1];
      var step = niceStep(max / 4);
      var top = Math.ceil(max / step) * step;
      var y = function (v) { return T + (H - T - B) * (1 - v / top); };
      var slot = (W - L - R) / values.length;
      var bw = Math.max(3, slot * 0.68);
      var svg = "";
      for (var g = 0; g <= top + step / 2; g += step) {
        svg += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g).toFixed(1) + '" y2="' + y(g).toFixed(1) + '"/>';
        svg += '<text x="' + (L - 8) + '" y="' + (y(g) + 4).toFixed(1) + '" text-anchor="end">' + (g === 0 ? "0" : short(g)) + "</text>";
      }
      var every = Math.ceil(values.length / Math.max(3, Math.floor((W - L) / 56)));
      values.forEach(function (v, i) {
        var x = L + slot * i + (slot - bw) / 2;
        var yb = y(base), yv = y(v);
        svg += '<rect class="bar-p" x="' + x.toFixed(1) + '" y="' + yb.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (y(0) - yb).toFixed(1) + '" rx="2"/>';
        if (v - base > 0) svg += '<rect class="bar-g" x="' + x.toFixed(1) + '" y="' + yv.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(0, yb - yv).toFixed(1) + '" rx="2"/>';
        if (i % every === 0 || i === values.length - 1) {
          if (i === values.length - 1 || values.length - 1 - i >= every / 2) {
            svg += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + (i === 0 ? "Now" : "Y" + i) + "</text>";
          }
        }
      });
      $("#tvm-chart").innerHTML = svg;
    }

    function update() {
      var a = Number(amount.value), r = Number(rate.value) / 100, n = Number(years.value);
      [amount, rate, years].forEach(fill);
      $("#amount-out").textContent = inr(a);
      $("#rate-out").textContent = rate.value + "%";
      $("#years-out").textContent = n + (n === 1 ? " year" : " years");
      var doubling = (72 / Number(rate.value));
      var dbl = doubling >= 10 ? Math.round(doubling) : doubling.toFixed(1).replace(/\.0$/, "");
      if (mode === "fv") {
        var fv = a * Math.pow(1 + r, n);
        $("#amount-label").textContent = "Amount today";
        $("#result-kicker").textContent = "Grows to";
        $("#result-big").textContent = inr(fv);
        $("#result-note").textContent = inr(a) + " invested at " + rate.value + "% a year grows to " + inr(fv) + " in " + n + (n === 1 ? " year" : " years") +
          ", a gain of " + inr(fv - a) + ". By the Rule of 72, money at this rate doubles about every " + dbl + " years.";
        $("#legend-p").textContent = "Amount invested";
        $("#legend-g").textContent = "Growth";
        draw(a, r, n);
      } else {
        var pv = a / Math.pow(1 + r, n);
        $("#amount-label").textContent = "Amount in the future";
        $("#result-kicker").textContent = "Worth today";
        $("#result-big").textContent = inr(pv);
        $("#result-note").textContent = inr(a) + " received " + n + (n === 1 ? " year" : " years") + " from now is worth " + inr(pv) +
          " today at a " + rate.value + "% discount rate. The bars show today's value growing back to " + inr(a) + ".";
        $("#legend-p").textContent = "Value today";
        $("#legend-g").textContent = "Growth to the future amount";
        draw(pv, r, n);
      }
    }

    function setMode(m) {
      mode = m;
      $("#mode-fv").setAttribute("aria-pressed", String(m === "fv"));
      $("#mode-pv").setAttribute("aria-pressed", String(m === "pv"));
      update();
    }
    $("#mode-fv").addEventListener("click", function () { setMode("fv"); });
    $("#mode-pv").addEventListener("click", function () { setMode("pv"); });
    [amount, rate, years].forEach(function (el) { el.addEventListener("input", update); });
    var resizeTimer;
    window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(update, 150); });
    update();
  });

  /* ---------- section numbers (01, 02 …) follow what is visible ---------- */
  safely("numbers", function () {
    var n = 0;
    document.querySelectorAll(".sec").forEach(function (sec) {
      if (sec.hidden) return;
      n += 1;
      var el = sec.querySelector(".sec-num");
      if (el) el.textContent = String(n).padStart(2, "0");
    });
  });

  /* ---------- nav border on scroll ---------- */
  var nav = $(".nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
