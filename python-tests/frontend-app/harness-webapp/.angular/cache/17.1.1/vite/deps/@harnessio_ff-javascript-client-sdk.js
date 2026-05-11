import "./chunk-ASLTLD6L.js";

// node_modules/jwt-decode/build/jwt-decode.esm.js
function e(e2) {
  this.message = e2;
}
e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(r2) {
  var t2 = String(r2).replace(/=+$/, "");
  if (t2.length % 4 == 1)
    throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n2, o2, a = 0, i = 0, c = ""; o2 = t2.charAt(i++); ~o2 && (n2 = a % 4 ? 64 * n2 + o2 : o2, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
    o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o2);
  return c;
};
function t(e2) {
  var t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
  switch (t2.length % 4) {
    case 0:
      break;
    case 2:
      t2 += "==";
      break;
    case 3:
      t2 += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(e3) {
      return decodeURIComponent(r(e3).replace(/(.)/g, function(e4, r2) {
        var t3 = r2.charCodeAt(0).toString(16).toUpperCase();
        return t3.length < 2 && (t3 = "0" + t3), "%" + t3;
      }));
    }(t2);
  } catch (e3) {
    return r(t2);
  }
}
function n(e2) {
  this.message = e2;
}
function o(e2, r2) {
  if ("string" != typeof e2)
    throw new n("Invalid token specified");
  var o2 = true === (r2 = r2 || {}).header ? 0 : 1;
  try {
    return JSON.parse(t(e2.split(".")[o2]));
  } catch (e3) {
    throw new n("Invalid token specified: " + e3.message);
  }
}
n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
var jwt_decode_esm_default = o;

// node_modules/mitt/dist/mitt.es.js
function mitt_es_default(n2) {
  return { all: n2 = n2 || /* @__PURE__ */ new Map(), on: function(t2, e2) {
    var i = n2.get(t2);
    i && i.push(e2) || n2.set(t2, [e2]);
  }, off: function(t2, e2) {
    var i = n2.get(t2);
    i && i.splice(i.indexOf(e2) >>> 0, 1);
  }, emit: function(t2, e2) {
    (n2.get(t2) || []).slice().map(function(n3) {
      n3(e2);
    }), (n2.get("*") || []).slice().map(function(n3) {
      n3(t2, e2);
    });
  } };
}

// node_modules/@harnessio/ff-javascript-client-sdk/dist/sdk.esm.js
var Ee = Object.defineProperty;
var Re = Object.defineProperties;
var be = Object.getOwnPropertyDescriptors;
var ie = Object.getOwnPropertySymbols;
var ye = Object.prototype.hasOwnProperty;
var Se = Object.prototype.propertyIsEnumerable;
var ne = (a, e2, n2) => e2 in a ? Ee(a, e2, { enumerable: true, configurable: true, writable: true, value: n2 }) : a[e2] = n2;
var A = (a, e2) => {
  for (var n2 in e2 || (e2 = {}))
    ye.call(e2, n2) && ne(a, n2, e2[n2]);
  if (ie)
    for (var n2 of ie(e2))
      Se.call(e2, n2) && ne(a, n2, e2[n2]);
  return a;
};
var K = (a, e2) => Re(a, be(e2));
var h = (a, e2, n2) => new Promise((r2, o2) => {
  var l = (E) => {
    try {
      p(n2.next(E));
    } catch (g) {
      o2(g);
    }
  }, u = (E) => {
    try {
      p(n2.throw(E));
    } catch (g) {
      o2(g);
    }
  }, p = (E) => E.done ? r2(E.value) : Promise.resolve(E.value).then(l, u);
  p((n2 = n2.apply(a, e2)).next());
});
var x = ((m) => (m.READY = "ready", m.CONNECTED = "connected", m.DISCONNECTED = "disconnected", m.STOPPED = "stopped", m.POLLING = "polling", m.POLLING_STOPPED = "polling stopped", m.FLAGS_LOADED = "flags loaded", m.CACHE_LOADED = "cache loaded", m.CHANGED = "changed", m.ERROR = "error", m.ERROR_CACHE = "cache error", m.ERROR_METRICS = "metrics error", m.ERROR_AUTH = "auth error", m.ERROR_FETCH_FLAGS = "fetch flags error", m.ERROR_FETCH_FLAG = "fetch flag error", m.ERROR_STREAM = "stream error", m))(x || {});
var Ie = { debug: false, baseUrl: "https://config.ff.harness.io/api/1.0", eventUrl: "https://events.ff.harness.io/api/1.0", eventsSyncInterval: 6e4, pollingInterval: 6e4, streamEnabled: true, cache: false };
var ae = (a) => {
  let e2 = A(A({}, Ie), a);
  return e2.pollingEnabled === void 0 && (e2.pollingEnabled = e2.streamEnabled), e2.eventsSyncInterval < 6e4 && (e2.eventsSyncInterval = 6e4), e2.pollingInterval < 6e4 && (e2.pollingInterval = 6e4), (!e2.logger || !e2.logger.debug || !e2.logger.error || !e2.logger.info || !e2.logger.warn) && (e2.logger = console), e2;
};
var j = (a, e2 = true) => {
  e2 ? setTimeout(a, 0) : a();
};
var k = (a, e2) => Math.round(Math.random() * (e2 - a) + a);
var re = (a) => {
  let e2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n2 = "", r2 = 0, o2 = Ce(JSON.stringify(a));
  for (; r2 < o2.length; ) {
    let l = o2.charCodeAt(r2++), u = o2.charCodeAt(r2++), p = o2.charCodeAt(r2++), E = l >> 2, g = (l & 3) << 4 | u >> 4, y = (u & 15) << 2 | p >> 6, T = p & 63;
    isNaN(u) ? y = T = 64 : isNaN(p) && (T = 64), n2 += e2.charAt(E) + e2.charAt(g) + e2.charAt(y) + e2.charAt(T);
  }
  return n2;
};
var Ce = (a) => a.replace(/\r\n/g, `
`).split("").map((e2) => {
  let n2 = e2.charCodeAt(0);
  return n2 < 128 ? String.fromCharCode(n2) : n2 > 127 && n2 < 2048 ? String.fromCharCode(n2 >> 6 | 192) + String.fromCharCode(n2 & 63 | 128) : String.fromCharCode(n2 >> 12 | 224) + String.fromCharCode(n2 >> 6 & 63 | 128) + String.fromCharCode(n2 & 63 | 128);
}).join("");
function q(a) {
  return function(...n2) {
    let [r2, o2] = a(n2);
    return fetch(r2, o2);
  };
}
var oe = 3e4;
var V = class {
  constructor(e2, n2, r2, o2, l, u, p, E, g) {
    this.eventBus = e2;
    this.configurations = n2;
    this.url = r2;
    this.apiKey = o2;
    this.standardHeaders = l;
    this.fallbackPoller = u;
    this.logDebug = p;
    this.logError = E;
    this.eventCallback = g;
    this.closed = false;
    this.connectionOpened = false;
    this.disconnectEventEmitted = false;
    this.reconnectAttempts = 0;
  }
  start() {
    let e2 = (g) => {
      g.toString().split(/\r?\n/).forEach(n2);
    }, n2 = (g) => {
      if (g.startsWith("data:")) {
        let y = JSON.parse(g.substring(5));
        this.logDebugMessage("Received event from stream: ", y), this.eventCallback(y);
      }
    }, r2 = () => {
      this.logDebugMessage("Stream connected"), this.eventBus.emit("connected"), this.reconnectAttempts = 0;
    }, o2 = () => {
      clearInterval(this.readTimeoutCheckerId);
      let g = k(1e3, 1e4);
      this.reconnectAttempts++, this.logDebugMessage("Stream disconnected, will reconnect in " + g + "ms"), this.disconnectEventEmitted || (this.eventBus.emit("disconnected"), this.disconnectEventEmitted = true), this.reconnectAttempts >= 5 && this.reconnectAttempts % 5 === 0 && this.logErrorMessage(`Reconnection failed after ${this.reconnectAttempts} attempts; attempting further reconnections.`), setTimeout(() => this.start(), g);
    }, l = (g) => {
      g && this.logDebugMessage("Stream has issue", g), this.fallBackToPolling(), this.eventBus.emit("stream error", g), this.eventBus.emit("error", g), o2();
    }, u = A({ "Cache-Control": "no-cache", Accept: "text/event-stream", "API-Key": this.apiKey }, this.standardHeaders);
    this.logDebugMessage("SSE HTTP start request", this.url), this.xhr = new XMLHttpRequest(), this.xhr.open("GET", this.url);
    for (let [g, y] of Object.entries(u))
      this.xhr.setRequestHeader(g, y);
    this.xhr.timeout = 24 * 60 * 60 * 1e3, this.xhr.onerror = () => {
      this.connectionOpened = false, l("XMLHttpRequest error on SSE stream");
    }, this.xhr.onabort = () => {
      this.connectionOpened = false, this.logDebugMessage("SSE aborted"), this.closed || l(null);
    }, this.xhr.ontimeout = () => {
      this.connectionOpened = false, l("SSE timeout");
    }, this.xhr.onload = () => {
      l(`Received XMLHttpRequest onLoad event: ${this.xhr.status}`);
    };
    let p = 0, E = Date.now();
    this.xhr.onprogress = () => {
      this.connectionOpened || (r2(), this.connectionOpened = true, this.disconnectEventEmitted = false), this.stopFallBackPolling(), E = Date.now();
      let g = this.xhr.responseText.slice(p);
      p += g.length, this.logDebugMessage("SSE GOT: " + g), e2(g);
    }, this.readTimeoutCheckerId = setInterval(() => {
      E < Date.now() - oe && (this.logDebugMessage("SSE read timeout"), this.xhr.abort());
    }, oe), this.xhr.send();
  }
  close() {
    this.connectionOpened = false, this.closed = true, this.xhr && this.xhr.abort(), clearInterval(this.readTimeoutCheckerId), this.eventBus.emit("stopped"), this.stopFallBackPolling();
  }
  fallBackToPolling() {
    !this.fallbackPoller.isPolling() && this.configurations.pollingEnabled && (this.logDebugMessage("Falling back to polling mode while stream recovers"), this.fallbackPoller.start());
  }
  stopFallBackPolling() {
    this.fallbackPoller.isPolling() && (this.logDebugMessage("Stopping fallback polling mode"), this.fallbackPoller.stop());
  }
  logDebugMessage(e2, ...n2) {
    this.configurations.debug && this.logDebug(`Streaming:  ${e2}`, ...n2);
  }
  logErrorMessage(e2, ...n2) {
    this.logError(`Streaming:  ${e2}`, ...n2);
  }
};
function se(a, e2, n2, r2, o2) {
  let l = a in n2, u = l ? n2[a] : e2;
  return l && r2(a, u), o2 ? { value: u, isDefaultValue: !l } : u;
}
var F = class {
  constructor(e2, n2, r2, o2, l) {
    this.fetchFlagsFn = e2;
    this.configurations = n2;
    this.eventBus = r2;
    this.logDebug = o2;
    this.logError = l;
    this.maxAttempts = 5;
  }
  start() {
    if (this.isPolling()) {
      this.logDebugMessage("Already polling.");
      return;
    }
    this.isRunning = true, this.eventBus.emit("polling"), this.logDebugMessage(`Starting poller, first poll will be in ${this.configurations.pollingInterval}ms`), this.timeoutId = setTimeout(() => this.poll(), this.configurations.pollingInterval);
  }
  poll() {
    this.attemptFetch().finally(() => {
      this.timeoutId = setTimeout(() => this.poll(), this.configurations.pollingInterval);
    });
  }
  attemptFetch() {
    return h(this, null, function* () {
      for (let e2 = 1; e2 <= this.maxAttempts; e2++) {
        let n2 = yield this.fetchFlagsFn();
        if (n2.type === "success") {
          this.logDebugMessage(`Successfully polled for flag updates, next poll in ${this.configurations.pollingInterval}ms. `);
          return;
        }
        if (this.logErrorMessage("Error when polling for flag updates", n2.error), e2 >= this.maxAttempts) {
          this.logDebugMessage(`Maximum attempts reached for polling for flags. Next poll in ${this.configurations.pollingInterval}ms.`);
          return;
        }
        this.logDebugMessage(`Polling for flags attempt #${e2} failed. Remaining attempts: ${this.maxAttempts - e2}`, n2.error);
        let r2 = k(1e3, 1e4);
        yield new Promise((o2) => setTimeout(o2, r2));
      }
    });
  }
  stop() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = void 0, this.isRunning = false, this.eventBus.emit("polling stopped"), this.logDebugMessage("Polling stopped"));
  }
  isPolling() {
    return this.isRunning;
  }
  logDebugMessage(e2, ...n2) {
    this.configurations.debug && this.logDebug(`Poller: ${e2}`, ...n2);
  }
  logErrorMessage(e2, ...n2) {
    this.logError(`Poller: ${e2}`, ...n2);
  }
};
function le(n2) {
  return h(this, arguments, function* (a, e2 = {}) {
    let r2 = yield Oe(a), o2 = De(e2);
    return { loadFromCache: () => U(r2, o2, e2), saveToCache: (l) => W(r2, o2, l), updateCachedEvaluation: (l) => Te(r2, o2, l), removeCachedEvaluation: (l) => we(r2, o2, l) };
  });
}
function U(r2, o2) {
  return h(this, arguments, function* (a, e2, n2 = {}) {
    let l = parseInt(yield e2.getItem(a + ".ts"));
    if (n2 != null && n2.ttl && !isNaN(l) && l + n2.ttl < Date.now())
      return yield Ae(a, e2), [];
    let u = yield e2.getItem(a);
    if (u)
      try {
        return JSON.parse(u);
      } catch (p) {
      }
    return [];
  });
}
function Ae(a, e2) {
  return h(this, null, function* () {
    yield e2.removeItem(a), yield e2.removeItem(a + ".ts");
  });
}
function W(a, e2, n2) {
  return h(this, null, function* () {
    yield e2.setItem(a, JSON.stringify(n2)), yield e2.setItem(a + ".ts", Date.now().toString());
  });
}
function Te(a, e2, n2) {
  return h(this, null, function* () {
    let r2 = yield U(a, e2), o2 = r2.find(({ flag: l }) => l === n2.flag);
    o2 ? Object.assign(o2, n2) : r2.push(n2), yield W(a, e2, r2);
  });
}
function we(a, e2, n2) {
  return h(this, null, function* () {
    let r2 = yield U(a, e2), o2 = r2.findIndex(({ flag: l }) => l === n2);
    o2 > -1 && (r2.splice(o2, 1), yield W(a, e2, r2));
  });
}
function Oe(a) {
  return h(this, null, function* () {
    var n2, r2;
    let e2 = a;
    if (globalThis != null && globalThis.TextEncoder && ((r2 = (n2 = globalThis == null ? void 0 : globalThis.crypto) == null ? void 0 : n2.subtle) != null && r2.digest)) {
      let l = new TextEncoder().encode(a), u = yield crypto.subtle.digest("SHA-256", l);
      e2 = Array.from(new Uint8Array(u)).map((E) => E.toString(16).padStart(2, "0")).join("");
    } else
      globalThis.btoa && (e2 = btoa(a));
    return "HARNESS_FF_CACHE_" + e2;
  });
}
function De(a) {
  let e2;
  return !a.storage || typeof a.storage != "object" || !("getItem" in a.storage) || !("setItem" in a.storage) || !("removeItem" in a.storage) ? globalThis.localStorage ? e2 = globalThis.localStorage : globalThis.sessionStorage ? e2 = globalThis.sessionStorage : e2 = Pe : e2 = a.storage, { getItem(r2) {
    return h(this, null, function* () {
      let o2 = e2.getItem(r2);
      return o2 instanceof Promise ? yield o2 : o2;
    });
  }, setItem(r2, o2) {
    return h(this, null, function* () {
      let l = e2.setItem(r2, o2);
      l instanceof Promise && (yield l);
    });
  }, removeItem(r2) {
    return h(this, null, function* () {
      let o2 = e2.removeItem(r2);
      o2 instanceof Promise && (yield o2);
    });
  } };
}
var Pe = { getItem: () => null, setItem: () => {
}, removeItem: () => {
} };
var ge = "1.26.1";
var ce = `Javascript ${ge} Client`;
var Ne = 500;
var xe = globalThis.fetch;
var J = !!globalThis.Proxy;
var ft = (a, e2, n2) => {
  let r2 = false, o2, l, u, p, E, g, y = true, T = {}, M = q((t2) => t2), Y = 0, X = false, _ = () => {
    y = false;
  }, m = () => {
    y = true;
  }, C = [], d = mitt_es_default(), v = ae(n2), R = (t2, ...i) => {
    v.debug && v.logger.debug(`[FF-SDK] ${t2}`, ...i);
  }, w = (t2, ...i) => {
    v.logger.error(`[FF-SDK] ${t2}`, ...i);
  }, L = (t2) => {
    let { value: i } = t2;
    try {
      switch (t2.kind.toLowerCase()) {
        case "int":
        case "number":
          i = Number(i);
          break;
        case "boolean":
          i = i.toString().toLowerCase() === "true";
          break;
        case "json":
          i = JSON.parse(i);
          break;
      }
    } catch (c) {
      w(c);
    }
    return i;
  }, H = (t2) => {
    if (y) {
      let i = Date.now();
      i - t2.lastAccessed > Ne && (t2.count++, t2.lastAccessed = i);
    }
  }, de = () => h(void 0, null, function* () {
    if (v.cache) {
      R("initializing cache");
      try {
        let t2 = true, i = yield le(e2.identifier + a, typeof v.cache == "boolean" ? {} : v.cache), c = yield i.loadFromCache();
        c != null && c.length && j(() => {
          R("loading from cache", c), ee(c, false), d.emit("cache loaded", c);
        }), B("flags loaded", (f) => h(void 0, null, function* () {
          yield i.saveToCache(f), t2 = false;
        })), B("changed", (f) => h(void 0, null, function* () {
          t2 || (f.deleted ? yield i.removeCachedEvaluation(f.flag) : yield i.updateCachedEvaluation(f));
        }));
      } catch (t2) {
        w("Cache error: ", t2), d.emit("cache error", t2), d.emit("error", t2);
      }
    }
  }), ue = (t2, i) => h(void 0, null, function* () {
    return (yield (yield xe(`${i.baseUrl}/client/auth`, { method: "POST", headers: { "Content-Type": "application/json", "Harness-SDK-Info": ce }, body: JSON.stringify({ apiKey: t2, target: K(A({}, e2), { identifier: String(e2.identifier) }) }) })).json()).authToken;
  }), G = 0, $ = () => {
    if (C.length) {
      R("Sending metrics...", { metrics: C, evaluations: I });
      let t2 = { metricsData: C.map((i) => ({ timestamp: Date.now(), count: i.count, metricsType: "FFMETRICS", attributes: [{ key: "featureIdentifier", value: i.featureIdentifier }, { key: "featureName", value: i.featureIdentifier }, { key: "variationIdentifier", value: i.variationIdentifier }, { key: "target", value: e2.identifier }, { key: "SDK_NAME", value: "JavaScript" }, { key: "SDK_LANGUAGE", value: "JavaScript" }, { key: "SDK_TYPE", value: "client" }, { key: "SDK_VERSION", value: ge }] })) };
      M(`${v.eventUrl}/metrics/${o2}?cluster=${l}`, { method: "POST", headers: A({ "Content-Type": "application/json" }, T), body: JSON.stringify(t2) }).then(() => {
        C = [], G = 0;
      }).catch((i) => {
        G++ && (C = [], G = 0), R(i), d.emit("metrics error", i);
      }).finally(() => {
        g = window.setTimeout($, v.eventsSyncInterval);
      });
    } else
      g = window.setTimeout($, v.eventsSyncInterval);
  }, I = {}, fe = (t2) => {
    R("Sending event for", t2.flag), J ? d.emit("changed", new Proxy(t2, { get(i, c) {
      var f;
      if (y && i.hasOwnProperty(c) && c === "value") {
        let S = i.flag, s = t2.value, b = C.find((P) => P.featureIdentifier === S && P.featureValue === s);
        b ? (H(b), b.variationIdentifier = ((f = I[S]) == null ? void 0 : f.identifier) || "") : C.push({ featureIdentifier: S, featureValue: String(s), variationIdentifier: I[S].identifier || "", count: 1, lastAccessed: Date.now() }), R("Metrics event: Flag", c, "has been read with value via stream update", s);
      }
      return c === "value" ? L(t2) : t2[c];
    } })) : d.emit("changed", { deleted: t2.deleted, flag: t2.flag, value: L(t2) });
  }, z = function() {
    return J ? new Proxy({}, { get(t2, i) {
      var f, S, s;
      let c = t2[i];
      if (y && t2.hasOwnProperty(i)) {
        let b = t2[i], P = C.find((te) => te.featureIdentifier === i && b === te.featureValue);
        P ? (P.variationIdentifier = ((f = I[i]) == null ? void 0 : f.identifier) || "", H(P)) : C.push({ featureIdentifier: i, featureValue: b, variationIdentifier: ((S = I[i]) == null ? void 0 : S.identifier) || "", count: 1, lastAccessed: Date.now() }), R("Metrics event: Flag:", i, "has been read with value:", b, "variationIdentifier:", (s = I[i]) == null ? void 0 : s.identifier);
      }
      return c;
    } }) : {};
  }, O = z();
  de().then(() => ue(a, v).then((t2) => h(void 0, null, function* () {
    if (r2)
      return;
    E = t2;
    let i = jwt_decode_esm_default(t2);
    T = { Authorization: `Bearer ${E}`, "Harness-AccountID": i.accountID, "Harness-EnvironmentID": i.environmentIdentifier, "Harness-SDK-Info": ce };
    let c = re(e2);
    c.length < 262144 && (T["Harness-Target"] = c), R("Authenticated", i), g = window.setTimeout($, v.eventsSyncInterval), o2 = i.environment, l = i.clusterIdentifier;
    let f = !!Object.keys(I).length;
    if ((yield N()).type === "success" && R("Fetch all flags ok", O), !r2) {
      if (v.streamEnabled ? (R("Streaming mode enabled"), he()) : v.pollingEnabled ? (R("Polling mode enabled"), me()) : R("Streaming and polling mode disabled"), !f) {
        _();
        let s = A({}, O);
        m(), d.emit("ready", s);
      }
      X = true;
    }
  })).catch((t2) => {
    w("Authentication error: ", t2), d.emit("auth error", t2), d.emit("error", t2);
  }));
  let N = () => h(void 0, null, function* () {
    try {
      let t2 = yield M(`${v.baseUrl}/client/env/${o2}/target/${e2.identifier}/evaluations?cluster=${l}`, { headers: T });
      if (t2.ok) {
        let i = yield t2.json();
        return i.forEach(D), d.emit("flags loaded", i), { type: "success", data: i };
      } else
        return w("Features fetch operation error: ", t2), d.emit("fetch flags error", t2), d.emit("error", t2), { type: "error", error: t2 };
    } catch (t2) {
      return w("Features fetch operation error: ", t2), d.emit("fetch flags error", t2), d.emit("error", t2), { type: "error", error: t2 };
    }
  }), Q = (t2) => h(void 0, null, function* () {
    try {
      let i = yield M(`${v.baseUrl}/client/env/${o2}/target/${e2.identifier}/evaluations/${t2}?cluster=${l}`, { headers: T });
      if (i.ok) {
        let c = yield i.json();
        D(c);
      } else
        w("Feature fetch operation error: ", i), d.emit("fetch flag error", i), d.emit("error", i);
    } catch (i) {
      w("Feature fetch operation error: ", i), d.emit("fetch flag error", i), d.emit("error", i);
    }
  }), D = (t2) => {
    _();
    let i = L(t2);
    i !== O[t2.flag] && (R("Flag variation has changed for ", t2.identifier), O[t2.flag] = i, I[t2.flag] = K(A({}, t2), { value: i }), fe(t2)), m();
  };
  p = new F(N, v, d, R, w);
  let he = () => {
    let t2 = (s) => {
      switch (s.event) {
        case "create":
          c(s.evaluations) ? s.evaluations.forEach((b) => {
            D(b);
          }) : setTimeout(() => Q(s.identifier), 1e3);
          break;
        case "patch":
          c(s.evaluations) ? s.evaluations.forEach((b) => {
            D(b);
          }) : Q(s.identifier);
          break;
        case "delete":
          delete O[s.identifier], d.emit("changed", { flag: s.identifier, value: void 0, deleted: true }), R("Evaluation deleted", { message: s, storage: O });
          break;
      }
    }, i = (s) => !(!s || !s.flag || !s.identifier || !s.kind || !s.value), c = (s) => !(!s || s.length == 0 || !s.every((b) => i(b))), f = (s) => {
      s.event === "patch" && (c(s.evaluations) ? s.evaluations.forEach((b) => {
        D(b);
      }) : N());
    }, S = `${v.baseUrl}/stream?cluster=${l}`;
    u = new V(d, v, S, a, T, p, R, w, (s) => {
      s.domain === "flag" ? t2(s) : s.domain === "target-segment" && f(s);
    }), u.start();
  }, me = () => {
    p.start();
  }, B = (t2, i) => d.on(t2, i), ve = (t2, i) => {
    t2 ? d.off(t2, i) : Z();
  }, pe = (t2, i) => {
    var s;
    if (!y || J || i === void 0)
      return;
    let c = i, f = t2, S = C.find((b) => b.featureIdentifier === f && b.featureValue === c);
    S ? (H(S), S.variationIdentifier = ((s = I[f]) == null ? void 0 : s.identifier) || "") : C.push({ featureIdentifier: f, featureValue: c, count: 1, variationIdentifier: I[f].identifier || "", lastAccessed: Date.now() });
  }, Z = () => {
    r2 = true, v.streamEnabled && (R("Closing event stream"), typeof (u == null ? void 0 : u.close) == "function" && u.close(), d.all.clear()), v.pollingEnabled && p.isPolling() && (R("Closing Poller"), p.stop()), O = z(), I = {}, clearTimeout(g);
  }, ee = (t2, i = true) => {
    t2.length && j(() => {
      let c = !!Object.keys(I).length;
      if (t2.forEach(D), !c) {
        _();
        let f = A({}, O);
        m(), d.emit("ready", f);
      }
    }, i);
  };
  return { on: B, off: ve, close: Z, setEvaluations: ee, registerAPIRequestMiddleware: (t2) => {
    M = q(t2);
  }, refreshEvaluations: () => {
    X && !r2 && Date.now() - Y >= 6e4 && (N(), Y = Date.now());
  }, variation: (t2, i, c = false) => se(t2, i, O, pe, c) };
};
export {
  x as Event,
  ft as initialize
};
//# sourceMappingURL=@harnessio_ff-javascript-client-sdk.js.map
