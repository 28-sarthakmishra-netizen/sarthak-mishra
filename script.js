/* =====================================================================
   script.js — builds the page from content.js and runs the interactive bits.
   You don't need to edit this file to change any text.
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var mq = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduce = mq("(prefers-reduced-motion: reduce)");
  var finePointer = mq("(hover: hover) and (pointer: fine)");

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  // *word* becomes the italic accent word
  function fmt(value) { return esc(value).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }
  function list(value) { return Array.isArray(value) ? value : []; }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : undefined; }, obj);
  }
  function inr(x) { return "₹" + Math.round(Number(x) || 0).toLocaleString("en-IN"); }
  function safely(name, fn) {
    try { fn(); } catch (err) {
      if (window.console) console.warn("Section '" + name + "' could not be built:", err);
    }
  }
  function chips(items) { return list(items).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join(""); }
  function hideSection(id) {
    var el = document.getElementById(id);
    if (el) el.hidden = true;
    var link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link && link.parentElement) link.parentElement.hidden = true;
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // Animates every number inside a piece of text ("+70%", "93 → 180+", "2.5 yrs").
  function countUp(el, finalText, duration) {
    finalText = String(finalText);
    var re = /\d+(?:\.\d+)?/g, m, nums = [];
    while ((m = re.exec(finalText))) nums.push({ i: m.index, s: m[0], v: parseFloat(m[0]), d: (m[0].split(".")[1] || "").length });
    if (reduce || !nums.length) { el.textContent = finalText; return; }
    var arrow = finalText.indexOf("→");
    nums.forEach(function (n) { n.from = arrow > -1 ? (n.i < arrow ? n.v : nums[0].v) : 0; });
    var t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / duration), e = 1 - Math.pow(1 - k, 3), out = "", last = 0;
      nums.forEach(function (n) {
        out += finalText.slice(last, n.i) + (n.from + (n.v - n.from) * e).toFixed(n.d);
        last = n.i + n.s.length;
      });
      el.textContent = out + finalText.slice(last);
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Rolls a rupee amount from one value to another (keeps Indian commas right).
  function animateINR(el, from, to, duration) {
    if (reduce) { el.textContent = inr(to); return; }
    var t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / duration), e = 1 - Math.pow(1 - k, 3);
      el.textContent = inr(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
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
    $$(".hero, .sec").forEach(function (el) { el.hidden = true; });
    return;
  }

  /* ---------- simple fills (data-fill="...") ---------- */
  safely("fills", function () {
    $$("[data-fill]").forEach(function (el) {
      var key = el.getAttribute("data-fill");
      var val = get(S, key);
      if (val == null || val === "") return;
      if (key === "headline") el.innerHTML = fmt(val);
      else el.textContent = val;
    });
    if (S.name) document.title = S.name + " | " + (S.label || "Portfolio").split("·")[0].trim();
  });

  /* ---------- rotating headline word ---------- */
  safely("headline-rotate", function () {
    var words = list(S.headlineWords).filter(Boolean);
    var em = $(".headline em");
    if (!em || words.length < 2 || reduce) return;
    em.innerHTML = '<span class="rot">' + esc(em.textContent) + "</span>";
    var rot = em.firstChild;
    var i = Math.max(0, words.indexOf(rot.textContent));
    setInterval(function () {
      if (document.hidden) return;
      rot.classList.add("out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        rot.textContent = words[i];
        rot.classList.remove("out");
        rot.classList.add("pre");
        void rot.offsetWidth;
        rot.classList.remove("pre");
      }, 350);
    }, 2600);
  });

  /* ---------- hero ---------- */
  safely("hero", function () {
    var img = $("#portrait-img");
    if (S.photo) { img.src = S.photo; img.alt = "Portrait of " + (S.name || ""); }
    else { $(".portrait").hidden = true; }

    var resume = $("#resume-btn"), navResume = $("#nav-resume");
    if (S.resume) { resume.href = S.resume; navResume.href = S.resume; }
    else { resume.hidden = true; navResume.parentElement.hidden = true; }

    var li = $("#hero-linkedin");
    if (S.linkedin) li.href = S.linkedin; else li.hidden = true;

    var roles = list(S.targetRoles);
    if (roles.length) $("#target-roles").innerHTML = chips(roles); else $("#targets").hidden = true;

    var icon = {
      mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
      pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'
    };
    var bits = [];
    if (S.email) bits.push("<span>" + icon.mail + '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></span>");
    if (S.phone) bits.push("<span>" + icon.phone + '<a href="tel:' + esc(String(S.phone).replace(/[^+\d]/g, "")) + '">' + esc(S.phone) + "</a></span>");
    if (S.location) bits.push("<span>" + icon.pin + esc(S.location) + "</span>");
    $("#hero-contact").innerHTML = bits.join("");
    if (!bits.length) $("#hero-contact").hidden = true;

    var stats = list(S.stats);
    $("#stats").innerHTML = stats.map(function (s) {
      return '<li class="stat"><span class="stat-value">' + esc(s.value) + '</span><span class="stat-label">' + esc(s.label) + "</span></li>";
    }).join("");
    if (!stats.length) $("#stats").hidden = true;
    $$(".stat-value").forEach(function (el, i) {
      setTimeout(function () { countUp(el, stats[i].value, 1400); }, 250 + i * 150);
    });

    var up = $("#qc-up");
    if (stats[0] && stats[0].value) {
      var upText = "▲ " + String(stats[0].value).replace(/^\+/, "");
      up.textContent = upText;
      setTimeout(function () { countUp(up, upText, 1400); }, 250);
    }

    var items = list(S.ticker);
    if (!items.length) { $(".ticker").hidden = true; return; }
    var make = function (cls) {
      return items.map(function (t) {
        return '<span class="ticker-item' + cls + '">' + esc(t).replace(/(▲[^◆]*)$/, '<span class="up">$1</span>') + "</span>";
      }).join("");
    };
    $("#ticker").innerHTML = make("") + make(" dup");
  });

  /* ---------- floating finance terms around the portrait ---------- */
  safely("glyphs", function () {
    var terms = list(S.floatingTerms).slice(0, 10);
    var holder = $("#glyphs");
    if (!holder || !terms.length || $(".portrait").hidden) return;
    // positions in % of the portrait box, kept away from the face and the quote card
    var spots = [[5, 16], [95, 9], [97, 40], [4, 46], [95, 68], [74, 2], [24, 4], [5, 70], [90, 90], [52, 0]];
    holder.innerHTML = terms.map(function (t, i) {
      var p = spots[i % spots.length];
      var cls = "glyph" + (String(t).length <= 2 ? " g-sym" : "") + (i % 4 === 1 ? " g-dark" : "");
      var style = "--x:" + p[0] + "%;--y:" + p[1] + "%;--d:" + (10 + (i * 7) % 22) + ";--dur:" + (5 + (i % 4)) + "s;--delay:-" + (i * 0.7).toFixed(1) + "s";
      return '<span class="' + cls + '" style="' + style + '"><span>' + esc(t) + "</span></span>";
    }).join("");
  });

  /* ---------- portrait tilt + parallax (mouse only) ---------- */
  safely("portrait-motion", function () {
    if (reduce || !finePointer) return;
    var hero = $(".hero"), fig = $("#portrait"), arch = $("#portrait-arch");
    if (!hero || !fig || !arch) return;
    var raf = null, last = null;
    hero.addEventListener("pointermove", function (e) {
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = fig.getBoundingClientRect();
        var x = Math.max(-1, Math.min(1, (last.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        var y = Math.max(-1, Math.min(1, (last.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        fig.style.setProperty("--px", x.toFixed(3));
        fig.style.setProperty("--py", y.toFixed(3));
        // the arch drifts a little, the photo inside a little more: a soft depth effect
        arch.style.setProperty("--shift-x", (x * -6).toFixed(1) + "px");
        arch.style.setProperty("--shift-y", (y * -5).toFixed(1) + "px");
        arch.style.setProperty("--img-x", (x * 10).toFixed(1) + "px");
        arch.style.setProperty("--img-y", (y * 4).toFixed(1) + "px");
      });
    });
    hero.addEventListener("pointerleave", function () {
      ["--px", "--py"].forEach(function (k) { fig.style.setProperty(k, "0"); });
      ["--shift-x", "--shift-y", "--img-x", "--img-y"].forEach(function (k) { arch.style.setProperty(k, "0px"); });
    });
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

  /* ---------- projects: cards with pictures, click to open ---------- */
  function sparkSVG(points) {
    return '<svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><polyline pathLength="1" points="' + points + '"/></svg>';
  }
  function visualHTML(p) {
    var bar = function (title) { return '<div class="vw-bar"><i></i><i></i><i></i><span>' + esc(title) + "</span></div>"; };
    if (p.visual === "agent") {
      var heights = [70, 82, 64, 88, 38, 76];
      return '<div class="vis vis-agent"><span class="vis-note">Illustration</span><div class="vw">' + bar(p.title) +
        '<div class="vw-body va"><div class="va-chat">' +
          '<p class="bub me">Why did sales slow down this quarter?</p>' +
          '<p class="bub ai typing"><span></span><span></span><span></span></p>' +
          '<div class="bub ai ans"><b>Diagnosis</b><span class="sk"></span><span class="sk"></span>' +
            '<span class="va-tags"><em>Key issue found</em><em>Channels</em><em>Pricing</em></span></div>' +
        '</div><div class="va-chart">' +
          heights.map(function (h, i) { return '<span style="--h:' + h + "%;--i:" + i + '"' + (i === 4 ? ' class="flag"' : "") + "></span>"; }).join("") +
        "</div></div></div></div>";
    }
    if (p.visual === "dashboard") {
      return '<div class="vis vis-dash"><span class="vis-note">Illustration</span><div class="vw">' + bar(p.title) +
        '<div class="vw-body vd"><div class="vd-kpis">' +
          "<div><small>Revenue</small>" + sparkSVG("0,24 20,20 40,22 60,14 80,10 100,4") + "</div>" +
          "<div><small>Margin</small>" + sparkSVG("0,12 20,16 40,10 60,18 80,14 100,12") + "</div>" +
          "<div><small>ROE</small>" + sparkSVG("0,22 20,18 40,20 60,12 80,14 100,6") + "</div>" +
        '</div><svg class="vd-line" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">' +
          '<polygon points="0,100 0,82 40,74 80,78 120,60 160,64 200,44 240,40 300,18 300,100"/>' +
          '<polyline pathLength="1" points="0,82 40,74 80,78 120,60 160,64 200,44 240,40 300,18"/>' +
        "</svg></div></div></div>";
    }
    if (p.visual === "search") {
      var tags = [["Vacant", ""], ["Ventilator", "warn"], ["Vacant", ""]];
      return '<div class="vis vis-search"><span class="vis-note">Illustration</span><div class="vw">' + bar(p.title) +
        '<div class="vw-body vs"><div class="vs-input"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>' +
          '<span class="vs-typed">ICU beds, South Delhi</span></div><ul class="vs-rows">' +
          tags.map(function (t, i) { return '<li style="--i:' + i + '"><span class="sk"></span><em class="' + t[1] + '">' + t[0] + "</em></li>"; }).join("") +
        "</ul></div></div></div>";
    }
    return "";
  }
  function mediaHTML(p, i, eager) {
    if (p.image) return '<img src="' + esc(p.image) + '" alt="Screenshot of ' + esc(p.title) + '"' + (eager ? "" : ' loading="lazy"') + ">";
    var vis = visualHTML(p);
    if (vis) return vis;
    return '<div class="cover cover-' + (i % 3) + '"><span class="cover-num">P/' + String(i + 1).padStart(2, "0") + '</span><span class="cover-title">' +
      esc(p.title) + '</span><span class="cover-kind">' + esc(p.kind) + "</span></div>";
  }

  var openProject = null;
  safely("projects", function () {
    var projects = list(S.projects);
    if (!projects.length) { hideSection("projects"); return; }
    var holder = $("#project-list");
    holder.innerHTML = projects.map(function (p, i) {
      var num = String(i + 1).padStart(2, "0");
      return '<article class="project">' +
        '<button type="button" class="project-open" data-i="' + i + '" aria-haspopup="dialog" aria-label="Open project: ' + esc(p.title) + '"></button>' +
        '<div class="project-media">' + mediaHTML(p, i) + '<span class="media-cta" aria-hidden="true">View project</span></div>' +
        '<div class="project-top"><div class="project-meta"><span class="pid">P/' + num + "</span><span>" + esc(p.kind) + "</span></div>" +
        "<h3>" + esc(p.title) + '</h3><p class="project-sum">' + fmt(p.summary) + "</p>" +
        (p.role ? '<p class="project-role"><b>My role:</b> ' + esc(p.role) + (p.contribution ? " · " + esc(p.contribution) : "") + "</p>" : "") +
        (list(p.tags).length ? '<ul class="chips">' + chips(p.tags) + "</ul>" : "") + "</div>" +
        '<div class="project-foot" aria-hidden="true"><span>View details</span><span class="arrow">→</span></div></article>';
    }).join("");
    // 4 cards sit better as 2 × 2 than 3 + 1
    if (projects.length === 4 || projects.length === 1) holder.classList.add("two");

    /* the pop-up */
    var dlg = $("#project-dialog"), cur = 0, opener = null;
    var root = document.documentElement;
    function fill(i) {
      cur = (i + projects.length) % projects.length;
      var p = projects[cur], num = String(cur + 1).padStart(2, "0");
      $("#pd-media").innerHTML = mediaHTML(p, cur, true);
      $("#pd-meta").innerHTML = '<span class="pid">P/' + num + "</span> · " + esc(p.kind);
      $("#pd-title").textContent = p.title || "";
      $("#pd-sum").innerHTML = fmt(p.summary);
      var roleLine = p.role ? '<p class="ppo-role"><b>My role:</b> ' + esc(p.role) + "." + (p.contribution ? " <b>My contribution:</b> " + esc(p.contribution) : "") + "</p>" : "";
      var cols = [
        ["Purpose", p.purpose, p.purposeLink, p.purposeLabel || "View brief"],
        ["Process", p.process, p.processLink, p.processLabel || "View the work"],
        ["Outcome", p.outcome, p.outcomeLink, p.outcomeLabel || "View result"]
      ];
      var hasPPO = cols.some(function (c) { return c[1]; });
      $("#pd-ppo").innerHTML = hasPPO ? cols.map(function (c) {
        var body = (c[0] === "Process" ? roleLine : "") + (c[1] ? "<p>" + fmt(c[1]) + "</p>" : "");
        if (!body) return "";
        return '<div class="ppo-col"><h4>' + c[0] + "</h4><div>" + body + "</div>" +
          (c[2] ? '<a class="link-out" href="' + esc(c[2]) + '" target="_blank" rel="noopener">' + esc(c[3]) + ' <span aria-hidden="true">↗</span></a>' : "<span></span>") + "</div>";
      }).join("") : "";
      $("#pd-ppo").hidden = !hasPPO;
      // older content.js format: plain bullet points
      $("#pd-points").innerHTML = hasPPO ? "" : list(p.details).map(function (d) { return "<li>" + fmt(d) + "</li>"; }).join("");
      $("#pd-tags").innerHTML = chips(p.tags);
      var link = $("#pd-link");
      if (p.link) {
        link.href = p.link;
        link.innerHTML = esc(p.linkLabel || "Open project") + ' <span aria-hidden="true">↗</span>';
        link.hidden = false;
      } else { link.hidden = true; }
      $("#pd-note").textContent = p.note || "";
      $("#pd-note").hidden = !p.note;
      $("#pd-count").textContent = (cur + 1) + " / " + projects.length;
      var nav = projects.length > 1;
      $("#pd-prev").hidden = !nav; $("#pd-next").hidden = !nav; $("#pd-count").hidden = !nav;
      var inner = dlg.querySelector(".pd-inner"); if (inner) inner.scrollTop = 0;
    }
    function open(i, from) {
      fill(i);
      opener = from || null;
      if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
      else dlg.setAttribute("open", "");
      root.classList.add("modal-open");
    }
    function close() {
      if (typeof dlg.close === "function") dlg.close(); else { dlg.removeAttribute("open"); onClose(); }
    }
    function onClose() {
      root.classList.remove("modal-open");
      $("#pd-media").innerHTML = "";
      if (opener) { try { opener.focus({ preventScroll: true }); } catch (e) { opener.focus(); } }
    }
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    $("#pd-close").addEventListener("click", close);
    $("#pd-prev").addEventListener("click", function () { fill(cur - 1); });
    $("#pd-next").addEventListener("click", function () { fill(cur + 1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); fill(cur + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); fill(cur - 1); }
    });
    $$(".project-open").forEach(function (btn) {
      btn.addEventListener("click", function () { open(Number(btn.getAttribute("data-i")), btn); });
    });
    openProject = open;

    /* spotlight + tilt (mouse only) */
    if (!finePointer || reduce) return;
    $$(".project").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        card.style.setProperty("--tx", ((x - 0.5) * 5).toFixed(2) + "deg");
        card.style.setProperty("--ty", ((0.5 - y) * 4).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--tx", "0deg");
        card.style.setProperty("--ty", "0deg");
      });
    });
  });

  /* ---------- skills & tools (kept separate) ---------- */
  safely("skills", function () {
    var skills = list(S.skills), tools = list(S.tools);
    if (!skills.length && !tools.length) { hideSection("skills"); return; }
    var projects = list(S.projects), jobs = list(S.experience);
    function where(text) {
      if (!text) return "";
      var pi = -1;
      projects.forEach(function (p, i) { if (p.title && p.title === text) pi = i; });
      if (pi > -1) return 'Used in <a href="#projects" data-open-project="' + pi + '">' + esc(text) + "</a>";
      var isJob = jobs.some(function (j) { return j.company === text; });
      if (isJob) return 'Used at <a href="#experience">' + esc(text) + "</a>";
      return "Shown in " + esc(text);
    }
    function levelClass(l) { l = String(l || "").toLowerCase(); return l.indexOf("advanced") > -1 ? "l-advanced" : l.indexOf("working") > -1 ? "l-working" : "l-found"; }
    // older content.js format: skills as groups of names
    if (skills.length && skills[0] && skills[0].items) {
      skills = skills.reduce(function (all, g) { return all.concat(list(g.items).map(function (n) { return { name: n }; })); }, []);
    }
    $("#skill-list").innerHTML = skills.map(function (k) {
      return '<li><span class="st-name">' + esc(k.name) + "</span>" + (k.level ? '<span class="st-level ' + levelClass(k.level) + '">' + esc(k.level) + "</span>" : "<span></span>") +
        (k.shownIn ? '<span class="st-where">' + where(k.shownIn) + "</span>" : "") + "</li>";
    }).join("");
    if (tools.length) {
      $("#tool-list").innerHTML = tools.map(function (t) {
        return '<li><span class="st-name">' + esc(t.name) + "</span><span></span>" + (t.shownIn ? '<span class="st-where">' + where(t.shownIn) + "</span>" : "") + "</li>";
      }).join("");
    } else { $("#tools-col").hidden = true; }
  });

  /* ---------- certifications ---------- */
  safely("certifications", function () {
    var certs = list(S.certifications);
    if (!certs.length) { hideSection("certifications"); return; }
    $("#cert-list").innerHTML = certs.map(function (c) {
      return '<article class="cert"><p class="cert-meta"><b>' + esc(c.issuer) + "</b><span>" + esc(c.date) + "</span></p>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<div><ul class="chips">' + chips(c.skills) + "</ul>" + (c.extra ? '<p class="cert-extra" style="margin-top:10px">' + esc(c.extra) + "</p>" : "") + "</div>" +
        '<div class="cert-actions">' +
          (c.file ? '<a class="link-out" href="' + esc(c.file) + '" target="_blank" rel="noopener">View certificate <span aria-hidden="true">↗</span></a>' : "") +
          (c.verify ? '<a class="link-out" href="' + esc(c.verify) + '" target="_blank" rel="noopener">Verify on ' + esc(c.issuer || "issuer site") + ' <span aria-hidden="true">↗</span></a>' : "") +
        "</div>" +
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

  /* ---------- playground: time value of money calculator ---------- */
  var tvmUpdate = null;
  safely("calculator", function () {
    var pg = S.playground || {};
    if (pg.show === false) return;
    $("#tvm-title").textContent = pg.title || "Money has a time value";
    $("#tvm-text").textContent = pg.text || "";

    var amount = $("#tvm-amount"), rate = $("#tvm-rate"), years = $("#tvm-years");
    var mode = "fv";

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
      var doubling = 72 / Number(rate.value);
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
    tvmUpdate = update;
  });

  /* ---------- playground: balance sheet game ---------- */
  var gameReady = false;
  safely("game", function () {
    var G = S.game || {};
    var items = list(G.items).filter(function (it) { return it && it.name && /^(Asset|Liability|Equity)$/.test(it.side); });
    if (G.show === false || !items.length) return;
    gameReady = true;

    $("#game-title").textContent = G.title || "Make the balance sheet balance";
    $("#game-text").textContent = G.text || "";

    var panel = $("#panel-game"), card = $("#g-card"), fb = $("#g-feedback");
    var buckets = $$(".bucket");
    var labels = { Asset: "an Asset", Liability: "a Liability", Equity: "Equity" };
    var order, idx, score, totals, t0, timer, busy, done;

    var hint = card.querySelector(".dc-hint");
    var setHint = function () { hint.textContent = mq("(max-width: 860px)") ? "Drag me, or tap a side below ↓" : "Drag me, or tap a side →"; };
    setHint();
    window.addEventListener("resize", setHint);

    function tick() { if (t0) $("#g-time").textContent = ((performance.now() - t0) / 1000).toFixed(1) + "s"; }

    function show() {
      var it = order[idx];
      $("#g-name").textContent = it.name;
      $("#g-amt").textContent = it.amount ? inr(it.amount) : "";
      $("#g-progress").textContent = (idx + 1) + "/" + order.length;
      card.classList.remove("fly", "bad", "enter");
      card.style.transform = "";
      void card.offsetWidth;
      card.classList.add("enter");
      busy = false;
    }

    function reset() {
      order = shuffle(items.slice());
      idx = 0; score = 0; t0 = null; done = false; busy = false;
      totals = { Asset: 0, Liability: 0, Equity: 0 };
      clearInterval(timer);
      $$(".b-list").forEach(function (l) { l.innerHTML = ""; });
      $$(".b-total").forEach(function (t) { t.textContent = inr(0); });
      $("#g-score").textContent = "0";
      $("#g-time").textContent = "0.0s";
      fb.innerHTML = "";
      $("#g-end").hidden = true;
      show();
    }

    function answer(side) {
      if (busy || done) return;
      busy = true;
      if (!t0) { t0 = performance.now(); timer = setInterval(tick, 100); }
      var it = order[idx], ok = it.side === side;
      if (ok) score++;
      $("#g-score").textContent = score;
      fb.innerHTML = (ok ? '<span class="ok">Correct.</span> ' : '<span class="no">Not quite.</span> ') +
        "<b>" + esc(it.name) + "</b> is " + labels[it.side] + (it.why ? ": " + esc(it.why) : "") + ".";

      var li = document.createElement("li");
      li.className = ok ? "got" : "missed";
      li.innerHTML = "<span>" + esc(it.name) + "</span><span>" + (it.amount ? inr(it.amount) : "") + "</span>";
      document.querySelector('.b-list[data-list="' + it.side + '"]').appendChild(li);
      var before = totals[it.side];
      totals[it.side] += Number(it.amount) || 0;
      animateINR(document.querySelector('[data-total="' + it.side + '"]'), before, totals[it.side], 500);

      var b = document.querySelector('.bucket[data-side="' + side + '"]');
      b.classList.remove("flash-ok", "flash-no");
      void b.offsetWidth;
      b.classList.add(ok ? "flash-ok" : "flash-no");

      card.classList.remove("enter");
      card.classList.add(ok ? "fly" : "bad");
      idx++;
      setTimeout(function () { if (idx >= order.length) finish(); else show(); }, ok ? 320 : 560);
    }

    function finish() {
      done = true;
      clearInterval(timer);
      tick();
      var n = order.length, secs = ((performance.now() - t0) / 1000).toFixed(1), pct = score / n;
      $("#ge-score").textContent = score + "/" + n;
      $("#ge-rating").textContent = pct === 1 ? "CFO material." : pct >= 0.8 ? "Analyst ready." : pct >= 0.5 ? "Getting there." : "Back to the books.";
      var A = totals.Asset, L = totals.Liability, E = totals.Equity;
      $("#ge-balance").innerHTML = "Done in " + secs + "s.<br>Assets " + inr(A) + " = Liabilities " + inr(L) + " + Equity " + inr(E) +
        (A > 0 && A === L + E ? " <b>Balanced ✓</b>" : "");
      $("#g-end").hidden = false;
      try { $("#g-again").focus({ preventScroll: true }); } catch (e) { /* older browsers */ }
    }

    buckets.forEach(function (b) { b.addEventListener("click", function () { answer(b.getAttribute("data-side")); }); });
    $("#g-again").addEventListener("click", reset);

    // Keyboard: A / L / E while the game is on screen
    var gameVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { gameVisible = en[0].isIntersecting; }, { threshold: 0.3 }).observe(panel);
    }
    document.addEventListener("keydown", function (e) {
      if (!gameVisible || panel.hidden || e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target && e.target.tagName) || "";
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      var side = { a: "Asset", l: "Liability", e: "Equity" }[String(e.key).toLowerCase()];
      if (side) { e.preventDefault(); answer(side); }
    });

    // Drag the card onto a side of the balance sheet
    function zoneAt(x, y) {
      var found = null;
      buckets.forEach(function (b) {
        var r = b.getBoundingClientRect(), list2 = b.nextElementSibling, bottom = r.bottom;
        if (list2) bottom = Math.max(bottom, list2.getBoundingClientRect().bottom);
        if (x >= r.left && x <= r.right && y >= r.top && y <= bottom) found = b;
      });
      return found;
    }
    var drag = null;
    function clearDrag() {
      drag = null;
      card.classList.remove("dragging");
      buckets.forEach(function (b) { b.classList.remove("hover"); });
    }
    card.addEventListener("pointerdown", function (e) {
      if (busy || done || (e.pointerType === "mouse" && e.button !== 0)) return;
      drag = { x: e.clientX, y: e.clientY, moved: false };
      try { card.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    card.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.sqrt(dx * dx + dy * dy) < 6) return;
      drag.moved = true;
      card.classList.add("dragging");
      card.style.transform = "translate(" + dx + "px," + dy + "px) rotate(" + (dx / 40).toFixed(2) + "deg)";
      var over = zoneAt(e.clientX, e.clientY);
      buckets.forEach(function (b) { b.classList.toggle("hover", b === over); });
    });
    card.addEventListener("pointerup", function (e) {
      if (!drag) return;
      var moved = drag.moved;
      clearDrag();
      if (!moved) return;
      var over = zoneAt(e.clientX, e.clientY);
      card.style.transform = "";
      if (over) answer(over.getAttribute("data-side"));
    });
    card.addEventListener("pointercancel", function () { clearDrag(); card.style.transform = ""; });

    reset();
  });

  /* ---------- playground tabs ---------- */
  safely("tabs", function () {
    var tvmOn = !(S.playground && S.playground.show === false);
    var tabs = [$("#tab-game"), $("#tab-tvm")], panels = [$("#panel-game"), $("#panel-tvm")];
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", String(i === j));
        t.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      if (focus) tabs[i].focus();
      if (i === 1 && tvmUpdate) tvmUpdate();
    }
    if (!gameReady && !tvmOn) { hideSection("playground"); return; }
    if (!gameReady || !tvmOn) { $(".tabs").hidden = true; select(gameReady ? 0 : 1); return; }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select(1 - i, true); }
      });
    });
    select(0);
  });

  /* ---------- links from skills to projects, and the phone menu ---------- */
  safely("menu", function () {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("[data-open-project]") : null;
      if (a && openProject) { e.preventDefault(); openProject(Number(a.getAttribute("data-open-project")), a); }
    });
    var btn = $("#menu-btn"), menu = $("#nav-links");
    if (!btn || !menu) return;
    function setOpen(on) {
      menu.classList.toggle("open", on);
      btn.setAttribute("aria-expanded", String(on));
      btn.setAttribute("aria-label", on ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { setOpen(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); btn.focus(); } });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
  });

  /* ---------- section numbers (01, 02 …) follow what is visible ---------- */
  safely("numbers", function () {
    var n = 0;
    $$(".sec").forEach(function (sec) {
      if (sec.hidden) return;
      n += 1;
      var el = sec.querySelector(".sec-num");
      if (el) el.textContent = String(n).padStart(2, "0");
    });
  });

  /* ---------- reveal on scroll (only what starts below the fold) ---------- */
  safely("reveal", function () {
    if (reduce || !("IntersectionObserver" in window)) return;
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        el.classList.add("in");
        setTimeout(function () { el.classList.remove("reveal", "in"); el.style.removeProperty("--delay"); }, 1100);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".sec-head, .sec-sub, .about-text, .about-side .panel, .job, .project, .st-col, .cert, .tabs, .game, .quote, .contact").forEach(function (el) {
      if (el.closest("[hidden]")) return;
      if (el.getBoundingClientRect().top < vh) return;
      var pos = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--delay", (Math.min(pos, 4) * 0.08).toFixed(2) + "s");
      el.classList.add("reveal");
      io.observe(el);
    });
  });

  /* ---------- nav: border, scroll progress, active section ---------- */
  safely("nav", function () {
    var nav = $(".nav"), bar = $("#progress-bar");
    var links = $$(".nav-links a").filter(function (a) { var h = a.getAttribute("href") || ""; return h.charAt(0) === "#" && h.length > 1; });
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
    var ticking = false;
    function onScroll() {
      ticking = false;
      nav.classList.toggle("scrolled", window.scrollY > 8);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
      var mid = window.innerHeight * 0.35, current = -1;
      targets.forEach(function (s, i) {
        if (!s || s.hidden) return;
        var r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = i;
      });
      links.forEach(function (a, i) { a.classList.toggle("active", i === current); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  });
})();
