/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var ys = u(() => {
      (function () {
          if (typeof window > "u") return;
          let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
              t = e ? parseInt(e[1], 10) >= 16 : !1;
          if ("objectFit" in document.documentElement.style && !t) {
              window.objectFitPolyfill = function () {
                  return !1;
              };
              return;
          }
          let n = function (a) {
                  let c = window.getComputedStyle(a, null),
                      f = c.getPropertyValue("position"),
                      p = c.getPropertyValue("overflow"),
                      v = c.getPropertyValue("display");
                  (!f || f === "static") && (a.style.position = "relative"),
                      p !== "hidden" && (a.style.overflow = "hidden"),
                      (!v || v === "inline") && (a.style.display = "block"),
                      a.clientHeight === 0 && (a.style.height = "100%"),
                      a.className.indexOf("object-fit-polyfill") === -1 && (a.className += " object-fit-polyfill");
              },
              i = function (a) {
                  let c = window.getComputedStyle(a, null),
                      f = {
                          "max-width": "none",
                          "max-height": "none",
                          "min-width": "0px",
                          "min-height": "0px",
                          top: "auto",
                          right: "auto",
                          bottom: "auto",
                          left: "auto",
                          "margin-top": "0px",
                          "margin-right": "0px",
                          "margin-bottom": "0px",
                          "margin-left": "0px",
                      };
                  for (let p in f) c.getPropertyValue(p) !== f[p] && (a.style[p] = f[p]);
              },
              o = function (a) {
                  let c = a.parentNode;
                  n(c),
                      i(a),
                      (a.style.position = "absolute"),
                      (a.style.height = "100%"),
                      (a.style.width = "auto"),
                      a.clientWidth > c.clientWidth
                          ? ((a.style.top = "0"), (a.style.marginTop = "0"), (a.style.left = "50%"), (a.style.marginLeft = a.clientWidth / -2 + "px"))
                          : ((a.style.width = "100%"), (a.style.height = "auto"), (a.style.left = "0"), (a.style.marginLeft = "0"), (a.style.top = "50%"), (a.style.marginTop = a.clientHeight / -2 + "px"));
              },
              s = function (a) {
                  if (typeof a > "u" || a instanceof Event) a = document.querySelectorAll("[data-object-fit]");
                  else if (a && a.nodeName) a = [a];
                  else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
                  else return !1;
                  for (let c = 0; c < a.length; c++) {
                      if (!a[c].nodeName) continue;
                      let f = a[c].nodeName.toLowerCase();
                      if (f === "img") {
                          if (t) continue;
                          a[c].complete
                              ? o(a[c])
                              : a[c].addEventListener("load", function () {
                                    o(this);
                                });
                      } else
                          f === "video"
                              ? a[c].readyState > 0
                                  ? o(a[c])
                                  : a[c].addEventListener("loadedmetadata", function () {
                                        o(this);
                                    })
                              : o(a[c]);
                  }
                  return !0;
              };
          document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s(), window.addEventListener("resize", s), (window.objectFitPolyfill = s);
      })();
  });
  var Is = u(() => {
      (function () {
          if (typeof window > "u") return;
          function e(n) {
              Webflow.env("design") ||
                  ($("video").each(function () {
                      n && $(this).prop("autoplay") ? this.play() : this.pause();
                  }),
                  $(".w-background-video--control").each(function () {
                      n ? r($(this)) : t($(this));
                  }));
          }
          function t(n) {
              n.find("> span").each(function (i) {
                  $(this).prop("hidden", () => i === 0);
              });
          }
          function r(n) {
              n.find("> span").each(function (i) {
                  $(this).prop("hidden", () => i === 1);
              });
          }
          $(document).ready(() => {
              let n = window.matchMedia("(prefers-reduced-motion: reduce)");
              n.addEventListener("change", (i) => {
                  e(!i.matches);
              }),
                  n.matches && e(!1),
                  $("video:not([autoplay])").each(function () {
                      $(this)
                          .parent()
                          .find(".w-background-video--control")
                          .each(function () {
                              t($(this));
                          });
                  }),
                  $(document).on("click", ".w-background-video--control", function (i) {
                      if (Webflow.env("design")) return;
                      let o = $(i.currentTarget),
                          s = $(`video#${o.attr("aria-controls")}`).get(0);
                      if (s)
                          if (s.paused) {
                              let a = s.play();
                              r(o),
                                  a &&
                                      typeof a.catch == "function" &&
                                      a.catch(() => {
                                          t(o);
                                      });
                          } else s.pause(), t(o);
                  });
          });
      })();
  });
  var Di = u(() => {
      window.tram = (function (e) {
          function t(l, h) {
              var y = new U.Bare();
              return y.init(l, h);
          }
          function r(l) {
              return l.replace(/[A-Z]/g, function (h) {
                  return "-" + h.toLowerCase();
              });
          }
          function n(l) {
              var h = parseInt(l.slice(1), 16),
                  y = (h >> 16) & 255,
                  T = (h >> 8) & 255,
                  _ = 255 & h;
              return [y, T, _];
          }
          function i(l, h, y) {
              return "#" + ((1 << 24) | (l << 16) | (h << 8) | y).toString(16).slice(1);
          }
          function o() {}
          function s(l, h) {
              f("Type warning: Expected: [" + l + "] Got: [" + typeof h + "] " + h);
          }
          function a(l, h, y) {
              f("Units do not match [" + l + "]: " + h + ", " + y);
          }
          function c(l, h, y) {
              if ((h !== void 0 && (y = h), l === void 0)) return y;
              var T = y;
              return xt.test(l) || !ht.test(l) ? (T = parseInt(l, 10)) : ht.test(l) && (T = 1e3 * parseFloat(l)), 0 > T && (T = 0), T === T ? T : y;
          }
          function f(l) {
              pe.debug && window && window.console.warn(l);
          }
          function p(l) {
              for (var h = -1, y = l ? l.length : 0, T = []; ++h < y; ) {
                  var _ = l[h];
                  _ && T.push(_);
              }
              return T;
          }
          var v = (function (l, h, y) {
                  function T(ne) {
                      return typeof ne == "object";
                  }
                  function _(ne) {
                      return typeof ne == "function";
                  }
                  function O() {}
                  function z(ne, ge) {
                      function W() {
                          var De = new ue();
                          return _(De.init) && De.init.apply(De, arguments), De;
                      }
                      function ue() {}
                      ge === y && ((ge = ne), (ne = Object)), (W.Bare = ue);
                      var fe,
                          be = (O[l] = ne[l]),
                          nt = (ue[l] = W[l] = new O());
                      return (
                          (nt.constructor = W),
                          (W.mixin = function (De) {
                              return (ue[l] = W[l] = z(W, De)[l]), W;
                          }),
                          (W.open = function (De) {
                              if (((fe = {}), _(De) ? (fe = De.call(W, nt, be, W, ne)) : T(De) && (fe = De), T(fe))) for (var Or in fe) h.call(fe, Or) && (nt[Or] = fe[Or]);
                              return _(nt.init) || (nt.init = ne), W;
                          }),
                          W.open(ge)
                      );
                  }
                  return z;
              })("prototype", {}.hasOwnProperty),
              E = {
                  ease: [
                      "ease",
                      function (l, h, y, T) {
                          var _ = (l /= T) * l,
                              O = _ * l;
                          return h + y * (-2.75 * O * _ + 11 * _ * _ + -15.5 * O + 8 * _ + 0.25 * l);
                      },
                  ],
                  "ease-in": [
                      "ease-in",
                      function (l, h, y, T) {
                          var _ = (l /= T) * l,
                              O = _ * l;
                          return h + y * (-1 * O * _ + 3 * _ * _ + -3 * O + 2 * _);
                      },
                  ],
                  "ease-out": [
                      "ease-out",
                      function (l, h, y, T) {
                          var _ = (l /= T) * l,
                              O = _ * l;
                          return h + y * (0.3 * O * _ + -1.6 * _ * _ + 2.2 * O + -1.8 * _ + 1.9 * l);
                      },
                  ],
                  "ease-in-out": [
                      "ease-in-out",
                      function (l, h, y, T) {
                          var _ = (l /= T) * l,
                              O = _ * l;
                          return h + y * (2 * O * _ + -5 * _ * _ + 2 * O + 2 * _);
                      },
                  ],
                  linear: [
                      "linear",
                      function (l, h, y, T) {
                          return (y * l) / T + h;
                      },
                  ],
                  "ease-in-quad": [
                      "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
                      function (l, h, y, T) {
                          return y * (l /= T) * l + h;
                      },
                  ],
                  "ease-out-quad": [
                      "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                      function (l, h, y, T) {
                          return -y * (l /= T) * (l - 2) + h;
                      },
                  ],
                  "ease-in-out-quad": [
                      "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
                      function (l, h, y, T) {
                          return (l /= T / 2) < 1 ? (y / 2) * l * l + h : (-y / 2) * (--l * (l - 2) - 1) + h;
                      },
                  ],
                  "ease-in-cubic": [
                      "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                      function (l, h, y, T) {
                          return y * (l /= T) * l * l + h;
                      },
                  ],
                  "ease-out-cubic": [
                      "cubic-bezier(0.215, 0.610, 0.355, 1)",
                      function (l, h, y, T) {
                          return y * ((l = l / T - 1) * l * l + 1) + h;
                      },
                  ],
                  "ease-in-out-cubic": [
                      "cubic-bezier(0.645, 0.045, 0.355, 1)",
                      function (l, h, y, T) {
                          return (l /= T / 2) < 1 ? (y / 2) * l * l * l + h : (y / 2) * ((l -= 2) * l * l + 2) + h;
                      },
                  ],
                  "ease-in-quart": [
                      "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
                      function (l, h, y, T) {
                          return y * (l /= T) * l * l * l + h;
                      },
                  ],
                  "ease-out-quart": [
                      "cubic-bezier(0.165, 0.840, 0.440, 1)",
                      function (l, h, y, T) {
                          return -y * ((l = l / T - 1) * l * l * l - 1) + h;
                      },
                  ],
                  "ease-in-out-quart": [
                      "cubic-bezier(0.770, 0, 0.175, 1)",
                      function (l, h, y, T) {
                          return (l /= T / 2) < 1 ? (y / 2) * l * l * l * l + h : (-y / 2) * ((l -= 2) * l * l * l - 2) + h;
                      },
                  ],
                  "ease-in-quint": [
                      "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
                      function (l, h, y, T) {
                          return y * (l /= T) * l * l * l * l + h;
                      },
                  ],
                  "ease-out-quint": [
                      "cubic-bezier(0.230, 1, 0.320, 1)",
                      function (l, h, y, T) {
                          return y * ((l = l / T - 1) * l * l * l * l + 1) + h;
                      },
                  ],
                  "ease-in-out-quint": [
                      "cubic-bezier(0.860, 0, 0.070, 1)",
                      function (l, h, y, T) {
                          return (l /= T / 2) < 1 ? (y / 2) * l * l * l * l * l + h : (y / 2) * ((l -= 2) * l * l * l * l + 2) + h;
                      },
                  ],
                  "ease-in-sine": [
                      "cubic-bezier(0.470, 0, 0.745, 0.715)",
                      function (l, h, y, T) {
                          return -y * Math.cos((l / T) * (Math.PI / 2)) + y + h;
                      },
                  ],
                  "ease-out-sine": [
                      "cubic-bezier(0.390, 0.575, 0.565, 1)",
                      function (l, h, y, T) {
                          return y * Math.sin((l / T) * (Math.PI / 2)) + h;
                      },
                  ],
                  "ease-in-out-sine": [
                      "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
                      function (l, h, y, T) {
                          return (-y / 2) * (Math.cos((Math.PI * l) / T) - 1) + h;
                      },
                  ],
                  "ease-in-expo": [
                      "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
                      function (l, h, y, T) {
                          return l === 0 ? h : y * Math.pow(2, 10 * (l / T - 1)) + h;
                      },
                  ],
                  "ease-out-expo": [
                      "cubic-bezier(0.190, 1, 0.220, 1)",
                      function (l, h, y, T) {
                          return l === T ? h + y : y * (-Math.pow(2, (-10 * l) / T) + 1) + h;
                      },
                  ],
                  "ease-in-out-expo": [
                      "cubic-bezier(1, 0, 0, 1)",
                      function (l, h, y, T) {
                          return l === 0 ? h : l === T ? h + y : (l /= T / 2) < 1 ? (y / 2) * Math.pow(2, 10 * (l - 1)) + h : (y / 2) * (-Math.pow(2, -10 * --l) + 2) + h;
                      },
                  ],
                  "ease-in-circ": [
                      "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
                      function (l, h, y, T) {
                          return -y * (Math.sqrt(1 - (l /= T) * l) - 1) + h;
                      },
                  ],
                  "ease-out-circ": [
                      "cubic-bezier(0.075, 0.820, 0.165, 1)",
                      function (l, h, y, T) {
                          return y * Math.sqrt(1 - (l = l / T - 1) * l) + h;
                      },
                  ],
                  "ease-in-out-circ": [
                      "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
                      function (l, h, y, T) {
                          return (l /= T / 2) < 1 ? (-y / 2) * (Math.sqrt(1 - l * l) - 1) + h : (y / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + h;
                      },
                  ],
                  "ease-in-back": [
                      "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
                      function (l, h, y, T, _) {
                          return _ === void 0 && (_ = 1.70158), y * (l /= T) * l * ((_ + 1) * l - _) + h;
                      },
                  ],
                  "ease-out-back": [
                      "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                      function (l, h, y, T, _) {
                          return _ === void 0 && (_ = 1.70158), y * ((l = l / T - 1) * l * ((_ + 1) * l + _) + 1) + h;
                      },
                  ],
                  "ease-in-out-back": [
                      "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
                      function (l, h, y, T, _) {
                          return _ === void 0 && (_ = 1.70158), (l /= T / 2) < 1 ? (y / 2) * l * l * (((_ *= 1.525) + 1) * l - _) + h : (y / 2) * ((l -= 2) * l * (((_ *= 1.525) + 1) * l + _) + 2) + h;
                      },
                  ],
              },
              g = { "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)", "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)", "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)" },
              b = document,
              S = window,
              x = "bkwld-tram",
              A = /[\-\.0-9]/g,
              w = /[A-Z]/,
              m = "number",
              N = /^(rgb|#)/,
              C = /(em|cm|mm|in|pt|pc|px)$/,
              q = /(em|cm|mm|in|pt|pc|px|%)$/,
              G = /(deg|rad|turn)$/,
              j = "unitless",
              Y = /(all|none) 0s ease 0s/,
              oe = /^(width|height)$/,
              te = " ",
              D = b.createElement("a"),
              I = ["Webkit", "Moz", "O", "ms"],
              P = ["-webkit-", "-moz-", "-o-", "-ms-"],
              M = function (l) {
                  if (l in D.style) return { dom: l, css: l };
                  var h,
                      y,
                      T = "",
                      _ = l.split("-");
                  for (h = 0; h < _.length; h++) T += _[h].charAt(0).toUpperCase() + _[h].slice(1);
                  for (h = 0; h < I.length; h++) if (((y = I[h] + T), y in D.style)) return { dom: y, css: P[h] + l };
              },
              X = (t.support = { bind: Function.prototype.bind, transform: M("transform"), transition: M("transition"), backface: M("backface-visibility"), timing: M("transition-timing-function") });
          if (X.transition) {
              var Q = X.timing.dom;
              if (((D.style[Q] = E["ease-in-back"][0]), !D.style[Q])) for (var re in g) E[re][0] = g[re];
          }
          var L = (t.frame = (function () {
                  var l = S.requestAnimationFrame || S.webkitRequestAnimationFrame || S.mozRequestAnimationFrame || S.oRequestAnimationFrame || S.msRequestAnimationFrame;
                  return l && X.bind
                      ? l.bind(S)
                      : function (h) {
                            S.setTimeout(h, 16);
                        };
              })()),
              H = (t.now = (function () {
                  var l = S.performance,
                      h = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
                  return h && X.bind
                      ? h.bind(l)
                      : Date.now ||
                            function () {
                                return +new Date();
                            };
              })()),
              k = v(function (l) {
                  function h(J, de) {
                      var Te = p(("" + J).split(te)),
                          ve = Te[0];
                      de = de || {};
                      var Me = B[ve];
                      if (!Me) return f("Unsupported property: " + ve);
                      if (!de.weak || !this.props[ve]) {
                          var Ke = Me[0],
                              Ue = this.props[ve];
                          return Ue || (Ue = this.props[ve] = new Ke.Bare()), Ue.init(this.$el, Te, Me, de), Ue;
                      }
                  }
                  function y(J, de, Te) {
                      if (J) {
                          var ve = typeof J;
                          if ((de || (this.timer && this.timer.destroy(), (this.queue = []), (this.active = !1)), ve == "number" && de)) return (this.timer = new Ee({ duration: J, context: this, complete: O })), void (this.active = !0);
                          if (ve == "string" && de) {
                              switch (J) {
                                  case "hide":
                                      W.call(this);
                                      break;
                                  case "stop":
                                      z.call(this);
                                      break;
                                  case "redraw":
                                      ue.call(this);
                                      break;
                                  default:
                                      h.call(this, J, Te && Te[1]);
                              }
                              return O.call(this);
                          }
                          if (ve == "function") return void J.call(this, this);
                          if (ve == "object") {
                              var Me = 0;
                              nt.call(
                                  this,
                                  J,
                                  function (Ae, lI) {
                                      Ae.span > Me && (Me = Ae.span), Ae.stop(), Ae.animate(lI);
                                  },
                                  function (Ae) {
                                      "wait" in Ae && (Me = c(Ae.wait, 0));
                                  }
                              ),
                                  be.call(this),
                                  Me > 0 && ((this.timer = new Ee({ duration: Me, context: this })), (this.active = !0), de && (this.timer.complete = O));
                              var Ke = this,
                                  Ue = !1,
                                  sn = {};
                              L(function () {
                                  nt.call(Ke, J, function (Ae) {
                                      Ae.active && ((Ue = !0), (sn[Ae.name] = Ae.nextStyle));
                                  }),
                                      Ue && Ke.$el.css(sn);
                              });
                          }
                      }
                  }
                  function T(J) {
                      (J = c(J, 0)), this.active ? this.queue.push({ options: J }) : ((this.timer = new Ee({ duration: J, context: this, complete: O })), (this.active = !0));
                  }
                  function _(J) {
                      return this.active ? (this.queue.push({ options: J, args: arguments }), void (this.timer.complete = O)) : f("No active transition timer. Use start() or wait() before then().");
                  }
                  function O() {
                      if ((this.timer && this.timer.destroy(), (this.active = !1), this.queue.length)) {
                          var J = this.queue.shift();
                          y.call(this, J.options, !0, J.args);
                      }
                  }
                  function z(J) {
                      this.timer && this.timer.destroy(), (this.queue = []), (this.active = !1);
                      var de;
                      typeof J == "string" ? ((de = {}), (de[J] = 1)) : (de = typeof J == "object" && J != null ? J : this.props), nt.call(this, de, De), be.call(this);
                  }
                  function ne(J) {
                      z.call(this, J), nt.call(this, J, Or, uI);
                  }
                  function ge(J) {
                      typeof J != "string" && (J = "block"), (this.el.style.display = J);
                  }
                  function W() {
                      z.call(this), (this.el.style.display = "none");
                  }
                  function ue() {
                      this.el.offsetHeight;
                  }
                  function fe() {
                      z.call(this), e.removeData(this.el, x), (this.$el = this.el = null);
                  }
                  function be() {
                      var J,
                          de,
                          Te = [];
                      this.upstream && Te.push(this.upstream);
                      for (J in this.props) (de = this.props[J]), de.active && Te.push(de.string);
                      (Te = Te.join(",")), this.style !== Te && ((this.style = Te), (this.el.style[X.transition.dom] = Te));
                  }
                  function nt(J, de, Te) {
                      var ve,
                          Me,
                          Ke,
                          Ue,
                          sn = de !== De,
                          Ae = {};
                      for (ve in J) (Ke = J[ve]), ve in ye ? (Ae.transform || (Ae.transform = {}), (Ae.transform[ve] = Ke)) : (w.test(ve) && (ve = r(ve)), ve in B ? (Ae[ve] = Ke) : (Ue || (Ue = {}), (Ue[ve] = Ke)));
                      for (ve in Ae) {
                          if (((Ke = Ae[ve]), (Me = this.props[ve]), !Me)) {
                              if (!sn) continue;
                              Me = h.call(this, ve);
                          }
                          de.call(this, Me, Ke);
                      }
                      Te && Ue && Te.call(this, Ue);
                  }
                  function De(J) {
                      J.stop();
                  }
                  function Or(J, de) {
                      J.set(de);
                  }
                  function uI(J) {
                      this.$el.css(J);
                  }
                  function je(J, de) {
                      l[J] = function () {
                          return this.children ? cI.call(this, de, arguments) : (this.el && de.apply(this, arguments), this);
                      };
                  }
                  function cI(J, de) {
                      var Te,
                          ve = this.children.length;
                      for (Te = 0; ve > Te; Te++) J.apply(this.children[Te], de);
                      return this;
                  }
                  (l.init = function (J) {
                      if (((this.$el = e(J)), (this.el = this.$el[0]), (this.props = {}), (this.queue = []), (this.style = ""), (this.active = !1), pe.keepInherited && !pe.fallback)) {
                          var de = V(this.el, "transition");
                          de && !Y.test(de) && (this.upstream = de);
                      }
                      X.backface && pe.hideBackface && d(this.el, X.backface.css, "hidden");
                  }),
                      je("add", h),
                      je("start", y),
                      je("wait", T),
                      je("then", _),
                      je("next", O),
                      je("stop", z),
                      je("set", ne),
                      je("show", ge),
                      je("hide", W),
                      je("redraw", ue),
                      je("destroy", fe);
              }),
              U = v(k, function (l) {
                  function h(y, T) {
                      var _ = e.data(y, x) || e.data(y, x, new k.Bare());
                      return _.el || _.init(y), T ? _.start(T) : _;
                  }
                  l.init = function (y, T) {
                      var _ = e(y);
                      if (!_.length) return this;
                      if (_.length === 1) return h(_[0], T);
                      var O = [];
                      return (
                          _.each(function (z, ne) {
                              O.push(h(ne, T));
                          }),
                          (this.children = O),
                          this
                      );
                  };
              }),
              F = v(function (l) {
                  function h() {
                      var O = this.get();
                      this.update("auto");
                      var z = this.get();
                      return this.update(O), z;
                  }
                  function y(O, z, ne) {
                      return z !== void 0 && (ne = z), O in E ? O : ne;
                  }
                  function T(O) {
                      var z = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(O);
                      return (z ? i(z[1], z[2], z[3]) : O).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
                  }
                  var _ = { duration: 500, ease: "ease", delay: 0 };
                  (l.init = function (O, z, ne, ge) {
                      (this.$el = O), (this.el = O[0]);
                      var W = z[0];
                      ne[2] && (W = ne[2]),
                          K[W] && (W = K[W]),
                          (this.name = W),
                          (this.type = ne[1]),
                          (this.duration = c(z[1], this.duration, _.duration)),
                          (this.ease = y(z[2], this.ease, _.ease)),
                          (this.delay = c(z[3], this.delay, _.delay)),
                          (this.span = this.duration + this.delay),
                          (this.active = !1),
                          (this.nextStyle = null),
                          (this.auto = oe.test(this.name)),
                          (this.unit = ge.unit || this.unit || pe.defaultUnit),
                          (this.angle = ge.angle || this.angle || pe.defaultAngle),
                          pe.fallback || ge.fallback
                              ? (this.animate = this.fallback)
                              : ((this.animate = this.transition), (this.string = this.name + te + this.duration + "ms" + (this.ease != "ease" ? te + E[this.ease][0] : "") + (this.delay ? te + this.delay + "ms" : "")));
                  }),
                      (l.set = function (O) {
                          (O = this.convert(O, this.type)), this.update(O), this.redraw();
                      }),
                      (l.transition = function (O) {
                          (this.active = !0), (O = this.convert(O, this.type)), this.auto && (this.el.style[this.name] == "auto" && (this.update(this.get()), this.redraw()), O == "auto" && (O = h.call(this))), (this.nextStyle = O);
                      }),
                      (l.fallback = function (O) {
                          var z = this.el.style[this.name] || this.convert(this.get(), this.type);
                          (O = this.convert(O, this.type)),
                              this.auto && (z == "auto" && (z = this.convert(this.get(), this.type)), O == "auto" && (O = h.call(this))),
                              (this.tween = new ee({ from: z, to: O, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this }));
                      }),
                      (l.get = function () {
                          return V(this.el, this.name);
                      }),
                      (l.update = function (O) {
                          d(this.el, this.name, O);
                      }),
                      (l.stop = function () {
                          (this.active || this.nextStyle) && ((this.active = !1), (this.nextStyle = null), d(this.el, this.name, this.get()));
                          var O = this.tween;
                          O && O.context && O.destroy();
                      }),
                      (l.convert = function (O, z) {
                          if (O == "auto" && this.auto) return O;
                          var ne,
                              ge = typeof O == "number",
                              W = typeof O == "string";
                          switch (z) {
                              case m:
                                  if (ge) return O;
                                  if (W && O.replace(A, "") === "") return +O;
                                  ne = "number(unitless)";
                                  break;
                              case N:
                                  if (W) {
                                      if (O === "" && this.original) return this.original;
                                      if (z.test(O)) return O.charAt(0) == "#" && O.length == 7 ? O : T(O);
                                  }
                                  ne = "hex or rgb string";
                                  break;
                              case C:
                                  if (ge) return O + this.unit;
                                  if (W && z.test(O)) return O;
                                  ne = "number(px) or string(unit)";
                                  break;
                              case q:
                                  if (ge) return O + this.unit;
                                  if (W && z.test(O)) return O;
                                  ne = "number(px) or string(unit or %)";
                                  break;
                              case G:
                                  if (ge) return O + this.angle;
                                  if (W && z.test(O)) return O;
                                  ne = "number(deg) or string(angle)";
                                  break;
                              case j:
                                  if (ge || (W && q.test(O))) return O;
                                  ne = "number(unitless) or string(unit or %)";
                          }
                          return s(ne, O), O;
                      }),
                      (l.redraw = function () {
                          this.el.offsetHeight;
                      });
              }),
              Z = v(F, function (l, h) {
                  l.init = function () {
                      h.init.apply(this, arguments), this.original || (this.original = this.convert(this.get(), N));
                  };
              }),
              ce = v(F, function (l, h) {
                  (l.init = function () {
                      h.init.apply(this, arguments), (this.animate = this.fallback);
                  }),
                      (l.get = function () {
                          return this.$el[this.name]();
                      }),
                      (l.update = function (y) {
                          this.$el[this.name](y);
                      });
              }),
              le = v(F, function (l, h) {
                  function y(T, _) {
                      var O, z, ne, ge, W;
                      for (O in T) (ge = ye[O]), (ne = ge[0]), (z = ge[1] || O), (W = this.convert(T[O], ne)), _.call(this, z, W, ne);
                  }
                  (l.init = function () {
                      h.init.apply(this, arguments), this.current || ((this.current = {}), ye.perspective && pe.perspective && ((this.current.perspective = pe.perspective), d(this.el, this.name, this.style(this.current)), this.redraw()));
                  }),
                      (l.set = function (T) {
                          y.call(this, T, function (_, O) {
                              this.current[_] = O;
                          }),
                              d(this.el, this.name, this.style(this.current)),
                              this.redraw();
                      }),
                      (l.transition = function (T) {
                          var _ = this.values(T);
                          this.tween = new vt({ current: this.current, values: _, duration: this.duration, delay: this.delay, ease: this.ease });
                          var O,
                              z = {};
                          for (O in this.current) z[O] = O in _ ? _[O] : this.current[O];
                          (this.active = !0), (this.nextStyle = this.style(z));
                      }),
                      (l.fallback = function (T) {
                          var _ = this.values(T);
                          this.tween = new vt({ current: this.current, values: _, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this });
                      }),
                      (l.update = function () {
                          d(this.el, this.name, this.style(this.current));
                      }),
                      (l.style = function (T) {
                          var _,
                              O = "";
                          for (_ in T) O += _ + "(" + T[_] + ") ";
                          return O;
                      }),
                      (l.values = function (T) {
                          var _,
                              O = {};
                          return (
                              y.call(this, T, function (z, ne, ge) {
                                  (O[z] = ne), this.current[z] === void 0 && ((_ = 0), ~z.indexOf("scale") && (_ = 1), (this.current[z] = this.convert(_, ge)));
                              }),
                              O
                          );
                      });
              }),
              ee = v(function (l) {
                  function h(W) {
                      ne.push(W) === 1 && L(y);
                  }
                  function y() {
                      var W,
                          ue,
                          fe,
                          be = ne.length;
                      if (be) for (L(y), ue = H(), W = be; W--; ) (fe = ne[W]), fe && fe.render(ue);
                  }
                  function T(W) {
                      var ue,
                          fe = e.inArray(W, ne);
                      fe >= 0 && ((ue = ne.slice(fe + 1)), (ne.length = fe), ue.length && (ne = ne.concat(ue)));
                  }
                  function _(W) {
                      return Math.round(W * ge) / ge;
                  }
                  function O(W, ue, fe) {
                      return i(W[0] + fe * (ue[0] - W[0]), W[1] + fe * (ue[1] - W[1]), W[2] + fe * (ue[2] - W[2]));
                  }
                  var z = { ease: E.ease[1], from: 0, to: 1 };
                  (l.init = function (W) {
                      (this.duration = W.duration || 0), (this.delay = W.delay || 0);
                      var ue = W.ease || z.ease;
                      E[ue] && (ue = E[ue][1]), typeof ue != "function" && (ue = z.ease), (this.ease = ue), (this.update = W.update || o), (this.complete = W.complete || o), (this.context = W.context || this), (this.name = W.name);
                      var fe = W.from,
                          be = W.to;
                      fe === void 0 && (fe = z.from),
                          be === void 0 && (be = z.to),
                          (this.unit = W.unit || ""),
                          typeof fe == "number" && typeof be == "number" ? ((this.begin = fe), (this.change = be - fe)) : this.format(be, fe),
                          (this.value = this.begin + this.unit),
                          (this.start = H()),
                          W.autoplay !== !1 && this.play();
                  }),
                      (l.play = function () {
                          this.active || (this.start || (this.start = H()), (this.active = !0), h(this));
                      }),
                      (l.stop = function () {
                          this.active && ((this.active = !1), T(this));
                      }),
                      (l.render = function (W) {
                          var ue,
                              fe = W - this.start;
                          if (this.delay) {
                              if (fe <= this.delay) return;
                              fe -= this.delay;
                          }
                          if (fe < this.duration) {
                              var be = this.ease(fe, 0, 1, this.duration);
                              return (ue = this.startRGB ? O(this.startRGB, this.endRGB, be) : _(this.begin + be * this.change)), (this.value = ue + this.unit), void this.update.call(this.context, this.value);
                          }
                          (ue = this.endHex || this.begin + this.change), (this.value = ue + this.unit), this.update.call(this.context, this.value), this.complete.call(this.context), this.destroy();
                      }),
                      (l.format = function (W, ue) {
                          if (((ue += ""), (W += ""), W.charAt(0) == "#")) return (this.startRGB = n(ue)), (this.endRGB = n(W)), (this.endHex = W), (this.begin = 0), void (this.change = 1);
                          if (!this.unit) {
                              var fe = ue.replace(A, ""),
                                  be = W.replace(A, "");
                              fe !== be && a("tween", ue, W), (this.unit = fe);
                          }
                          (ue = parseFloat(ue)), (W = parseFloat(W)), (this.begin = this.value = ue), (this.change = W - ue);
                      }),
                      (l.destroy = function () {
                          this.stop(), (this.context = null), (this.ease = this.update = this.complete = o);
                      });
                  var ne = [],
                      ge = 1e3;
              }),
              Ee = v(ee, function (l) {
                  (l.init = function (h) {
                      (this.duration = h.duration || 0), (this.complete = h.complete || o), (this.context = h.context), this.play();
                  }),
                      (l.render = function (h) {
                          var y = h - this.start;
                          y < this.duration || (this.complete.call(this.context), this.destroy());
                      });
              }),
              vt = v(ee, function (l, h) {
                  (l.init = function (y) {
                      (this.context = y.context), (this.update = y.update), (this.tweens = []), (this.current = y.current);
                      var T, _;
                      for (T in y.values) (_ = y.values[T]), this.current[T] !== _ && this.tweens.push(new ee({ name: T, from: this.current[T], to: _, duration: y.duration, delay: y.delay, ease: y.ease, autoplay: !1 }));
                      this.play();
                  }),
                      (l.render = function (y) {
                          var T,
                              _,
                              O = this.tweens.length,
                              z = !1;
                          for (T = O; T--; ) (_ = this.tweens[T]), _.context && (_.render(y), (this.current[_.name] = _.value), (z = !0));
                          return z ? void (this.update && this.update.call(this.context)) : this.destroy();
                      }),
                      (l.destroy = function () {
                          if ((h.destroy.call(this), this.tweens)) {
                              var y,
                                  T = this.tweens.length;
                              for (y = T; y--; ) this.tweens[y].destroy();
                              (this.tweens = null), (this.current = null);
                          }
                      });
              }),
              pe = (t.config = { debug: !1, defaultUnit: "px", defaultAngle: "deg", keepInherited: !1, hideBackface: !1, perspective: "", fallback: !X.transition, agentTests: [] });
          (t.fallback = function (l) {
              if (!X.transition) return (pe.fallback = !0);
              pe.agentTests.push("(" + l + ")");
              var h = new RegExp(pe.agentTests.join("|"), "i");
              pe.fallback = h.test(navigator.userAgent);
          }),
              t.fallback("6.0.[2-5] Safari"),
              (t.tween = function (l) {
                  return new ee(l);
              }),
              (t.delay = function (l, h, y) {
                  return new Ee({ complete: h, duration: l, context: y });
              }),
              (e.fn.tram = function (l) {
                  return t.call(null, this, l);
              });
          var d = e.style,
              V = e.css,
              K = { transform: X.transform && X.transform.css },
              B = {
                  color: [Z, N],
                  background: [Z, N, "background-color"],
                  "outline-color": [Z, N],
                  "border-color": [Z, N],
                  "border-top-color": [Z, N],
                  "border-right-color": [Z, N],
                  "border-bottom-color": [Z, N],
                  "border-left-color": [Z, N],
                  "border-width": [F, C],
                  "border-top-width": [F, C],
                  "border-right-width": [F, C],
                  "border-bottom-width": [F, C],
                  "border-left-width": [F, C],
                  "border-spacing": [F, C],
                  "letter-spacing": [F, C],
                  margin: [F, C],
                  "margin-top": [F, C],
                  "margin-right": [F, C],
                  "margin-bottom": [F, C],
                  "margin-left": [F, C],
                  padding: [F, C],
                  "padding-top": [F, C],
                  "padding-right": [F, C],
                  "padding-bottom": [F, C],
                  "padding-left": [F, C],
                  "outline-width": [F, C],
                  opacity: [F, m],
                  top: [F, q],
                  right: [F, q],
                  bottom: [F, q],
                  left: [F, q],
                  "font-size": [F, q],
                  "text-indent": [F, q],
                  "word-spacing": [F, q],
                  width: [F, q],
                  "min-width": [F, q],
                  "max-width": [F, q],
                  height: [F, q],
                  "min-height": [F, q],
                  "max-height": [F, q],
                  "line-height": [F, j],
                  "scroll-top": [ce, m, "scrollTop"],
                  "scroll-left": [ce, m, "scrollLeft"],
              },
              ye = {};
          X.transform && ((B.transform = [le]), (ye = { x: [q, "translateX"], y: [q, "translateY"], rotate: [G], rotateX: [G], rotateY: [G], scale: [m], scaleX: [m], scaleY: [m], skew: [G], skewX: [G], skewY: [G] })),
              X.transform && X.backface && ((ye.z = [q, "translateZ"]), (ye.rotateZ = [G]), (ye.scaleZ = [m]), (ye.perspective = [C]));
          var xt = /ms/,
              ht = /s|\./;
          return (e.tram = t);
      })(window.jQuery);
  });
  var Ts = u((cW, ms) => {
      var fI = window.$,
          dI = Di() && fI.tram;
      ms.exports = (function () {
          var e = {};
          e.VERSION = "1.6.0-Webflow";
          var t = {},
              r = Array.prototype,
              n = Object.prototype,
              i = Function.prototype,
              o = r.push,
              s = r.slice,
              a = r.concat,
              c = n.toString,
              f = n.hasOwnProperty,
              p = r.forEach,
              v = r.map,
              E = r.reduce,
              g = r.reduceRight,
              b = r.filter,
              S = r.every,
              x = r.some,
              A = r.indexOf,
              w = r.lastIndexOf,
              m = Array.isArray,
              N = Object.keys,
              C = i.bind,
              q = (e.each = e.forEach = function (I, P, M) {
                  if (I == null) return I;
                  if (p && I.forEach === p) I.forEach(P, M);
                  else if (I.length === +I.length) {
                      for (var X = 0, Q = I.length; X < Q; X++) if (P.call(M, I[X], X, I) === t) return;
                  } else for (var re = e.keys(I), X = 0, Q = re.length; X < Q; X++) if (P.call(M, I[re[X]], re[X], I) === t) return;
                  return I;
              });
          (e.map = e.collect = function (I, P, M) {
              var X = [];
              return I == null
                  ? X
                  : v && I.map === v
                  ? I.map(P, M)
                  : (q(I, function (Q, re, L) {
                        X.push(P.call(M, Q, re, L));
                    }),
                    X);
          }),
              (e.find = e.detect = function (I, P, M) {
                  var X;
                  return (
                      G(I, function (Q, re, L) {
                          if (P.call(M, Q, re, L)) return (X = Q), !0;
                      }),
                      X
                  );
              }),
              (e.filter = e.select = function (I, P, M) {
                  var X = [];
                  return I == null
                      ? X
                      : b && I.filter === b
                      ? I.filter(P, M)
                      : (q(I, function (Q, re, L) {
                            P.call(M, Q, re, L) && X.push(Q);
                        }),
                        X);
              });
          var G = (e.some = e.any = function (I, P, M) {
              P || (P = e.identity);
              var X = !1;
              return I == null
                  ? X
                  : x && I.some === x
                  ? I.some(P, M)
                  : (q(I, function (Q, re, L) {
                        if (X || (X = P.call(M, Q, re, L))) return t;
                    }),
                    !!X);
          });
          (e.contains = e.include = function (I, P) {
              return I == null
                  ? !1
                  : A && I.indexOf === A
                  ? I.indexOf(P) != -1
                  : G(I, function (M) {
                        return M === P;
                    });
          }),
              (e.delay = function (I, P) {
                  var M = s.call(arguments, 2);
                  return setTimeout(function () {
                      return I.apply(null, M);
                  }, P);
              }),
              (e.defer = function (I) {
                  return e.delay.apply(e, [I, 1].concat(s.call(arguments, 1)));
              }),
              (e.throttle = function (I) {
                  var P, M, X;
                  return function () {
                      P ||
                          ((P = !0),
                          (M = arguments),
                          (X = this),
                          dI.frame(function () {
                              (P = !1), I.apply(X, M);
                          }));
                  };
              }),
              (e.debounce = function (I, P, M) {
                  var X,
                      Q,
                      re,
                      L,
                      H,
                      k = function () {
                          var U = e.now() - L;
                          U < P ? (X = setTimeout(k, P - U)) : ((X = null), M || ((H = I.apply(re, Q)), (re = Q = null)));
                      };
                  return function () {
                      (re = this), (Q = arguments), (L = e.now());
                      var U = M && !X;
                      return X || (X = setTimeout(k, P)), U && ((H = I.apply(re, Q)), (re = Q = null)), H;
                  };
              }),
              (e.defaults = function (I) {
                  if (!e.isObject(I)) return I;
                  for (var P = 1, M = arguments.length; P < M; P++) {
                      var X = arguments[P];
                      for (var Q in X) I[Q] === void 0 && (I[Q] = X[Q]);
                  }
                  return I;
              }),
              (e.keys = function (I) {
                  if (!e.isObject(I)) return [];
                  if (N) return N(I);
                  var P = [];
                  for (var M in I) e.has(I, M) && P.push(M);
                  return P;
              }),
              (e.has = function (I, P) {
                  return f.call(I, P);
              }),
              (e.isObject = function (I) {
                  return I === Object(I);
              }),
              (e.now =
                  Date.now ||
                  function () {
                      return new Date().getTime();
                  }),
              (e.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g });
          var j = /(.)^/,
              Y = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
              oe = /\\|'|\r|\n|\u2028|\u2029/g,
              te = function (I) {
                  return "\\" + Y[I];
              },
              D = /^\s*(\w|\$)+\s*$/;
          return (
              (e.template = function (I, P, M) {
                  !P && M && (P = M), (P = e.defaults({}, P, e.templateSettings));
                  var X = RegExp([(P.escape || j).source, (P.interpolate || j).source, (P.evaluate || j).source].join("|") + "|$", "g"),
                      Q = 0,
                      re = "__p+='";
                  I.replace(X, function (U, F, Z, ce, le) {
                      return (
                          (re += I.slice(Q, le).replace(oe, te)),
                          (Q = le + U.length),
                          F
                              ? (re +=
                                    `'+
((__t=(` +
                                    F +
                                    `))==null?'':_.escape(__t))+
'`)
                              : Z
                              ? (re +=
                                    `'+
((__t=(` +
                                    Z +
                                    `))==null?'':__t)+
'`)
                              : ce &&
                                (re +=
                                    `';
` +
                                    ce +
                                    `
__p+='`),
                          U
                      );
                  }),
                      (re += `';
`);
                  var L = P.variable;
                  if (L) {
                      if (!D.test(L)) throw new Error("variable is not a bare identifier: " + L);
                  } else
                      (re =
                          `with(obj||{}){
` +
                          re +
                          `}
`),
                          (L = "obj");
                  re =
                      `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
                      re +
                      `return __p;
`;
                  var H;
                  try {
                      H = new Function(P.variable || "obj", "_", re);
                  } catch (U) {
                      throw ((U.source = re), U);
                  }
                  var k = function (U) {
                      return H.call(this, U, e);
                  };
                  return (
                      (k.source =
                          "function(" +
                          L +
                          `){
` +
                          re +
                          "}"),
                      k
                  );
              }),
              e
          );
      })();
  });
  var Qe = u((lW, Ns) => {
      var he = {},
          jt = {},
          Kt = [],
          Fi = window.Webflow || [],
          mt = window.jQuery,
          Ye = mt(window),
          pI = mt(document),
          it = mt.isFunction,
          ze = (he._ = Ts()),
          Ss = (he.tram = Di() && mt.tram),
          cn = !1,
          Gi = !1;
      Ss.config.hideBackface = !1;
      Ss.config.keepInherited = !0;
      he.define = function (e, t, r) {
          jt[e] && As(jt[e]);
          var n = (jt[e] = t(mt, ze, r) || {});
          return bs(n), n;
      };
      he.require = function (e) {
          return jt[e];
      };
      function bs(e) {
          he.env() && (it(e.design) && Ye.on("__wf_design", e.design), it(e.preview) && Ye.on("__wf_preview", e.preview)), it(e.destroy) && Ye.on("__wf_destroy", e.destroy), e.ready && it(e.ready) && vI(e);
      }
      function vI(e) {
          if (cn) {
              e.ready();
              return;
          }
          ze.contains(Kt, e.ready) || Kt.push(e.ready);
      }
      function As(e) {
          it(e.design) && Ye.off("__wf_design", e.design), it(e.preview) && Ye.off("__wf_preview", e.preview), it(e.destroy) && Ye.off("__wf_destroy", e.destroy), e.ready && it(e.ready) && hI(e);
      }
      function hI(e) {
          Kt = ze.filter(Kt, function (t) {
              return t !== e.ready;
          });
      }
      he.push = function (e) {
          if (cn) {
              it(e) && e();
              return;
          }
          Fi.push(e);
      };
      he.env = function (e) {
          var t = window.__wf_design,
              r = typeof t < "u";
          if (!e) return r;
          if (e === "design") return r && t;
          if (e === "preview") return r && !t;
          if (e === "slug") return r && window.__wf_slug;
          if (e === "editor") return window.WebflowEditor;
          if (e === "test") return window.__wf_test;
          if (e === "frame") return window !== window.top;
      };
      var un = navigator.userAgent.toLowerCase(),
          ws = (he.env.touch = "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch)),
          EI = (he.env.chrome = /chrome/.test(un) && /Google/.test(navigator.vendor) && parseInt(un.match(/chrome\/(\d+)\./)[1], 10)),
          gI = (he.env.ios = /(ipod|iphone|ipad)/.test(un));
      he.env.safari = /safari/.test(un) && !EI && !gI;
      var Mi;
      ws &&
          pI.on("touchstart mousedown", function (e) {
              Mi = e.target;
          });
      he.validClick = ws
          ? function (e) {
                return e === Mi || mt.contains(e, Mi);
            }
          : function () {
                return !0;
            };
      var Rs = "resize.webflow orientationchange.webflow load.webflow",
          _I = "scroll.webflow " + Rs;
      he.resize = Xi(Ye, Rs);
      he.scroll = Xi(Ye, _I);
      he.redraw = Xi();
      function Xi(e, t) {
          var r = [],
              n = {};
          return (
              (n.up = ze.throttle(function (i) {
                  ze.each(r, function (o) {
                      o(i);
                  });
              })),
              e && t && e.on(t, n.up),
              (n.on = function (i) {
                  typeof i == "function" && (ze.contains(r, i) || r.push(i));
              }),
              (n.off = function (i) {
                  if (!arguments.length) {
                      r = [];
                      return;
                  }
                  r = ze.filter(r, function (o) {
                      return o !== i;
                  });
              }),
              n
          );
      }
      he.location = function (e) {
          window.location = e;
      };
      he.env() && (he.location = function () {});
      he.ready = function () {
          (cn = !0), Gi ? yI() : ze.each(Kt, Os), ze.each(Fi, Os), he.resize.up();
      };
      function Os(e) {
          it(e) && e();
      }
      function yI() {
          (Gi = !1), ze.each(jt, bs);
      }
      var Lt;
      he.load = function (e) {
          Lt.then(e);
      };
      function Cs() {
          Lt && (Lt.reject(), Ye.off("load", Lt.resolve)), (Lt = new mt.Deferred()), Ye.on("load", Lt.resolve);
      }
      he.destroy = function (e) {
          (e = e || {}), (Gi = !0), Ye.triggerHandler("__wf_destroy"), e.domready != null && (cn = e.domready), ze.each(jt, As), he.resize.off(), he.scroll.off(), he.redraw.off(), (Kt = []), (Fi = []), Lt.state() === "pending" && Cs();
      };
      mt(he.ready);
      Cs();
      Ns.exports = window.Webflow = he;
  });
  var Ls = u((fW, xs) => {
      var qs = Qe();
      qs.define(
          "brand",
          (xs.exports = function (e) {
              var t = {},
                  r = document,
                  n = e("html"),
                  i = e("body"),
                  o = ".w-webflow-badge",
                  s = window.location,
                  a = /PhantomJS/i.test(navigator.userAgent),
                  c = "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
                  f;
              t.ready = function () {
                  var g = n.attr("data-wf-status"),
                      b = n.attr("data-wf-domain") || "";
                  /\.webflow\.io$/i.test(b) && s.hostname !== b && (g = !0), g && !a && ((f = f || v()), E(), setTimeout(E, 500), e(r).off(c, p).on(c, p));
              };
              function p() {
                  var g = r.fullScreen || r.mozFullScreen || r.webkitIsFullScreen || r.msFullscreenElement || !!r.webkitFullscreenElement;
                  e(f).attr("style", g ? "display: none !important;" : "");
              }
              function E() {
                  var g = i.children(o),
                      b = g.length && g.get(0) === f,
                      S = qs.env("editor");
                  if (b) {
                      S && g.remove();
                      return;
                  }
                  g.length && g.remove(), S || i.append(f);
              }
              return t;
          })
      );
  });
  var Ds = u((dW, Ps) => {
      var Ui = Qe();
      Ui.define(
          "edit",
          (Ps.exports = function (e, t, r) {
              if (((r = r || {}), (Ui.env("test") || Ui.env("frame")) && !r.fixture && !II())) return { exit: 1 };
              var n = {},
                  i = e(window),
                  o = e(document.documentElement),
                  s = document.location,
                  a = "hashchange",
                  c,
                  f = r.load || E,
                  p = !1;
              try {
                  p = localStorage && localStorage.getItem && localStorage.getItem("WebflowEditor");
              } catch {}
              p ? f() : s.search ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) || /\?edit$/.test(s.href)) && f() : i.on(a, v).triggerHandler(a);
              function v() {
                  c || (/\?edit/.test(s.hash) && f());
              }
              function E() {
                  (c = !0),
                      (window.WebflowEditor = !0),
                      i.off(a, v),
                      w(function (N) {
                          e.ajax({ url: A("https://editor-api.webflow.com/api/editor/view"), data: { siteId: o.attr("data-wf-site") }, xhrFields: { withCredentials: !0 }, dataType: "json", crossDomain: !0, success: g(N) });
                      });
              }
              function g(N) {
                  return function (C) {
                      if (!C) {
                          console.error("Could not load editor data");
                          return;
                      }
                      (C.thirdPartyCookiesSupported = N),
                          b(x(C.bugReporterScriptPath), function () {
                              b(x(C.scriptPath), function () {
                                  window.WebflowEditor(C);
                              });
                          });
                  };
              }
              function b(N, C) {
                  e.ajax({ type: "GET", url: N, dataType: "script", cache: !0 }).then(C, S);
              }
              function S(N, C, q) {
                  throw (console.error("Could not load editor script: " + C), q);
              }
              function x(N) {
                  return N.indexOf("//") >= 0 ? N : A("https://editor-api.webflow.com" + N);
              }
              function A(N) {
                  return N.replace(/([^:])\/\//g, "$1/");
              }
              function w(N) {
                  var C = window.document.createElement("iframe");
                  (C.src = "https://webflow.com/site/third-party-cookie-check.html"), (C.style.display = "none"), (C.sandbox = "allow-scripts allow-same-origin");
                  var q = function (G) {
                      G.data === "WF_third_party_cookies_unsupported" ? (m(C, q), N(!1)) : G.data === "WF_third_party_cookies_supported" && (m(C, q), N(!0));
                  };
                  (C.onerror = function () {
                      m(C, q), N(!1);
                  }),
                      window.addEventListener("message", q, !1),
                      window.document.body.appendChild(C);
              }
              function m(N, C) {
                  window.removeEventListener("message", C, !1), N.remove();
              }
              return n;
          })
      );
      function II() {
          try {
              return window.top.__Cypress__;
          } catch {
              return !1;
          }
      }
  });
  var Fs = u((pW, Ms) => {
      var mI = Qe();
      mI.define(
          "focus-visible",
          (Ms.exports = function () {
              function e(r) {
                  var n = !0,
                      i = !1,
                      o = null,
                      s = { text: !0, search: !0, url: !0, tel: !0, email: !0, password: !0, number: !0, date: !0, month: !0, week: !0, time: !0, datetime: !0, "datetime-local": !0 };
                  function a(m) {
                      return !!(m && m !== document && m.nodeName !== "HTML" && m.nodeName !== "BODY" && "classList" in m && "contains" in m.classList);
                  }
                  function c(m) {
                      var N = m.type,
                          C = m.tagName;
                      return !!((C === "INPUT" && s[N] && !m.readOnly) || (C === "TEXTAREA" && !m.readOnly) || m.isContentEditable);
                  }
                  function f(m) {
                      m.getAttribute("data-wf-focus-visible") || m.setAttribute("data-wf-focus-visible", "true");
                  }
                  function p(m) {
                      m.getAttribute("data-wf-focus-visible") && m.removeAttribute("data-wf-focus-visible");
                  }
                  function v(m) {
                      m.metaKey || m.altKey || m.ctrlKey || (a(r.activeElement) && f(r.activeElement), (n = !0));
                  }
                  function E() {
                      n = !1;
                  }
                  function g(m) {
                      a(m.target) && (n || c(m.target)) && f(m.target);
                  }
                  function b(m) {
                      a(m.target) &&
                          m.target.hasAttribute("data-wf-focus-visible") &&
                          ((i = !0),
                          window.clearTimeout(o),
                          (o = window.setTimeout(function () {
                              i = !1;
                          }, 100)),
                          p(m.target));
                  }
                  function S() {
                      document.visibilityState === "hidden" && (i && (n = !0), x());
                  }
                  function x() {
                      document.addEventListener("mousemove", w),
                          document.addEventListener("mousedown", w),
                          document.addEventListener("mouseup", w),
                          document.addEventListener("pointermove", w),
                          document.addEventListener("pointerdown", w),
                          document.addEventListener("pointerup", w),
                          document.addEventListener("touchmove", w),
                          document.addEventListener("touchstart", w),
                          document.addEventListener("touchend", w);
                  }
                  function A() {
                      document.removeEventListener("mousemove", w),
                          document.removeEventListener("mousedown", w),
                          document.removeEventListener("mouseup", w),
                          document.removeEventListener("pointermove", w),
                          document.removeEventListener("pointerdown", w),
                          document.removeEventListener("pointerup", w),
                          document.removeEventListener("touchmove", w),
                          document.removeEventListener("touchstart", w),
                          document.removeEventListener("touchend", w);
                  }
                  function w(m) {
                      (m.target.nodeName && m.target.nodeName.toLowerCase() === "html") || ((n = !1), A());
                  }
                  document.addEventListener("keydown", v, !0),
                      document.addEventListener("mousedown", E, !0),
                      document.addEventListener("pointerdown", E, !0),
                      document.addEventListener("touchstart", E, !0),
                      document.addEventListener("visibilitychange", S, !0),
                      x(),
                      r.addEventListener("focus", g, !0),
                      r.addEventListener("blur", b, !0);
              }
              function t() {
                  if (typeof document < "u")
                      try {
                          document.querySelector(":focus-visible");
                      } catch {
                          e(document);
                      }
              }
              return { ready: t };
          })
      );
  });
  var Us = u((vW, Xs) => {
      var Gs = Qe();
      Gs.define(
          "focus",
          (Xs.exports = function () {
              var e = [],
                  t = !1;
              function r(s) {
                  t && (s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), e.unshift(s));
              }
              function n(s) {
                  var a = s.target,
                      c = a.tagName;
                  return (
                      (/^a$/i.test(c) && a.href != null) ||
                      (/^(button|textarea)$/i.test(c) && a.disabled !== !0) ||
                      (/^input$/i.test(c) && /^(button|reset|submit|radio|checkbox)$/i.test(a.type) && !a.disabled) ||
                      (!/^(button|input|textarea|select|a)$/i.test(c) && !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
                      /^audio$/i.test(c) ||
                      (/^video$/i.test(c) && a.controls === !0)
                  );
              }
              function i(s) {
                  n(s) &&
                      ((t = !0),
                      setTimeout(() => {
                          for (t = !1, s.target.focus(); e.length > 0; ) {
                              var a = e.pop();
                              a.target.dispatchEvent(new MouseEvent(a.type, a));
                          }
                      }, 0));
              }
              function o() {
                  typeof document < "u" &&
                      document.body.hasAttribute("data-wf-focus-within") &&
                      Gs.env.safari &&
                      (document.addEventListener("mousedown", i, !0), document.addEventListener("mouseup", r, !0), document.addEventListener("click", r, !0));
              }
              return { ready: o };
          })
      );
  });
  var Bs = u((hW, Ws) => {
      "use strict";
      var Vi = window.jQuery,
          ot = {},
          ln = [],
          Vs = ".w-ix",
          fn = {
              reset: function (e, t) {
                  t.__wf_intro = null;
              },
              intro: function (e, t) {
                  t.__wf_intro || ((t.__wf_intro = !0), Vi(t).triggerHandler(ot.types.INTRO));
              },
              outro: function (e, t) {
                  t.__wf_intro && ((t.__wf_intro = null), Vi(t).triggerHandler(ot.types.OUTRO));
              },
          };
      ot.triggers = {};
      ot.types = { INTRO: "w-ix-intro" + Vs, OUTRO: "w-ix-outro" + Vs };
      ot.init = function () {
          for (var e = ln.length, t = 0; t < e; t++) {
              var r = ln[t];
              r[0](0, r[1]);
          }
          (ln = []), Vi.extend(ot.triggers, fn);
      };
      ot.async = function () {
          for (var e in fn) {
              var t = fn[e];
              fn.hasOwnProperty(e) &&
                  (ot.triggers[e] = function (r, n) {
                      ln.push([t, n]);
                  });
          }
      };
      ot.async();
      Ws.exports = ot;
  });
  var Bi = u((EW, js) => {
      "use strict";
      var Wi = Bs();
      function Hs(e, t) {
          var r = document.createEvent("CustomEvent");
          r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
      }
      var TI = window.jQuery,
          dn = {},
          ks = ".w-ix",
          OI = {
              reset: function (e, t) {
                  Wi.triggers.reset(e, t);
              },
              intro: function (e, t) {
                  Wi.triggers.intro(e, t), Hs(t, "COMPONENT_ACTIVE");
              },
              outro: function (e, t) {
                  Wi.triggers.outro(e, t), Hs(t, "COMPONENT_INACTIVE");
              },
          };
      dn.triggers = {};
      dn.types = { INTRO: "w-ix-intro" + ks, OUTRO: "w-ix-outro" + ks };
      TI.extend(dn.triggers, OI);
      js.exports = dn;
  });
  var Ks = u((gW, Et) => {
      function Hi(e) {
          return (
              (Et.exports = Hi =
                  typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                      ? function (t) {
                            return typeof t;
                        }
                      : function (t) {
                            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                        }),
              (Et.exports.__esModule = !0),
              (Et.exports.default = Et.exports),
              Hi(e)
          );
      }
      (Et.exports = Hi), (Et.exports.__esModule = !0), (Et.exports.default = Et.exports);
  });
  var zt = u((_W, Sr) => {
      var SI = Ks().default;
      function zs(e) {
          if (typeof WeakMap != "function") return null;
          var t = new WeakMap(),
              r = new WeakMap();
          return (zs = function (i) {
              return i ? r : t;
          })(e);
      }
      function bI(e, t) {
          if (!t && e && e.__esModule) return e;
          if (e === null || (SI(e) !== "object" && typeof e != "function")) return { default: e };
          var r = zs(t);
          if (r && r.has(e)) return r.get(e);
          var n = {},
              i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
              if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
                  var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                  s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
              }
          return (n.default = e), r && r.set(e, n), n;
      }
      (Sr.exports = bI), (Sr.exports.__esModule = !0), (Sr.exports.default = Sr.exports);
  });
  var at = u((yW, br) => {
      function AI(e) {
          return e && e.__esModule ? e : { default: e };
      }
      (br.exports = AI), (br.exports.__esModule = !0), (br.exports.default = br.exports);
  });
  var me = u((IW, Ys) => {
      var pn = function (e) {
          return e && e.Math == Math && e;
      };
      Ys.exports =
          pn(typeof globalThis == "object" && globalThis) ||
          pn(typeof window == "object" && window) ||
          pn(typeof self == "object" && self) ||
          pn(typeof global == "object" && global) ||
          (function () {
              return this;
          })() ||
          Function("return this")();
  });
  var Yt = u((mW, Qs) => {
      Qs.exports = function (e) {
          try {
              return !!e();
          } catch {
              return !0;
          }
      };
  });
  var Pt = u((TW, $s) => {
      var wI = Yt();
      $s.exports = !wI(function () {
          return (
              Object.defineProperty({}, 1, {
                  get: function () {
                      return 7;
                  },
              })[1] != 7
          );
      });
  });
  var vn = u((OW, Zs) => {
      var Ar = Function.prototype.call;
      Zs.exports = Ar.bind
          ? Ar.bind(Ar)
          : function () {
                return Ar.apply(Ar, arguments);
            };
  });
  var ru = u((tu) => {
      "use strict";
      var Js = {}.propertyIsEnumerable,
          eu = Object.getOwnPropertyDescriptor,
          RI = eu && !Js.call({ 1: 2 }, 1);
      tu.f = RI
          ? function (t) {
                var r = eu(this, t);
                return !!r && r.enumerable;
            }
          : Js;
  });
  var ki = u((bW, nu) => {
      nu.exports = function (e, t) {
          return { enumerable: !(e & 1), configurable: !(e & 2), writable: !(e & 4), value: t };
      };
  });
  var $e = u((AW, ou) => {
      var iu = Function.prototype,
          ji = iu.bind,
          Ki = iu.call,
          CI = ji && ji.bind(Ki);
      ou.exports = ji
          ? function (e) {
                return e && CI(Ki, e);
            }
          : function (e) {
                return (
                    e &&
                    function () {
                        return Ki.apply(e, arguments);
                    }
                );
            };
  });
  var uu = u((wW, su) => {
      var au = $e(),
          NI = au({}.toString),
          qI = au("".slice);
      su.exports = function (e) {
          return qI(NI(e), 8, -1);
      };
  });
  var lu = u((RW, cu) => {
      var xI = me(),
          LI = $e(),
          PI = Yt(),
          DI = uu(),
          zi = xI.Object,
          MI = LI("".split);
      cu.exports = PI(function () {
          return !zi("z").propertyIsEnumerable(0);
      })
          ? function (e) {
                return DI(e) == "String" ? MI(e, "") : zi(e);
            }
          : zi;
  });
  var Yi = u((CW, fu) => {
      var FI = me(),
          GI = FI.TypeError;
      fu.exports = function (e) {
          if (e == null) throw GI("Can't call method on " + e);
          return e;
      };
  });
  var wr = u((NW, du) => {
      var XI = lu(),
          UI = Yi();
      du.exports = function (e) {
          return XI(UI(e));
      };
  });
  var st = u((qW, pu) => {
      pu.exports = function (e) {
          return typeof e == "function";
      };
  });
  var Qt = u((xW, vu) => {
      var VI = st();
      vu.exports = function (e) {
          return typeof e == "object" ? e !== null : VI(e);
      };
  });
  var Rr = u((LW, hu) => {
      var Qi = me(),
          WI = st(),
          BI = function (e) {
              return WI(e) ? e : void 0;
          };
      hu.exports = function (e, t) {
          return arguments.length < 2 ? BI(Qi[e]) : Qi[e] && Qi[e][t];
      };
  });
  var gu = u((PW, Eu) => {
      var HI = $e();
      Eu.exports = HI({}.isPrototypeOf);
  });
  var yu = u((DW, _u) => {
      var kI = Rr();
      _u.exports = kI("navigator", "userAgent") || "";
  });
  var Au = u((MW, bu) => {
      var Su = me(),
          $i = yu(),
          Iu = Su.process,
          mu = Su.Deno,
          Tu = (Iu && Iu.versions) || (mu && mu.version),
          Ou = Tu && Tu.v8,
          Ze,
          hn;
      Ou && ((Ze = Ou.split(".")), (hn = Ze[0] > 0 && Ze[0] < 4 ? 1 : +(Ze[0] + Ze[1])));
      !hn && $i && ((Ze = $i.match(/Edge\/(\d+)/)), (!Ze || Ze[1] >= 74) && ((Ze = $i.match(/Chrome\/(\d+)/)), Ze && (hn = +Ze[1])));
      bu.exports = hn;
  });
  var Zi = u((FW, Ru) => {
      var wu = Au(),
          jI = Yt();
      Ru.exports =
          !!Object.getOwnPropertySymbols &&
          !jI(function () {
              var e = Symbol();
              return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && wu && wu < 41);
          });
  });
  var Ji = u((GW, Cu) => {
      var KI = Zi();
      Cu.exports = KI && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var eo = u((XW, Nu) => {
      var zI = me(),
          YI = Rr(),
          QI = st(),
          $I = gu(),
          ZI = Ji(),
          JI = zI.Object;
      Nu.exports = ZI
          ? function (e) {
                return typeof e == "symbol";
            }
          : function (e) {
                var t = YI("Symbol");
                return QI(t) && $I(t.prototype, JI(e));
            };
  });
  var xu = u((UW, qu) => {
      var em = me(),
          tm = em.String;
      qu.exports = function (e) {
          try {
              return tm(e);
          } catch {
              return "Object";
          }
      };
  });
  var Pu = u((VW, Lu) => {
      var rm = me(),
          nm = st(),
          im = xu(),
          om = rm.TypeError;
      Lu.exports = function (e) {
          if (nm(e)) return e;
          throw om(im(e) + " is not a function");
      };
  });
  var Mu = u((WW, Du) => {
      var am = Pu();
      Du.exports = function (e, t) {
          var r = e[t];
          return r == null ? void 0 : am(r);
      };
  });
  var Gu = u((BW, Fu) => {
      var sm = me(),
          to = vn(),
          ro = st(),
          no = Qt(),
          um = sm.TypeError;
      Fu.exports = function (e, t) {
          var r, n;
          if ((t === "string" && ro((r = e.toString)) && !no((n = to(r, e)))) || (ro((r = e.valueOf)) && !no((n = to(r, e)))) || (t !== "string" && ro((r = e.toString)) && !no((n = to(r, e))))) return n;
          throw um("Can't convert object to primitive value");
      };
  });
  var Uu = u((HW, Xu) => {
      Xu.exports = !1;
  });
  var En = u((kW, Wu) => {
      var Vu = me(),
          cm = Object.defineProperty;
      Wu.exports = function (e, t) {
          try {
              cm(Vu, e, { value: t, configurable: !0, writable: !0 });
          } catch {
              Vu[e] = t;
          }
          return t;
      };
  });
  var gn = u((jW, Hu) => {
      var lm = me(),
          fm = En(),
          Bu = "__core-js_shared__",
          dm = lm[Bu] || fm(Bu, {});
      Hu.exports = dm;
  });
  var io = u((KW, ju) => {
      var pm = Uu(),
          ku = gn();
      (ju.exports = function (e, t) {
          return ku[e] || (ku[e] = t !== void 0 ? t : {});
      })("versions", []).push({ version: "3.19.0", mode: pm ? "pure" : "global", copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)" });
  });
  var zu = u((zW, Ku) => {
      var vm = me(),
          hm = Yi(),
          Em = vm.Object;
      Ku.exports = function (e) {
          return Em(hm(e));
      };
  });
  var Tt = u((YW, Yu) => {
      var gm = $e(),
          _m = zu(),
          ym = gm({}.hasOwnProperty);
      Yu.exports =
          Object.hasOwn ||
          function (t, r) {
              return ym(_m(t), r);
          };
  });
  var oo = u((QW, Qu) => {
      var Im = $e(),
          mm = 0,
          Tm = Math.random(),
          Om = Im((1).toString);
      Qu.exports = function (e) {
          return "Symbol(" + (e === void 0 ? "" : e) + ")_" + Om(++mm + Tm, 36);
      };
  });
  var ao = u(($W, tc) => {
      var Sm = me(),
          bm = io(),
          $u = Tt(),
          Am = oo(),
          Zu = Zi(),
          ec = Ji(),
          $t = bm("wks"),
          Dt = Sm.Symbol,
          Ju = Dt && Dt.for,
          wm = ec ? Dt : (Dt && Dt.withoutSetter) || Am;
      tc.exports = function (e) {
          if (!$u($t, e) || !(Zu || typeof $t[e] == "string")) {
              var t = "Symbol." + e;
              Zu && $u(Dt, e) ? ($t[e] = Dt[e]) : ec && Ju ? ($t[e] = Ju(t)) : ($t[e] = wm(t));
          }
          return $t[e];
      };
  });
  var oc = u((ZW, ic) => {
      var Rm = me(),
          Cm = vn(),
          rc = Qt(),
          nc = eo(),
          Nm = Mu(),
          qm = Gu(),
          xm = ao(),
          Lm = Rm.TypeError,
          Pm = xm("toPrimitive");
      ic.exports = function (e, t) {
          if (!rc(e) || nc(e)) return e;
          var r = Nm(e, Pm),
              n;
          if (r) {
              if ((t === void 0 && (t = "default"), (n = Cm(r, e, t)), !rc(n) || nc(n))) return n;
              throw Lm("Can't convert object to primitive value");
          }
          return t === void 0 && (t = "number"), qm(e, t);
      };
  });
  var so = u((JW, ac) => {
      var Dm = oc(),
          Mm = eo();
      ac.exports = function (e) {
          var t = Dm(e, "string");
          return Mm(t) ? t : t + "";
      };
  });
  var co = u((eB, uc) => {
      var Fm = me(),
          sc = Qt(),
          uo = Fm.document,
          Gm = sc(uo) && sc(uo.createElement);
      uc.exports = function (e) {
          return Gm ? uo.createElement(e) : {};
      };
  });
  var lo = u((tB, cc) => {
      var Xm = Pt(),
          Um = Yt(),
          Vm = co();
      cc.exports =
          !Xm &&
          !Um(function () {
              return (
                  Object.defineProperty(Vm("div"), "a", {
                      get: function () {
                          return 7;
                      },
                  }).a != 7
              );
          });
  });
  var fo = u((fc) => {
      var Wm = Pt(),
          Bm = vn(),
          Hm = ru(),
          km = ki(),
          jm = wr(),
          Km = so(),
          zm = Tt(),
          Ym = lo(),
          lc = Object.getOwnPropertyDescriptor;
      fc.f = Wm
          ? lc
          : function (t, r) {
                if (((t = jm(t)), (r = Km(r)), Ym))
                    try {
                        return lc(t, r);
                    } catch {}
                if (zm(t, r)) return km(!Bm(Hm.f, t, r), t[r]);
            };
  });
  var Cr = u((nB, pc) => {
      var dc = me(),
          Qm = Qt(),
          $m = dc.String,
          Zm = dc.TypeError;
      pc.exports = function (e) {
          if (Qm(e)) return e;
          throw Zm($m(e) + " is not an object");
      };
  });
  var Nr = u((Ec) => {
      var Jm = me(),
          eT = Pt(),
          tT = lo(),
          vc = Cr(),
          rT = so(),
          nT = Jm.TypeError,
          hc = Object.defineProperty;
      Ec.f = eT
          ? hc
          : function (t, r, n) {
                if ((vc(t), (r = rT(r)), vc(n), tT))
                    try {
                        return hc(t, r, n);
                    } catch {}
                if ("get" in n || "set" in n) throw nT("Accessors not supported");
                return "value" in n && (t[r] = n.value), t;
            };
  });
  var _n = u((oB, gc) => {
      var iT = Pt(),
          oT = Nr(),
          aT = ki();
      gc.exports = iT
          ? function (e, t, r) {
                return oT.f(e, t, aT(1, r));
            }
          : function (e, t, r) {
                return (e[t] = r), e;
            };
  });
  var vo = u((aB, _c) => {
      var sT = $e(),
          uT = st(),
          po = gn(),
          cT = sT(Function.toString);
      uT(po.inspectSource) ||
          (po.inspectSource = function (e) {
              return cT(e);
          });
      _c.exports = po.inspectSource;
  });
  var mc = u((sB, Ic) => {
      var lT = me(),
          fT = st(),
          dT = vo(),
          yc = lT.WeakMap;
      Ic.exports = fT(yc) && /native code/.test(dT(yc));
  });
  var ho = u((uB, Oc) => {
      var pT = io(),
          vT = oo(),
          Tc = pT("keys");
      Oc.exports = function (e) {
          return Tc[e] || (Tc[e] = vT(e));
      };
  });
  var yn = u((cB, Sc) => {
      Sc.exports = {};
  });
  var Nc = u((lB, Cc) => {
      var hT = mc(),
          Rc = me(),
          Eo = $e(),
          ET = Qt(),
          gT = _n(),
          go = Tt(),
          _o = gn(),
          _T = ho(),
          yT = yn(),
          bc = "Object already initialized",
          Io = Rc.TypeError,
          IT = Rc.WeakMap,
          In,
          qr,
          mn,
          mT = function (e) {
              return mn(e) ? qr(e) : In(e, {});
          },
          TT = function (e) {
              return function (t) {
                  var r;
                  if (!ET(t) || (r = qr(t)).type !== e) throw Io("Incompatible receiver, " + e + " required");
                  return r;
              };
          };
      hT || _o.state
          ? ((Ot = _o.state || (_o.state = new IT())),
            (Ac = Eo(Ot.get)),
            (yo = Eo(Ot.has)),
            (wc = Eo(Ot.set)),
            (In = function (e, t) {
                if (yo(Ot, e)) throw new Io(bc);
                return (t.facade = e), wc(Ot, e, t), t;
            }),
            (qr = function (e) {
                return Ac(Ot, e) || {};
            }),
            (mn = function (e) {
                return yo(Ot, e);
            }))
          : ((Mt = _T("state")),
            (yT[Mt] = !0),
            (In = function (e, t) {
                if (go(e, Mt)) throw new Io(bc);
                return (t.facade = e), gT(e, Mt, t), t;
            }),
            (qr = function (e) {
                return go(e, Mt) ? e[Mt] : {};
            }),
            (mn = function (e) {
                return go(e, Mt);
            }));
      var Ot, Ac, yo, wc, Mt;
      Cc.exports = { set: In, get: qr, has: mn, enforce: mT, getterFor: TT };
  });
  var Lc = u((fB, xc) => {
      var mo = Pt(),
          OT = Tt(),
          qc = Function.prototype,
          ST = mo && Object.getOwnPropertyDescriptor,
          To = OT(qc, "name"),
          bT = To && function () {}.name === "something",
          AT = To && (!mo || (mo && ST(qc, "name").configurable));
      xc.exports = { EXISTS: To, PROPER: bT, CONFIGURABLE: AT };
  });
  var Gc = u((dB, Fc) => {
      var wT = me(),
          Pc = st(),
          RT = Tt(),
          Dc = _n(),
          CT = En(),
          NT = vo(),
          Mc = Nc(),
          qT = Lc().CONFIGURABLE,
          xT = Mc.get,
          LT = Mc.enforce,
          PT = String(String).split("String");
      (Fc.exports = function (e, t, r, n) {
          var i = n ? !!n.unsafe : !1,
              o = n ? !!n.enumerable : !1,
              s = n ? !!n.noTargetGet : !1,
              a = n && n.name !== void 0 ? n.name : t,
              c;
          if (
              (Pc(r) &&
                  (String(a).slice(0, 7) === "Symbol(" && (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
                  (!RT(r, "name") || (qT && r.name !== a)) && Dc(r, "name", a),
                  (c = LT(r)),
                  c.source || (c.source = PT.join(typeof a == "string" ? a : ""))),
              e === wT)
          ) {
              o ? (e[t] = r) : CT(t, r);
              return;
          } else i ? !s && e[t] && (o = !0) : delete e[t];
          o ? (e[t] = r) : Dc(e, t, r);
      })(Function.prototype, "toString", function () {
          return (Pc(this) && xT(this).source) || NT(this);
      });
  });
  var Oo = u((pB, Xc) => {
      var DT = Math.ceil,
          MT = Math.floor;
      Xc.exports = function (e) {
          var t = +e;
          return t !== t || t === 0 ? 0 : (t > 0 ? MT : DT)(t);
      };
  });
  var Vc = u((vB, Uc) => {
      var FT = Oo(),
          GT = Math.max,
          XT = Math.min;
      Uc.exports = function (e, t) {
          var r = FT(e);
          return r < 0 ? GT(r + t, 0) : XT(r, t);
      };
  });
  var Bc = u((hB, Wc) => {
      var UT = Oo(),
          VT = Math.min;
      Wc.exports = function (e) {
          return e > 0 ? VT(UT(e), 9007199254740991) : 0;
      };
  });
  var kc = u((EB, Hc) => {
      var WT = Bc();
      Hc.exports = function (e) {
          return WT(e.length);
      };
  });
  var So = u((gB, Kc) => {
      var BT = wr(),
          HT = Vc(),
          kT = kc(),
          jc = function (e) {
              return function (t, r, n) {
                  var i = BT(t),
                      o = kT(i),
                      s = HT(n, o),
                      a;
                  if (e && r != r) {
                      for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
                  } else for (; o > s; s++) if ((e || s in i) && i[s] === r) return e || s || 0;
                  return !e && -1;
              };
          };
      Kc.exports = { includes: jc(!0), indexOf: jc(!1) };
  });
  var Ao = u((_B, Yc) => {
      var jT = $e(),
          bo = Tt(),
          KT = wr(),
          zT = So().indexOf,
          YT = yn(),
          zc = jT([].push);
      Yc.exports = function (e, t) {
          var r = KT(e),
              n = 0,
              i = [],
              o;
          for (o in r) !bo(YT, o) && bo(r, o) && zc(i, o);
          for (; t.length > n; ) bo(r, (o = t[n++])) && (~zT(i, o) || zc(i, o));
          return i;
      };
  });
  var Tn = u((yB, Qc) => {
      Qc.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  });
  var Zc = u(($c) => {
      var QT = Ao(),
          $T = Tn(),
          ZT = $T.concat("length", "prototype");
      $c.f =
          Object.getOwnPropertyNames ||
          function (t) {
              return QT(t, ZT);
          };
  });
  var el = u((Jc) => {
      Jc.f = Object.getOwnPropertySymbols;
  });
  var rl = u((TB, tl) => {
      var JT = Rr(),
          eO = $e(),
          tO = Zc(),
          rO = el(),
          nO = Cr(),
          iO = eO([].concat);
      tl.exports =
          JT("Reflect", "ownKeys") ||
          function (t) {
              var r = tO.f(nO(t)),
                  n = rO.f;
              return n ? iO(r, n(t)) : r;
          };
  });
  var il = u((OB, nl) => {
      var oO = Tt(),
          aO = rl(),
          sO = fo(),
          uO = Nr();
      nl.exports = function (e, t) {
          for (var r = aO(t), n = uO.f, i = sO.f, o = 0; o < r.length; o++) {
              var s = r[o];
              oO(e, s) || n(e, s, i(t, s));
          }
      };
  });
  var al = u((SB, ol) => {
      var cO = Yt(),
          lO = st(),
          fO = /#|\.prototype\./,
          xr = function (e, t) {
              var r = pO[dO(e)];
              return r == hO ? !0 : r == vO ? !1 : lO(t) ? cO(t) : !!t;
          },
          dO = (xr.normalize = function (e) {
              return String(e).replace(fO, ".").toLowerCase();
          }),
          pO = (xr.data = {}),
          vO = (xr.NATIVE = "N"),
          hO = (xr.POLYFILL = "P");
      ol.exports = xr;
  });
  var ul = u((bB, sl) => {
      var wo = me(),
          EO = fo().f,
          gO = _n(),
          _O = Gc(),
          yO = En(),
          IO = il(),
          mO = al();
      sl.exports = function (e, t) {
          var r = e.target,
              n = e.global,
              i = e.stat,
              o,
              s,
              a,
              c,
              f,
              p;
          if ((n ? (s = wo) : i ? (s = wo[r] || yO(r, {})) : (s = (wo[r] || {}).prototype), s))
              for (a in t) {
                  if (((f = t[a]), e.noTargetGet ? ((p = EO(s, a)), (c = p && p.value)) : (c = s[a]), (o = mO(n ? a : r + (i ? "." : "#") + a, e.forced)), !o && c !== void 0)) {
                      if (typeof f == typeof c) continue;
                      IO(f, c);
                  }
                  (e.sham || (c && c.sham)) && gO(f, "sham", !0), _O(s, a, f, e);
              }
      };
  });
  var ll = u((AB, cl) => {
      var TO = Ao(),
          OO = Tn();
      cl.exports =
          Object.keys ||
          function (t) {
              return TO(t, OO);
          };
  });
  var dl = u((wB, fl) => {
      var SO = Pt(),
          bO = Nr(),
          AO = Cr(),
          wO = wr(),
          RO = ll();
      fl.exports = SO
          ? Object.defineProperties
          : function (t, r) {
                AO(t);
                for (var n = wO(r), i = RO(r), o = i.length, s = 0, a; o > s; ) bO.f(t, (a = i[s++]), n[a]);
                return t;
            };
  });
  var vl = u((RB, pl) => {
      var CO = Rr();
      pl.exports = CO("document", "documentElement");
  });
  var Tl = u((CB, ml) => {
      var NO = Cr(),
          qO = dl(),
          hl = Tn(),
          xO = yn(),
          LO = vl(),
          PO = co(),
          DO = ho(),
          El = ">",
          gl = "<",
          Co = "prototype",
          No = "script",
          yl = DO("IE_PROTO"),
          Ro = function () {},
          Il = function (e) {
              return gl + No + El + e + gl + "/" + No + El;
          },
          _l = function (e) {
              e.write(Il("")), e.close();
              var t = e.parentWindow.Object;
              return (e = null), t;
          },
          MO = function () {
              var e = PO("iframe"),
                  t = "java" + No + ":",
                  r;
              return (e.style.display = "none"), LO.appendChild(e), (e.src = String(t)), (r = e.contentWindow.document), r.open(), r.write(Il("document.F=Object")), r.close(), r.F;
          },
          On,
          Sn = function () {
              try {
                  On = new ActiveXObject("htmlfile");
              } catch {}
              Sn = typeof document < "u" ? (document.domain && On ? _l(On) : MO()) : _l(On);
              for (var e = hl.length; e--; ) delete Sn[Co][hl[e]];
              return Sn();
          };
      xO[yl] = !0;
      ml.exports =
          Object.create ||
          function (t, r) {
              var n;
              return t !== null ? ((Ro[Co] = NO(t)), (n = new Ro()), (Ro[Co] = null), (n[yl] = t)) : (n = Sn()), r === void 0 ? n : qO(n, r);
          };
  });
  var Sl = u((NB, Ol) => {
      var FO = ao(),
          GO = Tl(),
          XO = Nr(),
          qo = FO("unscopables"),
          xo = Array.prototype;
      xo[qo] == null && XO.f(xo, qo, { configurable: !0, value: GO(null) });
      Ol.exports = function (e) {
          xo[qo][e] = !0;
      };
  });
  var bl = u(() => {
      "use strict";
      var UO = ul(),
          VO = So().includes,
          WO = Sl();
      UO(
          { target: "Array", proto: !0 },
          {
              includes: function (t) {
                  return VO(this, t, arguments.length > 1 ? arguments[1] : void 0);
              },
          }
      );
      WO("includes");
  });
  var wl = u((LB, Al) => {
      var BO = me(),
          HO = $e();
      Al.exports = function (e, t) {
          return HO(BO[e].prototype[t]);
      };
  });
  var Cl = u((PB, Rl) => {
      bl();
      var kO = wl();
      Rl.exports = kO("Array", "includes");
  });
  var ql = u((DB, Nl) => {
      var jO = Cl();
      Nl.exports = jO;
  });
  var Ll = u((MB, xl) => {
      var KO = ql();
      xl.exports = KO;
  });
  var Lo = u((FB, Pl) => {
      var zO = typeof global == "object" && global && global.Object === Object && global;
      Pl.exports = zO;
  });
  var Je = u((GB, Dl) => {
      var YO = Lo(),
          QO = typeof self == "object" && self && self.Object === Object && self,
          $O = YO || QO || Function("return this")();
      Dl.exports = $O;
  });
  var Zt = u((XB, Ml) => {
      var ZO = Je(),
          JO = ZO.Symbol;
      Ml.exports = JO;
  });
  var Ul = u((UB, Xl) => {
      var Fl = Zt(),
          Gl = Object.prototype,
          eS = Gl.hasOwnProperty,
          tS = Gl.toString,
          Lr = Fl ? Fl.toStringTag : void 0;
      function rS(e) {
          var t = eS.call(e, Lr),
              r = e[Lr];
          try {
              e[Lr] = void 0;
              var n = !0;
          } catch {}
          var i = tS.call(e);
          return n && (t ? (e[Lr] = r) : delete e[Lr]), i;
      }
      Xl.exports = rS;
  });
  var Wl = u((VB, Vl) => {
      var nS = Object.prototype,
          iS = nS.toString;
      function oS(e) {
          return iS.call(e);
      }
      Vl.exports = oS;
  });
  var St = u((WB, kl) => {
      var Bl = Zt(),
          aS = Ul(),
          sS = Wl(),
          uS = "[object Null]",
          cS = "[object Undefined]",
          Hl = Bl ? Bl.toStringTag : void 0;
      function lS(e) {
          return e == null ? (e === void 0 ? cS : uS) : Hl && Hl in Object(e) ? aS(e) : sS(e);
      }
      kl.exports = lS;
  });
  var Po = u((BB, jl) => {
      function fS(e, t) {
          return function (r) {
              return e(t(r));
          };
      }
      jl.exports = fS;
  });
  var Do = u((HB, Kl) => {
      var dS = Po(),
          pS = dS(Object.getPrototypeOf, Object);
      Kl.exports = pS;
  });
  var gt = u((kB, zl) => {
      function vS(e) {
          return e != null && typeof e == "object";
      }
      zl.exports = vS;
  });
  var Mo = u((jB, Ql) => {
      var hS = St(),
          ES = Do(),
          gS = gt(),
          _S = "[object Object]",
          yS = Function.prototype,
          IS = Object.prototype,
          Yl = yS.toString,
          mS = IS.hasOwnProperty,
          TS = Yl.call(Object);
      function OS(e) {
          if (!gS(e) || hS(e) != _S) return !1;
          var t = ES(e);
          if (t === null) return !0;
          var r = mS.call(t, "constructor") && t.constructor;
          return typeof r == "function" && r instanceof r && Yl.call(r) == TS;
      }
      Ql.exports = OS;
  });
  var $l = u((Fo) => {
      "use strict";
      Object.defineProperty(Fo, "__esModule", { value: !0 });
      Fo.default = SS;
      function SS(e) {
          var t,
              r = e.Symbol;
          return typeof r == "function" ? (r.observable ? (t = r.observable) : ((t = r("observable")), (r.observable = t))) : (t = "@@observable"), t;
      }
  });
  var Zl = u((Xo, Go) => {
      "use strict";
      Object.defineProperty(Xo, "__esModule", { value: !0 });
      var bS = $l(),
          AS = wS(bS);
      function wS(e) {
          return e && e.__esModule ? e : { default: e };
      }
      var Jt;
      typeof self < "u" ? (Jt = self) : typeof window < "u" ? (Jt = window) : typeof global < "u" ? (Jt = global) : typeof Go < "u" ? (Jt = Go) : (Jt = Function("return this")());
      var RS = (0, AS.default)(Jt);
      Xo.default = RS;
  });
  var Uo = u((Pr) => {
      "use strict";
      Pr.__esModule = !0;
      Pr.ActionTypes = void 0;
      Pr.default = rf;
      var CS = Mo(),
          NS = tf(CS),
          qS = Zl(),
          Jl = tf(qS);
      function tf(e) {
          return e && e.__esModule ? e : { default: e };
      }
      var ef = (Pr.ActionTypes = { INIT: "@@redux/INIT" });
      function rf(e, t, r) {
          var n;
          if ((typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)), typeof r < "u")) {
              if (typeof r != "function") throw new Error("Expected the enhancer to be a function.");
              return r(rf)(e, t);
          }
          if (typeof e != "function") throw new Error("Expected the reducer to be a function.");
          var i = e,
              o = t,
              s = [],
              a = s,
              c = !1;
          function f() {
              a === s && (a = s.slice());
          }
          function p() {
              return o;
          }
          function v(S) {
              if (typeof S != "function") throw new Error("Expected listener to be a function.");
              var x = !0;
              return (
                  f(),
                  a.push(S),
                  function () {
                      if (x) {
                          (x = !1), f();
                          var w = a.indexOf(S);
                          a.splice(w, 1);
                      }
                  }
              );
          }
          function E(S) {
              if (!(0, NS.default)(S)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
              if (typeof S.type > "u") throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
              if (c) throw new Error("Reducers may not dispatch actions.");
              try {
                  (c = !0), (o = i(o, S));
              } finally {
                  c = !1;
              }
              for (var x = (s = a), A = 0; A < x.length; A++) x[A]();
              return S;
          }
          function g(S) {
              if (typeof S != "function") throw new Error("Expected the nextReducer to be a function.");
              (i = S), E({ type: ef.INIT });
          }
          function b() {
              var S,
                  x = v;
              return (
                  (S = {
                      subscribe: function (w) {
                          if (typeof w != "object") throw new TypeError("Expected the observer to be an object.");
                          function m() {
                              w.next && w.next(p());
                          }
                          m();
                          var N = x(m);
                          return { unsubscribe: N };
                      },
                  }),
                  (S[Jl.default] = function () {
                      return this;
                  }),
                  S
              );
          }
          return E({ type: ef.INIT }), (n = { dispatch: E, subscribe: v, getState: p, replaceReducer: g }), (n[Jl.default] = b), n;
      }
  });
  var Wo = u((Vo) => {
      "use strict";
      Vo.__esModule = !0;
      Vo.default = xS;
      function xS(e) {
          typeof console < "u" && typeof console.error == "function" && console.error(e);
          try {
              throw new Error(e);
          } catch {}
      }
  });
  var af = u((Bo) => {
      "use strict";
      Bo.__esModule = !0;
      Bo.default = FS;
      var nf = Uo(),
          LS = Mo(),
          QB = of(LS),
          PS = Wo(),
          $B = of(PS);
      function of(e) {
          return e && e.__esModule ? e : { default: e };
      }
      function DS(e, t) {
          var r = t && t.type,
              n = (r && '"' + r.toString() + '"') || "an action";
          return "Given action " + n + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state.';
      }
      function MS(e) {
          Object.keys(e).forEach(function (t) {
              var r = e[t],
                  n = r(void 0, { type: nf.ActionTypes.INIT });
              if (typeof n > "u")
                  throw new Error('Reducer "' + t + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
              var i = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
              if (typeof r(void 0, { type: i }) > "u")
                  throw new Error(
                      'Reducer "' +
                          t +
                          '" returned undefined when probed with a random type. ' +
                          ("Don't try to handle " + nf.ActionTypes.INIT + ' or other actions in "redux/*" ') +
                          "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
                  );
          });
      }
      function FS(e) {
          for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
              var i = t[n];
              typeof e[i] == "function" && (r[i] = e[i]);
          }
          var o = Object.keys(r);
          if (!1) var s;
          var a;
          try {
              MS(r);
          } catch (c) {
              a = c;
          }
          return function () {
              var f = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0],
                  p = arguments[1];
              if (a) throw a;
              if (!1) var v;
              for (var E = !1, g = {}, b = 0; b < o.length; b++) {
                  var S = o[b],
                      x = r[S],
                      A = f[S],
                      w = x(A, p);
                  if (typeof w > "u") {
                      var m = DS(S, p);
                      throw new Error(m);
                  }
                  (g[S] = w), (E = E || w !== A);
              }
              return E ? g : f;
          };
      }
  });
  var uf = u((Ho) => {
      "use strict";
      Ho.__esModule = !0;
      Ho.default = GS;
      function sf(e, t) {
          return function () {
              return t(e.apply(void 0, arguments));
          };
      }
      function GS(e, t) {
          if (typeof e == "function") return sf(e, t);
          if (typeof e != "object" || e === null)
              throw new Error("bindActionCreators expected an object or a function, instead received " + (e === null ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
          for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
              var o = r[i],
                  s = e[o];
              typeof s == "function" && (n[o] = sf(s, t));
          }
          return n;
      }
  });
  var jo = u((ko) => {
      "use strict";
      ko.__esModule = !0;
      ko.default = XS;
      function XS() {
          for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          if (t.length === 0)
              return function (o) {
                  return o;
              };
          if (t.length === 1) return t[0];
          var n = t[t.length - 1],
              i = t.slice(0, -1);
          return function () {
              return i.reduceRight(function (o, s) {
                  return s(o);
              }, n.apply(void 0, arguments));
          };
      }
  });
  var cf = u((Ko) => {
      "use strict";
      Ko.__esModule = !0;
      var US =
          Object.assign ||
          function (e) {
              for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
          };
      Ko.default = HS;
      var VS = jo(),
          WS = BS(VS);
      function BS(e) {
          return e && e.__esModule ? e : { default: e };
      }
      function HS() {
          for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          return function (n) {
              return function (i, o, s) {
                  var a = n(i, o, s),
                      c = a.dispatch,
                      f = [],
                      p = {
                          getState: a.getState,
                          dispatch: function (E) {
                              return c(E);
                          },
                      };
                  return (
                      (f = t.map(function (v) {
                          return v(p);
                      })),
                      (c = WS.default.apply(void 0, f)(a.dispatch)),
                      US({}, a, { dispatch: c })
                  );
              };
          };
      }
  });
  var zo = u((He) => {
      "use strict";
      He.__esModule = !0;
      He.compose = He.applyMiddleware = He.bindActionCreators = He.combineReducers = He.createStore = void 0;
      var kS = Uo(),
          jS = er(kS),
          KS = af(),
          zS = er(KS),
          YS = uf(),
          QS = er(YS),
          $S = cf(),
          ZS = er($S),
          JS = jo(),
          eb = er(JS),
          tb = Wo(),
          rH = er(tb);
      function er(e) {
          return e && e.__esModule ? e : { default: e };
      }
      He.createStore = jS.default;
      He.combineReducers = zS.default;
      He.bindActionCreators = QS.default;
      He.applyMiddleware = ZS.default;
      He.compose = eb.default;
  });
  var lf = u((Ne) => {
      "use strict";
      Object.defineProperty(Ne, "__esModule", { value: !0 });
      Ne.QuickEffectIds = Ne.QuickEffectDirectionConsts = Ne.EventTypeConsts = Ne.EventLimitAffectedElements = Ne.EventContinuousMouseAxes = Ne.EventBasedOn = Ne.EventAppliesTo = void 0;
      var rb = {
          NAVBAR_OPEN: "NAVBAR_OPEN",
          NAVBAR_CLOSE: "NAVBAR_CLOSE",
          TAB_ACTIVE: "TAB_ACTIVE",
          TAB_INACTIVE: "TAB_INACTIVE",
          SLIDER_ACTIVE: "SLIDER_ACTIVE",
          SLIDER_INACTIVE: "SLIDER_INACTIVE",
          DROPDOWN_OPEN: "DROPDOWN_OPEN",
          DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
          MOUSE_CLICK: "MOUSE_CLICK",
          MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
          MOUSE_DOWN: "MOUSE_DOWN",
          MOUSE_UP: "MOUSE_UP",
          MOUSE_OVER: "MOUSE_OVER",
          MOUSE_OUT: "MOUSE_OUT",
          MOUSE_MOVE: "MOUSE_MOVE",
          MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
          SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
          SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
          SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
          ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
          ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
          PAGE_START: "PAGE_START",
          PAGE_FINISH: "PAGE_FINISH",
          PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
          PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
          PAGE_SCROLL: "PAGE_SCROLL",
      };
      Ne.EventTypeConsts = rb;
      var nb = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
      Ne.EventAppliesTo = nb;
      var ib = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
      Ne.EventBasedOn = ib;
      var ob = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
      Ne.EventContinuousMouseAxes = ob;
      var ab = { CHILDREN: "CHILDREN", SIBLINGS: "SIBLINGS", IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN" };
      Ne.EventLimitAffectedElements = ab;
      var sb = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
      };
      Ne.QuickEffectIds = sb;
      var ub = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
      };
      Ne.QuickEffectDirectionConsts = ub;
  });
  var Yo = u((tr) => {
      "use strict";
      Object.defineProperty(tr, "__esModule", { value: !0 });
      tr.ActionTypeConsts = tr.ActionAppliesTo = void 0;
      var cb = {
          TRANSFORM_MOVE: "TRANSFORM_MOVE",
          TRANSFORM_SCALE: "TRANSFORM_SCALE",
          TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
          TRANSFORM_SKEW: "TRANSFORM_SKEW",
          STYLE_OPACITY: "STYLE_OPACITY",
          STYLE_SIZE: "STYLE_SIZE",
          STYLE_FILTER: "STYLE_FILTER",
          STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
          STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
          STYLE_BORDER: "STYLE_BORDER",
          STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
          PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
          GENERAL_DISPLAY: "GENERAL_DISPLAY",
          GENERAL_START_ACTION: "GENERAL_START_ACTION",
          GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
          GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
          GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
          GENERAL_LOOP: "GENERAL_LOOP",
          STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      };
      tr.ActionTypeConsts = cb;
      var lb = { ELEMENT: "ELEMENT", ELEMENT_CLASS: "ELEMENT_CLASS", TRIGGER_ELEMENT: "TRIGGER_ELEMENT" };
      tr.ActionAppliesTo = lb;
  });
  var ff = u((bn) => {
      "use strict";
      Object.defineProperty(bn, "__esModule", { value: !0 });
      bn.InteractionTypeConsts = void 0;
      var fb = {
          MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
          MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
          MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
          SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
          SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
          MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
          PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
          PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
          PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
          NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
          DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
          ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
          TAB_INTERACTION: "TAB_INTERACTION",
          SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
      bn.InteractionTypeConsts = fb;
  });
  var df = u((An) => {
      "use strict";
      Object.defineProperty(An, "__esModule", { value: !0 });
      An.ReducedMotionTypes = void 0;
      var db = Yo(),
          { TRANSFORM_MOVE: pb, TRANSFORM_SCALE: vb, TRANSFORM_ROTATE: hb, TRANSFORM_SKEW: Eb, STYLE_SIZE: gb, STYLE_FILTER: _b, STYLE_FONT_VARIATION: yb } = db.ActionTypeConsts,
          Ib = { [pb]: !0, [vb]: !0, [hb]: !0, [Eb]: !0, [gb]: !0, [_b]: !0, [yb]: !0 };
      An.ReducedMotionTypes = Ib;
  });
  var pf = u((ae) => {
      "use strict";
      Object.defineProperty(ae, "__esModule", { value: !0 });
      ae.IX2_VIEWPORT_WIDTH_CHANGED = ae.IX2_TEST_FRAME_RENDERED = ae.IX2_STOP_REQUESTED = ae.IX2_SESSION_STOPPED = ae.IX2_SESSION_STARTED = ae.IX2_SESSION_INITIALIZED = ae.IX2_RAW_DATA_IMPORTED = ae.IX2_PREVIEW_REQUESTED = ae.IX2_PLAYBACK_REQUESTED = ae.IX2_PARAMETER_CHANGED = ae.IX2_MEDIA_QUERIES_DEFINED = ae.IX2_INSTANCE_STARTED = ae.IX2_INSTANCE_REMOVED = ae.IX2_INSTANCE_ADDED = ae.IX2_EVENT_STATE_CHANGED = ae.IX2_EVENT_LISTENER_ADDED = ae.IX2_ELEMENT_STATE_CHANGED = ae.IX2_CLEAR_REQUESTED = ae.IX2_ANIMATION_FRAME_CHANGED = ae.IX2_ACTION_LIST_PLAYBACK_CHANGED = void 0;
      var mb = "IX2_RAW_DATA_IMPORTED";
      ae.IX2_RAW_DATA_IMPORTED = mb;
      var Tb = "IX2_SESSION_INITIALIZED";
      ae.IX2_SESSION_INITIALIZED = Tb;
      var Ob = "IX2_SESSION_STARTED";
      ae.IX2_SESSION_STARTED = Ob;
      var Sb = "IX2_SESSION_STOPPED";
      ae.IX2_SESSION_STOPPED = Sb;
      var bb = "IX2_PREVIEW_REQUESTED";
      ae.IX2_PREVIEW_REQUESTED = bb;
      var Ab = "IX2_PLAYBACK_REQUESTED";
      ae.IX2_PLAYBACK_REQUESTED = Ab;
      var wb = "IX2_STOP_REQUESTED";
      ae.IX2_STOP_REQUESTED = wb;
      var Rb = "IX2_CLEAR_REQUESTED";
      ae.IX2_CLEAR_REQUESTED = Rb;
      var Cb = "IX2_EVENT_LISTENER_ADDED";
      ae.IX2_EVENT_LISTENER_ADDED = Cb;
      var Nb = "IX2_EVENT_STATE_CHANGED";
      ae.IX2_EVENT_STATE_CHANGED = Nb;
      var qb = "IX2_ANIMATION_FRAME_CHANGED";
      ae.IX2_ANIMATION_FRAME_CHANGED = qb;
      var xb = "IX2_PARAMETER_CHANGED";
      ae.IX2_PARAMETER_CHANGED = xb;
      var Lb = "IX2_INSTANCE_ADDED";
      ae.IX2_INSTANCE_ADDED = Lb;
      var Pb = "IX2_INSTANCE_STARTED";
      ae.IX2_INSTANCE_STARTED = Pb;
      var Db = "IX2_INSTANCE_REMOVED";
      ae.IX2_INSTANCE_REMOVED = Db;
      var Mb = "IX2_ELEMENT_STATE_CHANGED";
      ae.IX2_ELEMENT_STATE_CHANGED = Mb;
      var Fb = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
      ae.IX2_ACTION_LIST_PLAYBACK_CHANGED = Fb;
      var Gb = "IX2_VIEWPORT_WIDTH_CHANGED";
      ae.IX2_VIEWPORT_WIDTH_CHANGED = Gb;
      var Xb = "IX2_MEDIA_QUERIES_DEFINED";
      ae.IX2_MEDIA_QUERIES_DEFINED = Xb;
      var Ub = "IX2_TEST_FRAME_RENDERED";
      ae.IX2_TEST_FRAME_RENDERED = Ub;
  });
  var vf = u((R) => {
      "use strict";
      Object.defineProperty(R, "__esModule", { value: !0 });
      R.W_MOD_JS = R.W_MOD_IX = R.WILL_CHANGE = R.WIDTH = R.WF_PAGE = R.TRANSLATE_Z = R.TRANSLATE_Y = R.TRANSLATE_X = R.TRANSLATE_3D = R.TRANSFORM = R.SKEW_Y = R.SKEW_X = R.SKEW = R.SIBLINGS = R.SCALE_Z = R.SCALE_Y = R.SCALE_X = R.SCALE_3D = R.ROTATE_Z = R.ROTATE_Y = R.ROTATE_X = R.RENDER_TRANSFORM = R.RENDER_STYLE = R.RENDER_PLUGIN = R.RENDER_GENERAL = R.PRESERVE_3D = R.PLAIN_OBJECT = R.PARENT = R.OPACITY = R.IX2_ID_DELIMITER = R.IMMEDIATE_CHILDREN = R.HTML_ELEMENT = R.HEIGHT = R.FONT_VARIATION_SETTINGS = R.FLEX = R.FILTER = R.DISPLAY = R.CONFIG_Z_VALUE = R.CONFIG_Z_UNIT = R.CONFIG_Y_VALUE = R.CONFIG_Y_UNIT = R.CONFIG_X_VALUE = R.CONFIG_X_UNIT = R.CONFIG_VALUE = R.CONFIG_UNIT = R.COMMA_DELIMITER = R.COLOR = R.COLON_DELIMITER = R.CHILDREN = R.BOUNDARY_SELECTOR = R.BORDER_COLOR = R.BAR_DELIMITER = R.BACKGROUND_COLOR = R.BACKGROUND = R.AUTO = R.ABSTRACT_NODE = void 0;
      var Vb = "|";
      R.IX2_ID_DELIMITER = Vb;
      var Wb = "data-wf-page";
      R.WF_PAGE = Wb;
      var Bb = "w-mod-js";
      R.W_MOD_JS = Bb;
      var Hb = "w-mod-ix";
      R.W_MOD_IX = Hb;
      var kb = ".w-dyn-item";
      R.BOUNDARY_SELECTOR = kb;
      var jb = "xValue";
      R.CONFIG_X_VALUE = jb;
      var Kb = "yValue";
      R.CONFIG_Y_VALUE = Kb;
      var zb = "zValue";
      R.CONFIG_Z_VALUE = zb;
      var Yb = "value";
      R.CONFIG_VALUE = Yb;
      var Qb = "xUnit";
      R.CONFIG_X_UNIT = Qb;
      var $b = "yUnit";
      R.CONFIG_Y_UNIT = $b;
      var Zb = "zUnit";
      R.CONFIG_Z_UNIT = Zb;
      var Jb = "unit";
      R.CONFIG_UNIT = Jb;
      var eA = "transform";
      R.TRANSFORM = eA;
      var tA = "translateX";
      R.TRANSLATE_X = tA;
      var rA = "translateY";
      R.TRANSLATE_Y = rA;
      var nA = "translateZ";
      R.TRANSLATE_Z = nA;
      var iA = "translate3d";
      R.TRANSLATE_3D = iA;
      var oA = "scaleX";
      R.SCALE_X = oA;
      var aA = "scaleY";
      R.SCALE_Y = aA;
      var sA = "scaleZ";
      R.SCALE_Z = sA;
      var uA = "scale3d";
      R.SCALE_3D = uA;
      var cA = "rotateX";
      R.ROTATE_X = cA;
      var lA = "rotateY";
      R.ROTATE_Y = lA;
      var fA = "rotateZ";
      R.ROTATE_Z = fA;
      var dA = "skew";
      R.SKEW = dA;
      var pA = "skewX";
      R.SKEW_X = pA;
      var vA = "skewY";
      R.SKEW_Y = vA;
      var hA = "opacity";
      R.OPACITY = hA;
      var EA = "filter";
      R.FILTER = EA;
      var gA = "font-variation-settings";
      R.FONT_VARIATION_SETTINGS = gA;
      var _A = "width";
      R.WIDTH = _A;
      var yA = "height";
      R.HEIGHT = yA;
      var IA = "backgroundColor";
      R.BACKGROUND_COLOR = IA;
      var mA = "background";
      R.BACKGROUND = mA;
      var TA = "borderColor";
      R.BORDER_COLOR = TA;
      var OA = "color";
      R.COLOR = OA;
      var SA = "display";
      R.DISPLAY = SA;
      var bA = "flex";
      R.FLEX = bA;
      var AA = "willChange";
      R.WILL_CHANGE = AA;
      var wA = "AUTO";
      R.AUTO = wA;
      var RA = ",";
      R.COMMA_DELIMITER = RA;
      var CA = ":";
      R.COLON_DELIMITER = CA;
      var NA = "|";
      R.BAR_DELIMITER = NA;
      var qA = "CHILDREN";
      R.CHILDREN = qA;
      var xA = "IMMEDIATE_CHILDREN";
      R.IMMEDIATE_CHILDREN = xA;
      var LA = "SIBLINGS";
      R.SIBLINGS = LA;
      var PA = "PARENT";
      R.PARENT = PA;
      var DA = "preserve-3d";
      R.PRESERVE_3D = DA;
      var MA = "HTML_ELEMENT";
      R.HTML_ELEMENT = MA;
      var FA = "PLAIN_OBJECT";
      R.PLAIN_OBJECT = FA;
      var GA = "ABSTRACT_NODE";
      R.ABSTRACT_NODE = GA;
      var XA = "RENDER_TRANSFORM";
      R.RENDER_TRANSFORM = XA;
      var UA = "RENDER_GENERAL";
      R.RENDER_GENERAL = UA;
      var VA = "RENDER_STYLE";
      R.RENDER_STYLE = VA;
      var WA = "RENDER_PLUGIN";
      R.RENDER_PLUGIN = WA;
  });
  var Ve = u((we) => {
      "use strict";
      var hf = zt().default;
      Object.defineProperty(we, "__esModule", { value: !0 });
      var wn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
      we.IX2EngineConstants = we.IX2EngineActionTypes = void 0;
      var Qo = lf();
      Object.keys(Qo).forEach(function (e) {
          e === "default" ||
              e === "__esModule" ||
              Object.prototype.hasOwnProperty.call(wn, e) ||
              (e in we && we[e] === Qo[e]) ||
              Object.defineProperty(we, e, {
                  enumerable: !0,
                  get: function () {
                      return Qo[e];
                  },
              });
      });
      var $o = Yo();
      Object.keys($o).forEach(function (e) {
          e === "default" ||
              e === "__esModule" ||
              Object.prototype.hasOwnProperty.call(wn, e) ||
              (e in we && we[e] === $o[e]) ||
              Object.defineProperty(we, e, {
                  enumerable: !0,
                  get: function () {
                      return $o[e];
                  },
              });
      });
      var Zo = ff();
      Object.keys(Zo).forEach(function (e) {
          e === "default" ||
              e === "__esModule" ||
              Object.prototype.hasOwnProperty.call(wn, e) ||
              (e in we && we[e] === Zo[e]) ||
              Object.defineProperty(we, e, {
                  enumerable: !0,
                  get: function () {
                      return Zo[e];
                  },
              });
      });
      var Jo = df();
      Object.keys(Jo).forEach(function (e) {
          e === "default" ||
              e === "__esModule" ||
              Object.prototype.hasOwnProperty.call(wn, e) ||
              (e in we && we[e] === Jo[e]) ||
              Object.defineProperty(we, e, {
                  enumerable: !0,
                  get: function () {
                      return Jo[e];
                  },
              });
      });
      var BA = hf(pf());
      we.IX2EngineActionTypes = BA;
      var HA = hf(vf());
      we.IX2EngineConstants = HA;
  });
  var Ef = u((Rn) => {
      "use strict";
      Object.defineProperty(Rn, "__esModule", { value: !0 });
      Rn.ixData = void 0;
      var kA = Ve(),
          { IX2_RAW_DATA_IMPORTED: jA } = kA.IX2EngineActionTypes,
          KA = (e = Object.freeze({}), t) => {
              switch (t.type) {
                  case jA:
                      return t.payload.ixData || Object.freeze({});
                  default:
                      return e;
              }
          };
      Rn.ixData = KA;
  });
  var Dr = u((dH, _t) => {
      function ea() {
          return (
              (_t.exports = ea = Object.assign
                  ? Object.assign.bind()
                  : function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = arguments[t];
                            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                        }
                        return e;
                    }),
              (_t.exports.__esModule = !0),
              (_t.exports.default = _t.exports),
              ea.apply(this, arguments)
          );
      }
      (_t.exports = ea), (_t.exports.__esModule = !0), (_t.exports.default = _t.exports);
  });
  var rr = u((Oe) => {
      "use strict";
      Object.defineProperty(Oe, "__esModule", { value: !0 });
      var zA =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (e) {
                    return typeof e;
                }
              : function (e) {
                    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                };
      Oe.clone = Nn;
      Oe.addLast = yf;
      Oe.addFirst = If;
      Oe.removeLast = mf;
      Oe.removeFirst = Tf;
      Oe.insert = Of;
      Oe.removeAt = Sf;
      Oe.replaceAt = bf;
      Oe.getIn = qn;
      Oe.set = xn;
      Oe.setIn = Ln;
      Oe.update = wf;
      Oe.updateIn = Rf;
      Oe.merge = Cf;
      Oe.mergeDeep = Nf;
      Oe.mergeIn = qf;
      Oe.omit = xf;
      Oe.addDefaults = Lf;
      var gf = "INVALID_ARGS";
      function _f(e) {
          throw new Error(e);
      }
      function ta(e) {
          var t = Object.keys(e);
          return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(e)) : t;
      }
      var YA = {}.hasOwnProperty;
      function Nn(e) {
          if (Array.isArray(e)) return e.slice();
          for (var t = ta(e), r = {}, n = 0; n < t.length; n++) {
              var i = t[n];
              r[i] = e[i];
          }
          return r;
      }
      function We(e, t, r) {
          var n = r;
          n == null && _f(gf);
          for (var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3; a < o; a++) s[a - 3] = arguments[a];
          for (var c = 0; c < s.length; c++) {
              var f = s[c];
              if (f != null) {
                  var p = ta(f);
                  if (p.length)
                      for (var v = 0; v <= p.length; v++) {
                          var E = p[v];
                          if (!(e && n[E] !== void 0)) {
                              var g = f[E];
                              t && Cn(n[E]) && Cn(g) && (g = We(e, t, n[E], g)), !(g === void 0 || g === n[E]) && (i || ((i = !0), (n = Nn(n))), (n[E] = g));
                          }
                      }
              }
          }
          return n;
      }
      function Cn(e) {
          var t = typeof e > "u" ? "undefined" : zA(e);
          return e != null && (t === "object" || t === "function");
      }
      function yf(e, t) {
          return Array.isArray(t) ? e.concat(t) : e.concat([t]);
      }
      function If(e, t) {
          return Array.isArray(t) ? t.concat(e) : [t].concat(e);
      }
      function mf(e) {
          return e.length ? e.slice(0, e.length - 1) : e;
      }
      function Tf(e) {
          return e.length ? e.slice(1) : e;
      }
      function Of(e, t, r) {
          return e
              .slice(0, t)
              .concat(Array.isArray(r) ? r : [r])
              .concat(e.slice(t));
      }
      function Sf(e, t) {
          return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
      }
      function bf(e, t, r) {
          if (e[t] === r) return e;
          for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
          return (i[t] = r), i;
      }
      function qn(e, t) {
          if ((!Array.isArray(t) && _f(gf), e != null)) {
              for (var r = e, n = 0; n < t.length; n++) {
                  var i = t[n];
                  if (((r = r?.[i]), r === void 0)) return r;
              }
              return r;
          }
      }
      function xn(e, t, r) {
          var n = typeof t == "number" ? [] : {},
              i = e ?? n;
          if (i[t] === r) return i;
          var o = Nn(i);
          return (o[t] = r), o;
      }
      function Af(e, t, r, n) {
          var i = void 0,
              o = t[n];
          if (n === t.length - 1) i = r;
          else {
              var s = Cn(e) && Cn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
              i = Af(s, t, r, n + 1);
          }
          return xn(e, o, i);
      }
      function Ln(e, t, r) {
          return t.length ? Af(e, t, r, 0) : r;
      }
      function wf(e, t, r) {
          var n = e?.[t],
              i = r(n);
          return xn(e, t, i);
      }
      function Rf(e, t, r) {
          var n = qn(e, t),
              i = r(n);
          return Ln(e, t, i);
      }
      function Cf(e, t, r, n, i, o) {
          for (var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6; c < s; c++) a[c - 6] = arguments[c];
          return a.length ? We.call.apply(We, [null, !1, !1, e, t, r, n, i, o].concat(a)) : We(!1, !1, e, t, r, n, i, o);
      }
      function Nf(e, t, r, n, i, o) {
          for (var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6; c < s; c++) a[c - 6] = arguments[c];
          return a.length ? We.call.apply(We, [null, !1, !0, e, t, r, n, i, o].concat(a)) : We(!1, !0, e, t, r, n, i, o);
      }
      function qf(e, t, r, n, i, o, s) {
          var a = qn(e, t);
          a == null && (a = {});
          for (var c = void 0, f = arguments.length, p = Array(f > 7 ? f - 7 : 0), v = 7; v < f; v++) p[v - 7] = arguments[v];
          return p.length ? (c = We.call.apply(We, [null, !1, !1, a, r, n, i, o, s].concat(p))) : (c = We(!1, !1, a, r, n, i, o, s)), Ln(e, t, c);
      }
      function xf(e, t) {
          for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
              if (YA.call(e, r[i])) {
                  n = !0;
                  break;
              }
          if (!n) return e;
          for (var o = {}, s = ta(e), a = 0; a < s.length; a++) {
              var c = s[a];
              r.indexOf(c) >= 0 || (o[c] = e[c]);
          }
          return o;
      }
      function Lf(e, t, r, n, i, o) {
          for (var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6; c < s; c++) a[c - 6] = arguments[c];
          return a.length ? We.call.apply(We, [null, !0, !1, e, t, r, n, i, o].concat(a)) : We(!0, !1, e, t, r, n, i, o);
      }
      var QA = {
          clone: Nn,
          addLast: yf,
          addFirst: If,
          removeLast: mf,
          removeFirst: Tf,
          insert: Of,
          removeAt: Sf,
          replaceAt: bf,
          getIn: qn,
          set: xn,
          setIn: Ln,
          update: wf,
          updateIn: Rf,
          merge: Cf,
          mergeDeep: Nf,
          mergeIn: qf,
          omit: xf,
          addDefaults: Lf,
      };
      Oe.default = QA;
  });
  var Df = u((Pn) => {
      "use strict";
      var $A = at().default;
      Object.defineProperty(Pn, "__esModule", { value: !0 });
      Pn.ixRequest = void 0;
      var ZA = $A(Dr()),
          JA = Ve(),
          e0 = rr(),
          { IX2_PREVIEW_REQUESTED: t0, IX2_PLAYBACK_REQUESTED: r0, IX2_STOP_REQUESTED: n0, IX2_CLEAR_REQUESTED: i0 } = JA.IX2EngineActionTypes,
          o0 = { preview: {}, playback: {}, stop: {}, clear: {} },
          Pf = Object.create(null, { [t0]: { value: "preview" }, [r0]: { value: "playback" }, [n0]: { value: "stop" }, [i0]: { value: "clear" } }),
          a0 = (e = o0, t) => {
              if (t.type in Pf) {
                  let r = [Pf[t.type]];
                  return (0, e0.setIn)(e, [r], (0, ZA.default)({}, t.payload));
              }
              return e;
          };
      Pn.ixRequest = a0;
  });
  var Ff = u((Dn) => {
      "use strict";
      Object.defineProperty(Dn, "__esModule", { value: !0 });
      Dn.ixSession = void 0;
      var s0 = Ve(),
          ut = rr(),
          {
              IX2_SESSION_INITIALIZED: u0,
              IX2_SESSION_STARTED: c0,
              IX2_TEST_FRAME_RENDERED: l0,
              IX2_SESSION_STOPPED: f0,
              IX2_EVENT_LISTENER_ADDED: d0,
              IX2_EVENT_STATE_CHANGED: p0,
              IX2_ANIMATION_FRAME_CHANGED: v0,
              IX2_ACTION_LIST_PLAYBACK_CHANGED: h0,
              IX2_VIEWPORT_WIDTH_CHANGED: E0,
              IX2_MEDIA_QUERIES_DEFINED: g0,
          } = s0.IX2EngineActionTypes,
          Mf = { active: !1, tick: 0, eventListeners: [], eventState: {}, playbackState: {}, viewportWidth: 0, mediaQueryKey: null, hasBoundaryNodes: !1, hasDefinedMediaQueries: !1, reducedMotion: !1 },
          _0 = 20,
          y0 = (e = Mf, t) => {
              switch (t.type) {
                  case u0: {
                      let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
                      return (0, ut.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
                  }
                  case c0:
                      return (0, ut.set)(e, "active", !0);
                  case l0: {
                      let {
                          payload: { step: r = _0 },
                      } = t;
                      return (0, ut.set)(e, "tick", e.tick + r);
                  }
                  case f0:
                      return Mf;
                  case v0: {
                      let {
                          payload: { now: r },
                      } = t;
                      return (0, ut.set)(e, "tick", r);
                  }
                  case d0: {
                      let r = (0, ut.addLast)(e.eventListeners, t.payload);
                      return (0, ut.set)(e, "eventListeners", r);
                  }
                  case p0: {
                      let { stateKey: r, newState: n } = t.payload;
                      return (0, ut.setIn)(e, ["eventState", r], n);
                  }
                  case h0: {
                      let { actionListId: r, isPlaying: n } = t.payload;
                      return (0, ut.setIn)(e, ["playbackState", r], n);
                  }
                  case E0: {
                      let { width: r, mediaQueries: n } = t.payload,
                          i = n.length,
                          o = null;
                      for (let s = 0; s < i; s++) {
                          let { key: a, min: c, max: f } = n[s];
                          if (r >= c && r <= f) {
                              o = a;
                              break;
                          }
                      }
                      return (0, ut.merge)(e, { viewportWidth: r, mediaQueryKey: o });
                  }
                  case g0:
                      return (0, ut.set)(e, "hasDefinedMediaQueries", !0);
                  default:
                      return e;
              }
          };
      Dn.ixSession = y0;
  });
  var Xf = u((EH, Gf) => {
      function I0() {
          (this.__data__ = []), (this.size = 0);
      }
      Gf.exports = I0;
  });
  var Mn = u((gH, Uf) => {
      function m0(e, t) {
          return e === t || (e !== e && t !== t);
      }
      Uf.exports = m0;
  });
  var Mr = u((_H, Vf) => {
      var T0 = Mn();
      function O0(e, t) {
          for (var r = e.length; r--; ) if (T0(e[r][0], t)) return r;
          return -1;
      }
      Vf.exports = O0;
  });
  var Bf = u((yH, Wf) => {
      var S0 = Mr(),
          b0 = Array.prototype,
          A0 = b0.splice;
      function w0(e) {
          var t = this.__data__,
              r = S0(t, e);
          if (r < 0) return !1;
          var n = t.length - 1;
          return r == n ? t.pop() : A0.call(t, r, 1), --this.size, !0;
      }
      Wf.exports = w0;
  });
  var kf = u((IH, Hf) => {
      var R0 = Mr();
      function C0(e) {
          var t = this.__data__,
              r = R0(t, e);
          return r < 0 ? void 0 : t[r][1];
      }
      Hf.exports = C0;
  });
  var Kf = u((mH, jf) => {
      var N0 = Mr();
      function q0(e) {
          return N0(this.__data__, e) > -1;
      }
      jf.exports = q0;
  });
  var Yf = u((TH, zf) => {
      var x0 = Mr();
      function L0(e, t) {
          var r = this.__data__,
              n = x0(r, e);
          return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
      }
      zf.exports = L0;
  });
  var Fr = u((OH, Qf) => {
      var P0 = Xf(),
          D0 = Bf(),
          M0 = kf(),
          F0 = Kf(),
          G0 = Yf();
      function nr(e) {
          var t = -1,
              r = e == null ? 0 : e.length;
          for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
          }
      }
      nr.prototype.clear = P0;
      nr.prototype.delete = D0;
      nr.prototype.get = M0;
      nr.prototype.has = F0;
      nr.prototype.set = G0;
      Qf.exports = nr;
  });
  var Zf = u((SH, $f) => {
      var X0 = Fr();
      function U0() {
          (this.__data__ = new X0()), (this.size = 0);
      }
      $f.exports = U0;
  });
  var ed = u((bH, Jf) => {
      function V0(e) {
          var t = this.__data__,
              r = t.delete(e);
          return (this.size = t.size), r;
      }
      Jf.exports = V0;
  });
  var rd = u((AH, td) => {
      function W0(e) {
          return this.__data__.get(e);
      }
      td.exports = W0;
  });
  var id = u((wH, nd) => {
      function B0(e) {
          return this.__data__.has(e);
      }
      nd.exports = B0;
  });
  var ct = u((RH, od) => {
      function H0(e) {
          var t = typeof e;
          return e != null && (t == "object" || t == "function");
      }
      od.exports = H0;
  });
  var ra = u((CH, ad) => {
      var k0 = St(),
          j0 = ct(),
          K0 = "[object AsyncFunction]",
          z0 = "[object Function]",
          Y0 = "[object GeneratorFunction]",
          Q0 = "[object Proxy]";
      function $0(e) {
          if (!j0(e)) return !1;
          var t = k0(e);
          return t == z0 || t == Y0 || t == K0 || t == Q0;
      }
      ad.exports = $0;
  });
  var ud = u((NH, sd) => {
      var Z0 = Je(),
          J0 = Z0["__core-js_shared__"];
      sd.exports = J0;
  });
  var fd = u((qH, ld) => {
      var na = ud(),
          cd = (function () {
              var e = /[^.]+$/.exec((na && na.keys && na.keys.IE_PROTO) || "");
              return e ? "Symbol(src)_1." + e : "";
          })();
      function ew(e) {
          return !!cd && cd in e;
      }
      ld.exports = ew;
  });
  var ia = u((xH, dd) => {
      var tw = Function.prototype,
          rw = tw.toString;
      function nw(e) {
          if (e != null) {
              try {
                  return rw.call(e);
              } catch {}
              try {
                  return e + "";
              } catch {}
          }
          return "";
      }
      dd.exports = nw;
  });
  var vd = u((LH, pd) => {
      var iw = ra(),
          ow = fd(),
          aw = ct(),
          sw = ia(),
          uw = /[\\^$.*+?()[\]{}|]/g,
          cw = /^\[object .+?Constructor\]$/,
          lw = Function.prototype,
          fw = Object.prototype,
          dw = lw.toString,
          pw = fw.hasOwnProperty,
          vw = RegExp(
              "^" +
                  dw
                      .call(pw)
                      .replace(uw, "\\$&")
                      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                  "$"
          );
      function hw(e) {
          if (!aw(e) || ow(e)) return !1;
          var t = iw(e) ? vw : cw;
          return t.test(sw(e));
      }
      pd.exports = hw;
  });
  var Ed = u((PH, hd) => {
      function Ew(e, t) {
          return e?.[t];
      }
      hd.exports = Ew;
  });
  var bt = u((DH, gd) => {
      var gw = vd(),
          _w = Ed();
      function yw(e, t) {
          var r = _w(e, t);
          return gw(r) ? r : void 0;
      }
      gd.exports = yw;
  });
  var Fn = u((MH, _d) => {
      var Iw = bt(),
          mw = Je(),
          Tw = Iw(mw, "Map");
      _d.exports = Tw;
  });
  var Gr = u((FH, yd) => {
      var Ow = bt(),
          Sw = Ow(Object, "create");
      yd.exports = Sw;
  });
  var Td = u((GH, md) => {
      var Id = Gr();
      function bw() {
          (this.__data__ = Id ? Id(null) : {}), (this.size = 0);
      }
      md.exports = bw;
  });
  var Sd = u((XH, Od) => {
      function Aw(e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
      }
      Od.exports = Aw;
  });
  var Ad = u((UH, bd) => {
      var ww = Gr(),
          Rw = "__lodash_hash_undefined__",
          Cw = Object.prototype,
          Nw = Cw.hasOwnProperty;
      function qw(e) {
          var t = this.__data__;
          if (ww) {
              var r = t[e];
              return r === Rw ? void 0 : r;
          }
          return Nw.call(t, e) ? t[e] : void 0;
      }
      bd.exports = qw;
  });
  var Rd = u((VH, wd) => {
      var xw = Gr(),
          Lw = Object.prototype,
          Pw = Lw.hasOwnProperty;
      function Dw(e) {
          var t = this.__data__;
          return xw ? t[e] !== void 0 : Pw.call(t, e);
      }
      wd.exports = Dw;
  });
  var Nd = u((WH, Cd) => {
      var Mw = Gr(),
          Fw = "__lodash_hash_undefined__";
      function Gw(e, t) {
          var r = this.__data__;
          return (this.size += this.has(e) ? 0 : 1), (r[e] = Mw && t === void 0 ? Fw : t), this;
      }
      Cd.exports = Gw;
  });
  var xd = u((BH, qd) => {
      var Xw = Td(),
          Uw = Sd(),
          Vw = Ad(),
          Ww = Rd(),
          Bw = Nd();
      function ir(e) {
          var t = -1,
              r = e == null ? 0 : e.length;
          for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
          }
      }
      ir.prototype.clear = Xw;
      ir.prototype.delete = Uw;
      ir.prototype.get = Vw;
      ir.prototype.has = Ww;
      ir.prototype.set = Bw;
      qd.exports = ir;
  });
  var Dd = u((HH, Pd) => {
      var Ld = xd(),
          Hw = Fr(),
          kw = Fn();
      function jw() {
          (this.size = 0), (this.__data__ = { hash: new Ld(), map: new (kw || Hw)(), string: new Ld() });
      }
      Pd.exports = jw;
  });
  var Fd = u((kH, Md) => {
      function Kw(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      Md.exports = Kw;
  });
  var Xr = u((jH, Gd) => {
      var zw = Fd();
      function Yw(e, t) {
          var r = e.__data__;
          return zw(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
      }
      Gd.exports = Yw;
  });
  var Ud = u((KH, Xd) => {
      var Qw = Xr();
      function $w(e) {
          var t = Qw(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
      }
      Xd.exports = $w;
  });
  var Wd = u((zH, Vd) => {
      var Zw = Xr();
      function Jw(e) {
          return Zw(this, e).get(e);
      }
      Vd.exports = Jw;
  });
  var Hd = u((YH, Bd) => {
      var eR = Xr();
      function tR(e) {
          return eR(this, e).has(e);
      }
      Bd.exports = tR;
  });
  var jd = u((QH, kd) => {
      var rR = Xr();
      function nR(e, t) {
          var r = rR(this, e),
              n = r.size;
          return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
      }
      kd.exports = nR;
  });
  var Gn = u(($H, Kd) => {
      var iR = Dd(),
          oR = Ud(),
          aR = Wd(),
          sR = Hd(),
          uR = jd();
      function or(e) {
          var t = -1,
              r = e == null ? 0 : e.length;
          for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
          }
      }
      or.prototype.clear = iR;
      or.prototype.delete = oR;
      or.prototype.get = aR;
      or.prototype.has = sR;
      or.prototype.set = uR;
      Kd.exports = or;
  });
  var Yd = u((ZH, zd) => {
      var cR = Fr(),
          lR = Fn(),
          fR = Gn(),
          dR = 200;
      function pR(e, t) {
          var r = this.__data__;
          if (r instanceof cR) {
              var n = r.__data__;
              if (!lR || n.length < dR - 1) return n.push([e, t]), (this.size = ++r.size), this;
              r = this.__data__ = new fR(n);
          }
          return r.set(e, t), (this.size = r.size), this;
      }
      zd.exports = pR;
  });
  var oa = u((JH, Qd) => {
      var vR = Fr(),
          hR = Zf(),
          ER = ed(),
          gR = rd(),
          _R = id(),
          yR = Yd();
      function ar(e) {
          var t = (this.__data__ = new vR(e));
          this.size = t.size;
      }
      ar.prototype.clear = hR;
      ar.prototype.delete = ER;
      ar.prototype.get = gR;
      ar.prototype.has = _R;
      ar.prototype.set = yR;
      Qd.exports = ar;
  });
  var Zd = u((e5, $d) => {
      var IR = "__lodash_hash_undefined__";
      function mR(e) {
          return this.__data__.set(e, IR), this;
      }
      $d.exports = mR;
  });
  var ep = u((t5, Jd) => {
      function TR(e) {
          return this.__data__.has(e);
      }
      Jd.exports = TR;
  });
  var rp = u((r5, tp) => {
      var OR = Gn(),
          SR = Zd(),
          bR = ep();
      function Xn(e) {
          var t = -1,
              r = e == null ? 0 : e.length;
          for (this.__data__ = new OR(); ++t < r; ) this.add(e[t]);
      }
      Xn.prototype.add = Xn.prototype.push = SR;
      Xn.prototype.has = bR;
      tp.exports = Xn;
  });
  var ip = u((n5, np) => {
      function AR(e, t) {
          for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
          return !1;
      }
      np.exports = AR;
  });
  var ap = u((i5, op) => {
      function wR(e, t) {
          return e.has(t);
      }
      op.exports = wR;
  });
  var aa = u((o5, sp) => {
      var RR = rp(),
          CR = ip(),
          NR = ap(),
          qR = 1,
          xR = 2;
      function LR(e, t, r, n, i, o) {
          var s = r & qR,
              a = e.length,
              c = t.length;
          if (a != c && !(s && c > a)) return !1;
          var f = o.get(e),
              p = o.get(t);
          if (f && p) return f == t && p == e;
          var v = -1,
              E = !0,
              g = r & xR ? new RR() : void 0;
          for (o.set(e, t), o.set(t, e); ++v < a; ) {
              var b = e[v],
                  S = t[v];
              if (n) var x = s ? n(S, b, v, t, e, o) : n(b, S, v, e, t, o);
              if (x !== void 0) {
                  if (x) continue;
                  E = !1;
                  break;
              }
              if (g) {
                  if (
                      !CR(t, function (A, w) {
                          if (!NR(g, w) && (b === A || i(b, A, r, n, o))) return g.push(w);
                      })
                  ) {
                      E = !1;
                      break;
                  }
              } else if (!(b === S || i(b, S, r, n, o))) {
                  E = !1;
                  break;
              }
          }
          return o.delete(e), o.delete(t), E;
      }
      sp.exports = LR;
  });
  var cp = u((a5, up) => {
      var PR = Je(),
          DR = PR.Uint8Array;
      up.exports = DR;
  });
  var fp = u((s5, lp) => {
      function MR(e) {
          var t = -1,
              r = Array(e.size);
          return (
              e.forEach(function (n, i) {
                  r[++t] = [i, n];
              }),
              r
          );
      }
      lp.exports = MR;
  });
  var pp = u((u5, dp) => {
      function FR(e) {
          var t = -1,
              r = Array(e.size);
          return (
              e.forEach(function (n) {
                  r[++t] = n;
              }),
              r
          );
      }
      dp.exports = FR;
  });
  var _p = u((c5, gp) => {
      var vp = Zt(),
          hp = cp(),
          GR = Mn(),
          XR = aa(),
          UR = fp(),
          VR = pp(),
          WR = 1,
          BR = 2,
          HR = "[object Boolean]",
          kR = "[object Date]",
          jR = "[object Error]",
          KR = "[object Map]",
          zR = "[object Number]",
          YR = "[object RegExp]",
          QR = "[object Set]",
          $R = "[object String]",
          ZR = "[object Symbol]",
          JR = "[object ArrayBuffer]",
          eC = "[object DataView]",
          Ep = vp ? vp.prototype : void 0,
          sa = Ep ? Ep.valueOf : void 0;
      function tC(e, t, r, n, i, o, s) {
          switch (r) {
              case eC:
                  if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                  (e = e.buffer), (t = t.buffer);
              case JR:
                  return !(e.byteLength != t.byteLength || !o(new hp(e), new hp(t)));
              case HR:
              case kR:
              case zR:
                  return GR(+e, +t);
              case jR:
                  return e.name == t.name && e.message == t.message;
              case YR:
              case $R:
                  return e == t + "";
              case KR:
                  var a = UR;
              case QR:
                  var c = n & WR;
                  if ((a || (a = VR), e.size != t.size && !c)) return !1;
                  var f = s.get(e);
                  if (f) return f == t;
                  (n |= BR), s.set(e, t);
                  var p = XR(a(e), a(t), n, i, o, s);
                  return s.delete(e), p;
              case ZR:
                  if (sa) return sa.call(e) == sa.call(t);
          }
          return !1;
      }
      gp.exports = tC;
  });
  var Un = u((l5, yp) => {
      function rC(e, t) {
          for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
          return e;
      }
      yp.exports = rC;
  });
  var qe = u((f5, Ip) => {
      var nC = Array.isArray;
      Ip.exports = nC;
  });
  var ua = u((d5, mp) => {
      var iC = Un(),
          oC = qe();
      function aC(e, t, r) {
          var n = t(e);
          return oC(e) ? n : iC(n, r(e));
      }
      mp.exports = aC;
  });
  var Op = u((p5, Tp) => {
      function sC(e, t) {
          for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
              var s = e[r];
              t(s, r, e) && (o[i++] = s);
          }
          return o;
      }
      Tp.exports = sC;
  });
  var ca = u((v5, Sp) => {
      function uC() {
          return [];
      }
      Sp.exports = uC;
  });
  var la = u((h5, Ap) => {
      var cC = Op(),
          lC = ca(),
          fC = Object.prototype,
          dC = fC.propertyIsEnumerable,
          bp = Object.getOwnPropertySymbols,
          pC = bp
              ? function (e) {
                    return e == null
                        ? []
                        : ((e = Object(e)),
                          cC(bp(e), function (t) {
                              return dC.call(e, t);
                          }));
                }
              : lC;
      Ap.exports = pC;
  });
  var Rp = u((E5, wp) => {
      function vC(e, t) {
          for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
          return n;
      }
      wp.exports = vC;
  });
  var Np = u((g5, Cp) => {
      var hC = St(),
          EC = gt(),
          gC = "[object Arguments]";
      function _C(e) {
          return EC(e) && hC(e) == gC;
      }
      Cp.exports = _C;
  });
  var Ur = u((_5, Lp) => {
      var qp = Np(),
          yC = gt(),
          xp = Object.prototype,
          IC = xp.hasOwnProperty,
          mC = xp.propertyIsEnumerable,
          TC = qp(
              (function () {
                  return arguments;
              })()
          )
              ? qp
              : function (e) {
                    return yC(e) && IC.call(e, "callee") && !mC.call(e, "callee");
                };
      Lp.exports = TC;
  });
  var Dp = u((y5, Pp) => {
      function OC() {
          return !1;
      }
      Pp.exports = OC;
  });
  var Vn = u((Vr, sr) => {
      var SC = Je(),
          bC = Dp(),
          Gp = typeof Vr == "object" && Vr && !Vr.nodeType && Vr,
          Mp = Gp && typeof sr == "object" && sr && !sr.nodeType && sr,
          AC = Mp && Mp.exports === Gp,
          Fp = AC ? SC.Buffer : void 0,
          wC = Fp ? Fp.isBuffer : void 0,
          RC = wC || bC;
      sr.exports = RC;
  });
  var Wn = u((I5, Xp) => {
      var CC = 9007199254740991,
          NC = /^(?:0|[1-9]\d*)$/;
      function qC(e, t) {
          var r = typeof e;
          return (t = t ?? CC), !!t && (r == "number" || (r != "symbol" && NC.test(e))) && e > -1 && e % 1 == 0 && e < t;
      }
      Xp.exports = qC;
  });
  var Bn = u((m5, Up) => {
      var xC = 9007199254740991;
      function LC(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xC;
      }
      Up.exports = LC;
  });
  var Wp = u((T5, Vp) => {
      var PC = St(),
          DC = Bn(),
          MC = gt(),
          FC = "[object Arguments]",
          GC = "[object Array]",
          XC = "[object Boolean]",
          UC = "[object Date]",
          VC = "[object Error]",
          WC = "[object Function]",
          BC = "[object Map]",
          HC = "[object Number]",
          kC = "[object Object]",
          jC = "[object RegExp]",
          KC = "[object Set]",
          zC = "[object String]",
          YC = "[object WeakMap]",
          QC = "[object ArrayBuffer]",
          $C = "[object DataView]",
          ZC = "[object Float32Array]",
          JC = "[object Float64Array]",
          eN = "[object Int8Array]",
          tN = "[object Int16Array]",
          rN = "[object Int32Array]",
          nN = "[object Uint8Array]",
          iN = "[object Uint8ClampedArray]",
          oN = "[object Uint16Array]",
          aN = "[object Uint32Array]",
          Ie = {};
      Ie[ZC] = Ie[JC] = Ie[eN] = Ie[tN] = Ie[rN] = Ie[nN] = Ie[iN] = Ie[oN] = Ie[aN] = !0;
      Ie[FC] = Ie[GC] = Ie[QC] = Ie[XC] = Ie[$C] = Ie[UC] = Ie[VC] = Ie[WC] = Ie[BC] = Ie[HC] = Ie[kC] = Ie[jC] = Ie[KC] = Ie[zC] = Ie[YC] = !1;
      function sN(e) {
          return MC(e) && DC(e.length) && !!Ie[PC(e)];
      }
      Vp.exports = sN;
  });
  var Hp = u((O5, Bp) => {
      function uN(e) {
          return function (t) {
              return e(t);
          };
      }
      Bp.exports = uN;
  });
  var jp = u((Wr, ur) => {
      var cN = Lo(),
          kp = typeof Wr == "object" && Wr && !Wr.nodeType && Wr,
          Br = kp && typeof ur == "object" && ur && !ur.nodeType && ur,
          lN = Br && Br.exports === kp,
          fa = lN && cN.process,
          fN = (function () {
              try {
                  var e = Br && Br.require && Br.require("util").types;
                  return e || (fa && fa.binding && fa.binding("util"));
              } catch {}
          })();
      ur.exports = fN;
  });
  var Hn = u((S5, Yp) => {
      var dN = Wp(),
          pN = Hp(),
          Kp = jp(),
          zp = Kp && Kp.isTypedArray,
          vN = zp ? pN(zp) : dN;
      Yp.exports = vN;
  });
  var da = u((b5, Qp) => {
      var hN = Rp(),
          EN = Ur(),
          gN = qe(),
          _N = Vn(),
          yN = Wn(),
          IN = Hn(),
          mN = Object.prototype,
          TN = mN.hasOwnProperty;
      function ON(e, t) {
          var r = gN(e),
              n = !r && EN(e),
              i = !r && !n && _N(e),
              o = !r && !n && !i && IN(e),
              s = r || n || i || o,
              a = s ? hN(e.length, String) : [],
              c = a.length;
          for (var f in e) (t || TN.call(e, f)) && !(s && (f == "length" || (i && (f == "offset" || f == "parent")) || (o && (f == "buffer" || f == "byteLength" || f == "byteOffset")) || yN(f, c))) && a.push(f);
          return a;
      }
      Qp.exports = ON;
  });
  var kn = u((A5, $p) => {
      var SN = Object.prototype;
      function bN(e) {
          var t = e && e.constructor,
              r = (typeof t == "function" && t.prototype) || SN;
          return e === r;
      }
      $p.exports = bN;
  });
  var Jp = u((w5, Zp) => {
      var AN = Po(),
          wN = AN(Object.keys, Object);
      Zp.exports = wN;
  });
  var jn = u((R5, ev) => {
      var RN = kn(),
          CN = Jp(),
          NN = Object.prototype,
          qN = NN.hasOwnProperty;
      function xN(e) {
          if (!RN(e)) return CN(e);
          var t = [];
          for (var r in Object(e)) qN.call(e, r) && r != "constructor" && t.push(r);
          return t;
      }
      ev.exports = xN;
  });
  var Ft = u((C5, tv) => {
      var LN = ra(),
          PN = Bn();
      function DN(e) {
          return e != null && PN(e.length) && !LN(e);
      }
      tv.exports = DN;
  });
  var Hr = u((N5, rv) => {
      var MN = da(),
          FN = jn(),
          GN = Ft();
      function XN(e) {
          return GN(e) ? MN(e) : FN(e);
      }
      rv.exports = XN;
  });
  var iv = u((q5, nv) => {
      var UN = ua(),
          VN = la(),
          WN = Hr();
      function BN(e) {
          return UN(e, WN, VN);
      }
      nv.exports = BN;
  });
  var sv = u((x5, av) => {
      var ov = iv(),
          HN = 1,
          kN = Object.prototype,
          jN = kN.hasOwnProperty;
      function KN(e, t, r, n, i, o) {
          var s = r & HN,
              a = ov(e),
              c = a.length,
              f = ov(t),
              p = f.length;
          if (c != p && !s) return !1;
          for (var v = c; v--; ) {
              var E = a[v];
              if (!(s ? E in t : jN.call(t, E))) return !1;
          }
          var g = o.get(e),
              b = o.get(t);
          if (g && b) return g == t && b == e;
          var S = !0;
          o.set(e, t), o.set(t, e);
          for (var x = s; ++v < c; ) {
              E = a[v];
              var A = e[E],
                  w = t[E];
              if (n) var m = s ? n(w, A, E, t, e, o) : n(A, w, E, e, t, o);
              if (!(m === void 0 ? A === w || i(A, w, r, n, o) : m)) {
                  S = !1;
                  break;
              }
              x || (x = E == "constructor");
          }
          if (S && !x) {
              var N = e.constructor,
                  C = t.constructor;
              N != C && "constructor" in e && "constructor" in t && !(typeof N == "function" && N instanceof N && typeof C == "function" && C instanceof C) && (S = !1);
          }
          return o.delete(e), o.delete(t), S;
      }
      av.exports = KN;
  });
  var cv = u((L5, uv) => {
      var zN = bt(),
          YN = Je(),
          QN = zN(YN, "DataView");
      uv.exports = QN;
  });
  var fv = u((P5, lv) => {
      var $N = bt(),
          ZN = Je(),
          JN = $N(ZN, "Promise");
      lv.exports = JN;
  });
  var pv = u((D5, dv) => {
      var eq = bt(),
          tq = Je(),
          rq = eq(tq, "Set");
      dv.exports = rq;
  });
  var pa = u((M5, vv) => {
      var nq = bt(),
          iq = Je(),
          oq = nq(iq, "WeakMap");
      vv.exports = oq;
  });
  var Kn = u((F5, mv) => {
      var va = cv(),
          ha = Fn(),
          Ea = fv(),
          ga = pv(),
          _a = pa(),
          Iv = St(),
          cr = ia(),
          hv = "[object Map]",
          aq = "[object Object]",
          Ev = "[object Promise]",
          gv = "[object Set]",
          _v = "[object WeakMap]",
          yv = "[object DataView]",
          sq = cr(va),
          uq = cr(ha),
          cq = cr(Ea),
          lq = cr(ga),
          fq = cr(_a),
          Gt = Iv;
      ((va && Gt(new va(new ArrayBuffer(1))) != yv) || (ha && Gt(new ha()) != hv) || (Ea && Gt(Ea.resolve()) != Ev) || (ga && Gt(new ga()) != gv) || (_a && Gt(new _a()) != _v)) &&
          (Gt = function (e) {
              var t = Iv(e),
                  r = t == aq ? e.constructor : void 0,
                  n = r ? cr(r) : "";
              if (n)
                  switch (n) {
                      case sq:
                          return yv;
                      case uq:
                          return hv;
                      case cq:
                          return Ev;
                      case lq:
                          return gv;
                      case fq:
                          return _v;
                  }
              return t;
          });
      mv.exports = Gt;
  });
  var Cv = u((G5, Rv) => {
      var ya = oa(),
          dq = aa(),
          pq = _p(),
          vq = sv(),
          Tv = Kn(),
          Ov = qe(),
          Sv = Vn(),
          hq = Hn(),
          Eq = 1,
          bv = "[object Arguments]",
          Av = "[object Array]",
          zn = "[object Object]",
          gq = Object.prototype,
          wv = gq.hasOwnProperty;
      function _q(e, t, r, n, i, o) {
          var s = Ov(e),
              a = Ov(t),
              c = s ? Av : Tv(e),
              f = a ? Av : Tv(t);
          (c = c == bv ? zn : c), (f = f == bv ? zn : f);
          var p = c == zn,
              v = f == zn,
              E = c == f;
          if (E && Sv(e)) {
              if (!Sv(t)) return !1;
              (s = !0), (p = !1);
          }
          if (E && !p) return o || (o = new ya()), s || hq(e) ? dq(e, t, r, n, i, o) : pq(e, t, c, r, n, i, o);
          if (!(r & Eq)) {
              var g = p && wv.call(e, "__wrapped__"),
                  b = v && wv.call(t, "__wrapped__");
              if (g || b) {
                  var S = g ? e.value() : e,
                      x = b ? t.value() : t;
                  return o || (o = new ya()), i(S, x, r, n, o);
              }
          }
          return E ? (o || (o = new ya()), vq(e, t, r, n, i, o)) : !1;
      }
      Rv.exports = _q;
  });
  var Ia = u((X5, xv) => {
      var yq = Cv(),
          Nv = gt();
      function qv(e, t, r, n, i) {
          return e === t ? !0 : e == null || t == null || (!Nv(e) && !Nv(t)) ? e !== e && t !== t : yq(e, t, r, n, qv, i);
      }
      xv.exports = qv;
  });
  var Pv = u((U5, Lv) => {
      var Iq = oa(),
          mq = Ia(),
          Tq = 1,
          Oq = 2;
      function Sq(e, t, r, n) {
          var i = r.length,
              o = i,
              s = !n;
          if (e == null) return !o;
          for (e = Object(e); i--; ) {
              var a = r[i];
              if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
          }
          for (; ++i < o; ) {
              a = r[i];
              var c = a[0],
                  f = e[c],
                  p = a[1];
              if (s && a[2]) {
                  if (f === void 0 && !(c in e)) return !1;
              } else {
                  var v = new Iq();
                  if (n) var E = n(f, p, c, e, t, v);
                  if (!(E === void 0 ? mq(p, f, Tq | Oq, n, v) : E)) return !1;
              }
          }
          return !0;
      }
      Lv.exports = Sq;
  });
  var ma = u((V5, Dv) => {
      var bq = ct();
      function Aq(e) {
          return e === e && !bq(e);
      }
      Dv.exports = Aq;
  });
  var Fv = u((W5, Mv) => {
      var wq = ma(),
          Rq = Hr();
      function Cq(e) {
          for (var t = Rq(e), r = t.length; r--; ) {
              var n = t[r],
                  i = e[n];
              t[r] = [n, i, wq(i)];
          }
          return t;
      }
      Mv.exports = Cq;
  });
  var Ta = u((B5, Gv) => {
      function Nq(e, t) {
          return function (r) {
              return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
          };
      }
      Gv.exports = Nq;
  });
  var Uv = u((H5, Xv) => {
      var qq = Pv(),
          xq = Fv(),
          Lq = Ta();
      function Pq(e) {
          var t = xq(e);
          return t.length == 1 && t[0][2]
              ? Lq(t[0][0], t[0][1])
              : function (r) {
                    return r === e || qq(r, e, t);
                };
      }
      Xv.exports = Pq;
  });
  var kr = u((k5, Vv) => {
      var Dq = St(),
          Mq = gt(),
          Fq = "[object Symbol]";
      function Gq(e) {
          return typeof e == "symbol" || (Mq(e) && Dq(e) == Fq);
      }
      Vv.exports = Gq;
  });
  var Yn = u((j5, Wv) => {
      var Xq = qe(),
          Uq = kr(),
          Vq = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          Wq = /^\w*$/;
      function Bq(e, t) {
          if (Xq(e)) return !1;
          var r = typeof e;
          return r == "number" || r == "symbol" || r == "boolean" || e == null || Uq(e) ? !0 : Wq.test(e) || !Vq.test(e) || (t != null && e in Object(t));
      }
      Wv.exports = Bq;
  });
  var kv = u((K5, Hv) => {
      var Bv = Gn(),
          Hq = "Expected a function";
      function Oa(e, t) {
          if (typeof e != "function" || (t != null && typeof t != "function")) throw new TypeError(Hq);
          var r = function () {
              var n = arguments,
                  i = t ? t.apply(this, n) : n[0],
                  o = r.cache;
              if (o.has(i)) return o.get(i);
              var s = e.apply(this, n);
              return (r.cache = o.set(i, s) || o), s;
          };
          return (r.cache = new (Oa.Cache || Bv)()), r;
      }
      Oa.Cache = Bv;
      Hv.exports = Oa;
  });
  var Kv = u((z5, jv) => {
      var kq = kv(),
          jq = 500;
      function Kq(e) {
          var t = kq(e, function (n) {
                  return r.size === jq && r.clear(), n;
              }),
              r = t.cache;
          return t;
      }
      jv.exports = Kq;
  });
  var Yv = u((Y5, zv) => {
      var zq = Kv(),
          Yq = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          Qq = /\\(\\)?/g,
          $q = zq(function (e) {
              var t = [];
              return (
                  e.charCodeAt(0) === 46 && t.push(""),
                  e.replace(Yq, function (r, n, i, o) {
                      t.push(i ? o.replace(Qq, "$1") : n || r);
                  }),
                  t
              );
          });
      zv.exports = $q;
  });
  var Sa = u((Q5, Qv) => {
      function Zq(e, t) {
          for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; ) i[r] = t(e[r], r, e);
          return i;
      }
      Qv.exports = Zq;
  });
  var rh = u(($5, th) => {
      var $v = Zt(),
          Jq = Sa(),
          ex = qe(),
          tx = kr(),
          rx = 1 / 0,
          Zv = $v ? $v.prototype : void 0,
          Jv = Zv ? Zv.toString : void 0;
      function eh(e) {
          if (typeof e == "string") return e;
          if (ex(e)) return Jq(e, eh) + "";
          if (tx(e)) return Jv ? Jv.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -rx ? "-0" : t;
      }
      th.exports = eh;
  });
  var ih = u((Z5, nh) => {
      var nx = rh();
      function ix(e) {
          return e == null ? "" : nx(e);
      }
      nh.exports = ix;
  });
  var jr = u((J5, oh) => {
      var ox = qe(),
          ax = Yn(),
          sx = Yv(),
          ux = ih();
      function cx(e, t) {
          return ox(e) ? e : ax(e, t) ? [e] : sx(ux(e));
      }
      oh.exports = cx;
  });
  var lr = u((ek, ah) => {
      var lx = kr(),
          fx = 1 / 0;
      function dx(e) {
          if (typeof e == "string" || lx(e)) return e;
          var t = e + "";
          return t == "0" && 1 / e == -fx ? "-0" : t;
      }
      ah.exports = dx;
  });
  var Qn = u((tk, sh) => {
      var px = jr(),
          vx = lr();
      function hx(e, t) {
          t = px(t, e);
          for (var r = 0, n = t.length; e != null && r < n; ) e = e[vx(t[r++])];
          return r && r == n ? e : void 0;
      }
      sh.exports = hx;
  });
  var $n = u((rk, uh) => {
      var Ex = Qn();
      function gx(e, t, r) {
          var n = e == null ? void 0 : Ex(e, t);
          return n === void 0 ? r : n;
      }
      uh.exports = gx;
  });
  var lh = u((nk, ch) => {
      function _x(e, t) {
          return e != null && t in Object(e);
      }
      ch.exports = _x;
  });
  var dh = u((ik, fh) => {
      var yx = jr(),
          Ix = Ur(),
          mx = qe(),
          Tx = Wn(),
          Ox = Bn(),
          Sx = lr();
      function bx(e, t, r) {
          t = yx(t, e);
          for (var n = -1, i = t.length, o = !1; ++n < i; ) {
              var s = Sx(t[n]);
              if (!(o = e != null && r(e, s))) break;
              e = e[s];
          }
          return o || ++n != i ? o : ((i = e == null ? 0 : e.length), !!i && Ox(i) && Tx(s, i) && (mx(e) || Ix(e)));
      }
      fh.exports = bx;
  });
  var vh = u((ok, ph) => {
      var Ax = lh(),
          wx = dh();
      function Rx(e, t) {
          return e != null && wx(e, t, Ax);
      }
      ph.exports = Rx;
  });
  var Eh = u((ak, hh) => {
      var Cx = Ia(),
          Nx = $n(),
          qx = vh(),
          xx = Yn(),
          Lx = ma(),
          Px = Ta(),
          Dx = lr(),
          Mx = 1,
          Fx = 2;
      function Gx(e, t) {
          return xx(e) && Lx(t)
              ? Px(Dx(e), t)
              : function (r) {
                    var n = Nx(r, e);
                    return n === void 0 && n === t ? qx(r, e) : Cx(t, n, Mx | Fx);
                };
      }
      hh.exports = Gx;
  });
  var Zn = u((sk, gh) => {
      function Xx(e) {
          return e;
      }
      gh.exports = Xx;
  });
  var ba = u((uk, _h) => {
      function Ux(e) {
          return function (t) {
              return t?.[e];
          };
      }
      _h.exports = Ux;
  });
  var Ih = u((ck, yh) => {
      var Vx = Qn();
      function Wx(e) {
          return function (t) {
              return Vx(t, e);
          };
      }
      yh.exports = Wx;
  });
  var Th = u((lk, mh) => {
      var Bx = ba(),
          Hx = Ih(),
          kx = Yn(),
          jx = lr();
      function Kx(e) {
          return kx(e) ? Bx(jx(e)) : Hx(e);
      }
      mh.exports = Kx;
  });
  var At = u((fk, Oh) => {
      var zx = Uv(),
          Yx = Eh(),
          Qx = Zn(),
          $x = qe(),
          Zx = Th();
      function Jx(e) {
          return typeof e == "function" ? e : e == null ? Qx : typeof e == "object" ? ($x(e) ? Yx(e[0], e[1]) : zx(e)) : Zx(e);
      }
      Oh.exports = Jx;
  });
  var Aa = u((dk, Sh) => {
      var eL = At(),
          tL = Ft(),
          rL = Hr();
      function nL(e) {
          return function (t, r, n) {
              var i = Object(t);
              if (!tL(t)) {
                  var o = eL(r, 3);
                  (t = rL(t)),
                      (r = function (a) {
                          return o(i[a], a, i);
                      });
              }
              var s = e(t, r, n);
              return s > -1 ? i[o ? t[s] : s] : void 0;
          };
      }
      Sh.exports = nL;
  });
  var wa = u((pk, bh) => {
      function iL(e, t, r, n) {
          for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; ) if (t(e[o], o, e)) return o;
          return -1;
      }
      bh.exports = iL;
  });
  var wh = u((vk, Ah) => {
      var oL = /\s/;
      function aL(e) {
          for (var t = e.length; t-- && oL.test(e.charAt(t)); );
          return t;
      }
      Ah.exports = aL;
  });
  var Ch = u((hk, Rh) => {
      var sL = wh(),
          uL = /^\s+/;
      function cL(e) {
          return e && e.slice(0, sL(e) + 1).replace(uL, "");
      }
      Rh.exports = cL;
  });
  var Jn = u((Ek, xh) => {
      var lL = Ch(),
          Nh = ct(),
          fL = kr(),
          qh = 0 / 0,
          dL = /^[-+]0x[0-9a-f]+$/i,
          pL = /^0b[01]+$/i,
          vL = /^0o[0-7]+$/i,
          hL = parseInt;
      function EL(e) {
          if (typeof e == "number") return e;
          if (fL(e)) return qh;
          if (Nh(e)) {
              var t = typeof e.valueOf == "function" ? e.valueOf() : e;
              e = Nh(t) ? t + "" : t;
          }
          if (typeof e != "string") return e === 0 ? e : +e;
          e = lL(e);
          var r = pL.test(e);
          return r || vL.test(e) ? hL(e.slice(2), r ? 2 : 8) : dL.test(e) ? qh : +e;
      }
      xh.exports = EL;
  });
  var Dh = u((gk, Ph) => {
      var gL = Jn(),
          Lh = 1 / 0,
          _L = 17976931348623157e292;
      function yL(e) {
          if (!e) return e === 0 ? e : 0;
          if (((e = gL(e)), e === Lh || e === -Lh)) {
              var t = e < 0 ? -1 : 1;
              return t * _L;
          }
          return e === e ? e : 0;
      }
      Ph.exports = yL;
  });
  var Ra = u((_k, Mh) => {
      var IL = Dh();
      function mL(e) {
          var t = IL(e),
              r = t % 1;
          return t === t ? (r ? t - r : t) : 0;
      }
      Mh.exports = mL;
  });
  var Gh = u((yk, Fh) => {
      var TL = wa(),
          OL = At(),
          SL = Ra(),
          bL = Math.max;
      function AL(e, t, r) {
          var n = e == null ? 0 : e.length;
          if (!n) return -1;
          var i = r == null ? 0 : SL(r);
          return i < 0 && (i = bL(n + i, 0)), TL(e, OL(t, 3), i);
      }
      Fh.exports = AL;
  });
  var Ca = u((Ik, Xh) => {
      var wL = Aa(),
          RL = Gh(),
          CL = wL(RL);
      Xh.exports = CL;
  });
  var ti = u((Fe) => {
      "use strict";
      var NL = at().default;
      Object.defineProperty(Fe, "__esModule", { value: !0 });
      Fe.withBrowser = Fe.TRANSFORM_STYLE_PREFIXED = Fe.TRANSFORM_PREFIXED = Fe.IS_BROWSER_ENV = Fe.FLEX_PREFIXED = Fe.ELEMENT_MATCHES = void 0;
      var qL = NL(Ca()),
          Vh = typeof window < "u";
      Fe.IS_BROWSER_ENV = Vh;
      var ei = (e, t) => (Vh ? e() : t);
      Fe.withBrowser = ei;
      var xL = ei(() => (0, qL.default)(["matches", "matchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector", "webkitMatchesSelector"], (e) => e in Element.prototype));
      Fe.ELEMENT_MATCHES = xL;
      var LL = ei(() => {
          let e = document.createElement("i"),
              t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
              r = "";
          try {
              let { length: n } = t;
              for (let i = 0; i < n; i++) {
                  let o = t[i];
                  if (((e.style.display = o), e.style.display === o)) return o;
              }
              return r;
          } catch {
              return r;
          }
      }, "flex");
      Fe.FLEX_PREFIXED = LL;
      var Wh = ei(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
              let t = ["Webkit", "Moz", "ms"],
                  r = "Transform",
                  { length: n } = t;
              for (let i = 0; i < n; i++) {
                  let o = t[i] + r;
                  if (e.style[o] !== void 0) return o;
              }
          }
          return "transform";
      }, "transform");
      Fe.TRANSFORM_PREFIXED = Wh;
      var Uh = Wh.split("transform")[0],
          PL = Uh ? Uh + "TransformStyle" : "transformStyle";
      Fe.TRANSFORM_STYLE_PREFIXED = PL;
  });
  var Na = u((Tk, Kh) => {
      var DL = 4,
          ML = 0.001,
          FL = 1e-7,
          GL = 10,
          Kr = 11,
          ri = 1 / (Kr - 1),
          XL = typeof Float32Array == "function";
      function Bh(e, t) {
          return 1 - 3 * t + 3 * e;
      }
      function Hh(e, t) {
          return 3 * t - 6 * e;
      }
      function kh(e) {
          return 3 * e;
      }
      function ni(e, t, r) {
          return ((Bh(t, r) * e + Hh(t, r)) * e + kh(t)) * e;
      }
      function jh(e, t, r) {
          return 3 * Bh(t, r) * e * e + 2 * Hh(t, r) * e + kh(t);
      }
      function UL(e, t, r, n, i) {
          var o,
              s,
              a = 0;
          do (s = t + (r - t) / 2), (o = ni(s, n, i) - e), o > 0 ? (r = s) : (t = s);
          while (Math.abs(o) > FL && ++a < GL);
          return s;
      }
      function VL(e, t, r, n) {
          for (var i = 0; i < DL; ++i) {
              var o = jh(t, r, n);
              if (o === 0) return t;
              var s = ni(t, r, n) - e;
              t -= s / o;
          }
          return t;
      }
      Kh.exports = function (t, r, n, i) {
          if (!(0 <= t && t <= 1 && 0 <= n && n <= 1)) throw new Error("bezier x values must be in [0, 1] range");
          var o = XL ? new Float32Array(Kr) : new Array(Kr);
          if (t !== r || n !== i) for (var s = 0; s < Kr; ++s) o[s] = ni(s * ri, t, n);
          function a(c) {
              for (var f = 0, p = 1, v = Kr - 1; p !== v && o[p] <= c; ++p) f += ri;
              --p;
              var E = (c - o[p]) / (o[p + 1] - o[p]),
                  g = f + E * ri,
                  b = jh(g, t, n);
              return b >= ML ? VL(c, g, t, n) : b === 0 ? g : UL(c, f, f + ri, t, n);
          }
          return function (f) {
              return t === r && n === i ? f : f === 0 ? 0 : f === 1 ? 1 : ni(a(f), r, i);
          };
      };
  });
  var qa = u((ie) => {
      "use strict";
      var WL = at().default;
      Object.defineProperty(ie, "__esModule", { value: !0 });
      ie.bounce = SP;
      ie.bouncePast = bP;
      ie.easeOut = ie.easeInOut = ie.easeIn = ie.ease = void 0;
      ie.inBack = hP;
      ie.inCirc = fP;
      ie.inCubic = QL;
      ie.inElastic = _P;
      ie.inExpo = uP;
      ie.inOutBack = gP;
      ie.inOutCirc = pP;
      ie.inOutCubic = ZL;
      ie.inOutElastic = IP;
      ie.inOutExpo = lP;
      ie.inOutQuad = YL;
      ie.inOutQuart = tP;
      ie.inOutQuint = iP;
      ie.inOutSine = sP;
      ie.inQuad = KL;
      ie.inQuart = JL;
      ie.inQuint = rP;
      ie.inSine = oP;
      ie.outBack = EP;
      ie.outBounce = vP;
      ie.outCirc = dP;
      ie.outCubic = $L;
      ie.outElastic = yP;
      ie.outExpo = cP;
      ie.outQuad = zL;
      ie.outQuart = eP;
      ie.outQuint = nP;
      ie.outSine = aP;
      ie.swingFrom = TP;
      ie.swingFromTo = mP;
      ie.swingTo = OP;
      var ii = WL(Na()),
          yt = 1.70158,
          BL = (0, ii.default)(0.25, 0.1, 0.25, 1);
      ie.ease = BL;
      var HL = (0, ii.default)(0.42, 0, 1, 1);
      ie.easeIn = HL;
      var kL = (0, ii.default)(0, 0, 0.58, 1);
      ie.easeOut = kL;
      var jL = (0, ii.default)(0.42, 0, 0.58, 1);
      ie.easeInOut = jL;
      function KL(e) {
          return Math.pow(e, 2);
      }
      function zL(e) {
          return -(Math.pow(e - 1, 2) - 1);
      }
      function YL(e) {
          return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
      }
      function QL(e) {
          return Math.pow(e, 3);
      }
      function $L(e) {
          return Math.pow(e - 1, 3) + 1;
      }
      function ZL(e) {
          return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
      }
      function JL(e) {
          return Math.pow(e, 4);
      }
      function eP(e) {
          return -(Math.pow(e - 1, 4) - 1);
      }
      function tP(e) {
          return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 4) : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
      }
      function rP(e) {
          return Math.pow(e, 5);
      }
      function nP(e) {
          return Math.pow(e - 1, 5) + 1;
      }
      function iP(e) {
          return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 5) : 0.5 * (Math.pow(e - 2, 5) + 2);
      }
      function oP(e) {
          return -Math.cos(e * (Math.PI / 2)) + 1;
      }
      function aP(e) {
          return Math.sin(e * (Math.PI / 2));
      }
      function sP(e) {
          return -0.5 * (Math.cos(Math.PI * e) - 1);
      }
      function uP(e) {
          return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
      }
      function cP(e) {
          return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
      }
      function lP(e) {
          return e === 0 ? 0 : e === 1 ? 1 : (e /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (e - 1)) : 0.5 * (-Math.pow(2, -10 * --e) + 2);
      }
      function fP(e) {
          return -(Math.sqrt(1 - e * e) - 1);
      }
      function dP(e) {
          return Math.sqrt(1 - Math.pow(e - 1, 2));
      }
      function pP(e) {
          return (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
      function vP(e) {
          return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function hP(e) {
          let t = yt;
          return e * e * ((t + 1) * e - t);
      }
      function EP(e) {
          let t = yt;
          return (e -= 1) * e * ((t + 1) * e + t) + 1;
      }
      function gP(e) {
          let t = yt;
          return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function _P(e) {
          let t = yt,
              r = 0,
              n = 1;
          return e === 0 ? 0 : e === 1 ? 1 : (r || (r = 0.3), n < 1 ? ((n = 1), (t = r / 4)) : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)), -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e - t) * (2 * Math.PI)) / r)));
      }
      function yP(e) {
          let t = yt,
              r = 0,
              n = 1;
          return e === 0 ? 0 : e === 1 ? 1 : (r || (r = 0.3), n < 1 ? ((n = 1), (t = r / 4)) : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)), n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
      }
      function IP(e) {
          let t = yt,
              r = 0,
              n = 1;
          return e === 0
              ? 0
              : (e /= 1 / 2) === 2
              ? 1
              : (r || (r = 0.3 * 1.5),
                n < 1 ? ((n = 1), (t = r / 4)) : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
                e < 1 ? -0.5 * (n * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e - t) * (2 * Math.PI)) / r)) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin(((e - t) * (2 * Math.PI)) / r) * 0.5 + 1);
      }
      function mP(e) {
          let t = yt;
          return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function TP(e) {
          let t = yt;
          return e * e * ((t + 1) * e - t);
      }
      function OP(e) {
          let t = yt;
          return (e -= 1) * e * ((t + 1) * e + t) + 1;
      }
      function SP(e) {
          return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function bP(e) {
          return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) : e < 2.5 / 2.75 ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
      }
  });
  var La = u((zr) => {
      "use strict";
      var AP = at().default,
          wP = zt().default;
      Object.defineProperty(zr, "__esModule", { value: !0 });
      zr.applyEasing = NP;
      zr.createBezierEasing = CP;
      zr.optimizeFloat = xa;
      var zh = wP(qa()),
          RP = AP(Na());
      function xa(e, t = 5, r = 10) {
          let n = Math.pow(r, t),
              i = Number(Math.round(e * n) / n);
          return Math.abs(i) > 1e-4 ? i : 0;
      }
      function CP(e) {
          return (0, RP.default)(...e);
      }
      function NP(e, t, r) {
          return t === 0 ? 0 : t === 1 ? 1 : xa(r ? (t > 0 ? r(t) : t) : t > 0 && e && zh[e] ? zh[e](t) : t);
      }
  });
  var Zh = u((fr) => {
      "use strict";
      Object.defineProperty(fr, "__esModule", { value: !0 });
      fr.createElementState = $h;
      fr.ixElements = void 0;
      fr.mergeActionState = Pa;
      var oi = rr(),
          Qh = Ve(),
          {
              HTML_ELEMENT: bk,
              PLAIN_OBJECT: qP,
              ABSTRACT_NODE: Ak,
              CONFIG_X_VALUE: xP,
              CONFIG_Y_VALUE: LP,
              CONFIG_Z_VALUE: PP,
              CONFIG_VALUE: DP,
              CONFIG_X_UNIT: MP,
              CONFIG_Y_UNIT: FP,
              CONFIG_Z_UNIT: GP,
              CONFIG_UNIT: XP,
          } = Qh.IX2EngineConstants,
          { IX2_SESSION_STOPPED: UP, IX2_INSTANCE_ADDED: VP, IX2_ELEMENT_STATE_CHANGED: WP } = Qh.IX2EngineActionTypes,
          Yh = {},
          BP = "refState",
          HP = (e = Yh, t = {}) => {
              switch (t.type) {
                  case UP:
                      return Yh;
                  case VP: {
                      let { elementId: r, element: n, origin: i, actionItem: o, refType: s } = t.payload,
                          { actionTypeId: a } = o,
                          c = e;
                      return (0, oi.getIn)(c, [r, n]) !== n && (c = $h(c, n, s, r, o)), Pa(c, r, a, i, o);
                  }
                  case WP: {
                      let { elementId: r, actionTypeId: n, current: i, actionItem: o } = t.payload;
                      return Pa(e, r, n, i, o);
                  }
                  default:
                      return e;
              }
          };
      fr.ixElements = HP;
      function $h(e, t, r, n, i) {
          let o = r === qP ? (0, oi.getIn)(i, ["config", "target", "objectId"]) : null;
          return (0, oi.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
      }
      function Pa(e, t, r, n, i) {
          let o = jP(i),
              s = [t, BP, r];
          return (0, oi.mergeIn)(e, s, n, o);
      }
      var kP = [
          [xP, MP],
          [LP, FP],
          [PP, GP],
          [DP, XP],
      ];
      function jP(e) {
          let { config: t } = e;
          return kP.reduce((r, n) => {
              let i = n[0],
                  o = n[1],
                  s = t[i],
                  a = t[o];
              return s != null && a != null && (r[o] = a), r;
          }, {});
      }
  });
  var Jh = u((xe) => {
      "use strict";
      Object.defineProperty(xe, "__esModule", { value: !0 });
      xe.renderPlugin = xe.getPluginOrigin = xe.getPluginDuration = xe.getPluginDestination = xe.getPluginConfig = xe.createPluginInstance = xe.clearPlugin = void 0;
      var KP = (e) => e.value;
      xe.getPluginConfig = KP;
      var zP = (e, t) => {
          if (t.config.duration !== "auto") return null;
          let r = parseFloat(e.getAttribute("data-duration"));
          return r > 0 ? r * 1e3 : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      };
      xe.getPluginDuration = zP;
      var YP = (e) => e || { value: 0 };
      xe.getPluginOrigin = YP;
      var QP = (e) => ({ value: e.value });
      xe.getPluginDestination = QP;
      var $P = (e) => {
          let t = window.Webflow.require("lottie").createInstance(e);
          return t.stop(), t.setSubframe(!0), t;
      };
      xe.createPluginInstance = $P;
      var ZP = (e, t, r) => {
          if (!e) return;
          let n = t[r.actionTypeId].value / 100;
          e.goToFrame(e.frames * n);
      };
      xe.renderPlugin = ZP;
      var JP = (e) => {
          window.Webflow.require("lottie").createInstance(e).stop();
      };
      xe.clearPlugin = JP;
  });
  var Da = u((Ce) => {
      "use strict";
      Object.defineProperty(Ce, "__esModule", { value: !0 });
      Ce.getPluginOrigin = Ce.getPluginDuration = Ce.getPluginDestination = Ce.getPluginConfig = Ce.createPluginInstance = Ce.clearPlugin = void 0;
      Ce.isPluginType = rD;
      Ce.renderPlugin = void 0;
      var Xt = Jh(),
          eE = Ve(),
          eD = ti(),
          tD = {
              [eE.ActionTypeConsts.PLUGIN_LOTTIE]: {
                  getConfig: Xt.getPluginConfig,
                  getOrigin: Xt.getPluginOrigin,
                  getDuration: Xt.getPluginDuration,
                  getDestination: Xt.getPluginDestination,
                  createInstance: Xt.createPluginInstance,
                  render: Xt.renderPlugin,
                  clear: Xt.clearPlugin,
              },
          };
      function rD(e) {
          return e === eE.ActionTypeConsts.PLUGIN_LOTTIE;
      }
      var Ut = (e) => (t) => {
              if (!eD.IS_BROWSER_ENV) return () => null;
              let r = tD[t];
              if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
              let n = r[e];
              if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
              return n;
          },
          nD = Ut("getConfig");
      Ce.getPluginConfig = nD;
      var iD = Ut("getOrigin");
      Ce.getPluginOrigin = iD;
      var oD = Ut("getDuration");
      Ce.getPluginDuration = oD;
      var aD = Ut("getDestination");
      Ce.getPluginDestination = aD;
      var sD = Ut("createInstance");
      Ce.createPluginInstance = sD;
      var uD = Ut("render");
      Ce.renderPlugin = uD;
      var cD = Ut("clear");
      Ce.clearPlugin = cD;
  });
  var rE = u((Nk, tE) => {
      function lD(e, t) {
          return e == null || e !== e ? t : e;
      }
      tE.exports = lD;
  });
  var iE = u((qk, nE) => {
      function fD(e, t, r, n) {
          var i = -1,
              o = e == null ? 0 : e.length;
          for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
          return r;
      }
      nE.exports = fD;
  });
  var aE = u((xk, oE) => {
      function dD(e) {
          return function (t, r, n) {
              for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
                  var c = s[e ? a : ++i];
                  if (r(o[c], c, o) === !1) break;
              }
              return t;
          };
      }
      oE.exports = dD;
  });
  var uE = u((Lk, sE) => {
      var pD = aE(),
          vD = pD();
      sE.exports = vD;
  });
  var Ma = u((Pk, cE) => {
      var hD = uE(),
          ED = Hr();
      function gD(e, t) {
          return e && hD(e, t, ED);
      }
      cE.exports = gD;
  });
  var fE = u((Dk, lE) => {
      var _D = Ft();
      function yD(e, t) {
          return function (r, n) {
              if (r == null) return r;
              if (!_D(r)) return e(r, n);
              for (var i = r.length, o = t ? i : -1, s = Object(r); (t ? o-- : ++o < i) && n(s[o], o, s) !== !1; );
              return r;
          };
      }
      lE.exports = yD;
  });
  var Fa = u((Mk, dE) => {
      var ID = Ma(),
          mD = fE(),
          TD = mD(ID);
      dE.exports = TD;
  });
  var vE = u((Fk, pE) => {
      function OD(e, t, r, n, i) {
          return (
              i(e, function (o, s, a) {
                  r = n ? ((n = !1), o) : t(r, o, s, a);
              }),
              r
          );
      }
      pE.exports = OD;
  });
  var EE = u((Gk, hE) => {
      var SD = iE(),
          bD = Fa(),
          AD = At(),
          wD = vE(),
          RD = qe();
      function CD(e, t, r) {
          var n = RD(e) ? SD : wD,
              i = arguments.length < 3;
          return n(e, AD(t, 4), r, i, bD);
      }
      hE.exports = CD;
  });
  var _E = u((Xk, gE) => {
      var ND = wa(),
          qD = At(),
          xD = Ra(),
          LD = Math.max,
          PD = Math.min;
      function DD(e, t, r) {
          var n = e == null ? 0 : e.length;
          if (!n) return -1;
          var i = n - 1;
          return r !== void 0 && ((i = xD(r)), (i = r < 0 ? LD(n + i, 0) : PD(i, n - 1))), ND(e, qD(t, 3), i, !0);
      }
      gE.exports = DD;
  });
  var IE = u((Uk, yE) => {
      var MD = Aa(),
          FD = _E(),
          GD = MD(FD);
      yE.exports = GD;
  });
  var TE = u((ai) => {
      "use strict";
      Object.defineProperty(ai, "__esModule", { value: !0 });
      ai.default = void 0;
      var XD = Object.prototype.hasOwnProperty;
      function mE(e, t) {
          return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
      }
      function UD(e, t) {
          if (mE(e, t)) return !0;
          if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
          let r = Object.keys(e),
              n = Object.keys(t);
          if (r.length !== n.length) return !1;
          for (let i = 0; i < r.length; i++) if (!XD.call(t, r[i]) || !mE(e[r[i]], t[r[i]])) return !1;
          return !0;
      }
      var VD = UD;
      ai.default = VD;
  });
  var BE = u((_e) => {
      "use strict";
      var ci = at().default;
      Object.defineProperty(_e, "__esModule", { value: !0 });
      _e.cleanupHTMLElement = GM;
      _e.clearAllStyles = FM;
      _e.getActionListProgress = UM;
      _e.getAffectedElements = Ba;
      _e.getComputedStyle = dM;
      _e.getDestinationValues = yM;
      _e.getElementId = uM;
      _e.getInstanceId = aM;
      _e.getInstanceOrigin = hM;
      _e.getItemConfigByKey = void 0;
      _e.getMaxDurationItemIndex = WE;
      _e.getNamespacedParameterId = BM;
      _e.getRenderType = XE;
      _e.getStyleProp = IM;
      _e.mediaQueriesEqual = kM;
      _e.observeStore = fM;
      _e.reduceListToGroup = VM;
      _e.reifyState = cM;
      _e.renderHTMLElement = mM;
      Object.defineProperty(_e, "shallowEqual", {
          enumerable: !0,
          get: function () {
              return xE.default;
          },
      });
      _e.shouldAllowMediaQuery = HM;
      _e.shouldNamespaceEventParameter = WM;
      _e.stringifyTarget = jM;
      var wt = ci(rE()),
          Xa = ci(EE()),
          Ga = ci(IE()),
          OE = rr(),
          Vt = Ve(),
          xE = ci(TE()),
          WD = La(),
          dt = Da(),
          Ge = ti(),
          {
              BACKGROUND: BD,
              TRANSFORM: HD,
              TRANSLATE_3D: kD,
              SCALE_3D: jD,
              ROTATE_X: KD,
              ROTATE_Y: zD,
              ROTATE_Z: YD,
              SKEW: QD,
              PRESERVE_3D: $D,
              FLEX: ZD,
              OPACITY: si,
              FILTER: Yr,
              FONT_VARIATION_SETTINGS: Qr,
              WIDTH: lt,
              HEIGHT: ft,
              BACKGROUND_COLOR: LE,
              BORDER_COLOR: JD,
              COLOR: eM,
              CHILDREN: SE,
              IMMEDIATE_CHILDREN: tM,
              SIBLINGS: bE,
              PARENT: rM,
              DISPLAY: ui,
              WILL_CHANGE: dr,
              AUTO: Rt,
              COMMA_DELIMITER: $r,
              COLON_DELIMITER: nM,
              BAR_DELIMITER: AE,
              RENDER_TRANSFORM: PE,
              RENDER_GENERAL: Ua,
              RENDER_STYLE: Va,
              RENDER_PLUGIN: DE,
          } = Vt.IX2EngineConstants,
          {
              TRANSFORM_MOVE: pr,
              TRANSFORM_SCALE: vr,
              TRANSFORM_ROTATE: hr,
              TRANSFORM_SKEW: Zr,
              STYLE_OPACITY: ME,
              STYLE_FILTER: Jr,
              STYLE_FONT_VARIATION: en,
              STYLE_SIZE: Er,
              STYLE_BACKGROUND_COLOR: gr,
              STYLE_BORDER: _r,
              STYLE_TEXT_COLOR: yr,
              GENERAL_DISPLAY: li,
          } = Vt.ActionTypeConsts,
          iM = "OBJECT_VALUE",
          FE = (e) => e.trim(),
          Wa = Object.freeze({ [gr]: LE, [_r]: JD, [yr]: eM }),
          GE = Object.freeze({ [Ge.TRANSFORM_PREFIXED]: HD, [LE]: BD, [si]: si, [Yr]: Yr, [lt]: lt, [ft]: ft, [Qr]: Qr }),
          wE = {},
          oM = 1;
      function aM() {
          return "i" + oM++;
      }
      var sM = 1;
      function uM(e, t) {
          for (let r in e) {
              let n = e[r];
              if (n && n.ref === t) return n.id;
          }
          return "e" + sM++;
      }
      function cM({ events: e, actionLists: t, site: r } = {}) {
          let n = (0, Xa.default)(
                  e,
                  (s, a) => {
                      let { eventTypeId: c } = a;
                      return s[c] || (s[c] = {}), (s[c][a.id] = a), s;
                  },
                  {}
              ),
              i = r && r.mediaQueries,
              o = [];
          return i ? (o = i.map((s) => s.key)) : ((i = []), console.warn("IX2 missing mediaQueries in site data")), { ixData: { events: e, actionLists: t, eventTypeMap: n, mediaQueries: i, mediaQueryKeys: o } };
      }
      var lM = (e, t) => e === t;
      function fM({ store: e, select: t, onChange: r, comparator: n = lM }) {
          let { getState: i, subscribe: o } = e,
              s = o(c),
              a = t(i());
          function c() {
              let f = t(i());
              if (f == null) {
                  s();
                  return;
              }
              n(f, a) || ((a = f), r(a, e));
          }
          return s;
      }
      function RE(e) {
          let t = typeof e;
          if (t === "string") return { id: e };
          if (e != null && t === "object") {
              let { id: r, objectId: n, selector: i, selectorGuids: o, appliesTo: s, useEventTarget: a } = e;
              return { id: r, objectId: n, selector: i, selectorGuids: o, appliesTo: s, useEventTarget: a };
          }
          return {};
      }
      function Ba({ config: e, event: t, eventTarget: r, elementRoot: n, elementApi: i }) {
          var o, s, a;
          if (!i) throw new Error("IX2 missing elementApi");
          let { targets: c } = e;
          if (Array.isArray(c) && c.length > 0) return c.reduce((M, X) => M.concat(Ba({ config: { target: X }, event: t, eventTarget: r, elementRoot: n, elementApi: i })), []);
          let { getValidDocument: f, getQuerySelector: p, queryDocument: v, getChildElements: E, getSiblingElements: g, matchSelector: b, elementContains: S, isSiblingNode: x } = i,
              { target: A } = e;
          if (!A) return [];
          let { id: w, objectId: m, selector: N, selectorGuids: C, appliesTo: q, useEventTarget: G } = RE(A);
          if (m) return [wE[m] || (wE[m] = {})];
          if (q === Vt.EventAppliesTo.PAGE) {
              let M = f(w);
              return M ? [M] : [];
          }
          let Y = ((o = t == null || (s = t.action) === null || s === void 0 || (a = s.config) === null || a === void 0 ? void 0 : a.affectedElements) !== null && o !== void 0 ? o : {})[w || N] || {},
              oe = !!(Y.id || Y.selector),
              te,
              D,
              I,
              P = t && p(RE(t.target));
          if ((oe ? ((te = Y.limitAffectedElements), (D = P), (I = p(Y))) : (D = I = p({ id: w, selector: N, selectorGuids: C })), t && G)) {
              let M = r && (I || G === !0) ? [r] : v(P);
              if (I) {
                  if (G === rM) return v(I).filter((X) => M.some((Q) => S(X, Q)));
                  if (G === SE) return v(I).filter((X) => M.some((Q) => S(Q, X)));
                  if (G === bE) return v(I).filter((X) => M.some((Q) => x(Q, X)));
              }
              return M;
          }
          return D == null || I == null ? [] : Ge.IS_BROWSER_ENV && n ? v(I).filter((M) => n.contains(M)) : te === SE ? v(D, I) : te === tM ? E(v(D)).filter(b(I)) : te === bE ? g(v(D)).filter(b(I)) : v(I);
      }
      function dM({ element: e, actionItem: t }) {
          if (!Ge.IS_BROWSER_ENV) return {};
          let { actionTypeId: r } = t;
          switch (r) {
              case Er:
              case gr:
              case _r:
              case yr:
              case li:
                  return window.getComputedStyle(e);
              default:
                  return {};
          }
      }
      var CE = /px/,
          pM = (e, t) => t.reduce((r, n) => (r[n.type] == null && (r[n.type] = TM[n.type]), r), e || {}),
          vM = (e, t) => t.reduce((r, n) => (r[n.type] == null && (r[n.type] = OM[n.type] || n.defaultValue || 0), r), e || {});
      function hM(e, t = {}, r = {}, n, i) {
          let { getStyle: o } = i,
              { actionTypeId: s } = n;
          if ((0, dt.isPluginType)(s)) return (0, dt.getPluginOrigin)(s)(t[s]);
          switch (n.actionTypeId) {
              case pr:
              case vr:
              case hr:
              case Zr:
                  return t[n.actionTypeId] || Ha[n.actionTypeId];
              case Jr:
                  return pM(t[n.actionTypeId], n.config.filters);
              case en:
                  return vM(t[n.actionTypeId], n.config.fontVariations);
              case ME:
                  return { value: (0, wt.default)(parseFloat(o(e, si)), 1) };
              case Er: {
                  let a = o(e, lt),
                      c = o(e, ft),
                      f,
                      p;
                  return (
                      n.config.widthUnit === Rt ? (f = CE.test(a) ? parseFloat(a) : parseFloat(r.width)) : (f = (0, wt.default)(parseFloat(a), parseFloat(r.width))),
                      n.config.heightUnit === Rt ? (p = CE.test(c) ? parseFloat(c) : parseFloat(r.height)) : (p = (0, wt.default)(parseFloat(c), parseFloat(r.height))),
                      { widthValue: f, heightValue: p }
                  );
              }
              case gr:
              case _r:
              case yr:
                  return PM({ element: e, actionTypeId: n.actionTypeId, computedStyle: r, getStyle: o });
              case li:
                  return { value: (0, wt.default)(o(e, ui), r.display) };
              case iM:
                  return t[n.actionTypeId] || { value: 0 };
              default:
                  return;
          }
      }
      var EM = (e, t) => (t && (e[t.type] = t.value || 0), e),
          gM = (e, t) => (t && (e[t.type] = t.value || 0), e),
          _M = (e, t, r) => {
              if ((0, dt.isPluginType)(e)) return (0, dt.getPluginConfig)(e)(r, t);
              switch (e) {
                  case Jr: {
                      let n = (0, Ga.default)(r.filters, ({ type: i }) => i === t);
                      return n ? n.value : 0;
                  }
                  case en: {
                      let n = (0, Ga.default)(r.fontVariations, ({ type: i }) => i === t);
                      return n ? n.value : 0;
                  }
                  default:
                      return r[t];
              }
          };
      _e.getItemConfigByKey = _M;
      function yM({ element: e, actionItem: t, elementApi: r }) {
          if ((0, dt.isPluginType)(t.actionTypeId)) return (0, dt.getPluginDestination)(t.actionTypeId)(t.config);
          switch (t.actionTypeId) {
              case pr:
              case vr:
              case hr:
              case Zr: {
                  let { xValue: n, yValue: i, zValue: o } = t.config;
                  return { xValue: n, yValue: i, zValue: o };
              }
              case Er: {
                  let { getStyle: n, setStyle: i, getProperty: o } = r,
                      { widthUnit: s, heightUnit: a } = t.config,
                      { widthValue: c, heightValue: f } = t.config;
                  if (!Ge.IS_BROWSER_ENV) return { widthValue: c, heightValue: f };
                  if (s === Rt) {
                      let p = n(e, lt);
                      i(e, lt, ""), (c = o(e, "offsetWidth")), i(e, lt, p);
                  }
                  if (a === Rt) {
                      let p = n(e, ft);
                      i(e, ft, ""), (f = o(e, "offsetHeight")), i(e, ft, p);
                  }
                  return { widthValue: c, heightValue: f };
              }
              case gr:
              case _r:
              case yr: {
                  let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
                  return { rValue: n, gValue: i, bValue: o, aValue: s };
              }
              case Jr:
                  return t.config.filters.reduce(EM, {});
              case en:
                  return t.config.fontVariations.reduce(gM, {});
              default: {
                  let { value: n } = t.config;
                  return { value: n };
              }
          }
      }
      function XE(e) {
          if (/^TRANSFORM_/.test(e)) return PE;
          if (/^STYLE_/.test(e)) return Va;
          if (/^GENERAL_/.test(e)) return Ua;
          if (/^PLUGIN_/.test(e)) return DE;
      }
      function IM(e, t) {
          return e === Va ? t.replace("STYLE_", "").toLowerCase() : null;
      }
      function mM(e, t, r, n, i, o, s, a, c) {
          switch (a) {
              case PE:
                  return AM(e, t, r, i, s);
              case Va:
                  return DM(e, t, r, i, o, s);
              case Ua:
                  return MM(e, i, s);
              case DE: {
                  let { actionTypeId: f } = i;
                  if ((0, dt.isPluginType)(f)) return (0, dt.renderPlugin)(f)(c, t, i);
              }
          }
      }
      var Ha = {
              [pr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
              [vr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
              [hr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
              [Zr]: Object.freeze({ xValue: 0, yValue: 0 }),
          },
          TM = Object.freeze({ blur: 0, "hue-rotate": 0, invert: 0, grayscale: 0, saturate: 100, sepia: 0, contrast: 100, brightness: 100 }),
          OM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
          SM = (e, t) => {
              let r = (0, Ga.default)(t.filters, ({ type: n }) => n === e);
              if (r && r.unit) return r.unit;
              switch (e) {
                  case "blur":
                      return "px";
                  case "hue-rotate":
                      return "deg";
                  default:
                      return "%";
              }
          },
          bM = Object.keys(Ha);
      function AM(e, t, r, n, i) {
          let o = bM
                  .map((a) => {
                      let c = Ha[a],
                          { xValue: f = c.xValue, yValue: p = c.yValue, zValue: v = c.zValue, xUnit: E = "", yUnit: g = "", zUnit: b = "" } = t[a] || {};
                      switch (a) {
                          case pr:
                              return `${kD}(${f}${E}, ${p}${g}, ${v}${b})`;
                          case vr:
                              return `${jD}(${f}${E}, ${p}${g}, ${v}${b})`;
                          case hr:
                              return `${KD}(${f}${E}) ${zD}(${p}${g}) ${YD}(${v}${b})`;
                          case Zr:
                              return `${QD}(${f}${E}, ${p}${g})`;
                          default:
                              return "";
                      }
                  })
                  .join(" "),
              { setStyle: s } = i;
          Wt(e, Ge.TRANSFORM_PREFIXED, i), s(e, Ge.TRANSFORM_PREFIXED, o), CM(n, r) && s(e, Ge.TRANSFORM_STYLE_PREFIXED, $D);
      }
      function wM(e, t, r, n) {
          let i = (0, Xa.default)(t, (s, a, c) => `${s} ${c}(${a}${SM(c, r)})`, ""),
              { setStyle: o } = n;
          Wt(e, Yr, n), o(e, Yr, i);
      }
      function RM(e, t, r, n) {
          let i = (0, Xa.default)(t, (s, a, c) => (s.push(`"${c}" ${a}`), s), []).join(", "),
              { setStyle: o } = n;
          Wt(e, Qr, n), o(e, Qr, i);
      }
      function CM({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
          return (e === pr && n !== void 0) || (e === vr && n !== void 0) || (e === hr && (t !== void 0 || r !== void 0));
      }
      var NM = "\\(([^)]+)\\)",
          qM = /^rgb/,
          xM = RegExp(`rgba?${NM}`);
      function LM(e, t) {
          let r = e.exec(t);
          return r ? r[1] : "";
      }
      function PM({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
          let i = Wa[t],
              o = n(e, i),
              s = qM.test(o) ? o : r[i],
              a = LM(xM, s).split($r);
          return { rValue: (0, wt.default)(parseInt(a[0], 10), 255), gValue: (0, wt.default)(parseInt(a[1], 10), 255), bValue: (0, wt.default)(parseInt(a[2], 10), 255), aValue: (0, wt.default)(parseFloat(a[3]), 1) };
      }
      function DM(e, t, r, n, i, o) {
          let { setStyle: s } = o;
          switch (n.actionTypeId) {
              case Er: {
                  let { widthUnit: a = "", heightUnit: c = "" } = n.config,
                      { widthValue: f, heightValue: p } = r;
                  f !== void 0 && (a === Rt && (a = "px"), Wt(e, lt, o), s(e, lt, f + a)), p !== void 0 && (c === Rt && (c = "px"), Wt(e, ft, o), s(e, ft, p + c));
                  break;
              }
              case Jr: {
                  wM(e, r, n.config, o);
                  break;
              }
              case en: {
                  RM(e, r, n.config, o);
                  break;
              }
              case gr:
              case _r:
              case yr: {
                  let a = Wa[n.actionTypeId],
                      c = Math.round(r.rValue),
                      f = Math.round(r.gValue),
                      p = Math.round(r.bValue),
                      v = r.aValue;
                  Wt(e, a, o), s(e, a, v >= 1 ? `rgb(${c},${f},${p})` : `rgba(${c},${f},${p},${v})`);
                  break;
              }
              default: {
                  let { unit: a = "" } = n.config;
                  Wt(e, i, o), s(e, i, r.value + a);
                  break;
              }
          }
      }
      function MM(e, t, r) {
          let { setStyle: n } = r;
          switch (t.actionTypeId) {
              case li: {
                  let { value: i } = t.config;
                  i === ZD && Ge.IS_BROWSER_ENV ? n(e, ui, Ge.FLEX_PREFIXED) : n(e, ui, i);
                  return;
              }
          }
      }
      function Wt(e, t, r) {
          if (!Ge.IS_BROWSER_ENV) return;
          let n = GE[t];
          if (!n) return;
          let { getStyle: i, setStyle: o } = r,
              s = i(e, dr);
          if (!s) {
              o(e, dr, n);
              return;
          }
          let a = s.split($r).map(FE);
          a.indexOf(n) === -1 && o(e, dr, a.concat(n).join($r));
      }
      function UE(e, t, r) {
          if (!Ge.IS_BROWSER_ENV) return;
          let n = GE[t];
          if (!n) return;
          let { getStyle: i, setStyle: o } = r,
              s = i(e, dr);
          !s ||
              s.indexOf(n) === -1 ||
              o(
                  e,
                  dr,
                  s
                      .split($r)
                      .map(FE)
                      .filter((a) => a !== n)
                      .join($r)
              );
      }
      function FM({ store: e, elementApi: t }) {
          let { ixData: r } = e.getState(),
              { events: n = {}, actionLists: i = {} } = r;
          Object.keys(n).forEach((o) => {
              let s = n[o],
                  { config: a } = s.action,
                  { actionListId: c } = a,
                  f = i[c];
              f && NE({ actionList: f, event: s, elementApi: t });
          }),
              Object.keys(i).forEach((o) => {
                  NE({ actionList: i[o], elementApi: t });
              });
      }
      function NE({ actionList: e = {}, event: t, elementApi: r }) {
          let { actionItemGroups: n, continuousParameterGroups: i } = e;
          n &&
              n.forEach((o) => {
                  qE({ actionGroup: o, event: t, elementApi: r });
              }),
              i &&
                  i.forEach((o) => {
                      let { continuousActionGroups: s } = o;
                      s.forEach((a) => {
                          qE({ actionGroup: a, event: t, elementApi: r });
                      });
                  });
      }
      function qE({ actionGroup: e, event: t, elementApi: r }) {
          let { actionItems: n } = e;
          n.forEach(({ actionTypeId: i, config: o }) => {
              let s;
              (0, dt.isPluginType)(i) ? (s = (0, dt.clearPlugin)(i)) : (s = VE({ effect: XM, actionTypeId: i, elementApi: r })), Ba({ config: o, event: t, elementApi: r }).forEach(s);
          });
      }
      function GM(e, t, r) {
          let { setStyle: n, getStyle: i } = r,
              { actionTypeId: o } = t;
          if (o === Er) {
              let { config: s } = t;
              s.widthUnit === Rt && n(e, lt, ""), s.heightUnit === Rt && n(e, ft, "");
          }
          i(e, dr) && VE({ effect: UE, actionTypeId: o, elementApi: r })(e);
      }
      var VE = ({ effect: e, actionTypeId: t, elementApi: r }) => (n) => {
          switch (t) {
              case pr:
              case vr:
              case hr:
              case Zr:
                  e(n, Ge.TRANSFORM_PREFIXED, r);
                  break;
              case Jr:
                  e(n, Yr, r);
                  break;
              case en:
                  e(n, Qr, r);
                  break;
              case ME:
                  e(n, si, r);
                  break;
              case Er:
                  e(n, lt, r), e(n, ft, r);
                  break;
              case gr:
              case _r:
              case yr:
                  e(n, Wa[t], r);
                  break;
              case li:
                  e(n, ui, r);
                  break;
          }
      };
      function XM(e, t, r) {
          let { setStyle: n } = r;
          UE(e, t, r), n(e, t, ""), t === Ge.TRANSFORM_PREFIXED && n(e, Ge.TRANSFORM_STYLE_PREFIXED, "");
      }
      function WE(e) {
          let t = 0,
              r = 0;
          return (
              e.forEach((n, i) => {
                  let { config: o } = n,
                      s = o.delay + o.duration;
                  s >= t && ((t = s), (r = i));
              }),
              r
          );
      }
      function UM(e, t) {
          let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
              { actionItem: i, verboseTimeElapsed: o = 0 } = t,
              s = 0,
              a = 0;
          return (
              r.forEach((c, f) => {
                  if (n && f === 0) return;
                  let { actionItems: p } = c,
                      v = p[WE(p)],
                      { config: E, actionTypeId: g } = v;
                  i.id === v.id && (a = s + o);
                  let b = XE(g) === Ua ? 0 : E.duration;
                  s += E.delay + b;
              }),
              s > 0 ? (0, WD.optimizeFloat)(a / s) : 0
          );
      }
      function VM({ actionList: e, actionItemId: t, rawData: r }) {
          let { actionItemGroups: n, continuousParameterGroups: i } = e,
              o = [],
              s = (a) => (o.push((0, OE.mergeIn)(a, ["config"], { delay: 0, duration: 0 })), a.id === t);
          return (
              n && n.some(({ actionItems: a }) => a.some(s)),
              i &&
                  i.some((a) => {
                      let { continuousActionGroups: c } = a;
                      return c.some(({ actionItems: f }) => f.some(s));
                  }),
              (0, OE.setIn)(r, ["actionLists"], { [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] } })
          );
      }
      function WM(e, { basedOn: t }) {
          return (e === Vt.EventTypeConsts.SCROLLING_IN_VIEW && (t === Vt.EventBasedOn.ELEMENT || t == null)) || (e === Vt.EventTypeConsts.MOUSE_MOVE && t === Vt.EventBasedOn.ELEMENT);
      }
      function BM(e, t) {
          return e + nM + t;
      }
      function HM(e, t) {
          return t == null ? !0 : e.indexOf(t) !== -1;
      }
      function kM(e, t) {
          return (0, xE.default)(e && e.sort(), t && t.sort());
      }
      function jM(e) {
          if (typeof e == "string") return e;
          let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
          return t + AE + r + AE + n;
      }
  });
  var Bt = u((Xe) => {
      "use strict";
      var Ir = zt().default;
      Object.defineProperty(Xe, "__esModule", { value: !0 });
      Xe.IX2VanillaUtils = Xe.IX2VanillaPlugins = Xe.IX2ElementsReducer = Xe.IX2Easings = Xe.IX2EasingUtils = Xe.IX2BrowserSupport = void 0;
      var KM = Ir(ti());
      Xe.IX2BrowserSupport = KM;
      var zM = Ir(qa());
      Xe.IX2Easings = zM;
      var YM = Ir(La());
      Xe.IX2EasingUtils = YM;
      var QM = Ir(Zh());
      Xe.IX2ElementsReducer = QM;
      var $M = Ir(Da());
      Xe.IX2VanillaPlugins = $M;
      var ZM = Ir(BE());
      Xe.IX2VanillaUtils = ZM;
  });
  var KE = u((di) => {
      "use strict";
      Object.defineProperty(di, "__esModule", { value: !0 });
      di.ixInstances = void 0;
      var HE = Ve(),
          kE = Bt(),
          mr = rr(),
          { IX2_RAW_DATA_IMPORTED: JM, IX2_SESSION_STOPPED: eF, IX2_INSTANCE_ADDED: tF, IX2_INSTANCE_STARTED: rF, IX2_INSTANCE_REMOVED: nF, IX2_ANIMATION_FRAME_CHANGED: iF } = HE.IX2EngineActionTypes,
          { optimizeFloat: fi, applyEasing: jE, createBezierEasing: oF } = kE.IX2EasingUtils,
          { RENDER_GENERAL: aF } = HE.IX2EngineConstants,
          { getItemConfigByKey: ka, getRenderType: sF, getStyleProp: uF } = kE.IX2VanillaUtils,
          cF = (e, t) => {
              let { position: r, parameterId: n, actionGroups: i, destinationKeys: o, smoothing: s, restingValue: a, actionTypeId: c, customEasingFn: f, skipMotion: p, skipToValue: v } = e,
                  { parameters: E } = t.payload,
                  g = Math.max(1 - s, 0.01),
                  b = E[n];
              b == null && ((g = 1), (b = a));
              let S = Math.max(b, 0) || 0,
                  x = fi(S - r),
                  A = p ? v : fi(r + x * g),
                  w = A * 100;
              if (A === r && e.current) return e;
              let m, N, C, q;
              for (let j = 0, { length: Y } = i; j < Y; j++) {
                  let { keyframe: oe, actionItems: te } = i[j];
                  if ((j === 0 && (m = te[0]), w >= oe)) {
                      m = te[0];
                      let D = i[j + 1],
                          I = D && w !== oe;
                      (N = I ? D.actionItems[0] : null), I && ((C = oe / 100), (q = (D.keyframe - oe) / 100));
                  }
              }
              let G = {};
              if (m && !N)
                  for (let j = 0, { length: Y } = o; j < Y; j++) {
                      let oe = o[j];
                      G[oe] = ka(c, oe, m.config);
                  }
              else if (m && N && C !== void 0 && q !== void 0) {
                  let j = (A - C) / q,
                      Y = m.config.easing,
                      oe = jE(Y, j, f);
                  for (let te = 0, { length: D } = o; te < D; te++) {
                      let I = o[te],
                          P = ka(c, I, m.config),
                          Q = (ka(c, I, N.config) - P) * oe + P;
                      G[I] = Q;
                  }
              }
              return (0, mr.merge)(e, { position: A, current: G });
          },
          lF = (e, t) => {
              let { active: r, origin: n, start: i, immediate: o, renderType: s, verbose: a, actionItem: c, destination: f, destinationKeys: p, pluginDuration: v, instanceDelay: E, customEasingFn: g, skipMotion: b } = e,
                  S = c.config.easing,
                  { duration: x, delay: A } = c.config;
              v != null && (x = v), (A = E ?? A), s === aF ? (x = 0) : (o || b) && (x = A = 0);
              let { now: w } = t.payload;
              if (r && n) {
                  let m = w - (i + A);
                  if (a) {
                      let j = w - i,
                          Y = x + A,
                          oe = fi(Math.min(Math.max(0, j / Y), 1));
                      e = (0, mr.set)(e, "verboseTimeElapsed", Y * oe);
                  }
                  if (m < 0) return e;
                  let N = fi(Math.min(Math.max(0, m / x), 1)),
                      C = jE(S, N, g),
                      q = {},
                      G = null;
                  return (
                      p.length &&
                          (G = p.reduce((j, Y) => {
                              let oe = f[Y],
                                  te = parseFloat(n[Y]) || 0,
                                  I = (parseFloat(oe) - te) * C + te;
                              return (j[Y] = I), j;
                          }, {})),
                      (q.current = G),
                      (q.position = N),
                      N === 1 && ((q.active = !1), (q.complete = !0)),
                      (0, mr.merge)(e, q)
                  );
              }
              return e;
          },
          fF = (e = Object.freeze({}), t) => {
              switch (t.type) {
                  case JM:
                      return t.payload.ixInstances || Object.freeze({});
                  case eF:
                      return Object.freeze({});
                  case tF: {
                      let {
                              instanceId: r,
                              elementId: n,
                              actionItem: i,
                              eventId: o,
                              eventTarget: s,
                              eventStateKey: a,
                              actionListId: c,
                              groupIndex: f,
                              isCarrier: p,
                              origin: v,
                              destination: E,
                              immediate: g,
                              verbose: b,
                              continuous: S,
                              parameterId: x,
                              actionGroups: A,
                              smoothing: w,
                              restingValue: m,
                              pluginInstance: N,
                              pluginDuration: C,
                              instanceDelay: q,
                              skipMotion: G,
                              skipToValue: j,
                          } = t.payload,
                          { actionTypeId: Y } = i,
                          oe = sF(Y),
                          te = uF(oe, Y),
                          D = Object.keys(E).filter((P) => E[P] != null),
                          { easing: I } = i.config;
                      return (0, mr.set)(e, r, {
                          id: r,
                          elementId: n,
                          active: !1,
                          position: 0,
                          start: 0,
                          origin: v,
                          destination: E,
                          destinationKeys: D,
                          immediate: g,
                          verbose: b,
                          current: null,
                          actionItem: i,
                          actionTypeId: Y,
                          eventId: o,
                          eventTarget: s,
                          eventStateKey: a,
                          actionListId: c,
                          groupIndex: f,
                          renderType: oe,
                          isCarrier: p,
                          styleProp: te,
                          continuous: S,
                          parameterId: x,
                          actionGroups: A,
                          smoothing: w,
                          restingValue: m,
                          pluginInstance: N,
                          pluginDuration: C,
                          instanceDelay: q,
                          skipMotion: G,
                          skipToValue: j,
                          customEasingFn: Array.isArray(I) && I.length === 4 ? oF(I) : void 0,
                      });
                  }
                  case rF: {
                      let { instanceId: r, time: n } = t.payload;
                      return (0, mr.mergeIn)(e, [r], { active: !0, complete: !1, start: n });
                  }
                  case nF: {
                      let { instanceId: r } = t.payload;
                      if (!e[r]) return e;
                      let n = {},
                          i = Object.keys(e),
                          { length: o } = i;
                      for (let s = 0; s < o; s++) {
                          let a = i[s];
                          a !== r && (n[a] = e[a]);
                      }
                      return n;
                  }
                  case iF: {
                      let r = e,
                          n = Object.keys(e),
                          { length: i } = n;
                      for (let o = 0; o < i; o++) {
                          let s = n[o],
                              a = e[s],
                              c = a.continuous ? cF : lF;
                          r = (0, mr.set)(r, s, c(a, t));
                      }
                      return r;
                  }
                  default:
                      return e;
              }
          };
      di.ixInstances = fF;
  });
  var zE = u((pi) => {
      "use strict";
      Object.defineProperty(pi, "__esModule", { value: !0 });
      pi.ixParameters = void 0;
      var dF = Ve(),
          { IX2_RAW_DATA_IMPORTED: pF, IX2_SESSION_STOPPED: vF, IX2_PARAMETER_CHANGED: hF } = dF.IX2EngineActionTypes,
          EF = (e = {}, t) => {
              switch (t.type) {
                  case pF:
                      return t.payload.ixParameters || {};
                  case vF:
                      return {};
                  case hF: {
                      let { key: r, value: n } = t.payload;
                      return (e[r] = n), e;
                  }
                  default:
                      return e;
              }
          };
      pi.ixParameters = EF;
  });
  var YE = u((vi) => {
      "use strict";
      Object.defineProperty(vi, "__esModule", { value: !0 });
      vi.default = void 0;
      var gF = zo(),
          _F = Ef(),
          yF = Df(),
          IF = Ff(),
          mF = Bt(),
          TF = KE(),
          OF = zE(),
          { ixElements: SF } = mF.IX2ElementsReducer,
          bF = (0, gF.combineReducers)({ ixData: _F.ixData, ixRequest: yF.ixRequest, ixSession: IF.ixSession, ixElements: SF, ixInstances: TF.ixInstances, ixParameters: OF.ixParameters });
      vi.default = bF;
  });
  var QE = u((Kk, tn) => {
      function AF(e, t) {
          if (e == null) return {};
          var r = {},
              n = Object.keys(e),
              i,
              o;
          for (o = 0; o < n.length; o++) (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
          return r;
      }
      (tn.exports = AF), (tn.exports.__esModule = !0), (tn.exports.default = tn.exports);
  });
  var ZE = u((zk, $E) => {
      var wF = St(),
          RF = qe(),
          CF = gt(),
          NF = "[object String]";
      function qF(e) {
          return typeof e == "string" || (!RF(e) && CF(e) && wF(e) == NF);
      }
      $E.exports = qF;
  });
  var eg = u((Yk, JE) => {
      var xF = ba(),
          LF = xF("length");
      JE.exports = LF;
  });
  var rg = u((Qk, tg) => {
      var PF = "\\ud800-\\udfff",
          DF = "\\u0300-\\u036f",
          MF = "\\ufe20-\\ufe2f",
          FF = "\\u20d0-\\u20ff",
          GF = DF + MF + FF,
          XF = "\\ufe0e\\ufe0f",
          UF = "\\u200d",
          VF = RegExp("[" + UF + PF + GF + XF + "]");
      function WF(e) {
          return VF.test(e);
      }
      tg.exports = WF;
  });
  var fg = u(($k, lg) => {
      var ig = "\\ud800-\\udfff",
          BF = "\\u0300-\\u036f",
          HF = "\\ufe20-\\ufe2f",
          kF = "\\u20d0-\\u20ff",
          jF = BF + HF + kF,
          KF = "\\ufe0e\\ufe0f",
          zF = "[" + ig + "]",
          ja = "[" + jF + "]",
          Ka = "\\ud83c[\\udffb-\\udfff]",
          YF = "(?:" + ja + "|" + Ka + ")",
          og = "[^" + ig + "]",
          ag = "(?:\\ud83c[\\udde6-\\uddff]){2}",
          sg = "[\\ud800-\\udbff][\\udc00-\\udfff]",
          QF = "\\u200d",
          ug = YF + "?",
          cg = "[" + KF + "]?",
          $F = "(?:" + QF + "(?:" + [og, ag, sg].join("|") + ")" + cg + ug + ")*",
          ZF = cg + ug + $F,
          JF = "(?:" + [og + ja + "?", ja, ag, sg, zF].join("|") + ")",
          ng = RegExp(Ka + "(?=" + Ka + ")|" + JF + ZF, "g");
      function e1(e) {
          for (var t = (ng.lastIndex = 0); ng.test(e); ) ++t;
          return t;
      }
      lg.exports = e1;
  });
  var pg = u((Zk, dg) => {
      var t1 = eg(),
          r1 = rg(),
          n1 = fg();
      function i1(e) {
          return r1(e) ? n1(e) : t1(e);
      }
      dg.exports = i1;
  });
  var hg = u((Jk, vg) => {
      var o1 = jn(),
          a1 = Kn(),
          s1 = Ft(),
          u1 = ZE(),
          c1 = pg(),
          l1 = "[object Map]",
          f1 = "[object Set]";
      function d1(e) {
          if (e == null) return 0;
          if (s1(e)) return u1(e) ? c1(e) : e.length;
          var t = a1(e);
          return t == l1 || t == f1 ? e.size : o1(e).length;
      }
      vg.exports = d1;
  });
  var gg = u((ej, Eg) => {
      var p1 = "Expected a function";
      function v1(e) {
          if (typeof e != "function") throw new TypeError(p1);
          return function () {
              var t = arguments;
              switch (t.length) {
                  case 0:
                      return !e.call(this);
                  case 1:
                      return !e.call(this, t[0]);
                  case 2:
                      return !e.call(this, t[0], t[1]);
                  case 3:
                      return !e.call(this, t[0], t[1], t[2]);
              }
              return !e.apply(this, t);
          };
      }
      Eg.exports = v1;
  });
  var za = u((tj, _g) => {
      var h1 = bt(),
          E1 = (function () {
              try {
                  var e = h1(Object, "defineProperty");
                  return e({}, "", {}), e;
              } catch {}
          })();
      _g.exports = E1;
  });
  var Ya = u((rj, Ig) => {
      var yg = za();
      function g1(e, t, r) {
          t == "__proto__" && yg ? yg(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : (e[t] = r);
      }
      Ig.exports = g1;
  });
  var Tg = u((nj, mg) => {
      var _1 = Ya(),
          y1 = Mn(),
          I1 = Object.prototype,
          m1 = I1.hasOwnProperty;
      function T1(e, t, r) {
          var n = e[t];
          (!(m1.call(e, t) && y1(n, r)) || (r === void 0 && !(t in e))) && _1(e, t, r);
      }
      mg.exports = T1;
  });
  var bg = u((ij, Sg) => {
      var O1 = Tg(),
          S1 = jr(),
          b1 = Wn(),
          Og = ct(),
          A1 = lr();
      function w1(e, t, r, n) {
          if (!Og(e)) return e;
          t = S1(t, e);
          for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
              var c = A1(t[i]),
                  f = r;
              if (c === "__proto__" || c === "constructor" || c === "prototype") return e;
              if (i != s) {
                  var p = a[c];
                  (f = n ? n(p, c, a) : void 0), f === void 0 && (f = Og(p) ? p : b1(t[i + 1]) ? [] : {});
              }
              O1(a, c, f), (a = a[c]);
          }
          return e;
      }
      Sg.exports = w1;
  });
  var wg = u((oj, Ag) => {
      var R1 = Qn(),
          C1 = bg(),
          N1 = jr();
      function q1(e, t, r) {
          for (var n = -1, i = t.length, o = {}; ++n < i; ) {
              var s = t[n],
                  a = R1(e, s);
              r(a, s) && C1(o, N1(s, e), a);
          }
          return o;
      }
      Ag.exports = q1;
  });
  var Cg = u((aj, Rg) => {
      var x1 = Un(),
          L1 = Do(),
          P1 = la(),
          D1 = ca(),
          M1 = Object.getOwnPropertySymbols,
          F1 = M1
              ? function (e) {
                    for (var t = []; e; ) x1(t, P1(e)), (e = L1(e));
                    return t;
                }
              : D1;
      Rg.exports = F1;
  });
  var qg = u((sj, Ng) => {
      function G1(e) {
          var t = [];
          if (e != null) for (var r in Object(e)) t.push(r);
          return t;
      }
      Ng.exports = G1;
  });
  var Lg = u((uj, xg) => {
      var X1 = ct(),
          U1 = kn(),
          V1 = qg(),
          W1 = Object.prototype,
          B1 = W1.hasOwnProperty;
      function H1(e) {
          if (!X1(e)) return V1(e);
          var t = U1(e),
              r = [];
          for (var n in e) (n == "constructor" && (t || !B1.call(e, n))) || r.push(n);
          return r;
      }
      xg.exports = H1;
  });
  var Dg = u((cj, Pg) => {
      var k1 = da(),
          j1 = Lg(),
          K1 = Ft();
      function z1(e) {
          return K1(e) ? k1(e, !0) : j1(e);
      }
      Pg.exports = z1;
  });
  var Fg = u((lj, Mg) => {
      var Y1 = ua(),
          Q1 = Cg(),
          $1 = Dg();
      function Z1(e) {
          return Y1(e, $1, Q1);
      }
      Mg.exports = Z1;
  });
  var Xg = u((fj, Gg) => {
      var J1 = Sa(),
          e2 = At(),
          t2 = wg(),
          r2 = Fg();
      function n2(e, t) {
          if (e == null) return {};
          var r = J1(r2(e), function (n) {
              return [n];
          });
          return (
              (t = e2(t)),
              t2(e, r, function (n, i) {
                  return t(n, i[0]);
              })
          );
      }
      Gg.exports = n2;
  });
  var Vg = u((dj, Ug) => {
      var i2 = At(),
          o2 = gg(),
          a2 = Xg();
      function s2(e, t) {
          return a2(e, o2(i2(t)));
      }
      Ug.exports = s2;
  });
  var Bg = u((pj, Wg) => {
      var u2 = jn(),
          c2 = Kn(),
          l2 = Ur(),
          f2 = qe(),
          d2 = Ft(),
          p2 = Vn(),
          v2 = kn(),
          h2 = Hn(),
          E2 = "[object Map]",
          g2 = "[object Set]",
          _2 = Object.prototype,
          y2 = _2.hasOwnProperty;
      function I2(e) {
          if (e == null) return !0;
          if (d2(e) && (f2(e) || typeof e == "string" || typeof e.splice == "function" || p2(e) || h2(e) || l2(e))) return !e.length;
          var t = c2(e);
          if (t == E2 || t == g2) return !e.size;
          if (v2(e)) return !u2(e).length;
          for (var r in e) if (y2.call(e, r)) return !1;
          return !0;
      }
      Wg.exports = I2;
  });
  var kg = u((vj, Hg) => {
      var m2 = Ya(),
          T2 = Ma(),
          O2 = At();
      function S2(e, t) {
          var r = {};
          return (
              (t = O2(t, 3)),
              T2(e, function (n, i, o) {
                  m2(r, i, t(n, i, o));
              }),
              r
          );
      }
      Hg.exports = S2;
  });
  var Kg = u((hj, jg) => {
      function b2(e, t) {
          for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; );
          return e;
      }
      jg.exports = b2;
  });
  var Yg = u((Ej, zg) => {
      var A2 = Zn();
      function w2(e) {
          return typeof e == "function" ? e : A2;
      }
      zg.exports = w2;
  });
  var $g = u((gj, Qg) => {
      var R2 = Kg(),
          C2 = Fa(),
          N2 = Yg(),
          q2 = qe();
      function x2(e, t) {
          var r = q2(e) ? R2 : C2;
          return r(e, N2(t));
      }
      Qg.exports = x2;
  });
  var Jg = u((_j, Zg) => {
      var L2 = Je(),
          P2 = function () {
              return L2.Date.now();
          };
      Zg.exports = P2;
  });
  var r_ = u((yj, t_) => {
      var D2 = ct(),
          Qa = Jg(),
          e_ = Jn(),
          M2 = "Expected a function",
          F2 = Math.max,
          G2 = Math.min;
      function X2(e, t, r) {
          var n,
              i,
              o,
              s,
              a,
              c,
              f = 0,
              p = !1,
              v = !1,
              E = !0;
          if (typeof e != "function") throw new TypeError(M2);
          (t = e_(t) || 0), D2(r) && ((p = !!r.leading), (v = "maxWait" in r), (o = v ? F2(e_(r.maxWait) || 0, t) : o), (E = "trailing" in r ? !!r.trailing : E));
          function g(q) {
              var G = n,
                  j = i;
              return (n = i = void 0), (f = q), (s = e.apply(j, G)), s;
          }
          function b(q) {
              return (f = q), (a = setTimeout(A, t)), p ? g(q) : s;
          }
          function S(q) {
              var G = q - c,
                  j = q - f,
                  Y = t - G;
              return v ? G2(Y, o - j) : Y;
          }
          function x(q) {
              var G = q - c,
                  j = q - f;
              return c === void 0 || G >= t || G < 0 || (v && j >= o);
          }
          function A() {
              var q = Qa();
              if (x(q)) return w(q);
              a = setTimeout(A, S(q));
          }
          function w(q) {
              return (a = void 0), E && n ? g(q) : ((n = i = void 0), s);
          }
          function m() {
              a !== void 0 && clearTimeout(a), (f = 0), (n = c = i = a = void 0);
          }
          function N() {
              return a === void 0 ? s : w(Qa());
          }
          function C() {
              var q = Qa(),
                  G = x(q);
              if (((n = arguments), (i = this), (c = q), G)) {
                  if (a === void 0) return b(c);
                  if (v) return clearTimeout(a), (a = setTimeout(A, t)), g(c);
              }
              return a === void 0 && (a = setTimeout(A, t)), s;
          }
          return (C.cancel = m), (C.flush = N), C;
      }
      t_.exports = X2;
  });
  var i_ = u((Ij, n_) => {
      var U2 = r_(),
          V2 = ct(),
          W2 = "Expected a function";
      function B2(e, t, r) {
          var n = !0,
              i = !0;
          if (typeof e != "function") throw new TypeError(W2);
          return V2(r) && ((n = "leading" in r ? !!r.leading : n), (i = "trailing" in r ? !!r.trailing : i)), U2(e, t, { leading: n, maxWait: t, trailing: i });
      }
      n_.exports = B2;
  });
  var hi = u((se) => {
      "use strict";
      var H2 = at().default;
      Object.defineProperty(se, "__esModule", { value: !0 });
      se.viewportWidthChanged = se.testFrameRendered = se.stopRequested = se.sessionStopped = se.sessionStarted = se.sessionInitialized = se.rawDataImported = se.previewRequested = se.playbackRequested = se.parameterChanged = se.mediaQueriesDefined = se.instanceStarted = se.instanceRemoved = se.instanceAdded = se.eventStateChanged = se.eventListenerAdded = se.elementStateChanged = se.clearRequested = se.animationFrameChanged = se.actionListPlaybackChanged = void 0;
      var o_ = H2(Dr()),
          a_ = Ve(),
          k2 = Bt(),
          {
              IX2_RAW_DATA_IMPORTED: j2,
              IX2_SESSION_INITIALIZED: K2,
              IX2_SESSION_STARTED: z2,
              IX2_SESSION_STOPPED: Y2,
              IX2_PREVIEW_REQUESTED: Q2,
              IX2_PLAYBACK_REQUESTED: $2,
              IX2_STOP_REQUESTED: Z2,
              IX2_CLEAR_REQUESTED: J2,
              IX2_EVENT_LISTENER_ADDED: eG,
              IX2_TEST_FRAME_RENDERED: tG,
              IX2_EVENT_STATE_CHANGED: rG,
              IX2_ANIMATION_FRAME_CHANGED: nG,
              IX2_PARAMETER_CHANGED: iG,
              IX2_INSTANCE_ADDED: oG,
              IX2_INSTANCE_STARTED: aG,
              IX2_INSTANCE_REMOVED: sG,
              IX2_ELEMENT_STATE_CHANGED: uG,
              IX2_ACTION_LIST_PLAYBACK_CHANGED: cG,
              IX2_VIEWPORT_WIDTH_CHANGED: lG,
              IX2_MEDIA_QUERIES_DEFINED: fG,
          } = a_.IX2EngineActionTypes,
          { reifyState: dG } = k2.IX2VanillaUtils,
          pG = (e) => ({ type: j2, payload: (0, o_.default)({}, dG(e)) });
      se.rawDataImported = pG;
      var vG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({ type: K2, payload: { hasBoundaryNodes: e, reducedMotion: t } });
      se.sessionInitialized = vG;
      var hG = () => ({ type: z2 });
      se.sessionStarted = hG;
      var EG = () => ({ type: Y2 });
      se.sessionStopped = EG;
      var gG = ({ rawData: e, defer: t }) => ({ type: Q2, payload: { defer: t, rawData: e } });
      se.previewRequested = gG;
      var _G = ({ actionTypeId: e = a_.ActionTypeConsts.GENERAL_START_ACTION, actionListId: t, actionItemId: r, eventId: n, allowEvents: i, immediate: o, testManual: s, verbose: a, rawData: c }) => ({
          type: $2,
          payload: { actionTypeId: e, actionListId: t, actionItemId: r, testManual: s, eventId: n, allowEvents: i, immediate: o, verbose: a, rawData: c },
      });
      se.playbackRequested = _G;
      var yG = (e) => ({ type: Z2, payload: { actionListId: e } });
      se.stopRequested = yG;
      var IG = () => ({ type: J2 });
      se.clearRequested = IG;
      var mG = (e, t) => ({ type: eG, payload: { target: e, listenerParams: t } });
      se.eventListenerAdded = mG;
      var TG = (e = 1) => ({ type: tG, payload: { step: e } });
      se.testFrameRendered = TG;
      var OG = (e, t) => ({ type: rG, payload: { stateKey: e, newState: t } });
      se.eventStateChanged = OG;
      var SG = (e, t) => ({ type: nG, payload: { now: e, parameters: t } });
      se.animationFrameChanged = SG;
      var bG = (e, t) => ({ type: iG, payload: { key: e, value: t } });
      se.parameterChanged = bG;
      var AG = (e) => ({ type: oG, payload: (0, o_.default)({}, e) });
      se.instanceAdded = AG;
      var wG = (e, t) => ({ type: aG, payload: { instanceId: e, time: t } });
      se.instanceStarted = wG;
      var RG = (e) => ({ type: sG, payload: { instanceId: e } });
      se.instanceRemoved = RG;
      var CG = (e, t, r, n) => ({ type: uG, payload: { elementId: e, actionTypeId: t, current: r, actionItem: n } });
      se.elementStateChanged = CG;
      var NG = ({ actionListId: e, isPlaying: t }) => ({ type: cG, payload: { actionListId: e, isPlaying: t } });
      se.actionListPlaybackChanged = NG;
      var qG = ({ width: e, mediaQueries: t }) => ({ type: lG, payload: { width: e, mediaQueries: t } });
      se.viewportWidthChanged = qG;
      var xG = () => ({ type: fG });
      se.mediaQueriesDefined = xG;
  });
  var c_ = u((Le) => {
      "use strict";
      Object.defineProperty(Le, "__esModule", { value: !0 });
      Le.elementContains = HG;
      Le.getChildElements = jG;
      Le.getClosestElement = void 0;
      Le.getProperty = XG;
      Le.getQuerySelector = VG;
      Le.getRefType = YG;
      Le.getSiblingElements = KG;
      Le.getStyle = GG;
      Le.getValidDocument = WG;
      Le.isSiblingNode = kG;
      Le.matchSelector = UG;
      Le.queryDocument = BG;
      Le.setStyle = FG;
      var LG = Bt(),
          PG = Ve(),
          { ELEMENT_MATCHES: $a } = LG.IX2BrowserSupport,
          { IX2_ID_DELIMITER: s_, HTML_ELEMENT: DG, PLAIN_OBJECT: MG, WF_PAGE: u_ } = PG.IX2EngineConstants;
      function FG(e, t, r) {
          e.style[t] = r;
      }
      function GG(e, t) {
          return e.style[t];
      }
      function XG(e, t) {
          return e[t];
      }
      function UG(e) {
          return (t) => t[$a](e);
      }
      function VG({ id: e, selector: t }) {
          if (e) {
              let r = e;
              if (e.indexOf(s_) !== -1) {
                  let n = e.split(s_),
                      i = n[0];
                  if (((r = n[1]), i !== document.documentElement.getAttribute(u_))) return null;
              }
              return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
          }
          return t;
      }
      function WG(e) {
          return e == null || e === document.documentElement.getAttribute(u_) ? document : null;
      }
      function BG(e, t) {
          return Array.prototype.slice.call(document.querySelectorAll(t ? e + " " + t : e));
      }
      function HG(e, t) {
          return e.contains(t);
      }
      function kG(e, t) {
          return e !== t && e.parentNode === t.parentNode;
      }
      function jG(e) {
          let t = [];
          for (let r = 0, { length: n } = e || []; r < n; r++) {
              let { children: i } = e[r],
                  { length: o } = i;
              if (o) for (let s = 0; s < o; s++) t.push(i[s]);
          }
          return t;
      }
      function KG(e = []) {
          let t = [],
              r = [];
          for (let n = 0, { length: i } = e; n < i; n++) {
              let { parentNode: o } = e[n];
              if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1) continue;
              r.push(o);
              let s = o.firstElementChild;
              for (; s != null; ) e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
          }
          return t;
      }
      var zG = Element.prototype.closest
          ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
          : (e, t) => {
                if (!document.documentElement.contains(e)) return null;
                let r = e;
                do {
                    if (r[$a] && r[$a](t)) return r;
                    r = r.parentNode;
                } while (r != null);
                return null;
            };
      Le.getClosestElement = zG;
      function YG(e) {
          return e != null && typeof e == "object" ? (e instanceof Element ? DG : MG) : null;
      }
  });
  var Za = u((Oj, f_) => {
      var QG = ct(),
          l_ = Object.create,
          $G = (function () {
              function e() {}
              return function (t) {
                  if (!QG(t)) return {};
                  if (l_) return l_(t);
                  e.prototype = t;
                  var r = new e();
                  return (e.prototype = void 0), r;
              };
          })();
      f_.exports = $G;
  });
  var Ei = u((Sj, d_) => {
      function ZG() {}
      d_.exports = ZG;
  });
  var _i = u((bj, p_) => {
      var JG = Za(),
          eX = Ei();
      function gi(e, t) {
          (this.__wrapped__ = e), (this.__actions__ = []), (this.__chain__ = !!t), (this.__index__ = 0), (this.__values__ = void 0);
      }
      gi.prototype = JG(eX.prototype);
      gi.prototype.constructor = gi;
      p_.exports = gi;
  });
  var g_ = u((Aj, E_) => {
      var v_ = Zt(),
          tX = Ur(),
          rX = qe(),
          h_ = v_ ? v_.isConcatSpreadable : void 0;
      function nX(e) {
          return rX(e) || tX(e) || !!(h_ && e && e[h_]);
      }
      E_.exports = nX;
  });
  var I_ = u((wj, y_) => {
      var iX = Un(),
          oX = g_();
      function __(e, t, r, n, i) {
          var o = -1,
              s = e.length;
          for (r || (r = oX), i || (i = []); ++o < s; ) {
              var a = e[o];
              t > 0 && r(a) ? (t > 1 ? __(a, t - 1, r, n, i) : iX(i, a)) : n || (i[i.length] = a);
          }
          return i;
      }
      y_.exports = __;
  });
  var T_ = u((Rj, m_) => {
      var aX = I_();
      function sX(e) {
          var t = e == null ? 0 : e.length;
          return t ? aX(e, 1) : [];
      }
      m_.exports = sX;
  });
  var S_ = u((Cj, O_) => {
      function uX(e, t, r) {
          switch (r.length) {
              case 0:
                  return e.call(t);
              case 1:
                  return e.call(t, r[0]);
              case 2:
                  return e.call(t, r[0], r[1]);
              case 3:
                  return e.call(t, r[0], r[1], r[2]);
          }
          return e.apply(t, r);
      }
      O_.exports = uX;
  });
  var w_ = u((Nj, A_) => {
      var cX = S_(),
          b_ = Math.max;
      function lX(e, t, r) {
          return (
              (t = b_(t === void 0 ? e.length - 1 : t, 0)),
              function () {
                  for (var n = arguments, i = -1, o = b_(n.length - t, 0), s = Array(o); ++i < o; ) s[i] = n[t + i];
                  i = -1;
                  for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
                  return (a[t] = r(s)), cX(e, this, a);
              }
          );
      }
      A_.exports = lX;
  });
  var C_ = u((qj, R_) => {
      function fX(e) {
          return function () {
              return e;
          };
      }
      R_.exports = fX;
  });
  var x_ = u((xj, q_) => {
      var dX = C_(),
          N_ = za(),
          pX = Zn(),
          vX = N_
              ? function (e, t) {
                    return N_(e, "toString", { configurable: !0, enumerable: !1, value: dX(t), writable: !0 });
                }
              : pX;
      q_.exports = vX;
  });
  var P_ = u((Lj, L_) => {
      var hX = 800,
          EX = 16,
          gX = Date.now;
      function _X(e) {
          var t = 0,
              r = 0;
          return function () {
              var n = gX(),
                  i = EX - (n - r);
              if (((r = n), i > 0)) {
                  if (++t >= hX) return arguments[0];
              } else t = 0;
              return e.apply(void 0, arguments);
          };
      }
      L_.exports = _X;
  });
  var M_ = u((Pj, D_) => {
      var yX = x_(),
          IX = P_(),
          mX = IX(yX);
      D_.exports = mX;
  });
  var G_ = u((Dj, F_) => {
      var TX = T_(),
          OX = w_(),
          SX = M_();
      function bX(e) {
          return SX(OX(e, void 0, TX), e + "");
      }
      F_.exports = bX;
  });
  var V_ = u((Mj, U_) => {
      var X_ = pa(),
          AX = X_ && new X_();
      U_.exports = AX;
  });
  var B_ = u((Fj, W_) => {
      function wX() {}
      W_.exports = wX;
  });
  var Ja = u((Gj, k_) => {
      var H_ = V_(),
          RX = B_(),
          CX = H_
              ? function (e) {
                    return H_.get(e);
                }
              : RX;
      k_.exports = CX;
  });
  var K_ = u((Xj, j_) => {
      var NX = {};
      j_.exports = NX;
  });
  var es = u((Uj, Y_) => {
      var z_ = K_(),
          qX = Object.prototype,
          xX = qX.hasOwnProperty;
      function LX(e) {
          for (var t = e.name + "", r = z_[t], n = xX.call(z_, t) ? r.length : 0; n--; ) {
              var i = r[n],
                  o = i.func;
              if (o == null || o == e) return i.name;
          }
          return t;
      }
      Y_.exports = LX;
  });
  var Ii = u((Vj, Q_) => {
      var PX = Za(),
          DX = Ei(),
          MX = 4294967295;
      function yi(e) {
          (this.__wrapped__ = e), (this.__actions__ = []), (this.__dir__ = 1), (this.__filtered__ = !1), (this.__iteratees__ = []), (this.__takeCount__ = MX), (this.__views__ = []);
      }
      yi.prototype = PX(DX.prototype);
      yi.prototype.constructor = yi;
      Q_.exports = yi;
  });
  var Z_ = u((Wj, $_) => {
      function FX(e, t) {
          var r = -1,
              n = e.length;
          for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
          return t;
      }
      $_.exports = FX;
  });
  var ey = u((Bj, J_) => {
      var GX = Ii(),
          XX = _i(),
          UX = Z_();
      function VX(e) {
          if (e instanceof GX) return e.clone();
          var t = new XX(e.__wrapped__, e.__chain__);
          return (t.__actions__ = UX(e.__actions__)), (t.__index__ = e.__index__), (t.__values__ = e.__values__), t;
      }
      J_.exports = VX;
  });
  var ny = u((Hj, ry) => {
      var WX = Ii(),
          ty = _i(),
          BX = Ei(),
          HX = qe(),
          kX = gt(),
          jX = ey(),
          KX = Object.prototype,
          zX = KX.hasOwnProperty;
      function mi(e) {
          if (kX(e) && !HX(e) && !(e instanceof WX)) {
              if (e instanceof ty) return e;
              if (zX.call(e, "__wrapped__")) return jX(e);
          }
          return new ty(e);
      }
      mi.prototype = BX.prototype;
      mi.prototype.constructor = mi;
      ry.exports = mi;
  });
  var oy = u((kj, iy) => {
      var YX = Ii(),
          QX = Ja(),
          $X = es(),
          ZX = ny();
      function JX(e) {
          var t = $X(e),
              r = ZX[t];
          if (typeof r != "function" || !(t in YX.prototype)) return !1;
          if (e === r) return !0;
          var n = QX(r);
          return !!n && e === n[0];
      }
      iy.exports = JX;
  });
  var cy = u((jj, uy) => {
      var ay = _i(),
          eU = G_(),
          tU = Ja(),
          ts = es(),
          rU = qe(),
          sy = oy(),
          nU = "Expected a function",
          iU = 8,
          oU = 32,
          aU = 128,
          sU = 256;
      function uU(e) {
          return eU(function (t) {
              var r = t.length,
                  n = r,
                  i = ay.prototype.thru;
              for (e && t.reverse(); n--; ) {
                  var o = t[n];
                  if (typeof o != "function") throw new TypeError(nU);
                  if (i && !s && ts(o) == "wrapper") var s = new ay([], !0);
              }
              for (n = s ? n : r; ++n < r; ) {
                  o = t[n];
                  var a = ts(o),
                      c = a == "wrapper" ? tU(o) : void 0;
                  c && sy(c[0]) && c[1] == (aU | iU | oU | sU) && !c[4].length && c[9] == 1 ? (s = s[ts(c[0])].apply(s, c[3])) : (s = o.length == 1 && sy(o) ? s[a]() : s.thru(o));
              }
              return function () {
                  var f = arguments,
                      p = f[0];
                  if (s && f.length == 1 && rU(p)) return s.plant(p).value();
                  for (var v = 0, E = r ? t[v].apply(this, f) : p; ++v < r; ) E = t[v].call(this, E);
                  return E;
              };
          });
      }
      uy.exports = uU;
  });
  var fy = u((Kj, ly) => {
      var cU = cy(),
          lU = cU();
      ly.exports = lU;
  });
  var py = u((zj, dy) => {
      function fU(e, t, r) {
          return e === e && (r !== void 0 && (e = e <= r ? e : r), t !== void 0 && (e = e >= t ? e : t)), e;
      }
      dy.exports = fU;
  });
  var hy = u((Yj, vy) => {
      var dU = py(),
          rs = Jn();
      function pU(e, t, r) {
          return r === void 0 && ((r = t), (t = void 0)), r !== void 0 && ((r = rs(r)), (r = r === r ? r : 0)), t !== void 0 && ((t = rs(t)), (t = t === t ? t : 0)), dU(rs(e), t, r);
      }
      vy.exports = pU;
  });
  var Ly = u((Ai) => {
      "use strict";
      var bi = at().default;
      Object.defineProperty(Ai, "__esModule", { value: !0 });
      Ai.default = void 0;
      var ke = bi(Dr()),
          vU = bi(fy()),
          hU = bi($n()),
          EU = bi(hy()),
          Ht = Ve(),
          ns = ss(),
          Ti = hi(),
          gU = Bt(),
          {
              MOUSE_CLICK: _U,
              MOUSE_SECOND_CLICK: yU,
              MOUSE_DOWN: IU,
              MOUSE_UP: mU,
              MOUSE_OVER: TU,
              MOUSE_OUT: OU,
              DROPDOWN_CLOSE: SU,
              DROPDOWN_OPEN: bU,
              SLIDER_ACTIVE: AU,
              SLIDER_INACTIVE: wU,
              TAB_ACTIVE: RU,
              TAB_INACTIVE: CU,
              NAVBAR_CLOSE: NU,
              NAVBAR_OPEN: qU,
              MOUSE_MOVE: xU,
              PAGE_SCROLL_DOWN: Sy,
              SCROLL_INTO_VIEW: by,
              SCROLL_OUT_OF_VIEW: LU,
              PAGE_SCROLL_UP: PU,
              SCROLLING_IN_VIEW: DU,
              PAGE_FINISH: Ay,
              ECOMMERCE_CART_CLOSE: MU,
              ECOMMERCE_CART_OPEN: FU,
              PAGE_START: wy,
              PAGE_SCROLL: GU,
          } = Ht.EventTypeConsts,
          is = "COMPONENT_ACTIVE",
          Ry = "COMPONENT_INACTIVE",
          { COLON_DELIMITER: Ey } = Ht.IX2EngineConstants,
          { getNamespacedParameterId: gy } = gU.IX2VanillaUtils,
          Cy = (e) => (t) => (typeof t == "object" && e(t) ? !0 : t),
          nn = Cy(({ element: e, nativeEvent: t }) => e === t.target),
          XU = Cy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
          pt = (0, vU.default)([nn, XU]),
          Ny = (e, t) => {
              if (t) {
                  let { ixData: r } = e.getState(),
                      { events: n } = r,
                      i = n[t];
                  if (i && !VU[i.eventTypeId]) return i;
              }
              return null;
          },
          UU = ({ store: e, event: t }) => {
              let { action: r } = t,
                  { autoStopEventId: n } = r.config;
              return !!Ny(e, n);
          },
          Be = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
              let { action: o, id: s } = t,
                  { actionListId: a, autoStopEventId: c } = o.config,
                  f = Ny(e, c);
              return (
                  f && (0, ns.stopActionGroup)({ store: e, eventId: c, eventTarget: r, eventStateKey: c + Ey + n.split(Ey)[1], actionListId: (0, hU.default)(f, "action.config.actionListId") }),
                  (0, ns.stopActionGroup)({ store: e, eventId: s, eventTarget: r, eventStateKey: n, actionListId: a }),
                  (0, ns.startActionGroup)({ store: e, eventId: s, eventTarget: r, eventStateKey: n, actionListId: a }),
                  i
              );
          },
          et = (e, t) => (r, n) => (e(r, n) === !0 ? t(r, n) : n),
          on = { handler: et(pt, Be) },
          qy = (0, ke.default)({}, on, { types: [is, Ry].join(" ") }),
          os = [
              { target: window, types: "resize orientationchange", throttle: !0 },
              { target: document, types: "scroll wheel readystatechange IX2_PAGE_UPDATE", throttle: !0 },
          ],
          _y = "mouseover mouseout",
          as = { types: os },
          VU = { PAGE_START: wy, PAGE_FINISH: Ay },
          rn = (() => {
              let e = window.pageXOffset !== void 0,
                  r = document.compatMode === "CSS1Compat" ? document.documentElement : document.body;
              return () => ({
                  scrollLeft: e ? window.pageXOffset : r.scrollLeft,
                  scrollTop: e ? window.pageYOffset : r.scrollTop,
                  stiffScrollTop: (0, EU.default)(e ? window.pageYOffset : r.scrollTop, 0, r.scrollHeight - window.innerHeight),
                  scrollWidth: r.scrollWidth,
                  scrollHeight: r.scrollHeight,
                  clientWidth: r.clientWidth,
                  clientHeight: r.clientHeight,
                  innerWidth: window.innerWidth,
                  innerHeight: window.innerHeight,
              });
          })(),
          WU = (e, t) => !(e.left > t.right || e.right < t.left || e.top > t.bottom || e.bottom < t.top),
          BU = ({ element: e, nativeEvent: t }) => {
              let { type: r, target: n, relatedTarget: i } = t,
                  o = e.contains(n);
              if (r === "mouseover" && o) return !0;
              let s = e.contains(i);
              return !!(r === "mouseout" && o && s);
          },
          HU = (e) => {
              let {
                      element: t,
                      event: { config: r },
                  } = e,
                  { clientWidth: n, clientHeight: i } = rn(),
                  o = r.scrollOffsetValue,
                  c = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
              return WU(t.getBoundingClientRect(), { left: 0, top: c, right: n, bottom: i - c });
          },
          xy = (e) => (t, r) => {
              let { type: n } = t.nativeEvent,
                  i = [is, Ry].indexOf(n) !== -1 ? n === is : r.isActive,
                  o = (0, ke.default)({}, r, { isActive: i });
              return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
          },
          yy = (e) => (t, r) => {
              let n = { elementHovered: BU(t) };
              return ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) && e(t, n)) || n;
          },
          kU = (e) => (t, r) => {
              let n = (0, ke.default)({}, r, { elementVisible: HU(t) });
              return ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) && e(t, n)) || n;
          },
          Iy = (e) => (t, r = {}) => {
              let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = rn(),
                  {
                      event: { config: s, eventTypeId: a },
                  } = t,
                  { scrollOffsetValue: c, scrollOffsetUnit: f } = s,
                  p = f === "PX",
                  v = i - o,
                  E = Number((n / v).toFixed(2));
              if (r && r.percentTop === E) return r;
              let g = (p ? c : (o * (c || 0)) / 100) / v,
                  b,
                  S,
                  x = 0;
              r && ((b = E > r.percentTop), (S = r.scrollingDown !== b), (x = S ? E : r.anchorTop));
              let A = a === Sy ? E >= x + g : E <= x - g,
                  w = (0, ke.default)({}, r, { percentTop: E, inBounds: A, anchorTop: x, scrollingDown: b });
              return (r && A && (S || w.inBounds !== r.inBounds) && e(t, w)) || w;
          },
          jU = (e, t) => e.left > t.left && e.left < t.right && e.top > t.top && e.top < t.bottom,
          KU = (e) => (t, r) => {
              let n = { finished: document.readyState === "complete" };
              return n.finished && !(r && r.finshed) && e(t), n;
          },
          zU = (e) => (t, r) => {
              let n = { started: !0 };
              return r || e(t), n;
          },
          my = (e) => (t, r = { clickCount: 0 }) => {
              let n = { clickCount: (r.clickCount % 2) + 1 };
              return (n.clickCount !== r.clickCount && e(t, n)) || n;
          },
          Oi = (e = !0) =>
              (0, ke.default)({}, qy, {
                  handler: et(
                      e ? pt : nn,
                      xy((t, r) => (r.isActive ? on.handler(t, r) : r))
                  ),
              }),
          Si = (e = !0) =>
              (0, ke.default)({}, qy, {
                  handler: et(
                      e ? pt : nn,
                      xy((t, r) => (r.isActive ? r : on.handler(t, r)))
                  ),
              }),
          Ty = (0, ke.default)({}, as, {
              handler: kU((e, t) => {
                  let { elementVisible: r } = t,
                      { event: n, store: i } = e,
                      { ixData: o } = i.getState(),
                      { events: s } = o;
                  return !s[n.action.config.autoStopEventId] && t.triggered ? t : (n.eventTypeId === by) === r ? (Be(e), (0, ke.default)({}, t, { triggered: !0 })) : t;
              }),
          }),
          Oy = 0.05,
          YU = {
              [AU]: Oi(),
              [wU]: Si(),
              [bU]: Oi(),
              [SU]: Si(),
              [qU]: Oi(!1),
              [NU]: Si(!1),
              [RU]: Oi(),
              [CU]: Si(),
              [FU]: { types: "ecommerce-cart-open", handler: et(pt, Be) },
              [MU]: { types: "ecommerce-cart-close", handler: et(pt, Be) },
              [_U]: {
                  types: "click",
                  handler: et(
                      pt,
                      my((e, { clickCount: t }) => {
                          UU(e) ? t === 1 && Be(e) : Be(e);
                      })
                  ),
              },
              [yU]: {
                  types: "click",
                  handler: et(
                      pt,
                      my((e, { clickCount: t }) => {
                          t === 2 && Be(e);
                      })
                  ),
              },
              [IU]: (0, ke.default)({}, on, { types: "mousedown" }),
              [mU]: (0, ke.default)({}, on, { types: "mouseup" }),
              [TU]: {
                  types: _y,
                  handler: et(
                      pt,
                      yy((e, t) => {
                          t.elementHovered && Be(e);
                      })
                  ),
              },
              [OU]: {
                  types: _y,
                  handler: et(
                      pt,
                      yy((e, t) => {
                          t.elementHovered || Be(e);
                      })
                  ),
              },
              [xU]: {
                  types: "mousemove mouseout scroll",
                  handler: ({ store: e, element: t, eventConfig: r, nativeEvent: n, eventStateKey: i }, o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }) => {
                      let { basedOn: s, selectedAxis: a, continuousParameterGroupId: c, reverse: f, restingState: p = 0 } = r,
                          { clientX: v = o.clientX, clientY: E = o.clientY, pageX: g = o.pageX, pageY: b = o.pageY } = n,
                          S = a === "X_AXIS",
                          x = n.type === "mouseout",
                          A = p / 100,
                          w = c,
                          m = !1;
                      switch (s) {
                          case Ht.EventBasedOn.VIEWPORT: {
                              A = S ? Math.min(v, window.innerWidth) / window.innerWidth : Math.min(E, window.innerHeight) / window.innerHeight;
                              break;
                          }
                          case Ht.EventBasedOn.PAGE: {
                              let { scrollLeft: N, scrollTop: C, scrollWidth: q, scrollHeight: G } = rn();
                              A = S ? Math.min(N + g, q) / q : Math.min(C + b, G) / G;
                              break;
                          }
                          case Ht.EventBasedOn.ELEMENT:
                          default: {
                              w = gy(i, c);
                              let N = n.type.indexOf("mouse") === 0;
                              if (N && pt({ element: t, nativeEvent: n }) !== !0) break;
                              let C = t.getBoundingClientRect(),
                                  { left: q, top: G, width: j, height: Y } = C;
                              if (!N && !jU({ left: v, top: E }, C)) break;
                              (m = !0), (A = S ? (v - q) / j : (E - G) / Y);
                              break;
                          }
                      }
                      return (
                          x && (A > 1 - Oy || A < Oy) && (A = Math.round(A)),
                          (s !== Ht.EventBasedOn.ELEMENT || m || m !== o.elementHovered) && ((A = f ? 1 - A : A), e.dispatch((0, Ti.parameterChanged)(w, A))),
                          { elementHovered: m, clientX: v, clientY: E, pageX: g, pageY: b }
                      );
                  },
              },
              [GU]: {
                  types: os,
                  handler: ({ store: e, eventConfig: t }) => {
                      let { continuousParameterGroupId: r, reverse: n } = t,
                          { scrollTop: i, scrollHeight: o, clientHeight: s } = rn(),
                          a = i / (o - s);
                      (a = n ? 1 - a : a), e.dispatch((0, Ti.parameterChanged)(r, a));
                  },
              },
              [DU]: {
                  types: os,
                  handler: ({ element: e, store: t, eventConfig: r, eventStateKey: n }, i = { scrollPercent: 0 }) => {
                      let { scrollLeft: o, scrollTop: s, scrollWidth: a, scrollHeight: c, clientHeight: f } = rn(),
                          { basedOn: p, selectedAxis: v, continuousParameterGroupId: E, startsEntering: g, startsExiting: b, addEndOffset: S, addStartOffset: x, addOffsetValue: A = 0, endOffsetValue: w = 0 } = r,
                          m = v === "X_AXIS";
                      if (p === Ht.EventBasedOn.VIEWPORT) {
                          let N = m ? o / a : s / c;
                          return N !== i.scrollPercent && t.dispatch((0, Ti.parameterChanged)(E, N)), { scrollPercent: N };
                      } else {
                          let N = gy(n, E),
                              C = e.getBoundingClientRect(),
                              q = (x ? A : 0) / 100,
                              G = (S ? w : 0) / 100;
                          (q = g ? q : 1 - q), (G = b ? G : 1 - G);
                          let j = C.top + Math.min(C.height * q, f),
                              oe = C.top + C.height * G - j,
                              te = Math.min(f + oe, c),
                              I = Math.min(Math.max(0, f - j), te) / te;
                          return I !== i.scrollPercent && t.dispatch((0, Ti.parameterChanged)(N, I)), { scrollPercent: I };
                      }
                  },
              },
              [by]: Ty,
              [LU]: Ty,
              [Sy]: (0, ke.default)({}, as, {
                  handler: Iy((e, t) => {
                      t.scrollingDown && Be(e);
                  }),
              }),
              [PU]: (0, ke.default)({}, as, {
                  handler: Iy((e, t) => {
                      t.scrollingDown || Be(e);
                  }),
              }),
              [Ay]: { types: "readystatechange IX2_PAGE_UPDATE", handler: et(nn, KU(Be)) },
              [wy]: { types: "readystatechange IX2_PAGE_UPDATE", handler: et(nn, zU(Be)) },
          };
      Ai.default = YU;
  });
  var ss = u((Nt) => {
      "use strict";
      var rt = at().default,
          QU = zt().default;
      Object.defineProperty(Nt, "__esModule", { value: !0 });
      Nt.observeRequests = bV;
      Nt.startActionGroup = vs;
      Nt.startEngine = Ni;
      Nt.stopActionGroup = ps;
      Nt.stopAllActionGroups = Wy;
      Nt.stopEngine = qi;
      var $U = rt(Dr()),
          ZU = rt(QE()),
          JU = rt(Ca()),
          Ct = rt($n()),
          eV = rt(hg()),
          tV = rt(Vg()),
          rV = rt(Bg()),
          nV = rt(kg()),
          an = rt($g()),
          iV = rt(i_()),
          tt = Ve(),
          My = Bt(),
          Se = hi(),
          Re = QU(c_()),
          oV = rt(Ly()),
          aV = ["store", "computedStyle"],
          sV = Object.keys(tt.QuickEffectIds),
          us = (e) => sV.includes(e),
          { COLON_DELIMITER: cs, BOUNDARY_SELECTOR: wi, HTML_ELEMENT: Fy, RENDER_GENERAL: uV, W_MOD_IX: Py } = tt.IX2EngineConstants,
          {
              getAffectedElements: Ri,
              getElementId: cV,
              getDestinationValues: ls,
              observeStore: kt,
              getInstanceId: lV,
              renderHTMLElement: fV,
              clearAllStyles: Gy,
              getMaxDurationItemIndex: dV,
              getComputedStyle: pV,
              getInstanceOrigin: vV,
              reduceListToGroup: hV,
              shouldNamespaceEventParameter: EV,
              getNamespacedParameterId: gV,
              shouldAllowMediaQuery: Ci,
              cleanupHTMLElement: _V,
              stringifyTarget: yV,
              mediaQueriesEqual: IV,
              shallowEqual: mV,
          } = My.IX2VanillaUtils,
          { isPluginType: fs, createPluginInstance: ds, getPluginDuration: TV } = My.IX2VanillaPlugins,
          Dy = navigator.userAgent,
          OV = Dy.match(/iPad/i) || Dy.match(/iPhone/),
          SV = 12;
      function bV(e) {
          kt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: RV }),
              kt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: CV }),
              kt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: NV }),
              kt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: qV });
      }
      function AV(e) {
          kt({
              store: e,
              select: ({ ixSession: t }) => t.mediaQueryKey,
              onChange: () => {
                  qi(e), Gy({ store: e, elementApi: Re }), Ni({ store: e, allowEvents: !0 }), Xy();
              },
          });
      }
      function wV(e, t) {
          let r = kt({
              store: e,
              select: ({ ixSession: n }) => n.tick,
              onChange: (n) => {
                  t(n), r();
              },
          });
      }
      function RV({ rawData: e, defer: t }, r) {
          let n = () => {
              Ni({ store: r, rawData: e, allowEvents: !0 }), Xy();
          };
          t ? setTimeout(n, 0) : n();
      }
      function Xy() {
          document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
      }
      function CV(e, t) {
          let { actionTypeId: r, actionListId: n, actionItemId: i, eventId: o, allowEvents: s, immediate: a, testManual: c, verbose: f = !0 } = e,
              { rawData: p } = e;
          if (n && i && p && a) {
              let v = p.actionLists[n];
              v && (p = hV({ actionList: v, actionItemId: i, rawData: p }));
          }
          if ((Ni({ store: t, rawData: p, allowEvents: s, testManual: c }), (n && r === tt.ActionTypeConsts.GENERAL_START_ACTION) || us(r))) {
              ps({ store: t, actionListId: n }), Vy({ store: t, actionListId: n, eventId: o });
              let v = vs({ store: t, eventId: o, actionListId: n, immediate: a, verbose: f });
              f && v && t.dispatch((0, Se.actionListPlaybackChanged)({ actionListId: n, isPlaying: !a }));
          }
      }
      function NV({ actionListId: e }, t) {
          e ? ps({ store: t, actionListId: e }) : Wy({ store: t }), qi(t);
      }
      function qV(e, t) {
          qi(t), Gy({ store: t, elementApi: Re });
      }
      function Ni({ store: e, rawData: t, allowEvents: r, testManual: n }) {
          let { ixSession: i } = e.getState();
          t && e.dispatch((0, Se.rawDataImported)(t)),
              i.active ||
                  (e.dispatch((0, Se.sessionInitialized)({ hasBoundaryNodes: !!document.querySelector(wi), reducedMotion: document.body.hasAttribute("data-wf-ix-vacation") && window.matchMedia("(prefers-reduced-motion)").matches })),
                  r && (FV(e), xV(), e.getState().ixSession.hasDefinedMediaQueries && AV(e)),
                  e.dispatch((0, Se.sessionStarted)()),
                  LV(e, n));
      }
      function xV() {
          let { documentElement: e } = document;
          e.className.indexOf(Py) === -1 && (e.className += ` ${Py}`);
      }
      function LV(e, t) {
          let r = (n) => {
              let { ixSession: i, ixParameters: o } = e.getState();
              i.active && (e.dispatch((0, Se.animationFrameChanged)(n, o)), t ? wV(e, r) : requestAnimationFrame(r));
          };
          r(window.performance.now());
      }
      function qi(e) {
          let { ixSession: t } = e.getState();
          if (t.active) {
              let { eventListeners: r } = t;
              r.forEach(PV), e.dispatch((0, Se.sessionStopped)());
          }
      }
      function PV({ target: e, listenerParams: t }) {
          e.removeEventListener.apply(e, t);
      }
      function DV({ store: e, eventStateKey: t, eventTarget: r, eventId: n, eventConfig: i, actionListId: o, parameterGroup: s, smoothing: a, restingValue: c }) {
          let { ixData: f, ixSession: p } = e.getState(),
              { events: v } = f,
              E = v[n],
              { eventTypeId: g } = E,
              b = {},
              S = {},
              x = [],
              { continuousActionGroups: A } = s,
              { id: w } = s;
          EV(g, i) && (w = gV(t, w));
          let m = p.hasBoundaryNodes && r ? Re.getClosestElement(r, wi) : null;
          A.forEach((N) => {
              let { keyframe: C, actionItems: q } = N;
              q.forEach((G) => {
                  let { actionTypeId: j } = G,
                      { target: Y } = G.config;
                  if (!Y) return;
                  let oe = Y.boundaryMode ? m : null,
                      te = yV(Y) + cs + j;
                  if (((S[te] = MV(S[te], C, G)), !b[te])) {
                      b[te] = !0;
                      let { config: D } = G;
                      Ri({ config: D, event: E, eventTarget: r, elementRoot: oe, elementApi: Re }).forEach((I) => {
                          x.push({ element: I, key: te });
                      });
                  }
              });
          }),
              x.forEach(({ element: N, key: C }) => {
                  let q = S[C],
                      G = (0, Ct.default)(q, "[0].actionItems[0]", {}),
                      { actionTypeId: j } = G,
                      Y = fs(j) ? ds(j)(N, G) : null,
                      oe = ls({ element: N, actionItem: G, elementApi: Re }, Y);
                  hs({ store: e, element: N, eventId: n, actionListId: o, actionItem: G, destination: oe, continuous: !0, parameterId: w, actionGroups: q, smoothing: a, restingValue: c, pluginInstance: Y });
              });
      }
      function MV(e = [], t, r) {
          let n = [...e],
              i;
          return n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)), i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })), n[i].actionItems.push(r), n;
      }
      function FV(e) {
          let { ixData: t } = e.getState(),
              { eventTypeMap: r } = t;
          Uy(e),
              (0, an.default)(r, (i, o) => {
                  let s = oV.default[o];
                  if (!s) {
                      console.warn(`IX2 event type not configured: ${o}`);
                      return;
                  }
                  BV({ logic: s, store: e, events: i });
              });
          let { ixSession: n } = e.getState();
          n.eventListeners.length && XV(e);
      }
      var GV = ["resize", "orientationchange"];
      function XV(e) {
          let t = () => {
              Uy(e);
          };
          GV.forEach((r) => {
              window.addEventListener(r, t), e.dispatch((0, Se.eventListenerAdded)(window, [r, t]));
          }),
              t();
      }
      function Uy(e) {
          let { ixSession: t, ixData: r } = e.getState(),
              n = window.innerWidth;
          if (n !== t.viewportWidth) {
              let { mediaQueries: i } = r;
              e.dispatch((0, Se.viewportWidthChanged)({ width: n, mediaQueries: i }));
          }
      }
      var UV = (e, t) => (0, tV.default)((0, nV.default)(e, t), rV.default),
          VV = (e, t) => {
              (0, an.default)(e, (r, n) => {
                  r.forEach((i, o) => {
                      let s = n + cs + o;
                      t(i, n, s);
                  });
              });
          },
          WV = (e) => {
              let t = { target: e.target, targets: e.targets };
              return Ri({ config: t, elementApi: Re });
          };
      function BV({ logic: e, store: t, events: r }) {
          HV(r);
          let { types: n, handler: i } = e,
              { ixData: o } = t.getState(),
              { actionLists: s } = o,
              a = UV(r, WV);
          if (!(0, eV.default)(a)) return;
          (0, an.default)(a, (v, E) => {
              let g = r[E],
                  { action: b, id: S, mediaQueries: x = o.mediaQueryKeys } = g,
                  { actionListId: A } = b.config;
              IV(x, o.mediaQueryKeys) || t.dispatch((0, Se.mediaQueriesDefined)()),
                  b.actionTypeId === tt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
                      (Array.isArray(g.config) ? g.config : [g.config]).forEach((m) => {
                          let { continuousParameterGroupId: N } = m,
                              C = (0, Ct.default)(s, `${A}.continuousParameterGroups`, []),
                              q = (0, JU.default)(C, ({ id: Y }) => Y === N),
                              G = (m.smoothing || 0) / 100,
                              j = (m.restingState || 0) / 100;
                          q &&
                              v.forEach((Y, oe) => {
                                  let te = S + cs + oe;
                                  DV({ store: t, eventStateKey: te, eventTarget: Y, eventId: S, eventConfig: m, actionListId: A, parameterGroup: q, smoothing: G, restingValue: j });
                              });
                      }),
                  (b.actionTypeId === tt.ActionTypeConsts.GENERAL_START_ACTION || us(b.actionTypeId)) && Vy({ store: t, actionListId: A, eventId: S });
          });
          let c = (v) => {
                  let { ixSession: E } = t.getState();
                  VV(a, (g, b, S) => {
                      let x = r[b],
                          A = E.eventState[S],
                          { action: w, mediaQueries: m = o.mediaQueryKeys } = x;
                      if (!Ci(m, E.mediaQueryKey)) return;
                      let N = (C = {}) => {
                          let q = i({ store: t, element: g, event: x, eventConfig: C, nativeEvent: v, eventStateKey: S }, A);
                          mV(q, A) || t.dispatch((0, Se.eventStateChanged)(S, q));
                      };
                      w.actionTypeId === tt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION ? (Array.isArray(x.config) ? x.config : [x.config]).forEach(N) : N();
                  });
              },
              f = (0, iV.default)(c, SV),
              p = ({ target: v = document, types: E, throttle: g }) => {
                  E.split(" ")
                      .filter(Boolean)
                      .forEach((b) => {
                          let S = g ? f : c;
                          v.addEventListener(b, S), t.dispatch((0, Se.eventListenerAdded)(v, [b, S]));
                      });
              };
          Array.isArray(n) ? n.forEach(p) : typeof n == "string" && p(e);
      }
      function HV(e) {
          if (!OV) return;
          let t = {},
              r = "";
          for (let n in e) {
              let { eventTypeId: i, target: o } = e[n],
                  s = Re.getQuerySelector(o);
              t[s] || ((i === tt.EventTypeConsts.MOUSE_CLICK || i === tt.EventTypeConsts.MOUSE_SECOND_CLICK) && ((t[s] = !0), (r += s + "{cursor: pointer;touch-action: manipulation;}")));
          }
          if (r) {
              let n = document.createElement("style");
              (n.textContent = r), document.body.appendChild(n);
          }
      }
      function Vy({ store: e, actionListId: t, eventId: r }) {
          let { ixData: n, ixSession: i } = e.getState(),
              { actionLists: o, events: s } = n,
              a = s[r],
              c = o[t];
          if (c && c.useFirstGroupAsInitialState) {
              let f = (0, Ct.default)(c, "actionItemGroups[0].actionItems", []),
                  p = (0, Ct.default)(a, "mediaQueries", n.mediaQueryKeys);
              if (!Ci(p, i.mediaQueryKey)) return;
              f.forEach((v) => {
                  var E;
                  let { config: g, actionTypeId: b } = v,
                      S = (g == null || (E = g.target) === null || E === void 0 ? void 0 : E.useEventTarget) === !0 ? { target: a.target, targets: a.targets } : g,
                      x = Ri({ config: S, event: a, elementApi: Re }),
                      A = fs(b);
                  x.forEach((w) => {
                      let m = A ? ds(b)(w, v) : null;
                      hs({ destination: ls({ element: w, actionItem: v, elementApi: Re }, m), immediate: !0, store: e, element: w, eventId: r, actionItem: v, actionListId: t, pluginInstance: m });
                  });
              });
          }
      }
      function Wy({ store: e }) {
          let { ixInstances: t } = e.getState();
          (0, an.default)(t, (r) => {
              if (!r.continuous) {
                  let { actionListId: n, verbose: i } = r;
                  Es(r, e), i && e.dispatch((0, Se.actionListPlaybackChanged)({ actionListId: n, isPlaying: !1 }));
              }
          });
      }
      function ps({ store: e, eventId: t, eventTarget: r, eventStateKey: n, actionListId: i }) {
          let { ixInstances: o, ixSession: s } = e.getState(),
              a = s.hasBoundaryNodes && r ? Re.getClosestElement(r, wi) : null;
          (0, an.default)(o, (c) => {
              let f = (0, Ct.default)(c, "actionItem.config.target.boundaryMode"),
                  p = n ? c.eventStateKey === n : !0;
              if (c.actionListId === i && c.eventId === t && p) {
                  if (a && f && !Re.elementContains(a, c.element)) return;
                  Es(c, e), c.verbose && e.dispatch((0, Se.actionListPlaybackChanged)({ actionListId: i, isPlaying: !1 }));
              }
          });
      }
      function vs({ store: e, eventId: t, eventTarget: r, eventStateKey: n, actionListId: i, groupIndex: o = 0, immediate: s, verbose: a }) {
          var c;
          let { ixData: f, ixSession: p } = e.getState(),
              { events: v } = f,
              E = v[t] || {},
              { mediaQueries: g = f.mediaQueryKeys } = E,
              b = (0, Ct.default)(f, `actionLists.${i}`, {}),
              { actionItemGroups: S, useFirstGroupAsInitialState: x } = b;
          if (!S || !S.length) return !1;
          o >= S.length && (0, Ct.default)(E, "config.loop") && (o = 0), o === 0 && x && o++;
          let w = (o === 0 || (o === 1 && x)) && us((c = E.action) === null || c === void 0 ? void 0 : c.actionTypeId) ? E.config.delay : void 0,
              m = (0, Ct.default)(S, [o, "actionItems"], []);
          if (!m.length || !Ci(g, p.mediaQueryKey)) return !1;
          let N = p.hasBoundaryNodes && r ? Re.getClosestElement(r, wi) : null,
              C = dV(m),
              q = !1;
          return (
              m.forEach((G, j) => {
                  let { config: Y, actionTypeId: oe } = G,
                      te = fs(oe),
                      { target: D } = Y;
                  if (!D) return;
                  let I = D.boundaryMode ? N : null;
                  Ri({ config: Y, event: E, eventTarget: r, elementRoot: I, elementApi: Re }).forEach((M, X) => {
                      let Q = te ? ds(oe)(M, G) : null,
                          re = te ? TV(oe)(M, G) : null;
                      q = !0;
                      let L = C === j && X === 0,
                          H = pV({ element: M, actionItem: G }),
                          k = ls({ element: M, actionItem: G, elementApi: Re }, Q);
                      hs({
                          store: e,
                          element: M,
                          actionItem: G,
                          eventId: t,
                          eventTarget: r,
                          eventStateKey: n,
                          actionListId: i,
                          groupIndex: o,
                          isCarrier: L,
                          computedStyle: H,
                          destination: k,
                          immediate: s,
                          verbose: a,
                          pluginInstance: Q,
                          pluginDuration: re,
                          instanceDelay: w,
                      });
                  });
              }),
              q
          );
      }
      function hs(e) {
          var t;
          let { store: r, computedStyle: n } = e,
              i = (0, ZU.default)(e, aV),
              { element: o, actionItem: s, immediate: a, pluginInstance: c, continuous: f, restingValue: p, eventId: v } = i,
              E = !f,
              g = lV(),
              { ixElements: b, ixSession: S, ixData: x } = r.getState(),
              A = cV(b, o),
              { refState: w } = b[A] || {},
              m = Re.getRefType(o),
              N = S.reducedMotion && tt.ReducedMotionTypes[s.actionTypeId],
              C;
          if (N && f)
              switch ((t = x.events[v]) === null || t === void 0 ? void 0 : t.eventTypeId) {
                  case tt.EventTypeConsts.MOUSE_MOVE:
                  case tt.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
                      C = p;
                      break;
                  default:
                      C = 0.5;
                      break;
              }
          let q = vV(o, w, n, s, Re, c);
          if ((r.dispatch((0, Se.instanceAdded)((0, $U.default)({ instanceId: g, elementId: A, origin: q, refType: m, skipMotion: N, skipToValue: C }, i))), By(document.body, "ix2-animation-started", g), a)) {
              kV(r, g);
              return;
          }
          kt({ store: r, select: ({ ixInstances: G }) => G[g], onChange: Hy }), E && r.dispatch((0, Se.instanceStarted)(g, S.tick));
      }
      function Es(e, t) {
          By(document.body, "ix2-animation-stopping", { instanceId: e.id, state: t.getState() });
          let { elementId: r, actionItem: n } = e,
              { ixElements: i } = t.getState(),
              { ref: o, refType: s } = i[r] || {};
          s === Fy && _V(o, n, Re), t.dispatch((0, Se.instanceRemoved)(e.id));
      }
      function By(e, t, r) {
          let n = document.createEvent("CustomEvent");
          n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
      }
      function kV(e, t) {
          let { ixParameters: r } = e.getState();
          e.dispatch((0, Se.instanceStarted)(t, 0)), e.dispatch((0, Se.animationFrameChanged)(performance.now(), r));
          let { ixInstances: n } = e.getState();
          Hy(n[t], e);
      }
      function Hy(e, t) {
          let {
                  active: r,
                  continuous: n,
                  complete: i,
                  elementId: o,
                  actionItem: s,
                  actionTypeId: a,
                  renderType: c,
                  current: f,
                  groupIndex: p,
                  eventId: v,
                  eventTarget: E,
                  eventStateKey: g,
                  actionListId: b,
                  isCarrier: S,
                  styleProp: x,
                  verbose: A,
                  pluginInstance: w,
              } = e,
              { ixData: m, ixSession: N } = t.getState(),
              { events: C } = m,
              q = C[v] || {},
              { mediaQueries: G = m.mediaQueryKeys } = q;
          if (Ci(G, N.mediaQueryKey) && (n || r || i)) {
              if (f || (c === uV && i)) {
                  t.dispatch((0, Se.elementStateChanged)(o, a, f, s));
                  let { ixElements: j } = t.getState(),
                      { ref: Y, refType: oe, refState: te } = j[o] || {},
                      D = te && te[a];
                  switch (oe) {
                      case Fy: {
                          fV(Y, te, D, v, s, x, Re, c, w);
                          break;
                      }
                  }
              }
              if (i) {
                  if (S) {
                      let j = vs({ store: t, eventId: v, eventTarget: E, eventStateKey: g, actionListId: b, groupIndex: p + 1, verbose: A });
                      A && !j && t.dispatch((0, Se.actionListPlaybackChanged)({ actionListId: b, isPlaying: !1 }));
                  }
                  Es(e, t);
              }
          }
      }
  });
  var jy = u((It) => {
      "use strict";
      var jV = zt().default,
          KV = at().default;
      Object.defineProperty(It, "__esModule", { value: !0 });
      It.actions = void 0;
      It.destroy = ky;
      It.init = ZV;
      It.setEnv = $V;
      It.store = void 0;
      Ll();
      var zV = zo(),
          YV = KV(YE()),
          gs = ss(),
          QV = jV(hi());
      It.actions = QV;
      var xi = (0, zV.createStore)(YV.default);
      It.store = xi;
      function $V(e) {
          e() && (0, gs.observeRequests)(xi);
      }
      function ZV(e) {
          ky(), (0, gs.startEngine)({ store: xi, rawData: e, allowEvents: !0 });
      }
      function ky() {
          (0, gs.stopEngine)(xi);
      }
  });
  var Qy = u((Jj, Yy) => {
      var Ky = Qe(),
          zy = jy();
      zy.setEnv(Ky.env);
      Ky.define(
          "ix2",
          (Yy.exports = function () {
              return zy;
          })
      );
  });
  var Zy = u((eK, $y) => {
      var Tr = Qe();
      Tr.define(
          "links",
          ($y.exports = function (e, t) {
              var r = {},
                  n = e(window),
                  i,
                  o = Tr.env(),
                  s = window.location,
                  a = document.createElement("a"),
                  c = "w--current",
                  f = /index\.(html|php)$/,
                  p = /\/$/,
                  v,
                  E;
              r.ready = r.design = r.preview = g;
              function g() {
                  (i = o && Tr.env("design")), (E = Tr.env("slug") || s.pathname || ""), Tr.scroll.off(S), (v = []);
                  for (var A = document.links, w = 0; w < A.length; ++w) b(A[w]);
                  v.length && (Tr.scroll.on(S), S());
              }
              function b(A) {
                  var w = (i && A.getAttribute("href-disabled")) || A.getAttribute("href");
                  if (((a.href = w), !(w.indexOf(":") >= 0))) {
                      var m = e(A);
                      if (a.hash.length > 1 && a.host + a.pathname === s.host + s.pathname) {
                          if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                          var N = e(a.hash);
                          N.length && v.push({ link: m, sec: N, active: !1 });
                          return;
                      }
                      if (!(w === "#" || w === "")) {
                          var C = a.href === s.href || w === E || (f.test(w) && p.test(E));
                          x(m, c, C);
                      }
                  }
              }
              function S() {
                  var A = n.scrollTop(),
                      w = n.height();
                  t.each(v, function (m) {
                      var N = m.link,
                          C = m.sec,
                          q = C.offset().top,
                          G = C.outerHeight(),
                          j = w * 0.5,
                          Y = C.is(":visible") && q + G - j >= A && q + j <= A + w;
                      m.active !== Y && ((m.active = Y), x(N, c, Y));
                  });
              }
              function x(A, w, m) {
                  var N = A.hasClass(w);
                  (m && N) || (!m && !N) || (m ? A.addClass(w) : A.removeClass(w));
              }
              return r;
          })
      );
  });
  var eI = u((tK, Jy) => {
      var Li = Qe();
      Li.define(
          "scroll",
          (Jy.exports = function (e) {
              var t = { WF_CLICK_EMPTY: "click.wf-empty-link", WF_CLICK_SCROLL: "click.wf-scroll" },
                  r = window.location,
                  n = b() ? null : window.history,
                  i = e(window),
                  o = e(document),
                  s = e(document.body),
                  a =
                      window.requestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      function (D) {
                          window.setTimeout(D, 15);
                      },
                  c = Li.env("editor") ? ".w-editor-body" : "body",
                  f = "header, " + c + " > .header, " + c + " > .w-nav:not([data-no-scroll])",
                  p = 'a[href="#"]',
                  v = 'a[href*="#"]:not(.w-tab-link):not(' + p + ")",
                  E = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
                  g = document.createElement("style");
              g.appendChild(document.createTextNode(E));
              function b() {
                  try {
                      return !!window.frameElement;
                  } catch {
                      return !0;
                  }
              }
              var S = /^#[a-zA-Z0-9][\w:.-]*$/;
              function x(D) {
                  return S.test(D.hash) && D.host + D.pathname === r.host + r.pathname;
              }
              let A = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)");
              function w() {
                  return document.body.getAttribute("data-wf-scroll-motion") === "none" || A.matches;
              }
              function m(D, I) {
                  var P;
                  switch (I) {
                      case "add":
                          (P = D.attr("tabindex")), P ? D.attr("data-wf-tabindex-swap", P) : D.attr("tabindex", "-1");
                          break;
                      case "remove":
                          (P = D.attr("data-wf-tabindex-swap")), P ? (D.attr("tabindex", P), D.removeAttr("data-wf-tabindex-swap")) : D.removeAttr("tabindex");
                          break;
                  }
                  D.toggleClass("wf-force-outline-none", I === "add");
              }
              function N(D) {
                  var I = D.currentTarget;
                  if (!(Li.env("design") || (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(I.className)))) {
                      var P = x(I) ? I.hash : "";
                      if (P !== "") {
                          var M = e(P);
                          M.length &&
                              (D && (D.preventDefault(), D.stopPropagation()),
                              C(P, D),
                              window.setTimeout(
                                  function () {
                                      q(M, function () {
                                          m(M, "add"), M.get(0).focus({ preventScroll: !0 }), m(M, "remove");
                                      });
                                  },
                                  D ? 0 : 300
                              ));
                      }
                  }
              }
              function C(D) {
                  if (r.hash !== D && n && n.pushState && !(Li.env.chrome && r.protocol === "file:")) {
                      var I = n.state && n.state.hash;
                      I !== D && n.pushState({ hash: D }, "", D);
                  }
              }
              function q(D, I) {
                  var P = i.scrollTop(),
                      M = G(D);
                  if (P !== M) {
                      var X = j(D, P, M),
                          Q = Date.now(),
                          re = function () {
                              var L = Date.now() - Q;
                              window.scroll(0, Y(P, M, L, X)), L <= X ? a(re) : typeof I == "function" && I();
                          };
                      a(re);
                  }
              }
              function G(D) {
                  var I = e(f),
                      P = I.css("position") === "fixed" ? I.outerHeight() : 0,
                      M = D.offset().top - P;
                  if (D.data("scroll") === "mid") {
                      var X = i.height() - P,
                          Q = D.outerHeight();
                      Q < X && (M -= Math.round((X - Q) / 2));
                  }
                  return M;
              }
              function j(D, I, P) {
                  if (w()) return 0;
                  var M = 1;
                  return (
                      s.add(D).each(function (X, Q) {
                          var re = parseFloat(Q.getAttribute("data-scroll-time"));
                          !isNaN(re) && re >= 0 && (M = re);
                      }),
                      (472.143 * Math.log(Math.abs(I - P) + 125) - 2e3) * M
                  );
              }
              function Y(D, I, P, M) {
                  return P > M ? I : D + (I - D) * oe(P / M);
              }
              function oe(D) {
                  return D < 0.5 ? 4 * D * D * D : (D - 1) * (2 * D - 2) * (2 * D - 2) + 1;
              }
              function te() {
                  var { WF_CLICK_EMPTY: D, WF_CLICK_SCROLL: I } = t;
                  o.on(I, v, N),
                      o.on(D, p, function (P) {
                          P.preventDefault();
                      }),
                      document.head.insertBefore(g, document.head.firstChild);
              }
              return { ready: te };
          })
      );
  });
  var rI = u((rK, tI) => {
      var JV = Qe();
      JV.define(
          "touch",
          (tI.exports = function (e) {
              var t = {},
                  r = window.getSelection;
              (e.event.special.tap = { bindType: "click", delegateType: "click" }),
                  (t.init = function (o) {
                      return (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null;
                  });
              function n(o) {
                  var s = !1,
                      a = !1,
                      c = Math.min(Math.round(window.innerWidth * 0.04), 40),
                      f,
                      p;
                  o.addEventListener("touchstart", v, !1),
                      o.addEventListener("touchmove", E, !1),
                      o.addEventListener("touchend", g, !1),
                      o.addEventListener("touchcancel", b, !1),
                      o.addEventListener("mousedown", v, !1),
                      o.addEventListener("mousemove", E, !1),
                      o.addEventListener("mouseup", g, !1),
                      o.addEventListener("mouseout", b, !1);
                  function v(x) {
                      var A = x.touches;
                      (A && A.length > 1) || ((s = !0), A ? ((a = !0), (f = A[0].clientX)) : (f = x.clientX), (p = f));
                  }
                  function E(x) {
                      if (s) {
                          if (a && x.type === "mousemove") {
                              x.preventDefault(), x.stopPropagation();
                              return;
                          }
                          var A = x.touches,
                              w = A ? A[0].clientX : x.clientX,
                              m = w - p;
                          (p = w), Math.abs(m) > c && r && String(r()) === "" && (i("swipe", x, { direction: m > 0 ? "right" : "left" }), b());
                      }
                  }
                  function g(x) {
                      if (s && ((s = !1), a && x.type === "mouseup")) {
                          x.preventDefault(), x.stopPropagation(), (a = !1);
                          return;
                      }
                  }
                  function b() {
                      s = !1;
                  }
                  function S() {
                      o.removeEventListener("touchstart", v, !1),
                          o.removeEventListener("touchmove", E, !1),
                          o.removeEventListener("touchend", g, !1),
                          o.removeEventListener("touchcancel", b, !1),
                          o.removeEventListener("mousedown", v, !1),
                          o.removeEventListener("mousemove", E, !1),
                          o.removeEventListener("mouseup", g, !1),
                          o.removeEventListener("mouseout", b, !1),
                          (o = null);
                  }
                  this.destroy = S;
              }
              function i(o, s, a) {
                  var c = e.Event(o, { originalEvent: s });
                  e(s.target).trigger(c, a);
              }
              return (t.instance = t.init(document)), t;
          })
      );
  });
  var nI = u((_s) => {
      "use strict";
      Object.defineProperty(_s, "__esModule", { value: !0 });
      _s.default = eW;
      function eW(e, t, r, n, i, o, s, a, c, f, p, v, E) {
          return function (g) {
              e(g);
              var b = g.form,
                  S = {
                      name: b.attr("data-name") || b.attr("name") || "Untitled Form",
                      source: t.href,
                      test: r.env(),
                      fields: {},
                      fileUploads: {},
                      dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(b.html()),
                      trackingCookies: n(),
                  };
              let x = b.attr("data-wf-flow");
              x && (S.wfFlow = x), i(g);
              var A = o(b, S.fields);
              if (A) return s(A);
              if (((S.fileUploads = a(b)), c(g), !f)) {
                  p(g);
                  return;
              }
              v.ajax({ url: E, type: "POST", data: S, dataType: "json", crossDomain: !0 })
                  .done(function (w) {
                      w && w.code === 200 && (g.success = !0), p(g);
                  })
                  .fail(function () {
                      p(g);
                  });
          };
      }
  });
  var oI = u((iK, iI) => {
      var Pi = Qe();
      Pi.define(
          "forms",
          (iI.exports = function (e, t) {
              var r = {},
                  n = e(document),
                  i,
                  o = window.location,
                  s = window.XDomainRequest && !window.atob,
                  a = ".w-form",
                  c,
                  f = /e(-)?mail/i,
                  p = /^\S+@\S+$/,
                  v = window.alert,
                  E = Pi.env(),
                  g,
                  b,
                  S,
                  x = /list-manage[1-9]?.com/i,
                  A = t.debounce(function () {
                      v("Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.");
                  }, 100);
              r.ready = r.design = r.preview = function () {
                  w(), !E && !g && N();
              };
              function w() {
                  (c = e("html").attr("data-wf-site")),
                      (b = "https://webflow.com/api/v1/form/" + c),
                      s && b.indexOf("https://webflow.com") >= 0 && (b = b.replace("https://webflow.com", "https://formdata.webflow.com")),
                      (S = `${b}/signFile`),
                      (i = e(a + " form")),
                      i.length && i.each(m);
              }
              function m(L, H) {
                  var k = e(H),
                      U = e.data(H, a);
                  U || (U = e.data(H, a, { form: k })), C(U);
                  var F = k.closest("div.w-form");
                  (U.done = F.find("> .w-form-done")),
                      (U.fail = F.find("> .w-form-fail")),
                      (U.fileUploads = F.find(".w-file-upload")),
                      U.fileUploads.each(function (le) {
                          X(le, U);
                      });
                  var Z = U.form.attr("aria-label") || U.form.attr("data-name") || "Form";
                  U.done.attr("aria-label") || U.form.attr("aria-label", Z),
                      U.done.attr("tabindex", "-1"),
                      U.done.attr("role", "region"),
                      U.done.attr("aria-label") || U.done.attr("aria-label", Z + " success"),
                      U.fail.attr("tabindex", "-1"),
                      U.fail.attr("role", "region"),
                      U.fail.attr("aria-label") || U.fail.attr("aria-label", Z + " failure");
                  var ce = (U.action = k.attr("action"));
                  if (((U.handler = null), (U.redirect = k.attr("data-redirect")), x.test(ce))) {
                      U.handler = I;
                      return;
                  }
                  if (!ce) {
                      if (c) {
                          U.handler = (() => {
                              let le = nI().default;
                              return le(C, o, Pi, oe, M, G, v, j, q, c, P, e, b);
                          })();
                          return;
                      }
                      A();
                  }
              }
              function N() {
                  (g = !0),
                      n.on("submit", a + " form", function (le) {
                          var ee = e.data(this, a);
                          ee.handler && ((ee.evt = le), ee.handler(ee));
                      });
                  let L = ".w-checkbox-input",
                      H = ".w-radio-input",
                      k = "w--redirected-checked",
                      U = "w--redirected-focus",
                      F = "w--redirected-focus-visible",
                      Z = ":focus-visible, [data-wf-focus-visible]",
                      ce = [
                          ["checkbox", L],
                          ["radio", H],
                      ];
                  n.on("change", a + ' form input[type="checkbox"]:not(' + L + ")", (le) => {
                      e(le.target).siblings(L).toggleClass(k);
                  }),
                      n.on("change", a + ' form input[type="radio"]', (le) => {
                          e(`input[name="${le.target.name}"]:not(${L})`).map((Ee, vt) => e(vt).siblings(H).removeClass(k));
                          let ee = e(le.target);
                          ee.hasClass("w-radio-input") || ee.siblings(H).addClass(k);
                      }),
                      ce.forEach(([le, ee]) => {
                          n.on("focus", a + ` form input[type="${le}"]:not(` + ee + ")", (Ee) => {
                              e(Ee.target).siblings(ee).addClass(U), e(Ee.target).filter(Z).siblings(ee).addClass(F);
                          }),
                              n.on("blur", a + ` form input[type="${le}"]:not(` + ee + ")", (Ee) => {
                                  e(Ee.target).siblings(ee).removeClass(`${U} ${F}`);
                              });
                      });
              }
              function C(L) {
                  var H = (L.btn = L.form.find(':input[type="submit"]'));
                  (L.wait = L.btn.attr("data-wait") || null), (L.success = !1), H.prop("disabled", !1), L.label && H.val(L.label);
              }
              function q(L) {
                  var H = L.btn,
                      k = L.wait;
                  H.prop("disabled", !0), k && ((L.label = H.val()), H.val(k));
              }
              function G(L, H) {
                  var k = null;
                  return (
                      (H = H || {}),
                      L.find(':input:not([type="submit"]):not([type="file"])').each(function (U, F) {
                          var Z = e(F),
                              ce = Z.attr("type"),
                              le = Z.attr("data-name") || Z.attr("name") || "Field " + (U + 1),
                              ee = Z.val();
                          if (ce === "checkbox") ee = Z.is(":checked");
                          else if (ce === "radio") {
                              if (H[le] === null || typeof H[le] == "string") return;
                              ee = L.find('input[name="' + Z.attr("name") + '"]:checked').val() || null;
                          }
                          typeof ee == "string" && (ee = e.trim(ee)), (H[le] = ee), (k = k || te(Z, ce, le, ee));
                      }),
                      k
                  );
              }
              function j(L) {
                  var H = {};
                  return (
                      L.find(':input[type="file"]').each(function (k, U) {
                          var F = e(U),
                              Z = F.attr("data-name") || F.attr("name") || "File " + (k + 1),
                              ce = F.attr("data-value");
                          typeof ce == "string" && (ce = e.trim(ce)), (H[Z] = ce);
                      }),
                      H
                  );
              }
              let Y = { _mkto_trk: "marketo" };
              function oe() {
                  return document.cookie.split("; ").reduce(function (H, k) {
                      let U = k.split("="),
                          F = U[0];
                      if (F in Y) {
                          let Z = Y[F],
                              ce = U.slice(1).join("=");
                          H[Z] = ce;
                      }
                      return H;
                  }, {});
              }
              function te(L, H, k, U) {
                  var F = null;
                  return (
                      H === "password"
                          ? (F = "Passwords cannot be submitted.")
                          : L.attr("required")
                          ? U
                              ? f.test(L.attr("type")) && (p.test(U) || (F = "Please enter a valid email address for: " + k))
                              : (F = "Please fill out the required field: " + k)
                          : k === "g-recaptcha-response" && !U && (F = "Please confirm you\u2019re not a robot."),
                      F
                  );
              }
              function D(L) {
                  M(L), P(L);
              }
              function I(L) {
                  C(L);
                  var H = L.form,
                      k = {};
                  if (/^https/.test(o.href) && !/^https/.test(L.action)) {
                      H.attr("method", "post");
                      return;
                  }
                  M(L);
                  var U = G(H, k);
                  if (U) return v(U);
                  q(L);
                  var F;
                  t.each(k, function (ee, Ee) {
                      f.test(Ee) && (k.EMAIL = ee), /^((full[ _-]?)?name)$/i.test(Ee) && (F = ee), /^(first[ _-]?name)$/i.test(Ee) && (k.FNAME = ee), /^(last[ _-]?name)$/i.test(Ee) && (k.LNAME = ee);
                  }),
                      F && !k.FNAME && ((F = F.split(" ")), (k.FNAME = F[0]), (k.LNAME = k.LNAME || F[1]));
                  var Z = L.action.replace("/post?", "/post-json?") + "&c=?",
                      ce = Z.indexOf("u=") + 2;
                  ce = Z.substring(ce, Z.indexOf("&", ce));
                  var le = Z.indexOf("id=") + 3;
                  (le = Z.substring(le, Z.indexOf("&", le))),
                      (k["b_" + ce + "_" + le] = ""),
                      e
                          .ajax({ url: Z, data: k, dataType: "jsonp" })
                          .done(function (ee) {
                              (L.success = ee.result === "success" || /already/.test(ee.msg)), L.success || console.info("MailChimp error: " + ee.msg), P(L);
                          })
                          .fail(function () {
                              P(L);
                          });
              }
              function P(L) {
                  var H = L.form,
                      k = L.redirect,
                      U = L.success;
                  if (U && k) {
                      Pi.location(k);
                      return;
                  }
                  L.done.toggle(U), L.fail.toggle(!U), U ? L.done.focus() : L.fail.focus(), H.toggle(!U), C(L);
              }
              function M(L) {
                  L.evt && L.evt.preventDefault(), (L.evt = null);
              }
              function X(L, H) {
                  if (!H.fileUploads || !H.fileUploads[L]) return;
                  var k,
                      U = e(H.fileUploads[L]),
                      F = U.find("> .w-file-upload-default"),
                      Z = U.find("> .w-file-upload-uploading"),
                      ce = U.find("> .w-file-upload-success"),
                      le = U.find("> .w-file-upload-error"),
                      ee = F.find(".w-file-upload-input"),
                      Ee = F.find(".w-file-upload-label"),
                      vt = Ee.children(),
                      pe = le.find(".w-file-upload-error-msg"),
                      d = ce.find(".w-file-upload-file"),
                      V = ce.find(".w-file-remove-link"),
                      K = d.find(".w-file-upload-file-name"),
                      B = pe.attr("data-w-size-error"),
                      ye = pe.attr("data-w-type-error"),
                      xt = pe.attr("data-w-generic-error");
                  if (
                      (E ||
                          Ee.on("click keydown", function (_) {
                              (_.type === "keydown" && _.which !== 13 && _.which !== 32) || (_.preventDefault(), ee.click());
                          }),
                      Ee.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
                      V.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
                      E)
                  )
                      ee.on("click", function (_) {
                          _.preventDefault();
                      }),
                          Ee.on("click", function (_) {
                              _.preventDefault();
                          }),
                          vt.on("click", function (_) {
                              _.preventDefault();
                          });
                  else {
                      V.on("click keydown", function (_) {
                          if (_.type === "keydown") {
                              if (_.which !== 13 && _.which !== 32) return;
                              _.preventDefault();
                          }
                          ee.removeAttr("data-value"), ee.val(""), K.html(""), F.toggle(!0), ce.toggle(!1), Ee.focus();
                      }),
                          ee.on("change", function (_) {
                              (k = _.target && _.target.files && _.target.files[0]), k && (F.toggle(!1), le.toggle(!1), Z.toggle(!0), Z.focus(), K.text(k.name), T() || q(H), (H.fileUploads[L].uploading = !0), Q(k, h));
                          });
                      var ht = Ee.outerHeight();
                      ee.height(ht), ee.width(1);
                  }
                  function l(_) {
                      var O = _.responseJSON && _.responseJSON.msg,
                          z = xt;
                      typeof O == "string" && O.indexOf("InvalidFileTypeError") === 0 ? (z = ye) : typeof O == "string" && O.indexOf("MaxFileSizeError") === 0 && (z = B),
                          pe.text(z),
                          ee.removeAttr("data-value"),
                          ee.val(""),
                          Z.toggle(!1),
                          F.toggle(!0),
                          le.toggle(!0),
                          le.focus(),
                          (H.fileUploads[L].uploading = !1),
                          T() || C(H);
                  }
                  function h(_, O) {
                      if (_) return l(_);
                      var z = O.fileName,
                          ne = O.postData,
                          ge = O.fileId,
                          W = O.s3Url;
                      ee.attr("data-value", ge), re(W, ne, k, z, y);
                  }
                  function y(_) {
                      if (_) return l(_);
                      Z.toggle(!1), ce.css("display", "inline-block"), ce.focus(), (H.fileUploads[L].uploading = !1), T() || C(H);
                  }
                  function T() {
                      var _ = (H.fileUploads && H.fileUploads.toArray()) || [];
                      return _.some(function (O) {
                          return O.uploading;
                      });
                  }
              }
              function Q(L, H) {
                  var k = new URLSearchParams({ name: L.name, size: L.size });
                  e.ajax({ type: "GET", url: `${S}?${k}`, crossDomain: !0 })
                      .done(function (U) {
                          H(null, U);
                      })
                      .fail(function (U) {
                          H(U);
                      });
              }
              function re(L, H, k, U, F) {
                  var Z = new FormData();
                  for (var ce in H) Z.append(ce, H[ce]);
                  Z.append("file", k, U),
                      e
                          .ajax({ type: "POST", url: L, data: Z, processData: !1, contentType: !1 })
                          .done(function () {
                              F(null);
                          })
                          .fail(function (le) {
                              F(le);
                          });
              }
              return r;
          })
      );
  });
  var sI = u((oK, aI) => {
      var qt = Qe(),
          tW = Bi(),
          Pe = { ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, ESCAPE: 27, SPACE: 32, ENTER: 13, HOME: 36, END: 35 };
      qt.define(
          "navbar",
          (aI.exports = function (e, t) {
              var r = {},
                  n = e.tram,
                  i = e(window),
                  o = e(document),
                  s = t.debounce,
                  a,
                  c,
                  f,
                  p,
                  v = qt.env(),
                  E = '<div class="w-nav-overlay" data-wf-ignore />',
                  g = ".w-nav",
                  b = "w--open",
                  S = "w--nav-dropdown-open",
                  x = "w--nav-dropdown-toggle-open",
                  A = "w--nav-dropdown-list-open",
                  w = "w--nav-link-open",
                  m = tW.triggers,
                  N = e();
              (r.ready = r.design = r.preview = C),
                  (r.destroy = function () {
                      (N = e()), q(), c && c.length && c.each(oe);
                  });
              function C() {
                  (f = v && qt.env("design")), (p = qt.env("editor")), (a = e(document.body)), (c = o.find(g)), c.length && (c.each(Y), q(), G());
              }
              function q() {
                  qt.resize.off(j);
              }
              function G() {
                  qt.resize.on(j);
              }
              function j() {
                  c.each(F);
              }
              function Y(d, V) {
                  var K = e(V),
                      B = e.data(V, g);
                  B || (B = e.data(V, g, { open: !1, el: K, config: {}, selectedIdx: -1 })),
                      (B.menu = K.find(".w-nav-menu")),
                      (B.links = B.menu.find(".w-nav-link")),
                      (B.dropdowns = B.menu.find(".w-dropdown")),
                      (B.dropdownToggle = B.menu.find(".w-dropdown-toggle")),
                      (B.dropdownList = B.menu.find(".w-dropdown-list")),
                      (B.button = K.find(".w-nav-button")),
                      (B.container = K.find(".w-container")),
                      (B.overlayContainerId = "w-nav-overlay-" + d),
                      (B.outside = k(B));
                  var ye = K.find(".w-nav-brand");
                  ye && ye.attr("href") === "/" && ye.attr("aria-label") == null && ye.attr("aria-label", "home"),
                      B.button.attr("style", "-webkit-user-select: text;"),
                      B.button.attr("aria-label") == null && B.button.attr("aria-label", "menu"),
                      B.button.attr("role", "button"),
                      B.button.attr("tabindex", "0"),
                      B.button.attr("aria-controls", B.overlayContainerId),
                      B.button.attr("aria-haspopup", "menu"),
                      B.button.attr("aria-expanded", "false"),
                      B.el.off(g),
                      B.button.off(g),
                      B.menu.off(g),
                      I(B),
                      f ? (te(B), B.el.on("setting" + g, P(B))) : (D(B), B.button.on("click" + g, L(B)), B.menu.on("click" + g, "a", H(B)), B.button.on("keydown" + g, M(B)), B.el.on("keydown" + g, X(B))),
                      F(d, V);
              }
              function oe(d, V) {
                  var K = e.data(V, g);
                  K && (te(K), e.removeData(V, g));
              }
              function te(d) {
                  d.overlay && (pe(d, !0), d.overlay.remove(), (d.overlay = null));
              }
              function D(d) {
                  d.overlay || ((d.overlay = e(E).appendTo(d.el)), d.overlay.attr("id", d.overlayContainerId), (d.parent = d.menu.parent()), pe(d, !0));
              }
              function I(d) {
                  var V = {},
                      K = d.config || {},
                      B = (V.animation = d.el.attr("data-animation") || "default");
                  (V.animOver = /^over/.test(B)),
                      (V.animDirect = /left$/.test(B) ? -1 : 1),
                      K.animation !== B && d.open && t.defer(re, d),
                      (V.easing = d.el.attr("data-easing") || "ease"),
                      (V.easing2 = d.el.attr("data-easing2") || "ease");
                  var ye = d.el.attr("data-duration");
                  (V.duration = ye != null ? Number(ye) : 400), (V.docHeight = d.el.attr("data-doc-height")), (d.config = V);
              }
              function P(d) {
                  return function (V, K) {
                      K = K || {};
                      var B = i.width();
                      I(d),
                          K.open === !0 && Ee(d, !0),
                          K.open === !1 && pe(d, !0),
                          d.open &&
                              t.defer(function () {
                                  B !== i.width() && re(d);
                              });
                  };
              }
              function M(d) {
                  return function (V) {
                      switch (V.keyCode) {
                          case Pe.SPACE:
                          case Pe.ENTER:
                              return L(d)(), V.preventDefault(), V.stopPropagation();
                          case Pe.ESCAPE:
                              return pe(d), V.preventDefault(), V.stopPropagation();
                          case Pe.ARROW_RIGHT:
                          case Pe.ARROW_DOWN:
                          case Pe.HOME:
                          case Pe.END:
                              return d.open ? (V.keyCode === Pe.END ? (d.selectedIdx = d.links.length - 1) : (d.selectedIdx = 0), Q(d), V.preventDefault(), V.stopPropagation()) : (V.preventDefault(), V.stopPropagation());
                      }
                  };
              }
              function X(d) {
                  return function (V) {
                      if (d.open)
                          switch (((d.selectedIdx = d.links.index(document.activeElement)), V.keyCode)) {
                              case Pe.HOME:
                              case Pe.END:
                                  return V.keyCode === Pe.END ? (d.selectedIdx = d.links.length - 1) : (d.selectedIdx = 0), Q(d), V.preventDefault(), V.stopPropagation();
                              case Pe.ESCAPE:
                                  return pe(d), d.button.focus(), V.preventDefault(), V.stopPropagation();
                              case Pe.ARROW_LEFT:
                              case Pe.ARROW_UP:
                                  return (d.selectedIdx = Math.max(-1, d.selectedIdx - 1)), Q(d), V.preventDefault(), V.stopPropagation();
                              case Pe.ARROW_RIGHT:
                              case Pe.ARROW_DOWN:
                                  return (d.selectedIdx = Math.min(d.links.length - 1, d.selectedIdx + 1)), Q(d), V.preventDefault(), V.stopPropagation();
                          }
                  };
              }
              function Q(d) {
                  if (d.links[d.selectedIdx]) {
                      var V = d.links[d.selectedIdx];
                      V.focus(), H(V);
                  }
              }
              function re(d) {
                  d.open && (pe(d, !0), Ee(d, !0));
              }
              function L(d) {
                  return s(function () {
                      d.open ? pe(d) : Ee(d);
                  });
              }
              function H(d) {
                  return function (V) {
                      var K = e(this),
                          B = K.attr("href");
                      if (!qt.validClick(V.currentTarget)) {
                          V.preventDefault();
                          return;
                      }
                      B && B.indexOf("#") === 0 && d.open && pe(d);
                  };
              }
              function k(d) {
                  return (
                      d.outside && o.off("click" + g, d.outside),
                      function (V) {
                          var K = e(V.target);
                          (p && K.closest(".w-editor-bem-EditorOverlay").length) || U(d, K);
                      }
                  );
              }
              var U = s(function (d, V) {
                  if (d.open) {
                      var K = V.closest(".w-nav-menu");
                      d.menu.is(K) || pe(d);
                  }
              });
              function F(d, V) {
                  var K = e.data(V, g),
                      B = (K.collapsed = K.button.css("display") !== "none");
                  if ((K.open && !B && !f && pe(K, !0), K.container.length)) {
                      var ye = ce(K);
                      K.links.each(ye), K.dropdowns.each(ye);
                  }
                  K.open && vt(K);
              }
              var Z = "max-width";
              function ce(d) {
                  var V = d.container.css(Z);
                  return (
                      V === "none" && (V = ""),
                      function (K, B) {
                          (B = e(B)), B.css(Z, ""), B.css(Z) === "none" && B.css(Z, V);
                      }
                  );
              }
              function le(d, V) {
                  V.setAttribute("data-nav-menu-open", "");
              }
              function ee(d, V) {
                  V.removeAttribute("data-nav-menu-open");
              }
              function Ee(d, V) {
                  if (d.open) return;
                  (d.open = !0), d.menu.each(le), d.links.addClass(w), d.dropdowns.addClass(S), d.dropdownToggle.addClass(x), d.dropdownList.addClass(A), d.button.addClass(b);
                  var K = d.config,
                      B = K.animation;
                  (B === "none" || !n.support.transform || K.duration <= 0) && (V = !0);
                  var ye = vt(d),
                      xt = d.menu.outerHeight(!0),
                      ht = d.menu.outerWidth(!0),
                      l = d.el.height(),
                      h = d.el[0];
                  if ((F(0, h), m.intro(0, h), qt.redraw.up(), f || o.on("click" + g, d.outside), V)) {
                      _();
                      return;
                  }
                  var y = "transform " + K.duration + "ms " + K.easing;
                  if ((d.overlay && ((N = d.menu.prev()), d.overlay.show().append(d.menu)), K.animOver)) {
                      n(d.menu)
                          .add(y)
                          .set({ x: K.animDirect * ht, height: ye })
                          .start({ x: 0 })
                          .then(_),
                          d.overlay && d.overlay.width(ht);
                      return;
                  }
                  var T = l + xt;
                  n(d.menu).add(y).set({ y: -T }).start({ y: 0 }).then(_);
                  function _() {
                      d.button.attr("aria-expanded", "true");
                  }
              }
              function vt(d) {
                  var V = d.config,
                      K = V.docHeight ? o.height() : a.height();
                  return V.animOver ? d.menu.height(K) : d.el.css("position") !== "fixed" && (K -= d.el.outerHeight(!0)), d.overlay && d.overlay.height(K), K;
              }
              function pe(d, V) {
                  if (!d.open) return;
                  (d.open = !1), d.button.removeClass(b);
                  var K = d.config;
                  if (((K.animation === "none" || !n.support.transform || K.duration <= 0) && (V = !0), m.outro(0, d.el[0]), o.off("click" + g, d.outside), V)) {
                      n(d.menu).stop(), h();
                      return;
                  }
                  var B = "transform " + K.duration + "ms " + K.easing2,
                      ye = d.menu.outerHeight(!0),
                      xt = d.menu.outerWidth(!0),
                      ht = d.el.height();
                  if (K.animOver) {
                      n(d.menu)
                          .add(B)
                          .start({ x: xt * K.animDirect })
                          .then(h);
                      return;
                  }
                  var l = ht + ye;
                  n(d.menu).add(B).start({ y: -l }).then(h);
                  function h() {
                      d.menu.height(""),
                          n(d.menu).set({ x: 0, y: 0 }),
                          d.menu.each(ee),
                          d.links.removeClass(w),
                          d.dropdowns.removeClass(S),
                          d.dropdownToggle.removeClass(x),
                          d.dropdownList.removeClass(A),
                          d.overlay && d.overlay.children().length && (N.length ? d.menu.insertAfter(N) : d.menu.prependTo(d.parent), d.overlay.attr("style", "").hide()),
                          d.el.triggerHandler("w-close"),
                          d.button.attr("aria-expanded", "false");
                  }
              }
              return r;
          })
      );
  });
  ys();
  Is();
  Ls();
  Ds();
  Fs();
  Us();
  Bi();
  Qy();
  Zy();
  eI();
  rI();
  oI();
  sI();
})();
/*!
* tram.js v0.8.2-global
* Cross-browser CSS3 transitions in JavaScript
* https://github.com/bkwld/tram
* MIT License
*/
/*!
* Webflow._ (aka) Underscore.js 1.6.0 (custom build)
* _.each
* _.map
* _.find
* _.filter
* _.any
* _.contains
* _.delay
* _.defer
* _.throttle (webflow)
* _.debounce
* _.keys
* _.has
* _.now
* _.template (webflow: upgraded to 1.13.6)
*
* http://underscorejs.org
* (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
* Underscore may be freely distributed under the MIT license.
* @license MIT
*/
/*! Bundled license information:

timm/lib/timm.js:
(*!
 * Timm
 *
 * Immutability helpers with fast reads and acceptable writes.
 *
 * @copyright Guillermo Grau Panea 2016
 * @license MIT
 *)
*/
/**
* ----------------------------------------------------------------------
* Webflow: Interactions 2.0: Init
*/
Webflow.require("ix2").init({
  events: {
      "e-2": {
          id: "e-2",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-2", affectedElements: {}, playInReverse: false, autoStopEventId: "e-94" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".hero-heading-wrapper", originalId: "6418242686bf04d1ef8ee896|f16a9f2a-45d9-ca57-55c3-c08c6f4609a2", appliesTo: "CLASS" },
          targets: [{ selector: ".hero-heading-wrapper", originalId: "6418242686bf04d1ef8ee896|f16a9f2a-45d9-ca57-55c3-c08c6f4609a2", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676549829091,
      },
      "e-3": {
          id: "e-3",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-3", affectedElements: {}, playInReverse: false, autoStopEventId: "e-2" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".hero-heading-wrapper", originalId: "6418242686bf04d1ef8ee896|f16a9f2a-45d9-ca57-55c3-c08c6f4609a2", appliesTo: "CLASS" },
          targets: [{ selector: ".hero-heading-wrapper", originalId: "6418242686bf04d1ef8ee896|f16a9f2a-45d9-ca57-55c3-c08c6f4609a2", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676549829091,
      },
      "e-4": {
          id: "e-4",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896", appliesTo: "PAGE", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896", appliesTo: "PAGE", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-p", selectedAxis: "X_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
              { continuousParameterGroupId: "a-p-2", selectedAxis: "Y_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1676550167371,
      },
      "e-6": {
          id: "e-6",
          name: "",
          animationType: "custom",
          eventTypeId: "SCROLLING_IN_VIEW",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-5", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [{ continuousParameterGroupId: "a-5-p", smoothing: 80, startsEntering: true, addStartOffset: false, addOffsetValue: 50, startsExiting: false, addEndOffset: false, endOffsetValue: 50 }],
          createdOn: 1676627083340,
      },
      "e-8": {
          id: "e-8",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-6", affectedElements: {}, playInReverse: false, autoStopEventId: "e-9" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676627520608,
      },
      "e-9": {
          id: "e-9",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-7", affectedElements: {}, playInReverse: false, autoStopEventId: "e-93" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676627520608,
      },
      "e-13": {
          id: "e-13",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-11", affectedElements: {}, playInReverse: false, autoStopEventId: "e-96" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676629278063,
      },
      "e-14": {
          id: "e-14",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-12", affectedElements: {}, playInReverse: false, autoStopEventId: "e-13" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676629278063,
      },
      "e-15": {
          id: "e-15",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-13", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|32ef4845-c55e-ba96-5fde-01fece1ca739", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-13-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-13-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1676629462014,
      },
      "e-16": {
          id: "e-16",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-14", affectedElements: {}, playInReverse: false, autoStopEventId: "e-17" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|f4d90030-4074-47c7-53bf-d22a5e5d8913", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|f4d90030-4074-47c7-53bf-d22a5e5d8913", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676629924967,
      },
      "e-17": {
          id: "e-17",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-15", affectedElements: {}, playInReverse: false, autoStopEventId: "e-16" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|f4d90030-4074-47c7-53bf-d22a5e5d8913", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|f4d90030-4074-47c7-53bf-d22a5e5d8913", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676629924968,
      },
      "e-18": {
          id: "e-18",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-19" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b7", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b7", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630493500,
      },
      "e-20": {
          id: "e-20",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-21" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b9", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2b9", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630511455,
      },
      "e-22": {
          id: "e-22",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-23" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2bc", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|6e7018b7-b1ee-150c-9491-53e5e5fad2bc", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630518746,
      },
      "e-24": {
          id: "e-24",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-25" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|d3092d77-7d89-9146-fce1-59942c020e9a", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|d3092d77-7d89-9146-fce1-59942c020e9a", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630591005,
      },
      "e-26": {
          id: "e-26",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-27" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|863dd58e-e683-0b6a-d7cf-ca358fd6755e", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|863dd58e-e683-0b6a-d7cf-ca358fd6755e", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630600691,
      },
      "e-32": {
          id: "e-32",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-33" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".expertise-wrapper", originalId: "6418242686bf04d1ef8ee896|5c8e795a-0ecb-b197-95f9-9dcf4c6d07a5", appliesTo: "CLASS" },
          targets: [{ selector: ".expertise-wrapper", originalId: "6418242686bf04d1ef8ee896|5c8e795a-0ecb-b197-95f9-9dcf4c6d07a5", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630639192,
      },
      "e-34": {
          id: "e-34",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-35" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|13d444ff-807b-3569-72b7-505b898cd366", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|13d444ff-807b-3569-72b7-505b898cd366", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630654680,
      },
      "e-36": {
          id: "e-36",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-37" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|8e9d52d2-02e1-d3eb-bde6-9e139daf4502", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|8e9d52d2-02e1-d3eb-bde6-9e139daf4502", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630665729,
      },
      "e-38": {
          id: "e-38",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-39" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|f8612a0b-8e08-3dc8-c2a2-0b9511fcf32a", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|f8612a0b-8e08-3dc8-c2a2-0b9511fcf32a", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630677203,
      },
      "e-40": {
          id: "e-40",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-41" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" },
          targets: [{ selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676630694855,
      },
      "e-42": {
          id: "e-42",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-16", affectedElements: {}, playInReverse: false, autoStopEventId: "e-43" } },
          mediaQueries: ["main"],
          target: { selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" },
          targets: [{ selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676630729597,
      },
      "e-43": {
          id: "e-43",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-17", affectedElements: {}, playInReverse: false, autoStopEventId: "e-42" } },
          mediaQueries: ["main"],
          target: { selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" },
          targets: [{ selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676630729598,
      },
      "e-44": {
          id: "e-44",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-18", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" },
          targets: [{ selector: ".blog-stories-wrapper", originalId: "6418242686bf04d1ef8ee896|84a9304e-6a97-c90d-772e-737714d39429", appliesTo: "CLASS" }],
          config: [
              { continuousParameterGroupId: "a-18-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-18-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1676630969922,
      },
      "e-45": {
          id: "e-45",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-46" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9793", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9793", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676631233657,
      },
      "e-47": {
          id: "e-47",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-48" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9795", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9795", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676631241678,
      },
      "e-49": {
          id: "e-49",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-329" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9797", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|d03d0abd-d86e-0a21-3292-e421a01e9797", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676631249779,
      },
      "e-51": {
          id: "e-51",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-9", affectedElements: {}, playInReverse: false, autoStopEventId: "e-331" } },
          mediaQueries: ["main"],
          target: { selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|e43685b3-59d2-4166-41db-90a2686385da", appliesTo: "CLASS" },
          targets: [{ selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|e43685b3-59d2-4166-41db-90a2686385da", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676633079373,
      },
      "e-52": {
          id: "e-52",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-10", affectedElements: {}, playInReverse: false, autoStopEventId: "e-330" } },
          mediaQueries: ["main"],
          target: { selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|e43685b3-59d2-4166-41db-90a2686385da", appliesTo: "CLASS" },
          targets: [{ selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|e43685b3-59d2-4166-41db-90a2686385da", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676633079374,
      },
      "e-55": {
          id: "e-55",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-19", affectedElements: {}, playInReverse: false, autoStopEventId: "e-56" } },
          mediaQueries: ["main"],
          target: { selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" },
          targets: [{ selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676637127353,
      },
      "e-56": {
          id: "e-56",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-20", affectedElements: {}, playInReverse: false, autoStopEventId: "e-55" } },
          mediaQueries: ["main"],
          target: { selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" },
          targets: [{ selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676637127354,
      },
      "e-57": {
          id: "e-57",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-58" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b863", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b863", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638397829,
      },
      "e-59": {
          id: "e-59",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-333" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b865", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b865", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638406738,
      },
      "e-61": {
          id: "e-61",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-62" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b867", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b867", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638416188,
      },
      "e-63": {
          id: "e-63",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-64" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b869", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b869", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638427406,
      },
      "e-65": {
          id: "e-65",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-21", affectedElements: {}, playInReverse: false, autoStopEventId: "e-66" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b87b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b87b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676638516000,
      },
      "e-66": {
          id: "e-66",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-22", affectedElements: {}, playInReverse: false, autoStopEventId: "e-65" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "3699827a-2cc3-b755-a26a-932543c3b87b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "3699827a-2cc3-b755-a26a-932543c3b87b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676638516044,
      },
      "e-67": {
          id: "e-67",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-68" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638598194,
      },
      "e-69": {
          id: "e-69",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-70" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|679b4cb8-e039-713c-2d02-cba63be59db6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|679b4cb8-e039-713c-2d02-cba63be59db6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638607142,
      },
      "e-71": {
          id: "e-71",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-72" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|7397851a-5f9c-bcb2-fd46-e2ed5b42d386", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|7397851a-5f9c-bcb2-fd46-e2ed5b42d386", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1676638616002,
      },
      "e-73": {
          id: "e-73",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-23", affectedElements: {}, playInReverse: false, autoStopEventId: "e-74" } },
          mediaQueries: ["main"],
          target: { selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" },
          targets: [{ selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676897317650,
      },
      "e-74": {
          id: "e-74",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-24", affectedElements: {}, playInReverse: false, autoStopEventId: "e-73" } },
          mediaQueries: ["main"],
          target: { selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" },
          targets: [{ selector: ".events-wrapper", originalId: "6418242686bf04d1ef8ee896|c369d71d-efcc-a6f6-ab99-7a71bcea5feb", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676897317651,
      },
      "e-79": {
          id: "e-79",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-8", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|2ff0c9a2-fd3b-4503-2847-f91be41c79c8", appliesTo: "CLASS" },
          targets: [{ selector: ".expertise-inner-link", originalId: "6418242686bf04d1ef8ee896|2ff0c9a2-fd3b-4503-2847-f91be41c79c8", appliesTo: "CLASS" }],
          config: [
              { continuousParameterGroupId: "a-8-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-8-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1676971513077,
      },
      "e-80": {
          id: "e-80",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-29", affectedElements: {}, playInReverse: false, autoStopEventId: "e-81" } },
          mediaQueries: ["main"],
          target: { selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676972619340,
      },
      "e-81": {
          id: "e-81",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-30", affectedElements: {}, playInReverse: false, autoStopEventId: "e-80" } },
          mediaQueries: ["main"],
          target: { selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1676972619341,
      },
      "e-82": {
          id: "e-82",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-31", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-link-wrapper", originalId: "eebac340-7d02-77e7-a36e-1693abe50430", appliesTo: "CLASS" }],
          config: [
              { continuousParameterGroupId: "a-31-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-31-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1676973923895,
      },
      "e-85": {
          id: "e-85",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-86" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|e3bf7e6c-4e1b-7c67-4a30-6d7c05eb24da", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|e3bf7e6c-4e1b-7c67-4a30-6d7c05eb24da", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1676982778737,
      },
      "e-87": {
          id: "e-87",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-88" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|e3bf7e6c-4e1b-7c67-4a30-6d7c05eb24dc", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|e3bf7e6c-4e1b-7c67-4a30-6d7c05eb24dc", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1676982778737,
      },
      "e-99": {
          id: "e-99",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-50", affectedElements: {}, playInReverse: false, autoStopEventId: "e-100" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba7f6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba7f6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677061554331,
      },
      "e-102": {
          id: "e-102",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-51", affectedElements: {}, playInReverse: false, autoStopEventId: "e-103" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f7b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f7b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677061571004,
      },
      "e-104": {
          id: "e-104",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-105" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c2", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c2", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677069646729,
      },
      "e-106": {
          id: "e-106",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-107" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677069646729,
      },
      "e-108": {
          id: "e-108",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-109" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677069646729,
      },
      "e-110": {
          id: "e-110",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-111" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7c8", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677069646729,
      },
      "e-112": {
          id: "e-112",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-21", affectedElements: {}, playInReverse: false, autoStopEventId: "e-113" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7da", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7da", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677069646729,
      },
      "e-113": {
          id: "e-113",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-22", affectedElements: {}, playInReverse: false, autoStopEventId: "e-112" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7da", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|5b85b955-6dbc-0fcc-20cb-6c6c2af2b7da", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677069646729,
      },
      "e-114": {
          id: "e-114",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInLeft", autoStopEventId: "e-115" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "LEFT", effectIn: true },
          createdOn: 1677148615515,
      },
      "e-116": {
          id: "e-116",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-117" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde0d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde0d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677148639261,
      },
      "e-118": {
          id: "e-118",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-119" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde0f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde0f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677148647272,
      },
      "e-120": {
          id: "e-120",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-121" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde12", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|a1f03079-9d60-92e5-7182-3b2c8dccde12", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677148655981,
      },
      "e-122": {
          id: "e-122",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-123" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677148675194,
      },
      "e-124": {
          id: "e-124",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899", appliesTo: "PAGE", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899", appliesTo: "PAGE", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-p", selectedAxis: "X_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-p-2", selectedAxis: "Y_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1677148738589,
      },
      "e-125": {
          id: "e-125",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-40", affectedElements: {}, playInReverse: false, autoStopEventId: "e-126" } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: true, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677148749306,
      },
      "e-126": {
          id: "e-126",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-41", affectedElements: {}, playInReverse: false, autoStopEventId: "e-125" } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|b54d3735-7d32-6e52-81a1-34efb665c73f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677148749308,
      },
      "e-127": {
          id: "e-127",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-42", affectedElements: {}, playInReverse: false, autoStopEventId: "e-128" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677149007940,
      },
      "e-128": {
          id: "e-128",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-43", affectedElements: {}, playInReverse: false, autoStopEventId: "e-127" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ca9fea9a-02f2-48e5-13ab-be98a08c6851", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677149007941,
      },
      "e-129": {
          id: "e-129",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-130" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a7", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a7", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151436283,
      },
      "e-131": {
          id: "e-131",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-132" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a9", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a9", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151445857,
      },
      "e-133": {
          id: "e-133",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-134" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539ab", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539ab", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151455802,
      },
      "e-135": {
          id: "e-135",
          name: "",
          animationType: "custom",
          eventTypeId: "SCROLLING_IN_VIEW",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-44", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|c27d6ea7-2544-b1c8-cd56-3c404cd539a6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [{ continuousParameterGroupId: "a-44-p", smoothing: 50, startsEntering: true, addStartOffset: false, addOffsetValue: 50, startsExiting: false, addEndOffset: false, endOffsetValue: 50 }],
          createdOn: 1677151505572,
      },
      "e-136": {
          id: "e-136",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-137" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e249", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e249", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151583560,
      },
      "e-138": {
          id: "e-138",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-139" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba7ec", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba7ec", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151592985,
      },
      "e-140": {
          id: "e-140",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-141" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f71", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f71", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151614912,
      },
      "e-142": {
          id: "e-142",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-143" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|4802e0f6-3e50-aa66-b104-6d82a0cefa98", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|4802e0f6-3e50-aa66-b104-6d82a0cefa98", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151704284,
      },
      "e-144": {
          id: "e-144",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-145" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|6b32d9fe-1398-dede-275c-8d134a209601", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|6b32d9fe-1398-dede-275c-8d134a209601", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151714712,
      },
      "e-146": {
          id: "e-146",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-147" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|0176f9b0-45b2-90a7-be6a-770ac8c85a2f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|0176f9b0-45b2-90a7-be6a-770ac8c85a2f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151722407,
      },
      "e-148": {
          id: "e-148",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-149" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|e0aacf48-202c-32ba-d703-b7bf3fff1242", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|e0aacf48-202c-32ba-d703-b7bf3fff1242", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151737484,
      },
      "e-150": {
          id: "e-150",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-151" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|96ec7796-94a4-8b86-240a-14b0cbcaa1a3", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|96ec7796-94a4-8b86-240a-14b0cbcaa1a3", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 400, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151750847,
      },
      "e-152": {
          id: "e-152",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-153" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "9184131a-bffc-c81a-983e-21ebf7074bb7", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "9184131a-bffc-c81a-983e-21ebf7074bb7", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151795411,
      },
      "e-154": {
          id: "e-154",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-155" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "9184131a-bffc-c81a-983e-21ebf7074bbc", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "9184131a-bffc-c81a-983e-21ebf7074bbc", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151805837,
      },
      "e-156": {
          id: "e-156",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-157" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "9184131a-bffc-c81a-983e-21ebf7074bc6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "9184131a-bffc-c81a-983e-21ebf7074bc6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151814285,
      },
      "e-158": {
          id: "e-158",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-159" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "9184131a-bffc-c81a-983e-21ebf7074bd0", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "9184131a-bffc-c81a-983e-21ebf7074bd0", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 400, direction: "BOTTOM", effectIn: true },
          createdOn: 1677151834896,
      },
      "e-162": {
          id: "e-162",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-34", affectedElements: {}, playInReverse: false, autoStopEventId: "e-163" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e251", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e251", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677163214088,
      },
      "e-164": {
          id: "e-164",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-45", affectedElements: {}, playInReverse: false, autoStopEventId: "e-165" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|11725039-cce9-1566-e149-c0de0ed00408", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|11725039-cce9-1566-e149-c0de0ed00408", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677232776362,
      },
      "e-166": {
          id: "e-166",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-46", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { selector: ".open-description", originalId: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e251", appliesTo: "CLASS" },
          targets: [{ selector: ".open-description", originalId: "6418242686bf04ada78ee899|90507905-9bb4-147f-5b13-22795405e251", appliesTo: "CLASS" }],
          config: [
              { continuousParameterGroupId: "a-46-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-46-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1677233692265,
      },
      "e-167": {
          id: "e-167",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-47", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { selector: ".close-description", originalId: "6418242686bf04ada78ee899|11725039-cce9-1566-e149-c0de0ed00408", appliesTo: "CLASS" },
          targets: [{ selector: ".close-description", originalId: "6418242686bf04ada78ee899|11725039-cce9-1566-e149-c0de0ed00408", appliesTo: "CLASS" }],
          config: [
              { continuousParameterGroupId: "a-47-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-47-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1677233887175,
      },
      "e-168": {
          id: "e-168",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-49", affectedElements: {}, playInReverse: false, autoStopEventId: "e-169" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba804", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|ecf209c0-719c-62b3-20f7-7632d0dba804", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677234392679,
      },
      "e-170": {
          id: "e-170",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-52", affectedElements: {}, playInReverse: false, autoStopEventId: "e-171" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f89", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04ada78ee899|3f65dce7-8678-73f6-2f6c-84fe299d2f89", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677235182177,
      },
      "e-172": {
          id: "e-172",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-173" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047cf98ee8a3|7fe9ea7c-f4ee-9286-4d67-7fb37501b449", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047cf98ee8a3|7fe9ea7c-f4ee-9286-4d67-7fb37501b449", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1677578513529,
      },
      "e-174": {
          id: "e-174",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-175" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".services-content", originalId: "6418242686bf047cf98ee8a3|0c7162f0-381b-bca5-a062-2d6c1fb2582d", appliesTo: "CLASS" },
          targets: [{ selector: ".services-content", originalId: "6418242686bf047cf98ee8a3|0c7162f0-381b-bca5-a062-2d6c1fb2582d", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677578549172,
      },
      "e-176": {
          id: "e-176",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-177" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".services-heading", originalId: "6418242686bf047cf98ee8a3|14dbe335-24fb-adfe-42af-8a24884452e1", appliesTo: "CLASS" },
          targets: [{ selector: ".services-heading", originalId: "6418242686bf047cf98ee8a3|14dbe335-24fb-adfe-42af-8a24884452e1", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677578565034,
      },
      "e-178": {
          id: "e-178",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-179" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047cf98ee8a3|d79d053c-e8aa-3751-0d59-6581a367a671", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047cf98ee8a3|d79d053c-e8aa-3751-0d59-6581a367a671", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677578577148,
      },
      "e-180": {
          id: "e-180",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-181" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" },
          targets: [{ selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677578588275,
      },
      "e-182": {
          id: "e-182",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-183" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047cf98ee8a3|15ff8940-88e7-c1d6-a7bc-2da134a8508d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047cf98ee8a3|15ff8940-88e7-c1d6-a7bc-2da134a8508d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1677578599783,
      },
      "e-184": {
          id: "e-184",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-53", affectedElements: {}, playInReverse: false, autoStopEventId: "e-185" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" },
          targets: [{ selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677578656171,
      },
      "e-185": {
          id: "e-185",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-54", affectedElements: {}, playInReverse: false, autoStopEventId: "e-184" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" },
          targets: [{ selector: ".contact-wrapper", originalId: "6418242686bf047cf98ee8a3|061a7453-0e07-128b-7042-6e7c5c0b2582", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677578656173,
      },
      "e-186": {
          id: "e-186",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-187" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|7143e154-9002-e9f9-2787-a218daf32af7", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|7143e154-9002-e9f9-2787-a218daf32af7", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677589101761,
      },
      "e-188": {
          id: "e-188",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-189" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d4d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d4d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677590062369,
      },
      "e-190": {
          id: "e-190",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-191" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d4f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d4f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677590062369,
      },
      "e-192": {
          id: "e-192",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-193" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d51", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d51", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677590062369,
      },
      "e-194": {
          id: "e-194",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-195" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d53", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|5fa252dd-f625-ff28-46eb-22b53f004d53", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677590062369,
      },
      "e-198": {
          id: "e-198",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-199" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|5e3ecf02-69e5-f28e-c125-71c7d0a480fc", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|5e3ecf02-69e5-f28e-c125-71c7d0a480fc", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1677590101625,
      },
      "e-200": {
          id: "e-200",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-201" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2|d241fe2e-10e7-26e1-a23e-b7f3173bef7e", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2|d241fe2e-10e7-26e1-a23e-b7f3173bef7e", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1677591264935,
      },
      "e-202": {
          id: "e-202",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-203" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".project-wrapper", originalId: "6418242686bf04fda28ee8a2|846f7eba-e037-d7e9-a577-9e77ec1f9215", appliesTo: "CLASS" },
          targets: [{ selector: ".project-wrapper", originalId: "6418242686bf04fda28ee8a2|846f7eba-e037-d7e9-a577-9e77ec1f9215", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591280706,
      },
      "e-206": {
          id: "e-206",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-207" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01ce", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01ce", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-208": {
          id: "e-208",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-209" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e2", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e2", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-210": {
          id: "e-210",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-211" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-212": {
          id: "e-212",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-213" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-214": {
          id: "e-214",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-215" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c01e8", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-218": {
          id: "e-218",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-219" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c0202", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c0202", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1677591335723,
      },
      "e-220": {
          id: "e-220",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_BIG_EFFECT", instant: false, config: { actionListId: "growBigIn", autoStopEventId: "e-221" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f|7c783740-51fc-f251-bc36-1130721f0192", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f|7c783740-51fc-f251-bc36-1130721f0192", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1677593836959,
      },
      "e-222": {
          id: "e-222",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-57", affectedElements: {}, playInReverse: false, autoStopEventId: "e-223" } },
          mediaQueries: ["main"],
          target: { selector: ".project-image", originalId: "6418242686bf04fda28ee8a2|28553620-4587-7526-fb81-51531f13d3ab", appliesTo: "CLASS" },
          targets: [{ selector: ".project-image", originalId: "6418242686bf04fda28ee8a2|28553620-4587-7526-fb81-51531f13d3ab", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677594406990,
      },
      "e-223": {
          id: "e-223",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-58", affectedElements: {}, playInReverse: false, autoStopEventId: "e-222" } },
          mediaQueries: ["main"],
          target: { selector: ".project-image", originalId: "6418242686bf04fda28ee8a2|28553620-4587-7526-fb81-51531f13d3ab", appliesTo: "CLASS" },
          targets: [{ selector: ".project-image", originalId: "6418242686bf04fda28ee8a2|28553620-4587-7526-fb81-51531f13d3ab", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677594406992,
      },
      "e-224": {
          id: "e-224",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04fda28ee8a2", appliesTo: "PAGE", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04fda28ee8a2", appliesTo: "PAGE", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-p", selectedAxis: "X_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
              { continuousParameterGroupId: "a-p-2", selectedAxis: "Y_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1677594436296,
      },
      "e-225": {
          id: "e-225",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf044b118ee89f", appliesTo: "PAGE", styleBlockIds: [] },
          targets: [{ id: "6418242686bf044b118ee89f", appliesTo: "PAGE", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-p", selectedAxis: "X_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
              { continuousParameterGroupId: "a-p-2", selectedAxis: "Y_AXIS", basedOn: "VIEWPORT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1677594711152,
      },
      "e-226": {
          id: "e-226",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-57", affectedElements: {}, playInReverse: false, autoStopEventId: "e-227" } },
          mediaQueries: ["main"],
          target: { selector: ".project-image", originalId: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c019f", appliesTo: "CLASS" },
          targets: [{ selector: ".project-image", originalId: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c019f", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677594720731,
      },
      "e-227": {
          id: "e-227",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-58", affectedElements: {}, playInReverse: false, autoStopEventId: "e-226" } },
          mediaQueries: ["main"],
          target: { selector: ".project-image", originalId: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c019f", appliesTo: "CLASS" },
          targets: [{ selector: ".project-image", originalId: "6418242686bf044b118ee89f|d41093ce-8d55-7310-3c53-19f92f8c019f", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677594720734,
      },
      "e-229": {
          id: "e-229",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-60", affectedElements: {}, playInReverse: false, autoStopEventId: "e-230" } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf047eea8ee8a0|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677681114801,
      },
      "e-230": {
          id: "e-230",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-61", affectedElements: {}, playInReverse: false, autoStopEventId: "e-229" } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf047eea8ee8a0|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1677681114804,
      },
      "e-236": {
          id: "e-236",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-237" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|c8d5d8b5-20f7-84ad-6772-adbf51f428e6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|c8d5d8b5-20f7-84ad-6772-adbf51f428e6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106292572,
      },
      "e-238": {
          id: "e-238",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-239" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|1e8bf7e7-143f-5c0e-b107-831233db979b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|1e8bf7e7-143f-5c0e-b107-831233db979b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106302064,
      },
      "e-240": {
          id: "e-240",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-241" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|e266538a-10d9-4a2e-3953-c5cdaaa3a0b5", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|e266538a-10d9-4a2e-3953-c5cdaaa3a0b5", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106323567,
      },
      "e-242": {
          id: "e-242",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-243" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|6ade2161-f516-7a16-d7d6-64941ca8b150", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|6ade2161-f516-7a16-d7d6-64941ca8b150", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106330752,
      },
      "e-244": {
          id: "e-244",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-245" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|3fa7d888-a1b6-ef06-7c64-a3b0b701e848", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|3fa7d888-a1b6-ef06-7c64-a3b0b701e848", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106338695,
      },
      "e-246": {
          id: "e-246",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-247" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|172fd2d1-026e-5482-b5f5-9f61c1bff31d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|172fd2d1-026e-5482-b5f5-9f61c1bff31d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106386970,
      },
      "e-248": {
          id: "e-248",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-249" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|a478313d-7e38-d711-f3e9-9b0f90a9d65d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|a478313d-7e38-d711-f3e9-9b0f90a9d65d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106412597,
      },
      "e-250": {
          id: "e-250",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-251" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|dacb45be-9342-28be-2298-136c42451933", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|dacb45be-9342-28be-2298-136c42451933", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106422227,
      },
      "e-252": {
          id: "e-252",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-253" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|8bc3bb84-bc70-30f1-a907-df2982c0c94b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|8bc3bb84-bc70-30f1-a907-df2982c0c94b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106429990,
      },
      "e-254": {
          id: "e-254",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-255" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|d2fa2918-8083-78b3-4ef5-4bbe9dcd4acf", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|d2fa2918-8083-78b3-4ef5-4bbe9dcd4acf", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106442501,
      },
      "e-256": {
          id: "e-256",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-257" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|abac3f1c-0f5c-f528-53a5-64b98a8322c6", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|abac3f1c-0f5c-f528-53a5-64b98a8322c6", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106537323,
      },
      "e-258": {
          id: "e-258",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-259" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|99dc6d9d-d4e4-83e0-6358-e5ff9865a6e4", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|99dc6d9d-d4e4-83e0-6358-e5ff9865a6e4", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106542202,
      },
      "e-260": {
          id: "e-260",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-261" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|4479584a-14c9-1085-95b5-176705871497", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|4479584a-14c9-1085-95b5-176705871497", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106560853,
      },
      "e-262": {
          id: "e-262",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-263" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|262b6290-e330-cce6-9053-f6b102849d99", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|262b6290-e330-cce6-9053-f6b102849d99", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106572114,
      },
      "e-264": {
          id: "e-264",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-265" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|c80b69c9-b9d9-be46-e2fe-59253f7cbe04", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|c80b69c9-b9d9-be46-e2fe-59253f7cbe04", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106580698,
      },
      "e-266": {
          id: "e-266",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-267" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|865513b8-922a-0c59-67ee-22d815e488a1", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|865513b8-922a-0c59-67ee-22d815e488a1", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106834377,
      },
      "e-268": {
          id: "e-268",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-269" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|70ebcf5e-c8cf-ec0e-6542-cb762ffc71ec", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|70ebcf5e-c8cf-ec0e-6542-cb762ffc71ec", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106844796,
      },
      "e-270": {
          id: "e-270",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-271" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|5a184c75-08d5-9fc7-f1a2-ab40817c4d0a", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|5a184c75-08d5-9fc7-f1a2-ab40817c4d0a", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106853192,
      },
      "e-272": {
          id: "e-272",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-273" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|8aeb6c01-ac74-4d7d-64a6-e22e1b02375d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|8aeb6c01-ac74-4d7d-64a6-e22e1b02375d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 300, direction: "BOTTOM", effectIn: true },
          createdOn: 1678106859993,
      },
      "e-274": {
          id: "e-274",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInLeft", autoStopEventId: "e-275" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "LEFT", effectIn: true },
          createdOn: 1678106911205,
      },
      "e-276": {
          id: "e-276",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-277" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0400c68ee89b|f4c83ffd-7549-f4e6-d293-8c69af286c35", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0400c68ee89b|f4c83ffd-7549-f4e6-d293-8c69af286c35", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1678107010720,
      },
      "e-278": {
          id: "e-278",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-66", affectedElements: {}, playInReverse: false, autoStopEventId: "e-279" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0400c68ee89b|4fa7bd9c-7bc9-7ef7-5d39-5b939daf5936", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0400c68ee89b|4fa7bd9c-7bc9-7ef7-5d39-5b939daf5936", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678107437654,
      },
      "e-279": {
          id: "e-279",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-67", affectedElements: {}, playInReverse: false, autoStopEventId: "e-278" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0400c68ee89b|4fa7bd9c-7bc9-7ef7-5d39-5b939daf5936", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0400c68ee89b|4fa7bd9c-7bc9-7ef7-5d39-5b939daf5936", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678107437659,
      },
      "e-284": {
          id: "e-284",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-285" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04096d8ee89e|5afab5a6-0cf6-db1c-36dc-d5bc5f441620", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04096d8ee89e|5afab5a6-0cf6-db1c-36dc-d5bc5f441620", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1678190980754,
      },
      "e-286": {
          id: "e-286",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-68", affectedElements: {}, playInReverse: false, autoStopEventId: "e-287" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04096d8ee89e|0534ff1d-8c85-205d-ae6b-5c43f8cee9dc", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04096d8ee89e|0534ff1d-8c85-205d-ae6b-5c43f8cee9dc", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678191069840,
      },
      "e-288": {
          id: "e-288",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-69", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-69-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 50, restingState: 50 },
              { continuousParameterGroupId: "a-69-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 50, restingState: 50 },
          ],
          createdOn: 1678191353071,
      },
      "e-289": {
          id: "e-289",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-70", affectedElements: {}, playInReverse: false, autoStopEventId: "e-290" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678191561421,
      },
      "e-291": {
          id: "e-291",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-71", affectedElements: {}, playInReverse: false, autoStopEventId: "e-292" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678196152988,
      },
      "e-292": {
          id: "e-292",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-75", affectedElements: {}, playInReverse: false, autoStopEventId: "e-291" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678196152992,
      },
      "e-296": {
          id: "e-296",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-25", affectedElements: {}, playInReverse: false, autoStopEventId: "e-297" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678198708430,
      },
      "e-297": {
          id: "e-297",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-26", affectedElements: {}, playInReverse: false, autoStopEventId: "e-296" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678198708430,
      },
      "e-298": {
          id: "e-298",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-27", affectedElements: {}, playInReverse: false, autoStopEventId: "e-299" } },
          mediaQueries: ["main"],
          target: { selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678198708430,
      },
      "e-299": {
          id: "e-299",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: { id: "", actionTypeId: "GENERAL_START_ACTION", config: { delay: 0, easing: "", duration: 0, actionListId: "a-28", affectedElements: {}, playInReverse: false, autoStopEventId: "e-298" } },
          mediaQueries: ["main"],
          target: { selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" },
          targets: [{ selector: ".menu-button-trigger", originalId: "6418242686bf04d1ef8ee896|c6dccefe-c030-2c9b-5c83-4be06a3e6571", appliesTo: "CLASS" }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: null, scrollOffsetUnit: null, delay: null, direction: null, effectIn: null },
          createdOn: 1678198708430,
      },
      "e-302": {
          id: "e-302",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-76", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf040f2b8ee89a|5ace42f1-dec7-503f-ad6c-66e60e99f427", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-76-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-76-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1678269125776,
      },
      "e-305": {
          id: "e-305",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-59", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf047eea8ee8a0|df1cd66c-a473-2a66-5e96-16e95cbd78a1", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-59-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-59-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1678281177723,
      },
      "e-306": {
          id: "e-306",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: { id: "", actionTypeId: "GENERAL_CONTINUOUS_ACTION", config: { actionListId: "a-59", affectedElements: {}, duration: 0 } },
          mediaQueries: ["main"],
          target: { id: "6418242686bf0476698ee89d|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: [
              { continuousParameterGroupId: "a-59-p", selectedAxis: "X_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
              { continuousParameterGroupId: "a-59-p-2", selectedAxis: "Y_AXIS", basedOn: "ELEMENT", reverse: false, smoothing: 90, restingState: 50 },
          ],
          createdOn: 1678281397976,
      },
      "e-307": {
          id: "e-307",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-308" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|ece6dceb-4623-f07c-a534-c5d9adbab282", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|ece6dceb-4623-f07c-a534-c5d9adbab282", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 200, direction: "BOTTOM", effectIn: true },
          createdOn: 1678281852886,
      },
      "e-309": {
          id: "e-309",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-310" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|bff9574c-238e-90af-38d8-87384ccf763a", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|bff9574c-238e-90af-38d8-87384ccf763a", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1678281935959,
      },
      "e-311": {
          id: "e-311",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-312" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|71fcb932-d505-190f-2c4a-bd1131e9b2f7", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|71fcb932-d505-190f-2c4a-bd1131e9b2f7", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1678282279209,
      },
      "e-319": {
          id: "e-319",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-320" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|f7e03b58-d20a-47ce-24e5-d1fdb0db168f", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|f7e03b58-d20a-47ce-24e5-d1fdb0db168f", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678282312702,
      },
      "e-321": {
          id: "e-321",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-322" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|f5cfa29d-0b99-199e-85d3-f293820e1276", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|f5cfa29d-0b99-199e-85d3-f293820e1276", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "BOTTOM", effectIn: true },
          createdOn: 1678282321092,
      },
      "e-323": {
          id: "e-323",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-324" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|b297b310-9ce1-4a91-ae24-d4be16cfade8", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1678282444372,
      },
      "e-325": {
          id: "e-325",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInLeft", autoStopEventId: "e-326" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0476698ee89d|8907093e-c882-5b64-04f8-ad09c5e9fac5", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0476698ee89d|8907093e-c882-5b64-04f8-ad09c5e9fac5", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "LEFT", effectIn: true },
          createdOn: 1678282484175,
      },
      "e-327": {
          id: "e-327",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "GROW_EFFECT", instant: false, config: { actionListId: "growIn", autoStopEventId: "e-328" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d1ef8ee896|eb2a146a-d3dd-5536-6c2f-7cad5794d85d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d1ef8ee896|eb2a146a-d3dd-5536-6c2f-7cad5794d85d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: null, effectIn: true },
          createdOn: 1678359448459,
      },
      "e-329": {
          id: "e-329",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInBottom", autoStopEventId: "e-330" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d2f08ee8a5|caedf409-3364-45b6-5d1a-e930b569170b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d2f08ee8a5|caedf409-3364-45b6-5d1a-e930b569170b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 0, direction: "BOTTOM", effectIn: true },
          createdOn: 1671830817258,
      },
      "e-331": {
          id: "e-331",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInTop", autoStopEventId: "e-332" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf04d2f08ee8a5|caedf409-3364-45b6-5d1a-e930b569170d", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf04d2f08ee8a5|caedf409-3364-45b6-5d1a-e930b569170d", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "TOP", effectIn: true },
          createdOn: 1671830829592,
      },
      "e-333": {
          id: "e-333",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: { id: "", actionTypeId: "SLIDE_EFFECT", instant: false, config: { actionListId: "slideInTop", autoStopEventId: "e-334" } },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: { id: "6418242686bf0441a78ee8a1|1bbbd5de-7a84-31a0-5c52-333787b4573b", appliesTo: "ELEMENT", styleBlockIds: [] },
          targets: [{ id: "6418242686bf0441a78ee8a1|1bbbd5de-7a84-31a0-5c52-333787b4573b", appliesTo: "ELEMENT", styleBlockIds: [] }],
          config: { loop: false, playInReverse: false, scrollOffsetValue: 0, scrollOffsetUnit: "%", delay: 100, direction: "TOP", effectIn: true },
          createdOn: 1676467065506,
      },
  },
  actionLists: {
      "a-2": {
          id: "a-2",
          title: "Hover Hero",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-2-n-2",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-2-n", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, value: "none" } },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-2-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, xValue: 1, yValue: 1, locked: true },
                      },
                      { id: "a-2-n-4", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, value: "flex" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-3": {
          id: "a-3",
          title: "Hover Hero Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-3-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-3-n-4", actionTypeId: "GENERAL_DISPLAY", config: { delay: 500, easing: "", duration: 0, target: { selector: ".hover-hero", selectorGuids: ["64a0a26f-1a92-0a4e-149e-9f23b31a8765"] }, value: "none" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      a: {
          id: "a",
          title: "Cursor",
          continuousParameterGroups: [
              {
                  id: "a-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".cursor", selectorGuids: ["60b94180-2d19-e8bb-d404-a4dfbaeacc05"] },
                                      xValue: -50,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".cursor", selectorGuids: ["60b94180-2d19-e8bb-d404-a4dfbaeacc05"] },
                                      xValue: 50,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".cursor", selectorGuids: ["60b94180-2d19-e8bb-d404-a4dfbaeacc05"] },
                                      yValue: -50,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".cursor", selectorGuids: ["60b94180-2d19-e8bb-d404-a4dfbaeacc05"] },
                                      yValue: 50,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676549737416,
      },
      "a-5": {
          id: "a-5",
          title: "The Agency Image Scale on View",
          continuousParameterGroups: [
              {
                  id: "a-5-p",
                  type: "SCROLL_PROGRESS",
                  parameterLabel: "Scroll",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-5-n",
                                  actionTypeId: "TRANSFORM_SCALE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".the-agency-image", selectorGuids: ["3be80136-227a-d8ee-89bc-4bf6a5d3e1cc"] },
                                      xValue: 0.8,
                                      yValue: 0.8,
                                      locked: true,
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 49,
                          actionItems: [
                              {
                                  id: "a-5-n-2",
                                  actionTypeId: "TRANSFORM_SCALE",
                                  config: {
                                      delay: 0,
                                      easing: "outQuart",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".the-agency-image", selectorGuids: ["3be80136-227a-d8ee-89bc-4bf6a5d3e1cc"] },
                                      xValue: 1,
                                      yValue: 1,
                                      locked: true,
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676627086894,
      },
      "a-6": {
          id: "a-6",
          title: "Hover Agency Green",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-6-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-6-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, value: "none" } },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-6-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, xValue: 1, yValue: 1, locked: true },
                      },
                      { id: "a-6-n-4", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, value: "flex" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-7": {
          id: "a-7",
          title: "Hover Agency Green Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-7-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      {
                          id: "a-7-n-2",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 500, easing: "", duration: 0, target: { selector: ".hover-agency-green", selectorGuids: ["3d55cfd9-50b0-40e3-d1cb-bc636de7fcdb"] }, value: "none" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      "a-11": {
          id: "a-11",
          title: "Expertise Text Opacity",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-11-n",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".paragraph-20px", selectorGuids: ["4f58a6e5-fc56-0fed-f9c0-3e00c5a5dd77"] }, value: 0.7, unit: "" },
                      },
                      {
                          id: "a-11-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                      {
                          id: "a-11-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] }, value: 0, unit: "" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-11-n-5",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                              xValue: 1,
                              yValue: 1,
                              locked: true,
                          },
                      },
                      {
                          id: "a-11-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-11-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".paragraph-20px", selectorGuids: ["4f58a6e5-fc56-0fed-f9c0-3e00c5a5dd77"] }, value: 1, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676629280877,
      },
      "a-12": {
          id: "a-12",
          title: "Expertise Text Opacity Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-12-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                      {
                          id: "a-12-n-5",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-12-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".paragraph-20px", selectorGuids: ["4f58a6e5-fc56-0fed-f9c0-3e00c5a5dd77"] }, value: 0.7, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676629280877,
      },
      "a-13": {
          id: "a-13",
          title: "Expertise Arrow Move",
          continuousParameterGroups: [
              {
                  id: "a-13-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-13-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                                      xValue: 0,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                              {
                                  id: "a-13-n-5",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-arrow", selectorGuids: ["38f7a945-582d-cb09-1d08-38f6f5953ebe"] },
                                      xValue: 0,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-13-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                                      xValue: 15,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                              {
                                  id: "a-13-n-6",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-arrow", selectorGuids: ["38f7a945-582d-cb09-1d08-38f6f5953ebe"] },
                                      xValue: 15,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-13-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-13-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                                      yValue: 0,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                              {
                                  id: "a-13-n-7",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-arrow", selectorGuids: ["38f7a945-582d-cb09-1d08-38f6f5953ebe"] },
                                      yValue: 0,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-13-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-circle", selectorGuids: ["3a0aeadc-a9d0-b9b0-b811-b7dfc3ed7a5c"] },
                                      yValue: 15,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                              {
                                  id: "a-13-n-8",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-arrow", selectorGuids: ["38f7a945-582d-cb09-1d08-38f6f5953ebe"] },
                                      yValue: 15,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676629465615,
      },
      "a-14": {
          id: "a-14",
          title: "Hover Stories",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-14-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-14-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, value: "none" } },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-14-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, xValue: 1, yValue: 1, locked: true },
                      },
                      { id: "a-14-n-4", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, value: "flex" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-15": {
          id: "a-15",
          title: "Hover Stories Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-15-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-15-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 500, easing: "", duration: 0, target: { selector: ".hover-stories", selectorGuids: ["481e0336-12bd-e6a5-8936-5cedbc419d3e"] }, value: "none" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      "a-16": {
          id: "a-16",
          title: "Blog Stories Show Image",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-16-n",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-16-n-5",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-line", selectorGuids: ["1a9e5c0d-3002-b707-9579-7fff2f0afbb8"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 0.2,
                          },
                      },
                      {
                          id: "a-16-n-2",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-16-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-16-n-6",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-line", selectorGuids: ["1a9e5c0d-3002-b707-9579-7fff2f0afbb8"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 1,
                          },
                      },
                      {
                          id: "a-16-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                              xValue: 1,
                              yValue: 1,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676630731948,
      },
      "a-17": {
          id: "a-17",
          title: "Blog Stories Show Image Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-17-n-4",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-17-n-5",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-line", selectorGuids: ["1a9e5c0d-3002-b707-9579-7fff2f0afbb8"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 0.2,
                          },
                      },
                      {
                          id: "a-17-n-6",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676630731948,
      },
      "a-18": {
          id: "a-18",
          title: "Blog Stories Image",
          continuousParameterGroups: [
              {
                  id: "a-18-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-18-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                                      xValue: 0,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-18-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                                      xValue: 100,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-18-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-18-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                                      yValue: 0,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-18-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-stories-image", selectorGuids: ["ccad6f11-b162-0b1a-ab78-c7fd41141eb7"] },
                                      yValue: 50,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676631004785,
      },
      "a-9": {
          id: "a-9",
          title: "Expertise Show Image",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-9-n",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-9-n-2",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-9-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-9-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                              xValue: 1,
                              yValue: 1,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676628715728,
      },
      "a-10": {
          id: "a-10",
          title: "Expertise Show Image Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-10-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-10-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676628715728,
      },
      "a-19": {
          id: "a-19",
          title: "Events Text Slide In",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-19-n",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".events-shadow", selectorGuids: ["9cff21ab-9ca3-84d1-7a79-bb8190e064da"] },
                              yValue: 100,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-7",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".events-heading", selectorGuids: ["e86141d8-2e28-b2a1-a499-6f839f5c8507"] },
                              yValue: 230,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".events-paragraph", selectorGuids: ["ce596e9c-2497-268a-43e4-e3529c579cf5"] },
                              yValue: 310,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-3",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".events-inner", selectorGuids: ["527ed2df-53cd-8964-859d-4ff5f6828005"] },
                              yValue: 141,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-19-n-2",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-shadow", selectorGuids: ["9cff21ab-9ca3-84d1-7a79-bb8190e064da"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-8",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-heading", selectorGuids: ["e86141d8-2e28-b2a1-a499-6f839f5c8507"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 100,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-paragraph", selectorGuids: ["ce596e9c-2497-268a-43e4-e3529c579cf5"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-19-n-4",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 200,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-inner", selectorGuids: ["527ed2df-53cd-8964-859d-4ff5f6828005"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676637130291,
      },
      "a-20": {
          id: "a-20",
          title: "Events Text Slide In out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-20-n-8",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-inner", selectorGuids: ["527ed2df-53cd-8964-859d-4ff5f6828005"] },
                              yValue: 190,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-20-n-7",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-paragraph", selectorGuids: ["ce596e9c-2497-268a-43e4-e3529c579cf5"] },
                              yValue: 310,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-20-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-heading", selectorGuids: ["e86141d8-2e28-b2a1-a499-6f839f5c8507"] },
                              yValue: 230,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-20-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { useEventTarget: "CHILDREN", selector: ".events-shadow", selectorGuids: ["9cff21ab-9ca3-84d1-7a79-bb8190e064da"] },
                              yValue: 100,
                              xUnit: "PX",
                              yUnit: "%",
                              zUnit: "PX",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676637130291,
      },
      "a-21": {
          id: "a-21",
          title: "CTA Line Scale Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-21-n-3",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".cta-line", selectorGuids: ["b39ef260-4939-c178-229c-5168b28fca7f"] },
                              widthValue: 100,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-21-n-4",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".cta-line", selectorGuids: ["b39ef260-4939-c178-229c-5168b28fca7f"] },
                              widthValue: 0,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676638538456,
      },
      "a-22": {
          id: "a-22",
          title: "CTA Line Scale In",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-22-n",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".cta-line", selectorGuids: ["b39ef260-4939-c178-229c-5168b28fca7f"] },
                              widthValue: 100,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676638538456,
      },
      "a-23": {
          id: "a-23",
          title: "Hover Events",
          actionItemGroups: [
              {
                  actionItems: [
                      { id: "a-23-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] }, value: "none" } },
                      {
                          id: "a-23-n-5",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] },
                              widthValue: 0,
                              heightValue: 0,
                              widthUnit: "px",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      { id: "a-23-n-4", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] }, value: "flex" } },
                      {
                          id: "a-23-n-6",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] },
                              widthValue: 52,
                              heightValue: 52,
                              widthUnit: "px",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-24": {
          id: "a-24",
          title: "Hover Events Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-24-n-3",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 0,
                              target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] },
                              widthValue: 0,
                              heightValue: 0,
                              widthUnit: "px",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                      { id: "a-24-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 10, easing: "", duration: 0, target: { selector: ".hover-evenrs", selectorGuids: ["545aad4d-a329-645e-1dd4-0dc0918647d7"] }, value: "none" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      "a-8": {
          id: "a-8",
          title: "Expertise Image",
          continuousParameterGroups: [
              {
                  id: "a-8-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-8-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                                      xValue: 0,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-8-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                                      xValue: 100,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-8-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-8-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                                      yValue: 0,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-8-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".expertise-image", selectorGuids: ["8391936d-ae66-da19-8cd5-ceebe38448aa"] },
                                      yValue: 15,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676628562939,
      },
      "a-29": {
          id: "a-29",
          title: "Menu Show Image",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-29-n",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                              heightValue: 0,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-29-n-2",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                              heightValue: 414,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676972631996,
      },
      "a-30": {
          id: "a-30",
          title: "Menu Show Image Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-30-n-2",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                              heightValue: 0,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676972631996,
      },
      "a-31": {
          id: "a-31",
          title: "Menu Image",
          continuousParameterGroups: [
              {
                  id: "a-31-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-31-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                                      xValue: -50,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-31-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                                      xValue: 50,
                                      xUnit: "%",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-31-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-31-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                                      yValue: 0,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-31-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".menu-link-image", selectorGuids: ["57c2c4fd-c744-50bd-aec7-8259465b38bc"] },
                                      yValue: 15,
                                      xUnit: "PX",
                                      yUnit: "%",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1676973932490,
      },
      "a-50": {
          id: "a-50",
          title: "[About] Team Description 2",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-50-n",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".vertical._2", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "a631f731-353b-8d29-56bc-55f44ea40d5a"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-50-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-50-n-3",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-50-n-4",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-50-n-5",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                      {
                          id: "a-50-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-50-n-7",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] },
                              xValue: 110,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-50-n-8",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] }, value: "flex" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-50-n-9",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { selector: ".vertical._2", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "a631f731-353b-8d29-56bc-55f44ea40d5a"] },
                              zValue: 0,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-50-n-10",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-50-n-11",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "flex" },
                      },
                      {
                          id: "a-50-n-12",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] }, value: "flex" },
                      },
                      {
                          id: "a-50-n-13",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] },
                              xValue: 0,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-50-n-14",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-50-n-15",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 0, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-50-n-16",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 1, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1663275064224,
      },
      "a-51": {
          id: "a-51",
          title: "[About] Team Description 3",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-51-n",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".vertical._3", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "5431b35c-5dec-4007-4f35-f7931cd656a3"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-51-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-51-n-3",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-51-n-4",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-51-n-5",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                      {
                          id: "a-51-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-51-n-7",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] },
                              xValue: 110,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-51-n-8",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] }, value: "flex" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-51-n-9",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".vertical._3", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "5431b35c-5dec-4007-4f35-f7931cd656a3"] },
                              zValue: 0,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-51-n-10",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-51-n-11",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "flex" },
                      },
                      {
                          id: "a-51-n-12",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] }, value: "flex" },
                      },
                      {
                          id: "a-51-n-13",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] },
                              xValue: 0,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-51-n-14",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-51-n-15",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 0, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-51-n-16",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 1, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1663275064224,
      },
      "a-40": {
          id: "a-40",
          title: "[About] Hover Cursor Image",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-40-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      {
                          id: "a-40-n-2",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, value: "none" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-40-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, xValue: 1, yValue: 1, locked: true },
                      },
                      {
                          id: "a-40-n-4",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, value: "flex" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1677148779572,
      },
      "a-41": {
          id: "a-41",
          title: "[About] Hover Cursor Image Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-41-n-3",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      {
                          id: "a-41-n-4",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 500, easing: "", duration: 0, target: { selector: ".hover-about-absolute", selectorGuids: ["349eb201-06b6-372c-8679-09fdd18a6a21"] }, value: "none" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1677148779572,
      },
      "a-42": {
          id: "a-42",
          title: "[About] Introduction Line Size Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-42-n",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".introduction-about-line", selectorGuids: ["da5e8313-1fdd-4bb3-fd57-06f98a0da1a4"] },
                              widthValue: 100,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-42-n-2",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".introduction-about-line", selectorGuids: ["da5e8313-1fdd-4bb3-fd57-06f98a0da1a4"] },
                              widthValue: 0,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1677149010910,
      },
      "a-43": {
          id: "a-43",
          title: "[About] Introduction Line Size In",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-43-n-2",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".introduction-about-line", selectorGuids: ["da5e8313-1fdd-4bb3-fd57-06f98a0da1a4"] },
                              widthValue: 100,
                              widthUnit: "%",
                              heightUnit: "PX",
                              locked: false,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1677149010910,
      },
      "a-44": {
          id: "a-44",
          title: "[About] Image Rotate",
          continuousParameterGroups: [
              {
                  id: "a-44-p",
                  type: "SCROLL_PROGRESS",
                  parameterLabel: "Scroll",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-44-n",
                                  actionTypeId: "TRANSFORM_ROTATE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".parteners-image", selectorGuids: ["b2c3f9b8-7ee4-9c1c-26fe-3e146efb09c5"] },
                                      zValue: 0,
                                      xUnit: "DEG",
                                      yUnit: "DEG",
                                      zUnit: "deg",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-44-n-2",
                                  actionTypeId: "TRANSFORM_ROTATE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".parteners-image", selectorGuids: ["b2c3f9b8-7ee4-9c1c-26fe-3e146efb09c5"] },
                                      zValue: 360,
                                      xUnit: "DEG",
                                      yUnit: "DEG",
                                      zUnit: "deg",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1677151523178,
      },
      "a-34": {
          id: "a-34",
          title: "[About] Team Description",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-34-n",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".vertical._1", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "76bba012-c695-6dea-0489-f5e0742fb2c1"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-34-n-17",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-34-n-15",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-34-n-12",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-34-n-11",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                      {
                          id: "a-34-n-7",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-34-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] },
                              xValue: 110,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-34-n-5",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] }, value: "flex" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-34-n-4",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { selector: ".vertical._1", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "76bba012-c695-6dea-0489-f5e0742fb2c1"] },
                              zValue: 0,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-34-n-14",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-34-n-13",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "flex" },
                      },
                      {
                          id: "a-34-n-10",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] }, value: "flex" },
                      },
                      {
                          id: "a-34-n-9",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] },
                              xValue: 0,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-34-n-8",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-34-n-16",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 0, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-34-n-18",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 1, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1663275064224,
      },
      "a-45": {
          id: "a-45",
          title: "[About] Team Description Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-45-n-13",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] },
                              xValue: 140,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-45-n-14",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 200,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-45-n-10",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 500, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-45-n-9",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 500,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { selector: ".vertical._1", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "76bba012-c695-6dea-0489-f5e0742fb2c1"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-45-n-15",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-45-n-16",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-45-n-12",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".team-description._1", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "1a66a7c1-c2fb-909f-a195-c522b7bd0796"] }, value: "none" },
                      },
                      {
                          id: "a-45-n-11",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1663275064224,
      },
      "a-46": {
          id: "a-46",
          title: "[About] Open Button",
          continuousParameterGroups: [
              {
                  id: "a-46-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-46-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".open-description", selectorGuids: ["90baf491-d661-dbb7-e773-f29465753289"] },
                                      xValue: 0.5,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-46-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".open-description", selectorGuids: ["90baf491-d661-dbb7-e773-f29465753289"] },
                                      xValue: -0.5,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-46-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-46-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".open-description", selectorGuids: ["90baf491-d661-dbb7-e773-f29465753289"] },
                                      yValue: 1,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-46-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".open-description", selectorGuids: ["90baf491-d661-dbb7-e773-f29465753289"] },
                                      yValue: -1,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1677233706076,
      },
      "a-47": {
          id: "a-47",
          title: "[About] Close Button",
          continuousParameterGroups: [
              {
                  id: "a-47-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-47-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] },
                                      xValue: 0.5,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-47-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] },
                                      xValue: -0.5,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-47-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-47-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] },
                                      yValue: 0.5,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-47-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] },
                                      yValue: -0.5,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1677233897242,
      },
      "a-49": {
          id: "a-49",
          title: "[About] Team Description 2 Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-49-n",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] },
                              xValue: 140,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-49-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 200,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-49-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 500, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-49-n-4",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 500,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { selector: ".vertical._2", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "a631f731-353b-8d29-56bc-55f44ea40d5a"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-49-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-49-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-49-n-7",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".team-description._2", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "75d8ac76-dd3f-d8e9-d7cd-42e3337d2583"] }, value: "none" },
                      },
                      {
                          id: "a-49-n-8",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1663275064224,
      },
      "a-52": {
          id: "a-52",
          title: "[About] Team Description 3 Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-52-n",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] },
                              xValue: 140,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-52-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 200,
                              easing: "outQuart",
                              duration: 800,
                              target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-52-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 500, easing: "outQuart", duration: 500, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-52-n-4",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 500,
                              easing: [0.645, 0.045, 0.355, 1],
                              duration: 500,
                              target: { selector: ".vertical._3", selectorGuids: ["90baf491-d661-dbb7-e773-f2946575327d", "5431b35c-5dec-4007-4f35-f7931cd656a3"] },
                              zValue: 90,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                      {
                          id: "a-52-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 800, easing: "outQuart", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, xValue: 120, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-52-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 800, easing: "", duration: 500, target: { selector: ".close-description", selectorGuids: ["30fe1580-bafc-0f80-4498-2295a3ba86d7"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-52-n-7",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".team-description._3", selectorGuids: ["6fb00100-bf92-7fee-33a6-0523debce94a", "2ad86364-1a13-7f27-8eb5-d8ffbdff8c89"] }, value: "none" },
                      },
                      {
                          id: "a-52-n-8",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 800, easing: "", duration: 0, target: { selector: ".bg-team-description", selectorGuids: ["d775a030-cc13-6463-fef2-c2bf29ec61cd"] }, value: "none" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1663275064224,
      },
      "a-53": {
          id: "a-53",
          title: "[Services] Contact Hover",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-53-n",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-line", selectorGuids: ["2f2358c3-4ed6-c351-8830-b65b5ce5dfd4"] },
                              xValue: -101,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-53-n-2",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-arrow", selectorGuids: ["f2166a0f-50cd-c83a-8139-144d2df0305b"] },
                              zValue: 0,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-53-n-3",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 700,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-line", selectorGuids: ["2f2358c3-4ed6-c351-8830-b65b5ce5dfd4"] },
                              xValue: 0,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-53-n-4",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-arrow", selectorGuids: ["f2166a0f-50cd-c83a-8139-144d2df0305b"] },
                              zValue: 45,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1677578659005,
      },
      "a-54": {
          id: "a-54",
          title: "[Services] Contact Hover Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-54-n-3",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 700,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-line", selectorGuids: ["2f2358c3-4ed6-c351-8830-b65b5ce5dfd4"] },
                              xValue: -101,
                              xUnit: "%",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-54-n-4",
                          actionTypeId: "TRANSFORM_ROTATE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 700,
                              target: { useEventTarget: "CHILDREN", selector: ".contact-arrow", selectorGuids: ["f2166a0f-50cd-c83a-8139-144d2df0305b"] },
                              zValue: 0,
                              xUnit: "DEG",
                              yUnit: "DEG",
                              zUnit: "deg",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1677578659005,
      },
      "a-57": {
          id: "a-57",
          title: "Hover Projects",
          actionItemGroups: [
              {
                  actionItems: [
                      { id: "a-57-n", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, value: "none" } },
                      {
                          id: "a-57-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, xValue: 0, yValue: 0, locked: true },
                      },
                  ],
              },
              {
                  actionItems: [
                      { id: "a-57-n-3", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, value: "flex" } },
                      {
                          id: "a-57-n-5",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, xValue: 1, yValue: 1, locked: true },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-58": {
          id: "a-58",
          title: "Hover Projects Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-58-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, xValue: 0, yValue: 0, locked: true },
                      },
                      { id: "a-58-n-3", actionTypeId: "GENERAL_DISPLAY", config: { delay: 500, easing: "", duration: 0, target: { selector: ".hover-project", selectorGuids: ["87bd2612-65ef-e033-bbee-97ffa715ebe0"] }, value: "flex" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      "a-60": {
          id: "a-60",
          title: "Hover Project Page",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-60-n",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] }, value: "none" },
                      },
                      {
                          id: "a-60-n-2",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                              xValue: 0,
                              yValue: 0,
                              locked: true,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-60-n-3",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 0, easing: "", duration: 0, target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] }, value: "flex" },
                      },
                      {
                          id: "a-60-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                              xValue: 1,
                              yValue: 1,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676549832276,
      },
      "a-61": {
          id: "a-61",
          title: "Hover Projects Page Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-61-n",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                              xValue: 0,
                              yValue: 0,
                              locked: true,
                          },
                      },
                      {
                          id: "a-61-n-2",
                          actionTypeId: "GENERAL_DISPLAY",
                          config: { delay: 500, easing: "", duration: 0, target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] }, value: "flex" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676549832276,
      },
      "a-66": {
          id: "a-66",
          title: "[Careers] Arrow Turn White",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-66-n",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".careers-arrow-absolute", selectorGuids: ["01346fba-8a17-3502-a1e6-2ddbf3e7c40f"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-66-n-3",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".careers-line", selectorGuids: ["789d82db-eabf-64f3-c23d-2119eaab54a5"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 0.3,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-66-n-2",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".careers-arrow-absolute", selectorGuids: ["01346fba-8a17-3502-a1e6-2ddbf3e7c40f"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-66-n-4",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".careers-line", selectorGuids: ["789d82db-eabf-64f3-c23d-2119eaab54a5"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 1,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1678107441373,
      },
      "a-67": {
          id: "a-67",
          title: "[Careers] Arrow Turn White Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-67-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".careers-arrow-absolute", selectorGuids: ["01346fba-8a17-3502-a1e6-2ddbf3e7c40f"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-67-n-4",
                          actionTypeId: "STYLE_BACKGROUND_COLOR",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".careers-line", selectorGuids: ["789d82db-eabf-64f3-c23d-2119eaab54a5"] },
                              globalSwatchId: "",
                              rValue: 255,
                              bValue: 255,
                              gValue: 255,
                              aValue: 0.3,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1678107441373,
      },
      "a-68": {
          id: "a-68",
          title: "[Careers CMS] Form Slide In",
          actionItemGroups: [
              {
                  actionItems: [
                      { id: "a-68-n", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: "none" } },
                      { id: "a-68-n-2", actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "", duration: 500, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: 0, unit: "" } },
                      { id: "a-68-n-3", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, value: "none" } },
                      {
                          id: "a-68-n-4",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, xValue: 101, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                  ],
              },
              {
                  actionItems: [
                      { id: "a-68-n-5", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: "flex" } },
                      {
                          id: "a-68-n-8",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "outQuart", duration: 1000, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, xValue: 0, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      { id: "a-68-n-7", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, value: "flex" } },
                      {
                          id: "a-68-n-6",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: 1, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1678191072873,
      },
      "a-69": {
          id: "a-69",
          title: "[Careers Cms] Form Button",
          continuousParameterGroups: [
              {
                  id: "a-69-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-69-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: true, id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864" }, xValue: -3, xUnit: "px", yUnit: "PX", zUnit: "PX" },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-69-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: true, id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864" }, xValue: 3, xUnit: "px", yUnit: "PX", zUnit: "PX" },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-69-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-69-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: true, id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864" }, yValue: -3, xUnit: "PX", yUnit: "px", zUnit: "PX" },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-69-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: true, id: "6418242686bf04096d8ee89e|4c2d68bc-112d-8a5f-8958-b3f7fc075864" }, yValue: 3, xUnit: "PX", yUnit: "px", zUnit: "PX" },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1678191357984,
      },
      "a-70": {
          id: "a-70",
          title: "[Careers CMS] Form Slide Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-70-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "outQuart", duration: 1000, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, xValue: 101, xUnit: "%", yUnit: "PX", zUnit: "PX" },
                      },
                      {
                          id: "a-70-n-8",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 500, easing: "outQuart", duration: 500, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: 0, unit: "" },
                      },
                      { id: "a-70-n-7", actionTypeId: "GENERAL_DISPLAY", config: { delay: 1000, easing: "", duration: 0, target: { selector: ".form-block", selectorGuids: ["17139fec-ad73-6210-5826-f2886856a595"] }, value: "none" } },
                      { id: "a-70-n-5", actionTypeId: "GENERAL_DISPLAY", config: { delay: 1000, easing: "", duration: 0, target: { selector: ".mask-job", selectorGuids: ["5cbe2f76-8560-9f18-0454-28bb4c222c46"] }, value: "none" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1678191072873,
      },
      "a-71": {
          id: "a-71",
          title: "[Blog] Show Image",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-71-n",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-71-n-2",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-71-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-71-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                              xValue: 1,
                              yValue: 1,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1678196175754,
      },
      "a-75": {
          id: "a-75",
          title: "[Blog] Show Image Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-75-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-75-n-4",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                              xValue: 0.8,
                              yValue: 0.8,
                              locked: true,
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1678196175754,
      },
      "a-25": {
          id: "a-25",
          title: "Menu Open",
          actionItemGroups: [
              {
                  actionItems: [
                      { id: "a-25-n", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: "none" } },
                      {
                          id: "a-25-n-41",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-grid-content._5", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "e62dc2d2-5fc9-e7ec-dc91-e8e324f484ce"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-39",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-grid-content._4", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "b71ac080-01f6-dfc5-b5aa-cbe074642f93"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-37",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-grid-content._3", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "555e4dc8-770e-0ed3-a9f6-4a1d5f5182cd"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-35",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-grid-content._2", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "9bcd5c5d-cc7a-f434-229b-38a5a43d9255"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-33",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-grid-content._1", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "360f7cec-7574-7fa7-ce56-2bc2d853c171"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-15",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-13",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-11",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-image", selectorGuids: ["575c0c8d-2696-2222-43f7-272cfa088f95"] }, xValue: 1.3, yValue: 1.3, locked: true },
                      },
                      { id: "a-25-n-9", actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: 0, unit: "" } },
                      {
                          id: "a-25-n-17",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-18",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-21",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-22",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-25",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-26",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-29",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] }, value: 0, unit: "" },
                      },
                      {
                          id: "a-25-n-30",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                  ],
              },
              {
                  actionItems: [
                      { id: "a-25-n-2", actionTypeId: "GENERAL_DISPLAY", config: { delay: 0, easing: "", duration: 0, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: "flex" } },
                      {
                          id: "a-25-n-12",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 1500, target: { selector: ".menu-image", selectorGuids: ["575c0c8d-2696-2222-43f7-272cfa088f95"] }, xValue: 1, yValue: 1, locked: true },
                      },
                      { id: "a-25-n-10", actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 500, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: 1, unit: "" } },
                      {
                          id: "a-25-n-14",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 300,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-34",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 300,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._1", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "360f7cec-7574-7fa7-ce56-2bc2d853c171"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-16",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 300,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-19",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 400,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-36",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 400,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._2", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "9bcd5c5d-cc7a-f434-229b-38a5a43d9255"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-20",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 400,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-23",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 500,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-38",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 500,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._3", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "555e4dc8-770e-0ed3-a9f6-4a1d5f5182cd"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-24",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 500,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-27",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 600,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-40",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 600,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._4", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "b71ac080-01f6-dfc5-b5aa-cbe074642f93"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-28",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 600,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-31",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 700,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] },
                              yValue: 0,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-25-n-42",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 700,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._5", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "e62dc2d2-5fc9-e7ec-dc91-e8e324f484ce"] },
                              value: 1,
                              unit: "",
                          },
                      },
                      {
                          id: "a-25-n-32",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 700,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] },
                              value: 1,
                              unit: "",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676899969223,
      },
      "a-26": {
          id: "a-26",
          title: "Menu Close",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-26-n-20",
                          actionTypeId: "TRANSFORM_SCALE",
                          config: { delay: 0, easing: "outQuart", duration: 1500, target: { selector: ".menu-image", selectorGuids: ["575c0c8d-2696-2222-43f7-272cfa088f95"] }, xValue: 1.5, yValue: 1.5, locked: true },
                      },
                      {
                          id: "a-26-n-23",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._1", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "360f7cec-7574-7fa7-ce56-2bc2d853c171"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-22",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-26-n-24",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._1", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "7c37fd13-94ce-61cf-bafd-ddc1fd7ebd81"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-25",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-26-n-26",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._2", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "9bcd5c5d-cc7a-f434-229b-38a5a43d9255"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-27",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._2", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "1e6ad98b-2fcd-69fd-4089-4673e8b29715"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-28",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-26-n-29",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._3", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "555e4dc8-770e-0ed3-a9f6-4a1d5f5182cd"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-30",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._3", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "54ea7d97-c7ec-0dc0-f80b-708e65d12025"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-31",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-26-n-32",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._4", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "b71ac080-01f6-dfc5-b5aa-cbe074642f93"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-33",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._4", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "cebae6b7-b3d0-b445-0297-93fa74fe3791"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-34",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] },
                              yValue: 20,
                              xUnit: "PX",
                              yUnit: "px",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-26-n-35",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 500,
                              target: { selector: ".menu-grid-content._5", selectorGuids: ["d80763d0-1553-7243-9e38-eb1608ec8f00", "e62dc2d2-5fc9-e7ec-dc91-e8e324f484ce"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-36",
                          actionTypeId: "STYLE_OPACITY",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { selector: ".menu-link-wrapper._5", selectorGuids: ["a8ac5219-b0fc-84c2-1ed8-5d069c97ee99", "be998689-6c2f-4302-0b70-ccbc128ef649"] },
                              value: 0,
                              unit: "",
                          },
                      },
                      {
                          id: "a-26-n-21",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 300, easing: "outQuart", duration: 500, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: 0, unit: "" },
                      },
                      { id: "a-26-n-19", actionTypeId: "GENERAL_DISPLAY", config: { delay: 800, easing: "", duration: 0, target: { selector: ".menu", selectorGuids: ["b035f5d6-e818-a7cf-826a-a6ef9352b7ec"] }, value: "none" } },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676899969223,
      },
      "a-27": {
          id: "a-27",
          title: "Hover Menu Button",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-27-n",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] },
                              xValue: 0,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-27-n-7",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              heightValue: 42,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                      {
                          id: "a-27-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "",
                              duration: 500,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              xValue: 0,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-27-n-3",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "", duration: 500, target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] }, value: 1, unit: "" },
                      },
                  ],
              },
              {
                  actionItems: [
                      {
                          id: "a-27-n-2",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] },
                              xValue: 5.5,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-27-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              xValue: -5.5,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-27-n-8",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 10,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              heightValue: 84,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                      {
                          id: "a-27-n-4",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 10, easing: "outQuart", duration: 300, target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] }, value: 0, unit: "" },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: true,
          createdOn: 1676902571277,
      },
      "a-28": {
          id: "a-28",
          title: "Hover Menu Button Out",
          actionItemGroups: [
              {
                  actionItems: [
                      {
                          id: "a-28-n-7",
                          actionTypeId: "STYLE_OPACITY",
                          config: { delay: 0, easing: "outQuart", duration: 300, target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] }, value: 1, unit: "" },
                      },
                      {
                          id: "a-28-n-8",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                              delay: 0,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              heightValue: 42,
                              widthUnit: "PX",
                              heightUnit: "px",
                              locked: false,
                          },
                      },
                      {
                          id: "a-28-n-6",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 10,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-2-menu-button", selectorGuids: ["49099268-f713-3a32-a12c-43731ce634bc"] },
                              xValue: 0,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                      {
                          id: "a-28-n-5",
                          actionTypeId: "TRANSFORM_MOVE",
                          config: {
                              delay: 10,
                              easing: "outQuart",
                              duration: 300,
                              target: { useEventTarget: "CHILDREN", selector: ".line-1-menu-button", selectorGuids: ["608e6271-0e83-0119-f199-e8f238e93039"] },
                              xValue: 0,
                              xUnit: "px",
                              yUnit: "PX",
                              zUnit: "PX",
                          },
                      },
                  ],
              },
          ],
          useFirstGroupAsInitialState: false,
          createdOn: 1676902571277,
      },
      "a-76": {
          id: "a-76",
          title: "[Blog] Image",
          continuousParameterGroups: [
              {
                  id: "a-76-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-76-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                                      xValue: -50,
                                      xUnit: "px",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-76-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                                      xValue: 50,
                                      xUnit: "px",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-76-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-76-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                                      xValue: null,
                                      yValue: -20,
                                      xUnit: "px",
                                      yUnit: "px",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-76-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".blog-image-wrapper", selectorGuids: ["dfc97b8c-42e3-2636-8742-74198ba21075"] },
                                      xValue: null,
                                      yValue: 20,
                                      xUnit: "px",
                                      yUnit: "px",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1678269249200,
      },
      "a-59": {
          id: "a-59",
          title: "[Project] Hover Next Project",
          continuousParameterGroups: [
              {
                  id: "a-59-p",
                  type: "MOUSE_X",
                  parameterLabel: "Mouse X",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-59-n",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                                      xValue: -50,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-59-n-2",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                                      xValue: 50,
                                      xUnit: "vw",
                                      yUnit: "PX",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
              {
                  id: "a-59-p-2",
                  type: "MOUSE_Y",
                  parameterLabel: "Mouse Y",
                  continuousActionGroups: [
                      {
                          keyframe: 0,
                          actionItems: [
                              {
                                  id: "a-59-n-3",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                                      yValue: -40,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                      {
                          keyframe: 100,
                          actionItems: [
                              {
                                  id: "a-59-n-4",
                                  actionTypeId: "TRANSFORM_MOVE",
                                  config: {
                                      delay: 0,
                                      easing: "",
                                      duration: 500,
                                      target: { useEventTarget: "CHILDREN", selector: ".next-project-button", selectorGuids: ["b137c0fc-471b-3a2b-3a8c-0eb1af397b07"] },
                                      yValue: 40,
                                      xUnit: "PX",
                                      yUnit: "vh",
                                      zUnit: "PX",
                                  },
                              },
                          ],
                      },
                  ],
              },
          ],
          createdOn: 1677680920319,
      },
      slideInBottom: {
          id: "slideInBottom",
          useFirstGroupAsInitialState: true,
          actionItemGroups: [
              { actionItems: [{ actionTypeId: "STYLE_OPACITY", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 0 } }] },
              {
                  actionItems: [
                      { actionTypeId: "TRANSFORM_MOVE", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: 100, xUnit: "PX", yUnit: "PX", zUnit: "PX" } },
                  ],
              },
              {
                  actionItems: [
                      {
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: 0, xUnit: "PX", yUnit: "PX", zUnit: "PX" },
                      },
                      { actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 1 } },
                  ],
              },
          ],
      },
      slideInLeft: {
          id: "slideInLeft",
          useFirstGroupAsInitialState: true,
          actionItemGroups: [
              { actionItems: [{ actionTypeId: "STYLE_OPACITY", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 0 } }] },
              {
                  actionItems: [
                      { actionTypeId: "TRANSFORM_MOVE", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: -100, yValue: 0, xUnit: "PX", yUnit: "PX", zUnit: "PX" } },
                  ],
              },
              {
                  actionItems: [
                      { actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 1 } },
                      {
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: 0, xUnit: "PX", yUnit: "PX", zUnit: "PX" },
                      },
                  ],
              },
          ],
      },
      growIn: {
          id: "growIn",
          useFirstGroupAsInitialState: true,
          actionItemGroups: [
              { actionItems: [{ actionTypeId: "STYLE_OPACITY", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 0 } }] },
              { actionItems: [{ actionTypeId: "TRANSFORM_SCALE", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0.7500000000000001, yValue: 0.7500000000000001 } }] },
              {
                  actionItems: [
                      { actionTypeId: "TRANSFORM_SCALE", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 1, yValue: 1 } },
                      { actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 1 } },
                  ],
              },
          ],
      },
      growBigIn: {
          id: "growBigIn",
          useFirstGroupAsInitialState: true,
          actionItemGroups: [
              { actionItems: [{ actionTypeId: "STYLE_OPACITY", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 0 } }] },
              { actionItems: [{ actionTypeId: "TRANSFORM_SCALE", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: 0 } }] },
              {
                  actionItems: [
                      { actionTypeId: "TRANSFORM_SCALE", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 1, yValue: 1 } },
                      { actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 1 } },
                  ],
              },
          ],
      },
      slideInTop: {
          id: "slideInTop",
          useFirstGroupAsInitialState: true,
          actionItemGroups: [
              { actionItems: [{ actionTypeId: "STYLE_OPACITY", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 0 } }] },
              {
                  actionItems: [
                      { actionTypeId: "TRANSFORM_MOVE", config: { delay: 0, duration: 0, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: -100, xUnit: "PX", yUnit: "PX", zUnit: "PX" } },
                  ],
              },
              {
                  actionItems: [
                      { actionTypeId: "STYLE_OPACITY", config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, value: 1 } },
                      {
                          actionTypeId: "TRANSFORM_MOVE",
                          config: { delay: 0, easing: "outQuart", duration: 1000, target: { id: "N/A", appliesTo: "TRIGGER_ELEMENT", useEventTarget: true }, xValue: 0, yValue: 0, xUnit: "PX", yUnit: "PX", zUnit: "PX" },
                      },
                  ],
              },
          ],
      },
  },
  site: {
      mediaQueries: [
          { key: "main", min: 992, max: 10000 },
          { key: "medium", min: 768, max: 991 },
          { key: "small", min: 480, max: 767 },
          { key: "tiny", min: 0, max: 479 },
      ],
  },
});