/* HITL-IoT website behaviour. No dependencies. */
(function () {
  "use strict";

  /* ---- Review-budget strip --------------------------------------------
     Data: Random Forest, chronological test split (19,177 flows), from
     results/intrusion_detection/track1_benchmark_v1.1_review_revision.zip
     → probabilities/temporal_test_probabilities_all9.csv.
     Flows are ranked by raw uncertainty 1 − 2|p − 0.5| (most uncertain first,
     ties by file order). ERRORS holds the rank of each of the 289 test errors
     (all false negatives at threshold 0.5). Reviewing ceil(b·N) flows
     reproduces the paper's "RF raw uncertainty" row (e.g. 8% → 41 of 289). */
  var N = 19177;
  var ERRORS = [1,126,144,181,271,349,359,389,395,405,409,439,486,606,610,650,652,724,726,775,794,892,922,932,950,973,1008,1028,1097,1099,1112,1140,1172,1223,1301,1306,1361,1377,1491,1504,1521,1641,1644,1693,1785,1876,1879,1888,1953,1975,1976,2000,2009,2013,2024,2041,2066,2072,2081,2151,2183,2192,2225,2238,2245,2275,2384,2405,2437,2440,2458,2529,2562,2587,2617,2659,2688,2702,2733,2743,2759,2762,2777,2806,2821,2847,2855,2857,2861,3056,3071,3102,3164,3178,3214,3234,3256,3268,3357,3387,3401,3484,3485,3576,3626,3630,3699,3701,3705,3711,3768,3782,3835,3840,3844,3846,3858,3877,3904,3936,4041,4065,4108,4129,4155,4200,4241,4293,4346,4378,4386,4453,4496,4546,4577,4598,4625,4697,4722,4723,4792,4851,4855,4868,4916,4957,4958,4973,5107,5118,5138,5144,5199,5217,5260,5265,5277,5292,5450,5472,5523,5564,5629,5657,5731,5746,5897,6050,6069,6117,6170,6242,6278,6351,6369,6396,6410,6484,6513,6589,6612,6673,6688,6721,6769,6773,6840,6846,6896,6962,6988,6998,7036,7094,7126,7146,7167,7185,7258,7279,7311,7351,7368,7369,7395,7443,7473,7476,7515,7549,7561,7572,7726,7834,7950,7960,8001,8025,8126,8251,8274,8293,8408,8465,8552,8555,8587,8615,8663,8685,8749,8869,8902,9068,9145,9209,9231,9262,9286,9342,9397,9417,9429,9509,9526,9613,9786,9804,9998,10034,10036,10071,10128,10169,10200,10231,10288,10350,10444,10493,10557,10784,10799,10943,10979,11058,11095,11145,11203,11293,11305,11490,11665,11789,11978,11984,12037,12145,12333,12523,12679,12728,12747,13012,13436,13633,14307,14788,15506];

  var canvas = document.getElementById("strip");
  var slider = document.getElementById("budget");
  var out = document.getElementById("budget-out");
  var rDeferred = document.getElementById("r-deferred");
  var rCaught = document.getElementById("r-caught");
  var rShare = document.getElementById("r-share");
  var css = getComputedStyle(document.documentElement);
  var C = {
    accept: css.getPropertyValue("--accept-soft").trim() || "#D5E5E1",
    defer: css.getPropertyValue("--defer").trim() || "#E3A21A",
    miss: css.getPropertyValue("--miss").trim() || "#B8382A",
    edge: css.getPropertyValue("--ink").trim() || "#13201C"
  };
  var fmt = new Intl.NumberFormat("en-GB");

  function caughtFor(k) {
    var c = 0;
    for (var i = 0; i < ERRORS.length; i++) { if (ERRORS[i] < k) c++; else break; }
    return c;
  }

  function draw(k) {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = C.accept; ctx.fillRect(0, 0, w, h);
    var xk = (k / N) * w;
    ctx.fillStyle = C.defer; ctx.globalAlpha = 0.55; ctx.fillRect(0, 0, xk, h); ctx.globalAlpha = 1;
    ctx.fillStyle = C.miss;
    var tick = Math.max(1, 1.2 * (w / 900));
    for (var i = 0; i < ERRORS.length; i++) {
      var x = (ERRORS[i] / N) * w;
      ctx.globalAlpha = ERRORS[i] < k ? 1 : 0.8;
      ctx.fillRect(x, h * 0.18, tick, h * 0.64);
    }
    ctx.globalAlpha = 1;
    if (k > 0) { ctx.fillStyle = C.edge; ctx.fillRect(Math.min(xk, w - 2), 0, 2, h); }
  }

  function update() {
    var b = Number(slider.value) / 100;
    var k = Math.ceil(b * N);
    var c = caughtFor(k);
    out.textContent = slider.value + "%";
    rDeferred.textContent = fmt.format(k);
    rCaught.innerHTML = '<span class="caught">' + c + "</span> of " + ERRORS.length;
    rShare.textContent = (100 * c / ERRORS.length).toFixed(1) + "%";
    draw(k);
  }

  if (canvas && slider) {
    slider.addEventListener("input", update);
    var raf;
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
    update();
  }

  /* ---- Results table (Table 7, chronological test split) -------------- */
  var RESULTS = [
    ["Random Forest", 0.9688, 0.9395, 0.9690, true],
    ["Voting ensemble", 0.9684, 0.9386, 0.9703],
    ["LightGBM", 0.9682, 0.9384, 0.9696],
    ["XGBoost", 0.9677, 0.9373, 0.9700],
    ["LSTM", 0.9629, 0.9284, 0.9684],
    ["1D-CNN", 0.9624, 0.9275, 0.9676],
    ["MLP", 0.9584, 0.9197, 0.9647],
    ["SVM (RBF)", 0.9428, 0.8875, 0.9477],
    ["Logistic regression", 0.9239, 0.8577, 0.9415]
  ];
  var body = document.getElementById("results-body");
  if (body) {
    var lo = 0.9, hi = 1.0;
    body.innerHTML = RESULTS.map(function (r) {
      var pct = ((r[1] - lo) / (hi - lo)) * 100;
      return '<tr' + (r[4] ? ' class="best"' : "") + '><th scope="row">' + r[0] + "</th>" +
        '<td><div class="bar"><span>' + r[1].toFixed(4) + '</span><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + pct.toFixed(1) + '%"></span></span></div></td>' +
        '<td class="num">' + r[2].toFixed(4) + '</td><td class="num">' + r[3].toFixed(4) + "</td></tr>";
    }).join("");
    var cap = document.createElement("caption");
    cap.className = "sr";
    cap.textContent = "Track-1 baselines on the chronological test split; bar length shows Macro-F1 on a 0.90 to 1.00 scale.";
    body.parentNode.insertBefore(cap, body.parentNode.firstChild);
  }

  /* ---- Copy buttons ---------------------------------------------------- */
  function copyText(text, btn) {
    var done = function () {
      var label = btn.textContent; btn.textContent = "Copied"; btn.dataset.state = "done";
      setTimeout(function () { btn.textContent = label; delete btn.dataset.state; }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done); }
    else {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px"; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} document.body.removeChild(ta);
    }
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy");
      var el = id === "active-cite" ? document.querySelector('.cite [role="tabpanel"]:not([hidden])') : document.getElementById(id);
      if (el) copyText(el.textContent, btn);
    });
  });

  /* ---- Citation tabs (arrow-key navigation) ----------------------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        select(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]);
      }
    });
  });

  /* ---- Highlight the section in view ------------------------------------ */
  var links = document.querySelectorAll('.nav a[href^="#"]');
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove("is-current"); });
          map[en.target.id].classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
