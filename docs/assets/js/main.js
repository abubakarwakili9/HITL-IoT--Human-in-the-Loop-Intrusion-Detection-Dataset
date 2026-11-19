/* HITL-IoT research portal: behaviour. No dependencies. */
(function () {
  "use strict";
  var fmt = new Intl.NumberFormat("en-GB");
  var REPO = "abubakarwakili9/HITL-IoT-Dataset";

  /* ---- Mobile navigation ----------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    function closeNav() { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeNav(); menuBtn.focus(); }
    });
  }

  /* ---- Review-budget demo -----------------------------------------------
     Data: reference Random Forest, chronological test split (19,177 flows),
     from results/intrusion_detection/track1_benchmark_v1.1_review_revision.zip
     -> probabilities/temporal_test_probabilities_all9.csv.
     Flows are ranked by raw uncertainty 1 - 2|p - 0.5| (most uncertain first,
     ties in file order). ERRORS holds the rank of each of the 289 test errors
     (all false negatives at threshold 0.5). Selecting ceil(b*N) flows
     reproduces the paper's "RF raw uncertainty" row (8% -> 41 of 289). */
  var N = 19177;
  var ERRORS = [1,126,144,181,271,349,359,389,395,405,409,439,486,606,610,650,652,724,726,775,794,892,922,932,950,973,1008,1028,1097,1099,1112,1140,1172,1223,1301,1306,1361,1377,1491,1504,1521,1641,1644,1693,1785,1876,1879,1888,1953,1975,1976,2000,2009,2013,2024,2041,2066,2072,2081,2151,2183,2192,2225,2238,2245,2275,2384,2405,2437,2440,2458,2529,2562,2587,2617,2659,2688,2702,2733,2743,2759,2762,2777,2806,2821,2847,2855,2857,2861,3056,3071,3102,3164,3178,3214,3234,3256,3268,3357,3387,3401,3484,3485,3576,3626,3630,3699,3701,3705,3711,3768,3782,3835,3840,3844,3846,3858,3877,3904,3936,4041,4065,4108,4129,4155,4200,4241,4293,4346,4378,4386,4453,4496,4546,4577,4598,4625,4697,4722,4723,4792,4851,4855,4868,4916,4957,4958,4973,5107,5118,5138,5144,5199,5217,5260,5265,5277,5292,5450,5472,5523,5564,5629,5657,5731,5746,5897,6050,6069,6117,6170,6242,6278,6351,6369,6396,6410,6484,6513,6589,6612,6673,6688,6721,6769,6773,6840,6846,6896,6962,6988,6998,7036,7094,7126,7146,7167,7185,7258,7279,7311,7351,7368,7369,7395,7443,7473,7476,7515,7549,7561,7572,7726,7834,7950,7960,8001,8025,8126,8251,8274,8293,8408,8465,8552,8555,8587,8615,8663,8685,8749,8869,8902,9068,9145,9209,9231,9262,9286,9342,9397,9417,9429,9509,9526,9613,9786,9804,9998,10034,10036,10071,10128,10169,10200,10231,10288,10350,10444,10493,10557,10784,10799,10943,10979,11058,11095,11145,11203,11293,11305,11490,11665,11789,11978,11984,12037,12145,12333,12523,12679,12728,12747,13012,13436,13633,14307,14788,15506];

  var canvas = document.getElementById("strip");
  var slider = document.getElementById("budget");
  var out = document.getElementById("budget-out");
  var rDeferred = document.getElementById("r-deferred");
  var rCaught = document.getElementById("r-caught");
  var rShare = document.getElementById("r-share");
  var css = getComputedStyle(document.documentElement);
  function tok(name, fb) { return (css.getPropertyValue(name) || "").trim() || fb; }
  var C = {
    base: tok("--teal-soft", "#DDF6F2"),
    sel: tok("--gold", "#F4C76A"),
    miss: tok("--miss", "#C2410C"),
    edge: tok("--navy", "#173D70")
  };

  function selectedErrors(k) {
    var c = 0;
    for (var i = 0; i < ERRORS.length; i++) { if (ERRORS[i] < k) c++; else break; }
    return c;
  }

  function draw(k) {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = C.base; ctx.fillRect(0, 0, w, h);
    var xk = (k / N) * w;
    ctx.fillStyle = C.sel; ctx.globalAlpha = 0.7; ctx.fillRect(0, 0, xk, h); ctx.globalAlpha = 1;
    ctx.fillStyle = C.miss;
    var tick = Math.max(1, 1.2 * (w / 900));
    for (var i = 0; i < ERRORS.length; i++) {
      ctx.globalAlpha = ERRORS[i] < k ? 1 : 0.75;
      ctx.fillRect((ERRORS[i] / N) * w, h * 0.16, tick, h * 0.68);
    }
    ctx.globalAlpha = 1;
    if (k > 0) { ctx.fillStyle = C.edge; ctx.fillRect(Math.min(xk, w - 2), 0, 2, h); }
  }

  function update() {
    var pct = Number(slider.value);
    var k = Math.ceil((pct / 100) * N);
    var c = selectedErrors(k);
    out.textContent = pct + "%";
    slider.style.setProperty("--fill", (pct / Number(slider.max)) * 100 + "%");
    slider.setAttribute("aria-valuetext", pct + "% of flows, " + fmt.format(k) + " flows, " + c + " of " + ERRORS.length + " errors selected");
    rDeferred.textContent = fmt.format(k);
    rCaught.innerHTML = '<span class="hl">' + c + "</span> of " + ERRORS.length;
    rShare.textContent = (100 * c / ERRORS.length).toFixed(1) + "%";
    draw(k);
  }
  if (canvas && slider) {
    slider.addEventListener("input", update);
    var raf;
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
    update();
  }

  /* ---- Benchmark table (Table 7, chronological test split) ---------------
     Re-scored from released probabilities with benchmark/score_track1_submission.py;
     all values match the manuscript to four decimals. FPR in percent. */
  var RESULTS = [
    ["Random Forest", 0.9688, 0.9395, 0.9690, 0.000, true],
    ["Voting ensemble", 0.9684, 0.9386, 0.9703, 0.000],
    ["LightGBM", 0.9682, 0.9384, 0.9696, 0.006],
    ["XGBoost", 0.9677, 0.9373, 0.9700, 0.000],
    ["LSTM", 0.9629, 0.9284, 0.9684, 0.018],
    ["1D-CNN", 0.9624, 0.9275, 0.9676, 0.000],
    ["MLP", 0.9584, 0.9197, 0.9647, 0.061],
    ["SVM (RBF)", 0.9428, 0.8875, 0.9477, 0.692],
    ["Logistic regression", 0.9239, 0.8577, 0.9415, 0.043]
  ];
  var body = document.getElementById("results-body");
  if (body) {
    body.innerHTML = RESULTS.map(function (r) {
      var pct = Math.max(0, Math.min(100, ((r[1] - 0.9) / 0.1) * 100));
      return "<tr" + (r[5] ? ' class="ref"' : "") + '><th scope="row">' + r[0] +
        (r[5] ? '<span class="ref-tag">Reference</span>' : "") + "</th>" +
        '<td><div class="bar"><span>' + r[1].toFixed(4) + '</span><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + pct.toFixed(1) + '%"></span></span></div></td>' +
        '<td class="num">' + r[2].toFixed(4) + '</td><td class="num">' + r[3].toFixed(4) + '</td><td class="num">' + r[4].toFixed(3) + "%</td></tr>";
    }).join("");
  }

  /* ---- Attack families (counts from HITL-IoT_summary_v1.1.json) ---------- */
  var GROUPS = [
    ["Command and control", [["Botnet communication", 3442], ["Remote administration", 1602], ["Device hijacking", 1523]]],
    ["Reconnaissance", [["Port scanning", 2681], ["Network mapping", 1507], ["Service enumeration", 1205]]],
    ["Data movement", [["DNS tunnelling", 2395], ["Bulk data transfer", 1301], ["Credential harvesting", 809]]],
    ["Device manipulation", [["Protocol abuse", 1380], ["Configuration tampering", 745], ["Firmware exploitation", 587]]]
  ];
  var bars = document.getElementById("attack-bars");
  if (bars) {
    bars.innerHTML = GROUPS.map(function (g, gi) {
      var total = g[1].reduce(function (a, f) { return a + f[1]; }, 0);
      return '<div class="ag" data-g="' + (gi + 1) + '"><h4>' + g[0] + " (" + fmt.format(total) + ")</h4>" +
        g[1].map(function (f) {
          return '<div class="ab"><span>' + f[0] + '</span><span class="t" style="width:' + (100 * f[1] / 3442).toFixed(1) + '%"></span><span class="n">' + fmt.format(f[1]) + "</span></div>";
        }).join("") + "</div>";
    }).join("");
  }

  /* ---- Feature dictionary (docs/assets/data/schema_v1.1.json, ~11 kB) ---- */
  var dictBody = document.getElementById("dict-body");
  if (dictBody) {
    var q = document.getElementById("dict-q"), cat = document.getElementById("dict-cat"),
        ids = document.getElementById("dict-ids"), count = document.getElementById("dict-count");
    var LABELS = {
      generated_flow_evidence: "Flow evidence", contextual_feature: "Contextual", historical_feature: "Historical",
      identifier: "Identifier", generated_oversight_metadata: "Oversight metadata",
      benchmark_construction_variable: "Construction variable", target_label: "Target label"
    };
    var rows = [];
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function render() {
      var term = q.value.trim().toLowerCase(), c = cat.value, only = ids.checked;
      var shown = rows.filter(function (r) {
        return (!c || r.c === c) && (!only || r.ids) &&
          (!term || (r.f + " " + r.d + " " + (LABELS[r.c] || r.c)).toLowerCase().indexOf(term) !== -1);
      });
      dictBody.innerHTML = shown.length ? shown.map(function (r) {
        return "<tr><td>" + esc(r.f) + "</td><td>" + esc(LABELS[r.c] || r.c) + "</td><td>" + esc(r.t) + (r.u ? " (" + esc(r.u) + ")" : "") +
          "</td><td>" + esc(r.d) + '</td><td class="' + (r.ids ? "yes" : "no") + '">' + (r.ids ? "Yes" : "No") + "</td></tr>";
      }).join("") : '<tr><td colspan="5">No columns match. Clear the search or filters.</td></tr>';
      count.textContent = shown.length + " of " + rows.length + " columns";
    }
    fetch("assets/data/schema_v1.1.json").then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.json();
    }).then(function (data) {
      rows = data;
      Object.keys(LABELS).forEach(function (k) {
        if (rows.some(function (r) { return r.c === k; })) {
          var o = document.createElement("option"); o.value = k; o.textContent = LABELS[k]; cat.appendChild(o);
        }
      });
      [q, cat, ids].forEach(function (el) { el.addEventListener("input", render); el.addEventListener("change", render); });
      render();
    }).catch(function () {
      dictBody.innerHTML = '<tr><td colspan="5">The dictionary could not be loaded. See <a href="https://github.com/' + REPO + '/blob/main/data/v1.1/metadata/HITL-IoT_schema_v1.1.csv">HITL-IoT_schema_v1.1.csv</a> on GitHub.</td></tr>';
    });
  }

  /* ---- Downloads ----------------------------------------------------------
     GitHub serves raw CSV files as text/plain from another origin, so a plain
     link opens them as text and the download attribute is ignored.
     raw.githubusercontent.com sends Access-Control-Allow-Origin: *, so the
     file is fetched, checked for completeness against its known size, and
     saved from a same-origin blob URL. On any failure the user is told what
     happened and pointed to the GitHub file page; nothing redirects. */
  function mb(n) { return (n / 1048576).toFixed(1); }
  document.querySelectorAll("[data-dl]").forEach(function (box) {
    var btn = box.querySelector(".dl-btn"), bar = box.querySelector(".progress"),
        fill = bar.querySelector("span"), status = box.querySelector(".dl-status");
    var file = box.getAttribute("data-file"), expected = Number(box.getAttribute("data-bytes"));
    var url = "https://raw.githubusercontent.com/" + REPO + "/main/data/v1.1/dataset/" + file;
    var page = "https://github.com/" + REPO + "/blob/main/data/v1.1/dataset/" + file;
    var label = btn.innerHTML, busy = false;

    function setStatus(text, cls) { status.className = "dl-status" + (cls ? " " + cls : ""); status.innerHTML = text; }
    function finish() { busy = false; btn.removeAttribute("aria-busy"); btn.disabled = false; btn.innerHTML = label; }
    function fail(reason) {
      finish(); bar.hidden = true;
      setStatus("Download did not complete (" + reason + "). Open the <a href=\"" + page + "\">GitHub file page</a> and choose <strong>Download raw file</strong>.", "err");
    }

    btn.addEventListener("click", function () {
      if (busy) return;
      if (!window.fetch || !window.ReadableStream || !window.Blob || !window.URL) { fail("this browser cannot save files from this page"); return; }
      busy = true; btn.disabled = true; btn.setAttribute("aria-busy", "true");
      btn.textContent = "Downloading…"; bar.hidden = false; fill.style.width = "0%";
      setStatus("Starting download of " + mb(expected) + " MB…");
      fetch(url, { cache: "no-store" }).then(function (res) {
        if (!res.ok) throw new Error("server returned " + res.status);
        var total = Number(res.headers.get("content-length")) || expected;
        var reader = res.body.getReader(), chunks = [], got = 0;
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            chunks.push(r.value); got += r.value.length;
            var p = Math.min(100, (100 * got) / total);
            fill.style.width = p.toFixed(1) + "%";
            setStatus("Downloaded " + mb(got) + " of " + mb(total) + " MB (" + Math.floor(p) + "%)");
            return pump();
          });
        }
        return pump().then(function () {
          if (got !== expected) throw new Error("received " + fmt.format(got) + " of " + fmt.format(expected) + " bytes");
          return new Blob(chunks, { type: "text/csv" });
        });
      }).then(function (blob) {
        var href = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = href; a.download = file; a.style.display = "none";
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(href); }, 60000);
        finish(); fill.style.width = "100%";
        setStatus("Complete: all " + fmt.format(expected) + " bytes received and handed to your browser to save as " + file + ".", "ok");
      }).catch(function (err) {
        fail(err && err.message ? err.message : "network or browser error");
      });
    });
  });

  /* ---- Copy buttons and BibTeX download ------------------------------------ */
  function activeCite() { return document.querySelector('.cite-box [role="tabpanel"]:not([hidden])'); }
  function copyText(text, btn) {
    var label = btn.textContent;
    var done = function () { btn.textContent = "Copied"; btn.dataset.state = "done"; setTimeout(function () { btn.textContent = label; delete btn.dataset.state; }, 1600); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, function () {}); return; }
    var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "absolute"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {} document.body.removeChild(ta);
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy");
      var el = id === "active-cite" ? activeCite() : document.getElementById(id);
      if (el) copyText(el.textContent, btn);
    });
  });
  var bibBtn = document.querySelector("[data-bib]");
  if (bibBtn) {
    bibBtn.addEventListener("click", function () {
      var text = Array.prototype.map.call(document.querySelectorAll('.cite-box [role="tabpanel"]'), function (p) { return p.textContent; }).join("\n\n") + "\n";
      var href = URL.createObjectURL(new Blob([text], { type: "application/x-bibtex" }));
      var a = document.createElement("a"); a.href = href; a.download = "HITL-IoT.bib";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(href); }, 10000);
    });
  }

  /* ---- Citation tabs (arrow keys) ---------------------------------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t, false); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault(); select(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length], true);
      }
    });
  });

  /* ---- Highlight the section in view -------------------------------------- */
  var links = document.querySelectorAll('.nav a[href^="#"]:not([href="#download"])');
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove("is-current"); a.removeAttribute("aria-current"); });
          map[en.target.id].classList.add("is-current"); map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
