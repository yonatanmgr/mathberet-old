! function (t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n = e();
        for (var r in n)("object" == typeof exports ? exports : t)[r] = n[r]
    }
}(window, (function () {
    return function (t) {
        var e = {};

        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = t, n.c = e, n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var o in t) n.d(r, o, function (e) {
                    return t[e]
                }.bind(null, o));
            return r
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 1)
    }([function (t, e, n) {
        var r = function (t) {
            "use strict";
            var e = Object.prototype,
                n = e.hasOwnProperty,
                r = "function" == typeof Symbol ? Symbol : {},
                o = r.iterator || "@@iterator",
                i = r.asyncIterator || "@@asyncIterator",
                u = r.toStringTag || "@@toStringTag";

            function a(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e]
            }
            try {
                a({}, "")
            } catch (t) {
                a = function (t, e, n) {
                    return t[e] = n
                }
            }

            function c(t, e, n, r) {
                var o = e && e.prototype instanceof s ? e : s,
                    i = Object.create(o.prototype),
                    u = new O(r || []);
                return i._invoke = function (t, e, n) {
                    var r = "suspendedStart";
                    return function (o, i) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === o) throw i;
                            return _()
                        }
                        for (n.method = o, n.arg = i;;) {
                            var u = n.delegate;
                            if (u) {
                                var a = S(u, n);
                                if (a) {
                                    if (a === f) continue;
                                    return a
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var c = l(t, e, n);
                            if ("normal" === c.type) {
                                if (r = n.done ? "completed" : "suspendedYield", c.arg === f) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg)
                        }
                    }
                }(t, n, u), i
            }

            function l(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            t.wrap = c;
            var f = {};

            function s() {}

            function p() {}

            function y() {}
            var h = {};
            a(h, o, (function () {
                return this
            }));
            var g = Object.getPrototypeOf,
                m = g && g(g(T([])));
            m && m !== e && n.call(m, o) && (h = m);
            var b = y.prototype = s.prototype = Object.create(h);

            function v(t) {
                ["next", "throw", "return"].forEach((function (e) {
                    a(t, e, (function (t) {
                        return this._invoke(e, t)
                    }))
                }))
            }

            function d(t, e) {
                var r;
                this._invoke = function (o, i) {
                    function u() {
                        return new e((function (r, u) {
                            ! function r(o, i, u, a) {
                                var c = l(t[o], t, i);
                                if ("throw" !== c.type) {
                                    var f = c.arg,
                                        s = f.value;
                                    return s && "object" == typeof s && n.call(s, "__await") ? e.resolve(s.__await).then((function (t) {
                                        r("next", t, u, a)
                                    }), (function (t) {
                                        r("throw", t, u, a)
                                    })) : e.resolve(s).then((function (t) {
                                        f.value = t, u(f)
                                    }), (function (t) {
                                        return r("throw", t, u, a)
                                    }))
                                }
                                a(c.arg)
                            }(o, i, r, u)
                        }))
                    }
                    return r = r ? r.then(u, u) : u()
                }
            }

            function S(t, e) {
                var n = t.iterator[e.method];
                if (void 0 === n) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = void 0, S(t, e), "throw" === e.method)) return f;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return f
                }
                var r = l(n, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, f;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, f) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f)
            }

            function w(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function x(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function O(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(w, this), this.reset(!0)
            }

            function T(t) {
                if (t) {
                    var e = t[o];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            i = function e() {
                                for (; ++r < t.length;)
                                    if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
                                return e.value = void 0, e.done = !0, e
                            };
                        return i.next = i
                    }
                }
                return {
                    next: _
                }
            }

            function _() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return p.prototype = y, a(b, "constructor", y), a(y, "constructor", p), p.displayName = a(y, u, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name))
            }, t.mark = function (t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, a(t, u, "GeneratorFunction")), t.prototype = Object.create(b), t
            }, t.awrap = function (t) {
                return {
                    __await: t
                }
            }, v(d.prototype), a(d.prototype, i, (function () {
                return this
            })), t.AsyncIterator = d, t.async = function (e, n, r, o, i) {
                void 0 === i && (i = Promise);
                var u = new d(c(e, n, r, o), i);
                return t.isGeneratorFunction(n) ? u : u.next().then((function (t) {
                    return t.done ? t.value : u.next()
                }))
            }, v(b), a(b, u, "Generator"), a(b, o, (function () {
                return this
            })), a(b, "toString", (function () {
                return "[object Generator]"
            })), t.keys = function (t) {
                var e = [];
                for (var n in t) e.push(n);
                return e.reverse(),
                    function n() {
                        for (; e.length;) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
            }, t.values = T, O.prototype = {
                constructor: O,
                reset: function (t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(x), !t)
                        for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function () {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function (t) {
                    if (this.done) throw t;
                    var e = this;

                    function r(n, r) {
                        return u.type = "throw", u.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o],
                            u = i.completion;
                        if ("root" === i.tryLoc) return r("end");
                        if (i.tryLoc <= this.prev) {
                            var a = n.call(i, "catchLoc"),
                                c = n.call(i, "finallyLoc");
                            if (a && c) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            } else if (a) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var u = i ? i.completion : {};
                    return u.type = t, u.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, f) : this.complete(u)
                },
                complete: function (t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), f
                },
                finish: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), x(n), f
                    }
                },
                catch: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                x(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function (t, e, n) {
                    return this.delegate = {
                        iterator: T(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), f
                }
            }, t
        }(t.exports);
        try {
            regeneratorRuntime = r
        } catch (t) {
            "object" == typeof globalThis ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r)
        }
    }, function (t, e, n) {
        "use strict";
        n.r(e);
        n(0);
        var r = function (t) {
            return {
                applyHtmlTags: ["h1", "h2", "h3", "h4", "h5", "h6", "header"].map((function (t) {
                    return t.toLowerCase()
                }))
            }
        };

        function o(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        var i = function () {
            function t() {
                ! function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            var e, n, r;
            return e = t, (n = [{
                key: "_getCustomPatternOrDefault",
                value: function (t, e, n) {
                    return t.tags && t.tags[e] && t.tags[e].pattern ? t.tags[e].pattern : n
                }
            }, {
                key: "_getActiveTagsWithoutIgnore",
                value: function (t, e) {
                    return Array.isArray(e) ? t.reduce((function (t, n) {
                        return e.includes(n) || t.push(n.toLowerCase()), t
                    }), []) : t
                }
            }]) && o(e.prototype, n), r && o(e, r), t
        }();

        function u(t) {
            return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function a(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return c(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function c(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function l(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function f(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function s(t, e) {
            return (s = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function p(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = g(t);
                if (e) {
                    var o = g(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return y(this, n)
            }
        }

        function y(t, e) {
            return !e || "object" !== u(e) && "function" != typeof e ? h(t) : e
        }

        function h(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function g(t) {
            return (g = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var m = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && s(t, e)
                }(u, t);
                var e, n, o, i = p(u);

                function u(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return l(this, u), (e = i.call(this)).quillJS = t, e.name = "header", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^(#){1,6}\s/g), e.getAction.bind(h(e)), e._meta = r(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = u, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    var i = r.exec(e);
                                    if (i && t.activeTags.length && t.activeTags.find((function (t) {
                                            return "header" === t
                                        }))) {
                                        var u = i[0].length,
                                            c = a(t.quillJS.getLine(n.index), 1)[0],
                                            l = t.quillJS.getIndex(c);
                                        if (!t.activeTags.includes("h".concat(u - 1))) return o(!1);
                                        setTimeout((function () {
                                            t.quillJS.formatLine(l, 0, "header", u - 1), t.quillJS.deleteText(l, u), o(!0)
                                        }), 0)
                                    } else o(!1)
                                }))
                            }
                        }
                    }
                }]) && f(e.prototype, n), o && f(e, o), u
            }(i),
            b = function (t) {
                return {
                    applyHtmlTags: ["blockquote"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function v(t) {
            return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function d(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return S(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return S(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function S(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function w(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function x(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function O(t, e) {
            return (O = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function T(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = A(t);
                if (e) {
                    var o = A(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return _(this, n)
            }
        }

        function _(t, e) {
            return !e || "object" !== v(e) && "function" != typeof e ? j(t) : e
        }

        function j(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function A(t) {
            return (A = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var P = function (t) {
            ! function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && O(t, e)
            }(i, t);
            var e, n, r, o = T(i);

            function i(t) {
                var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return w(this, i), (e = o.call(this)).quillJS = t, e.name = "blockquote", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^(>)\s/g), e.getAction.bind(j(e)), e._meta = b(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
            }
            return e = i, (n = [{
                key: "getAction",
                value: function () {
                    var t = this;
                    return {
                        name: this.name,
                        pattern: this.pattern,
                        action: function (e, n, r) {
                            return new Promise((function (o) {
                                var i = r.exec(e);
                                if (i && t.activeTags.length) {
                                    var u = i[0] || "";
                                    setTimeout((function () {
                                        t.quillJS.formatText(n.index, i.input.length - 1, "blockquote", !0), t.quillJS.deleteText(n.index - u.length, u.length), o(!0)
                                    }), 0)
                                } else o(!1)
                            }))
                        },
                        release: function () {
                            setTimeout((function () {
                                var e = t.quillJS.getSelection().index;
                                0 === d(t.quillJS.getLine(e), 2)[1] && t.quillJS.format("blockquote", !1)
                            }), 0)
                        }
                    }
                }
            }]) && x(e.prototype, n), r && x(e, r), i
        }(i);

        function q(t) {
            return (q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function J(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function E(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function k(t, e) {
            return (k = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function R(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = L(t);
                if (e) {
                    var o = L(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return C(this, n)
            }
        }

        function C(t, e) {
            return !e || "object" !== q(e) && "function" != typeof e ? I(t) : e
        }

        function I(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function L(t) {
            return (L = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var D = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && k(t, e)
                }(i, t);
                var e, n, r, o = R(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return J(this, i), (e = o.call(this)).quillJS = t, e.name = "blockquote", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^\s{0,99}(>)\s/g), e.getAction.bind(I(e)), e._meta = b(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    var i = r.exec(e);
                                    if (i && t.activeTags.length) {
                                        var u = i[0] || "";
                                        setTimeout((function () {
                                            var e = n.index - 1;
                                            t.quillJS.deleteText(e, 2), setTimeout((function () {
                                                t.quillJS.formatLine(e, u.length - 3, "blockquote", !0), o(!0)
                                            }), 0)
                                        }), 0)
                                    } else o(!1)
                                }))
                            }
                        }
                    }
                }]) && E(e.prototype, n), r && E(e, r), i
            }(i),
            F = function (t) {
                return {
                    applyHtmlTags: ["bold"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function H(t) {
            return (H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function N(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return M(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return M(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function M(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function W(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function $(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function U(t, e) {
            return (U = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function G(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = Y(t);
                if (e) {
                    var o = Y(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return B(this, n)
            }
        }

        function B(t, e) {
            return !e || "object" !== H(e) && "function" != typeof e ? Q(t) : e
        }

        function Q(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function Y(t) {
            return (Y = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var K = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && U(t, e)
                }(i, t);
                var e, n, r, o = G(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return W(this, i), (e = o.call(this)).quillJS = t, e.name = "bold", e.pattern = e._getCustomPatternOrDefault(n, e.name, /(\*|_){2}(.+?)(?:\1){2}/g), e.getAction.bind(Q(e)), e._meta = F(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r, o) {
                                return new Promise((function (n) {
                                    var i = r.exec(e),
                                        u = N(i, 3),
                                        a = u[0],
                                        c = u[2],
                                        l = o + i.index;
                                    !e.match(/^([*_ \n]+)$/g) && t.activeTags.length ? setTimeout((function () {
                                        t.quillJS.deleteText(l, a.length), setTimeout((function () {
                                            t.quillJS.insertText(l, c, {
                                                bold: !0
                                            }), t.quillJS.format("bold", !1), n(!0)
                                        }))
                                    }), 0) : n(!1)
                                }))
                            }
                        }
                    }
                }]) && $(e.prototype, n), r && $(e, r), i
            }(i),
            z = function (t) {
                return {
                    applyHtmlTags: ["checkbox"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function V(t) {
            return (V = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function X(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return Z(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Z(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Z(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function tt(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function et(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function nt(t, e) {
            return (nt = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function rt(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = ut(t);
                if (e) {
                    var o = ut(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return ot(this, n)
            }
        }

        function ot(t, e) {
            return !e || "object" !== V(e) && "function" != typeof e ? it(t) : e
        }

        function it(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function ut(t) {
            return (ut = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var at = function (t) {
            ! function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && nt(t, e)
            }(i, t);
            var e, n, r, o = rt(i);

            function i(t) {
                var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return tt(this, i), (e = o.call(this)).quillJS = t, e.name = "checkbox-checked", e.pattern = e._getCustomPatternOrDefault(n, "checkbox", /^(\[x\])+\s/g), e.getAction.bind(it(e)), e._meta = z(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
            }
            return e = i, (n = [{
                key: "getAction",
                value: function () {
                    var t = this;
                    return {
                        name: this.name,
                        pattern: this.pattern,
                        action: function (e, n, r) {
                            return new Promise((function (o) {
                                if (r.exec(e) && t.activeTags.length) {
                                    var i = X(t.quillJS.getLine(n.index), 1)[0],
                                        u = t.quillJS.getIndex(i);
                                    setTimeout((function () {
                                        var n = e.split("[x] ").splice(1, 1).join("");
                                        t.quillJS.insertText(u, n), t.quillJS.deleteText(u + n.length - 1, e.length), setTimeout((function () {
                                            t.quillJS.formatLine(u, 0, "list", "checked"), o(!0)
                                        }))
                                    }), 0)
                                } else o(!1)
                            }))
                        }
                    }
                }
            }]) && et(e.prototype, n), r && et(e, r), i
        }(i);

        function ct(t) {
            return (ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function lt(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return ft(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ft(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function ft(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function st(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function pt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function yt(t, e) {
            return (yt = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function ht(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = bt(t);
                if (e) {
                    var o = bt(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return gt(this, n)
            }
        }

        function gt(t, e) {
            return !e || "object" !== ct(e) && "function" != typeof e ? mt(t) : e
        }

        function mt(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function bt(t) {
            return (bt = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var vt = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && yt(t, e)
                }(i, t);
                var e, n, r, o = ht(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return st(this, i), (e = o.call(this)).quillJS = t, e.name = "checkbox-unchecked", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^(\[\s?\])+\s/g), e.getAction.bind(mt(e)), e._meta = z(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    if (r.exec(e) && t.activeTags.length) {
                                        var i = lt(t.quillJS.getLine(n.index), 1)[0],
                                            u = t.quillJS.getIndex(i);
                                        setTimeout((function () {
                                            var n = e.split("[ ] ").length > 1 ? e.split("[ ] ").splice(1, 1).join("") : e;
                                            n = n.split("[] ").length > 1 ? n.split("[] ").splice(1, 1).join("") : n, t.quillJS.insertText(u, n), t.quillJS.deleteText(u + n.length - 1, e.length), setTimeout((function () {
                                                t.quillJS.formatLine(u, 0, "list", "unchecked"), o(!0)
                                            }))
                                        }), 0)
                                    } else o(!1)
                                }))
                            }
                        }
                    }
                }]) && pt(e.prototype, n), r && pt(e, r), i
            }(i),
            dt = function (t) {
                return {
                    applyHtmlTags: ["code"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function St(t) {
            return (St = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function wt(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return xt(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return xt(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function xt(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function Ot(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function Tt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function _t(t, e) {
            return (_t = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function jt(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = qt(t);
                if (e) {
                    var o = qt(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return At(this, n)
            }
        }

        function At(t, e) {
            return !e || "object" !== St(e) && "function" != typeof e ? Pt(t) : e
        }

        function Pt(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function qt(t) {
            return (qt = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Jt = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && _t(t, e)
                }(i, t);
                var e, n, r, o = jt(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Ot(this, i), (e = o.call(this)).quillJS = t, e.name = "code", e.pattern = e._getCustomPatternOrDefault(n, e.name, (function (t) {
                        return /(`){1}(.+)(`){1}/g.test(t) && !/```.*/.test(t) ? t : null
                    })), e.getAction.bind(Pt(e)), e._meta = dt(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r, o) {
                                return new Promise((function (n) {
                                    var r = /(`){1}(.+)(`){1}/g.exec(e);
                                    if (r && t.activeTags.length) {
                                        var i = wt(r, 1)[0],
                                            u = o + r.index;
                                        setTimeout((function () {
                                            t.quillJS.deleteText(u, i.length), setTimeout((function () {
                                                var e = i.replace(/`/g, "");
                                                t.quillJS.insertText(u, e, {
                                                    code: !0
                                                }), t.quillJS.insertText(u + e.length, " ", {
                                                    code: !1
                                                }), n(!0)
                                            }), 0)
                                        }), 0)
                                    } else n(!1)
                                }))
                            }
                        }
                    }
                }]) && Tt(e.prototype, n), r && Tt(e, r), i
            }(i),
            Et = function (t) {
                return {
                    applyHtmlTags: ["italics"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function kt(t) {
            return (kt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function Rt(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return Ct(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ct(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Ct(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function It(t, e) {
            It = function (t, e) {
                return new i(t, void 0, e)
            };
            var n = Lt(RegExp),
                r = RegExp.prototype,
                o = new WeakMap;

            function i(t, e, r) {
                var i = n.call(this, t, e);
                return o.set(i, r || o.get(t)), i
            }

            function u(t, e) {
                var n = o.get(e);
                return Object.keys(n).reduce((function (e, r) {
                    return e[r] = t[n[r]], e
                }), Object.create(null))
            }
            return Nt(i, n), i.prototype.exec = function (t) {
                var e = r.exec.call(this, t);
                return e && (e.groups = u(e, this)), e
            }, i.prototype[Symbol.replace] = function (t, e) {
                if ("string" == typeof e) {
                    var n = o.get(this);
                    return r[Symbol.replace].call(this, t, e.replace(/\$<([^>]+)>/g, (function (t, e) {
                        return "$" + n[e]
                    })))
                }
                if ("function" == typeof e) {
                    var i = this;
                    return r[Symbol.replace].call(this, t, (function () {
                        var t = [];
                        return t.push.apply(t, arguments), "object" !== kt(t[t.length - 1]) && t.push(u(t, i)), e.apply(this, t)
                    }))
                }
                return r[Symbol.replace].call(this, t, e)
            }, It.apply(this, arguments)
        }

        function Lt(t) {
            var e = "function" == typeof Map ? new Map : void 0;
            return (Lt = function (t) {
                if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
                var n;
                if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                    if (e.has(t)) return e.get(t);
                    e.set(t, r)
                }

                function r() {
                    return Dt(t, arguments, Gt(this).constructor)
                }
                return r.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), Mt(r, t)
            })(t)
        }

        function Dt(t, e, n) {
            return (Dt = Ut() ? Reflect.construct : function (t, e, n) {
                var r = [null];
                r.push.apply(r, e);
                var o = new(Function.bind.apply(t, r));
                return n && Mt(o, n.prototype), o
            }).apply(null, arguments)
        }

        function Ft(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function Ht(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function Nt(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Mt(t, e)
        }

        function Mt(t, e) {
            return (Mt = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function Wt(t, e) {
            return !e || "object" !== kt(e) && "function" != typeof e ? $t(t) : e
        }

        function $t(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function Ut() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
            } catch (t) {
                return !1
            }
        }

        function Gt(t) {
            return (Gt = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Bt = function (t) {
                Nt(a, t);
                var e, n, r, o, i, u = (e = a, n = Ut(), function () {
                    var t, r = Gt(e);
                    if (n) {
                        var o = Gt(this).constructor;
                        t = Reflect.construct(r, arguments, o)
                    } else t = r.apply(this, arguments);
                    return Wt(this, t)
                });

                function a(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Ft(this, a), (e = u.call(this)).quillJS = t, e.name = "italic", e.pattern = e._getCustomPatternOrDefault(n, e.name, It(/(?:^|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])(?:(\*|_)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?![\*_])[\s\S])+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?\1|(\*|_){3}[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?![\*_])[\s\S])*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\1{3})(?:$|(?=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]))/g, {
                        text1: 2,
                        text3: 4
                    })), e.getAction.bind($t(e)), e._meta = Et(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return r = a, (o = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r, o) {
                                return new Promise((function (n) {
                                    var i = r.exec(e);
                                    if (i && t.activeTags.length) {
                                        var u = Rt(i, 3),
                                            a = u[0],
                                            c = u[1],
                                            l = u[2],
                                            f = t.quillJS.getText()[o + i.index],
                                            s = t.quillJS.getText()[o + i.index + 1];
                                        if (c !== f || f !== s) {
                                            var p = o + i.index;
                                            setTimeout((function () {
                                                var e = !i.index,
                                                    r = e ? p : p + 1,
                                                    o = e ? a.length : a.length - 1;
                                                t.quillJS.deleteText(r, o), t.quillJS.insertText(r, l, {
                                                    italic: !0
                                                }), t.quillJS.format("italic", !1), n(!0)
                                            }), 0)
                                        } else n(!1)
                                    } else n(!1)
                                }))
                            }
                        }
                    }
                }]) && Ht(r.prototype, o), i && Ht(r, i), a
            }(i),
            Qt = function (t) {
                return {
                    applyHtmlTags: ["link"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function Yt(t) {
            return (Yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function Kt(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function zt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function Vt(t, e) {
            return (Vt = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function Xt(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = ee(t);
                if (e) {
                    var o = ee(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return Zt(this, n)
            }
        }

        function Zt(t, e) {
            return !e || "object" !== Yt(e) && "function" != typeof e ? te(t) : e
        }

        function te(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function ee(t) {
            return (ee = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var ne = function (t) {
            ! function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && Vt(t, e)
            }(i, t);
            var e, n, r, o = Xt(i);

            function i(t) {
                var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return Kt(this, i), (e = o.call(this)).quillJS = t, e.name = "link", e.pattern = e._getCustomPatternOrDefault(n, e.name, /(?:\[(.+?)\])(?:\((.+?)\))/g), e.getAction.bind(te(e)), e._meta = Qt(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
            }
            return e = i, (n = [{
                key: "getAction",
                value: function () {
                    var t = this;
                    return {
                        name: this.name,
                        pattern: this.pattern,
                        action: function (e, n, r, o) {
                            return new Promise((function (n) {
                                var i = r.exec(e),
                                    u = o + i.index,
                                    a = e.search(r),
                                    c = e.match(r)[0],
                                    l = e.match(/(?:\[(.*?)\])/g)[0],
                                    f = e.match(/(?:\((.*?)\))/g)[0];
                                t.activeTags.length && -1 !== a ? setTimeout((function () {
                                    var e = u;
                                    t.quillJS.deleteText(e, c.length), t.quillJS.insertText(e, l.slice(1, l.length - 1), "link", f.slice(1, f.length - 1)), n(!0)
                                }), 0) : n(!1)
                            }))
                        }
                    }
                }
            }]) && zt(e.prototype, n), r && zt(e, r), i
        }(i);

        function re(t) {
            return (re = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function oe(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function ie(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function ue(t, e) {
            return (ue = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function ae(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = fe(t);
                if (e) {
                    var o = fe(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return ce(this, n)
            }
        }

        function ce(t, e) {
            return !e || "object" !== re(e) && "function" != typeof e ? le(t) : e
        }

        function le(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function fe(t) {
            return (fe = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var se = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && ue(t, e)
                }(i, t);
                var e, n, r, o = ae(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return oe(this, i), (e = o.call(this)).quillJS = t, e.name = "link", e.pattern = e._getCustomPatternOrDefault(n, e.name, /(?:\[(.+?)\])(?:\((.+?)\))/g), e.getAction.bind(le(e)), e._meta = Qt(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    var i = e.search(r),
                                        u = e.match(r)[0],
                                        a = e.match(/(?:\[(.*?)\])/g)[0],
                                        c = e.match(/(?:\((.*?)\))/g)[0],
                                        l = n.index - 1 + i;
                                    t.activeTags.length && -1 !== i ? setTimeout((function () {
                                        var e = t.quillJS.getText(l - u.length, u.length) === u ? l - u.length : l;
                                        t.quillJS.deleteText(e, u.length), t.quillJS.insertText(e, a.slice(1, a.length - 1), "link", c.slice(1, c.length - 1)), o(!0)
                                    }), 0) : o(!1)
                                }))
                            }
                        }
                    }
                }]) && ie(e.prototype, n), r && ie(e, r), i
            }(i),
            pe = function (t) {
                return {
                    applyHtmlTags: ["li"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function ye(t) {
            return (ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function he(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return ge(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ge(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function ge(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function me(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function be(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function ve(t, e) {
            return (ve = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function de(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = xe(t);
                if (e) {
                    var o = xe(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return Se(this, n)
            }
        }

        function Se(t, e) {
            return !e || "object" !== ye(e) && "function" != typeof e ? we(t) : e
        }

        function we(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function xe(t) {
            return (xe = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Oe = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && ve(t, e)
                }(i, t);
                var e, n, r, o = de(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return me(this, i), (e = o.call(this)).quillJS = t, e.name = "li", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^\s{0,9}(\d)+\.\s/g), e.getAction.bind(we(e)), e._meta = pe(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    if (r.exec(e) && t.activeTags.length) {
                                        var i = he(t.quillJS.getLine(n.index), 1)[0],
                                            u = t.quillJS.getIndex(i);
                                        setTimeout((function () {
                                            var n = e.split(". ")[0].split("").filter((function (t) {
                                                    return /\s/gi.test(t)
                                                })).length,
                                                r = e.split(". ").splice(1, 1).join("");
                                            t.quillJS.insertText(u, r), t.quillJS.deleteText(u + r.length - 1, e.length), setTimeout((function () {
                                                t.quillJS.formatLine(u, 0, {
                                                    list: "ordered",
                                                    indent: n
                                                }), o(!0)
                                            }), 0)
                                        }), 0)
                                    } else o(!1)
                                }))
                            }
                        }
                    }
                }]) && be(e.prototype, n), r && be(e, r), i
            }(i),
            Te = function (t) {
                return {
                    applyHtmlTags: ["ul"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function _e(t) {
            return (_e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function je(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return Ae(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ae(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Ae(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function Pe(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function qe(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function Je(t, e) {
            return (Je = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function Ee(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = Ce(t);
                if (e) {
                    var o = Ce(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return ke(this, n)
            }
        }

        function ke(t, e) {
            return !e || "object" !== _e(e) && "function" != typeof e ? Re(t) : e
        }

        function Re(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function Ce(t) {
            return (Ce = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Ie = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && Je(t, e)
                }(i, t);
                var e, n, r, o = Ee(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Pe(this, i), (e = o.call(this)).quillJS = t, e.name = "ul", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^\s{0,9}(-|\*){1}\s/), e.getAction.bind(Re(e)), e._meta = Te(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    if (r.exec(e) && t.activeTags.length)
                                        if (e.split("- ")[1] || e.split("* ")[1]) {
                                            var i = je(t.quillJS.getLine(n.index), 1)[0],
                                                u = t.quillJS.getIndex(i);
                                            setTimeout((function () {
                                                var n = /^\s{0,9}(\*){1}\s/.test(e) ? e.replace("*", "-") : e,
                                                    r = n.split("- ")[0].split("").filter((function (t) {
                                                        return /\s/gi.test(t)
                                                    })).length,
                                                    i = n.split("- ").length > 1 ? n.split("- ").splice(1, 1).join("") : n;
                                                t.quillJS.insertText(u, i), t.quillJS.deleteText(u + i.length - 1, e.length), setTimeout((function () {
                                                    t.quillJS.formatLine(u, 0, {
                                                        list: "bullet",
                                                        indent: r
                                                    }), o(!0)
                                                }), 0)
                                            }), 0)
                                        } else o(!1);
                                    else o(!1)
                                }))
                            }
                        }
                    }
                }]) && qe(e.prototype, n), r && qe(e, r), i
            }(i),
            Le = function (t) {
                return {
                    applyHtmlTags: ["pre"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function De(t) {
            return (De = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function Fe(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function He(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function Ne(t, e) {
            return (Ne = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function Me(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = Ue(t);
                if (e) {
                    var o = Ue(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return We(this, n)
            }
        }

        function We(t, e) {
            return !e || "object" !== De(e) && "function" != typeof e ? $e(t) : e
        }

        function $e(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function Ue(t) {
            return (Ue = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var Ge = function (t) {
            ! function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && Ne(t, e)
            }(i, t);
            var e, n, r, o = Me(i);

            function i(t) {
                var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return Fe(this, i), (e = o.call(this)).quillJS = t, e.name = "pre", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^(```).*/g), e.getAction.bind($e(e)), e._meta = Le(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
            }
            return e = i, (n = [{
                key: "getAction",
                value: function () {
                    var t = this;
                    return {
                        name: this.name,
                        pattern: this.pattern,
                        action: function (e, n, r) {
                            return new Promise((function (o) {
                                var i = r.exec(e);
                                if (i && t.activeTags.length) {
                                    var u = i[0] || "";
                                    setTimeout((function () {
                                        var e = n.index - u.length;
                                        t.quillJS.deleteText(e, u.length), setTimeout((function () {
                                            t.quillJS.insertText(e, "\n");
                                            var n = e + 1 + "\n".length + 1;
                                            t.quillJS.insertText(n - 1, "\n"), t.quillJS.formatLine(n - 2, 1, "code-block", !0), o(!0)
                                        }), 0)
                                    }), 0)
                                } else o(!1)
                            }))
                        },
                        release: function () {
                            setTimeout((function () {
                                var e = t.quillJS.getSelection().index,
                                    n = t.quillJS.getLine(e)[0],
                                    r = n.domNode.textContent;
                                n && r && r.replace("\n", "").length <= 0 && t.quillJS.format("code-block", !1)
                            }), 0)
                        }
                    }
                }
            }]) && He(e.prototype, n), r && He(e, r), i
        }(i);

        function Be(t) {
            return (Be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function Qe(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return Ye(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ye(t, e)
            }(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Ye(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function Ke(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function ze(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function Ve(t, e) {
            return (Ve = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function Xe(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = en(t);
                if (e) {
                    var o = en(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return Ze(this, n)
            }
        }

        function Ze(t, e) {
            return !e || "object" !== Be(e) && "function" != typeof e ? tn(t) : e
        }

        function tn(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function en(t) {
            return (en = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var nn = function (t) {
                ! function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && Ve(t, e)
                }(i, t);
                var e, n, r, o = Xe(i);

                function i(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Ke(this, i), (e = o.call(this)).quillJS = t, e.name = "pre", e.pattern = e._getCustomPatternOrDefault(n, e.name, /^(```)/g), e.getAction.bind(tn(e)), e._meta = Le(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
                }
                return e = i, (n = [{
                    key: "getAction",
                    value: function () {
                        var t = this;
                        return {
                            name: this.name,
                            pattern: this.pattern,
                            action: function (e, n, r) {
                                return new Promise((function (o) {
                                    var i = r.exec(e);
                                    if (i && t.activeTags.length) {
                                        var u = i[0] || "",
                                            a = Qe(t.quillJS.getLine(n.index), 1)[0];
                                        setTimeout((function () {
                                            var e = t.quillJS.getIndex(a);
                                            t.quillJS.deleteText(e, u.length + 1), setTimeout((function () {
                                                for (var n = t.quillJS.getLine(e)[0]; n;) {
                                                    var r = t.quillJS.getIndex(n),
                                                        i = n.domNode.textContent,
                                                        u = n.domNode.textContent.length;
                                                    if (t.pattern.test(i)) return t.quillJS.deleteText(r, i.length), void o(!0);
                                                    t.quillJS.formatLine(r, 0, "code-block", !0), n = t.quillJS.getLine(r + u + 1)[0]
                                                }
                                                o(!0)
                                            }), 0)
                                        }), 0)
                                    } else o(!1)
                                }))
                            },
                            release: function () {
                                setTimeout((function () {
                                    var e = t.quillJS.getSelection().index,
                                        n = t.quillJS.getLine(e)[0],
                                        r = n.domNode.textContent;
                                    n && r && r.replace("\n", "").length <= 0 && t.quillJS.format("code-block", !1)
                                }), 0)
                            }
                        }
                    }
                }]) && ze(e.prototype, n), r && ze(e, r), i
            }(i),
            rn = function (t) {
                return {
                    applyHtmlTags: ["strikethrough"].map((function (t) {
                        return t.toLowerCase()
                    }))
                }
            };

        function on(t) {
            return (on = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function un(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function an(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function cn(t, e) {
            return (cn = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function ln(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var n, r = pn(t);
                if (e) {
                    var o = pn(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else n = r.apply(this, arguments);
                return fn(this, n)
            }
        }

        function fn(t, e) {
            return !e || "object" !== on(e) && "function" != typeof e ? sn(t) : e
        }

        function sn(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function pn(t) {
            return (pn = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }
        var yn = function (t) {
            ! function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && cn(t, e)
            }(i, t);
            var e, n, r, o = ln(i);

            function i(t) {
                var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return un(this, i), (e = o.call(this)).quillJS = t, e.name = "strikethrough", e.pattern = e._getCustomPatternOrDefault(n, e.name, /(?:~|_){2}(.+?)(?:~|_){2}/g), e.getAction.bind(sn(e)), e._meta = rn(), e.activeTags = e._getActiveTagsWithoutIgnore(e._meta.applyHtmlTags, n.ignoreTags), e
            }
            return e = i, (n = [{
                key: "getAction",
                value: function () {
                    var t = this;
                    return {
                        name: this.name,
                        pattern: this.pattern,
                        action: function (e, n, r, o) {
                            return new Promise((function (n) {
                                var i = r.exec(e);
                                if (t.activeTags.length) {
                                    var u = i[0],
                                        a = i[1],
                                        c = o + i.index;
                                    e.match(/^([~_ \n]+)$/g) ? n(!1) : setTimeout((function () {
                                        t.quillJS.deleteText(c, u.length), t.quillJS.insertText(c, a, {
                                            strike: !0
                                        }), t.quillJS.format("strike", !1), n(!0)
                                    }), 0)
                                } else n(!1)
                            }))
                        }
                    }
                }
            }]) && an(e.prototype, n), r && an(e, r), i
        }(i);

        function hn(t) {
            return function (t) {
                if (Array.isArray(t)) return gn(t)
            }(t) || function (t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
            }(t) || function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return gn(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gn(t, e)
            }(t) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function gn(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function mn(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function bn(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        var vn = function () {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    tags: {}
                };
                mn(this, t), this.quillJS = e, this.getOperatorsAll.bind(this), this.supportInlineTags = [new m(this.quillJS, n).getAction(), new P(this.quillJS, n).getAction(), new K(this.quillJS, n).getAction(), new Ge(this.quillJS, n).getAction(), new Jt(this.quillJS, n).getAction(), new yn(this.quillJS, n).getAction(), new Bt(this.quillJS, n).getAction(), new ne(this.quillJS, n).getAction()], this.supportfullTextTags = [new m(this.quillJS, n).getAction(), new at(this.quillJS, n).getAction(), new vt(this.quillJS, n).getAction(), new Oe(this.quillJS, n).getAction(), new Ie(this.quillJS, n).getAction(), new D(this.quillJS, n).getAction(), new nn(this.quillJS, n).getAction(), new K(this.quillJS, n).getAction(), new se(this.quillJS, n).getAction(), new Jt(this.quillJS, n).getAction(), new yn(this.quillJS, n).getAction(), new Bt(this.quillJS, n).getAction()], this.tags = hn(this.supportInlineTags), this.fullTextTags = hn(this.supportfullTextTags)
            }
            var e, n, r;
            return e = t, (n = [{
                key: "getOperatorsAll",
                value: function () {
                    return this.tags
                }
            }, {
                key: "getFullTextOperatorsAll",
                value: function () {
                    return this.fullTextTags
                }
            }]) && bn(e.prototype, n), r && bn(e, r), t
        }();

        function dn(t, e) {
            var n;
            if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
                if (Array.isArray(t) || (n = Tn(t)) || e && t && "number" == typeof t.length) {
                    n && (t = n);
                    var r = 0,
                        o = function () {};
                    return {
                        s: o,
                        n: function () {
                            return r >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[r++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: o
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, u = !0,
                a = !1;
            return {
                s: function () {
                    n = t[Symbol.iterator]()
                },
                n: function () {
                    var t = n.next();
                    return u = t.done, t
                },
                e: function (t) {
                    a = !0, i = t
                },
                f: function () {
                    try {
                        u || null == n.return || n.return()
                    } finally {
                        if (a) throw i
                    }
                }
            }
        }

        function Sn(t, e, n, r, o, i, u) {
            try {
                var a = t[i](u),
                    c = a.value
            } catch (t) {
                return void n(t)
            }
            a.done ? e(c) : Promise.resolve(c).then(r, o)
        }

        function wn(t) {
            return function () {
                var e = this,
                    n = arguments;
                return new Promise((function (r, o) {
                    var i = t.apply(e, n);

                    function u(t) {
                        Sn(i, r, o, u, a, "next", t)
                    }

                    function a(t) {
                        Sn(i, r, o, u, a, "throw", t)
                    }
                    u(void 0)
                }))
            }
        }

        function xn(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(t, e) || Tn(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function On(t) {
            return function (t) {
                if (Array.isArray(t)) return _n(t)
            }(t) || function (t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
            }(t) || Tn(t) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Tn(t, e) {
            if (t) {
                if ("string" == typeof t) return _n(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _n(t, e) : void 0
            }
        }

        function _n(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function jn(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function An(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        var Pn = function () {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                jn(this, t), this.quillJS = e, this.options = n, this.onTextChangeBound = this.onTextChange.bind(this), this.quillJS.on("text-change", this.onTextChangeBound), this.actionCharacters = {
                    whiteSpace: " ",
                    newLine: "\n",
                    asterisk: "*",
                    rightParenthesis: ")",
                    grave: "`",
                    tilde: "~",
                    underscore: "_"
                }, this.ignoreTags = ["PRE"].concat(On(n.ignoreTags || [])), this.tags = new vn(this.quillJS, n), this.matches = this.tags.getOperatorsAll(), this.fullMatches = this.tags.getFullTextOperatorsAll()
            }
            var e, n, r, o;
            return e = t, (n = [{
                key: "destroy",
                value: function () {
                    this.quillJS.off("text-change", this.onTextChangeBound)
                }
            }, {
                key: "onTextChange",
                value: function (t, e, n) {
                    var r = this;
                    if ("user" === n) {
                        var o = t.ops[0] && t.ops[0].retain || 0,
                            i = t.ops[0].insert || t.ops[1] && t.ops[1].insert,
                            u = xn(this.quillJS.getLine(o), 1)[0],
                            a = t.ops.find((function (t) {
                                return t.hasOwnProperty("insert")
                            })) || {};
                        (t.ops.find((function (t) {
                            return t.hasOwnProperty("delete")
                        })) || "\n" === a.insert) && u.domNode.textContent.length <= 1 && ["PRE", "BLOCKQUOTE"].includes(u.domNode.tagName) && this.onRemoveElement({
                            delete: 1
                        }), i && (i.length > 1 ? setTimeout(wn(regeneratorRuntime.mark((function e() {
                            var n, u, a, c, l, f, s, p, y, h, g, m, b, v, d;
                            return regeneratorRuntime.wrap((function (e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        n = o, u = i.split("\n"), a = n, c = dn(u), e.prev = 4, c.s();
                                    case 6:
                                        if ((l = c.n()).done) {
                                            e.next = 35;
                                            break
                                        }
                                        if (l.value, f = r.quillJS.getLine(a), s = xn(f, 1), p = s[0]) {
                                            e.next = 11;
                                            break
                                        }
                                        return e.abrupt("return", 0);
                                    case 11:
                                        return y = r.quillJS.getIndex(p), h = "", e.next = 15, r.onFullTextExecute.bind(r)({
                                            index: y,
                                            delta: t,
                                            length: 0
                                        });
                                    case 15:
                                        if (!(g = e.sent)) {
                                            e.next = 31;
                                            break
                                        }
                                        case 17:
                                            if (!g) {
                                                e.next = 29;
                                                break
                                            }
                                            if (m = r.quillJS.getLine(a), b = xn(m, 1), v = b[0], d = r.quillJS.getIndex(v), v && v.domNode) {
                                                e.next = 23;
                                                break
                                            }
                                            return g = !1, e.abrupt("break", 29);
                                        case 23:
                                            return h = v.domNode.textContent || "", e.next = 26, r.onFullTextExecute.bind(r)({
                                                index: d,
                                                delta: t,
                                                length: 0
                                            });
                                        case 26:
                                            g = e.sent, e.next = 17;
                                            break;
                                        case 29:
                                            e.next = 32;
                                            break;
                                        case 31:
                                            h = p.domNode.textContent || "";
                                        case 32:
                                            a += h.length + 1;
                                        case 33:
                                            e.next = 6;
                                            break;
                                        case 35:
                                            e.next = 40;
                                            break;
                                        case 37:
                                            e.prev = 37, e.t0 = e.catch(4), c.e(e.t0);
                                        case 40:
                                            return e.prev = 40, c.f(), e.finish(40);
                                        case 43:
                                        case "end":
                                            return e.stop()
                                }
                            }), e, null, [
                                [4, 37, 40, 43]
                            ])
                        }))), 0) : (t.ops.filter((function (t) {
                            return t.hasOwnProperty("insert")
                        })).forEach((function (t) {
                            switch (t.insert) {
                                case r.actionCharacters.whiteSpace:
                                case r.actionCharacters.rightParenthesis:
                                case r.actionCharacters.asterisk:
                                case r.actionCharacters.grave:
                                case r.actionCharacters.newLine:
                                case r.actionCharacters.tilde:
                                case r.actionCharacters.underscore:
                                    r.onInlineExecute.bind(r)()
                            }
                        })), t.ops.filter((function (t) {
                            return t.hasOwnProperty("delete")
                        })).forEach((function (t) {
                            r.onRemoveElement(t)
                        }))))
                    }
                }
            }, {
                key: "onInlineExecute",
                value: function () {
                    var t = this.quillJS.getSelection();
                    if (t) {
                        var e = xn(this.quillJS.getLine(t.index), 2),
                            n = e[0],
                            r = e[1],
                            o = n.domNode.textContent,
                            i = t.index - r,
                            u = this.quillJS.getFormat(i);
                        if (!u["code-block"] && !u.code) {
                            var a, c = dn(this.matches);
                            try {
                                for (c.s(); !(a = c.n()).done;) {
                                    var l = a.value;
                                    if ("function" == typeof l.pattern ? l.pattern(o) : o.match(l.pattern)) return void l.action(o, t, l.pattern, i)
                                }
                            } catch (t) {
                                c.e(t)
                            } finally {
                                c.f()
                            }
                        }
                    }
                }
            }, {
                key: "onFullTextExecute",
                value: (o = wn(regeneratorRuntime.mark((function t(e) {
                    var n, r, o, i, u, a, c, l, f, s, p, y, h, g, m, b, v, d;
                    return regeneratorRuntime.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (n = e || this.quillJS.getSelection(), r = e.delta, n) {
                                    t.next = 4;
                                    break
                                }
                                return t.abrupt("return", !1);
                            case 4:
                                if (o = this.quillJS.getLine(n.index), i = xn(o, 2), u = i[0], a = i[1], u && !(a < 0)) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return", !1);
                            case 7:
                                if (c = r && r.ops && r.ops[0].retain || 0, l = n.index - a, f = c ? c - 1 : l, !(s = this.quillJS.getFormat(f))["code-block"] && !s.code) {
                                    t.next = 14;
                                    break
                                }
                                return s.code && (p = r.ops.filter((function (t) {
                                    return t.insert
                                })).map((function (t) {
                                    return t.insert
                                })).join(""), this.quillJS.deleteText(c, p.length), this.quillJS.insertText(c, p.replace(/\n/g, ""), {
                                    code: !0
                                }), this.quillJS.format("code", !1)), t.abrupt("return", !1);
                            case 14:
                                if (y = this.quillJS.getLine(l - 1)[0], h = y && y.domNode.textContent, g = u.domNode.textContent + " ", n.length = n.index++, !("string" == typeof h && h.length > 0 && " " === g)) {
                                    t.next = 23;
                                    break
                                }
                                if (!(m = this.fullMatches.find((function (t) {
                                        return t.name === u.domNode.tagName.toLowerCase()
                                    }))) || !m.release) {
                                    t.next = 23;
                                    break
                                }
                                return m.release(n), t.abrupt("return", !1);
                            case 23:
                                b = dn(this.fullMatches), t.prev = 24, b.s();
                            case 26:
                                if ((v = b.n()).done) {
                                    t.next = 35;
                                    break
                                }
                                if (!("function" == typeof (d = v.value).pattern ? d.pattern(g) : g.match(d.pattern))) {
                                    t.next = 33;
                                    break
                                }
                                return t.next = 32, d.action(g, n, d.pattern, l);
                            case 32:
                                return t.abrupt("return", t.sent);
                            case 33:
                                t.next = 26;
                                break;
                            case 35:
                                t.next = 40;
                                break;
                            case 37:
                                t.prev = 37, t.t0 = t.catch(24), b.e(t.t0);
                            case 40:
                                return t.prev = 40, b.f(), t.finish(40);
                            case 43:
                                return t.abrupt("return", !1);
                            case 44:
                            case "end":
                                return t.stop()
                        }
                    }), t, this, [
                        [24, 37, 40, 43]
                    ])
                }))), function (t) {
                    return o.apply(this, arguments)
                })
            }, {
                key: "onRemoveElement",
                value: function (t) {
                    var e = this.quillJS.getSelection();
                    if (t && 1 === t.delete) {
                        var n = this.quillJS.getLine(e.index)[0],
                            r = this.matches.find((function (t) {
                                return t.name === n.domNode.tagName.toLowerCase()
                            }));
                        r && r.release && r.release(e)
                    }
                }
            }]) && An(e.prototype, n), r && An(e, r), t
        }();
        "undefined" != typeof window && (window.QuillMarkdown = Pn);
        e.default = Pn
    }])
}));
//# sourceMappingURL=quilljs-markdown.js.map