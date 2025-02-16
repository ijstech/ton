
define("@scom/ton-core", ["require", "exports", "@ijstech/ton-core"], function (require, exports, toncore_1) {
  Object.defineProperty(exports, "__esModule", { value: true }); 
  var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  __markAsModule(target);
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    init_buffer_shim();
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    init_buffer_shim();
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    init_buffer_shim();
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString3() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON2() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// buffer-shim.js
var import_buffer;
var init_buffer_shim = __esm({
  "buffer-shim.js"() {
    import_buffer = __toModule(require_buffer());
    globalThis.Buffer = import_buffer.Buffer;
  }
});

// node_modules/jssha/dist/sha.js
var require_sha = __commonJS({
  "node_modules/jssha/dist/sha.js"(exports, module2) {
    init_buffer_shim();
    !function(n, r) {
      typeof exports == "object" && typeof module2 != "undefined" ? module2.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis != "undefined" ? globalThis : n || self).jsSHA = r();
    }(exports, function() {
      "use strict";
      var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      function r(n2, r2, t2, e2) {
        var i2, o2, u2, f2 = r2 || [0], w2 = (t2 = t2 || 0) >>> 3, s2 = e2 === -1 ? 3 : 0;
        for (i2 = 0; i2 < n2.length; i2 += 1)
          o2 = (u2 = i2 + w2) >>> 2, f2.length <= o2 && f2.push(0), f2[o2] |= n2[i2] << 8 * (s2 + e2 * (u2 % 4));
        return { value: f2, binLen: 8 * n2.length + t2 };
      }
      function t(t2, e2, i2) {
        switch (e2) {
          case "UTF8":
          case "UTF16BE":
          case "UTF16LE":
            break;
          default:
            throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
        }
        switch (t2) {
          case "HEX":
            return function(n2, r2, t3) {
              return function(n3, r3, t4, e3) {
                var i3, o2, u2, f2;
                if (n3.length % 2 != 0)
                  throw new Error("String of HEX type must be in byte increments");
                var w2 = r3 || [0], s2 = (t4 = t4 || 0) >>> 3, a2 = e3 === -1 ? 3 : 0;
                for (i3 = 0; i3 < n3.length; i3 += 2) {
                  if (o2 = parseInt(n3.substr(i3, 2), 16), isNaN(o2))
                    throw new Error("String of HEX type contains invalid characters");
                  for (u2 = (f2 = (i3 >>> 1) + s2) >>> 2; w2.length <= u2; )
                    w2.push(0);
                  w2[u2] |= o2 << 8 * (a2 + e3 * (f2 % 4));
                }
                return { value: w2, binLen: 4 * n3.length + t4 };
              }(n2, r2, t3, i2);
            };
          case "TEXT":
            return function(n2, r2, t3) {
              return function(n3, r3, t4, e3, i3) {
                var o2, u2, f2, w2, s2, a2, h2, c2, v2 = 0, A2 = t4 || [0], E2 = (e3 = e3 || 0) >>> 3;
                if (r3 === "UTF8")
                  for (h2 = i3 === -1 ? 3 : 0, f2 = 0; f2 < n3.length; f2 += 1)
                    for (u2 = [], 128 > (o2 = n3.charCodeAt(f2)) ? u2.push(o2) : 2048 > o2 ? (u2.push(192 | o2 >>> 6), u2.push(128 | 63 & o2)) : 55296 > o2 || 57344 <= o2 ? u2.push(224 | o2 >>> 12, 128 | o2 >>> 6 & 63, 128 | 63 & o2) : (f2 += 1, o2 = 65536 + ((1023 & o2) << 10 | 1023 & n3.charCodeAt(f2)), u2.push(240 | o2 >>> 18, 128 | o2 >>> 12 & 63, 128 | o2 >>> 6 & 63, 128 | 63 & o2)), w2 = 0; w2 < u2.length; w2 += 1) {
                      for (s2 = (a2 = v2 + E2) >>> 2; A2.length <= s2; )
                        A2.push(0);
                      A2[s2] |= u2[w2] << 8 * (h2 + i3 * (a2 % 4)), v2 += 1;
                    }
                else
                  for (h2 = i3 === -1 ? 2 : 0, c2 = r3 === "UTF16LE" && i3 !== 1 || r3 !== "UTF16LE" && i3 === 1, f2 = 0; f2 < n3.length; f2 += 1) {
                    for (o2 = n3.charCodeAt(f2), c2 === true && (o2 = (w2 = 255 & o2) << 8 | o2 >>> 8), s2 = (a2 = v2 + E2) >>> 2; A2.length <= s2; )
                      A2.push(0);
                    A2[s2] |= o2 << 8 * (h2 + i3 * (a2 % 4)), v2 += 2;
                  }
                return { value: A2, binLen: 8 * v2 + e3 };
              }(n2, e2, r2, t3, i2);
            };
          case "B64":
            return function(r2, t3, e3) {
              return function(r3, t4, e4, i3) {
                var o2, u2, f2, w2, s2, a2, h2 = 0, c2 = t4 || [0], v2 = (e4 = e4 || 0) >>> 3, A2 = i3 === -1 ? 3 : 0, E2 = r3.indexOf("=");
                if (r3.search(/^[a-zA-Z0-9=+/]+$/) === -1)
                  throw new Error("Invalid character in base-64 string");
                if (r3 = r3.replace(/=/g, ""), E2 !== -1 && E2 < r3.length)
                  throw new Error("Invalid '=' found in base-64 string");
                for (o2 = 0; o2 < r3.length; o2 += 4) {
                  for (w2 = r3.substr(o2, 4), f2 = 0, u2 = 0; u2 < w2.length; u2 += 1)
                    f2 |= n.indexOf(w2.charAt(u2)) << 18 - 6 * u2;
                  for (u2 = 0; u2 < w2.length - 1; u2 += 1) {
                    for (s2 = (a2 = h2 + v2) >>> 2; c2.length <= s2; )
                      c2.push(0);
                    c2[s2] |= (f2 >>> 16 - 8 * u2 & 255) << 8 * (A2 + i3 * (a2 % 4)), h2 += 1;
                  }
                }
                return { value: c2, binLen: 8 * h2 + e4 };
              }(r2, t3, e3, i2);
            };
          case "BYTES":
            return function(n2, r2, t3) {
              return function(n3, r3, t4, e3) {
                var i3, o2, u2, f2, w2 = r3 || [0], s2 = (t4 = t4 || 0) >>> 3, a2 = e3 === -1 ? 3 : 0;
                for (o2 = 0; o2 < n3.length; o2 += 1)
                  i3 = n3.charCodeAt(o2), u2 = (f2 = o2 + s2) >>> 2, w2.length <= u2 && w2.push(0), w2[u2] |= i3 << 8 * (a2 + e3 * (f2 % 4));
                return { value: w2, binLen: 8 * n3.length + t4 };
              }(n2, r2, t3, i2);
            };
          case "ARRAYBUFFER":
            try {
              new ArrayBuffer(0);
            } catch (n2) {
              throw new Error("ARRAYBUFFER not supported by this environment");
            }
            return function(n2, t3, e3) {
              return function(n3, t4, e4, i3) {
                return r(new Uint8Array(n3), t4, e4, i3);
              }(n2, t3, e3, i2);
            };
          case "UINT8ARRAY":
            try {
              new Uint8Array(0);
            } catch (n2) {
              throw new Error("UINT8ARRAY not supported by this environment");
            }
            return function(n2, t3, e3) {
              return r(n2, t3, e3, i2);
            };
          default:
            throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
        }
      }
      function e(r2, t2, e2, i2) {
        switch (r2) {
          case "HEX":
            return function(n2) {
              return function(n3, r3, t3, e3) {
                var i3, o2, u2 = "", f2 = r3 / 8, w2 = t3 === -1 ? 3 : 0;
                for (i3 = 0; i3 < f2; i3 += 1)
                  o2 = n3[i3 >>> 2] >>> 8 * (w2 + t3 * (i3 % 4)), u2 += "0123456789abcdef".charAt(o2 >>> 4 & 15) + "0123456789abcdef".charAt(15 & o2);
                return e3.outputUpper ? u2.toUpperCase() : u2;
              }(n2, t2, e2, i2);
            };
          case "B64":
            return function(r3) {
              return function(r4, t3, e3, i3) {
                var o2, u2, f2, w2, s2, a2 = "", h2 = t3 / 8, c2 = e3 === -1 ? 3 : 0;
                for (o2 = 0; o2 < h2; o2 += 3)
                  for (w2 = o2 + 1 < h2 ? r4[o2 + 1 >>> 2] : 0, s2 = o2 + 2 < h2 ? r4[o2 + 2 >>> 2] : 0, f2 = (r4[o2 >>> 2] >>> 8 * (c2 + e3 * (o2 % 4)) & 255) << 16 | (w2 >>> 8 * (c2 + e3 * ((o2 + 1) % 4)) & 255) << 8 | s2 >>> 8 * (c2 + e3 * ((o2 + 2) % 4)) & 255, u2 = 0; u2 < 4; u2 += 1)
                    a2 += 8 * o2 + 6 * u2 <= t3 ? n.charAt(f2 >>> 6 * (3 - u2) & 63) : i3.b64Pad;
                return a2;
              }(r3, t2, e2, i2);
            };
          case "BYTES":
            return function(n2) {
              return function(n3, r3, t3) {
                var e3, i3, o2 = "", u2 = r3 / 8, f2 = t3 === -1 ? 3 : 0;
                for (e3 = 0; e3 < u2; e3 += 1)
                  i3 = n3[e3 >>> 2] >>> 8 * (f2 + t3 * (e3 % 4)) & 255, o2 += String.fromCharCode(i3);
                return o2;
              }(n2, t2, e2);
            };
          case "ARRAYBUFFER":
            try {
              new ArrayBuffer(0);
            } catch (n2) {
              throw new Error("ARRAYBUFFER not supported by this environment");
            }
            return function(n2) {
              return function(n3, r3, t3) {
                var e3, i3 = r3 / 8, o2 = new ArrayBuffer(i3), u2 = new Uint8Array(o2), f2 = t3 === -1 ? 3 : 0;
                for (e3 = 0; e3 < i3; e3 += 1)
                  u2[e3] = n3[e3 >>> 2] >>> 8 * (f2 + t3 * (e3 % 4)) & 255;
                return o2;
              }(n2, t2, e2);
            };
          case "UINT8ARRAY":
            try {
              new Uint8Array(0);
            } catch (n2) {
              throw new Error("UINT8ARRAY not supported by this environment");
            }
            return function(n2) {
              return function(n3, r3, t3) {
                var e3, i3 = r3 / 8, o2 = t3 === -1 ? 3 : 0, u2 = new Uint8Array(i3);
                for (e3 = 0; e3 < i3; e3 += 1)
                  u2[e3] = n3[e3 >>> 2] >>> 8 * (o2 + t3 * (e3 % 4)) & 255;
                return u2;
              }(n2, t2, e2);
            };
          default:
            throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
        }
      }
      var i = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], o = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], u = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], f = "Chosen SHA variant is not supported";
      function w(n2, r2) {
        var t2, e2, i2 = n2.binLen >>> 3, o2 = r2.binLen >>> 3, u2 = i2 << 3, f2 = 4 - i2 << 3;
        if (i2 % 4 != 0) {
          for (t2 = 0; t2 < o2; t2 += 4)
            e2 = i2 + t2 >>> 2, n2.value[e2] |= r2.value[t2 >>> 2] << u2, n2.value.push(0), n2.value[e2 + 1] |= r2.value[t2 >>> 2] >>> f2;
          return (n2.value.length << 2) - 4 >= o2 + i2 && n2.value.pop(), { value: n2.value, binLen: n2.binLen + r2.binLen };
        }
        return { value: n2.value.concat(r2.value), binLen: n2.binLen + r2.binLen };
      }
      function s(n2) {
        var r2 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, t2 = n2 || {}, e2 = "Output length must be a multiple of 8";
        if (r2.outputUpper = t2.outputUpper || false, t2.b64Pad && (r2.b64Pad = t2.b64Pad), t2.outputLen) {
          if (t2.outputLen % 8 != 0)
            throw new Error(e2);
          r2.outputLen = t2.outputLen;
        } else if (t2.shakeLen) {
          if (t2.shakeLen % 8 != 0)
            throw new Error(e2);
          r2.outputLen = t2.shakeLen;
        }
        if (typeof r2.outputUpper != "boolean")
          throw new Error("Invalid outputUpper formatting option");
        if (typeof r2.b64Pad != "string")
          throw new Error("Invalid b64Pad formatting option");
        return r2;
      }
      function a(n2, r2, e2, i2) {
        var o2 = n2 + " must include a value and format";
        if (!r2) {
          if (!i2)
            throw new Error(o2);
          return i2;
        }
        if (r2.value === void 0 || !r2.format)
          throw new Error(o2);
        return t(r2.format, r2.encoding || "UTF8", e2)(r2.value);
      }
      var h = function() {
        function n2(n3, r2, t2) {
          var e2 = t2 || {};
          if (this.t = r2, this.i = e2.encoding || "UTF8", this.numRounds = e2.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
            throw new Error("numRounds must a integer >= 1");
          this.o = n3, this.u = [], this.s = 0, this.h = false, this.v = 0, this.A = false, this.l = [], this.H = [];
        }
        return n2.prototype.update = function(n3) {
          var r2, t2 = 0, e2 = this.S >>> 5, i2 = this.p(n3, this.u, this.s), o2 = i2.binLen, u2 = i2.value, f2 = o2 >>> 5;
          for (r2 = 0; r2 < f2; r2 += e2)
            t2 + this.S <= o2 && (this.m = this.R(u2.slice(r2, r2 + e2), this.m), t2 += this.S);
          this.v += t2, this.u = u2.slice(t2 >>> 5), this.s = o2 % this.S, this.h = true;
        }, n2.prototype.getHash = function(n3, r2) {
          var t2, i2, o2 = this.U, u2 = s(r2);
          if (this.T) {
            if (u2.outputLen === -1)
              throw new Error("Output length must be specified in options");
            o2 = u2.outputLen;
          }
          var f2 = e(n3, o2, this.C, u2);
          if (this.A && this.F)
            return f2(this.F(u2));
          for (i2 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), o2), t2 = 1; t2 < this.numRounds; t2 += 1)
            this.T && o2 % 32 != 0 && (i2[i2.length - 1] &= 16777215 >>> 24 - o2 % 32), i2 = this.K(i2, o2, 0, this.L(this.o), o2);
          return f2(i2);
        }, n2.prototype.setHMACKey = function(n3, r2, e2) {
          if (!this.g)
            throw new Error("Variant does not support HMAC");
          if (this.h)
            throw new Error("Cannot set MAC key after calling update");
          var i2 = t(r2, (e2 || {}).encoding || "UTF8", this.C);
          this.k(i2(n3));
        }, n2.prototype.k = function(n3) {
          var r2, t2 = this.S >>> 3, e2 = t2 / 4 - 1;
          if (this.numRounds !== 1)
            throw new Error("Cannot set numRounds with MAC");
          if (this.A)
            throw new Error("MAC key already set");
          for (t2 < n3.binLen / 8 && (n3.value = this.K(n3.value, n3.binLen, 0, this.L(this.o), this.U)); n3.value.length <= e2; )
            n3.value.push(0);
          for (r2 = 0; r2 <= e2; r2 += 1)
            this.l[r2] = 909522486 ^ n3.value[r2], this.H[r2] = 1549556828 ^ n3.value[r2];
          this.m = this.R(this.l, this.m), this.v = this.S, this.A = true;
        }, n2.prototype.getHMAC = function(n3, r2) {
          var t2 = s(r2);
          return e(n3, this.U, this.C, t2)(this.Y());
        }, n2.prototype.Y = function() {
          var n3;
          if (!this.A)
            throw new Error("Cannot call getHMAC without first setting MAC key");
          var r2 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), this.U);
          return n3 = this.R(this.H, this.L(this.o)), n3 = this.K(r2, this.U, this.S, n3, this.U);
        }, n2;
      }(), c = function(n2, r2) {
        return (c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, r3) {
          n3.__proto__ = r3;
        } || function(n3, r3) {
          for (var t2 in r3)
            Object.prototype.hasOwnProperty.call(r3, t2) && (n3[t2] = r3[t2]);
        })(n2, r2);
      };
      function v(n2, r2) {
        function t2() {
          this.constructor = n2;
        }
        c(n2, r2), n2.prototype = r2 === null ? Object.create(r2) : (t2.prototype = r2.prototype, new t2());
      }
      function A(n2, r2) {
        return n2 << r2 | n2 >>> 32 - r2;
      }
      function E(n2, r2) {
        return n2 >>> r2 | n2 << 32 - r2;
      }
      function l(n2, r2) {
        return n2 >>> r2;
      }
      function b(n2, r2, t2) {
        return n2 ^ r2 ^ t2;
      }
      function H(n2, r2, t2) {
        return n2 & r2 ^ ~n2 & t2;
      }
      function d(n2, r2, t2) {
        return n2 & r2 ^ n2 & t2 ^ r2 & t2;
      }
      function S(n2) {
        return E(n2, 2) ^ E(n2, 13) ^ E(n2, 22);
      }
      function p(n2, r2) {
        var t2 = (65535 & n2) + (65535 & r2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16)) << 16 | 65535 & t2;
      }
      function m(n2, r2, t2, e2) {
        var i2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16)) << 16 | 65535 & i2;
      }
      function y(n2, r2, t2, e2, i2) {
        var o2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2) + (65535 & i2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16) + (o2 >>> 16)) << 16 | 65535 & o2;
      }
      function R(n2) {
        return E(n2, 7) ^ E(n2, 18) ^ l(n2, 3);
      }
      function U(n2) {
        return E(n2, 6) ^ E(n2, 11) ^ E(n2, 25);
      }
      function T(n2) {
        return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      }
      function C(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2 = [];
        for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], w2 = 0; w2 < 80; w2 += 1)
          s2[w2] = w2 < 16 ? n2[w2] : A(s2[w2 - 3] ^ s2[w2 - 8] ^ s2[w2 - 14] ^ s2[w2 - 16], 1), f2 = w2 < 20 ? y(A(t2, 5), H(e2, i2, o2), u2, 1518500249, s2[w2]) : w2 < 40 ? y(A(t2, 5), b(e2, i2, o2), u2, 1859775393, s2[w2]) : w2 < 60 ? y(A(t2, 5), d(e2, i2, o2), u2, 2400959708, s2[w2]) : y(A(t2, 5), b(e2, i2, o2), u2, 3395469782, s2[w2]), u2 = o2, o2 = i2, i2 = A(e2, 30), e2 = t2, t2 = f2;
        return r2[0] = p(t2, r2[0]), r2[1] = p(e2, r2[1]), r2[2] = p(i2, r2[2]), r2[3] = p(o2, r2[3]), r2[4] = p(u2, r2[4]), r2;
      }
      function F(n2, r2, t2, e2) {
        for (var i2, o2 = 15 + (r2 + 65 >>> 9 << 4), u2 = r2 + t2; n2.length <= o2; )
          n2.push(0);
        for (n2[r2 >>> 5] |= 128 << 24 - r2 % 32, n2[o2] = 4294967295 & u2, n2[o2 - 1] = u2 / 4294967296 | 0, i2 = 0; i2 < n2.length; i2 += 16)
          e2 = C(n2.slice(i2, i2 + 16), e2);
        return e2;
      }
      var K = function(n2) {
        function r2(r3, e2, i2) {
          var o2 = this;
          if (r3 !== "SHA-1")
            throw new Error(f);
          var u2 = i2 || {};
          return (o2 = n2.call(this, r3, e2, i2) || this).g = true, o2.F = o2.Y, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = C, o2.B = function(n3) {
            return n3.slice();
          }, o2.L = T, o2.K = F, o2.m = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], o2.S = 512, o2.U = 160, o2.T = false, u2.hmacKey && o2.k(a("hmacKey", u2.hmacKey, o2.C)), o2;
        }
        return v(r2, n2), r2;
      }(h);
      function B(n2) {
        return n2 == "SHA-224" ? o.slice() : u.slice();
      }
      function L(n2, r2) {
        var t2, e2, o2, u2, f2, w2, s2, a2, h2, c2, v2, A2, b2 = [];
        for (t2 = r2[0], e2 = r2[1], o2 = r2[2], u2 = r2[3], f2 = r2[4], w2 = r2[5], s2 = r2[6], a2 = r2[7], v2 = 0; v2 < 64; v2 += 1)
          b2[v2] = v2 < 16 ? n2[v2] : m(E(A2 = b2[v2 - 2], 17) ^ E(A2, 19) ^ l(A2, 10), b2[v2 - 7], R(b2[v2 - 15]), b2[v2 - 16]), h2 = y(a2, U(f2), H(f2, w2, s2), i[v2], b2[v2]), c2 = p(S(t2), d(t2, e2, o2)), a2 = s2, s2 = w2, w2 = f2, f2 = p(u2, h2), u2 = o2, o2 = e2, e2 = t2, t2 = p(h2, c2);
        return r2[0] = p(t2, r2[0]), r2[1] = p(e2, r2[1]), r2[2] = p(o2, r2[2]), r2[3] = p(u2, r2[3]), r2[4] = p(f2, r2[4]), r2[5] = p(w2, r2[5]), r2[6] = p(s2, r2[6]), r2[7] = p(a2, r2[7]), r2;
      }
      var g = function(n2) {
        function r2(r3, e2, i2) {
          var o2 = this;
          if (r3 !== "SHA-224" && r3 !== "SHA-256")
            throw new Error(f);
          var u2 = i2 || {};
          return (o2 = n2.call(this, r3, e2, i2) || this).F = o2.Y, o2.g = true, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = L, o2.B = function(n3) {
            return n3.slice();
          }, o2.L = B, o2.K = function(n3, t2, e3, i3) {
            return function(n4, r4, t3, e4, i4) {
              for (var o3, u3 = 15 + (r4 + 65 >>> 9 << 4), f2 = r4 + t3; n4.length <= u3; )
                n4.push(0);
              for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[u3] = 4294967295 & f2, n4[u3 - 1] = f2 / 4294967296 | 0, o3 = 0; o3 < n4.length; o3 += 16)
                e4 = L(n4.slice(o3, o3 + 16), e4);
              return i4 === "SHA-224" ? [e4[0], e4[1], e4[2], e4[3], e4[4], e4[5], e4[6]] : e4;
            }(n3, t2, e3, i3, r3);
          }, o2.m = B(r3), o2.S = 512, o2.U = r3 === "SHA-224" ? 224 : 256, o2.T = false, u2.hmacKey && o2.k(a("hmacKey", u2.hmacKey, o2.C)), o2;
        }
        return v(r2, n2), r2;
      }(h), k = function(n2, r2) {
        this.N = n2, this.I = r2;
      };
      function Y(n2, r2) {
        var t2;
        return r2 > 32 ? (t2 = 64 - r2, new k(n2.I << r2 | n2.N >>> t2, n2.N << r2 | n2.I >>> t2)) : r2 !== 0 ? (t2 = 32 - r2, new k(n2.N << r2 | n2.I >>> t2, n2.I << r2 | n2.N >>> t2)) : n2;
      }
      function N(n2, r2) {
        var t2;
        return r2 < 32 ? (t2 = 32 - r2, new k(n2.N >>> r2 | n2.I << t2, n2.I >>> r2 | n2.N << t2)) : (t2 = 64 - r2, new k(n2.I >>> r2 | n2.N << t2, n2.N >>> r2 | n2.I << t2));
      }
      function I(n2, r2) {
        return new k(n2.N >>> r2, n2.I >>> r2 | n2.N << 32 - r2);
      }
      function M(n2, r2, t2) {
        return new k(n2.N & r2.N ^ ~n2.N & t2.N, n2.I & r2.I ^ ~n2.I & t2.I);
      }
      function X(n2, r2, t2) {
        return new k(n2.N & r2.N ^ n2.N & t2.N ^ r2.N & t2.N, n2.I & r2.I ^ n2.I & t2.I ^ r2.I & t2.I);
      }
      function z2(n2) {
        var r2 = N(n2, 28), t2 = N(n2, 34), e2 = N(n2, 39);
        return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
      }
      function O(n2, r2) {
        var t2, e2;
        t2 = (65535 & n2.I) + (65535 & r2.I);
        var i2 = (65535 & (e2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2 >>> 16))) << 16 | 65535 & t2;
        return t2 = (65535 & n2.N) + (65535 & r2.N) + (e2 >>> 16), e2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2 >>> 16), new k((65535 & e2) << 16 | 65535 & t2, i2);
      }
      function j(n2, r2, t2, e2) {
        var i2, o2;
        i2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I);
        var u2 = (65535 & (o2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2 >>> 16))) << 16 | 65535 & i2;
        return i2 = (65535 & n2.N) + (65535 & r2.N) + (65535 & t2.N) + (65535 & e2.N) + (o2 >>> 16), o2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2.N >>> 16) + (e2.N >>> 16) + (i2 >>> 16), new k((65535 & o2) << 16 | 65535 & i2, u2);
      }
      function _(n2, r2, t2, e2, i2) {
        var o2, u2;
        o2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I) + (65535 & i2.I);
        var f2 = (65535 & (u2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2.I >>> 16) + (o2 >>> 16))) << 16 | 65535 & o2;
        return o2 = (65535 & n2.N) + (65535 & r2.N) + (65535 & t2.N) + (65535 & e2.N) + (65535 & i2.N) + (u2 >>> 16), u2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2.N >>> 16) + (e2.N >>> 16) + (i2.N >>> 16) + (o2 >>> 16), new k((65535 & u2) << 16 | 65535 & o2, f2);
      }
      function P(n2, r2) {
        return new k(n2.N ^ r2.N, n2.I ^ r2.I);
      }
      function x(n2) {
        var r2 = N(n2, 1), t2 = N(n2, 8), e2 = I(n2, 7);
        return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
      }
      function V(n2) {
        var r2 = N(n2, 14), t2 = N(n2, 18), e2 = N(n2, 41);
        return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
      }
      var Z = [new k(i[0], 3609767458), new k(i[1], 602891725), new k(i[2], 3964484399), new k(i[3], 2173295548), new k(i[4], 4081628472), new k(i[5], 3053834265), new k(i[6], 2937671579), new k(i[7], 3664609560), new k(i[8], 2734883394), new k(i[9], 1164996542), new k(i[10], 1323610764), new k(i[11], 3590304994), new k(i[12], 4068182383), new k(i[13], 991336113), new k(i[14], 633803317), new k(i[15], 3479774868), new k(i[16], 2666613458), new k(i[17], 944711139), new k(i[18], 2341262773), new k(i[19], 2007800933), new k(i[20], 1495990901), new k(i[21], 1856431235), new k(i[22], 3175218132), new k(i[23], 2198950837), new k(i[24], 3999719339), new k(i[25], 766784016), new k(i[26], 2566594879), new k(i[27], 3203337956), new k(i[28], 1034457026), new k(i[29], 2466948901), new k(i[30], 3758326383), new k(i[31], 168717936), new k(i[32], 1188179964), new k(i[33], 1546045734), new k(i[34], 1522805485), new k(i[35], 2643833823), new k(i[36], 2343527390), new k(i[37], 1014477480), new k(i[38], 1206759142), new k(i[39], 344077627), new k(i[40], 1290863460), new k(i[41], 3158454273), new k(i[42], 3505952657), new k(i[43], 106217008), new k(i[44], 3606008344), new k(i[45], 1432725776), new k(i[46], 1467031594), new k(i[47], 851169720), new k(i[48], 3100823752), new k(i[49], 1363258195), new k(i[50], 3750685593), new k(i[51], 3785050280), new k(i[52], 3318307427), new k(i[53], 3812723403), new k(i[54], 2003034995), new k(i[55], 3602036899), new k(i[56], 1575990012), new k(i[57], 1125592928), new k(i[58], 2716904306), new k(i[59], 442776044), new k(i[60], 593698344), new k(i[61], 3733110249), new k(i[62], 2999351573), new k(i[63], 3815920427), new k(3391569614, 3928383900), new k(3515267271, 566280711), new k(3940187606, 3454069534), new k(4118630271, 4000239992), new k(116418474, 1914138554), new k(174292421, 2731055270), new k(289380356, 3203993006), new k(460393269, 320620315), new k(685471733, 587496836), new k(852142971, 1086792851), new k(1017036298, 365543100), new k(1126000580, 2618297676), new k(1288033470, 3409855158), new k(1501505948, 4234509866), new k(1607167915, 987167468), new k(1816402316, 1246189591)];
      function q(n2) {
        return n2 === "SHA-384" ? [new k(3418070365, o[0]), new k(1654270250, o[1]), new k(2438529370, o[2]), new k(355462360, o[3]), new k(1731405415, o[4]), new k(41048885895, o[5]), new k(3675008525, o[6]), new k(1203062813, o[7])] : [new k(u[0], 4089235720), new k(u[1], 2227873595), new k(u[2], 4271175723), new k(u[3], 1595750129), new k(u[4], 2917565137), new k(u[5], 725511199), new k(u[6], 4215389547), new k(u[7], 327033209)];
      }
      function D(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2, a2, h2, c2, v2, A2, E2, l2, b2, H2 = [];
        for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], f2 = r2[5], w2 = r2[6], s2 = r2[7], c2 = 0; c2 < 80; c2 += 1)
          c2 < 16 ? (v2 = 2 * c2, H2[c2] = new k(n2[v2], n2[v2 + 1])) : H2[c2] = j((A2 = H2[c2 - 2], E2 = void 0, l2 = void 0, b2 = void 0, E2 = N(A2, 19), l2 = N(A2, 61), b2 = I(A2, 6), new k(E2.N ^ l2.N ^ b2.N, E2.I ^ l2.I ^ b2.I)), H2[c2 - 7], x(H2[c2 - 15]), H2[c2 - 16]), a2 = _(s2, V(u2), M(u2, f2, w2), Z[c2], H2[c2]), h2 = O(z2(t2), X(t2, e2, i2)), s2 = w2, w2 = f2, f2 = u2, u2 = O(o2, a2), o2 = i2, i2 = e2, e2 = t2, t2 = O(a2, h2);
        return r2[0] = O(t2, r2[0]), r2[1] = O(e2, r2[1]), r2[2] = O(i2, r2[2]), r2[3] = O(o2, r2[3]), r2[4] = O(u2, r2[4]), r2[5] = O(f2, r2[5]), r2[6] = O(w2, r2[6]), r2[7] = O(s2, r2[7]), r2;
      }
      var G = function(n2) {
        function r2(r3, e2, i2) {
          var o2 = this;
          if (r3 !== "SHA-384" && r3 !== "SHA-512")
            throw new Error(f);
          var u2 = i2 || {};
          return (o2 = n2.call(this, r3, e2, i2) || this).F = o2.Y, o2.g = true, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = D, o2.B = function(n3) {
            return n3.slice();
          }, o2.L = q, o2.K = function(n3, t2, e3, i3) {
            return function(n4, r4, t3, e4, i4) {
              for (var o3, u3 = 31 + (r4 + 129 >>> 10 << 5), f2 = r4 + t3; n4.length <= u3; )
                n4.push(0);
              for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[u3] = 4294967295 & f2, n4[u3 - 1] = f2 / 4294967296 | 0, o3 = 0; o3 < n4.length; o3 += 32)
                e4 = D(n4.slice(o3, o3 + 32), e4);
              return i4 === "SHA-384" ? [(e4 = e4)[0].N, e4[0].I, e4[1].N, e4[1].I, e4[2].N, e4[2].I, e4[3].N, e4[3].I, e4[4].N, e4[4].I, e4[5].N, e4[5].I] : [e4[0].N, e4[0].I, e4[1].N, e4[1].I, e4[2].N, e4[2].I, e4[3].N, e4[3].I, e4[4].N, e4[4].I, e4[5].N, e4[5].I, e4[6].N, e4[6].I, e4[7].N, e4[7].I];
            }(n3, t2, e3, i3, r3);
          }, o2.m = q(r3), o2.S = 1024, o2.U = r3 === "SHA-384" ? 384 : 512, o2.T = false, u2.hmacKey && o2.k(a("hmacKey", u2.hmacKey, o2.C)), o2;
        }
        return v(r2, n2), r2;
      }(h), J = [new k(0, 1), new k(0, 32898), new k(2147483648, 32906), new k(2147483648, 2147516416), new k(0, 32907), new k(0, 2147483649), new k(2147483648, 2147516545), new k(2147483648, 32777), new k(0, 138), new k(0, 136), new k(0, 2147516425), new k(0, 2147483658), new k(0, 2147516555), new k(2147483648, 139), new k(2147483648, 32905), new k(2147483648, 32771), new k(2147483648, 32770), new k(2147483648, 128), new k(0, 32778), new k(2147483648, 2147483658), new k(2147483648, 2147516545), new k(2147483648, 32896), new k(0, 2147483649), new k(2147483648, 2147516424)], Q = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
      function W(n2) {
        var r2, t2 = [];
        for (r2 = 0; r2 < 5; r2 += 1)
          t2[r2] = [new k(0, 0), new k(0, 0), new k(0, 0), new k(0, 0), new k(0, 0)];
        return t2;
      }
      function $(n2) {
        var r2, t2 = [];
        for (r2 = 0; r2 < 5; r2 += 1)
          t2[r2] = n2[r2].slice();
        return t2;
      }
      function nn(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2, a2, h2 = [], c2 = [];
        if (n2 !== null)
          for (e2 = 0; e2 < n2.length; e2 += 2)
            r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0] = P(r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0], new k(n2[e2 + 1], n2[e2]));
        for (t2 = 0; t2 < 24; t2 += 1) {
          for (o2 = W(), e2 = 0; e2 < 5; e2 += 1)
            h2[e2] = (u2 = r2[e2][0], f2 = r2[e2][1], w2 = r2[e2][2], s2 = r2[e2][3], a2 = r2[e2][4], new k(u2.N ^ f2.N ^ w2.N ^ s2.N ^ a2.N, u2.I ^ f2.I ^ w2.I ^ s2.I ^ a2.I));
          for (e2 = 0; e2 < 5; e2 += 1)
            c2[e2] = P(h2[(e2 + 4) % 5], Y(h2[(e2 + 1) % 5], 1));
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              r2[e2][i2] = P(r2[e2][i2], c2[e2]);
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              o2[i2][(2 * e2 + 3 * i2) % 5] = Y(r2[e2][i2], Q[e2][i2]);
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              r2[e2][i2] = P(o2[e2][i2], new k(~o2[(e2 + 1) % 5][i2].N & o2[(e2 + 2) % 5][i2].N, ~o2[(e2 + 1) % 5][i2].I & o2[(e2 + 2) % 5][i2].I));
          r2[0][0] = P(r2[0][0], J[t2]);
        }
        return r2;
      }
      function rn(n2) {
        var r2, t2, e2 = 0, i2 = [0, 0], o2 = [4294967295 & n2, n2 / 4294967296 & 2097151];
        for (r2 = 6; r2 >= 0; r2--)
          (t2 = o2[r2 >> 2] >>> 8 * r2 & 255) === 0 && e2 === 0 || (i2[e2 + 1 >> 2] |= t2 << 8 * (e2 + 1), e2 += 1);
        return e2 = e2 !== 0 ? e2 : 1, i2[0] |= e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
      }
      function tn(n2) {
        return w(rn(n2.binLen), n2);
      }
      function en(n2, r2) {
        var t2, e2 = rn(r2), i2 = r2 >>> 2, o2 = (i2 - (e2 = w(e2, n2)).value.length % i2) % i2;
        for (t2 = 0; t2 < o2; t2++)
          e2.value.push(0);
        return e2.value;
      }
      var on = function(n2) {
        function r2(r3, e2, i2) {
          var o2 = this, u2 = 6, w2 = 0, s2 = i2 || {};
          if ((o2 = n2.call(this, r3, e2, i2) || this).numRounds !== 1) {
            if (s2.kmacKey || s2.hmacKey)
              throw new Error("Cannot set numRounds with MAC");
            if (o2.o === "CSHAKE128" || o2.o === "CSHAKE256")
              throw new Error("Cannot set numRounds for CSHAKE variants");
          }
          switch (o2.C = 1, o2.p = t(o2.t, o2.i, o2.C), o2.R = nn, o2.B = $, o2.L = W, o2.m = W(), o2.T = false, r3) {
            case "SHA3-224":
              o2.S = w2 = 1152, o2.U = 224, o2.g = true, o2.F = o2.Y;
              break;
            case "SHA3-256":
              o2.S = w2 = 1088, o2.U = 256, o2.g = true, o2.F = o2.Y;
              break;
            case "SHA3-384":
              o2.S = w2 = 832, o2.U = 384, o2.g = true, o2.F = o2.Y;
              break;
            case "SHA3-512":
              o2.S = w2 = 576, o2.U = 512, o2.g = true, o2.F = o2.Y;
              break;
            case "SHAKE128":
              u2 = 31, o2.S = w2 = 1344, o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
              break;
            case "SHAKE256":
              u2 = 31, o2.S = w2 = 1088, o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
              break;
            case "KMAC128":
              u2 = 4, o2.S = w2 = 1344, o2.M(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = o2.X;
              break;
            case "KMAC256":
              u2 = 4, o2.S = w2 = 1088, o2.M(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = o2.X;
              break;
            case "CSHAKE128":
              o2.S = w2 = 1344, u2 = o2.O(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
              break;
            case "CSHAKE256":
              o2.S = w2 = 1088, u2 = o2.O(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
              break;
            default:
              throw new Error(f);
          }
          return o2.K = function(n3, r4, t2, e3, i3) {
            return function(n4, r5, t3, e4, i4, o3, u3) {
              var f2, w3, s3 = 0, a2 = [], h2 = i4 >>> 5, c2 = r5 >>> 5;
              for (f2 = 0; f2 < c2 && r5 >= i4; f2 += h2)
                e4 = nn(n4.slice(f2, f2 + h2), e4), r5 -= i4;
              for (n4 = n4.slice(f2), r5 %= i4; n4.length < h2; )
                n4.push(0);
              for (n4[(f2 = r5 >>> 3) >> 2] ^= o3 << f2 % 4 * 8, n4[h2 - 1] ^= 2147483648, e4 = nn(n4, e4); 32 * a2.length < u3 && (w3 = e4[s3 % 5][s3 / 5 | 0], a2.push(w3.I), !(32 * a2.length >= u3)); )
                a2.push(w3.N), 64 * (s3 += 1) % i4 == 0 && (nn(null, e4), s3 = 0);
              return a2;
            }(n3, r4, 0, e3, w2, u2, i3);
          }, s2.hmacKey && o2.k(a("hmacKey", s2.hmacKey, o2.C)), o2;
        }
        return v(r2, n2), r2.prototype.O = function(n3, r3) {
          var t2 = function(n4) {
            var r4 = n4 || {};
            return { funcName: a("funcName", r4.funcName, 1, { value: [], binLen: 0 }), customization: a("Customization", r4.customization, 1, { value: [], binLen: 0 }) };
          }(n3 || {});
          r3 && (t2.funcName = r3);
          var e2 = w(tn(t2.funcName), tn(t2.customization));
          if (t2.customization.binLen !== 0 || t2.funcName.binLen !== 0) {
            for (var i2 = en(e2, this.S >>> 3), o2 = 0; o2 < i2.length; o2 += this.S >>> 5)
              this.m = this.R(i2.slice(o2, o2 + (this.S >>> 5)), this.m), this.v += this.S;
            return 4;
          }
          return 31;
        }, r2.prototype.M = function(n3) {
          var r3 = function(n4) {
            var r4 = n4 || {};
            return { kmacKey: a("kmacKey", r4.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: a("Customization", r4.customization, 1, { value: [], binLen: 0 }) };
          }(n3 || {});
          this.O(n3, r3.funcName);
          for (var t2 = en(tn(r3.kmacKey), this.S >>> 3), e2 = 0; e2 < t2.length; e2 += this.S >>> 5)
            this.m = this.R(t2.slice(e2, e2 + (this.S >>> 5)), this.m), this.v += this.S;
          this.A = true;
        }, r2.prototype.X = function(n3) {
          var r3 = w({ value: this.u.slice(), binLen: this.s }, function(n4) {
            var r4, t2, e2 = 0, i2 = [0, 0], o2 = [4294967295 & n4, n4 / 4294967296 & 2097151];
            for (r4 = 6; r4 >= 0; r4--)
              (t2 = o2[r4 >> 2] >>> 8 * r4 & 255) == 0 && e2 === 0 || (i2[e2 >> 2] |= t2 << 8 * e2, e2 += 1);
            return i2[(e2 = e2 !== 0 ? e2 : 1) >> 2] |= e2 << 8 * e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
          }(n3.outputLen));
          return this.K(r3.value, r3.binLen, this.v, this.B(this.m), n3.outputLen);
        }, r2;
      }(h);
      return function() {
        function n2(n3, r2, t2) {
          if (n3 == "SHA-1")
            this.j = new K(n3, r2, t2);
          else if (n3 == "SHA-224" || n3 == "SHA-256")
            this.j = new g(n3, r2, t2);
          else if (n3 == "SHA-384" || n3 == "SHA-512")
            this.j = new G(n3, r2, t2);
          else {
            if (n3 != "SHA3-224" && n3 != "SHA3-256" && n3 != "SHA3-384" && n3 != "SHA3-512" && n3 != "SHAKE128" && n3 != "SHAKE256" && n3 != "CSHAKE128" && n3 != "CSHAKE256" && n3 != "KMAC128" && n3 != "KMAC256")
              throw new Error(f);
            this.j = new on(n3, r2, t2);
          }
        }
        return n2.prototype.update = function(n3) {
          this.j.update(n3);
        }, n2.prototype.getHash = function(n3, r2) {
          return this.j.getHash(n3, r2);
        }, n2.prototype.setHMACKey = function(n3, r2, t2) {
          this.j.setHMACKey(n3, r2, t2);
        }, n2.prototype.getHMAC = function(n3, r2) {
          return this.j.getHMAC(n3, r2);
        }, n2;
      }();
    });
  }
});

// node_modules/@ton/crypto-primitives/dist/browser/getSecureRandom.js
var require_getSecureRandom = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser/getSecureRandom.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSecureRandomWords = exports.getSecureRandomBytes = void 0;
    function getSecureRandomBytes(size) {
      return Buffer.from(window.crypto.getRandomValues(new Uint8Array(size)));
    }
    exports.getSecureRandomBytes = getSecureRandomBytes;
    function getSecureRandomWords(size) {
      return window.crypto.getRandomValues(new Uint16Array(size));
    }
    exports.getSecureRandomWords = getSecureRandomWords;
  }
});

// node_modules/@ton/crypto-primitives/dist/browser/hmac_sha512.js
var require_hmac_sha512 = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser/hmac_sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac_sha512 = void 0;
    async function hmac_sha512(key, data) {
      let keyBuffer = typeof key === "string" ? Buffer.from(key, "utf-8") : key;
      let dataBuffer = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
      const hmacAlgo = { name: "HMAC", hash: "SHA-512" };
      const hmacKey = await window.crypto.subtle.importKey("raw", keyBuffer, hmacAlgo, false, ["sign"]);
      return Buffer.from(await crypto.subtle.sign(hmacAlgo, hmacKey, dataBuffer));
    }
    exports.hmac_sha512 = hmac_sha512;
  }
});

// node_modules/@ton/crypto-primitives/dist/browser/pbkdf2_sha512.js
var require_pbkdf2_sha512 = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser/pbkdf2_sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pbkdf2_sha512 = void 0;
    async function pbkdf2_sha512(key, salt, iterations, keyLen) {
      const keyBuffer = typeof key === "string" ? Buffer.from(key, "utf-8") : key;
      const saltBuffer = typeof salt === "string" ? Buffer.from(salt, "utf-8") : salt;
      const pbkdf2_key = await window.crypto.subtle.importKey("raw", keyBuffer, { name: "PBKDF2" }, false, ["deriveBits"]);
      const derivedBits = await window.crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-512", salt: saltBuffer, iterations }, pbkdf2_key, keyLen * 8);
      return Buffer.from(derivedBits);
    }
    exports.pbkdf2_sha512 = pbkdf2_sha512;
  }
});

// node_modules/@ton/crypto-primitives/dist/browser/sha256.js
var require_sha256 = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser/sha256.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha256 = void 0;
    async function sha256(source) {
      if (typeof source === "string") {
        return Buffer.from(await crypto.subtle.digest("SHA-256", Buffer.from(source, "utf-8")));
      }
      return Buffer.from(await crypto.subtle.digest("SHA-256", source));
    }
    exports.sha256 = sha256;
  }
});

// node_modules/@ton/crypto-primitives/dist/browser/sha512.js
var require_sha512 = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser/sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha512 = void 0;
    async function sha512(source) {
      if (typeof source === "string") {
        return Buffer.from(await crypto.subtle.digest("SHA-512", Buffer.from(source, "utf-8")));
      }
      return Buffer.from(await crypto.subtle.digest("SHA-512", source));
    }
    exports.sha512 = sha512;
  }
});

// node_modules/@ton/crypto-primitives/dist/browser.js
var require_browser = __commonJS({
  "node_modules/@ton/crypto-primitives/dist/browser.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha512 = exports.sha256 = exports.pbkdf2_sha512 = exports.hmac_sha512 = exports.getSecureRandomWords = exports.getSecureRandomBytes = void 0;
    var getSecureRandom_1 = require_getSecureRandom();
    Object.defineProperty(exports, "getSecureRandomBytes", { enumerable: true, get: function() {
      return getSecureRandom_1.getSecureRandomBytes;
    } });
    Object.defineProperty(exports, "getSecureRandomWords", { enumerable: true, get: function() {
      return getSecureRandom_1.getSecureRandomWords;
    } });
    var hmac_sha512_1 = require_hmac_sha512();
    Object.defineProperty(exports, "hmac_sha512", { enumerable: true, get: function() {
      return hmac_sha512_1.hmac_sha512;
    } });
    var pbkdf2_sha512_1 = require_pbkdf2_sha512();
    Object.defineProperty(exports, "pbkdf2_sha512", { enumerable: true, get: function() {
      return pbkdf2_sha512_1.pbkdf2_sha512;
    } });
    var sha256_1 = require_sha256();
    Object.defineProperty(exports, "sha256", { enumerable: true, get: function() {
      return sha256_1.sha256;
    } });
    var sha512_1 = require_sha512();
    Object.defineProperty(exports, "sha512", { enumerable: true, get: function() {
      return sha512_1.sha512;
    } });
  }
});

// node_modules/@ton/crypto/dist/primitives/sha256.js
var require_sha2562 = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/sha256.js"(exports) {
    init_buffer_shim();
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha256 = exports.sha256_fallback = exports.sha256_sync = void 0;
    var jssha_1 = __importDefault(require_sha());
    var crypto_primitives_1 = require_browser();
    function sha256_sync(source) {
      let src;
      if (typeof source === "string") {
        src = Buffer.from(source, "utf-8").toString("hex");
      } else {
        src = source.toString("hex");
      }
      let hasher = new jssha_1.default("SHA-256", "HEX");
      hasher.update(src);
      let res = hasher.getHash("HEX");
      return Buffer.from(res, "hex");
    }
    exports.sha256_sync = sha256_sync;
    async function sha256_fallback(source) {
      return sha256_sync(source);
    }
    exports.sha256_fallback = sha256_fallback;
    function sha256(source) {
      return (0, crypto_primitives_1.sha256)(source);
    }
    exports.sha256 = sha256;
  }
});

// node_modules/@ton/crypto/dist/primitives/sha512.js
var require_sha5122 = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha512 = exports.sha512_fallback = exports.sha512_sync = void 0;
    var jssha_1 = __importDefault(require_sha());
    var crypto_primitives_1 = require_browser();
    function sha512_sync(source) {
      let src;
      if (typeof source === "string") {
        src = Buffer.from(source, "utf-8").toString("hex");
      } else {
        src = source.toString("hex");
      }
      let hasher = new jssha_1.default("SHA-512", "HEX");
      hasher.update(src);
      let res = hasher.getHash("HEX");
      return Buffer.from(res, "hex");
    }
    exports.sha512_sync = sha512_sync;
    async function sha512_fallback(source) {
      return sha512_sync(source);
    }
    exports.sha512_fallback = sha512_fallback;
    async function sha512(source) {
      return (0, crypto_primitives_1.sha512)(source);
    }
    exports.sha512 = sha512;
  }
});

// node_modules/@ton/crypto/dist/primitives/pbkdf2_sha512.js
var require_pbkdf2_sha5122 = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/pbkdf2_sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pbkdf2_sha512 = void 0;
    var crypto_primitives_1 = require_browser();
    function pbkdf2_sha512(key, salt, iterations, keyLen) {
      return (0, crypto_primitives_1.pbkdf2_sha512)(key, salt, iterations, keyLen);
    }
    exports.pbkdf2_sha512 = pbkdf2_sha512;
  }
});

// node_modules/@ton/crypto/dist/primitives/hmac_sha512.js
var require_hmac_sha5122 = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/hmac_sha512.js"(exports) {
    init_buffer_shim();
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac_sha512 = exports.hmac_sha512_fallback = void 0;
    var jssha_1 = __importDefault(require_sha());
    var crypto_primitives_1 = require_browser();
    async function hmac_sha512_fallback(key, data) {
      let keyBuffer = typeof key === "string" ? Buffer.from(key, "utf-8") : key;
      let dataBuffer = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
      const shaObj = new jssha_1.default("SHA-512", "HEX", {
        hmacKey: { value: keyBuffer.toString("hex"), format: "HEX" }
      });
      shaObj.update(dataBuffer.toString("hex"));
      const hmac = shaObj.getHash("HEX");
      return Buffer.from(hmac, "hex");
    }
    exports.hmac_sha512_fallback = hmac_sha512_fallback;
    function hmac_sha512(key, data) {
      return (0, crypto_primitives_1.hmac_sha512)(key, data);
    }
    exports.hmac_sha512 = hmac_sha512;
  }
});

// node_modules/@ton/crypto/dist/primitives/getSecureRandom.js
var require_getSecureRandom2 = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/getSecureRandom.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSecureRandomNumber = exports.getSecureRandomWords = exports.getSecureRandomBytes = void 0;
    var crypto_primitives_1 = require_browser();
    async function getSecureRandomBytes(size) {
      return (0, crypto_primitives_1.getSecureRandomBytes)(size);
    }
    exports.getSecureRandomBytes = getSecureRandomBytes;
    async function getSecureRandomWords(size) {
      return getSecureRandomWords(size);
    }
    exports.getSecureRandomWords = getSecureRandomWords;
    async function getSecureRandomNumber(min, max) {
      let range = max - min;
      var bitsNeeded = Math.ceil(Math.log2(range));
      if (bitsNeeded > 53) {
        throw new Error("Range is too large");
      }
      var bytesNeeded = Math.ceil(bitsNeeded / 8);
      var mask = Math.pow(2, bitsNeeded) - 1;
      while (true) {
        let res = await getSecureRandomBytes(bitsNeeded);
        let power = (bytesNeeded - 1) * 8;
        let numberValue = 0;
        for (var i = 0; i < bytesNeeded; i++) {
          numberValue += res[i] * Math.pow(2, power);
          power -= 8;
        }
        numberValue = numberValue & mask;
        if (numberValue >= range) {
          continue;
        }
        return min + numberValue;
      }
    }
    exports.getSecureRandomNumber = getSecureRandomNumber;
  }
});

// node_modules/@ton/crypto/dist/passwords/wordlist.js
var require_wordlist = __commonJS({
  "node_modules/@ton/crypto/dist/passwords/wordlist.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wordlist = void 0;
    exports.wordlist = [
      "abacus",
      "abdomen",
      "abdominal",
      "abide",
      "abiding",
      "ability",
      "ablaze",
      "able",
      "abnormal",
      "abrasion",
      "abrasive",
      "abreast",
      "abridge",
      "abroad",
      "abruptly",
      "absence",
      "absentee",
      "absently",
      "absinthe",
      "absolute",
      "absolve",
      "abstain",
      "abstract",
      "absurd",
      "accent",
      "acclaim",
      "acclimate",
      "accompany",
      "account",
      "accuracy",
      "accurate",
      "accustom",
      "acetone",
      "achiness",
      "aching",
      "acid",
      "acorn",
      "acquaint",
      "acquire",
      "acre",
      "acrobat",
      "acronym",
      "acting",
      "action",
      "activate",
      "activator",
      "active",
      "activism",
      "activist",
      "activity",
      "actress",
      "acts",
      "acutely",
      "acuteness",
      "aeration",
      "aerobics",
      "aerosol",
      "aerospace",
      "afar",
      "affair",
      "affected",
      "affecting",
      "affection",
      "affidavit",
      "affiliate",
      "affirm",
      "affix",
      "afflicted",
      "affluent",
      "afford",
      "affront",
      "aflame",
      "afloat",
      "aflutter",
      "afoot",
      "afraid",
      "afterglow",
      "afterlife",
      "aftermath",
      "aftermost",
      "afternoon",
      "aged",
      "ageless",
      "agency",
      "agenda",
      "agent",
      "aggregate",
      "aghast",
      "agile",
      "agility",
      "aging",
      "agnostic",
      "agonize",
      "agonizing",
      "agony",
      "agreeable",
      "agreeably",
      "agreed",
      "agreeing",
      "agreement",
      "aground",
      "ahead",
      "ahoy",
      "aide",
      "aids",
      "aim",
      "ajar",
      "alabaster",
      "alarm",
      "albatross",
      "album",
      "alfalfa",
      "algebra",
      "algorithm",
      "alias",
      "alibi",
      "alienable",
      "alienate",
      "aliens",
      "alike",
      "alive",
      "alkaline",
      "alkalize",
      "almanac",
      "almighty",
      "almost",
      "aloe",
      "aloft",
      "aloha",
      "alone",
      "alongside",
      "aloof",
      "alphabet",
      "alright",
      "although",
      "altitude",
      "alto",
      "aluminum",
      "alumni",
      "always",
      "amaretto",
      "amaze",
      "amazingly",
      "amber",
      "ambiance",
      "ambiguity",
      "ambiguous",
      "ambition",
      "ambitious",
      "ambulance",
      "ambush",
      "amendable",
      "amendment",
      "amends",
      "amenity",
      "amiable",
      "amicably",
      "amid",
      "amigo",
      "amino",
      "amiss",
      "ammonia",
      "ammonium",
      "amnesty",
      "amniotic",
      "among",
      "amount",
      "amperage",
      "ample",
      "amplifier",
      "amplify",
      "amply",
      "amuck",
      "amulet",
      "amusable",
      "amused",
      "amusement",
      "amuser",
      "amusing",
      "anaconda",
      "anaerobic",
      "anagram",
      "anatomist",
      "anatomy",
      "anchor",
      "anchovy",
      "ancient",
      "android",
      "anemia",
      "anemic",
      "aneurism",
      "anew",
      "angelfish",
      "angelic",
      "anger",
      "angled",
      "angler",
      "angles",
      "angling",
      "angrily",
      "angriness",
      "anguished",
      "angular",
      "animal",
      "animate",
      "animating",
      "animation",
      "animator",
      "anime",
      "animosity",
      "ankle",
      "annex",
      "annotate",
      "announcer",
      "annoying",
      "annually",
      "annuity",
      "anointer",
      "another",
      "answering",
      "antacid",
      "antarctic",
      "anteater",
      "antelope",
      "antennae",
      "anthem",
      "anthill",
      "anthology",
      "antibody",
      "antics",
      "antidote",
      "antihero",
      "antiquely",
      "antiques",
      "antiquity",
      "antirust",
      "antitoxic",
      "antitrust",
      "antiviral",
      "antivirus",
      "antler",
      "antonym",
      "antsy",
      "anvil",
      "anybody",
      "anyhow",
      "anymore",
      "anyone",
      "anyplace",
      "anything",
      "anytime",
      "anyway",
      "anywhere",
      "aorta",
      "apache",
      "apostle",
      "appealing",
      "appear",
      "appease",
      "appeasing",
      "appendage",
      "appendix",
      "appetite",
      "appetizer",
      "applaud",
      "applause",
      "apple",
      "appliance",
      "applicant",
      "applied",
      "apply",
      "appointee",
      "appraisal",
      "appraiser",
      "apprehend",
      "approach",
      "approval",
      "approve",
      "apricot",
      "april",
      "apron",
      "aptitude",
      "aptly",
      "aqua",
      "aqueduct",
      "arbitrary",
      "arbitrate",
      "ardently",
      "area",
      "arena",
      "arguable",
      "arguably",
      "argue",
      "arise",
      "armadillo",
      "armband",
      "armchair",
      "armed",
      "armful",
      "armhole",
      "arming",
      "armless",
      "armoire",
      "armored",
      "armory",
      "armrest",
      "army",
      "aroma",
      "arose",
      "around",
      "arousal",
      "arrange",
      "array",
      "arrest",
      "arrival",
      "arrive",
      "arrogance",
      "arrogant",
      "arson",
      "art",
      "ascend",
      "ascension",
      "ascent",
      "ascertain",
      "ashamed",
      "ashen",
      "ashes",
      "ashy",
      "aside",
      "askew",
      "asleep",
      "asparagus",
      "aspect",
      "aspirate",
      "aspire",
      "aspirin",
      "astonish",
      "astound",
      "astride",
      "astrology",
      "astronaut",
      "astronomy",
      "astute",
      "atlantic",
      "atlas",
      "atom",
      "atonable",
      "atop",
      "atrium",
      "atrocious",
      "atrophy",
      "attach",
      "attain",
      "attempt",
      "attendant",
      "attendee",
      "attention",
      "attentive",
      "attest",
      "attic",
      "attire",
      "attitude",
      "attractor",
      "attribute",
      "atypical",
      "auction",
      "audacious",
      "audacity",
      "audible",
      "audibly",
      "audience",
      "audio",
      "audition",
      "augmented",
      "august",
      "authentic",
      "author",
      "autism",
      "autistic",
      "autograph",
      "automaker",
      "automated",
      "automatic",
      "autopilot",
      "available",
      "avalanche",
      "avatar",
      "avenge",
      "avenging",
      "avenue",
      "average",
      "aversion",
      "avert",
      "aviation",
      "aviator",
      "avid",
      "avoid",
      "await",
      "awaken",
      "award",
      "aware",
      "awhile",
      "awkward",
      "awning",
      "awoke",
      "awry",
      "axis",
      "babble",
      "babbling",
      "babied",
      "baboon",
      "backache",
      "backboard",
      "backboned",
      "backdrop",
      "backed",
      "backer",
      "backfield",
      "backfire",
      "backhand",
      "backing",
      "backlands",
      "backlash",
      "backless",
      "backlight",
      "backlit",
      "backlog",
      "backpack",
      "backpedal",
      "backrest",
      "backroom",
      "backshift",
      "backside",
      "backslid",
      "backspace",
      "backspin",
      "backstab",
      "backstage",
      "backtalk",
      "backtrack",
      "backup",
      "backward",
      "backwash",
      "backwater",
      "backyard",
      "bacon",
      "bacteria",
      "bacterium",
      "badass",
      "badge",
      "badland",
      "badly",
      "badness",
      "baffle",
      "baffling",
      "bagel",
      "bagful",
      "baggage",
      "bagged",
      "baggie",
      "bagginess",
      "bagging",
      "baggy",
      "bagpipe",
      "baguette",
      "baked",
      "bakery",
      "bakeshop",
      "baking",
      "balance",
      "balancing",
      "balcony",
      "balmy",
      "balsamic",
      "bamboo",
      "banana",
      "banish",
      "banister",
      "banjo",
      "bankable",
      "bankbook",
      "banked",
      "banker",
      "banking",
      "banknote",
      "bankroll",
      "banner",
      "bannister",
      "banshee",
      "banter",
      "barbecue",
      "barbed",
      "barbell",
      "barber",
      "barcode",
      "barge",
      "bargraph",
      "barista",
      "baritone",
      "barley",
      "barmaid",
      "barman",
      "barn",
      "barometer",
      "barrack",
      "barracuda",
      "barrel",
      "barrette",
      "barricade",
      "barrier",
      "barstool",
      "bartender",
      "barterer",
      "bash",
      "basically",
      "basics",
      "basil",
      "basin",
      "basis",
      "basket",
      "batboy",
      "batch",
      "bath",
      "baton",
      "bats",
      "battalion",
      "battered",
      "battering",
      "battery",
      "batting",
      "battle",
      "bauble",
      "bazooka",
      "blabber",
      "bladder",
      "blade",
      "blah",
      "blame",
      "blaming",
      "blanching",
      "blandness",
      "blank",
      "blaspheme",
      "blasphemy",
      "blast",
      "blatancy",
      "blatantly",
      "blazer",
      "blazing",
      "bleach",
      "bleak",
      "bleep",
      "blemish",
      "blend",
      "bless",
      "blighted",
      "blimp",
      "bling",
      "blinked",
      "blinker",
      "blinking",
      "blinks",
      "blip",
      "blissful",
      "blitz",
      "blizzard",
      "bloated",
      "bloating",
      "blob",
      "blog",
      "bloomers",
      "blooming",
      "blooper",
      "blot",
      "blouse",
      "blubber",
      "bluff",
      "bluish",
      "blunderer",
      "blunt",
      "blurb",
      "blurred",
      "blurry",
      "blurt",
      "blush",
      "blustery",
      "boaster",
      "boastful",
      "boasting",
      "boat",
      "bobbed",
      "bobbing",
      "bobble",
      "bobcat",
      "bobsled",
      "bobtail",
      "bodacious",
      "body",
      "bogged",
      "boggle",
      "bogus",
      "boil",
      "bok",
      "bolster",
      "bolt",
      "bonanza",
      "bonded",
      "bonding",
      "bondless",
      "boned",
      "bonehead",
      "boneless",
      "bonelike",
      "boney",
      "bonfire",
      "bonnet",
      "bonsai",
      "bonus",
      "bony",
      "boogeyman",
      "boogieman",
      "book",
      "boondocks",
      "booted",
      "booth",
      "bootie",
      "booting",
      "bootlace",
      "bootleg",
      "boots",
      "boozy",
      "borax",
      "boring",
      "borough",
      "borrower",
      "borrowing",
      "boss",
      "botanical",
      "botanist",
      "botany",
      "botch",
      "both",
      "bottle",
      "bottling",
      "bottom",
      "bounce",
      "bouncing",
      "bouncy",
      "bounding",
      "boundless",
      "bountiful",
      "bovine",
      "boxcar",
      "boxer",
      "boxing",
      "boxlike",
      "boxy",
      "breach",
      "breath",
      "breeches",
      "breeching",
      "breeder",
      "breeding",
      "breeze",
      "breezy",
      "brethren",
      "brewery",
      "brewing",
      "briar",
      "bribe",
      "brick",
      "bride",
      "bridged",
      "brigade",
      "bright",
      "brilliant",
      "brim",
      "bring",
      "brink",
      "brisket",
      "briskly",
      "briskness",
      "bristle",
      "brittle",
      "broadband",
      "broadcast",
      "broaden",
      "broadly",
      "broadness",
      "broadside",
      "broadways",
      "broiler",
      "broiling",
      "broken",
      "broker",
      "bronchial",
      "bronco",
      "bronze",
      "bronzing",
      "brook",
      "broom",
      "brought",
      "browbeat",
      "brownnose",
      "browse",
      "browsing",
      "bruising",
      "brunch",
      "brunette",
      "brunt",
      "brush",
      "brussels",
      "brute",
      "brutishly",
      "bubble",
      "bubbling",
      "bubbly",
      "buccaneer",
      "bucked",
      "bucket",
      "buckle",
      "buckshot",
      "buckskin",
      "bucktooth",
      "buckwheat",
      "buddhism",
      "buddhist",
      "budding",
      "buddy",
      "budget",
      "buffalo",
      "buffed",
      "buffer",
      "buffing",
      "buffoon",
      "buggy",
      "bulb",
      "bulge",
      "bulginess",
      "bulgur",
      "bulk",
      "bulldog",
      "bulldozer",
      "bullfight",
      "bullfrog",
      "bullhorn",
      "bullion",
      "bullish",
      "bullpen",
      "bullring",
      "bullseye",
      "bullwhip",
      "bully",
      "bunch",
      "bundle",
      "bungee",
      "bunion",
      "bunkbed",
      "bunkhouse",
      "bunkmate",
      "bunny",
      "bunt",
      "busboy",
      "bush",
      "busily",
      "busload",
      "bust",
      "busybody",
      "buzz",
      "cabana",
      "cabbage",
      "cabbie",
      "cabdriver",
      "cable",
      "caboose",
      "cache",
      "cackle",
      "cacti",
      "cactus",
      "caddie",
      "caddy",
      "cadet",
      "cadillac",
      "cadmium",
      "cage",
      "cahoots",
      "cake",
      "calamari",
      "calamity",
      "calcium",
      "calculate",
      "calculus",
      "caliber",
      "calibrate",
      "calm",
      "caloric",
      "calorie",
      "calzone",
      "camcorder",
      "cameo",
      "camera",
      "camisole",
      "camper",
      "campfire",
      "camping",
      "campsite",
      "campus",
      "canal",
      "canary",
      "cancel",
      "candied",
      "candle",
      "candy",
      "cane",
      "canine",
      "canister",
      "cannabis",
      "canned",
      "canning",
      "cannon",
      "cannot",
      "canola",
      "canon",
      "canopener",
      "canopy",
      "canteen",
      "canyon",
      "capable",
      "capably",
      "capacity",
      "cape",
      "capillary",
      "capital",
      "capitol",
      "capped",
      "capricorn",
      "capsize",
      "capsule",
      "caption",
      "captivate",
      "captive",
      "captivity",
      "capture",
      "caramel",
      "carat",
      "caravan",
      "carbon",
      "cardboard",
      "carded",
      "cardiac",
      "cardigan",
      "cardinal",
      "cardstock",
      "carefully",
      "caregiver",
      "careless",
      "caress",
      "caretaker",
      "cargo",
      "caring",
      "carless",
      "carload",
      "carmaker",
      "carnage",
      "carnation",
      "carnival",
      "carnivore",
      "carol",
      "carpenter",
      "carpentry",
      "carpool",
      "carport",
      "carried",
      "carrot",
      "carrousel",
      "carry",
      "cartel",
      "cartload",
      "carton",
      "cartoon",
      "cartridge",
      "cartwheel",
      "carve",
      "carving",
      "carwash",
      "cascade",
      "case",
      "cash",
      "casing",
      "casino",
      "casket",
      "cassette",
      "casually",
      "casualty",
      "catacomb",
      "catalog",
      "catalyst",
      "catalyze",
      "catapult",
      "cataract",
      "catatonic",
      "catcall",
      "catchable",
      "catcher",
      "catching",
      "catchy",
      "caterer",
      "catering",
      "catfight",
      "catfish",
      "cathedral",
      "cathouse",
      "catlike",
      "catnap",
      "catnip",
      "catsup",
      "cattail",
      "cattishly",
      "cattle",
      "catty",
      "catwalk",
      "caucasian",
      "caucus",
      "causal",
      "causation",
      "cause",
      "causing",
      "cauterize",
      "caution",
      "cautious",
      "cavalier",
      "cavalry",
      "caviar",
      "cavity",
      "cedar",
      "celery",
      "celestial",
      "celibacy",
      "celibate",
      "celtic",
      "cement",
      "census",
      "ceramics",
      "ceremony",
      "certainly",
      "certainty",
      "certified",
      "certify",
      "cesarean",
      "cesspool",
      "chafe",
      "chaffing",
      "chain",
      "chair",
      "chalice",
      "challenge",
      "chamber",
      "chamomile",
      "champion",
      "chance",
      "change",
      "channel",
      "chant",
      "chaos",
      "chaperone",
      "chaplain",
      "chapped",
      "chaps",
      "chapter",
      "character",
      "charbroil",
      "charcoal",
      "charger",
      "charging",
      "chariot",
      "charity",
      "charm",
      "charred",
      "charter",
      "charting",
      "chase",
      "chasing",
      "chaste",
      "chastise",
      "chastity",
      "chatroom",
      "chatter",
      "chatting",
      "chatty",
      "cheating",
      "cheddar",
      "cheek",
      "cheer",
      "cheese",
      "cheesy",
      "chef",
      "chemicals",
      "chemist",
      "chemo",
      "cherisher",
      "cherub",
      "chess",
      "chest",
      "chevron",
      "chevy",
      "chewable",
      "chewer",
      "chewing",
      "chewy",
      "chief",
      "chihuahua",
      "childcare",
      "childhood",
      "childish",
      "childless",
      "childlike",
      "chili",
      "chill",
      "chimp",
      "chip",
      "chirping",
      "chirpy",
      "chitchat",
      "chivalry",
      "chive",
      "chloride",
      "chlorine",
      "choice",
      "chokehold",
      "choking",
      "chomp",
      "chooser",
      "choosing",
      "choosy",
      "chop",
      "chosen",
      "chowder",
      "chowtime",
      "chrome",
      "chubby",
      "chuck",
      "chug",
      "chummy",
      "chump",
      "chunk",
      "churn",
      "chute",
      "cider",
      "cilantro",
      "cinch",
      "cinema",
      "cinnamon",
      "circle",
      "circling",
      "circular",
      "circulate",
      "circus",
      "citable",
      "citadel",
      "citation",
      "citizen",
      "citric",
      "citrus",
      "city",
      "civic",
      "civil",
      "clad",
      "claim",
      "clambake",
      "clammy",
      "clamor",
      "clamp",
      "clamshell",
      "clang",
      "clanking",
      "clapped",
      "clapper",
      "clapping",
      "clarify",
      "clarinet",
      "clarity",
      "clash",
      "clasp",
      "class",
      "clatter",
      "clause",
      "clavicle",
      "claw",
      "clay",
      "clean",
      "clear",
      "cleat",
      "cleaver",
      "cleft",
      "clench",
      "clergyman",
      "clerical",
      "clerk",
      "clever",
      "clicker",
      "client",
      "climate",
      "climatic",
      "cling",
      "clinic",
      "clinking",
      "clip",
      "clique",
      "cloak",
      "clobber",
      "clock",
      "clone",
      "cloning",
      "closable",
      "closure",
      "clothes",
      "clothing",
      "cloud",
      "clover",
      "clubbed",
      "clubbing",
      "clubhouse",
      "clump",
      "clumsily",
      "clumsy",
      "clunky",
      "clustered",
      "clutch",
      "clutter",
      "coach",
      "coagulant",
      "coastal",
      "coaster",
      "coasting",
      "coastland",
      "coastline",
      "coat",
      "coauthor",
      "cobalt",
      "cobbler",
      "cobweb",
      "cocoa",
      "coconut",
      "cod",
      "coeditor",
      "coerce",
      "coexist",
      "coffee",
      "cofounder",
      "cognition",
      "cognitive",
      "cogwheel",
      "coherence",
      "coherent",
      "cohesive",
      "coil",
      "coke",
      "cola",
      "cold",
      "coleslaw",
      "coliseum",
      "collage",
      "collapse",
      "collar",
      "collected",
      "collector",
      "collide",
      "collie",
      "collision",
      "colonial",
      "colonist",
      "colonize",
      "colony",
      "colossal",
      "colt",
      "coma",
      "come",
      "comfort",
      "comfy",
      "comic",
      "coming",
      "comma",
      "commence",
      "commend",
      "comment",
      "commerce",
      "commode",
      "commodity",
      "commodore",
      "common",
      "commotion",
      "commute",
      "commuting",
      "compacted",
      "compacter",
      "compactly",
      "compactor",
      "companion",
      "company",
      "compare",
      "compel",
      "compile",
      "comply",
      "component",
      "composed",
      "composer",
      "composite",
      "compost",
      "composure",
      "compound",
      "compress",
      "comprised",
      "computer",
      "computing",
      "comrade",
      "concave",
      "conceal",
      "conceded",
      "concept",
      "concerned",
      "concert",
      "conch",
      "concierge",
      "concise",
      "conclude",
      "concrete",
      "concur",
      "condense",
      "condiment",
      "condition",
      "condone",
      "conducive",
      "conductor",
      "conduit",
      "cone",
      "confess",
      "confetti",
      "confidant",
      "confident",
      "confider",
      "confiding",
      "configure",
      "confined",
      "confining",
      "confirm",
      "conflict",
      "conform",
      "confound",
      "confront",
      "confused",
      "confusing",
      "confusion",
      "congenial",
      "congested",
      "congrats",
      "congress",
      "conical",
      "conjoined",
      "conjure",
      "conjuror",
      "connected",
      "connector",
      "consensus",
      "consent",
      "console",
      "consoling",
      "consonant",
      "constable",
      "constant",
      "constrain",
      "constrict",
      "construct",
      "consult",
      "consumer",
      "consuming",
      "contact",
      "container",
      "contempt",
      "contend",
      "contented",
      "contently",
      "contents",
      "contest",
      "context",
      "contort",
      "contour",
      "contrite",
      "control",
      "contusion",
      "convene",
      "convent",
      "copartner",
      "cope",
      "copied",
      "copier",
      "copilot",
      "coping",
      "copious",
      "copper",
      "copy",
      "coral",
      "cork",
      "cornball",
      "cornbread",
      "corncob",
      "cornea",
      "corned",
      "corner",
      "cornfield",
      "cornflake",
      "cornhusk",
      "cornmeal",
      "cornstalk",
      "corny",
      "coronary",
      "coroner",
      "corporal",
      "corporate",
      "corral",
      "correct",
      "corridor",
      "corrode",
      "corroding",
      "corrosive",
      "corsage",
      "corset",
      "cortex",
      "cosigner",
      "cosmetics",
      "cosmic",
      "cosmos",
      "cosponsor",
      "cost",
      "cottage",
      "cotton",
      "couch",
      "cough",
      "could",
      "countable",
      "countdown",
      "counting",
      "countless",
      "country",
      "county",
      "courier",
      "covenant",
      "cover",
      "coveted",
      "coveting",
      "coyness",
      "cozily",
      "coziness",
      "cozy",
      "crabbing",
      "crabgrass",
      "crablike",
      "crabmeat",
      "cradle",
      "cradling",
      "crafter",
      "craftily",
      "craftsman",
      "craftwork",
      "crafty",
      "cramp",
      "cranberry",
      "crane",
      "cranial",
      "cranium",
      "crank",
      "crate",
      "crave",
      "craving",
      "crawfish",
      "crawlers",
      "crawling",
      "crayfish",
      "crayon",
      "crazed",
      "crazily",
      "craziness",
      "crazy",
      "creamed",
      "creamer",
      "creamlike",
      "crease",
      "creasing",
      "creatable",
      "create",
      "creation",
      "creative",
      "creature",
      "credible",
      "credibly",
      "credit",
      "creed",
      "creme",
      "creole",
      "crepe",
      "crept",
      "crescent",
      "crested",
      "cresting",
      "crestless",
      "crevice",
      "crewless",
      "crewman",
      "crewmate",
      "crib",
      "cricket",
      "cried",
      "crier",
      "crimp",
      "crimson",
      "cringe",
      "cringing",
      "crinkle",
      "crinkly",
      "crisped",
      "crisping",
      "crisply",
      "crispness",
      "crispy",
      "criteria",
      "critter",
      "croak",
      "crock",
      "crook",
      "croon",
      "crop",
      "cross",
      "crouch",
      "crouton",
      "crowbar",
      "crowd",
      "crown",
      "crucial",
      "crudely",
      "crudeness",
      "cruelly",
      "cruelness",
      "cruelty",
      "crumb",
      "crummiest",
      "crummy",
      "crumpet",
      "crumpled",
      "cruncher",
      "crunching",
      "crunchy",
      "crusader",
      "crushable",
      "crushed",
      "crusher",
      "crushing",
      "crust",
      "crux",
      "crying",
      "cryptic",
      "crystal",
      "cubbyhole",
      "cube",
      "cubical",
      "cubicle",
      "cucumber",
      "cuddle",
      "cuddly",
      "cufflink",
      "culinary",
      "culminate",
      "culpable",
      "culprit",
      "cultivate",
      "cultural",
      "culture",
      "cupbearer",
      "cupcake",
      "cupid",
      "cupped",
      "cupping",
      "curable",
      "curator",
      "curdle",
      "cure",
      "curfew",
      "curing",
      "curled",
      "curler",
      "curliness",
      "curling",
      "curly",
      "curry",
      "curse",
      "cursive",
      "cursor",
      "curtain",
      "curtly",
      "curtsy",
      "curvature",
      "curve",
      "curvy",
      "cushy",
      "cusp",
      "cussed",
      "custard",
      "custodian",
      "custody",
      "customary",
      "customer",
      "customize",
      "customs",
      "cut",
      "cycle",
      "cyclic",
      "cycling",
      "cyclist",
      "cylinder",
      "cymbal",
      "cytoplasm",
      "cytoplast",
      "dab",
      "dad",
      "daffodil",
      "dagger",
      "daily",
      "daintily",
      "dainty",
      "dairy",
      "daisy",
      "dallying",
      "dance",
      "dancing",
      "dandelion",
      "dander",
      "dandruff",
      "dandy",
      "danger",
      "dangle",
      "dangling",
      "daredevil",
      "dares",
      "daringly",
      "darkened",
      "darkening",
      "darkish",
      "darkness",
      "darkroom",
      "darling",
      "darn",
      "dart",
      "darwinism",
      "dash",
      "dastardly",
      "data",
      "datebook",
      "dating",
      "daughter",
      "daunting",
      "dawdler",
      "dawn",
      "daybed",
      "daybreak",
      "daycare",
      "daydream",
      "daylight",
      "daylong",
      "dayroom",
      "daytime",
      "dazzler",
      "dazzling",
      "deacon",
      "deafening",
      "deafness",
      "dealer",
      "dealing",
      "dealmaker",
      "dealt",
      "dean",
      "debatable",
      "debate",
      "debating",
      "debit",
      "debrief",
      "debtless",
      "debtor",
      "debug",
      "debunk",
      "decade",
      "decaf",
      "decal",
      "decathlon",
      "decay",
      "deceased",
      "deceit",
      "deceiver",
      "deceiving",
      "december",
      "decency",
      "decent",
      "deception",
      "deceptive",
      "decibel",
      "decidable",
      "decimal",
      "decimeter",
      "decipher",
      "deck",
      "declared",
      "decline",
      "decode",
      "decompose",
      "decorated",
      "decorator",
      "decoy",
      "decrease",
      "decree",
      "dedicate",
      "dedicator",
      "deduce",
      "deduct",
      "deed",
      "deem",
      "deepen",
      "deeply",
      "deepness",
      "deface",
      "defacing",
      "defame",
      "default",
      "defeat",
      "defection",
      "defective",
      "defendant",
      "defender",
      "defense",
      "defensive",
      "deferral",
      "deferred",
      "defiance",
      "defiant",
      "defile",
      "defiling",
      "define",
      "definite",
      "deflate",
      "deflation",
      "deflator",
      "deflected",
      "deflector",
      "defog",
      "deforest",
      "defraud",
      "defrost",
      "deftly",
      "defuse",
      "defy",
      "degraded",
      "degrading",
      "degrease",
      "degree",
      "dehydrate",
      "deity",
      "dejected",
      "delay",
      "delegate",
      "delegator",
      "delete",
      "deletion",
      "delicacy",
      "delicate",
      "delicious",
      "delighted",
      "delirious",
      "delirium",
      "deliverer",
      "delivery",
      "delouse",
      "delta",
      "deluge",
      "delusion",
      "deluxe",
      "demanding",
      "demeaning",
      "demeanor",
      "demise",
      "democracy",
      "democrat",
      "demote",
      "demotion",
      "demystify",
      "denatured",
      "deniable",
      "denial",
      "denim",
      "denote",
      "dense",
      "density",
      "dental",
      "dentist",
      "denture",
      "deny",
      "deodorant",
      "deodorize",
      "departed",
      "departure",
      "depict",
      "deplete",
      "depletion",
      "deplored",
      "deploy",
      "deport",
      "depose",
      "depraved",
      "depravity",
      "deprecate",
      "depress",
      "deprive",
      "depth",
      "deputize",
      "deputy",
      "derail",
      "deranged",
      "derby",
      "derived",
      "desecrate",
      "deserve",
      "deserving",
      "designate",
      "designed",
      "designer",
      "designing",
      "deskbound",
      "desktop",
      "deskwork",
      "desolate",
      "despair",
      "despise",
      "despite",
      "destiny",
      "destitute",
      "destruct",
      "detached",
      "detail",
      "detection",
      "detective",
      "detector",
      "detention",
      "detergent",
      "detest",
      "detonate",
      "detonator",
      "detoxify",
      "detract",
      "deuce",
      "devalue",
      "deviancy",
      "deviant",
      "deviate",
      "deviation",
      "deviator",
      "device",
      "devious",
      "devotedly",
      "devotee",
      "devotion",
      "devourer",
      "devouring",
      "devoutly",
      "dexterity",
      "dexterous",
      "diabetes",
      "diabetic",
      "diabolic",
      "diagnoses",
      "diagnosis",
      "diagram",
      "dial",
      "diameter",
      "diaper",
      "diaphragm",
      "diary",
      "dice",
      "dicing",
      "dictate",
      "dictation",
      "dictator",
      "difficult",
      "diffused",
      "diffuser",
      "diffusion",
      "diffusive",
      "dig",
      "dilation",
      "diligence",
      "diligent",
      "dill",
      "dilute",
      "dime",
      "diminish",
      "dimly",
      "dimmed",
      "dimmer",
      "dimness",
      "dimple",
      "diner",
      "dingbat",
      "dinghy",
      "dinginess",
      "dingo",
      "dingy",
      "dining",
      "dinner",
      "diocese",
      "dioxide",
      "diploma",
      "dipped",
      "dipper",
      "dipping",
      "directed",
      "direction",
      "directive",
      "directly",
      "directory",
      "direness",
      "dirtiness",
      "disabled",
      "disagree",
      "disallow",
      "disarm",
      "disarray",
      "disaster",
      "disband",
      "disbelief",
      "disburse",
      "discard",
      "discern",
      "discharge",
      "disclose",
      "discolor",
      "discount",
      "discourse",
      "discover",
      "discuss",
      "disdain",
      "disengage",
      "disfigure",
      "disgrace",
      "dish",
      "disinfect",
      "disjoin",
      "disk",
      "dislike",
      "disliking",
      "dislocate",
      "dislodge",
      "disloyal",
      "dismantle",
      "dismay",
      "dismiss",
      "dismount",
      "disobey",
      "disorder",
      "disown",
      "disparate",
      "disparity",
      "dispatch",
      "dispense",
      "dispersal",
      "dispersed",
      "disperser",
      "displace",
      "display",
      "displease",
      "disposal",
      "dispose",
      "disprove",
      "dispute",
      "disregard",
      "disrupt",
      "dissuade",
      "distance",
      "distant",
      "distaste",
      "distill",
      "distinct",
      "distort",
      "distract",
      "distress",
      "district",
      "distrust",
      "ditch",
      "ditto",
      "ditzy",
      "dividable",
      "divided",
      "dividend",
      "dividers",
      "dividing",
      "divinely",
      "diving",
      "divinity",
      "divisible",
      "divisibly",
      "division",
      "divisive",
      "divorcee",
      "dizziness",
      "dizzy",
      "doable",
      "docile",
      "dock",
      "doctrine",
      "document",
      "dodge",
      "dodgy",
      "doily",
      "doing",
      "dole",
      "dollar",
      "dollhouse",
      "dollop",
      "dolly",
      "dolphin",
      "domain",
      "domelike",
      "domestic",
      "dominion",
      "dominoes",
      "donated",
      "donation",
      "donator",
      "donor",
      "donut",
      "doodle",
      "doorbell",
      "doorframe",
      "doorknob",
      "doorman",
      "doormat",
      "doornail",
      "doorpost",
      "doorstep",
      "doorstop",
      "doorway",
      "doozy",
      "dork",
      "dormitory",
      "dorsal",
      "dosage",
      "dose",
      "dotted",
      "doubling",
      "douche",
      "dove",
      "down",
      "dowry",
      "doze",
      "drab",
      "dragging",
      "dragonfly",
      "dragonish",
      "dragster",
      "drainable",
      "drainage",
      "drained",
      "drainer",
      "drainpipe",
      "dramatic",
      "dramatize",
      "drank",
      "drapery",
      "drastic",
      "draw",
      "dreaded",
      "dreadful",
      "dreadlock",
      "dreamboat",
      "dreamily",
      "dreamland",
      "dreamless",
      "dreamlike",
      "dreamt",
      "dreamy",
      "drearily",
      "dreary",
      "drench",
      "dress",
      "drew",
      "dribble",
      "dried",
      "drier",
      "drift",
      "driller",
      "drilling",
      "drinkable",
      "drinking",
      "dripping",
      "drippy",
      "drivable",
      "driven",
      "driver",
      "driveway",
      "driving",
      "drizzle",
      "drizzly",
      "drone",
      "drool",
      "droop",
      "drop-down",
      "dropbox",
      "dropkick",
      "droplet",
      "dropout",
      "dropper",
      "drove",
      "drown",
      "drowsily",
      "drudge",
      "drum",
      "dry",
      "dubbed",
      "dubiously",
      "duchess",
      "duckbill",
      "ducking",
      "duckling",
      "ducktail",
      "ducky",
      "duct",
      "dude",
      "duffel",
      "dugout",
      "duh",
      "duke",
      "duller",
      "dullness",
      "duly",
      "dumping",
      "dumpling",
      "dumpster",
      "duo",
      "dupe",
      "duplex",
      "duplicate",
      "duplicity",
      "durable",
      "durably",
      "duration",
      "duress",
      "during",
      "dusk",
      "dust",
      "dutiful",
      "duty",
      "duvet",
      "dwarf",
      "dweeb",
      "dwelled",
      "dweller",
      "dwelling",
      "dwindle",
      "dwindling",
      "dynamic",
      "dynamite",
      "dynasty",
      "dyslexia",
      "dyslexic",
      "each",
      "eagle",
      "earache",
      "eardrum",
      "earflap",
      "earful",
      "earlobe",
      "early",
      "earmark",
      "earmuff",
      "earphone",
      "earpiece",
      "earplugs",
      "earring",
      "earshot",
      "earthen",
      "earthlike",
      "earthling",
      "earthly",
      "earthworm",
      "earthy",
      "earwig",
      "easeful",
      "easel",
      "easiest",
      "easily",
      "easiness",
      "easing",
      "eastbound",
      "eastcoast",
      "easter",
      "eastward",
      "eatable",
      "eaten",
      "eatery",
      "eating",
      "eats",
      "ebay",
      "ebony",
      "ebook",
      "ecard",
      "eccentric",
      "echo",
      "eclair",
      "eclipse",
      "ecologist",
      "ecology",
      "economic",
      "economist",
      "economy",
      "ecosphere",
      "ecosystem",
      "edge",
      "edginess",
      "edging",
      "edgy",
      "edition",
      "editor",
      "educated",
      "education",
      "educator",
      "eel",
      "effective",
      "effects",
      "efficient",
      "effort",
      "eggbeater",
      "egging",
      "eggnog",
      "eggplant",
      "eggshell",
      "egomaniac",
      "egotism",
      "egotistic",
      "either",
      "eject",
      "elaborate",
      "elastic",
      "elated",
      "elbow",
      "eldercare",
      "elderly",
      "eldest",
      "electable",
      "election",
      "elective",
      "elephant",
      "elevate",
      "elevating",
      "elevation",
      "elevator",
      "eleven",
      "elf",
      "eligible",
      "eligibly",
      "eliminate",
      "elite",
      "elitism",
      "elixir",
      "elk",
      "ellipse",
      "elliptic",
      "elm",
      "elongated",
      "elope",
      "eloquence",
      "eloquent",
      "elsewhere",
      "elude",
      "elusive",
      "elves",
      "email",
      "embargo",
      "embark",
      "embassy",
      "embattled",
      "embellish",
      "ember",
      "embezzle",
      "emblaze",
      "emblem",
      "embody",
      "embolism",
      "emboss",
      "embroider",
      "emcee",
      "emerald",
      "emergency",
      "emission",
      "emit",
      "emote",
      "emoticon",
      "emotion",
      "empathic",
      "empathy",
      "emperor",
      "emphases",
      "emphasis",
      "emphasize",
      "emphatic",
      "empirical",
      "employed",
      "employee",
      "employer",
      "emporium",
      "empower",
      "emptier",
      "emptiness",
      "empty",
      "emu",
      "enable",
      "enactment",
      "enamel",
      "enchanted",
      "enchilada",
      "encircle",
      "enclose",
      "enclosure",
      "encode",
      "encore",
      "encounter",
      "encourage",
      "encroach",
      "encrust",
      "encrypt",
      "endanger",
      "endeared",
      "endearing",
      "ended",
      "ending",
      "endless",
      "endnote",
      "endocrine",
      "endorphin",
      "endorse",
      "endowment",
      "endpoint",
      "endurable",
      "endurance",
      "enduring",
      "energetic",
      "energize",
      "energy",
      "enforced",
      "enforcer",
      "engaged",
      "engaging",
      "engine",
      "engorge",
      "engraved",
      "engraver",
      "engraving",
      "engross",
      "engulf",
      "enhance",
      "enigmatic",
      "enjoyable",
      "enjoyably",
      "enjoyer",
      "enjoying",
      "enjoyment",
      "enlarged",
      "enlarging",
      "enlighten",
      "enlisted",
      "enquirer",
      "enrage",
      "enrich",
      "enroll",
      "enslave",
      "ensnare",
      "ensure",
      "entail",
      "entangled",
      "entering",
      "entertain",
      "enticing",
      "entire",
      "entitle",
      "entity",
      "entomb",
      "entourage",
      "entrap",
      "entree",
      "entrench",
      "entrust",
      "entryway",
      "entwine",
      "enunciate",
      "envelope",
      "enviable",
      "enviably",
      "envious",
      "envision",
      "envoy",
      "envy",
      "enzyme",
      "epic",
      "epidemic",
      "epidermal",
      "epidermis",
      "epidural",
      "epilepsy",
      "epileptic",
      "epilogue",
      "epiphany",
      "episode",
      "equal",
      "equate",
      "equation",
      "equator",
      "equinox",
      "equipment",
      "equity",
      "equivocal",
      "eradicate",
      "erasable",
      "erased",
      "eraser",
      "erasure",
      "ergonomic",
      "errand",
      "errant",
      "erratic",
      "error",
      "erupt",
      "escalate",
      "escalator",
      "escapable",
      "escapade",
      "escapist",
      "escargot",
      "eskimo",
      "esophagus",
      "espionage",
      "espresso",
      "esquire",
      "essay",
      "essence",
      "essential",
      "establish",
      "estate",
      "esteemed",
      "estimate",
      "estimator",
      "estranged",
      "estrogen",
      "etching",
      "eternal",
      "eternity",
      "ethanol",
      "ether",
      "ethically",
      "ethics",
      "euphemism",
      "evacuate",
      "evacuee",
      "evade",
      "evaluate",
      "evaluator",
      "evaporate",
      "evasion",
      "evasive",
      "even",
      "everglade",
      "evergreen",
      "everybody",
      "everyday",
      "everyone",
      "evict",
      "evidence",
      "evident",
      "evil",
      "evoke",
      "evolution",
      "evolve",
      "exact",
      "exalted",
      "example",
      "excavate",
      "excavator",
      "exceeding",
      "exception",
      "excess",
      "exchange",
      "excitable",
      "exciting",
      "exclaim",
      "exclude",
      "excluding",
      "exclusion",
      "exclusive",
      "excretion",
      "excretory",
      "excursion",
      "excusable",
      "excusably",
      "excuse",
      "exemplary",
      "exemplify",
      "exemption",
      "exerciser",
      "exert",
      "exes",
      "exfoliate",
      "exhale",
      "exhaust",
      "exhume",
      "exile",
      "existing",
      "exit",
      "exodus",
      "exonerate",
      "exorcism",
      "exorcist",
      "expand",
      "expanse",
      "expansion",
      "expansive",
      "expectant",
      "expedited",
      "expediter",
      "expel",
      "expend",
      "expenses",
      "expensive",
      "expert",
      "expire",
      "expiring",
      "explain",
      "expletive",
      "explicit",
      "explode",
      "exploit",
      "explore",
      "exploring",
      "exponent",
      "exporter",
      "exposable",
      "expose",
      "exposure",
      "express",
      "expulsion",
      "exquisite",
      "extended",
      "extending",
      "extent",
      "extenuate",
      "exterior",
      "external",
      "extinct",
      "extortion",
      "extradite",
      "extras",
      "extrovert",
      "extrude",
      "extruding",
      "exuberant",
      "fable",
      "fabric",
      "fabulous",
      "facebook",
      "facecloth",
      "facedown",
      "faceless",
      "facelift",
      "faceplate",
      "faceted",
      "facial",
      "facility",
      "facing",
      "facsimile",
      "faction",
      "factoid",
      "factor",
      "factsheet",
      "factual",
      "faculty",
      "fade",
      "fading",
      "failing",
      "falcon",
      "fall",
      "false",
      "falsify",
      "fame",
      "familiar",
      "family",
      "famine",
      "famished",
      "fanatic",
      "fancied",
      "fanciness",
      "fancy",
      "fanfare",
      "fang",
      "fanning",
      "fantasize",
      "fantastic",
      "fantasy",
      "fascism",
      "fastball",
      "faster",
      "fasting",
      "fastness",
      "faucet",
      "favorable",
      "favorably",
      "favored",
      "favoring",
      "favorite",
      "fax",
      "feast",
      "federal",
      "fedora",
      "feeble",
      "feed",
      "feel",
      "feisty",
      "feline",
      "felt-tip",
      "feminine",
      "feminism",
      "feminist",
      "feminize",
      "femur",
      "fence",
      "fencing",
      "fender",
      "ferment",
      "fernlike",
      "ferocious",
      "ferocity",
      "ferret",
      "ferris",
      "ferry",
      "fervor",
      "fester",
      "festival",
      "festive",
      "festivity",
      "fetal",
      "fetch",
      "fever",
      "fiber",
      "fiction",
      "fiddle",
      "fiddling",
      "fidelity",
      "fidgeting",
      "fidgety",
      "fifteen",
      "fifth",
      "fiftieth",
      "fifty",
      "figment",
      "figure",
      "figurine",
      "filing",
      "filled",
      "filler",
      "filling",
      "film",
      "filter",
      "filth",
      "filtrate",
      "finale",
      "finalist",
      "finalize",
      "finally",
      "finance",
      "financial",
      "finch",
      "fineness",
      "finer",
      "finicky",
      "finished",
      "finisher",
      "finishing",
      "finite",
      "finless",
      "finlike",
      "fiscally",
      "fit",
      "five",
      "flaccid",
      "flagman",
      "flagpole",
      "flagship",
      "flagstick",
      "flagstone",
      "flail",
      "flakily",
      "flaky",
      "flame",
      "flammable",
      "flanked",
      "flanking",
      "flannels",
      "flap",
      "flaring",
      "flashback",
      "flashbulb",
      "flashcard",
      "flashily",
      "flashing",
      "flashy",
      "flask",
      "flatbed",
      "flatfoot",
      "flatly",
      "flatness",
      "flatten",
      "flattered",
      "flatterer",
      "flattery",
      "flattop",
      "flatware",
      "flatworm",
      "flavored",
      "flavorful",
      "flavoring",
      "flaxseed",
      "fled",
      "fleshed",
      "fleshy",
      "flick",
      "flier",
      "flight",
      "flinch",
      "fling",
      "flint",
      "flip",
      "flirt",
      "float",
      "flock",
      "flogging",
      "flop",
      "floral",
      "florist",
      "floss",
      "flounder",
      "flyable",
      "flyaway",
      "flyer",
      "flying",
      "flyover",
      "flypaper",
      "foam",
      "foe",
      "fog",
      "foil",
      "folic",
      "folk",
      "follicle",
      "follow",
      "fondling",
      "fondly",
      "fondness",
      "fondue",
      "font",
      "food",
      "fool",
      "footage",
      "football",
      "footbath",
      "footboard",
      "footer",
      "footgear",
      "foothill",
      "foothold",
      "footing",
      "footless",
      "footman",
      "footnote",
      "footpad",
      "footpath",
      "footprint",
      "footrest",
      "footsie",
      "footsore",
      "footwear",
      "footwork",
      "fossil",
      "foster",
      "founder",
      "founding",
      "fountain",
      "fox",
      "foyer",
      "fraction",
      "fracture",
      "fragile",
      "fragility",
      "fragment",
      "fragrance",
      "fragrant",
      "frail",
      "frame",
      "framing",
      "frantic",
      "fraternal",
      "frayed",
      "fraying",
      "frays",
      "freckled",
      "freckles",
      "freebase",
      "freebee",
      "freebie",
      "freedom",
      "freefall",
      "freehand",
      "freeing",
      "freeload",
      "freely",
      "freemason",
      "freeness",
      "freestyle",
      "freeware",
      "freeway",
      "freewill",
      "freezable",
      "freezing",
      "freight",
      "french",
      "frenzied",
      "frenzy",
      "frequency",
      "frequent",
      "fresh",
      "fretful",
      "fretted",
      "friction",
      "friday",
      "fridge",
      "fried",
      "friend",
      "frighten",
      "frightful",
      "frigidity",
      "frigidly",
      "frill",
      "fringe",
      "frisbee",
      "frisk",
      "fritter",
      "frivolous",
      "frolic",
      "from",
      "front",
      "frostbite",
      "frosted",
      "frostily",
      "frosting",
      "frostlike",
      "frosty",
      "froth",
      "frown",
      "frozen",
      "fructose",
      "frugality",
      "frugally",
      "fruit",
      "frustrate",
      "frying",
      "gab",
      "gaffe",
      "gag",
      "gainfully",
      "gaining",
      "gains",
      "gala",
      "gallantly",
      "galleria",
      "gallery",
      "galley",
      "gallon",
      "gallows",
      "gallstone",
      "galore",
      "galvanize",
      "gambling",
      "game",
      "gaming",
      "gamma",
      "gander",
      "gangly",
      "gangrene",
      "gangway",
      "gap",
      "garage",
      "garbage",
      "garden",
      "gargle",
      "garland",
      "garlic",
      "garment",
      "garnet",
      "garnish",
      "garter",
      "gas",
      "gatherer",
      "gathering",
      "gating",
      "gauging",
      "gauntlet",
      "gauze",
      "gave",
      "gawk",
      "gazing",
      "gear",
      "gecko",
      "geek",
      "geiger",
      "gem",
      "gender",
      "generic",
      "generous",
      "genetics",
      "genre",
      "gentile",
      "gentleman",
      "gently",
      "gents",
      "geography",
      "geologic",
      "geologist",
      "geology",
      "geometric",
      "geometry",
      "geranium",
      "gerbil",
      "geriatric",
      "germicide",
      "germinate",
      "germless",
      "germproof",
      "gestate",
      "gestation",
      "gesture",
      "getaway",
      "getting",
      "getup",
      "giant",
      "gibberish",
      "giblet",
      "giddily",
      "giddiness",
      "giddy",
      "gift",
      "gigabyte",
      "gigahertz",
      "gigantic",
      "giggle",
      "giggling",
      "giggly",
      "gigolo",
      "gilled",
      "gills",
      "gimmick",
      "girdle",
      "giveaway",
      "given",
      "giver",
      "giving",
      "gizmo",
      "gizzard",
      "glacial",
      "glacier",
      "glade",
      "gladiator",
      "gladly",
      "glamorous",
      "glamour",
      "glance",
      "glancing",
      "glandular",
      "glare",
      "glaring",
      "glass",
      "glaucoma",
      "glazing",
      "gleaming",
      "gleeful",
      "glider",
      "gliding",
      "glimmer",
      "glimpse",
      "glisten",
      "glitch",
      "glitter",
      "glitzy",
      "gloater",
      "gloating",
      "gloomily",
      "gloomy",
      "glorified",
      "glorifier",
      "glorify",
      "glorious",
      "glory",
      "gloss",
      "glove",
      "glowing",
      "glowworm",
      "glucose",
      "glue",
      "gluten",
      "glutinous",
      "glutton",
      "gnarly",
      "gnat",
      "goal",
      "goatskin",
      "goes",
      "goggles",
      "going",
      "goldfish",
      "goldmine",
      "goldsmith",
      "golf",
      "goliath",
      "gonad",
      "gondola",
      "gone",
      "gong",
      "good",
      "gooey",
      "goofball",
      "goofiness",
      "goofy",
      "google",
      "goon",
      "gopher",
      "gore",
      "gorged",
      "gorgeous",
      "gory",
      "gosling",
      "gossip",
      "gothic",
      "gotten",
      "gout",
      "gown",
      "grab",
      "graceful",
      "graceless",
      "gracious",
      "gradation",
      "graded",
      "grader",
      "gradient",
      "grading",
      "gradually",
      "graduate",
      "graffiti",
      "grafted",
      "grafting",
      "grain",
      "granddad",
      "grandkid",
      "grandly",
      "grandma",
      "grandpa",
      "grandson",
      "granite",
      "granny",
      "granola",
      "grant",
      "granular",
      "grape",
      "graph",
      "grapple",
      "grappling",
      "grasp",
      "grass",
      "gratified",
      "gratify",
      "grating",
      "gratitude",
      "gratuity",
      "gravel",
      "graveness",
      "graves",
      "graveyard",
      "gravitate",
      "gravity",
      "gravy",
      "gray",
      "grazing",
      "greasily",
      "greedily",
      "greedless",
      "greedy",
      "green",
      "greeter",
      "greeting",
      "grew",
      "greyhound",
      "grid",
      "grief",
      "grievance",
      "grieving",
      "grievous",
      "grill",
      "grimace",
      "grimacing",
      "grime",
      "griminess",
      "grimy",
      "grinch",
      "grinning",
      "grip",
      "gristle",
      "grit",
      "groggily",
      "groggy",
      "groin",
      "groom",
      "groove",
      "grooving",
      "groovy",
      "grope",
      "ground",
      "grouped",
      "grout",
      "grove",
      "grower",
      "growing",
      "growl",
      "grub",
      "grudge",
      "grudging",
      "grueling",
      "gruffly",
      "grumble",
      "grumbling",
      "grumbly",
      "grumpily",
      "grunge",
      "grunt",
      "guacamole",
      "guidable",
      "guidance",
      "guide",
      "guiding",
      "guileless",
      "guise",
      "gulf",
      "gullible",
      "gully",
      "gulp",
      "gumball",
      "gumdrop",
      "gumminess",
      "gumming",
      "gummy",
      "gurgle",
      "gurgling",
      "guru",
      "gush",
      "gusto",
      "gusty",
      "gutless",
      "guts",
      "gutter",
      "guy",
      "guzzler",
      "gyration",
      "habitable",
      "habitant",
      "habitat",
      "habitual",
      "hacked",
      "hacker",
      "hacking",
      "hacksaw",
      "had",
      "haggler",
      "haiku",
      "half",
      "halogen",
      "halt",
      "halved",
      "halves",
      "hamburger",
      "hamlet",
      "hammock",
      "hamper",
      "hamster",
      "hamstring",
      "handbag",
      "handball",
      "handbook",
      "handbrake",
      "handcart",
      "handclap",
      "handclasp",
      "handcraft",
      "handcuff",
      "handed",
      "handful",
      "handgrip",
      "handgun",
      "handheld",
      "handiness",
      "handiwork",
      "handlebar",
      "handled",
      "handler",
      "handling",
      "handmade",
      "handoff",
      "handpick",
      "handprint",
      "handrail",
      "handsaw",
      "handset",
      "handsfree",
      "handshake",
      "handstand",
      "handwash",
      "handwork",
      "handwoven",
      "handwrite",
      "handyman",
      "hangnail",
      "hangout",
      "hangover",
      "hangup",
      "hankering",
      "hankie",
      "hanky",
      "haphazard",
      "happening",
      "happier",
      "happiest",
      "happily",
      "happiness",
      "happy",
      "harbor",
      "hardcopy",
      "hardcore",
      "hardcover",
      "harddisk",
      "hardened",
      "hardener",
      "hardening",
      "hardhat",
      "hardhead",
      "hardiness",
      "hardly",
      "hardness",
      "hardship",
      "hardware",
      "hardwired",
      "hardwood",
      "hardy",
      "harmful",
      "harmless",
      "harmonica",
      "harmonics",
      "harmonize",
      "harmony",
      "harness",
      "harpist",
      "harsh",
      "harvest",
      "hash",
      "hassle",
      "haste",
      "hastily",
      "hastiness",
      "hasty",
      "hatbox",
      "hatchback",
      "hatchery",
      "hatchet",
      "hatching",
      "hatchling",
      "hate",
      "hatless",
      "hatred",
      "haunt",
      "haven",
      "hazard",
      "hazelnut",
      "hazily",
      "haziness",
      "hazing",
      "hazy",
      "headache",
      "headband",
      "headboard",
      "headcount",
      "headdress",
      "headed",
      "header",
      "headfirst",
      "headgear",
      "heading",
      "headlamp",
      "headless",
      "headlock",
      "headphone",
      "headpiece",
      "headrest",
      "headroom",
      "headscarf",
      "headset",
      "headsman",
      "headstand",
      "headstone",
      "headway",
      "headwear",
      "heap",
      "heat",
      "heave",
      "heavily",
      "heaviness",
      "heaving",
      "hedge",
      "hedging",
      "heftiness",
      "hefty",
      "helium",
      "helmet",
      "helper",
      "helpful",
      "helping",
      "helpless",
      "helpline",
      "hemlock",
      "hemstitch",
      "hence",
      "henchman",
      "henna",
      "herald",
      "herbal",
      "herbicide",
      "herbs",
      "heritage",
      "hermit",
      "heroics",
      "heroism",
      "herring",
      "herself",
      "hertz",
      "hesitancy",
      "hesitant",
      "hesitate",
      "hexagon",
      "hexagram",
      "hubcap",
      "huddle",
      "huddling",
      "huff",
      "hug",
      "hula",
      "hulk",
      "hull",
      "human",
      "humble",
      "humbling",
      "humbly",
      "humid",
      "humiliate",
      "humility",
      "humming",
      "hummus",
      "humongous",
      "humorist",
      "humorless",
      "humorous",
      "humpback",
      "humped",
      "humvee",
      "hunchback",
      "hundredth",
      "hunger",
      "hungrily",
      "hungry",
      "hunk",
      "hunter",
      "hunting",
      "huntress",
      "huntsman",
      "hurdle",
      "hurled",
      "hurler",
      "hurling",
      "hurray",
      "hurricane",
      "hurried",
      "hurry",
      "hurt",
      "husband",
      "hush",
      "husked",
      "huskiness",
      "hut",
      "hybrid",
      "hydrant",
      "hydrated",
      "hydration",
      "hydrogen",
      "hydroxide",
      "hyperlink",
      "hypertext",
      "hyphen",
      "hypnoses",
      "hypnosis",
      "hypnotic",
      "hypnotism",
      "hypnotist",
      "hypnotize",
      "hypocrisy",
      "hypocrite",
      "ibuprofen",
      "ice",
      "iciness",
      "icing",
      "icky",
      "icon",
      "icy",
      "idealism",
      "idealist",
      "idealize",
      "ideally",
      "idealness",
      "identical",
      "identify",
      "identity",
      "ideology",
      "idiocy",
      "idiom",
      "idly",
      "igloo",
      "ignition",
      "ignore",
      "iguana",
      "illicitly",
      "illusion",
      "illusive",
      "image",
      "imaginary",
      "imagines",
      "imaging",
      "imbecile",
      "imitate",
      "imitation",
      "immature",
      "immerse",
      "immersion",
      "imminent",
      "immobile",
      "immodest",
      "immorally",
      "immortal",
      "immovable",
      "immovably",
      "immunity",
      "immunize",
      "impaired",
      "impale",
      "impart",
      "impatient",
      "impeach",
      "impeding",
      "impending",
      "imperfect",
      "imperial",
      "impish",
      "implant",
      "implement",
      "implicate",
      "implicit",
      "implode",
      "implosion",
      "implosive",
      "imply",
      "impolite",
      "important",
      "importer",
      "impose",
      "imposing",
      "impotence",
      "impotency",
      "impotent",
      "impound",
      "imprecise",
      "imprint",
      "imprison",
      "impromptu",
      "improper",
      "improve",
      "improving",
      "improvise",
      "imprudent",
      "impulse",
      "impulsive",
      "impure",
      "impurity",
      "iodine",
      "iodize",
      "ion",
      "ipad",
      "iphone",
      "ipod",
      "irate",
      "irk",
      "iron",
      "irregular",
      "irrigate",
      "irritable",
      "irritably",
      "irritant",
      "irritate",
      "islamic",
      "islamist",
      "isolated",
      "isolating",
      "isolation",
      "isotope",
      "issue",
      "issuing",
      "italicize",
      "italics",
      "item",
      "itinerary",
      "itunes",
      "ivory",
      "ivy",
      "jab",
      "jackal",
      "jacket",
      "jackknife",
      "jackpot",
      "jailbird",
      "jailbreak",
      "jailer",
      "jailhouse",
      "jalapeno",
      "jam",
      "janitor",
      "january",
      "jargon",
      "jarring",
      "jasmine",
      "jaundice",
      "jaunt",
      "java",
      "jawed",
      "jawless",
      "jawline",
      "jaws",
      "jaybird",
      "jaywalker",
      "jazz",
      "jeep",
      "jeeringly",
      "jellied",
      "jelly",
      "jersey",
      "jester",
      "jet",
      "jiffy",
      "jigsaw",
      "jimmy",
      "jingle",
      "jingling",
      "jinx",
      "jitters",
      "jittery",
      "job",
      "jockey",
      "jockstrap",
      "jogger",
      "jogging",
      "john",
      "joining",
      "jokester",
      "jokingly",
      "jolliness",
      "jolly",
      "jolt",
      "jot",
      "jovial",
      "joyfully",
      "joylessly",
      "joyous",
      "joyride",
      "joystick",
      "jubilance",
      "jubilant",
      "judge",
      "judgingly",
      "judicial",
      "judiciary",
      "judo",
      "juggle",
      "juggling",
      "jugular",
      "juice",
      "juiciness",
      "juicy",
      "jujitsu",
      "jukebox",
      "july",
      "jumble",
      "jumbo",
      "jump",
      "junction",
      "juncture",
      "june",
      "junior",
      "juniper",
      "junkie",
      "junkman",
      "junkyard",
      "jurist",
      "juror",
      "jury",
      "justice",
      "justifier",
      "justify",
      "justly",
      "justness",
      "juvenile",
      "kabob",
      "kangaroo",
      "karaoke",
      "karate",
      "karma",
      "kebab",
      "keenly",
      "keenness",
      "keep",
      "keg",
      "kelp",
      "kennel",
      "kept",
      "kerchief",
      "kerosene",
      "kettle",
      "kick",
      "kiln",
      "kilobyte",
      "kilogram",
      "kilometer",
      "kilowatt",
      "kilt",
      "kimono",
      "kindle",
      "kindling",
      "kindly",
      "kindness",
      "kindred",
      "kinetic",
      "kinfolk",
      "king",
      "kinship",
      "kinsman",
      "kinswoman",
      "kissable",
      "kisser",
      "kissing",
      "kitchen",
      "kite",
      "kitten",
      "kitty",
      "kiwi",
      "kleenex",
      "knapsack",
      "knee",
      "knelt",
      "knickers",
      "knoll",
      "koala",
      "kooky",
      "kosher",
      "krypton",
      "kudos",
      "kung",
      "labored",
      "laborer",
      "laboring",
      "laborious",
      "labrador",
      "ladder",
      "ladies",
      "ladle",
      "ladybug",
      "ladylike",
      "lagged",
      "lagging",
      "lagoon",
      "lair",
      "lake",
      "lance",
      "landed",
      "landfall",
      "landfill",
      "landing",
      "landlady",
      "landless",
      "landline",
      "landlord",
      "landmark",
      "landmass",
      "landmine",
      "landowner",
      "landscape",
      "landside",
      "landslide",
      "language",
      "lankiness",
      "lanky",
      "lantern",
      "lapdog",
      "lapel",
      "lapped",
      "lapping",
      "laptop",
      "lard",
      "large",
      "lark",
      "lash",
      "lasso",
      "last",
      "latch",
      "late",
      "lather",
      "latitude",
      "latrine",
      "latter",
      "latticed",
      "launch",
      "launder",
      "laundry",
      "laurel",
      "lavender",
      "lavish",
      "laxative",
      "lazily",
      "laziness",
      "lazy",
      "lecturer",
      "left",
      "legacy",
      "legal",
      "legend",
      "legged",
      "leggings",
      "legible",
      "legibly",
      "legislate",
      "lego",
      "legroom",
      "legume",
      "legwarmer",
      "legwork",
      "lemon",
      "lend",
      "length",
      "lens",
      "lent",
      "leotard",
      "lesser",
      "letdown",
      "lethargic",
      "lethargy",
      "letter",
      "lettuce",
      "level",
      "leverage",
      "levers",
      "levitate",
      "levitator",
      "liability",
      "liable",
      "liberty",
      "librarian",
      "library",
      "licking",
      "licorice",
      "lid",
      "life",
      "lifter",
      "lifting",
      "liftoff",
      "ligament",
      "likely",
      "likeness",
      "likewise",
      "liking",
      "lilac",
      "lilly",
      "lily",
      "limb",
      "limeade",
      "limelight",
      "limes",
      "limit",
      "limping",
      "limpness",
      "line",
      "lingo",
      "linguini",
      "linguist",
      "lining",
      "linked",
      "linoleum",
      "linseed",
      "lint",
      "lion",
      "lip",
      "liquefy",
      "liqueur",
      "liquid",
      "lisp",
      "list",
      "litigate",
      "litigator",
      "litmus",
      "litter",
      "little",
      "livable",
      "lived",
      "lively",
      "liver",
      "livestock",
      "lividly",
      "living",
      "lizard",
      "lubricant",
      "lubricate",
      "lucid",
      "luckily",
      "luckiness",
      "luckless",
      "lucrative",
      "ludicrous",
      "lugged",
      "lukewarm",
      "lullaby",
      "lumber",
      "luminance",
      "luminous",
      "lumpiness",
      "lumping",
      "lumpish",
      "lunacy",
      "lunar",
      "lunchbox",
      "luncheon",
      "lunchroom",
      "lunchtime",
      "lung",
      "lurch",
      "lure",
      "luridness",
      "lurk",
      "lushly",
      "lushness",
      "luster",
      "lustfully",
      "lustily",
      "lustiness",
      "lustrous",
      "lusty",
      "luxurious",
      "luxury",
      "lying",
      "lyrically",
      "lyricism",
      "lyricist",
      "lyrics",
      "macarena",
      "macaroni",
      "macaw",
      "mace",
      "machine",
      "machinist",
      "magazine",
      "magenta",
      "maggot",
      "magical",
      "magician",
      "magma",
      "magnesium",
      "magnetic",
      "magnetism",
      "magnetize",
      "magnifier",
      "magnify",
      "magnitude",
      "magnolia",
      "mahogany",
      "maimed",
      "majestic",
      "majesty",
      "majorette",
      "majority",
      "makeover",
      "maker",
      "makeshift",
      "making",
      "malformed",
      "malt",
      "mama",
      "mammal",
      "mammary",
      "mammogram",
      "manager",
      "managing",
      "manatee",
      "mandarin",
      "mandate",
      "mandatory",
      "mandolin",
      "manger",
      "mangle",
      "mango",
      "mangy",
      "manhandle",
      "manhole",
      "manhood",
      "manhunt",
      "manicotti",
      "manicure",
      "manifesto",
      "manila",
      "mankind",
      "manlike",
      "manliness",
      "manly",
      "manmade",
      "manned",
      "mannish",
      "manor",
      "manpower",
      "mantis",
      "mantra",
      "manual",
      "many",
      "map",
      "marathon",
      "marauding",
      "marbled",
      "marbles",
      "marbling",
      "march",
      "mardi",
      "margarine",
      "margarita",
      "margin",
      "marigold",
      "marina",
      "marine",
      "marital",
      "maritime",
      "marlin",
      "marmalade",
      "maroon",
      "married",
      "marrow",
      "marry",
      "marshland",
      "marshy",
      "marsupial",
      "marvelous",
      "marxism",
      "mascot",
      "masculine",
      "mashed",
      "mashing",
      "massager",
      "masses",
      "massive",
      "mastiff",
      "matador",
      "matchbook",
      "matchbox",
      "matcher",
      "matching",
      "matchless",
      "material",
      "maternal",
      "maternity",
      "math",
      "mating",
      "matriarch",
      "matrimony",
      "matrix",
      "matron",
      "matted",
      "matter",
      "maturely",
      "maturing",
      "maturity",
      "mauve",
      "maverick",
      "maximize",
      "maximum",
      "maybe",
      "mayday",
      "mayflower",
      "moaner",
      "moaning",
      "mobile",
      "mobility",
      "mobilize",
      "mobster",
      "mocha",
      "mocker",
      "mockup",
      "modified",
      "modify",
      "modular",
      "modulator",
      "module",
      "moisten",
      "moistness",
      "moisture",
      "molar",
      "molasses",
      "mold",
      "molecular",
      "molecule",
      "molehill",
      "mollusk",
      "mom",
      "monastery",
      "monday",
      "monetary",
      "monetize",
      "moneybags",
      "moneyless",
      "moneywise",
      "mongoose",
      "mongrel",
      "monitor",
      "monkhood",
      "monogamy",
      "monogram",
      "monologue",
      "monopoly",
      "monorail",
      "monotone",
      "monotype",
      "monoxide",
      "monsieur",
      "monsoon",
      "monstrous",
      "monthly",
      "monument",
      "moocher",
      "moodiness",
      "moody",
      "mooing",
      "moonbeam",
      "mooned",
      "moonlight",
      "moonlike",
      "moonlit",
      "moonrise",
      "moonscape",
      "moonshine",
      "moonstone",
      "moonwalk",
      "mop",
      "morale",
      "morality",
      "morally",
      "morbidity",
      "morbidly",
      "morphine",
      "morphing",
      "morse",
      "mortality",
      "mortally",
      "mortician",
      "mortified",
      "mortify",
      "mortuary",
      "mosaic",
      "mossy",
      "most",
      "mothball",
      "mothproof",
      "motion",
      "motivate",
      "motivator",
      "motive",
      "motocross",
      "motor",
      "motto",
      "mountable",
      "mountain",
      "mounted",
      "mounting",
      "mourner",
      "mournful",
      "mouse",
      "mousiness",
      "moustache",
      "mousy",
      "mouth",
      "movable",
      "move",
      "movie",
      "moving",
      "mower",
      "mowing",
      "much",
      "muck",
      "mud",
      "mug",
      "mulberry",
      "mulch",
      "mule",
      "mulled",
      "mullets",
      "multiple",
      "multiply",
      "multitask",
      "multitude",
      "mumble",
      "mumbling",
      "mumbo",
      "mummified",
      "mummify",
      "mummy",
      "mumps",
      "munchkin",
      "mundane",
      "municipal",
      "muppet",
      "mural",
      "murkiness",
      "murky",
      "murmuring",
      "muscular",
      "museum",
      "mushily",
      "mushiness",
      "mushroom",
      "mushy",
      "music",
      "musket",
      "muskiness",
      "musky",
      "mustang",
      "mustard",
      "muster",
      "mustiness",
      "musty",
      "mutable",
      "mutate",
      "mutation",
      "mute",
      "mutilated",
      "mutilator",
      "mutiny",
      "mutt",
      "mutual",
      "muzzle",
      "myself",
      "myspace",
      "mystified",
      "mystify",
      "myth",
      "nacho",
      "nag",
      "nail",
      "name",
      "naming",
      "nanny",
      "nanometer",
      "nape",
      "napkin",
      "napped",
      "napping",
      "nappy",
      "narrow",
      "nastily",
      "nastiness",
      "national",
      "native",
      "nativity",
      "natural",
      "nature",
      "naturist",
      "nautical",
      "navigate",
      "navigator",
      "navy",
      "nearby",
      "nearest",
      "nearly",
      "nearness",
      "neatly",
      "neatness",
      "nebula",
      "nebulizer",
      "nectar",
      "negate",
      "negation",
      "negative",
      "neglector",
      "negligee",
      "negligent",
      "negotiate",
      "nemeses",
      "nemesis",
      "neon",
      "nephew",
      "nerd",
      "nervous",
      "nervy",
      "nest",
      "net",
      "neurology",
      "neuron",
      "neurosis",
      "neurotic",
      "neuter",
      "neutron",
      "never",
      "next",
      "nibble",
      "nickname",
      "nicotine",
      "niece",
      "nifty",
      "nimble",
      "nimbly",
      "nineteen",
      "ninetieth",
      "ninja",
      "nintendo",
      "ninth",
      "nuclear",
      "nuclei",
      "nucleus",
      "nugget",
      "nullify",
      "number",
      "numbing",
      "numbly",
      "numbness",
      "numeral",
      "numerate",
      "numerator",
      "numeric",
      "numerous",
      "nuptials",
      "nursery",
      "nursing",
      "nurture",
      "nutcase",
      "nutlike",
      "nutmeg",
      "nutrient",
      "nutshell",
      "nuttiness",
      "nutty",
      "nuzzle",
      "nylon",
      "oaf",
      "oak",
      "oasis",
      "oat",
      "obedience",
      "obedient",
      "obituary",
      "object",
      "obligate",
      "obliged",
      "oblivion",
      "oblivious",
      "oblong",
      "obnoxious",
      "oboe",
      "obscure",
      "obscurity",
      "observant",
      "observer",
      "observing",
      "obsessed",
      "obsession",
      "obsessive",
      "obsolete",
      "obstacle",
      "obstinate",
      "obstruct",
      "obtain",
      "obtrusive",
      "obtuse",
      "obvious",
      "occultist",
      "occupancy",
      "occupant",
      "occupier",
      "occupy",
      "ocean",
      "ocelot",
      "octagon",
      "octane",
      "october",
      "octopus",
      "ogle",
      "oil",
      "oink",
      "ointment",
      "okay",
      "old",
      "olive",
      "olympics",
      "omega",
      "omen",
      "ominous",
      "omission",
      "omit",
      "omnivore",
      "onboard",
      "oncoming",
      "ongoing",
      "onion",
      "online",
      "onlooker",
      "only",
      "onscreen",
      "onset",
      "onshore",
      "onslaught",
      "onstage",
      "onto",
      "onward",
      "onyx",
      "oops",
      "ooze",
      "oozy",
      "opacity",
      "opal",
      "open",
      "operable",
      "operate",
      "operating",
      "operation",
      "operative",
      "operator",
      "opium",
      "opossum",
      "opponent",
      "oppose",
      "opposing",
      "opposite",
      "oppressed",
      "oppressor",
      "opt",
      "opulently",
      "osmosis",
      "other",
      "otter",
      "ouch",
      "ought",
      "ounce",
      "outage",
      "outback",
      "outbid",
      "outboard",
      "outbound",
      "outbreak",
      "outburst",
      "outcast",
      "outclass",
      "outcome",
      "outdated",
      "outdoors",
      "outer",
      "outfield",
      "outfit",
      "outflank",
      "outgoing",
      "outgrow",
      "outhouse",
      "outing",
      "outlast",
      "outlet",
      "outline",
      "outlook",
      "outlying",
      "outmatch",
      "outmost",
      "outnumber",
      "outplayed",
      "outpost",
      "outpour",
      "output",
      "outrage",
      "outrank",
      "outreach",
      "outright",
      "outscore",
      "outsell",
      "outshine",
      "outshoot",
      "outsider",
      "outskirts",
      "outsmart",
      "outsource",
      "outspoken",
      "outtakes",
      "outthink",
      "outward",
      "outweigh",
      "outwit",
      "oval",
      "ovary",
      "oven",
      "overact",
      "overall",
      "overarch",
      "overbid",
      "overbill",
      "overbite",
      "overblown",
      "overboard",
      "overbook",
      "overbuilt",
      "overcast",
      "overcoat",
      "overcome",
      "overcook",
      "overcrowd",
      "overdraft",
      "overdrawn",
      "overdress",
      "overdrive",
      "overdue",
      "overeager",
      "overeater",
      "overexert",
      "overfed",
      "overfeed",
      "overfill",
      "overflow",
      "overfull",
      "overgrown",
      "overhand",
      "overhang",
      "overhaul",
      "overhead",
      "overhear",
      "overheat",
      "overhung",
      "overjoyed",
      "overkill",
      "overlabor",
      "overlaid",
      "overlap",
      "overlay",
      "overload",
      "overlook",
      "overlord",
      "overlying",
      "overnight",
      "overpass",
      "overpay",
      "overplant",
      "overplay",
      "overpower",
      "overprice",
      "overrate",
      "overreach",
      "overreact",
      "override",
      "overripe",
      "overrule",
      "overrun",
      "overshoot",
      "overshot",
      "oversight",
      "oversized",
      "oversleep",
      "oversold",
      "overspend",
      "overstate",
      "overstay",
      "overstep",
      "overstock",
      "overstuff",
      "oversweet",
      "overtake",
      "overthrow",
      "overtime",
      "overtly",
      "overtone",
      "overture",
      "overturn",
      "overuse",
      "overvalue",
      "overview",
      "overwrite",
      "owl",
      "oxford",
      "oxidant",
      "oxidation",
      "oxidize",
      "oxidizing",
      "oxygen",
      "oxymoron",
      "oyster",
      "ozone",
      "paced",
      "pacemaker",
      "pacific",
      "pacifier",
      "pacifism",
      "pacifist",
      "pacify",
      "padded",
      "padding",
      "paddle",
      "paddling",
      "padlock",
      "pagan",
      "pager",
      "paging",
      "pajamas",
      "palace",
      "palatable",
      "palm",
      "palpable",
      "palpitate",
      "paltry",
      "pampered",
      "pamperer",
      "pampers",
      "pamphlet",
      "panama",
      "pancake",
      "pancreas",
      "panda",
      "pandemic",
      "pang",
      "panhandle",
      "panic",
      "panning",
      "panorama",
      "panoramic",
      "panther",
      "pantomime",
      "pantry",
      "pants",
      "pantyhose",
      "paparazzi",
      "papaya",
      "paper",
      "paprika",
      "papyrus",
      "parabola",
      "parachute",
      "parade",
      "paradox",
      "paragraph",
      "parakeet",
      "paralegal",
      "paralyses",
      "paralysis",
      "paralyze",
      "paramedic",
      "parameter",
      "paramount",
      "parasail",
      "parasite",
      "parasitic",
      "parcel",
      "parched",
      "parchment",
      "pardon",
      "parish",
      "parka",
      "parking",
      "parkway",
      "parlor",
      "parmesan",
      "parole",
      "parrot",
      "parsley",
      "parsnip",
      "partake",
      "parted",
      "parting",
      "partition",
      "partly",
      "partner",
      "partridge",
      "party",
      "passable",
      "passably",
      "passage",
      "passcode",
      "passenger",
      "passerby",
      "passing",
      "passion",
      "passive",
      "passivism",
      "passover",
      "passport",
      "password",
      "pasta",
      "pasted",
      "pastel",
      "pastime",
      "pastor",
      "pastrami",
      "pasture",
      "pasty",
      "patchwork",
      "patchy",
      "paternal",
      "paternity",
      "path",
      "patience",
      "patient",
      "patio",
      "patriarch",
      "patriot",
      "patrol",
      "patronage",
      "patronize",
      "pauper",
      "pavement",
      "paver",
      "pavestone",
      "pavilion",
      "paving",
      "pawing",
      "payable",
      "payback",
      "paycheck",
      "payday",
      "payee",
      "payer",
      "paying",
      "payment",
      "payphone",
      "payroll",
      "pebble",
      "pebbly",
      "pecan",
      "pectin",
      "peculiar",
      "peddling",
      "pediatric",
      "pedicure",
      "pedigree",
      "pedometer",
      "pegboard",
      "pelican",
      "pellet",
      "pelt",
      "pelvis",
      "penalize",
      "penalty",
      "pencil",
      "pendant",
      "pending",
      "penholder",
      "penknife",
      "pennant",
      "penniless",
      "penny",
      "penpal",
      "pension",
      "pentagon",
      "pentagram",
      "pep",
      "perceive",
      "percent",
      "perch",
      "percolate",
      "perennial",
      "perfected",
      "perfectly",
      "perfume",
      "periscope",
      "perish",
      "perjurer",
      "perjury",
      "perkiness",
      "perky",
      "perm",
      "peroxide",
      "perpetual",
      "perplexed",
      "persecute",
      "persevere",
      "persuaded",
      "persuader",
      "pesky",
      "peso",
      "pessimism",
      "pessimist",
      "pester",
      "pesticide",
      "petal",
      "petite",
      "petition",
      "petri",
      "petroleum",
      "petted",
      "petticoat",
      "pettiness",
      "petty",
      "petunia",
      "phantom",
      "phobia",
      "phoenix",
      "phonebook",
      "phoney",
      "phonics",
      "phoniness",
      "phony",
      "phosphate",
      "photo",
      "phrase",
      "phrasing",
      "placard",
      "placate",
      "placidly",
      "plank",
      "planner",
      "plant",
      "plasma",
      "plaster",
      "plastic",
      "plated",
      "platform",
      "plating",
      "platinum",
      "platonic",
      "platter",
      "platypus",
      "plausible",
      "plausibly",
      "playable",
      "playback",
      "player",
      "playful",
      "playgroup",
      "playhouse",
      "playing",
      "playlist",
      "playmaker",
      "playmate",
      "playoff",
      "playpen",
      "playroom",
      "playset",
      "plaything",
      "playtime",
      "plaza",
      "pleading",
      "pleat",
      "pledge",
      "plentiful",
      "plenty",
      "plethora",
      "plexiglas",
      "pliable",
      "plod",
      "plop",
      "plot",
      "plow",
      "ploy",
      "pluck",
      "plug",
      "plunder",
      "plunging",
      "plural",
      "plus",
      "plutonium",
      "plywood",
      "poach",
      "pod",
      "poem",
      "poet",
      "pogo",
      "pointed",
      "pointer",
      "pointing",
      "pointless",
      "pointy",
      "poise",
      "poison",
      "poker",
      "poking",
      "polar",
      "police",
      "policy",
      "polio",
      "polish",
      "politely",
      "polka",
      "polo",
      "polyester",
      "polygon",
      "polygraph",
      "polymer",
      "poncho",
      "pond",
      "pony",
      "popcorn",
      "pope",
      "poplar",
      "popper",
      "poppy",
      "popsicle",
      "populace",
      "popular",
      "populate",
      "porcupine",
      "pork",
      "porous",
      "porridge",
      "portable",
      "portal",
      "portfolio",
      "porthole",
      "portion",
      "portly",
      "portside",
      "poser",
      "posh",
      "posing",
      "possible",
      "possibly",
      "possum",
      "postage",
      "postal",
      "postbox",
      "postcard",
      "posted",
      "poster",
      "posting",
      "postnasal",
      "posture",
      "postwar",
      "pouch",
      "pounce",
      "pouncing",
      "pound",
      "pouring",
      "pout",
      "powdered",
      "powdering",
      "powdery",
      "power",
      "powwow",
      "pox",
      "praising",
      "prance",
      "prancing",
      "pranker",
      "prankish",
      "prankster",
      "prayer",
      "praying",
      "preacher",
      "preaching",
      "preachy",
      "preamble",
      "precinct",
      "precise",
      "precision",
      "precook",
      "precut",
      "predator",
      "predefine",
      "predict",
      "preface",
      "prefix",
      "preflight",
      "preformed",
      "pregame",
      "pregnancy",
      "pregnant",
      "preheated",
      "prelaunch",
      "prelaw",
      "prelude",
      "premiere",
      "premises",
      "premium",
      "prenatal",
      "preoccupy",
      "preorder",
      "prepaid",
      "prepay",
      "preplan",
      "preppy",
      "preschool",
      "prescribe",
      "preseason",
      "preset",
      "preshow",
      "president",
      "presoak",
      "press",
      "presume",
      "presuming",
      "preteen",
      "pretended",
      "pretender",
      "pretense",
      "pretext",
      "pretty",
      "pretzel",
      "prevail",
      "prevalent",
      "prevent",
      "preview",
      "previous",
      "prewar",
      "prewashed",
      "prideful",
      "pried",
      "primal",
      "primarily",
      "primary",
      "primate",
      "primer",
      "primp",
      "princess",
      "print",
      "prior",
      "prism",
      "prison",
      "prissy",
      "pristine",
      "privacy",
      "private",
      "privatize",
      "prize",
      "proactive",
      "probable",
      "probably",
      "probation",
      "probe",
      "probing",
      "probiotic",
      "problem",
      "procedure",
      "process",
      "proclaim",
      "procreate",
      "procurer",
      "prodigal",
      "prodigy",
      "produce",
      "product",
      "profane",
      "profanity",
      "professed",
      "professor",
      "profile",
      "profound",
      "profusely",
      "progeny",
      "prognosis",
      "program",
      "progress",
      "projector",
      "prologue",
      "prolonged",
      "promenade",
      "prominent",
      "promoter",
      "promotion",
      "prompter",
      "promptly",
      "prone",
      "prong",
      "pronounce",
      "pronto",
      "proofing",
      "proofread",
      "proofs",
      "propeller",
      "properly",
      "property",
      "proponent",
      "proposal",
      "propose",
      "props",
      "prorate",
      "protector",
      "protegee",
      "proton",
      "prototype",
      "protozoan",
      "protract",
      "protrude",
      "proud",
      "provable",
      "proved",
      "proven",
      "provided",
      "provider",
      "providing",
      "province",
      "proving",
      "provoke",
      "provoking",
      "provolone",
      "prowess",
      "prowler",
      "prowling",
      "proximity",
      "proxy",
      "prozac",
      "prude",
      "prudishly",
      "prune",
      "pruning",
      "pry",
      "psychic",
      "public",
      "publisher",
      "pucker",
      "pueblo",
      "pug",
      "pull",
      "pulmonary",
      "pulp",
      "pulsate",
      "pulse",
      "pulverize",
      "puma",
      "pumice",
      "pummel",
      "punch",
      "punctual",
      "punctuate",
      "punctured",
      "pungent",
      "punisher",
      "punk",
      "pupil",
      "puppet",
      "puppy",
      "purchase",
      "pureblood",
      "purebred",
      "purely",
      "pureness",
      "purgatory",
      "purge",
      "purging",
      "purifier",
      "purify",
      "purist",
      "puritan",
      "purity",
      "purple",
      "purplish",
      "purposely",
      "purr",
      "purse",
      "pursuable",
      "pursuant",
      "pursuit",
      "purveyor",
      "pushcart",
      "pushchair",
      "pusher",
      "pushiness",
      "pushing",
      "pushover",
      "pushpin",
      "pushup",
      "pushy",
      "putdown",
      "putt",
      "puzzle",
      "puzzling",
      "pyramid",
      "pyromania",
      "python",
      "quack",
      "quadrant",
      "quail",
      "quaintly",
      "quake",
      "quaking",
      "qualified",
      "qualifier",
      "qualify",
      "quality",
      "qualm",
      "quantum",
      "quarrel",
      "quarry",
      "quartered",
      "quarterly",
      "quarters",
      "quartet",
      "quench",
      "query",
      "quicken",
      "quickly",
      "quickness",
      "quicksand",
      "quickstep",
      "quiet",
      "quill",
      "quilt",
      "quintet",
      "quintuple",
      "quirk",
      "quit",
      "quiver",
      "quizzical",
      "quotable",
      "quotation",
      "quote",
      "rabid",
      "race",
      "racing",
      "racism",
      "rack",
      "racoon",
      "radar",
      "radial",
      "radiance",
      "radiantly",
      "radiated",
      "radiation",
      "radiator",
      "radio",
      "radish",
      "raffle",
      "raft",
      "rage",
      "ragged",
      "raging",
      "ragweed",
      "raider",
      "railcar",
      "railing",
      "railroad",
      "railway",
      "raisin",
      "rake",
      "raking",
      "rally",
      "ramble",
      "rambling",
      "ramp",
      "ramrod",
      "ranch",
      "rancidity",
      "random",
      "ranged",
      "ranger",
      "ranging",
      "ranked",
      "ranking",
      "ransack",
      "ranting",
      "rants",
      "rare",
      "rarity",
      "rascal",
      "rash",
      "rasping",
      "ravage",
      "raven",
      "ravine",
      "raving",
      "ravioli",
      "ravishing",
      "reabsorb",
      "reach",
      "reacquire",
      "reaction",
      "reactive",
      "reactor",
      "reaffirm",
      "ream",
      "reanalyze",
      "reappear",
      "reapply",
      "reappoint",
      "reapprove",
      "rearrange",
      "rearview",
      "reason",
      "reassign",
      "reassure",
      "reattach",
      "reawake",
      "rebalance",
      "rebate",
      "rebel",
      "rebirth",
      "reboot",
      "reborn",
      "rebound",
      "rebuff",
      "rebuild",
      "rebuilt",
      "reburial",
      "rebuttal",
      "recall",
      "recant",
      "recapture",
      "recast",
      "recede",
      "recent",
      "recess",
      "recharger",
      "recipient",
      "recital",
      "recite",
      "reckless",
      "reclaim",
      "recliner",
      "reclining",
      "recluse",
      "reclusive",
      "recognize",
      "recoil",
      "recollect",
      "recolor",
      "reconcile",
      "reconfirm",
      "reconvene",
      "recopy",
      "record",
      "recount",
      "recoup",
      "recovery",
      "recreate",
      "rectal",
      "rectangle",
      "rectified",
      "rectify",
      "recycled",
      "recycler",
      "recycling",
      "reemerge",
      "reenact",
      "reenter",
      "reentry",
      "reexamine",
      "referable",
      "referee",
      "reference",
      "refill",
      "refinance",
      "refined",
      "refinery",
      "refining",
      "refinish",
      "reflected",
      "reflector",
      "reflex",
      "reflux",
      "refocus",
      "refold",
      "reforest",
      "reformat",
      "reformed",
      "reformer",
      "reformist",
      "refract",
      "refrain",
      "refreeze",
      "refresh",
      "refried",
      "refueling",
      "refund",
      "refurbish",
      "refurnish",
      "refusal",
      "refuse",
      "refusing",
      "refutable",
      "refute",
      "regain",
      "regalia",
      "regally",
      "reggae",
      "regime",
      "region",
      "register",
      "registrar",
      "registry",
      "regress",
      "regretful",
      "regroup",
      "regular",
      "regulate",
      "regulator",
      "rehab",
      "reheat",
      "rehire",
      "rehydrate",
      "reimburse",
      "reissue",
      "reiterate",
      "rejoice",
      "rejoicing",
      "rejoin",
      "rekindle",
      "relapse",
      "relapsing",
      "relatable",
      "related",
      "relation",
      "relative",
      "relax",
      "relay",
      "relearn",
      "release",
      "relenting",
      "reliable",
      "reliably",
      "reliance",
      "reliant",
      "relic",
      "relieve",
      "relieving",
      "relight",
      "relish",
      "relive",
      "reload",
      "relocate",
      "relock",
      "reluctant",
      "rely",
      "remake",
      "remark",
      "remarry",
      "rematch",
      "remedial",
      "remedy",
      "remember",
      "reminder",
      "remindful",
      "remission",
      "remix",
      "remnant",
      "remodeler",
      "remold",
      "remorse",
      "remote",
      "removable",
      "removal",
      "removed",
      "remover",
      "removing",
      "rename",
      "renderer",
      "rendering",
      "rendition",
      "renegade",
      "renewable",
      "renewably",
      "renewal",
      "renewed",
      "renounce",
      "renovate",
      "renovator",
      "rentable",
      "rental",
      "rented",
      "renter",
      "reoccupy",
      "reoccur",
      "reopen",
      "reorder",
      "repackage",
      "repacking",
      "repaint",
      "repair",
      "repave",
      "repaying",
      "repayment",
      "repeal",
      "repeated",
      "repeater",
      "repent",
      "rephrase",
      "replace",
      "replay",
      "replica",
      "reply",
      "reporter",
      "repose",
      "repossess",
      "repost",
      "repressed",
      "reprimand",
      "reprint",
      "reprise",
      "reproach",
      "reprocess",
      "reproduce",
      "reprogram",
      "reps",
      "reptile",
      "reptilian",
      "repugnant",
      "repulsion",
      "repulsive",
      "repurpose",
      "reputable",
      "reputably",
      "request",
      "require",
      "requisite",
      "reroute",
      "rerun",
      "resale",
      "resample",
      "rescuer",
      "reseal",
      "research",
      "reselect",
      "reseller",
      "resemble",
      "resend",
      "resent",
      "reset",
      "reshape",
      "reshoot",
      "reshuffle",
      "residence",
      "residency",
      "resident",
      "residual",
      "residue",
      "resigned",
      "resilient",
      "resistant",
      "resisting",
      "resize",
      "resolute",
      "resolved",
      "resonant",
      "resonate",
      "resort",
      "resource",
      "respect",
      "resubmit",
      "result",
      "resume",
      "resupply",
      "resurface",
      "resurrect",
      "retail",
      "retainer",
      "retaining",
      "retake",
      "retaliate",
      "retention",
      "rethink",
      "retinal",
      "retired",
      "retiree",
      "retiring",
      "retold",
      "retool",
      "retorted",
      "retouch",
      "retrace",
      "retract",
      "retrain",
      "retread",
      "retreat",
      "retrial",
      "retrieval",
      "retriever",
      "retry",
      "return",
      "retying",
      "retype",
      "reunion",
      "reunite",
      "reusable",
      "reuse",
      "reveal",
      "reveler",
      "revenge",
      "revenue",
      "reverb",
      "revered",
      "reverence",
      "reverend",
      "reversal",
      "reverse",
      "reversing",
      "reversion",
      "revert",
      "revisable",
      "revise",
      "revision",
      "revisit",
      "revivable",
      "revival",
      "reviver",
      "reviving",
      "revocable",
      "revoke",
      "revolt",
      "revolver",
      "revolving",
      "reward",
      "rewash",
      "rewind",
      "rewire",
      "reword",
      "rework",
      "rewrap",
      "rewrite",
      "rhyme",
      "ribbon",
      "ribcage",
      "rice",
      "riches",
      "richly",
      "richness",
      "rickety",
      "ricotta",
      "riddance",
      "ridden",
      "ride",
      "riding",
      "rifling",
      "rift",
      "rigging",
      "rigid",
      "rigor",
      "rimless",
      "rimmed",
      "rind",
      "rink",
      "rinse",
      "rinsing",
      "riot",
      "ripcord",
      "ripeness",
      "ripening",
      "ripping",
      "ripple",
      "rippling",
      "riptide",
      "rise",
      "rising",
      "risk",
      "risotto",
      "ritalin",
      "ritzy",
      "rival",
      "riverbank",
      "riverbed",
      "riverboat",
      "riverside",
      "riveter",
      "riveting",
      "roamer",
      "roaming",
      "roast",
      "robbing",
      "robe",
      "robin",
      "robotics",
      "robust",
      "rockband",
      "rocker",
      "rocket",
      "rockfish",
      "rockiness",
      "rocking",
      "rocklike",
      "rockslide",
      "rockstar",
      "rocky",
      "rogue",
      "roman",
      "romp",
      "rope",
      "roping",
      "roster",
      "rosy",
      "rotten",
      "rotting",
      "rotunda",
      "roulette",
      "rounding",
      "roundish",
      "roundness",
      "roundup",
      "roundworm",
      "routine",
      "routing",
      "rover",
      "roving",
      "royal",
      "rubbed",
      "rubber",
      "rubbing",
      "rubble",
      "rubdown",
      "ruby",
      "ruckus",
      "rudder",
      "rug",
      "ruined",
      "rule",
      "rumble",
      "rumbling",
      "rummage",
      "rumor",
      "runaround",
      "rundown",
      "runner",
      "running",
      "runny",
      "runt",
      "runway",
      "rupture",
      "rural",
      "ruse",
      "rush",
      "rust",
      "rut",
      "sabbath",
      "sabotage",
      "sacrament",
      "sacred",
      "sacrifice",
      "sadden",
      "saddlebag",
      "saddled",
      "saddling",
      "sadly",
      "sadness",
      "safari",
      "safeguard",
      "safehouse",
      "safely",
      "safeness",
      "saffron",
      "saga",
      "sage",
      "sagging",
      "saggy",
      "said",
      "saint",
      "sake",
      "salad",
      "salami",
      "salaried",
      "salary",
      "saline",
      "salon",
      "saloon",
      "salsa",
      "salt",
      "salutary",
      "salute",
      "salvage",
      "salvaging",
      "salvation",
      "same",
      "sample",
      "sampling",
      "sanction",
      "sanctity",
      "sanctuary",
      "sandal",
      "sandbag",
      "sandbank",
      "sandbar",
      "sandblast",
      "sandbox",
      "sanded",
      "sandfish",
      "sanding",
      "sandlot",
      "sandpaper",
      "sandpit",
      "sandstone",
      "sandstorm",
      "sandworm",
      "sandy",
      "sanitary",
      "sanitizer",
      "sank",
      "santa",
      "sapling",
      "sappiness",
      "sappy",
      "sarcasm",
      "sarcastic",
      "sardine",
      "sash",
      "sasquatch",
      "sassy",
      "satchel",
      "satiable",
      "satin",
      "satirical",
      "satisfied",
      "satisfy",
      "saturate",
      "saturday",
      "sauciness",
      "saucy",
      "sauna",
      "savage",
      "savanna",
      "saved",
      "savings",
      "savior",
      "savor",
      "saxophone",
      "say",
      "scabbed",
      "scabby",
      "scalded",
      "scalding",
      "scale",
      "scaling",
      "scallion",
      "scallop",
      "scalping",
      "scam",
      "scandal",
      "scanner",
      "scanning",
      "scant",
      "scapegoat",
      "scarce",
      "scarcity",
      "scarecrow",
      "scared",
      "scarf",
      "scarily",
      "scariness",
      "scarring",
      "scary",
      "scavenger",
      "scenic",
      "schedule",
      "schematic",
      "scheme",
      "scheming",
      "schilling",
      "schnapps",
      "scholar",
      "science",
      "scientist",
      "scion",
      "scoff",
      "scolding",
      "scone",
      "scoop",
      "scooter",
      "scope",
      "scorch",
      "scorebook",
      "scorecard",
      "scored",
      "scoreless",
      "scorer",
      "scoring",
      "scorn",
      "scorpion",
      "scotch",
      "scoundrel",
      "scoured",
      "scouring",
      "scouting",
      "scouts",
      "scowling",
      "scrabble",
      "scraggly",
      "scrambled",
      "scrambler",
      "scrap",
      "scratch",
      "scrawny",
      "screen",
      "scribble",
      "scribe",
      "scribing",
      "scrimmage",
      "script",
      "scroll",
      "scrooge",
      "scrounger",
      "scrubbed",
      "scrubber",
      "scruffy",
      "scrunch",
      "scrutiny",
      "scuba",
      "scuff",
      "sculptor",
      "sculpture",
      "scurvy",
      "scuttle",
      "secluded",
      "secluding",
      "seclusion",
      "second",
      "secrecy",
      "secret",
      "sectional",
      "sector",
      "secular",
      "securely",
      "security",
      "sedan",
      "sedate",
      "sedation",
      "sedative",
      "sediment",
      "seduce",
      "seducing",
      "segment",
      "seismic",
      "seizing",
      "seldom",
      "selected",
      "selection",
      "selective",
      "selector",
      "self",
      "seltzer",
      "semantic",
      "semester",
      "semicolon",
      "semifinal",
      "seminar",
      "semisoft",
      "semisweet",
      "senate",
      "senator",
      "send",
      "senior",
      "senorita",
      "sensation",
      "sensitive",
      "sensitize",
      "sensually",
      "sensuous",
      "sepia",
      "september",
      "septic",
      "septum",
      "sequel",
      "sequence",
      "sequester",
      "series",
      "sermon",
      "serotonin",
      "serpent",
      "serrated",
      "serve",
      "service",
      "serving",
      "sesame",
      "sessions",
      "setback",
      "setting",
      "settle",
      "settling",
      "setup",
      "sevenfold",
      "seventeen",
      "seventh",
      "seventy",
      "severity",
      "shabby",
      "shack",
      "shaded",
      "shadily",
      "shadiness",
      "shading",
      "shadow",
      "shady",
      "shaft",
      "shakable",
      "shakily",
      "shakiness",
      "shaking",
      "shaky",
      "shale",
      "shallot",
      "shallow",
      "shame",
      "shampoo",
      "shamrock",
      "shank",
      "shanty",
      "shape",
      "shaping",
      "share",
      "sharpener",
      "sharper",
      "sharpie",
      "sharply",
      "sharpness",
      "shawl",
      "sheath",
      "shed",
      "sheep",
      "sheet",
      "shelf",
      "shell",
      "shelter",
      "shelve",
      "shelving",
      "sherry",
      "shield",
      "shifter",
      "shifting",
      "shiftless",
      "shifty",
      "shimmer",
      "shimmy",
      "shindig",
      "shine",
      "shingle",
      "shininess",
      "shining",
      "shiny",
      "ship",
      "shirt",
      "shivering",
      "shock",
      "shone",
      "shoplift",
      "shopper",
      "shopping",
      "shoptalk",
      "shore",
      "shortage",
      "shortcake",
      "shortcut",
      "shorten",
      "shorter",
      "shorthand",
      "shortlist",
      "shortly",
      "shortness",
      "shorts",
      "shortwave",
      "shorty",
      "shout",
      "shove",
      "showbiz",
      "showcase",
      "showdown",
      "shower",
      "showgirl",
      "showing",
      "showman",
      "shown",
      "showoff",
      "showpiece",
      "showplace",
      "showroom",
      "showy",
      "shrank",
      "shrapnel",
      "shredder",
      "shredding",
      "shrewdly",
      "shriek",
      "shrill",
      "shrimp",
      "shrine",
      "shrink",
      "shrivel",
      "shrouded",
      "shrubbery",
      "shrubs",
      "shrug",
      "shrunk",
      "shucking",
      "shudder",
      "shuffle",
      "shuffling",
      "shun",
      "shush",
      "shut",
      "shy",
      "siamese",
      "siberian",
      "sibling",
      "siding",
      "sierra",
      "siesta",
      "sift",
      "sighing",
      "silenced",
      "silencer",
      "silent",
      "silica",
      "silicon",
      "silk",
      "silliness",
      "silly",
      "silo",
      "silt",
      "silver",
      "similarly",
      "simile",
      "simmering",
      "simple",
      "simplify",
      "simply",
      "sincere",
      "sincerity",
      "singer",
      "singing",
      "single",
      "singular",
      "sinister",
      "sinless",
      "sinner",
      "sinuous",
      "sip",
      "siren",
      "sister",
      "sitcom",
      "sitter",
      "sitting",
      "situated",
      "situation",
      "sixfold",
      "sixteen",
      "sixth",
      "sixties",
      "sixtieth",
      "sixtyfold",
      "sizable",
      "sizably",
      "size",
      "sizing",
      "sizzle",
      "sizzling",
      "skater",
      "skating",
      "skedaddle",
      "skeletal",
      "skeleton",
      "skeptic",
      "sketch",
      "skewed",
      "skewer",
      "skid",
      "skied",
      "skier",
      "skies",
      "skiing",
      "skilled",
      "skillet",
      "skillful",
      "skimmed",
      "skimmer",
      "skimming",
      "skimpily",
      "skincare",
      "skinhead",
      "skinless",
      "skinning",
      "skinny",
      "skintight",
      "skipper",
      "skipping",
      "skirmish",
      "skirt",
      "skittle",
      "skydiver",
      "skylight",
      "skyline",
      "skype",
      "skyrocket",
      "skyward",
      "slab",
      "slacked",
      "slacker",
      "slacking",
      "slackness",
      "slacks",
      "slain",
      "slam",
      "slander",
      "slang",
      "slapping",
      "slapstick",
      "slashed",
      "slashing",
      "slate",
      "slather",
      "slaw",
      "sled",
      "sleek",
      "sleep",
      "sleet",
      "sleeve",
      "slept",
      "sliceable",
      "sliced",
      "slicer",
      "slicing",
      "slick",
      "slider",
      "slideshow",
      "sliding",
      "slighted",
      "slighting",
      "slightly",
      "slimness",
      "slimy",
      "slinging",
      "slingshot",
      "slinky",
      "slip",
      "slit",
      "sliver",
      "slobbery",
      "slogan",
      "sloped",
      "sloping",
      "sloppily",
      "sloppy",
      "slot",
      "slouching",
      "slouchy",
      "sludge",
      "slug",
      "slum",
      "slurp",
      "slush",
      "sly",
      "small",
      "smartly",
      "smartness",
      "smasher",
      "smashing",
      "smashup",
      "smell",
      "smelting",
      "smile",
      "smilingly",
      "smirk",
      "smite",
      "smith",
      "smitten",
      "smock",
      "smog",
      "smoked",
      "smokeless",
      "smokiness",
      "smoking",
      "smoky",
      "smolder",
      "smooth",
      "smother",
      "smudge",
      "smudgy",
      "smuggler",
      "smuggling",
      "smugly",
      "smugness",
      "snack",
      "snagged",
      "snaking",
      "snap",
      "snare",
      "snarl",
      "snazzy",
      "sneak",
      "sneer",
      "sneeze",
      "sneezing",
      "snide",
      "sniff",
      "snippet",
      "snipping",
      "snitch",
      "snooper",
      "snooze",
      "snore",
      "snoring",
      "snorkel",
      "snort",
      "snout",
      "snowbird",
      "snowboard",
      "snowbound",
      "snowcap",
      "snowdrift",
      "snowdrop",
      "snowfall",
      "snowfield",
      "snowflake",
      "snowiness",
      "snowless",
      "snowman",
      "snowplow",
      "snowshoe",
      "snowstorm",
      "snowsuit",
      "snowy",
      "snub",
      "snuff",
      "snuggle",
      "snugly",
      "snugness",
      "speak",
      "spearfish",
      "spearhead",
      "spearman",
      "spearmint",
      "species",
      "specimen",
      "specked",
      "speckled",
      "specks",
      "spectacle",
      "spectator",
      "spectrum",
      "speculate",
      "speech",
      "speed",
      "spellbind",
      "speller",
      "spelling",
      "spendable",
      "spender",
      "spending",
      "spent",
      "spew",
      "sphere",
      "spherical",
      "sphinx",
      "spider",
      "spied",
      "spiffy",
      "spill",
      "spilt",
      "spinach",
      "spinal",
      "spindle",
      "spinner",
      "spinning",
      "spinout",
      "spinster",
      "spiny",
      "spiral",
      "spirited",
      "spiritism",
      "spirits",
      "spiritual",
      "splashed",
      "splashing",
      "splashy",
      "splatter",
      "spleen",
      "splendid",
      "splendor",
      "splice",
      "splicing",
      "splinter",
      "splotchy",
      "splurge",
      "spoilage",
      "spoiled",
      "spoiler",
      "spoiling",
      "spoils",
      "spoken",
      "spokesman",
      "sponge",
      "spongy",
      "sponsor",
      "spoof",
      "spookily",
      "spooky",
      "spool",
      "spoon",
      "spore",
      "sporting",
      "sports",
      "sporty",
      "spotless",
      "spotlight",
      "spotted",
      "spotter",
      "spotting",
      "spotty",
      "spousal",
      "spouse",
      "spout",
      "sprain",
      "sprang",
      "sprawl",
      "spray",
      "spree",
      "sprig",
      "spring",
      "sprinkled",
      "sprinkler",
      "sprint",
      "sprite",
      "sprout",
      "spruce",
      "sprung",
      "spry",
      "spud",
      "spur",
      "sputter",
      "spyglass",
      "squabble",
      "squad",
      "squall",
      "squander",
      "squash",
      "squatted",
      "squatter",
      "squatting",
      "squeak",
      "squealer",
      "squealing",
      "squeamish",
      "squeegee",
      "squeeze",
      "squeezing",
      "squid",
      "squiggle",
      "squiggly",
      "squint",
      "squire",
      "squirt",
      "squishier",
      "squishy",
      "stability",
      "stabilize",
      "stable",
      "stack",
      "stadium",
      "staff",
      "stage",
      "staging",
      "stagnant",
      "stagnate",
      "stainable",
      "stained",
      "staining",
      "stainless",
      "stalemate",
      "staleness",
      "stalling",
      "stallion",
      "stamina",
      "stammer",
      "stamp",
      "stand",
      "stank",
      "staple",
      "stapling",
      "starboard",
      "starch",
      "stardom",
      "stardust",
      "starfish",
      "stargazer",
      "staring",
      "stark",
      "starless",
      "starlet",
      "starlight",
      "starlit",
      "starring",
      "starry",
      "starship",
      "starter",
      "starting",
      "startle",
      "startling",
      "startup",
      "starved",
      "starving",
      "stash",
      "state",
      "static",
      "statistic",
      "statue",
      "stature",
      "status",
      "statute",
      "statutory",
      "staunch",
      "stays",
      "steadfast",
      "steadier",
      "steadily",
      "steadying",
      "steam",
      "steed",
      "steep",
      "steerable",
      "steering",
      "steersman",
      "stegosaur",
      "stellar",
      "stem",
      "stench",
      "stencil",
      "step",
      "stereo",
      "sterile",
      "sterility",
      "sterilize",
      "sterling",
      "sternness",
      "sternum",
      "stew",
      "stick",
      "stiffen",
      "stiffly",
      "stiffness",
      "stifle",
      "stifling",
      "stillness",
      "stilt",
      "stimulant",
      "stimulate",
      "stimuli",
      "stimulus",
      "stinger",
      "stingily",
      "stinging",
      "stingray",
      "stingy",
      "stinking",
      "stinky",
      "stipend",
      "stipulate",
      "stir",
      "stitch",
      "stock",
      "stoic",
      "stoke",
      "stole",
      "stomp",
      "stonewall",
      "stoneware",
      "stonework",
      "stoning",
      "stony",
      "stood",
      "stooge",
      "stool",
      "stoop",
      "stoplight",
      "stoppable",
      "stoppage",
      "stopped",
      "stopper",
      "stopping",
      "stopwatch",
      "storable",
      "storage",
      "storeroom",
      "storewide",
      "storm",
      "stout",
      "stove",
      "stowaway",
      "stowing",
      "straddle",
      "straggler",
      "strained",
      "strainer",
      "straining",
      "strangely",
      "stranger",
      "strangle",
      "strategic",
      "strategy",
      "stratus",
      "straw",
      "stray",
      "streak",
      "stream",
      "street",
      "strength",
      "strenuous",
      "strep",
      "stress",
      "stretch",
      "strewn",
      "stricken",
      "strict",
      "stride",
      "strife",
      "strike",
      "striking",
      "strive",
      "striving",
      "strobe",
      "strode",
      "stroller",
      "strongbox",
      "strongly",
      "strongman",
      "struck",
      "structure",
      "strudel",
      "struggle",
      "strum",
      "strung",
      "strut",
      "stubbed",
      "stubble",
      "stubbly",
      "stubborn",
      "stucco",
      "stuck",
      "student",
      "studied",
      "studio",
      "study",
      "stuffed",
      "stuffing",
      "stuffy",
      "stumble",
      "stumbling",
      "stump",
      "stung",
      "stunned",
      "stunner",
      "stunning",
      "stunt",
      "stupor",
      "sturdily",
      "sturdy",
      "styling",
      "stylishly",
      "stylist",
      "stylized",
      "stylus",
      "suave",
      "subarctic",
      "subatomic",
      "subdivide",
      "subdued",
      "subduing",
      "subfloor",
      "subgroup",
      "subheader",
      "subject",
      "sublease",
      "sublet",
      "sublevel",
      "sublime",
      "submarine",
      "submerge",
      "submersed",
      "submitter",
      "subpanel",
      "subpar",
      "subplot",
      "subprime",
      "subscribe",
      "subscript",
      "subsector",
      "subside",
      "subsiding",
      "subsidize",
      "subsidy",
      "subsoil",
      "subsonic",
      "substance",
      "subsystem",
      "subtext",
      "subtitle",
      "subtly",
      "subtotal",
      "subtract",
      "subtype",
      "suburb",
      "subway",
      "subwoofer",
      "subzero",
      "succulent",
      "such",
      "suction",
      "sudden",
      "sudoku",
      "suds",
      "sufferer",
      "suffering",
      "suffice",
      "suffix",
      "suffocate",
      "suffrage",
      "sugar",
      "suggest",
      "suing",
      "suitable",
      "suitably",
      "suitcase",
      "suitor",
      "sulfate",
      "sulfide",
      "sulfite",
      "sulfur",
      "sulk",
      "sullen",
      "sulphate",
      "sulphuric",
      "sultry",
      "superbowl",
      "superglue",
      "superhero",
      "superior",
      "superjet",
      "superman",
      "supermom",
      "supernova",
      "supervise",
      "supper",
      "supplier",
      "supply",
      "support",
      "supremacy",
      "supreme",
      "surcharge",
      "surely",
      "sureness",
      "surface",
      "surfacing",
      "surfboard",
      "surfer",
      "surgery",
      "surgical",
      "surging",
      "surname",
      "surpass",
      "surplus",
      "surprise",
      "surreal",
      "surrender",
      "surrogate",
      "surround",
      "survey",
      "survival",
      "survive",
      "surviving",
      "survivor",
      "sushi",
      "suspect",
      "suspend",
      "suspense",
      "sustained",
      "sustainer",
      "swab",
      "swaddling",
      "swagger",
      "swampland",
      "swan",
      "swapping",
      "swarm",
      "sway",
      "swear",
      "sweat",
      "sweep",
      "swell",
      "swept",
      "swerve",
      "swifter",
      "swiftly",
      "swiftness",
      "swimmable",
      "swimmer",
      "swimming",
      "swimsuit",
      "swimwear",
      "swinger",
      "swinging",
      "swipe",
      "swirl",
      "switch",
      "swivel",
      "swizzle",
      "swooned",
      "swoop",
      "swoosh",
      "swore",
      "sworn",
      "swung",
      "sycamore",
      "sympathy",
      "symphonic",
      "symphony",
      "symptom",
      "synapse",
      "syndrome",
      "synergy",
      "synopses",
      "synopsis",
      "synthesis",
      "synthetic",
      "syrup",
      "system",
      "t-shirt",
      "tabasco",
      "tabby",
      "tableful",
      "tables",
      "tablet",
      "tableware",
      "tabloid",
      "tackiness",
      "tacking",
      "tackle",
      "tackling",
      "tacky",
      "taco",
      "tactful",
      "tactical",
      "tactics",
      "tactile",
      "tactless",
      "tadpole",
      "taekwondo",
      "tag",
      "tainted",
      "take",
      "taking",
      "talcum",
      "talisman",
      "tall",
      "talon",
      "tamale",
      "tameness",
      "tamer",
      "tamper",
      "tank",
      "tanned",
      "tannery",
      "tanning",
      "tantrum",
      "tapeless",
      "tapered",
      "tapering",
      "tapestry",
      "tapioca",
      "tapping",
      "taps",
      "tarantula",
      "target",
      "tarmac",
      "tarnish",
      "tarot",
      "tartar",
      "tartly",
      "tartness",
      "task",
      "tassel",
      "taste",
      "tastiness",
      "tasting",
      "tasty",
      "tattered",
      "tattle",
      "tattling",
      "tattoo",
      "taunt",
      "tavern",
      "thank",
      "that",
      "thaw",
      "theater",
      "theatrics",
      "thee",
      "theft",
      "theme",
      "theology",
      "theorize",
      "thermal",
      "thermos",
      "thesaurus",
      "these",
      "thesis",
      "thespian",
      "thicken",
      "thicket",
      "thickness",
      "thieving",
      "thievish",
      "thigh",
      "thimble",
      "thing",
      "think",
      "thinly",
      "thinner",
      "thinness",
      "thinning",
      "thirstily",
      "thirsting",
      "thirsty",
      "thirteen",
      "thirty",
      "thong",
      "thorn",
      "those",
      "thousand",
      "thrash",
      "thread",
      "threaten",
      "threefold",
      "thrift",
      "thrill",
      "thrive",
      "thriving",
      "throat",
      "throbbing",
      "throng",
      "throttle",
      "throwaway",
      "throwback",
      "thrower",
      "throwing",
      "thud",
      "thumb",
      "thumping",
      "thursday",
      "thus",
      "thwarting",
      "thyself",
      "tiara",
      "tibia",
      "tidal",
      "tidbit",
      "tidiness",
      "tidings",
      "tidy",
      "tiger",
      "tighten",
      "tightly",
      "tightness",
      "tightrope",
      "tightwad",
      "tigress",
      "tile",
      "tiling",
      "till",
      "tilt",
      "timid",
      "timing",
      "timothy",
      "tinderbox",
      "tinfoil",
      "tingle",
      "tingling",
      "tingly",
      "tinker",
      "tinkling",
      "tinsel",
      "tinsmith",
      "tint",
      "tinwork",
      "tiny",
      "tipoff",
      "tipped",
      "tipper",
      "tipping",
      "tiptoeing",
      "tiptop",
      "tiring",
      "tissue",
      "trace",
      "tracing",
      "track",
      "traction",
      "tractor",
      "trade",
      "trading",
      "tradition",
      "traffic",
      "tragedy",
      "trailing",
      "trailside",
      "train",
      "traitor",
      "trance",
      "tranquil",
      "transfer",
      "transform",
      "translate",
      "transpire",
      "transport",
      "transpose",
      "trapdoor",
      "trapeze",
      "trapezoid",
      "trapped",
      "trapper",
      "trapping",
      "traps",
      "trash",
      "travel",
      "traverse",
      "travesty",
      "tray",
      "treachery",
      "treading",
      "treadmill",
      "treason",
      "treat",
      "treble",
      "tree",
      "trekker",
      "tremble",
      "trembling",
      "tremor",
      "trench",
      "trend",
      "trespass",
      "triage",
      "trial",
      "triangle",
      "tribesman",
      "tribunal",
      "tribune",
      "tributary",
      "tribute",
      "triceps",
      "trickery",
      "trickily",
      "tricking",
      "trickle",
      "trickster",
      "tricky",
      "tricolor",
      "tricycle",
      "trident",
      "tried",
      "trifle",
      "trifocals",
      "trillion",
      "trilogy",
      "trimester",
      "trimmer",
      "trimming",
      "trimness",
      "trinity",
      "trio",
      "tripod",
      "tripping",
      "triumph",
      "trivial",
      "trodden",
      "trolling",
      "trombone",
      "trophy",
      "tropical",
      "tropics",
      "trouble",
      "troubling",
      "trough",
      "trousers",
      "trout",
      "trowel",
      "truce",
      "truck",
      "truffle",
      "trump",
      "trunks",
      "trustable",
      "trustee",
      "trustful",
      "trusting",
      "trustless",
      "truth",
      "try",
      "tubby",
      "tubeless",
      "tubular",
      "tucking",
      "tuesday",
      "tug",
      "tuition",
      "tulip",
      "tumble",
      "tumbling",
      "tummy",
      "turban",
      "turbine",
      "turbofan",
      "turbojet",
      "turbulent",
      "turf",
      "turkey",
      "turmoil",
      "turret",
      "turtle",
      "tusk",
      "tutor",
      "tutu",
      "tux",
      "tweak",
      "tweed",
      "tweet",
      "tweezers",
      "twelve",
      "twentieth",
      "twenty",
      "twerp",
      "twice",
      "twiddle",
      "twiddling",
      "twig",
      "twilight",
      "twine",
      "twins",
      "twirl",
      "twistable",
      "twisted",
      "twister",
      "twisting",
      "twisty",
      "twitch",
      "twitter",
      "tycoon",
      "tying",
      "tyke",
      "udder",
      "ultimate",
      "ultimatum",
      "ultra",
      "umbilical",
      "umbrella",
      "umpire",
      "unabashed",
      "unable",
      "unadorned",
      "unadvised",
      "unafraid",
      "unaired",
      "unaligned",
      "unaltered",
      "unarmored",
      "unashamed",
      "unaudited",
      "unawake",
      "unaware",
      "unbaked",
      "unbalance",
      "unbeaten",
      "unbend",
      "unbent",
      "unbiased",
      "unbitten",
      "unblended",
      "unblessed",
      "unblock",
      "unbolted",
      "unbounded",
      "unboxed",
      "unbraided",
      "unbridle",
      "unbroken",
      "unbuckled",
      "unbundle",
      "unburned",
      "unbutton",
      "uncanny",
      "uncapped",
      "uncaring",
      "uncertain",
      "unchain",
      "unchanged",
      "uncharted",
      "uncheck",
      "uncivil",
      "unclad",
      "unclaimed",
      "unclamped",
      "unclasp",
      "uncle",
      "unclip",
      "uncloak",
      "unclog",
      "unclothed",
      "uncoated",
      "uncoiled",
      "uncolored",
      "uncombed",
      "uncommon",
      "uncooked",
      "uncork",
      "uncorrupt",
      "uncounted",
      "uncouple",
      "uncouth",
      "uncover",
      "uncross",
      "uncrown",
      "uncrushed",
      "uncured",
      "uncurious",
      "uncurled",
      "uncut",
      "undamaged",
      "undated",
      "undaunted",
      "undead",
      "undecided",
      "undefined",
      "underage",
      "underarm",
      "undercoat",
      "undercook",
      "undercut",
      "underdog",
      "underdone",
      "underfed",
      "underfeed",
      "underfoot",
      "undergo",
      "undergrad",
      "underhand",
      "underline",
      "underling",
      "undermine",
      "undermost",
      "underpaid",
      "underpass",
      "underpay",
      "underrate",
      "undertake",
      "undertone",
      "undertook",
      "undertow",
      "underuse",
      "underwear",
      "underwent",
      "underwire",
      "undesired",
      "undiluted",
      "undivided",
      "undocked",
      "undoing",
      "undone",
      "undrafted",
      "undress",
      "undrilled",
      "undusted",
      "undying",
      "unearned",
      "unearth",
      "unease",
      "uneasily",
      "uneasy",
      "uneatable",
      "uneaten",
      "unedited",
      "unelected",
      "unending",
      "unengaged",
      "unenvied",
      "unequal",
      "unethical",
      "uneven",
      "unexpired",
      "unexposed",
      "unfailing",
      "unfair",
      "unfasten",
      "unfazed",
      "unfeeling",
      "unfiled",
      "unfilled",
      "unfitted",
      "unfitting",
      "unfixable",
      "unfixed",
      "unflawed",
      "unfocused",
      "unfold",
      "unfounded",
      "unframed",
      "unfreeze",
      "unfrosted",
      "unfrozen",
      "unfunded",
      "unglazed",
      "ungloved",
      "unglue",
      "ungodly",
      "ungraded",
      "ungreased",
      "unguarded",
      "unguided",
      "unhappily",
      "unhappy",
      "unharmed",
      "unhealthy",
      "unheard",
      "unhearing",
      "unheated",
      "unhelpful",
      "unhidden",
      "unhinge",
      "unhitched",
      "unholy",
      "unhook",
      "unicorn",
      "unicycle",
      "unified",
      "unifier",
      "uniformed",
      "uniformly",
      "unify",
      "unimpeded",
      "uninjured",
      "uninstall",
      "uninsured",
      "uninvited",
      "union",
      "uniquely",
      "unisexual",
      "unison",
      "unissued",
      "unit",
      "universal",
      "universe",
      "unjustly",
      "unkempt",
      "unkind",
      "unknotted",
      "unknowing",
      "unknown",
      "unlaced",
      "unlatch",
      "unlawful",
      "unleaded",
      "unlearned",
      "unleash",
      "unless",
      "unleveled",
      "unlighted",
      "unlikable",
      "unlimited",
      "unlined",
      "unlinked",
      "unlisted",
      "unlit",
      "unlivable",
      "unloaded",
      "unloader",
      "unlocked",
      "unlocking",
      "unlovable",
      "unloved",
      "unlovely",
      "unloving",
      "unluckily",
      "unlucky",
      "unmade",
      "unmanaged",
      "unmanned",
      "unmapped",
      "unmarked",
      "unmasked",
      "unmasking",
      "unmatched",
      "unmindful",
      "unmixable",
      "unmixed",
      "unmolded",
      "unmoral",
      "unmovable",
      "unmoved",
      "unmoving",
      "unnamable",
      "unnamed",
      "unnatural",
      "unneeded",
      "unnerve",
      "unnerving",
      "unnoticed",
      "unopened",
      "unopposed",
      "unpack",
      "unpadded",
      "unpaid",
      "unpainted",
      "unpaired",
      "unpaved",
      "unpeeled",
      "unpicked",
      "unpiloted",
      "unpinned",
      "unplanned",
      "unplanted",
      "unpleased",
      "unpledged",
      "unplowed",
      "unplug",
      "unpopular",
      "unproven",
      "unquote",
      "unranked",
      "unrated",
      "unraveled",
      "unreached",
      "unread",
      "unreal",
      "unreeling",
      "unrefined",
      "unrelated",
      "unrented",
      "unrest",
      "unretired",
      "unrevised",
      "unrigged",
      "unripe",
      "unrivaled",
      "unroasted",
      "unrobed",
      "unroll",
      "unruffled",
      "unruly",
      "unrushed",
      "unsaddle",
      "unsafe",
      "unsaid",
      "unsalted",
      "unsaved",
      "unsavory",
      "unscathed",
      "unscented",
      "unscrew",
      "unsealed",
      "unseated",
      "unsecured",
      "unseeing",
      "unseemly",
      "unseen",
      "unselect",
      "unselfish",
      "unsent",
      "unsettled",
      "unshackle",
      "unshaken",
      "unshaved",
      "unshaven",
      "unsheathe",
      "unshipped",
      "unsightly",
      "unsigned",
      "unskilled",
      "unsliced",
      "unsmooth",
      "unsnap",
      "unsocial",
      "unsoiled",
      "unsold",
      "unsolved",
      "unsorted",
      "unspoiled",
      "unspoken",
      "unstable",
      "unstaffed",
      "unstamped",
      "unsteady",
      "unsterile",
      "unstirred",
      "unstitch",
      "unstopped",
      "unstuck",
      "unstuffed",
      "unstylish",
      "unsubtle",
      "unsubtly",
      "unsuited",
      "unsure",
      "unsworn",
      "untagged",
      "untainted",
      "untaken",
      "untamed",
      "untangled",
      "untapped",
      "untaxed",
      "unthawed",
      "unthread",
      "untidy",
      "untie",
      "until",
      "untimed",
      "untimely",
      "untitled",
      "untoasted",
      "untold",
      "untouched",
      "untracked",
      "untrained",
      "untreated",
      "untried",
      "untrimmed",
      "untrue",
      "untruth",
      "unturned",
      "untwist",
      "untying",
      "unusable",
      "unused",
      "unusual",
      "unvalued",
      "unvaried",
      "unvarying",
      "unveiled",
      "unveiling",
      "unvented",
      "unviable",
      "unvisited",
      "unvocal",
      "unwanted",
      "unwarlike",
      "unwary",
      "unwashed",
      "unwatched",
      "unweave",
      "unwed",
      "unwelcome",
      "unwell",
      "unwieldy",
      "unwilling",
      "unwind",
      "unwired",
      "unwitting",
      "unwomanly",
      "unworldly",
      "unworn",
      "unworried",
      "unworthy",
      "unwound",
      "unwoven",
      "unwrapped",
      "unwritten",
      "unzip",
      "upbeat",
      "upchuck",
      "upcoming",
      "upcountry",
      "update",
      "upfront",
      "upgrade",
      "upheaval",
      "upheld",
      "uphill",
      "uphold",
      "uplifted",
      "uplifting",
      "upload",
      "upon",
      "upper",
      "upright",
      "uprising",
      "upriver",
      "uproar",
      "uproot",
      "upscale",
      "upside",
      "upstage",
      "upstairs",
      "upstart",
      "upstate",
      "upstream",
      "upstroke",
      "upswing",
      "uptake",
      "uptight",
      "uptown",
      "upturned",
      "upward",
      "upwind",
      "uranium",
      "urban",
      "urchin",
      "urethane",
      "urgency",
      "urgent",
      "urging",
      "urologist",
      "urology",
      "usable",
      "usage",
      "useable",
      "used",
      "uselessly",
      "user",
      "usher",
      "usual",
      "utensil",
      "utility",
      "utilize",
      "utmost",
      "utopia",
      "utter",
      "vacancy",
      "vacant",
      "vacate",
      "vacation",
      "vagabond",
      "vagrancy",
      "vagrantly",
      "vaguely",
      "vagueness",
      "valiant",
      "valid",
      "valium",
      "valley",
      "valuables",
      "value",
      "vanilla",
      "vanish",
      "vanity",
      "vanquish",
      "vantage",
      "vaporizer",
      "variable",
      "variably",
      "varied",
      "variety",
      "various",
      "varmint",
      "varnish",
      "varsity",
      "varying",
      "vascular",
      "vaseline",
      "vastly",
      "vastness",
      "veal",
      "vegan",
      "veggie",
      "vehicular",
      "velcro",
      "velocity",
      "velvet",
      "vendetta",
      "vending",
      "vendor",
      "veneering",
      "vengeful",
      "venomous",
      "ventricle",
      "venture",
      "venue",
      "venus",
      "verbalize",
      "verbally",
      "verbose",
      "verdict",
      "verify",
      "verse",
      "version",
      "versus",
      "vertebrae",
      "vertical",
      "vertigo",
      "very",
      "vessel",
      "vest",
      "veteran",
      "veto",
      "vexingly",
      "viability",
      "viable",
      "vibes",
      "vice",
      "vicinity",
      "victory",
      "video",
      "viewable",
      "viewer",
      "viewing",
      "viewless",
      "viewpoint",
      "vigorous",
      "village",
      "villain",
      "vindicate",
      "vineyard",
      "vintage",
      "violate",
      "violation",
      "violator",
      "violet",
      "violin",
      "viper",
      "viral",
      "virtual",
      "virtuous",
      "virus",
      "visa",
      "viscosity",
      "viscous",
      "viselike",
      "visible",
      "visibly",
      "vision",
      "visiting",
      "visitor",
      "visor",
      "vista",
      "vitality",
      "vitalize",
      "vitally",
      "vitamins",
      "vivacious",
      "vividly",
      "vividness",
      "vixen",
      "vocalist",
      "vocalize",
      "vocally",
      "vocation",
      "voice",
      "voicing",
      "void",
      "volatile",
      "volley",
      "voltage",
      "volumes",
      "voter",
      "voting",
      "voucher",
      "vowed",
      "vowel",
      "voyage",
      "wackiness",
      "wad",
      "wafer",
      "waffle",
      "waged",
      "wager",
      "wages",
      "waggle",
      "wagon",
      "wake",
      "waking",
      "walk",
      "walmart",
      "walnut",
      "walrus",
      "waltz",
      "wand",
      "wannabe",
      "wanted",
      "wanting",
      "wasabi",
      "washable",
      "washbasin",
      "washboard",
      "washbowl",
      "washcloth",
      "washday",
      "washed",
      "washer",
      "washhouse",
      "washing",
      "washout",
      "washroom",
      "washstand",
      "washtub",
      "wasp",
      "wasting",
      "watch",
      "water",
      "waviness",
      "waving",
      "wavy",
      "whacking",
      "whacky",
      "wham",
      "wharf",
      "wheat",
      "whenever",
      "whiff",
      "whimsical",
      "whinny",
      "whiny",
      "whisking",
      "whoever",
      "whole",
      "whomever",
      "whoopee",
      "whooping",
      "whoops",
      "why",
      "wick",
      "widely",
      "widen",
      "widget",
      "widow",
      "width",
      "wieldable",
      "wielder",
      "wife",
      "wifi",
      "wikipedia",
      "wildcard",
      "wildcat",
      "wilder",
      "wildfire",
      "wildfowl",
      "wildland",
      "wildlife",
      "wildly",
      "wildness",
      "willed",
      "willfully",
      "willing",
      "willow",
      "willpower",
      "wilt",
      "wimp",
      "wince",
      "wincing",
      "wind",
      "wing",
      "winking",
      "winner",
      "winnings",
      "winter",
      "wipe",
      "wired",
      "wireless",
      "wiring",
      "wiry",
      "wisdom",
      "wise",
      "wish",
      "wisplike",
      "wispy",
      "wistful",
      "wizard",
      "wobble",
      "wobbling",
      "wobbly",
      "wok",
      "wolf",
      "wolverine",
      "womanhood",
      "womankind",
      "womanless",
      "womanlike",
      "womanly",
      "womb",
      "woof",
      "wooing",
      "wool",
      "woozy",
      "word",
      "work",
      "worried",
      "worrier",
      "worrisome",
      "worry",
      "worsening",
      "worshiper",
      "worst",
      "wound",
      "woven",
      "wow",
      "wrangle",
      "wrath",
      "wreath",
      "wreckage",
      "wrecker",
      "wrecking",
      "wrench",
      "wriggle",
      "wriggly",
      "wrinkle",
      "wrinkly",
      "wrist",
      "writing",
      "written",
      "wrongdoer",
      "wronged",
      "wrongful",
      "wrongly",
      "wrongness",
      "wrought",
      "xbox",
      "xerox",
      "yahoo",
      "yam",
      "yanking",
      "yapping",
      "yard",
      "yarn",
      "yeah",
      "yearbook",
      "yearling",
      "yearly",
      "yearning",
      "yeast",
      "yelling",
      "yelp",
      "yen",
      "yesterday",
      "yiddish",
      "yield",
      "yin",
      "yippee",
      "yo-yo",
      "yodel",
      "yoga",
      "yogurt",
      "yonder",
      "yoyo",
      "yummy",
      "zap",
      "zealous",
      "zebra",
      "zen",
      "zeppelin",
      "zero",
      "zestfully",
      "zesty",
      "zigzagged",
      "zipfile",
      "zipping",
      "zippy",
      "zips",
      "zit",
      "zodiac",
      "zombie",
      "zone",
      "zoning",
      "zookeeper",
      "zoologist",
      "zoology",
      "zoom"
    ];
  }
});

// node_modules/@ton/crypto/dist/passwords/newSecureWords.js
var require_newSecureWords = __commonJS({
  "node_modules/@ton/crypto/dist/passwords/newSecureWords.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.newSecureWords = void 0;
    var getSecureRandom_1 = require_getSecureRandom2();
    var wordlist_1 = require_wordlist();
    async function newSecureWords(size = 6) {
      let words = [];
      for (let i = 0; i < size; i++) {
        words.push(wordlist_1.wordlist[await (0, getSecureRandom_1.getSecureRandomNumber)(0, wordlist_1.wordlist.length)]);
      }
      return words;
    }
    exports.newSecureWords = newSecureWords;
  }
});

// node_modules/@ton/crypto/dist/passwords/newSecurePassphrase.js
var require_newSecurePassphrase = __commonJS({
  "node_modules/@ton/crypto/dist/passwords/newSecurePassphrase.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.newSecurePassphrase = void 0;
    var __1 = require_dist();
    async function newSecurePassphrase(size = 6) {
      return (await (0, __1.newSecureWords)(size)).join("-");
    }
    exports.newSecurePassphrase = newSecurePassphrase;
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
    init_buffer_shim();
  }
});

// node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/tweetnacl/nacl-fast.js"(exports, module2) {
    init_buffer_shim();
    (function(nacl2) {
      "use strict";
      var gf = function(init) {
        var i, r = new Float64Array(16);
        if (init)
          for (i = 0; i < init.length; i++)
            r[i] = init[i];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i, h, l) {
        x[i] = h >> 24 & 255;
        x[i + 1] = h >> 16 & 255;
        x[i + 2] = h >> 8 & 255;
        x[i + 3] = h & 255;
        x[i + 4] = l >> 24 & 255;
        x[i + 5] = l >> 16 & 255;
        x[i + 6] = l >> 8 & 255;
        x[i + 7] = l & 255;
      }
      function vn(x, xi, y, yi, n) {
        var i, d = 0;
        for (i = 0; i < n; i++)
          d |= x[xi + i] ^ y[yi + i];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x1 >>> 0 & 255;
        o[5] = x1 >>> 8 & 255;
        o[6] = x1 >>> 16 & 255;
        o[7] = x1 >>> 24 & 255;
        o[8] = x2 >>> 0 & 255;
        o[9] = x2 >>> 8 & 255;
        o[10] = x2 >>> 16 & 255;
        o[11] = x2 >>> 24 & 255;
        o[12] = x3 >>> 0 & 255;
        o[13] = x3 >>> 8 & 255;
        o[14] = x3 >>> 16 & 255;
        o[15] = x3 >>> 24 & 255;
        o[16] = x4 >>> 0 & 255;
        o[17] = x4 >>> 8 & 255;
        o[18] = x4 >>> 16 & 255;
        o[19] = x4 >>> 24 & 255;
        o[20] = x5 >>> 0 & 255;
        o[21] = x5 >>> 8 & 255;
        o[22] = x5 >>> 16 & 255;
        o[23] = x5 >>> 24 & 255;
        o[24] = x6 >>> 0 & 255;
        o[25] = x6 >>> 8 & 255;
        o[26] = x6 >>> 16 & 255;
        o[27] = x6 >>> 24 & 255;
        o[28] = x7 >>> 0 & 255;
        o[29] = x7 >>> 8 & 255;
        o[30] = x7 >>> 16 & 255;
        o[31] = x7 >>> 24 & 255;
        o[32] = x8 >>> 0 & 255;
        o[33] = x8 >>> 8 & 255;
        o[34] = x8 >>> 16 & 255;
        o[35] = x8 >>> 24 & 255;
        o[36] = x9 >>> 0 & 255;
        o[37] = x9 >>> 8 & 255;
        o[38] = x9 >>> 16 & 255;
        o[39] = x9 >>> 24 & 255;
        o[40] = x10 >>> 0 & 255;
        o[41] = x10 >>> 8 & 255;
        o[42] = x10 >>> 16 & 255;
        o[43] = x10 >>> 24 & 255;
        o[44] = x11 >>> 0 & 255;
        o[45] = x11 >>> 8 & 255;
        o[46] = x11 >>> 16 & 255;
        o[47] = x11 >>> 24 & 255;
        o[48] = x12 >>> 0 & 255;
        o[49] = x12 >>> 8 & 255;
        o[50] = x12 >>> 16 & 255;
        o[51] = x12 >>> 24 & 255;
        o[52] = x13 >>> 0 & 255;
        o[53] = x13 >>> 8 & 255;
        o[54] = x13 >>> 16 & 255;
        o[55] = x13 >>> 24 & 255;
        o[56] = x14 >>> 0 & 255;
        o[57] = x14 >>> 8 & 255;
        o[58] = x14 >>> 16 & 255;
        o[59] = x14 >>> 24 & 255;
        o[60] = x15 >>> 0 & 255;
        o[61] = x15 >>> 8 & 255;
        o[62] = x15 >>> 16 & 255;
        o[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x5 >>> 0 & 255;
        o[5] = x5 >>> 8 & 255;
        o[6] = x5 >>> 16 & 255;
        o[7] = x5 >>> 24 & 255;
        o[8] = x10 >>> 0 & 255;
        o[9] = x10 >>> 8 & 255;
        o[10] = x10 >>> 16 & 255;
        o[11] = x10 >>> 24 & 255;
        o[12] = x15 >>> 0 & 255;
        o[13] = x15 >>> 8 & 255;
        o[14] = x15 >>> 16 & 255;
        o[15] = x15 >>> 24 & 255;
        o[16] = x6 >>> 0 & 255;
        o[17] = x6 >>> 8 & 255;
        o[18] = x6 >>> 16 & 255;
        o[19] = x6 >>> 24 & 255;
        o[20] = x7 >>> 0 & 255;
        o[21] = x7 >>> 8 & 255;
        o[22] = x7 >>> 16 & 255;
        o[23] = x7 >>> 24 & 255;
        o[24] = x8 >>> 0 & 255;
        o[25] = x8 >>> 8 & 255;
        o[26] = x8 >>> 16 & 255;
        o[27] = x8 >>> 24 & 255;
        o[28] = x9 >>> 0 & 255;
        o[29] = x9 >>> 8 & 255;
        o[30] = x9 >>> 16 & 255;
        o[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z2 = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++)
          z2[i] = 0;
        for (i = 0; i < 8; i++)
          z2[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z2, k, sigma);
          for (i = 0; i < 64; i++)
            c[cpos + i] = m[mpos + i] ^ x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z2[i] & 255) | 0;
            z2[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z2, k, sigma);
          for (i = 0; i < b; i++)
            c[cpos + i] = m[mpos + i] ^ x[i];
        }
        return 0;
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z2 = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++)
          z2[i] = 0;
        for (i = 0; i < 8; i++)
          z2[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z2, k, sigma);
          for (i = 0; i < 64; i++)
            c[cpos + i] = x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z2[i] & 255) | 0;
            z2[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z2, k, sigma);
          for (i = 0; i < b; i++)
            c[cpos + i] = x[i];
        }
        return 0;
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++)
          sn[i] = n[i + 16];
        return crypto_stream_salsa20(c, cpos, d, sn, s);
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++)
          sn[i] = n[i + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i;
        if (this.leftover) {
          i = this.leftover;
          this.buffer[i++] = 1;
          for (; i < 16; i++)
            this.buffer[i] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this.h[i] += c;
          c = this.h[i] >>> 13;
          this.h[i] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++)
          g[i] &= mask;
        mask = ~mask;
        for (i = 0; i < 10; i++)
          this.h[i] = this.h[i] & mask | g[i];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
          this.h[i] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i = 0; i < want; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i = 0; i < bytes; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k);
        s.update(m, mpos, n);
        s.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i;
        if (d < 32)
          return -1;
        crypto_stream_xor(c, 0, m, 0, d, n, k);
        crypto_onetimeauth(c, 16, c, 32, d - 32, c);
        for (i = 0; i < 16; i++)
          c[i] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i;
        var x = new Uint8Array(32);
        if (d < 32)
          return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0)
          return -1;
        crypto_stream_xor(m, 0, c, 0, d, n, k);
        for (i = 0; i < 32; i++)
          m[i] = 0;
        return 0;
      }
      function set25519(r, a) {
        var i;
        for (i = 0; i < 16; i++)
          r[i] = a[i] | 0;
      }
      function car25519(o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535;
          c = Math.floor(v / 65536);
          o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        var t, c = ~(b - 1);
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i]);
          p[i] ^= t;
          q[i] ^= t;
        }
      }
      function pack25519(o, n) {
        var i, j, b;
        var m = gf(), t = gf();
        for (i = 0; i < 16; i++)
          t[i] = n[i];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255;
          o[2 * i + 1] = t[i] >> 8;
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d, b);
        return crypto_verify_32(c, 0, d, 0);
      }
      function par25519(a) {
        var d = new Uint8Array(32);
        pack25519(d, a);
        return d[0] & 1;
      }
      function unpack25519(o, n) {
        var i;
        for (i = 0; i < 16; i++)
          o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        o[15] &= 32767;
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++)
          o[i] = a[i] + b[i];
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++)
          o[i] = a[i] - b[i];
      }
      function M(o, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
      }
      function S(o, a) {
        M(o, a, a);
      }
      function inv25519(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4)
            M(c, c, i);
        }
        for (a = 0; a < 16; a++)
          o[a] = c[a];
      }
      function pow2523(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1)
            M(c, c, i);
        }
        for (a = 0; a < 16; a++)
          o[a] = c[a];
      }
      function crypto_scalarmult(q, n, p) {
        var z2 = new Uint8Array(32);
        var x = new Float64Array(80), r, i;
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
        for (i = 0; i < 31; i++)
          z2[i] = n[i];
        z2[31] = n[31] & 127 | 64;
        z2[0] &= 248;
        unpack25519(x, p);
        for (i = 0; i < 16; i++) {
          b[i] = x[i];
          d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
          r = z2[i >>> 3] >>> (i & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d, r);
          A(e, a, c);
          Z(a, a, c);
          A(c, b, d);
          Z(b, b, d);
          S(d, e);
          S(f, a);
          M(a, c, a);
          M(c, b, e);
          A(e, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d, f);
          M(a, c, _121665);
          A(a, a, d);
          M(c, c, a);
          M(a, d, f);
          M(d, b, x);
          S(b, e);
          sel25519(a, b, r);
          sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i];
          x[i + 32] = c[i];
          x[i + 48] = b[i];
          x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32);
        crypto_scalarmult(s, x, y);
        return crypto_core_hsalsa20(k, _0, s, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d, n, k);
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d, n, k);
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos;
            wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l = al7;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 65535 | d << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l = tl;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 65535 | d << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l = bl3;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 65535 | d << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l = wl[j];
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 65535 | d << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l = al0;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[0];
          l = hl[0];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[0] = ah0 = c & 65535 | d << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l = al1;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[1];
          l = hl[1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[1] = ah1 = c & 65535 | d << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l = al2;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[2];
          l = hl[2];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[2] = ah2 = c & 65535 | d << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l = al3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[3];
          l = hl[3];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[3] = ah3 = c & 65535 | d << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l = al4;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[4];
          l = hl[4];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[4] = ah4 = c & 65535 | d << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l = al5;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[5];
          l = hl[5];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[5] = ah5 = c & 65535 | d << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l = al6;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[6];
          l = hl[6];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[6] = ah6 = c & 65535 | d << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[7];
          l = hl[7];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[7] = ah7 = c & 65535 | d << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i = 0; i < n; i++)
          x[i] = m[b - n + i];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i = 0; i < 8; i++)
          ts64(out, 8 * i, hh[i], hl[i]);
        return 0;
      }
      function add(p, q) {
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p[1], p[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p[0], p[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p[3], q[3]);
        M(c, c, D2);
        M(d, p[2], q[2]);
        A(d, d, d);
        Z(e, b, a);
        Z(f, d, c);
        A(g, d, c);
        A(h, b, a);
        M(p[0], e, f);
        M(p[1], h, g);
        M(p[2], g, f);
        M(p[3], e, h);
      }
      function cswap(p, q, b) {
        var i;
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b);
        }
      }
      function pack(r, p) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p[2]);
        M(tx, p[0], zi);
        M(ty, p[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p, q, s) {
        var b, i;
        set25519(p[0], gf0);
        set25519(p[1], gf1);
        set25519(p[2], gf1);
        set25519(p[3], gf0);
        for (i = 255; i >= 0; --i) {
          b = s[i / 8 | 0] >> (i & 7) & 1;
          cswap(p, q, b);
          add(q, p);
          add(p, p);
          cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p, q, s);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()];
        var i;
        if (!seeded)
          randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p, d);
        pack(pk, p);
        for (i = 0; i < 32; i++)
          sk[i + 32] = pk[i];
        return 0;
      }
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          carry = 0;
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++)
          x[j] -= carry * L[j];
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8;
          r[i] = x[i] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i;
        for (i = 0; i < 64; i++)
          x[i] = r[i];
        for (i = 0; i < 64; i++)
          r[i] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i, j, x = new Float64Array(64);
        var p = [gf(), gf(), gf(), gf()];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n + 64;
        for (i = 0; i < n; i++)
          sm[64 + i] = m[i];
        for (i = 0; i < 32; i++)
          sm[32 + i] = d[32 + i];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p, r);
        pack(sm, p);
        for (i = 32; i < 64; i++)
          sm[i] = sk[i];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i = 0; i < 64; i++)
          x[i] = 0;
        for (i = 0; i < 32; i++)
          x[i] = r[i];
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          return -1;
        if (par25519(r[0]) === p[31] >> 7)
          Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n < 64)
          return -1;
        if (unpackneg(q, pk))
          return -1;
        for (i = 0; i < n; i++)
          m[i] = sm[i];
        for (i = 0; i < 32; i++)
          m[i + 32] = pk[i];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p, q, h);
        scalarbase(q, sm.subarray(32));
        add(p, q);
        pack(t, p);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++)
            m[i] = 0;
          return -1;
        }
        for (i = 0; i < n; i++)
          m[i] = sm[i + 64];
        return n;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl2.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES)
          throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES)
          throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++)
          arr[i] = 0;
      }
      nacl2.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl2.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i = 0; i < msg.length; i++)
          m[i + crypto_secretbox_ZEROBYTES] = msg[i];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl2.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i = 0; i < box.length; i++)
          c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
        if (c.length < 32)
          return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0)
          return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl2.scalarMult = function(n, p) {
        checkArrayTypes(n, p);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        if (p.length !== crypto_scalarmult_BYTES)
          throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p);
        return q;
      };
      nacl2.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl2.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox(msg, nonce, k);
      };
      nacl2.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl2.box.after = nacl2.secretbox;
      nacl2.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox.open(msg, nonce, k);
      };
      nacl2.box.open.after = nacl2.secretbox.open;
      nacl2.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl2.box.nonceLength = crypto_box_NONCEBYTES;
      nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
      nacl2.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl2.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0)
          return null;
        var m = new Uint8Array(mlen);
        for (var i = 0; i < m.length; i++)
          m[i] = tmp[i];
        return m;
      };
      nacl2.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl2.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i = 0; i < sig.length; i++)
          sig[i] = signedMsg[i];
        return sig;
      };
      nacl2.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES)
          throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i;
        for (i = 0; i < crypto_sign_BYTES; i++)
          sm[i] = sig[i];
        for (i = 0; i < msg.length; i++)
          sm[i + crypto_sign_BYTES] = msg[i];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl2.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i = 0; i < pk.length; i++)
          pk[i] = secretKey[32 + i];
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES)
          throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i = 0; i < 32; i++)
          sk[i] = seed[i];
        crypto_sign_keypair(pk, sk, true);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl2.sign.signatureLength = crypto_sign_BYTES;
      nacl2.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl2.hash.hashLength = crypto_hash_BYTES;
      nacl2.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0)
          return false;
        if (x.length !== y.length)
          return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl2.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto2 = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto2 && crypto2.getRandomValues) {
          var QUOTA = 65536;
          nacl2.setPRNG(function(x, n) {
            var i, v = new Uint8Array(n);
            for (i = 0; i < n; i += QUOTA) {
              crypto2.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            for (i = 0; i < n; i++)
              x[i] = v[i];
            cleanup(v);
          });
        } else if (typeof require !== "undefined") {
          crypto2 = require_crypto();
          if (crypto2 && crypto2.randomBytes) {
            nacl2.setPRNG(function(x, n) {
              var i, v = crypto2.randomBytes(n);
              for (i = 0; i < n; i++)
                x[i] = v[i];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module2 !== "undefined" && module2.exports ? module2.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/@ton/crypto/dist/utils/binary.js
var require_binary = __commonJS({
  "node_modules/@ton/crypto/dist/utils/binary.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bitsToBytes = exports.bytesToBits = exports.lpad = void 0;
    function lpad(str, padString, length) {
      while (str.length < length) {
        str = padString + str;
      }
      return str;
    }
    exports.lpad = lpad;
    function bytesToBits(bytes) {
      let res = "";
      for (let i = 0; i < bytes.length; i++) {
        let x = bytes.at(i);
        res += lpad(x.toString(2), "0", 8);
      }
      return res;
    }
    exports.bytesToBits = bytesToBits;
    function bitsToBytes(src) {
      if (src.length % 8 !== 0) {
        throw Error("Uneven bits");
      }
      let res = [];
      while (src.length > 0) {
        res.push(parseInt(src.slice(0, 8), 2));
        src = src.slice(8);
      }
      return Buffer.from(res);
    }
    exports.bitsToBytes = bitsToBytes;
  }
});

// node_modules/@ton/crypto/dist/mnemonic/wordlist.js
var require_wordlist2 = __commonJS({
  "node_modules/@ton/crypto/dist/mnemonic/wordlist.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wordlist = void 0;
    var EN = [
      "abandon",
      "ability",
      "able",
      "about",
      "above",
      "absent",
      "absorb",
      "abstract",
      "absurd",
      "abuse",
      "access",
      "accident",
      "account",
      "accuse",
      "achieve",
      "acid",
      "acoustic",
      "acquire",
      "across",
      "act",
      "action",
      "actor",
      "actress",
      "actual",
      "adapt",
      "add",
      "addict",
      "address",
      "adjust",
      "admit",
      "adult",
      "advance",
      "advice",
      "aerobic",
      "affair",
      "afford",
      "afraid",
      "again",
      "age",
      "agent",
      "agree",
      "ahead",
      "aim",
      "air",
      "airport",
      "aisle",
      "alarm",
      "album",
      "alcohol",
      "alert",
      "alien",
      "all",
      "alley",
      "allow",
      "almost",
      "alone",
      "alpha",
      "already",
      "also",
      "alter",
      "always",
      "amateur",
      "amazing",
      "among",
      "amount",
      "amused",
      "analyst",
      "anchor",
      "ancient",
      "anger",
      "angle",
      "angry",
      "animal",
      "ankle",
      "announce",
      "annual",
      "another",
      "answer",
      "antenna",
      "antique",
      "anxiety",
      "any",
      "apart",
      "apology",
      "appear",
      "apple",
      "approve",
      "april",
      "arch",
      "arctic",
      "area",
      "arena",
      "argue",
      "arm",
      "armed",
      "armor",
      "army",
      "around",
      "arrange",
      "arrest",
      "arrive",
      "arrow",
      "art",
      "artefact",
      "artist",
      "artwork",
      "ask",
      "aspect",
      "assault",
      "asset",
      "assist",
      "assume",
      "asthma",
      "athlete",
      "atom",
      "attack",
      "attend",
      "attitude",
      "attract",
      "auction",
      "audit",
      "august",
      "aunt",
      "author",
      "auto",
      "autumn",
      "average",
      "avocado",
      "avoid",
      "awake",
      "aware",
      "away",
      "awesome",
      "awful",
      "awkward",
      "axis",
      "baby",
      "bachelor",
      "bacon",
      "badge",
      "bag",
      "balance",
      "balcony",
      "ball",
      "bamboo",
      "banana",
      "banner",
      "bar",
      "barely",
      "bargain",
      "barrel",
      "base",
      "basic",
      "basket",
      "battle",
      "beach",
      "bean",
      "beauty",
      "because",
      "become",
      "beef",
      "before",
      "begin",
      "behave",
      "behind",
      "believe",
      "below",
      "belt",
      "bench",
      "benefit",
      "best",
      "betray",
      "better",
      "between",
      "beyond",
      "bicycle",
      "bid",
      "bike",
      "bind",
      "biology",
      "bird",
      "birth",
      "bitter",
      "black",
      "blade",
      "blame",
      "blanket",
      "blast",
      "bleak",
      "bless",
      "blind",
      "blood",
      "blossom",
      "blouse",
      "blue",
      "blur",
      "blush",
      "board",
      "boat",
      "body",
      "boil",
      "bomb",
      "bone",
      "bonus",
      "book",
      "boost",
      "border",
      "boring",
      "borrow",
      "boss",
      "bottom",
      "bounce",
      "box",
      "boy",
      "bracket",
      "brain",
      "brand",
      "brass",
      "brave",
      "bread",
      "breeze",
      "brick",
      "bridge",
      "brief",
      "bright",
      "bring",
      "brisk",
      "broccoli",
      "broken",
      "bronze",
      "broom",
      "brother",
      "brown",
      "brush",
      "bubble",
      "buddy",
      "budget",
      "buffalo",
      "build",
      "bulb",
      "bulk",
      "bullet",
      "bundle",
      "bunker",
      "burden",
      "burger",
      "burst",
      "bus",
      "business",
      "busy",
      "butter",
      "buyer",
      "buzz",
      "cabbage",
      "cabin",
      "cable",
      "cactus",
      "cage",
      "cake",
      "call",
      "calm",
      "camera",
      "camp",
      "can",
      "canal",
      "cancel",
      "candy",
      "cannon",
      "canoe",
      "canvas",
      "canyon",
      "capable",
      "capital",
      "captain",
      "car",
      "carbon",
      "card",
      "cargo",
      "carpet",
      "carry",
      "cart",
      "case",
      "cash",
      "casino",
      "castle",
      "casual",
      "cat",
      "catalog",
      "catch",
      "category",
      "cattle",
      "caught",
      "cause",
      "caution",
      "cave",
      "ceiling",
      "celery",
      "cement",
      "census",
      "century",
      "cereal",
      "certain",
      "chair",
      "chalk",
      "champion",
      "change",
      "chaos",
      "chapter",
      "charge",
      "chase",
      "chat",
      "cheap",
      "check",
      "cheese",
      "chef",
      "cherry",
      "chest",
      "chicken",
      "chief",
      "child",
      "chimney",
      "choice",
      "choose",
      "chronic",
      "chuckle",
      "chunk",
      "churn",
      "cigar",
      "cinnamon",
      "circle",
      "citizen",
      "city",
      "civil",
      "claim",
      "clap",
      "clarify",
      "claw",
      "clay",
      "clean",
      "clerk",
      "clever",
      "click",
      "client",
      "cliff",
      "climb",
      "clinic",
      "clip",
      "clock",
      "clog",
      "close",
      "cloth",
      "cloud",
      "clown",
      "club",
      "clump",
      "cluster",
      "clutch",
      "coach",
      "coast",
      "coconut",
      "code",
      "coffee",
      "coil",
      "coin",
      "collect",
      "color",
      "column",
      "combine",
      "come",
      "comfort",
      "comic",
      "common",
      "company",
      "concert",
      "conduct",
      "confirm",
      "congress",
      "connect",
      "consider",
      "control",
      "convince",
      "cook",
      "cool",
      "copper",
      "copy",
      "coral",
      "core",
      "corn",
      "correct",
      "cost",
      "cotton",
      "couch",
      "country",
      "couple",
      "course",
      "cousin",
      "cover",
      "coyote",
      "crack",
      "cradle",
      "craft",
      "cram",
      "crane",
      "crash",
      "crater",
      "crawl",
      "crazy",
      "cream",
      "credit",
      "creek",
      "crew",
      "cricket",
      "crime",
      "crisp",
      "critic",
      "crop",
      "cross",
      "crouch",
      "crowd",
      "crucial",
      "cruel",
      "cruise",
      "crumble",
      "crunch",
      "crush",
      "cry",
      "crystal",
      "cube",
      "culture",
      "cup",
      "cupboard",
      "curious",
      "current",
      "curtain",
      "curve",
      "cushion",
      "custom",
      "cute",
      "cycle",
      "dad",
      "damage",
      "damp",
      "dance",
      "danger",
      "daring",
      "dash",
      "daughter",
      "dawn",
      "day",
      "deal",
      "debate",
      "debris",
      "decade",
      "december",
      "decide",
      "decline",
      "decorate",
      "decrease",
      "deer",
      "defense",
      "define",
      "defy",
      "degree",
      "delay",
      "deliver",
      "demand",
      "demise",
      "denial",
      "dentist",
      "deny",
      "depart",
      "depend",
      "deposit",
      "depth",
      "deputy",
      "derive",
      "describe",
      "desert",
      "design",
      "desk",
      "despair",
      "destroy",
      "detail",
      "detect",
      "develop",
      "device",
      "devote",
      "diagram",
      "dial",
      "diamond",
      "diary",
      "dice",
      "diesel",
      "diet",
      "differ",
      "digital",
      "dignity",
      "dilemma",
      "dinner",
      "dinosaur",
      "direct",
      "dirt",
      "disagree",
      "discover",
      "disease",
      "dish",
      "dismiss",
      "disorder",
      "display",
      "distance",
      "divert",
      "divide",
      "divorce",
      "dizzy",
      "doctor",
      "document",
      "dog",
      "doll",
      "dolphin",
      "domain",
      "donate",
      "donkey",
      "donor",
      "door",
      "dose",
      "double",
      "dove",
      "draft",
      "dragon",
      "drama",
      "drastic",
      "draw",
      "dream",
      "dress",
      "drift",
      "drill",
      "drink",
      "drip",
      "drive",
      "drop",
      "drum",
      "dry",
      "duck",
      "dumb",
      "dune",
      "during",
      "dust",
      "dutch",
      "duty",
      "dwarf",
      "dynamic",
      "eager",
      "eagle",
      "early",
      "earn",
      "earth",
      "easily",
      "east",
      "easy",
      "echo",
      "ecology",
      "economy",
      "edge",
      "edit",
      "educate",
      "effort",
      "egg",
      "eight",
      "either",
      "elbow",
      "elder",
      "electric",
      "elegant",
      "element",
      "elephant",
      "elevator",
      "elite",
      "else",
      "embark",
      "embody",
      "embrace",
      "emerge",
      "emotion",
      "employ",
      "empower",
      "empty",
      "enable",
      "enact",
      "end",
      "endless",
      "endorse",
      "enemy",
      "energy",
      "enforce",
      "engage",
      "engine",
      "enhance",
      "enjoy",
      "enlist",
      "enough",
      "enrich",
      "enroll",
      "ensure",
      "enter",
      "entire",
      "entry",
      "envelope",
      "episode",
      "equal",
      "equip",
      "era",
      "erase",
      "erode",
      "erosion",
      "error",
      "erupt",
      "escape",
      "essay",
      "essence",
      "estate",
      "eternal",
      "ethics",
      "evidence",
      "evil",
      "evoke",
      "evolve",
      "exact",
      "example",
      "excess",
      "exchange",
      "excite",
      "exclude",
      "excuse",
      "execute",
      "exercise",
      "exhaust",
      "exhibit",
      "exile",
      "exist",
      "exit",
      "exotic",
      "expand",
      "expect",
      "expire",
      "explain",
      "expose",
      "express",
      "extend",
      "extra",
      "eye",
      "eyebrow",
      "fabric",
      "face",
      "faculty",
      "fade",
      "faint",
      "faith",
      "fall",
      "false",
      "fame",
      "family",
      "famous",
      "fan",
      "fancy",
      "fantasy",
      "farm",
      "fashion",
      "fat",
      "fatal",
      "father",
      "fatigue",
      "fault",
      "favorite",
      "feature",
      "february",
      "federal",
      "fee",
      "feed",
      "feel",
      "female",
      "fence",
      "festival",
      "fetch",
      "fever",
      "few",
      "fiber",
      "fiction",
      "field",
      "figure",
      "file",
      "film",
      "filter",
      "final",
      "find",
      "fine",
      "finger",
      "finish",
      "fire",
      "firm",
      "first",
      "fiscal",
      "fish",
      "fit",
      "fitness",
      "fix",
      "flag",
      "flame",
      "flash",
      "flat",
      "flavor",
      "flee",
      "flight",
      "flip",
      "float",
      "flock",
      "floor",
      "flower",
      "fluid",
      "flush",
      "fly",
      "foam",
      "focus",
      "fog",
      "foil",
      "fold",
      "follow",
      "food",
      "foot",
      "force",
      "forest",
      "forget",
      "fork",
      "fortune",
      "forum",
      "forward",
      "fossil",
      "foster",
      "found",
      "fox",
      "fragile",
      "frame",
      "frequent",
      "fresh",
      "friend",
      "fringe",
      "frog",
      "front",
      "frost",
      "frown",
      "frozen",
      "fruit",
      "fuel",
      "fun",
      "funny",
      "furnace",
      "fury",
      "future",
      "gadget",
      "gain",
      "galaxy",
      "gallery",
      "game",
      "gap",
      "garage",
      "garbage",
      "garden",
      "garlic",
      "garment",
      "gas",
      "gasp",
      "gate",
      "gather",
      "gauge",
      "gaze",
      "general",
      "genius",
      "genre",
      "gentle",
      "genuine",
      "gesture",
      "ghost",
      "giant",
      "gift",
      "giggle",
      "ginger",
      "giraffe",
      "girl",
      "give",
      "glad",
      "glance",
      "glare",
      "glass",
      "glide",
      "glimpse",
      "globe",
      "gloom",
      "glory",
      "glove",
      "glow",
      "glue",
      "goat",
      "goddess",
      "gold",
      "good",
      "goose",
      "gorilla",
      "gospel",
      "gossip",
      "govern",
      "gown",
      "grab",
      "grace",
      "grain",
      "grant",
      "grape",
      "grass",
      "gravity",
      "great",
      "green",
      "grid",
      "grief",
      "grit",
      "grocery",
      "group",
      "grow",
      "grunt",
      "guard",
      "guess",
      "guide",
      "guilt",
      "guitar",
      "gun",
      "gym",
      "habit",
      "hair",
      "half",
      "hammer",
      "hamster",
      "hand",
      "happy",
      "harbor",
      "hard",
      "harsh",
      "harvest",
      "hat",
      "have",
      "hawk",
      "hazard",
      "head",
      "health",
      "heart",
      "heavy",
      "hedgehog",
      "height",
      "hello",
      "helmet",
      "help",
      "hen",
      "hero",
      "hidden",
      "high",
      "hill",
      "hint",
      "hip",
      "hire",
      "history",
      "hobby",
      "hockey",
      "hold",
      "hole",
      "holiday",
      "hollow",
      "home",
      "honey",
      "hood",
      "hope",
      "horn",
      "horror",
      "horse",
      "hospital",
      "host",
      "hotel",
      "hour",
      "hover",
      "hub",
      "huge",
      "human",
      "humble",
      "humor",
      "hundred",
      "hungry",
      "hunt",
      "hurdle",
      "hurry",
      "hurt",
      "husband",
      "hybrid",
      "ice",
      "icon",
      "idea",
      "identify",
      "idle",
      "ignore",
      "ill",
      "illegal",
      "illness",
      "image",
      "imitate",
      "immense",
      "immune",
      "impact",
      "impose",
      "improve",
      "impulse",
      "inch",
      "include",
      "income",
      "increase",
      "index",
      "indicate",
      "indoor",
      "industry",
      "infant",
      "inflict",
      "inform",
      "inhale",
      "inherit",
      "initial",
      "inject",
      "injury",
      "inmate",
      "inner",
      "innocent",
      "input",
      "inquiry",
      "insane",
      "insect",
      "inside",
      "inspire",
      "install",
      "intact",
      "interest",
      "into",
      "invest",
      "invite",
      "involve",
      "iron",
      "island",
      "isolate",
      "issue",
      "item",
      "ivory",
      "jacket",
      "jaguar",
      "jar",
      "jazz",
      "jealous",
      "jeans",
      "jelly",
      "jewel",
      "job",
      "join",
      "joke",
      "journey",
      "joy",
      "judge",
      "juice",
      "jump",
      "jungle",
      "junior",
      "junk",
      "just",
      "kangaroo",
      "keen",
      "keep",
      "ketchup",
      "key",
      "kick",
      "kid",
      "kidney",
      "kind",
      "kingdom",
      "kiss",
      "kit",
      "kitchen",
      "kite",
      "kitten",
      "kiwi",
      "knee",
      "knife",
      "knock",
      "know",
      "lab",
      "label",
      "labor",
      "ladder",
      "lady",
      "lake",
      "lamp",
      "language",
      "laptop",
      "large",
      "later",
      "latin",
      "laugh",
      "laundry",
      "lava",
      "law",
      "lawn",
      "lawsuit",
      "layer",
      "lazy",
      "leader",
      "leaf",
      "learn",
      "leave",
      "lecture",
      "left",
      "leg",
      "legal",
      "legend",
      "leisure",
      "lemon",
      "lend",
      "length",
      "lens",
      "leopard",
      "lesson",
      "letter",
      "level",
      "liar",
      "liberty",
      "library",
      "license",
      "life",
      "lift",
      "light",
      "like",
      "limb",
      "limit",
      "link",
      "lion",
      "liquid",
      "list",
      "little",
      "live",
      "lizard",
      "load",
      "loan",
      "lobster",
      "local",
      "lock",
      "logic",
      "lonely",
      "long",
      "loop",
      "lottery",
      "loud",
      "lounge",
      "love",
      "loyal",
      "lucky",
      "luggage",
      "lumber",
      "lunar",
      "lunch",
      "luxury",
      "lyrics",
      "machine",
      "mad",
      "magic",
      "magnet",
      "maid",
      "mail",
      "main",
      "major",
      "make",
      "mammal",
      "man",
      "manage",
      "mandate",
      "mango",
      "mansion",
      "manual",
      "maple",
      "marble",
      "march",
      "margin",
      "marine",
      "market",
      "marriage",
      "mask",
      "mass",
      "master",
      "match",
      "material",
      "math",
      "matrix",
      "matter",
      "maximum",
      "maze",
      "meadow",
      "mean",
      "measure",
      "meat",
      "mechanic",
      "medal",
      "media",
      "melody",
      "melt",
      "member",
      "memory",
      "mention",
      "menu",
      "mercy",
      "merge",
      "merit",
      "merry",
      "mesh",
      "message",
      "metal",
      "method",
      "middle",
      "midnight",
      "milk",
      "million",
      "mimic",
      "mind",
      "minimum",
      "minor",
      "minute",
      "miracle",
      "mirror",
      "misery",
      "miss",
      "mistake",
      "mix",
      "mixed",
      "mixture",
      "mobile",
      "model",
      "modify",
      "mom",
      "moment",
      "monitor",
      "monkey",
      "monster",
      "month",
      "moon",
      "moral",
      "more",
      "morning",
      "mosquito",
      "mother",
      "motion",
      "motor",
      "mountain",
      "mouse",
      "move",
      "movie",
      "much",
      "muffin",
      "mule",
      "multiply",
      "muscle",
      "museum",
      "mushroom",
      "music",
      "must",
      "mutual",
      "myself",
      "mystery",
      "myth",
      "naive",
      "name",
      "napkin",
      "narrow",
      "nasty",
      "nation",
      "nature",
      "near",
      "neck",
      "need",
      "negative",
      "neglect",
      "neither",
      "nephew",
      "nerve",
      "nest",
      "net",
      "network",
      "neutral",
      "never",
      "news",
      "next",
      "nice",
      "night",
      "noble",
      "noise",
      "nominee",
      "noodle",
      "normal",
      "north",
      "nose",
      "notable",
      "note",
      "nothing",
      "notice",
      "novel",
      "now",
      "nuclear",
      "number",
      "nurse",
      "nut",
      "oak",
      "obey",
      "object",
      "oblige",
      "obscure",
      "observe",
      "obtain",
      "obvious",
      "occur",
      "ocean",
      "october",
      "odor",
      "off",
      "offer",
      "office",
      "often",
      "oil",
      "okay",
      "old",
      "olive",
      "olympic",
      "omit",
      "once",
      "one",
      "onion",
      "online",
      "only",
      "open",
      "opera",
      "opinion",
      "oppose",
      "option",
      "orange",
      "orbit",
      "orchard",
      "order",
      "ordinary",
      "organ",
      "orient",
      "original",
      "orphan",
      "ostrich",
      "other",
      "outdoor",
      "outer",
      "output",
      "outside",
      "oval",
      "oven",
      "over",
      "own",
      "owner",
      "oxygen",
      "oyster",
      "ozone",
      "pact",
      "paddle",
      "page",
      "pair",
      "palace",
      "palm",
      "panda",
      "panel",
      "panic",
      "panther",
      "paper",
      "parade",
      "parent",
      "park",
      "parrot",
      "party",
      "pass",
      "patch",
      "path",
      "patient",
      "patrol",
      "pattern",
      "pause",
      "pave",
      "payment",
      "peace",
      "peanut",
      "pear",
      "peasant",
      "pelican",
      "pen",
      "penalty",
      "pencil",
      "people",
      "pepper",
      "perfect",
      "permit",
      "person",
      "pet",
      "phone",
      "photo",
      "phrase",
      "physical",
      "piano",
      "picnic",
      "picture",
      "piece",
      "pig",
      "pigeon",
      "pill",
      "pilot",
      "pink",
      "pioneer",
      "pipe",
      "pistol",
      "pitch",
      "pizza",
      "place",
      "planet",
      "plastic",
      "plate",
      "play",
      "please",
      "pledge",
      "pluck",
      "plug",
      "plunge",
      "poem",
      "poet",
      "point",
      "polar",
      "pole",
      "police",
      "pond",
      "pony",
      "pool",
      "popular",
      "portion",
      "position",
      "possible",
      "post",
      "potato",
      "pottery",
      "poverty",
      "powder",
      "power",
      "practice",
      "praise",
      "predict",
      "prefer",
      "prepare",
      "present",
      "pretty",
      "prevent",
      "price",
      "pride",
      "primary",
      "print",
      "priority",
      "prison",
      "private",
      "prize",
      "problem",
      "process",
      "produce",
      "profit",
      "program",
      "project",
      "promote",
      "proof",
      "property",
      "prosper",
      "protect",
      "proud",
      "provide",
      "public",
      "pudding",
      "pull",
      "pulp",
      "pulse",
      "pumpkin",
      "punch",
      "pupil",
      "puppy",
      "purchase",
      "purity",
      "purpose",
      "purse",
      "push",
      "put",
      "puzzle",
      "pyramid",
      "quality",
      "quantum",
      "quarter",
      "question",
      "quick",
      "quit",
      "quiz",
      "quote",
      "rabbit",
      "raccoon",
      "race",
      "rack",
      "radar",
      "radio",
      "rail",
      "rain",
      "raise",
      "rally",
      "ramp",
      "ranch",
      "random",
      "range",
      "rapid",
      "rare",
      "rate",
      "rather",
      "raven",
      "raw",
      "razor",
      "ready",
      "real",
      "reason",
      "rebel",
      "rebuild",
      "recall",
      "receive",
      "recipe",
      "record",
      "recycle",
      "reduce",
      "reflect",
      "reform",
      "refuse",
      "region",
      "regret",
      "regular",
      "reject",
      "relax",
      "release",
      "relief",
      "rely",
      "remain",
      "remember",
      "remind",
      "remove",
      "render",
      "renew",
      "rent",
      "reopen",
      "repair",
      "repeat",
      "replace",
      "report",
      "require",
      "rescue",
      "resemble",
      "resist",
      "resource",
      "response",
      "result",
      "retire",
      "retreat",
      "return",
      "reunion",
      "reveal",
      "review",
      "reward",
      "rhythm",
      "rib",
      "ribbon",
      "rice",
      "rich",
      "ride",
      "ridge",
      "rifle",
      "right",
      "rigid",
      "ring",
      "riot",
      "ripple",
      "risk",
      "ritual",
      "rival",
      "river",
      "road",
      "roast",
      "robot",
      "robust",
      "rocket",
      "romance",
      "roof",
      "rookie",
      "room",
      "rose",
      "rotate",
      "rough",
      "round",
      "route",
      "royal",
      "rubber",
      "rude",
      "rug",
      "rule",
      "run",
      "runway",
      "rural",
      "sad",
      "saddle",
      "sadness",
      "safe",
      "sail",
      "salad",
      "salmon",
      "salon",
      "salt",
      "salute",
      "same",
      "sample",
      "sand",
      "satisfy",
      "satoshi",
      "sauce",
      "sausage",
      "save",
      "say",
      "scale",
      "scan",
      "scare",
      "scatter",
      "scene",
      "scheme",
      "school",
      "science",
      "scissors",
      "scorpion",
      "scout",
      "scrap",
      "screen",
      "script",
      "scrub",
      "sea",
      "search",
      "season",
      "seat",
      "second",
      "secret",
      "section",
      "security",
      "seed",
      "seek",
      "segment",
      "select",
      "sell",
      "seminar",
      "senior",
      "sense",
      "sentence",
      "series",
      "service",
      "session",
      "settle",
      "setup",
      "seven",
      "shadow",
      "shaft",
      "shallow",
      "share",
      "shed",
      "shell",
      "sheriff",
      "shield",
      "shift",
      "shine",
      "ship",
      "shiver",
      "shock",
      "shoe",
      "shoot",
      "shop",
      "short",
      "shoulder",
      "shove",
      "shrimp",
      "shrug",
      "shuffle",
      "shy",
      "sibling",
      "sick",
      "side",
      "siege",
      "sight",
      "sign",
      "silent",
      "silk",
      "silly",
      "silver",
      "similar",
      "simple",
      "since",
      "sing",
      "siren",
      "sister",
      "situate",
      "six",
      "size",
      "skate",
      "sketch",
      "ski",
      "skill",
      "skin",
      "skirt",
      "skull",
      "slab",
      "slam",
      "sleep",
      "slender",
      "slice",
      "slide",
      "slight",
      "slim",
      "slogan",
      "slot",
      "slow",
      "slush",
      "small",
      "smart",
      "smile",
      "smoke",
      "smooth",
      "snack",
      "snake",
      "snap",
      "sniff",
      "snow",
      "soap",
      "soccer",
      "social",
      "sock",
      "soda",
      "soft",
      "solar",
      "soldier",
      "solid",
      "solution",
      "solve",
      "someone",
      "song",
      "soon",
      "sorry",
      "sort",
      "soul",
      "sound",
      "soup",
      "source",
      "south",
      "space",
      "spare",
      "spatial",
      "spawn",
      "speak",
      "special",
      "speed",
      "spell",
      "spend",
      "sphere",
      "spice",
      "spider",
      "spike",
      "spin",
      "spirit",
      "split",
      "spoil",
      "sponsor",
      "spoon",
      "sport",
      "spot",
      "spray",
      "spread",
      "spring",
      "spy",
      "square",
      "squeeze",
      "squirrel",
      "stable",
      "stadium",
      "staff",
      "stage",
      "stairs",
      "stamp",
      "stand",
      "start",
      "state",
      "stay",
      "steak",
      "steel",
      "stem",
      "step",
      "stereo",
      "stick",
      "still",
      "sting",
      "stock",
      "stomach",
      "stone",
      "stool",
      "story",
      "stove",
      "strategy",
      "street",
      "strike",
      "strong",
      "struggle",
      "student",
      "stuff",
      "stumble",
      "style",
      "subject",
      "submit",
      "subway",
      "success",
      "such",
      "sudden",
      "suffer",
      "sugar",
      "suggest",
      "suit",
      "summer",
      "sun",
      "sunny",
      "sunset",
      "super",
      "supply",
      "supreme",
      "sure",
      "surface",
      "surge",
      "surprise",
      "surround",
      "survey",
      "suspect",
      "sustain",
      "swallow",
      "swamp",
      "swap",
      "swarm",
      "swear",
      "sweet",
      "swift",
      "swim",
      "swing",
      "switch",
      "sword",
      "symbol",
      "symptom",
      "syrup",
      "system",
      "table",
      "tackle",
      "tag",
      "tail",
      "talent",
      "talk",
      "tank",
      "tape",
      "target",
      "task",
      "taste",
      "tattoo",
      "taxi",
      "teach",
      "team",
      "tell",
      "ten",
      "tenant",
      "tennis",
      "tent",
      "term",
      "test",
      "text",
      "thank",
      "that",
      "theme",
      "then",
      "theory",
      "there",
      "they",
      "thing",
      "this",
      "thought",
      "three",
      "thrive",
      "throw",
      "thumb",
      "thunder",
      "ticket",
      "tide",
      "tiger",
      "tilt",
      "timber",
      "time",
      "tiny",
      "tip",
      "tired",
      "tissue",
      "title",
      "toast",
      "tobacco",
      "today",
      "toddler",
      "toe",
      "together",
      "toilet",
      "token",
      "tomato",
      "tomorrow",
      "tone",
      "tongue",
      "tonight",
      "tool",
      "tooth",
      "top",
      "topic",
      "topple",
      "torch",
      "tornado",
      "tortoise",
      "toss",
      "total",
      "tourist",
      "toward",
      "tower",
      "town",
      "toy",
      "track",
      "trade",
      "traffic",
      "tragic",
      "train",
      "transfer",
      "trap",
      "trash",
      "travel",
      "tray",
      "treat",
      "tree",
      "trend",
      "trial",
      "tribe",
      "trick",
      "trigger",
      "trim",
      "trip",
      "trophy",
      "trouble",
      "truck",
      "true",
      "truly",
      "trumpet",
      "trust",
      "truth",
      "try",
      "tube",
      "tuition",
      "tumble",
      "tuna",
      "tunnel",
      "turkey",
      "turn",
      "turtle",
      "twelve",
      "twenty",
      "twice",
      "twin",
      "twist",
      "two",
      "type",
      "typical",
      "ugly",
      "umbrella",
      "unable",
      "unaware",
      "uncle",
      "uncover",
      "under",
      "undo",
      "unfair",
      "unfold",
      "unhappy",
      "uniform",
      "unique",
      "unit",
      "universe",
      "unknown",
      "unlock",
      "until",
      "unusual",
      "unveil",
      "update",
      "upgrade",
      "uphold",
      "upon",
      "upper",
      "upset",
      "urban",
      "urge",
      "usage",
      "use",
      "used",
      "useful",
      "useless",
      "usual",
      "utility",
      "vacant",
      "vacuum",
      "vague",
      "valid",
      "valley",
      "valve",
      "van",
      "vanish",
      "vapor",
      "various",
      "vast",
      "vault",
      "vehicle",
      "velvet",
      "vendor",
      "venture",
      "venue",
      "verb",
      "verify",
      "version",
      "very",
      "vessel",
      "veteran",
      "viable",
      "vibrant",
      "vicious",
      "victory",
      "video",
      "view",
      "village",
      "vintage",
      "violin",
      "virtual",
      "virus",
      "visa",
      "visit",
      "visual",
      "vital",
      "vivid",
      "vocal",
      "voice",
      "void",
      "volcano",
      "volume",
      "vote",
      "voyage",
      "wage",
      "wagon",
      "wait",
      "walk",
      "wall",
      "walnut",
      "want",
      "warfare",
      "warm",
      "warrior",
      "wash",
      "wasp",
      "waste",
      "water",
      "wave",
      "way",
      "wealth",
      "weapon",
      "wear",
      "weasel",
      "weather",
      "web",
      "wedding",
      "weekend",
      "weird",
      "welcome",
      "west",
      "wet",
      "whale",
      "what",
      "wheat",
      "wheel",
      "when",
      "where",
      "whip",
      "whisper",
      "wide",
      "width",
      "wife",
      "wild",
      "will",
      "win",
      "window",
      "wine",
      "wing",
      "wink",
      "winner",
      "winter",
      "wire",
      "wisdom",
      "wise",
      "wish",
      "witness",
      "wolf",
      "woman",
      "wonder",
      "wood",
      "wool",
      "word",
      "work",
      "world",
      "worry",
      "worth",
      "wrap",
      "wreck",
      "wrestle",
      "wrist",
      "write",
      "wrong",
      "yard",
      "year",
      "yellow",
      "you",
      "young",
      "youth",
      "zebra",
      "zero",
      "zone",
      "zoo"
    ];
    exports.wordlist = EN;
  }
});

// node_modules/@ton/crypto/dist/mnemonic/mnemonic.js
var require_mnemonic = __commonJS({
  "node_modules/@ton/crypto/dist/mnemonic/mnemonic.js"(exports) {
    init_buffer_shim();
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mnemonicFromRandomSeed = exports.mnemonicIndexesToBytes = exports.bytesToMnemonics = exports.bytesToMnemonicIndexes = exports.mnemonicNew = exports.mnemonicValidate = exports.mnemonicToHDSeed = exports.mnemonicToWalletKey = exports.mnemonicToPrivateKey = exports.mnemonicToSeed = exports.mnemonicToEntropy = void 0;
    var tweetnacl_1 = __importDefault(require_nacl_fast());
    var getSecureRandom_1 = require_getSecureRandom2();
    var hmac_sha512_1 = require_hmac_sha5122();
    var pbkdf2_sha512_1 = require_pbkdf2_sha5122();
    var binary_1 = require_binary();
    var wordlist_1 = require_wordlist2();
    var PBKDF_ITERATIONS = 1e5;
    async function isPasswordNeeded(mnemonicArray) {
      const passlessEntropy = await mnemonicToEntropy(mnemonicArray);
      return await isPasswordSeed(passlessEntropy) && !await isBasicSeed(passlessEntropy);
    }
    function normalizeMnemonic(src) {
      return src.map((v) => v.toLowerCase().trim());
    }
    async function isBasicSeed(entropy) {
      const seed = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, "TON seed version", Math.max(1, Math.floor(PBKDF_ITERATIONS / 256)), 64);
      return seed[0] == 0;
    }
    async function isPasswordSeed(entropy) {
      const seed = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, "TON fast seed version", 1, 64);
      return seed[0] == 1;
    }
    async function mnemonicToEntropy(mnemonicArray, password) {
      return await (0, hmac_sha512_1.hmac_sha512)(mnemonicArray.join(" "), password && password.length > 0 ? password : "");
    }
    exports.mnemonicToEntropy = mnemonicToEntropy;
    async function mnemonicToSeed(mnemonicArray, seed, password) {
      const entropy = await mnemonicToEntropy(mnemonicArray, password);
      return await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, seed, PBKDF_ITERATIONS, 64);
    }
    exports.mnemonicToSeed = mnemonicToSeed;
    async function mnemonicToPrivateKey(mnemonicArray, password) {
      mnemonicArray = normalizeMnemonic(mnemonicArray);
      const seed = await mnemonicToSeed(mnemonicArray, "TON default seed", password);
      let keyPair = tweetnacl_1.default.sign.keyPair.fromSeed(seed.slice(0, 32));
      return {
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey)
      };
    }
    exports.mnemonicToPrivateKey = mnemonicToPrivateKey;
    async function mnemonicToWalletKey(mnemonicArray, password) {
      let seedPk = await mnemonicToPrivateKey(mnemonicArray, password);
      let seedSecret = seedPk.secretKey.slice(0, 32);
      const keyPair = tweetnacl_1.default.sign.keyPair.fromSeed(seedSecret);
      return {
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey)
      };
    }
    exports.mnemonicToWalletKey = mnemonicToWalletKey;
    async function mnemonicToHDSeed(mnemonicArray, password) {
      mnemonicArray = normalizeMnemonic(mnemonicArray);
      return await mnemonicToSeed(mnemonicArray, "TON HD Keys seed", password);
    }
    exports.mnemonicToHDSeed = mnemonicToHDSeed;
    async function mnemonicValidate(mnemonicArray, password) {
      mnemonicArray = normalizeMnemonic(mnemonicArray);
      for (let word of mnemonicArray) {
        if (wordlist_1.wordlist.indexOf(word) < 0) {
          return false;
        }
      }
      if (password && password.length > 0) {
        if (!await isPasswordNeeded(mnemonicArray)) {
          return false;
        }
      }
      return await isBasicSeed(await mnemonicToEntropy(mnemonicArray, password));
    }
    exports.mnemonicValidate = mnemonicValidate;
    async function mnemonicNew(wordsCount = 24, password) {
      let mnemonicArray = [];
      while (true) {
        mnemonicArray = [];
        for (let i = 0; i < wordsCount; i++) {
          let ind = await (0, getSecureRandom_1.getSecureRandomNumber)(0, wordlist_1.wordlist.length);
          mnemonicArray.push(wordlist_1.wordlist[ind]);
        }
        if (password && password.length > 0) {
          if (!await isPasswordNeeded(mnemonicArray)) {
            continue;
          }
        }
        if (!await isBasicSeed(await mnemonicToEntropy(mnemonicArray, password))) {
          continue;
        }
        break;
      }
      return mnemonicArray;
    }
    exports.mnemonicNew = mnemonicNew;
    function bytesToMnemonicIndexes(src, wordsCount) {
      let bits = (0, binary_1.bytesToBits)(src);
      let indexes = [];
      for (let i = 0; i < wordsCount; i++) {
        let sl = bits.slice(i * 11, i * 11 + 11);
        indexes.push(parseInt(sl, 2));
      }
      return indexes;
    }
    exports.bytesToMnemonicIndexes = bytesToMnemonicIndexes;
    function bytesToMnemonics(src, wordsCount) {
      let mnemonics = bytesToMnemonicIndexes(src, wordsCount);
      let res = [];
      for (let m of mnemonics) {
        res.push(wordlist_1.wordlist[m]);
      }
      return res;
    }
    exports.bytesToMnemonics = bytesToMnemonics;
    function mnemonicIndexesToBytes(src) {
      let res = "";
      for (let s of src) {
        if (!Number.isSafeInteger(s)) {
          throw Error("Invalid input");
        }
        if (s < 0 || s >= 2028) {
          throw Error("Invalid input");
        }
        res += (0, binary_1.lpad)(s.toString(2), "0", 11);
      }
      while (res.length % 8 !== 0) {
        res = res + "0";
      }
      return (0, binary_1.bitsToBytes)(res);
    }
    exports.mnemonicIndexesToBytes = mnemonicIndexesToBytes;
    async function mnemonicFromRandomSeed(seed, wordsCount = 24, password) {
      const bytesLength = Math.ceil(wordsCount * 11 / 8);
      let currentSeed = seed;
      while (true) {
        let entropy = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(currentSeed, "TON mnemonic seed", Math.max(1, Math.floor(PBKDF_ITERATIONS / 256)), bytesLength);
        let mnemonics = bytesToMnemonics(entropy, wordsCount);
        if (await mnemonicValidate(mnemonics, password)) {
          return mnemonics;
        }
        currentSeed = entropy;
      }
    }
    exports.mnemonicFromRandomSeed = mnemonicFromRandomSeed;
  }
});

// node_modules/@ton/crypto/dist/primitives/nacl.js
var require_nacl = __commonJS({
  "node_modules/@ton/crypto/dist/primitives/nacl.js"(exports) {
    init_buffer_shim();
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.openBox = exports.sealBox = exports.signVerify = exports.sign = exports.keyPairFromSeed = exports.keyPairFromSecretKey = void 0;
    var tweetnacl_1 = __importDefault(require_nacl_fast());
    function keyPairFromSecretKey2(secretKey) {
      let res = tweetnacl_1.default.sign.keyPair.fromSecretKey(new Uint8Array(secretKey));
      return {
        publicKey: Buffer.from(res.publicKey),
        secretKey: Buffer.from(res.secretKey)
      };
    }
    exports.keyPairFromSecretKey = keyPairFromSecretKey2;
    function keyPairFromSeed(secretKey) {
      let res = tweetnacl_1.default.sign.keyPair.fromSeed(new Uint8Array(secretKey));
      return {
        publicKey: Buffer.from(res.publicKey),
        secretKey: Buffer.from(res.secretKey)
      };
    }
    exports.keyPairFromSeed = keyPairFromSeed;
    function sign5(data, secretKey) {
      return Buffer.from(tweetnacl_1.default.sign.detached(new Uint8Array(data), new Uint8Array(secretKey)));
    }
    exports.sign = sign5;
    function signVerify2(data, signature, publicKey) {
      return tweetnacl_1.default.sign.detached.verify(new Uint8Array(data), new Uint8Array(signature), new Uint8Array(publicKey));
    }
    exports.signVerify = signVerify2;
    function sealBox(data, nonce, key) {
      return Buffer.from(tweetnacl_1.default.secretbox(data, nonce, key));
    }
    exports.sealBox = sealBox;
    function openBox(data, nonce, key) {
      let res = tweetnacl_1.default.secretbox.open(data, nonce, key);
      if (!res) {
        return null;
      }
      return Buffer.from(res);
    }
    exports.openBox = openBox;
  }
});

// node_modules/@ton/crypto/dist/hd/ed25519.js
var require_ed25519 = __commonJS({
  "node_modules/@ton/crypto/dist/hd/ed25519.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deriveEd25519Path = exports.deriveED25519HardenedKey = exports.getED25519MasterKeyFromSeed = void 0;
    var hmac_sha512_1 = require_hmac_sha5122();
    var ED25519_CURVE = "ed25519 seed";
    var HARDENED_OFFSET = 2147483648;
    async function getED25519MasterKeyFromSeed(seed) {
      const I = await (0, hmac_sha512_1.hmac_sha512)(ED25519_CURVE, seed);
      const IL = I.slice(0, 32);
      const IR = I.slice(32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.getED25519MasterKeyFromSeed = getED25519MasterKeyFromSeed;
    async function deriveED25519HardenedKey(parent, index) {
      if (index >= HARDENED_OFFSET) {
        throw Error("Key index must be less than offset");
      }
      const indexBuffer = Buffer.alloc(4);
      indexBuffer.writeUInt32BE(index + HARDENED_OFFSET, 0);
      const data = Buffer.concat([Buffer.alloc(1, 0), parent.key, indexBuffer]);
      const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data);
      const IL = I.slice(0, 32);
      const IR = I.slice(32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.deriveED25519HardenedKey = deriveED25519HardenedKey;
    async function deriveEd25519Path(seed, path) {
      let state = await getED25519MasterKeyFromSeed(seed);
      let remaining = [...path];
      while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveED25519HardenedKey(state, index);
      }
      return state.key;
    }
    exports.deriveEd25519Path = deriveEd25519Path;
  }
});

// node_modules/@ton/crypto/dist/hd/symmetric.js
var require_symmetric = __commonJS({
  "node_modules/@ton/crypto/dist/hd/symmetric.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deriveSymmetricPath = exports.deriveSymmetricHardenedKey = exports.getSymmetricMasterKeyFromSeed = void 0;
    var hmac_sha512_1 = require_hmac_sha5122();
    var SYMMETRIC_SEED = "Symmetric key seed";
    async function getSymmetricMasterKeyFromSeed(seed) {
      const I = await (0, hmac_sha512_1.hmac_sha512)(SYMMETRIC_SEED, seed);
      const IL = I.slice(32);
      const IR = I.slice(0, 32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.getSymmetricMasterKeyFromSeed = getSymmetricMasterKeyFromSeed;
    async function deriveSymmetricHardenedKey(parent, offset) {
      const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(offset)]);
      const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data);
      const IL = I.slice(32);
      const IR = I.slice(0, 32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.deriveSymmetricHardenedKey = deriveSymmetricHardenedKey;
    async function deriveSymmetricPath(seed, path) {
      let state = await getSymmetricMasterKeyFromSeed(seed);
      let remaining = [...path];
      while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveSymmetricHardenedKey(state, index);
      }
      return state.key;
    }
    exports.deriveSymmetricPath = deriveSymmetricPath;
  }
});

// node_modules/@ton/crypto/dist/hd/mnemonics.js
var require_mnemonics = __commonJS({
  "node_modules/@ton/crypto/dist/hd/mnemonics.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deriveMnemonicsPath = exports.deriveMnemonicHardenedKey = exports.getMnemonicsMasterKeyFromSeed = void 0;
    var mnemonic_1 = require_mnemonic();
    var hmac_sha512_1 = require_hmac_sha5122();
    var HARDENED_OFFSET = 2147483648;
    var MNEMONICS_SEED = "TON Mnemonics HD seed";
    async function getMnemonicsMasterKeyFromSeed(seed) {
      const I = await (0, hmac_sha512_1.hmac_sha512)(MNEMONICS_SEED, seed);
      const IL = I.slice(0, 32);
      const IR = I.slice(32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.getMnemonicsMasterKeyFromSeed = getMnemonicsMasterKeyFromSeed;
    async function deriveMnemonicHardenedKey(parent, index) {
      if (index >= HARDENED_OFFSET) {
        throw Error("Key index must be less than offset");
      }
      const indexBuffer = Buffer.alloc(4);
      indexBuffer.writeUInt32BE(index + HARDENED_OFFSET, 0);
      const data = Buffer.concat([Buffer.alloc(1, 0), parent.key, indexBuffer]);
      const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data);
      const IL = I.slice(0, 32);
      const IR = I.slice(32);
      return {
        key: IL,
        chainCode: IR
      };
    }
    exports.deriveMnemonicHardenedKey = deriveMnemonicHardenedKey;
    async function deriveMnemonicsPath(seed, path, wordsCount = 24, password) {
      let state = await getMnemonicsMasterKeyFromSeed(seed);
      let remaining = [...path];
      while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveMnemonicHardenedKey(state, index);
      }
      return await (0, mnemonic_1.mnemonicFromRandomSeed)(state.key, wordsCount, password);
    }
    exports.deriveMnemonicsPath = deriveMnemonicsPath;
  }
});

// node_modules/@ton/crypto/dist/index.js
var require_dist = __commonJS({
  "node_modules/@ton/crypto/dist/index.js"(exports) {
    init_buffer_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMnemonicsMasterKeyFromSeed = exports.deriveMnemonicHardenedKey = exports.deriveMnemonicsPath = exports.deriveSymmetricPath = exports.deriveSymmetricHardenedKey = exports.getSymmetricMasterKeyFromSeed = exports.deriveEd25519Path = exports.deriveED25519HardenedKey = exports.getED25519MasterKeyFromSeed = exports.signVerify = exports.sign = exports.keyPairFromSecretKey = exports.keyPairFromSeed = exports.openBox = exports.sealBox = exports.mnemonicWordList = exports.mnemonicToHDSeed = exports.mnemonicToSeed = exports.mnemonicToWalletKey = exports.mnemonicToPrivateKey = exports.mnemonicValidate = exports.mnemonicNew = exports.newSecurePassphrase = exports.newSecureWords = exports.getSecureRandomNumber = exports.getSecureRandomWords = exports.getSecureRandomBytes = exports.hmac_sha512 = exports.pbkdf2_sha512 = exports.sha512_sync = exports.sha512 = exports.sha256_sync = exports.sha256 = void 0;
    var sha256_1 = require_sha2562();
    Object.defineProperty(exports, "sha256", { enumerable: true, get: function() {
      return sha256_1.sha256;
    } });
    Object.defineProperty(exports, "sha256_sync", { enumerable: true, get: function() {
      return sha256_1.sha256_sync;
    } });
    var sha512_1 = require_sha5122();
    Object.defineProperty(exports, "sha512", { enumerable: true, get: function() {
      return sha512_1.sha512;
    } });
    Object.defineProperty(exports, "sha512_sync", { enumerable: true, get: function() {
      return sha512_1.sha512_sync;
    } });
    var pbkdf2_sha512_1 = require_pbkdf2_sha5122();
    Object.defineProperty(exports, "pbkdf2_sha512", { enumerable: true, get: function() {
      return pbkdf2_sha512_1.pbkdf2_sha512;
    } });
    var hmac_sha512_1 = require_hmac_sha5122();
    Object.defineProperty(exports, "hmac_sha512", { enumerable: true, get: function() {
      return hmac_sha512_1.hmac_sha512;
    } });
    var getSecureRandom_1 = require_getSecureRandom2();
    Object.defineProperty(exports, "getSecureRandomBytes", { enumerable: true, get: function() {
      return getSecureRandom_1.getSecureRandomBytes;
    } });
    Object.defineProperty(exports, "getSecureRandomWords", { enumerable: true, get: function() {
      return getSecureRandom_1.getSecureRandomWords;
    } });
    Object.defineProperty(exports, "getSecureRandomNumber", { enumerable: true, get: function() {
      return getSecureRandom_1.getSecureRandomNumber;
    } });
    var newSecureWords_1 = require_newSecureWords();
    Object.defineProperty(exports, "newSecureWords", { enumerable: true, get: function() {
      return newSecureWords_1.newSecureWords;
    } });
    var newSecurePassphrase_1 = require_newSecurePassphrase();
    Object.defineProperty(exports, "newSecurePassphrase", { enumerable: true, get: function() {
      return newSecurePassphrase_1.newSecurePassphrase;
    } });
    var mnemonic_1 = require_mnemonic();
    Object.defineProperty(exports, "mnemonicNew", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicNew;
    } });
    Object.defineProperty(exports, "mnemonicValidate", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicValidate;
    } });
    Object.defineProperty(exports, "mnemonicToPrivateKey", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicToPrivateKey;
    } });
    Object.defineProperty(exports, "mnemonicToWalletKey", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicToWalletKey;
    } });
    Object.defineProperty(exports, "mnemonicToSeed", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicToSeed;
    } });
    Object.defineProperty(exports, "mnemonicToHDSeed", { enumerable: true, get: function() {
      return mnemonic_1.mnemonicToHDSeed;
    } });
    var wordlist_1 = require_wordlist2();
    Object.defineProperty(exports, "mnemonicWordList", { enumerable: true, get: function() {
      return wordlist_1.wordlist;
    } });
    var nacl_1 = require_nacl();
    Object.defineProperty(exports, "sealBox", { enumerable: true, get: function() {
      return nacl_1.sealBox;
    } });
    Object.defineProperty(exports, "openBox", { enumerable: true, get: function() {
      return nacl_1.openBox;
    } });
    var nacl_2 = require_nacl();
    Object.defineProperty(exports, "keyPairFromSeed", { enumerable: true, get: function() {
      return nacl_2.keyPairFromSeed;
    } });
    Object.defineProperty(exports, "keyPairFromSecretKey", { enumerable: true, get: function() {
      return nacl_2.keyPairFromSecretKey;
    } });
    Object.defineProperty(exports, "sign", { enumerable: true, get: function() {
      return nacl_2.sign;
    } });
    Object.defineProperty(exports, "signVerify", { enumerable: true, get: function() {
      return nacl_2.signVerify;
    } });
    var ed25519_1 = require_ed25519();
    Object.defineProperty(exports, "getED25519MasterKeyFromSeed", { enumerable: true, get: function() {
      return ed25519_1.getED25519MasterKeyFromSeed;
    } });
    Object.defineProperty(exports, "deriveED25519HardenedKey", { enumerable: true, get: function() {
      return ed25519_1.deriveED25519HardenedKey;
    } });
    Object.defineProperty(exports, "deriveEd25519Path", { enumerable: true, get: function() {
      return ed25519_1.deriveEd25519Path;
    } });
    var symmetric_1 = require_symmetric();
    Object.defineProperty(exports, "getSymmetricMasterKeyFromSeed", { enumerable: true, get: function() {
      return symmetric_1.getSymmetricMasterKeyFromSeed;
    } });
    Object.defineProperty(exports, "deriveSymmetricHardenedKey", { enumerable: true, get: function() {
      return symmetric_1.deriveSymmetricHardenedKey;
    } });
    Object.defineProperty(exports, "deriveSymmetricPath", { enumerable: true, get: function() {
      return symmetric_1.deriveSymmetricPath;
    } });
    var mnemonics_1 = require_mnemonics();
    Object.defineProperty(exports, "deriveMnemonicsPath", { enumerable: true, get: function() {
      return mnemonics_1.deriveMnemonicsPath;
    } });
    Object.defineProperty(exports, "deriveMnemonicHardenedKey", { enumerable: true, get: function() {
      return mnemonics_1.deriveMnemonicHardenedKey;
    } });
    Object.defineProperty(exports, "getMnemonicsMasterKeyFromSeed", { enumerable: true, get: function() {
      return mnemonics_1.getMnemonicsMasterKeyFromSeed;
    } });
  }
});

// node_modules/tweetnacl-util/nacl-util.js
var require_nacl_util = __commonJS({
  "node_modules/tweetnacl-util/nacl-util.js"(exports, module2) {
    init_buffer_shim();
    (function(root, f) {
      "use strict";
      if (typeof module2 !== "undefined" && module2.exports)
        module2.exports = f();
      else if (root.nacl)
        root.nacl.util = f();
      else {
        root.nacl = {};
        root.nacl.util = f();
      }
    })(exports, function() {
      "use strict";
      var util2 = {};
      function validateBase64(s) {
        if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(s)) {
          throw new TypeError("invalid encoding");
        }
      }
      util2.decodeUTF8 = function(s) {
        if (typeof s !== "string")
          throw new TypeError("expected string");
        var i, d = unescape(encodeURIComponent(s)), b = new Uint8Array(d.length);
        for (i = 0; i < d.length; i++)
          b[i] = d.charCodeAt(i);
        return b;
      };
      util2.encodeUTF8 = function(arr) {
        var i, s = [];
        for (i = 0; i < arr.length; i++)
          s.push(String.fromCharCode(arr[i]));
        return decodeURIComponent(escape(s.join("")));
      };
      if (typeof atob === "undefined") {
        if (typeof Buffer.from !== "undefined") {
          util2.encodeBase64 = function(arr) {
            return Buffer.from(arr).toString("base64");
          };
          util2.decodeBase64 = function(s) {
            validateBase64(s);
            return new Uint8Array(Array.prototype.slice.call(Buffer.from(s, "base64"), 0));
          };
        } else {
          util2.encodeBase64 = function(arr) {
            return new Buffer(arr).toString("base64");
          };
          util2.decodeBase64 = function(s) {
            validateBase64(s);
            return new Uint8Array(Array.prototype.slice.call(new Buffer(s, "base64"), 0));
          };
        }
      } else {
        util2.encodeBase64 = function(arr) {
          var i, s = [], len = arr.length;
          for (i = 0; i < len; i++)
            s.push(String.fromCharCode(arr[i]));
          return btoa(s.join(""));
        };
        util2.decodeBase64 = function(s) {
          validateBase64(s);
          var i, d = atob(s), b = new Uint8Array(d.length);
          for (i = 0; i < d.length; i++)
            b[i] = d.charCodeAt(i);
          return b;
        };
      }
      return util2;
    });
  }
});

// node_modules/dataloader/index.js
var require_dataloader = __commonJS({
  "node_modules/dataloader/index.js"(exports, module2) {
    init_buffer_shim();
    "use strict";
    var DataLoader2 = /* @__PURE__ */ function() {
      function DataLoader3(batchLoadFn, options) {
        if (typeof batchLoadFn !== "function") {
          throw new TypeError("DataLoader must be constructed with a function which accepts " + ("Array<key> and returns Promise<Array<value>>, but got: " + batchLoadFn + "."));
        }
        this._batchLoadFn = batchLoadFn;
        this._maxBatchSize = getValidMaxBatchSize(options);
        this._batchScheduleFn = getValidBatchScheduleFn(options);
        this._cacheKeyFn = getValidCacheKeyFn(options);
        this._cacheMap = getValidCacheMap(options);
        this._batch = null;
        this.name = getValidName(options);
      }
      var _proto = DataLoader3.prototype;
      _proto.load = function load(key) {
        if (key === null || key === void 0) {
          throw new TypeError("The loader.load() function must be called with a value, " + ("but got: " + String(key) + "."));
        }
        var batch = getCurrentBatch(this);
        var cacheMap = this._cacheMap;
        var cacheKey;
        if (cacheMap) {
          cacheKey = this._cacheKeyFn(key);
          var cachedPromise = cacheMap.get(cacheKey);
          if (cachedPromise) {
            var cacheHits = batch.cacheHits || (batch.cacheHits = []);
            return new Promise(function(resolve) {
              cacheHits.push(function() {
                resolve(cachedPromise);
              });
            });
          }
        }
        batch.keys.push(key);
        var promise = new Promise(function(resolve, reject) {
          batch.callbacks.push({
            resolve,
            reject
          });
        });
        if (cacheMap) {
          cacheMap.set(cacheKey, promise);
        }
        return promise;
      };
      _proto.loadMany = function loadMany(keys) {
        if (!isArrayLike(keys)) {
          throw new TypeError("The loader.loadMany() function must be called with Array<key> " + ("but got: " + keys + "."));
        }
        var loadPromises = [];
        for (var i = 0; i < keys.length; i++) {
          loadPromises.push(this.load(keys[i])["catch"](function(error) {
            return error;
          }));
        }
        return Promise.all(loadPromises);
      };
      _proto.clear = function clear(key) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          cacheMap["delete"](cacheKey);
        }
        return this;
      };
      _proto.clearAll = function clearAll() {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          cacheMap.clear();
        }
        return this;
      };
      _proto.prime = function prime(key, value) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          if (cacheMap.get(cacheKey) === void 0) {
            var promise;
            if (value instanceof Error) {
              promise = Promise.reject(value);
              promise["catch"](function() {
              });
            } else {
              promise = Promise.resolve(value);
            }
            cacheMap.set(cacheKey, promise);
          }
        }
        return this;
      };
      return DataLoader3;
    }();
    var enqueuePostPromiseJob = typeof process === "object" && typeof process.nextTick === "function" ? function(fn) {
      if (!resolvedPromise) {
        resolvedPromise = Promise.resolve();
      }
      resolvedPromise.then(function() {
        process.nextTick(fn);
      });
    } : typeof setImmediate === "function" ? function(fn) {
      setImmediate(fn);
    } : function(fn) {
      setTimeout(fn);
    };
    var resolvedPromise;
    function getCurrentBatch(loader) {
      var existingBatch = loader._batch;
      if (existingBatch !== null && !existingBatch.hasDispatched && existingBatch.keys.length < loader._maxBatchSize) {
        return existingBatch;
      }
      var newBatch = {
        hasDispatched: false,
        keys: [],
        callbacks: []
      };
      loader._batch = newBatch;
      loader._batchScheduleFn(function() {
        dispatchBatch(loader, newBatch);
      });
      return newBatch;
    }
    function dispatchBatch(loader, batch) {
      batch.hasDispatched = true;
      if (batch.keys.length === 0) {
        resolveCacheHits(batch);
        return;
      }
      var batchPromise;
      try {
        batchPromise = loader._batchLoadFn(batch.keys);
      } catch (e) {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function " + ("errored synchronously: " + String(e) + ".")));
      }
      if (!batchPromise || typeof batchPromise.then !== "function") {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise: " + String(batchPromise) + ".")));
      }
      batchPromise.then(function(values) {
        if (!isArrayLike(values)) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise of an Array: " + String(values) + "."));
        }
        if (values.length !== batch.keys.length) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys." + ("\n\nKeys:\n" + String(batch.keys)) + ("\n\nValues:\n" + String(values)));
        }
        resolveCacheHits(batch);
        for (var i = 0; i < batch.callbacks.length; i++) {
          var _value = values[i];
          if (_value instanceof Error) {
            batch.callbacks[i].reject(_value);
          } else {
            batch.callbacks[i].resolve(_value);
          }
        }
      })["catch"](function(error) {
        failedDispatch(loader, batch, error);
      });
    }
    function failedDispatch(loader, batch, error) {
      resolveCacheHits(batch);
      for (var i = 0; i < batch.keys.length; i++) {
        loader.clear(batch.keys[i]);
        batch.callbacks[i].reject(error);
      }
    }
    function resolveCacheHits(batch) {
      if (batch.cacheHits) {
        for (var i = 0; i < batch.cacheHits.length; i++) {
          batch.cacheHits[i]();
        }
      }
    }
    function getValidMaxBatchSize(options) {
      var shouldBatch = !options || options.batch !== false;
      if (!shouldBatch) {
        return 1;
      }
      var maxBatchSize = options && options.maxBatchSize;
      if (maxBatchSize === void 0) {
        return Infinity;
      }
      if (typeof maxBatchSize !== "number" || maxBatchSize < 1) {
        throw new TypeError("maxBatchSize must be a positive number: " + maxBatchSize);
      }
      return maxBatchSize;
    }
    function getValidBatchScheduleFn(options) {
      var batchScheduleFn = options && options.batchScheduleFn;
      if (batchScheduleFn === void 0) {
        return enqueuePostPromiseJob;
      }
      if (typeof batchScheduleFn !== "function") {
        throw new TypeError("batchScheduleFn must be a function: " + batchScheduleFn);
      }
      return batchScheduleFn;
    }
    function getValidCacheKeyFn(options) {
      var cacheKeyFn = options && options.cacheKeyFn;
      if (cacheKeyFn === void 0) {
        return function(key) {
          return key;
        };
      }
      if (typeof cacheKeyFn !== "function") {
        throw new TypeError("cacheKeyFn must be a function: " + cacheKeyFn);
      }
      return cacheKeyFn;
    }
    function getValidCacheMap(options) {
      var shouldCache = !options || options.cache !== false;
      if (!shouldCache) {
        return null;
      }
      var cacheMap = options && options.cacheMap;
      if (cacheMap === void 0) {
        return new Map();
      }
      if (cacheMap !== null) {
        var cacheFunctions = ["get", "set", "delete", "clear"];
        var missingFunctions = cacheFunctions.filter(function(fnName) {
          return cacheMap && typeof cacheMap[fnName] !== "function";
        });
        if (missingFunctions.length !== 0) {
          throw new TypeError("Custom cacheMap missing methods: " + missingFunctions.join(", "));
        }
      }
      return cacheMap;
    }
    function getValidName(options) {
      if (options && options.name) {
        return options.name;
      }
      return null;
    }
    function isArrayLike(x) {
      return typeof x === "object" && x !== null && typeof x.length === "number" && (x.length === 0 || x.length > 0 && Object.prototype.hasOwnProperty.call(x, x.length - 1));
    }
    module2.exports = DataLoader2;
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "@ton/ton",
      version: "15.2.0",
      repository: "https://github.com/ton-org/ton.git",
      author: "Whales Corp. <developers@whalescorp.com>",
      license: "MIT",
      main: "./dist/index.js",
      types: "./types/index.d.ts",
      files: [
        "dist",
        "types",
        "lib"
      ],
      scripts: {
        docs: "rm -fr docs && typedoc src/index.ts",
        "build:types": "npx api-extractor run --local",
        "rm:types": "find types -type f -name '*.d.ts' ! -name 'index.d.ts' -delete && find types -type d -empty -delete",
        buildLib: "rm -rf types && tsc --P tsconfig.types.json && npm run build:types && node esbuild.bundle.js && npm run rm:types",
        test: "jest --verbose --runInBand",
        release: "yarn build && yarn release-it --npm.yarn1",
        build: "rm -rf lib && rm -rf dist && tsc --declaration && yarn buildLib"
      },
      devDependencies: {
        "@ijstech/ton-core": "https://github.com/ijstech/ton-core.git",
        "@ijstech/zod": "https://github.com/ijstech/zod.git",
        "@microsoft/api-extractor": "^7.50.0",
        "@release-it/keep-a-changelog": "^5.0.0",
        "@ton/crypto": "3.2.0",
        "@ton/emulator": "^2.1.1",
        "@tonconnect/sdk": "^3.0.6",
        "@types/jest": "^27.0.1",
        "@types/node": "18.8.4",
        buffer: "^6.0.3",
        esbuild: "0.13.13",
        expect: "^27.1.0",
        jest: "^27.1.0",
        "jest-mock": "^27.1.0",
        karma: "^6.3.4",
        "karma-chrome-launcher": "^3.1.0",
        "karma-jasmine": "^4.0.1",
        "karma-typescript": "^5.5.2",
        "karma-webpack": "^5.0.0",
        prando: "^6.0.1",
        "release-it": "^17.1.1",
        "ts-jest": "^27.0.5",
        "ts-loader": "^9.2.5",
        "ts-node": "10.9.1",
        typedoc: "^0.23.24",
        typescript: "4.8.4",
        webpack: "^5.51.2"
      },
      dependencies: {
        axios: "^1.6.7",
        dataloader: "^2.0.0",
        "symbol.inspect": "1.0.1",
        teslabot: "^1.3.0"
      },
      peerDependencies: {
        "@ijstech/ton-core": ">=0.60.0",
        "@ton/crypto": ">=3.2.0"
      },
      publishConfig: {
        access: "public",
        registry: "https://registry.npmjs.org/"
      },
      "release-it": {
        github: {
          release: true
        },
        plugins: {
          "@release-it/keep-a-changelog": {
            filename: "CHANGELOG.md"
          }
        }
      },
      packageManager: "yarn@3.4.1"
    };
  }
});

// src/index.ts
__export(exports, {
  ABIArgument: () => import_core25.ABIArgument,
  ABIError: () => import_core25.ABIError,
  ABIField: () => import_core25.ABIField,
  ABIGetter: () => import_core25.ABIGetter,
  ABIReceiver: () => import_core25.ABIReceiver,
  ABIReceiverMessage: () => import_core25.ABIReceiverMessage,
  ABIType: () => import_core25.ABIType,
  ABITypeRef: () => import_core25.ABITypeRef,
  ADNLAddress: () => import_core25.ADNLAddress,
  Account: () => import_core25.Account,
  AccountState: () => import_core25.AccountState,
  AccountStatus: () => import_core25.AccountStatus,
  AccountStatusChange: () => import_core25.AccountStatusChange,
  AccountStorage: () => import_core25.AccountStorage,
  Address: () => import_core25.Address,
  BitBuilder: () => import_core25.BitBuilder,
  BitReader: () => import_core25.BitReader,
  BitString: () => import_core25.BitString,
  Builder: () => import_core25.Builder,
  Cell: () => import_core25.Cell,
  CellType: () => import_core25.CellType,
  CommonMessageInfo: () => import_core25.CommonMessageInfo,
  CommonMessageInfoExternalIn: () => import_core25.CommonMessageInfoExternalIn,
  CommonMessageInfoExternalOut: () => import_core25.CommonMessageInfoExternalOut,
  CommonMessageInfoInternal: () => import_core25.CommonMessageInfoInternal,
  CommonMessageInfoRelaxed: () => import_core25.CommonMessageInfoRelaxed,
  CommonMessageInfoRelaxedExternalOut: () => import_core25.CommonMessageInfoRelaxedExternalOut,
  CommonMessageInfoRelaxedInternal: () => import_core25.CommonMessageInfoRelaxedInternal,
  ComputeError: () => import_core25.ComputeError,
  ComputeSkipReason: () => import_core25.ComputeSkipReason,
  Contract: () => import_core25.Contract,
  ContractABI: () => import_core25.ContractABI,
  ContractGetMethodResult: () => import_core25.ContractGetMethodResult,
  ContractProvider: () => import_core25.ContractProvider,
  ContractState: () => import_core25.ContractState,
  CurrencyCollection: () => import_core25.CurrencyCollection,
  DepthBalanceInfo: () => import_core25.DepthBalanceInfo,
  Dictionary: () => import_core25.Dictionary,
  DictionaryKey: () => import_core25.DictionaryKey,
  DictionaryKeyTypes: () => import_core25.DictionaryKeyTypes,
  DictionaryValue: () => import_core25.DictionaryValue,
  ElectorContract: () => ElectorContract,
  ExternalAddress: () => import_core25.ExternalAddress,
  ExtraCurrency: () => import_core25.ExtraCurrency,
  HashUpdate: () => import_core25.HashUpdate,
  HttpApi: () => HttpApi,
  JettonMaster: () => JettonMaster,
  JettonWallet: () => JettonWallet,
  LibRef: () => import_core25.LibRef,
  MasterchainStateExtra: () => import_core25.MasterchainStateExtra,
  Maybe: () => import_core25.Maybe,
  Message: () => import_core25.Message,
  MessageRelaxed: () => import_core25.MessageRelaxed,
  MultisigOrder: () => MultisigOrder,
  MultisigOrderBuilder: () => MultisigOrderBuilder,
  MultisigWallet: () => MultisigWallet,
  OpenedContract: () => import_core25.OpenedContract,
  OutAction: () => import_core25.OutAction,
  OutActionChangeLibrary: () => import_core25.OutActionChangeLibrary,
  OutActionReserve: () => import_core25.OutActionReserve,
  OutActionSendMsg: () => import_core25.OutActionSendMsg,
  OutActionSetCode: () => import_core25.OutActionSetCode,
  ReserveMode: () => import_core25.ReserveMode,
  SendMode: () => import_core25.SendMode,
  Sender: () => import_core25.Sender,
  SenderArguments: () => import_core25.SenderArguments,
  ShardAccount: () => import_core25.ShardAccount,
  ShardAccountRef: () => import_core25.ShardAccountRef,
  ShardAccountRefValue: () => import_core25.ShardAccountRefValue,
  ShardIdent: () => import_core25.ShardIdent,
  ShardStateUnsplit: () => import_core25.ShardStateUnsplit,
  SimpleLibrary: () => import_core25.SimpleLibrary,
  Slice: () => import_core25.Slice,
  SplitMergeInfo: () => import_core25.SplitMergeInfo,
  StateInit: () => import_core25.StateInit,
  StorageInfo: () => import_core25.StorageInfo,
  StorageUsed: () => import_core25.StorageUsed,
  StorageUsedShort: () => import_core25.StorageUsedShort,
  TickTock: () => import_core25.TickTock,
  TonClient: () => TonClient,
  TonClient4: () => TonClient4,
  TonConnector: () => esm_exports,
  TonCrypto: () => TonCrypto,
  Transaction: () => import_core25.Transaction,
  TransactionActionPhase: () => import_core25.TransactionActionPhase,
  TransactionBounceNegativeFunds: () => import_core25.TransactionBounceNegativeFunds,
  TransactionBounceNoFunds: () => import_core25.TransactionBounceNoFunds,
  TransactionBounceOk: () => import_core25.TransactionBounceOk,
  TransactionBouncePhase: () => import_core25.TransactionBouncePhase,
  TransactionComputePhase: () => import_core25.TransactionComputePhase,
  TransactionComputeSkipped: () => import_core25.TransactionComputeSkipped,
  TransactionComputeVm: () => import_core25.TransactionComputeVm,
  TransactionCreditPhase: () => import_core25.TransactionCreditPhase,
  TransactionDescription: () => import_core25.TransactionDescription,
  TransactionDescriptionGeneric: () => import_core25.TransactionDescriptionGeneric,
  TransactionDescriptionMergeInstall: () => import_core25.TransactionDescriptionMergeInstall,
  TransactionDescriptionMergePrepare: () => import_core25.TransactionDescriptionMergePrepare,
  TransactionDescriptionSplitInstall: () => import_core25.TransactionDescriptionSplitInstall,
  TransactionDescriptionSplitPrepare: () => import_core25.TransactionDescriptionSplitPrepare,
  TransactionDescriptionStorage: () => import_core25.TransactionDescriptionStorage,
  TransactionDescriptionTickTock: () => import_core25.TransactionDescriptionTickTock,
  TransactionStoragePhase: () => import_core25.TransactionStoragePhase,
  Tuple: () => import_core25.Tuple,
  TupleBuilder: () => import_core25.TupleBuilder,
  TupleItem: () => import_core25.TupleItem,
  TupleItemBuilder: () => import_core25.TupleItemBuilder,
  TupleItemCell: () => import_core25.TupleItemCell,
  TupleItemInt: () => import_core25.TupleItemInt,
  TupleItemNaN: () => import_core25.TupleItemNaN,
  TupleItemNull: () => import_core25.TupleItemNull,
  TupleItemSlice: () => import_core25.TupleItemSlice,
  TupleReader: () => import_core25.TupleReader,
  WalletContractV1R1: () => WalletContractV1R1,
  WalletContractV1R2: () => WalletContractV1R2,
  WalletContractV1R3: () => WalletContractV1R3,
  WalletContractV2R1: () => WalletContractV2R1,
  WalletContractV2R2: () => WalletContractV2R2,
  WalletContractV3R1: () => WalletContractV3R1,
  WalletContractV3R2: () => WalletContractV3R2,
  WalletContractV4: () => WalletContractV4,
  WalletContractV5Beta: () => WalletContractV5Beta,
  WalletContractV5R1: () => WalletContractV5R1,
  Writable: () => import_core25.Writable,
  address: () => import_core25.address,
  base32Decode: () => import_core25.base32Decode,
  base32Encode: () => import_core25.base32Encode,
  beginCell: () => import_core25.beginCell,
  comment: () => import_core25.comment,
  computeExternalMessageFees: () => computeExternalMessageFees,
  computeFwdFees: () => computeFwdFees,
  computeGasPrices: () => computeGasPrices,
  computeMessageForwardFees: () => computeMessageForwardFees,
  computeStorageFees: () => computeStorageFees,
  configParse12: () => configParse12,
  configParse13: () => configParse13,
  configParse15: () => configParse15,
  configParse16: () => configParse16,
  configParse17: () => configParse17,
  configParse18: () => configParse18,
  configParse28: () => configParse28,
  configParse29: () => configParse29,
  configParse40: () => configParse40,
  configParse5: () => configParse5,
  configParse8: () => configParse8,
  configParseBridge: () => configParseBridge,
  configParseGasLimitsPrices: () => configParseGasLimitsPrices,
  configParseMasterAddress: () => configParseMasterAddress,
  configParseMasterAddressRequired: () => configParseMasterAddressRequired,
  configParseMsgPrices: () => configParseMsgPrices,
  configParseValidatorSet: () => configParseValidatorSet,
  configParseWorkchainDescriptor: () => configParseWorkchainDescriptor,
  contractAddress: () => import_core25.contractAddress,
  convertToMerkleProof: () => import_core25.convertToMerkleProof,
  crc16: () => import_core25.crc16,
  crc32c: () => import_core25.crc32c,
  exoticMerkleProof: () => import_core25.exoticMerkleProof,
  exoticMerkleUpdate: () => import_core25.exoticMerkleUpdate,
  exoticPruned: () => import_core25.exoticPruned,
  external: () => import_core25.external,
  fromNano: () => import_core25.fromNano,
  generateMerkleProof: () => import_core25.generateMerkleProof,
  generateMerkleProofDirect: () => import_core25.generateMerkleProofDirect,
  generateMerkleUpdate: () => import_core25.generateMerkleUpdate,
  getMethodId: () => import_core25.getMethodId,
  internal: () => import_core25.internal,
  loadAccount: () => import_core25.loadAccount,
  loadAccountState: () => import_core25.loadAccountState,
  loadAccountStatus: () => import_core25.loadAccountStatus,
  loadAccountStatusChange: () => import_core25.loadAccountStatusChange,
  loadAccountStorage: () => import_core25.loadAccountStorage,
  loadCommonMessageInfo: () => import_core25.loadCommonMessageInfo,
  loadCommonMessageInfoRelaxed: () => import_core25.loadCommonMessageInfoRelaxed,
  loadComputeSkipReason: () => import_core25.loadComputeSkipReason,
  loadConfigParamById: () => loadConfigParamById,
  loadConfigParamsAsSlice: () => loadConfigParamsAsSlice,
  loadCurrencyCollection: () => import_core25.loadCurrencyCollection,
  loadDepthBalanceInfo: () => import_core25.loadDepthBalanceInfo,
  loadExtraCurrency: () => import_core25.loadExtraCurrency,
  loadHashUpdate: () => import_core25.loadHashUpdate,
  loadLibRef: () => import_core25.loadLibRef,
  loadMasterchainStateExtra: () => import_core25.loadMasterchainStateExtra,
  loadMaybeExtraCurrency: () => import_core25.loadMaybeExtraCurrency,
  loadMessage: () => import_core25.loadMessage,
  loadMessageRelaxed: () => import_core25.loadMessageRelaxed,
  loadOutAction: () => import_core25.loadOutAction,
  loadOutList: () => import_core25.loadOutList,
  loadShardAccount: () => import_core25.loadShardAccount,
  loadShardAccounts: () => import_core25.loadShardAccounts,
  loadShardIdent: () => import_core25.loadShardIdent,
  loadShardStateUnsplit: () => import_core25.loadShardStateUnsplit,
  loadSimpleLibrary: () => import_core25.loadSimpleLibrary,
  loadSplitMergeInfo: () => import_core25.loadSplitMergeInfo,
  loadStateInit: () => import_core25.loadStateInit,
  loadStorageInfo: () => import_core25.loadStorageInfo,
  loadStorageUsed: () => import_core25.loadStorageUsed,
  loadStorageUsedShort: () => import_core25.loadStorageUsedShort,
  loadTickTock: () => import_core25.loadTickTock,
  loadTransaction: () => import_core25.loadTransaction,
  loadTransactionActionPhase: () => import_core25.loadTransactionActionPhase,
  loadTransactionBouncePhase: () => import_core25.loadTransactionBouncePhase,
  loadTransactionComputePhase: () => import_core25.loadTransactionComputePhase,
  loadTransactionCreditPhase: () => import_core25.loadTransactionCreditPhase,
  loadTransactionDescription: () => import_core25.loadTransactionDescription,
  loadTransactionStoragePhase: () => import_core25.loadTransactionStoragePhase,
  openContract: () => import_core25.openContract,
  packExtraCurrencyCell: () => import_core25.packExtraCurrencyCell,
  packExtraCurrencyDict: () => import_core25.packExtraCurrencyDict,
  paddedBufferToBits: () => import_core25.paddedBufferToBits,
  parseBridge: () => parseBridge,
  parseFullConfig: () => parseFullConfig,
  parseProposalSetup: () => parseProposalSetup,
  parseTuple: () => import_core25.parseTuple,
  parseValidatorSet: () => parseValidatorSet,
  parseVotingSetup: () => parseVotingSetup,
  safeSign: () => import_core25.safeSign,
  safeSignVerify: () => import_core25.safeSignVerify,
  serializeTuple: () => import_core25.serializeTuple,
  storeAccount: () => import_core25.storeAccount,
  storeAccountState: () => import_core25.storeAccountState,
  storeAccountStatus: () => import_core25.storeAccountStatus,
  storeAccountStatusChange: () => import_core25.storeAccountStatusChange,
  storeAccountStorage: () => import_core25.storeAccountStorage,
  storeCommonMessageInfo: () => import_core25.storeCommonMessageInfo,
  storeCommonMessageInfoRelaxed: () => import_core25.storeCommonMessageInfoRelaxed,
  storeComputeSkipReason: () => import_core25.storeComputeSkipReason,
  storeCurrencyCollection: () => import_core25.storeCurrencyCollection,
  storeDepthBalanceInfo: () => import_core25.storeDepthBalanceInfo,
  storeExtraCurrency: () => import_core25.storeExtraCurrency,
  storeHashUpdate: () => import_core25.storeHashUpdate,
  storeLibRef: () => import_core25.storeLibRef,
  storeMessage: () => import_core25.storeMessage,
  storeMessageRelaxed: () => import_core25.storeMessageRelaxed,
  storeOutAction: () => import_core25.storeOutAction,
  storeOutList: () => import_core25.storeOutList,
  storeShardAccount: () => import_core25.storeShardAccount,
  storeShardAccounts: () => import_core25.storeShardAccounts,
  storeShardIdent: () => import_core25.storeShardIdent,
  storeSimpleLibrary: () => import_core25.storeSimpleLibrary,
  storeSplitMergeInfo: () => import_core25.storeSplitMergeInfo,
  storeStateInit: () => import_core25.storeStateInit,
  storeStorageInfo: () => import_core25.storeStorageInfo,
  storeStorageUsed: () => import_core25.storeStorageUsed,
  storeStorageUsedShort: () => import_core25.storeStorageUsedShort,
  storeTickTock: () => import_core25.storeTickTock,
  storeTransaction: () => import_core25.storeTransaction,
  storeTransactionActionPhase: () => import_core25.storeTransactionActionPhase,
  storeTransactionBouncePhase: () => import_core25.storeTransactionBouncePhase,
  storeTransactionComputePhase: () => import_core25.storeTransactionComputePhase,
  storeTransactionCreditPhase: () => import_core25.storeTransactionCreditPhase,
  storeTransactionDescription: () => import_core25.storeTransactionDescription,
  storeTransactionsStoragePhase: () => import_core25.storeTransactionsStoragePhase,
  toNano: () => import_core25.toNano,
  z: () => z
});
init_buffer_shim();
var import_core25 = __toModule(require("@ijstech/ton-core"));
var TonCrypto = __toModule(require_dist());

// node_modules/@tonconnect/sdk/lib/esm/index.mjs
var esm_exports = {};
__export(esm_exports, {
  BadRequestError: () => BadRequestError,
  BrowserEventDispatcher: () => BrowserEventDispatcher,
  CHAIN: () => CHAIN,
  CONNECT_EVENT_ERROR_CODES: () => CONNECT_EVENT_ERROR_CODES,
  CONNECT_ITEM_ERROR_CODES: () => CONNECT_ITEM_ERROR_CODES,
  FetchWalletsError: () => FetchWalletsError,
  LocalstorageNotFoundError: () => LocalstorageNotFoundError,
  ParseHexError: () => ParseHexError,
  SEND_TRANSACTION_ERROR_CODES: () => SEND_TRANSACTION_ERROR_CODES,
  TonConnect: () => TonConnect,
  TonConnectError: () => TonConnectError,
  UnknownAppError: () => UnknownAppError,
  UnknownError: () => UnknownError,
  UserRejectsError: () => UserRejectsError,
  WalletAlreadyConnectedError: () => WalletAlreadyConnectedError,
  WalletNotConnectedError: () => WalletNotConnectedError,
  WalletNotInjectedError: () => WalletNotInjectedError,
  WalletsListManager: () => WalletsListManager,
  WrongAddressError: () => WrongAddressError,
  createConnectionCompletedEvent: () => createConnectionCompletedEvent,
  createConnectionErrorEvent: () => createConnectionErrorEvent,
  createConnectionRestoringCompletedEvent: () => createConnectionRestoringCompletedEvent,
  createConnectionRestoringErrorEvent: () => createConnectionRestoringErrorEvent,
  createConnectionRestoringStartedEvent: () => createConnectionRestoringStartedEvent,
  createConnectionStartedEvent: () => createConnectionStartedEvent,
  createDisconnectionEvent: () => createDisconnectionEvent,
  createRequestVersionEvent: () => createRequestVersionEvent,
  createResponseVersionEvent: () => createResponseVersionEvent,
  createTransactionSentForSignatureEvent: () => createTransactionSentForSignatureEvent,
  createTransactionSignedEvent: () => createTransactionSignedEvent,
  createTransactionSigningFailedEvent: () => createTransactionSigningFailedEvent,
  createVersionInfo: () => createVersionInfo,
  default: () => TonConnect,
  encodeTelegramUrlParameters: () => encodeTelegramUrlParameters,
  isTelegramUrl: () => isTelegramUrl,
  isWalletInfoCurrentlyEmbedded: () => isWalletInfoCurrentlyEmbedded,
  isWalletInfoCurrentlyInjected: () => isWalletInfoCurrentlyInjected,
  isWalletInfoInjectable: () => isWalletInfoInjectable,
  isWalletInfoInjected: () => isWalletInfoInjected,
  isWalletInfoRemote: () => isWalletInfoRemote,
  toUserFriendlyAddress: () => toUserFriendlyAddress
});
init_buffer_shim();

// node_modules/@tonconnect/protocol/lib/esm/index.mjs
init_buffer_shim();
var import_tweetnacl_util = __toModule(require_nacl_util());
var import_tweetnacl = __toModule(require_nacl_fast());
var CONNECT_EVENT_ERROR_CODES;
(function(CONNECT_EVENT_ERROR_CODES2) {
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_NOT_FOUND_ERROR"] = 2] = "MANIFEST_NOT_FOUND_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_CONTENT_ERROR"] = 3] = "MANIFEST_CONTENT_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_EVENT_ERROR_CODES || (CONNECT_EVENT_ERROR_CODES = {}));
var CONNECT_ITEM_ERROR_CODES;
(function(CONNECT_ITEM_ERROR_CODES2) {
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_ITEM_ERROR_CODES || (CONNECT_ITEM_ERROR_CODES = {}));
var SEND_TRANSACTION_ERROR_CODES;
(function(SEND_TRANSACTION_ERROR_CODES2) {
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SEND_TRANSACTION_ERROR_CODES || (SEND_TRANSACTION_ERROR_CODES = {}));
var SIGN_DATA_ERROR_CODES;
(function(SIGN_DATA_ERROR_CODES2) {
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SIGN_DATA_ERROR_CODES || (SIGN_DATA_ERROR_CODES = {}));
var DISCONNECT_ERROR_CODES;
(function(DISCONNECT_ERROR_CODES2) {
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(DISCONNECT_ERROR_CODES || (DISCONNECT_ERROR_CODES = {}));
var CHAIN;
(function(CHAIN2) {
  CHAIN2["MAINNET"] = "-239";
  CHAIN2["TESTNET"] = "-3";
})(CHAIN || (CHAIN = {}));
function encodeUint8Array(value, urlSafe) {
  const encoded = import_tweetnacl_util.default.encodeBase64(value);
  if (!urlSafe) {
    return encoded;
  }
  return encodeURIComponent(encoded);
}
function decodeToUint8Array(value, urlSafe) {
  if (urlSafe) {
    value = decodeURIComponent(value);
  }
  return import_tweetnacl_util.default.decodeBase64(value);
}
function encode(value, urlSafe = false) {
  let uint8Array;
  if (value instanceof Uint8Array) {
    uint8Array = value;
  } else {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    uint8Array = import_tweetnacl_util.default.decodeUTF8(value);
  }
  return encodeUint8Array(uint8Array, urlSafe);
}
function decode(value, urlSafe = false) {
  const decodedUint8Array = decodeToUint8Array(value, urlSafe);
  return {
    toString() {
      return import_tweetnacl_util.default.encodeUTF8(decodedUint8Array);
    },
    toObject() {
      try {
        return JSON.parse(import_tweetnacl_util.default.encodeUTF8(decodedUint8Array));
      } catch (e) {
        return null;
      }
    },
    toUint8Array() {
      return decodedUint8Array;
    }
  };
}
var Base64 = {
  encode,
  decode
};
function concatUint8Arrays(buffer1, buffer2) {
  const mergedArray = new Uint8Array(buffer1.length + buffer2.length);
  mergedArray.set(buffer1);
  mergedArray.set(buffer2, buffer1.length);
  return mergedArray;
}
function splitToUint8Arrays(array, index) {
  if (index >= array.length) {
    throw new Error("Index is out of buffer");
  }
  const subArray1 = array.slice(0, index);
  const subArray2 = array.slice(index);
  return [subArray1, subArray2];
}
function toHexString(byteArray) {
  let hexString = "";
  byteArray.forEach((byte) => {
    hexString += ("0" + (byte & 255).toString(16)).slice(-2);
  });
  return hexString;
}
function hexToByteArray(hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error(`Cannot convert ${hexString} to bytesArray`);
  }
  const result = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    result[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }
  return result;
}
var SessionCrypto = class {
  constructor(keyPair) {
    this.nonceLength = 24;
    this.keyPair = keyPair ? this.createKeypairFromString(keyPair) : this.createKeypair();
    this.sessionId = toHexString(this.keyPair.publicKey);
  }
  createKeypair() {
    return import_tweetnacl.default.box.keyPair();
  }
  createKeypairFromString(keyPair) {
    return {
      publicKey: hexToByteArray(keyPair.publicKey),
      secretKey: hexToByteArray(keyPair.secretKey)
    };
  }
  createNonce() {
    return import_tweetnacl.default.randomBytes(this.nonceLength);
  }
  encrypt(message2, receiverPublicKey) {
    const encodedMessage = new TextEncoder().encode(message2);
    const nonce = this.createNonce();
    const encrypted = import_tweetnacl.default.box(encodedMessage, nonce, receiverPublicKey, this.keyPair.secretKey);
    return concatUint8Arrays(nonce, encrypted);
  }
  decrypt(message2, senderPublicKey) {
    const [nonce, internalMessage] = splitToUint8Arrays(message2, this.nonceLength);
    const decrypted = import_tweetnacl.default.box.open(internalMessage, nonce, senderPublicKey, this.keyPair.secretKey);
    if (!decrypted) {
      throw new Error(`Decryption error: 
 message: ${message2.toString()} 
 sender pubkey: ${senderPublicKey.toString()} 
 keypair pubkey: ${this.keyPair.publicKey.toString()} 
 keypair secretkey: ${this.keyPair.secretKey.toString()}`);
    }
    return new TextDecoder().decode(decrypted);
  }
  stringifyKeypair() {
    return {
      publicKey: toHexString(this.keyPair.publicKey),
      secretKey: toHexString(this.keyPair.secretKey)
    };
  }
};

// node_modules/@tonconnect/isomorphic-eventsource/browser.js
init_buffer_shim();
{
}

// node_modules/@tonconnect/isomorphic-fetch/browser.js
init_buffer_shim();
{
}

// node_modules/@tonconnect/sdk/lib/esm/index.mjs
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var TonConnectError = class extends Error {
  constructor(message2, options) {
    super(message2, options);
    this.message = `${TonConnectError.prefix} ${this.constructor.name}${this.info ? ": " + this.info : ""}${message2 ? "\n" + message2 : ""}`;
    Object.setPrototypeOf(this, TonConnectError.prototype);
  }
  get info() {
    return "";
  }
};
TonConnectError.prefix = "[TON_CONNECT_SDK_ERROR]";
var DappMetadataError = class extends TonConnectError {
  get info() {
    return "Passed DappMetadata is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, DappMetadataError.prototype);
  }
};
var ManifestContentErrorError = class extends TonConnectError {
  get info() {
    return "Passed `tonconnect-manifest.json` contains errors. Check format of your manifest. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, ManifestContentErrorError.prototype);
  }
};
var ManifestNotFoundError = class extends TonConnectError {
  get info() {
    return "Manifest not found. Make sure you added `tonconnect-manifest.json` to the root of your app or passed correct manifestUrl. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, ManifestNotFoundError.prototype);
  }
};
var WalletAlreadyConnectedError = class extends TonConnectError {
  get info() {
    return "Wallet connection called but wallet already connected. To avoid the error, disconnect the wallet before doing a new connection.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, WalletAlreadyConnectedError.prototype);
  }
};
var WalletNotConnectedError = class extends TonConnectError {
  get info() {
    return "Send transaction or other protocol methods called while wallet is not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, WalletNotConnectedError.prototype);
  }
};
function isWalletConnectionSourceJS(value) {
  return "jsBridgeKey" in value;
}
var UserRejectsError = class extends TonConnectError {
  get info() {
    return "User rejects the action in the wallet.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, UserRejectsError.prototype);
  }
};
var BadRequestError = class extends TonConnectError {
  get info() {
    return "Request to the wallet contains errors.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
};
var UnknownAppError = class extends TonConnectError {
  get info() {
    return "App tries to send rpc request to the injected wallet while not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, UnknownAppError.prototype);
  }
};
var WalletNotInjectedError = class extends TonConnectError {
  get info() {
    return "There is an attempt to connect to the injected wallet while it is not exists in the webpage.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, WalletNotInjectedError.prototype);
  }
};
var LocalstorageNotFoundError = class extends TonConnectError {
  get info() {
    return "Storage was not specified in the `DappMetadata` and default `localStorage` was not detected in the environment.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, LocalstorageNotFoundError.prototype);
  }
};
var FetchWalletsError = class extends TonConnectError {
  get info() {
    return "An error occurred while fetching the wallets list.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, FetchWalletsError.prototype);
  }
};
var WrongAddressError = class extends TonConnectError {
  get info() {
    return "Passed address is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, WrongAddressError.prototype);
  }
};
var ParseHexError = class extends TonConnectError {
  get info() {
    return "Passed hex is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, ParseHexError.prototype);
  }
};
var UnknownError = class extends TonConnectError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
};
var connectEventErrorsCodes = {
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [CONNECT_EVENT_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [CONNECT_EVENT_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_NOT_FOUND_ERROR]: ManifestNotFoundError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_CONTENT_ERROR]: ManifestContentErrorError
};
var ConnectErrorsParser = class {
  parseError(error) {
    let ErrorConstructor = UnknownError;
    if (error.code in connectEventErrorsCodes) {
      ErrorConstructor = connectEventErrorsCodes[error.code] || UnknownError;
    }
    return new ErrorConstructor(error.message);
  }
};
var connectErrorsParser = new ConnectErrorsParser();
var RpcParser = class {
  isError(response) {
    return "error" in response;
  }
};
var sendTransactionErrors = {
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [SEND_TRANSACTION_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError
};
var SendTransactionParser = class extends RpcParser {
  convertToRpcRequest(request) {
    return {
      method: "sendTransaction",
      params: [JSON.stringify(request)]
    };
  }
  parseAndThrowError(response) {
    let ErrorConstructor = UnknownError;
    if (response.error.code in sendTransactionErrors) {
      ErrorConstructor = sendTransactionErrors[response.error.code] || UnknownError;
    }
    throw new ErrorConstructor(response.error.message);
  }
  convertFromRpcResponse(rpcResponse) {
    return {
      boc: rpcResponse.result
    };
  }
};
var sendTransactionParser = new SendTransactionParser();
var HttpBridgeGatewayStorage = class {
  constructor(storage, bridgeUrl) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_http-bridge-gateway::" + bridgeUrl;
  }
  storeLastEventId(lastEventId) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.setItem(this.storeKey, lastEventId);
    });
  }
  removeLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      return stored;
    });
  }
};
function removeUrlLastSlash(url) {
  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }
  return url;
}
function addPathToUrl(url, path) {
  return removeUrlLastSlash(url) + "/" + path;
}
function isTelegramUrl(link) {
  if (!link) {
    return false;
  }
  const url = new URL(link);
  return url.protocol === "tg:" || url.hostname === "t.me";
}
function encodeTelegramUrlParameters(parameters) {
  return parameters.replaceAll(".", "%2E").replaceAll("-", "%2D").replaceAll("_", "%5F").replaceAll("&", "-").replaceAll("=", "__").replaceAll("%", "--");
}
function delay(timeout2, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      var _a, _b;
      if ((_a = options === null || options === void 0 ? void 0 : options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
        reject(new TonConnectError("Delay aborted"));
        return;
      }
      const timeoutId = setTimeout(() => resolve(), timeout2);
      (_b = options === null || options === void 0 ? void 0 : options.signal) === null || _b === void 0 ? void 0 : _b.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new TonConnectError("Delay aborted"));
      });
    });
  });
}
function createAbortController(signal) {
  const abortController = new AbortController();
  if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
    abortController.abort();
  } else {
    signal === null || signal === void 0 ? void 0 : signal.addEventListener("abort", () => abortController.abort(), { once: true });
  }
  return abortController;
}
function callForSuccess(fn, options) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    const attempts = (_a = options === null || options === void 0 ? void 0 : options.attempts) !== null && _a !== void 0 ? _a : 10;
    const delayMs = (_b = options === null || options === void 0 ? void 0 : options.delayMs) !== null && _b !== void 0 ? _b : 200;
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    if (typeof fn !== "function") {
      throw new TonConnectError(`Expected a function, got ${typeof fn}`);
    }
    let i = 0;
    let lastError;
    while (i < attempts) {
      if (abortController.signal.aborted) {
        throw new TonConnectError(`Aborted after attempts ${i}`);
      }
      try {
        return yield fn({ signal: abortController.signal });
      } catch (err) {
        lastError = err;
        i++;
        if (i < attempts) {
          yield delay(delayMs);
        }
      }
    }
    throw lastError;
  });
}
function logDebug(...args) {
  {
    try {
      console.debug("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logError(...args) {
  {
    try {
      console.error("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logWarning(...args) {
  {
    try {
      console.warn("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function createResource(createFn, disposeFn) {
  let currentResource = null;
  let currentArgs = null;
  let currentPromise = null;
  let currentSignal = null;
  let abortController = null;
  const create = (signal, ...args) => __awaiter(this, void 0, void 0, function* () {
    currentSignal = signal !== null && signal !== void 0 ? signal : null;
    abortController === null || abortController === void 0 ? void 0 : abortController.abort();
    abortController = createAbortController(signal);
    if (abortController.signal.aborted) {
      throw new TonConnectError("Resource creation was aborted");
    }
    currentArgs = args !== null && args !== void 0 ? args : null;
    const promise = createFn(abortController.signal, ...args);
    currentPromise = promise;
    const resource = yield promise;
    if (currentPromise !== promise && resource !== currentResource) {
      yield disposeFn(resource);
      throw new TonConnectError("Resource creation was aborted by a new resource creation");
    }
    currentResource = resource;
    return currentResource;
  });
  const current = () => {
    return currentResource !== null && currentResource !== void 0 ? currentResource : null;
  };
  const dispose = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const resource = currentResource;
      currentResource = null;
      const promise = currentPromise;
      currentPromise = null;
      try {
        abortController === null || abortController === void 0 ? void 0 : abortController.abort();
      } catch (e) {
      }
      yield Promise.allSettled([
        resource ? disposeFn(resource) : Promise.resolve(),
        promise ? disposeFn(yield promise) : Promise.resolve()
      ]);
    } catch (e) {
    }
  });
  const recreate = (delayMs) => __awaiter(this, void 0, void 0, function* () {
    const resource = currentResource;
    const promise = currentPromise;
    const args = currentArgs;
    const signal = currentSignal;
    yield delay(delayMs);
    if (resource === currentResource && promise === currentPromise && args === currentArgs && signal === currentSignal) {
      return yield create(currentSignal, ...args !== null && args !== void 0 ? args : []);
    }
    throw new TonConnectError("Resource recreation was aborted by a new resource creation");
  });
  return {
    create,
    current,
    dispose,
    recreate
  };
}
function timeout(fn, options) {
  const timeout2 = options === null || options === void 0 ? void 0 : options.timeout;
  const signal = options === null || options === void 0 ? void 0 : options.signal;
  const abortController = createAbortController(signal);
  return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    if (abortController.signal.aborted) {
      reject(new TonConnectError("Operation aborted"));
      return;
    }
    let timeoutId;
    if (typeof timeout2 !== "undefined") {
      timeoutId = setTimeout(() => {
        abortController.abort();
        reject(new TonConnectError(`Timeout after ${timeout2}ms`));
      }, timeout2);
    }
    abortController.signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new TonConnectError("Operation aborted"));
    }, { once: true });
    const deferOptions = { timeout: timeout2, abort: abortController.signal };
    yield fn((...args) => {
      clearTimeout(timeoutId);
      resolve(...args);
    }, () => {
      clearTimeout(timeoutId);
      reject();
    }, deferOptions);
  }));
}
var BridgeGateway = class {
  constructor(storage, bridgeUrl, sessionId, listener, errorsListener) {
    this.bridgeUrl = bridgeUrl;
    this.sessionId = sessionId;
    this.listener = listener;
    this.errorsListener = errorsListener;
    this.ssePath = "events";
    this.postPath = "message";
    this.heartbeatMessage = "heartbeat";
    this.defaultTtl = 300;
    this.defaultReconnectDelay = 2e3;
    this.defaultResendDelay = 5e3;
    this.eventSource = createResource((signal, openingDeadlineMS) => __awaiter(this, void 0, void 0, function* () {
      const eventSourceConfig = {
        bridgeUrl: this.bridgeUrl,
        ssePath: this.ssePath,
        sessionId: this.sessionId,
        bridgeGatewayStorage: this.bridgeGatewayStorage,
        errorHandler: this.errorsHandler.bind(this),
        messageHandler: this.messagesHandler.bind(this),
        signal,
        openingDeadlineMS
      };
      return yield createEventSource(eventSourceConfig);
    }), (resource) => __awaiter(this, void 0, void 0, function* () {
      resource.close();
    }));
    this.bridgeGatewayStorage = new HttpBridgeGatewayStorage(storage, bridgeUrl);
  }
  get isReady() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) === EventSource.OPEN;
  }
  get isClosed() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) !== EventSource.OPEN;
  }
  get isConnecting() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) === EventSource.CONNECTING;
  }
  registerSession(options) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventSource.create(options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.openingDeadlineMS);
    });
  }
  send(message2, receiver, topic, ttlOrOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof ttlOrOptions === "number") {
        options.ttl = ttlOrOptions;
      } else {
        options.ttl = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.ttl;
        options.signal = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.signal;
        options.attempts = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.attempts;
      }
      const url = new URL(addPathToUrl(this.bridgeUrl, this.postPath));
      url.searchParams.append("client_id", this.sessionId);
      url.searchParams.append("to", receiver);
      url.searchParams.append("ttl", ((options === null || options === void 0 ? void 0 : options.ttl) || this.defaultTtl).toString());
      url.searchParams.append("topic", topic);
      const body = Base64.encode(message2);
      yield callForSuccess((options2) => __awaiter(this, void 0, void 0, function* () {
        const response = yield this.post(url, body, options2.signal);
        if (!response.ok) {
          throw new TonConnectError(`Bridge send failed, status ${response.status}`);
        }
      }), {
        attempts: (_a = options === null || options === void 0 ? void 0 : options.attempts) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER,
        delayMs: this.defaultResendDelay,
        signal: options === null || options === void 0 ? void 0 : options.signal
      });
    });
  }
  pause() {
    this.eventSource.dispose().catch((e) => logError(`Bridge pause failed, ${e}`));
  }
  unPause() {
    return __awaiter(this, void 0, void 0, function* () {
      const RECREATE_WITHOUT_DELAY = 0;
      yield this.eventSource.recreate(RECREATE_WITHOUT_DELAY);
    });
  }
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventSource.dispose().catch((e) => logError(`Bridge close failed, ${e}`));
    });
  }
  setListener(listener) {
    this.listener = listener;
  }
  setErrorsListener(errorsListener) {
    this.errorsListener = errorsListener;
  }
  post(url, body, signal) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(url, {
        method: "post",
        body,
        signal
      });
      if (!response.ok) {
        throw new TonConnectError(`Bridge send failed, status ${response.status}`);
      }
      return response;
    });
  }
  errorsHandler(eventSource, e) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.isConnecting) {
        eventSource.close();
        throw new TonConnectError("Bridge error, failed to connect");
      }
      if (this.isReady) {
        try {
          this.errorsListener(e);
        } catch (e2) {
        }
        return;
      }
      if (this.isClosed) {
        eventSource.close();
        logDebug(`Bridge reconnecting, ${this.defaultReconnectDelay}ms delay`);
        return yield this.eventSource.recreate(this.defaultReconnectDelay);
      }
      throw new TonConnectError("Bridge error, unknown state");
    });
  }
  messagesHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
      if (e.data === this.heartbeatMessage) {
        return;
      }
      yield this.bridgeGatewayStorage.storeLastEventId(e.lastEventId);
      if (this.isClosed) {
        return;
      }
      let bridgeIncomingMessage;
      try {
        bridgeIncomingMessage = JSON.parse(e.data);
      } catch (e2) {
        throw new TonConnectError(`Bridge message parse failed, message ${e2.data}`);
      }
      this.listener(bridgeIncomingMessage);
    });
  }
};
function createEventSource(config) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield timeout((resolve, reject, deferOptions) => __awaiter(this, void 0, void 0, function* () {
      var _a;
      const abortController = createAbortController(deferOptions.signal);
      const signal = abortController.signal;
      if (signal.aborted) {
        reject(new TonConnectError("Bridge connection aborted"));
        return;
      }
      const url = new URL(addPathToUrl(config.bridgeUrl, config.ssePath));
      url.searchParams.append("client_id", config.sessionId);
      const lastEventId = yield config.bridgeGatewayStorage.getLastEventId();
      if (lastEventId) {
        url.searchParams.append("last_event_id", lastEventId);
      }
      if (signal.aborted) {
        reject(new TonConnectError("Bridge connection aborted"));
        return;
      }
      const eventSource = new EventSource(url.toString());
      eventSource.onerror = (reason) => __awaiter(this, void 0, void 0, function* () {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        try {
          const newInstance = yield config.errorHandler(eventSource, reason);
          if (newInstance !== eventSource) {
            eventSource.close();
          }
          if (newInstance && newInstance !== eventSource) {
            resolve(newInstance);
          }
        } catch (e) {
          eventSource.close();
          reject(e);
        }
      });
      eventSource.onopen = () => {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        resolve(eventSource);
      };
      eventSource.onmessage = (event) => {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        config.messageHandler(event);
      };
      (_a = config.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => {
        eventSource.close();
        reject(new TonConnectError("Bridge connection aborted"));
      });
    }), { timeout: config.openingDeadlineMS, signal: config.signal });
  });
}
function isPendingConnectionHttp(connection) {
  return !("connectEvent" in connection);
}
var BridgeConnectionStorage = class {
  constructor(storage) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_bridge-connection";
  }
  storeConnection(connection) {
    return __awaiter(this, void 0, void 0, function* () {
      if (connection.type === "injected") {
        return this.storage.setItem(this.storeKey, JSON.stringify(connection));
      }
      if (!isPendingConnectionHttp(connection)) {
        const rawSession = {
          sessionKeyPair: connection.session.sessionCrypto.stringifyKeypair(),
          walletPublicKey: connection.session.walletPublicKey,
          bridgeUrl: connection.session.bridgeUrl
        };
        const rawConnection2 = {
          type: "http",
          connectEvent: connection.connectEvent,
          session: rawSession,
          lastWalletEventId: connection.lastWalletEventId,
          nextRpcRequestId: connection.nextRpcRequestId
        };
        return this.storage.setItem(this.storeKey, JSON.stringify(rawConnection2));
      }
      const rawConnection = {
        type: "http",
        connectionSource: connection.connectionSource,
        sessionCrypto: connection.sessionCrypto.stringifyKeypair()
      };
      return this.storage.setItem(this.storeKey, JSON.stringify(rawConnection));
    });
  }
  removeConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      if (connection.type === "injected") {
        return connection;
      }
      if ("connectEvent" in connection) {
        const sessionCrypto = new SessionCrypto(connection.session.sessionKeyPair);
        return {
          type: "http",
          connectEvent: connection.connectEvent,
          lastWalletEventId: connection.lastWalletEventId,
          nextRpcRequestId: connection.nextRpcRequestId,
          session: {
            sessionCrypto,
            bridgeUrl: connection.session.bridgeUrl,
            walletPublicKey: connection.session.walletPublicKey
          }
        };
      }
      return {
        type: "http",
        sessionCrypto: new SessionCrypto(connection.sessionCrypto),
        connectionSource: connection.connectionSource
      };
    });
  }
  getHttpConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read HTTP connection source while nothing is stored");
      }
      if (connection.type === "injected") {
        throw new TonConnectError("Trying to read HTTP connection source while injected connection is stored");
      }
      return connection;
    });
  }
  getHttpPendingConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read HTTP connection source while nothing is stored");
      }
      if (connection.type === "injected") {
        throw new TonConnectError("Trying to read HTTP connection source while injected connection is stored");
      }
      if (!isPendingConnectionHttp(connection)) {
        throw new TonConnectError("Trying to read HTTP-pending connection while http connection is stored");
      }
      return connection;
    });
  }
  getInjectedConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read Injected bridge connection source while nothing is stored");
      }
      if ((connection === null || connection === void 0 ? void 0 : connection.type) === "http") {
        throw new TonConnectError("Trying to read Injected bridge connection source while HTTP connection is stored");
      }
      return connection;
    });
  }
  storedConnectionType() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      return connection.type;
    });
  }
  storeLastWalletEventId(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && connection.type === "http" && !isPendingConnectionHttp(connection)) {
        connection.lastWalletEventId = id;
        return this.storeConnection(connection);
      }
    });
  }
  getLastWalletEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "lastWalletEventId" in connection) {
        return connection.lastWalletEventId;
      }
      return void 0;
    });
  }
  increaseNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "nextRpcRequestId" in connection) {
        const lastId = connection.nextRpcRequestId || 0;
        connection.nextRpcRequestId = lastId + 1;
        return this.storeConnection(connection);
      }
    });
  }
  getNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "nextRpcRequestId" in connection) {
        return connection.nextRpcRequestId || 0;
      }
      return 0;
    });
  }
};
var PROTOCOL_VERSION = 2;
var BridgeProvider = class {
  constructor(storage, walletConnectionSource) {
    this.storage = storage;
    this.walletConnectionSource = walletConnectionSource;
    this.type = "http";
    this.standardUniversalLink = "tc://";
    this.pendingRequests = new Map();
    this.session = null;
    this.gateway = null;
    this.pendingGateways = [];
    this.listeners = [];
    this.defaultOpeningDeadlineMS = 12e3;
    this.defaultRetryTimeoutMS = 2e3;
    this.connectionStorage = new BridgeConnectionStorage(storage);
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getHttpConnection();
      if (isPendingConnectionHttp(connection)) {
        return new BridgeProvider(storage, connection.connectionSource);
      }
      return new BridgeProvider(storage, { bridgeUrl: connection.session.bridgeUrl });
    });
  }
  connect(message2, options) {
    var _a;
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
    this.abortController = abortController;
    this.closeGateways();
    const sessionCrypto = new SessionCrypto();
    this.session = {
      sessionCrypto,
      bridgeUrl: "bridgeUrl" in this.walletConnectionSource ? this.walletConnectionSource.bridgeUrl : ""
    };
    this.connectionStorage.storeConnection({
      type: "http",
      connectionSource: this.walletConnectionSource,
      sessionCrypto
    }).then(() => __awaiter(this, void 0, void 0, function* () {
      if (abortController.signal.aborted) {
        return;
      }
      yield callForSuccess((_options) => {
        var _a2;
        return this.openGateways(sessionCrypto, {
          openingDeadlineMS: (_a2 = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _a2 !== void 0 ? _a2 : this.defaultOpeningDeadlineMS,
          signal: _options === null || _options === void 0 ? void 0 : _options.signal
        });
      }, {
        attempts: Number.MAX_SAFE_INTEGER,
        delayMs: this.defaultRetryTimeoutMS,
        signal: abortController.signal
      });
    }));
    const universalLink = "universalLink" in this.walletConnectionSource && this.walletConnectionSource.universalLink ? this.walletConnectionSource.universalLink : this.standardUniversalLink;
    return this.generateUniversalLink(universalLink, message2);
  }
  restoreConnection(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        return;
      }
      this.closeGateways();
      const storedConnection = yield this.connectionStorage.getHttpConnection();
      if (!storedConnection) {
        return;
      }
      if (abortController.signal.aborted) {
        return;
      }
      const openingDeadlineMS = (_b = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _b !== void 0 ? _b : this.defaultOpeningDeadlineMS;
      if (isPendingConnectionHttp(storedConnection)) {
        this.session = {
          sessionCrypto: storedConnection.sessionCrypto,
          bridgeUrl: "bridgeUrl" in this.walletConnectionSource ? this.walletConnectionSource.bridgeUrl : ""
        };
        return yield this.openGateways(storedConnection.sessionCrypto, {
          openingDeadlineMS,
          signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal
        });
      }
      if (Array.isArray(this.walletConnectionSource)) {
        throw new TonConnectError("Internal error. Connection source is array while WalletConnectionSourceHTTP was expected.");
      }
      this.session = storedConnection.session;
      if (this.gateway) {
        logDebug("Gateway is already opened, closing previous gateway");
        yield this.gateway.close();
      }
      this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, storedConnection.session.sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
      if (abortController.signal.aborted) {
        return;
      }
      this.listeners.forEach((listener) => listener(storedConnection.connectEvent));
      try {
        yield callForSuccess((options2) => this.gateway.registerSession({
          openingDeadlineMS,
          signal: options2.signal
        }), {
          attempts: Number.MAX_SAFE_INTEGER,
          delayMs: this.defaultRetryTimeoutMS,
          signal: abortController.signal
        });
      } catch (e) {
        yield this.disconnect({ signal: abortController.signal });
        return;
      }
    });
  }
  sendRequest(request, optionsOrOnRequestSent) {
    const options = {};
    if (typeof optionsOrOnRequestSent === "function") {
      options.onRequestSent = optionsOrOnRequestSent;
    } else {
      options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
      options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      options.attempts = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.attempts;
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!this.gateway || !this.session || !("walletPublicKey" in this.session)) {
        throw new TonConnectError("Trying to send bridge request without session");
      }
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send http-bridge request:", Object.assign(Object.assign({}, request), { id }));
      const encodedRequest = this.session.sessionCrypto.encrypt(JSON.stringify(Object.assign(Object.assign({}, request), { id })), hexToByteArray(this.session.walletPublicKey));
      try {
        yield this.gateway.send(encodedRequest, this.session.walletPublicKey, request.method, { attempts: options === null || options === void 0 ? void 0 : options.attempts, signal: options === null || options === void 0 ? void 0 : options.signal });
        (_a = options === null || options === void 0 ? void 0 : options.onRequestSent) === null || _a === void 0 ? void 0 : _a.call(options);
        this.pendingRequests.set(id.toString(), resolve);
      } catch (e) {
        reject(e);
      }
    }));
  }
  closeConnection() {
    this.closeGateways();
    this.listeners = [];
    this.session = null;
    this.gateway = null;
  }
  disconnect(options) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let called = false;
        let timeoutId = null;
        const onRequestSent = () => {
          if (!called) {
            called = true;
            this.removeBridgeAndSession().then(resolve);
          }
        };
        try {
          this.closeGateways();
          const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
          timeoutId = setTimeout(() => {
            abortController.abort();
          }, this.defaultOpeningDeadlineMS);
          yield this.sendRequest({ method: "disconnect", params: [] }, {
            onRequestSent,
            signal: abortController.signal,
            attempts: 1
          });
        } catch (e) {
          logDebug("Disconnect error:", e);
          if (!called) {
            this.removeBridgeAndSession().then(resolve);
          }
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          onRequestSent();
        }
      }));
    });
  }
  listen(callback) {
    this.listeners.push(callback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
  pause() {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.pause();
    this.pendingGateways.forEach((bridge) => bridge.pause());
  }
  unPause() {
    return __awaiter(this, void 0, void 0, function* () {
      const promises = this.pendingGateways.map((bridge) => bridge.unPause());
      if (this.gateway) {
        promises.push(this.gateway.unPause());
      }
      yield Promise.all(promises);
    });
  }
  pendingGatewaysListener(gateway, bridgeUrl, bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.pendingGateways.includes(gateway)) {
        yield gateway.close();
        return;
      }
      this.closeGateways({ except: gateway });
      if (this.gateway) {
        logDebug("Gateway is already opened, closing previous gateway");
        yield this.gateway.close();
      }
      this.session.bridgeUrl = bridgeUrl;
      this.gateway = gateway;
      this.gateway.setErrorsListener(this.gatewayErrorsListener.bind(this));
      this.gateway.setListener(this.gatewayListener.bind(this));
      return this.gatewayListener(bridgeIncomingMessage);
    });
  }
  gatewayListener(bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      const walletMessage = JSON.parse(this.session.sessionCrypto.decrypt(Base64.decode(bridgeIncomingMessage.message).toUint8Array(), hexToByteArray(bridgeIncomingMessage.from)));
      logDebug("Wallet message received:", walletMessage);
      if (!("event" in walletMessage)) {
        const id = walletMessage.id.toString();
        const resolve = this.pendingRequests.get(id);
        if (!resolve) {
          logDebug(`Response id ${id} doesn't match any request's id`);
          return;
        }
        resolve(walletMessage);
        this.pendingRequests.delete(id);
        return;
      }
      if (walletMessage.id !== void 0) {
        const lastId = yield this.connectionStorage.getLastWalletEventId();
        if (lastId !== void 0 && walletMessage.id <= lastId) {
          logError(`Received event id (=${walletMessage.id}) must be greater than stored last wallet event id (=${lastId}) `);
          return;
        }
        if (walletMessage.event !== "connect") {
          yield this.connectionStorage.storeLastWalletEventId(walletMessage.id);
        }
      }
      const listeners = this.listeners;
      if (walletMessage.event === "connect") {
        yield this.updateSession(walletMessage, bridgeIncomingMessage.from);
      }
      if (walletMessage.event === "disconnect") {
        logDebug(`Removing bridge and session: received disconnect event`);
        yield this.removeBridgeAndSession();
      }
      listeners.forEach((listener) => listener(walletMessage));
    });
  }
  gatewayErrorsListener(e) {
    return __awaiter(this, void 0, void 0, function* () {
      throw new TonConnectError(`Bridge error ${JSON.stringify(e)}`);
    });
  }
  updateSession(connectEvent, walletPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      this.session = Object.assign(Object.assign({}, this.session), { walletPublicKey });
      const tonAddrItem = connectEvent.payload.items.find((item) => item.name === "ton_addr");
      const connectEventToSave = Object.assign(Object.assign({}, connectEvent), { payload: Object.assign(Object.assign({}, connectEvent.payload), { items: [tonAddrItem] }) });
      yield this.connectionStorage.storeConnection({
        type: "http",
        session: this.session,
        lastWalletEventId: connectEvent.id,
        connectEvent: connectEventToSave,
        nextRpcRequestId: 0
      });
    });
  }
  removeBridgeAndSession() {
    return __awaiter(this, void 0, void 0, function* () {
      this.closeConnection();
      yield this.connectionStorage.removeConnection();
    });
  }
  generateUniversalLink(universalLink, message2) {
    if (isTelegramUrl(universalLink)) {
      return this.generateTGUniversalLink(universalLink, message2);
    }
    return this.generateRegularUniversalLink(universalLink, message2);
  }
  generateRegularUniversalLink(universalLink, message2) {
    const url = new URL(universalLink);
    url.searchParams.append("v", PROTOCOL_VERSION.toString());
    url.searchParams.append("id", this.session.sessionCrypto.sessionId);
    url.searchParams.append("r", JSON.stringify(message2));
    return url.toString();
  }
  generateTGUniversalLink(universalLink, message2) {
    const urlToWrap = this.generateRegularUniversalLink("about:blank", message2);
    const linkParams = urlToWrap.split("?")[1];
    const startapp = "tonconnect-" + encodeTelegramUrlParameters(linkParams);
    const updatedUniversalLink = this.convertToDirectLink(universalLink);
    const url = new URL(updatedUniversalLink);
    url.searchParams.append("startapp", startapp);
    return url.toString();
  }
  convertToDirectLink(universalLink) {
    const url = new URL(universalLink);
    if (url.searchParams.has("attach")) {
      url.searchParams.delete("attach");
      url.pathname += "/start";
    }
    return url.toString();
  }
  openGateways(sessionCrypto, options) {
    return __awaiter(this, void 0, void 0, function* () {
      if (Array.isArray(this.walletConnectionSource)) {
        this.pendingGateways.map((bridge) => bridge.close().catch());
        this.pendingGateways = this.walletConnectionSource.map((source) => {
          const gateway = new BridgeGateway(this.storage, source.bridgeUrl, sessionCrypto.sessionId, () => {
          }, () => {
          });
          gateway.setListener((message2) => this.pendingGatewaysListener(gateway, source.bridgeUrl, message2));
          return gateway;
        });
        yield Promise.allSettled(this.pendingGateways.map((bridge) => callForSuccess((_options) => {
          var _a;
          if (!this.pendingGateways.some((item) => item === bridge)) {
            return bridge.close();
          }
          return bridge.registerSession({
            openingDeadlineMS: (_a = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _a !== void 0 ? _a : this.defaultOpeningDeadlineMS,
            signal: _options.signal
          });
        }, {
          attempts: Number.MAX_SAFE_INTEGER,
          delayMs: this.defaultRetryTimeoutMS,
          signal: options === null || options === void 0 ? void 0 : options.signal
        })));
        return;
      } else {
        if (this.gateway) {
          logDebug(`Gateway is already opened, closing previous gateway`);
          yield this.gateway.close();
        }
        this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
        return yield this.gateway.registerSession({
          openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
          signal: options === null || options === void 0 ? void 0 : options.signal
        });
      }
    });
  }
  closeGateways(options) {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.close();
    this.pendingGateways.filter((item) => item !== (options === null || options === void 0 ? void 0 : options.except)).forEach((bridge) => bridge.close());
    this.pendingGateways = [];
  }
};
function hasProperty(value, propertyKey) {
  return hasProperties(value, [propertyKey]);
}
function hasProperties(value, propertyKeys) {
  if (!value || typeof value !== "object") {
    return false;
  }
  return propertyKeys.every((propertyKey) => propertyKey in value);
}
function isJSBridgeWithMetadata(value) {
  try {
    if (!hasProperty(value, "tonconnect") || !hasProperty(value.tonconnect, "walletInfo")) {
      return false;
    }
    return hasProperties(value.tonconnect.walletInfo, [
      "name",
      "app_name",
      "image",
      "about_url",
      "platforms"
    ]);
  } catch (_a) {
    return false;
  }
}
var InMemoryStorage = class {
  constructor() {
    this.storage = {};
  }
  static getInstance() {
    if (!InMemoryStorage.instance) {
      InMemoryStorage.instance = new InMemoryStorage();
    }
    return InMemoryStorage.instance;
  }
  get length() {
    return Object.keys(this.storage).length;
  }
  clear() {
    this.storage = {};
  }
  getItem(key) {
    var _a;
    return (_a = this.storage[key]) !== null && _a !== void 0 ? _a : null;
  }
  key(index) {
    var _a;
    const keys = Object.keys(this.storage);
    if (index < 0 || index >= keys.length) {
      return null;
    }
    return (_a = keys[index]) !== null && _a !== void 0 ? _a : null;
  }
  removeItem(key) {
    delete this.storage[key];
  }
  setItem(key, value) {
    this.storage[key] = value;
  }
};
function getWindow() {
  if (typeof window === "undefined") {
    return void 0;
  }
  return window;
}
function tryGetWindowKeys() {
  const window2 = getWindow();
  if (!window2) {
    return [];
  }
  try {
    return Object.keys(window2);
  } catch (_a) {
    return [];
  }
}
function getDocument() {
  if (typeof document === "undefined") {
    return void 0;
  }
  return document;
}
function getWebPageManifest() {
  var _a;
  const origin2 = (_a = getWindow()) === null || _a === void 0 ? void 0 : _a.location.origin;
  if (origin2) {
    return origin2 + "/tonconnect-manifest.json";
  }
  return "";
}
function tryGetLocalStorage() {
  if (isLocalStorageAvailable()) {
    return localStorage;
  }
  if (isNodeJs()) {
    throw new TonConnectError("`localStorage` is unavailable, but it is required for TonConnect. For more details, see https://github.com/ton-connect/sdk/tree/main/packages/sdk#init-connector");
  }
  return InMemoryStorage.getInstance();
}
function isLocalStorageAvailable() {
  try {
    return typeof localStorage !== "undefined";
  } catch (_a) {
    return false;
  }
}
function isNodeJs() {
  return typeof process !== "undefined" && process.versions != null && process.versions.node != null;
}
var InjectedProvider = class {
  constructor(storage, injectedWalletKey) {
    this.injectedWalletKey = injectedWalletKey;
    this.type = "injected";
    this.unsubscribeCallback = null;
    this.listenSubscriptions = false;
    this.listeners = [];
    const window2 = InjectedProvider.window;
    if (!InjectedProvider.isWindowContainsWallet(window2, injectedWalletKey)) {
      throw new WalletNotInjectedError();
    }
    this.connectionStorage = new BridgeConnectionStorage(storage);
    this.injectedWallet = window2[injectedWalletKey].tonconnect;
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getInjectedConnection();
      return new InjectedProvider(storage, connection.jsBridgeKey);
    });
  }
  static isWalletInjected(injectedWalletKey) {
    return InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey);
  }
  static isInsideWalletBrowser(injectedWalletKey) {
    if (InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey)) {
      return this.window[injectedWalletKey].tonconnect.isWalletBrowser;
    }
    return false;
  }
  static getCurrentlyInjectedWallets() {
    if (!this.window) {
      return [];
    }
    const windowKeys = tryGetWindowKeys();
    const wallets = windowKeys.filter(([_, value]) => isJSBridgeWithMetadata(value));
    return wallets.map(([jsBridgeKey, wallet]) => ({
      name: wallet.tonconnect.walletInfo.name,
      appName: wallet.tonconnect.walletInfo.app_name,
      aboutUrl: wallet.tonconnect.walletInfo.about_url,
      imageUrl: wallet.tonconnect.walletInfo.image,
      tondns: wallet.tonconnect.walletInfo.tondns,
      jsBridgeKey,
      injected: true,
      embedded: wallet.tonconnect.isWalletBrowser,
      platforms: wallet.tonconnect.walletInfo.platforms
    }));
  }
  static isWindowContainsWallet(window2, injectedWalletKey) {
    return !!window2 && injectedWalletKey in window2 && typeof window2[injectedWalletKey] === "object" && "tonconnect" in window2[injectedWalletKey];
  }
  connect(message2) {
    this._connect(PROTOCOL_VERSION, message2);
  }
  restoreConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider restoring connection...`);
        const connectEvent = yield this.injectedWallet.restoreConnection();
        logDebug("Injected Provider restoring connection response", connectEvent);
        if (connectEvent.event === "connect") {
          this.makeSubscriptions();
          this.listeners.forEach((listener) => listener(connectEvent));
        } else {
          yield this.connectionStorage.removeConnection();
        }
      } catch (e) {
        yield this.connectionStorage.removeConnection();
        console.error(e);
      }
    });
  }
  closeConnection() {
    if (this.listenSubscriptions) {
      this.injectedWallet.disconnect();
    }
    this.closeAllListeners();
  }
  disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => {
        const onRequestSent = () => {
          this.closeAllListeners();
          this.connectionStorage.removeConnection().then(resolve);
        };
        try {
          this.injectedWallet.disconnect();
          onRequestSent();
        } catch (e) {
          logDebug(e);
          this.sendRequest({
            method: "disconnect",
            params: []
          }, onRequestSent);
        }
      });
    });
  }
  closeAllListeners() {
    var _a;
    this.listenSubscriptions = false;
    this.listeners = [];
    (_a = this.unsubscribeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  listen(eventsCallback) {
    this.listeners.push(eventsCallback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== eventsCallback);
  }
  sendRequest(request, optionsOrOnRequestSent) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof optionsOrOnRequestSent === "function") {
        options.onRequestSent = optionsOrOnRequestSent;
      } else {
        options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
        options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      }
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send injected-bridge request:", Object.assign(Object.assign({}, request), { id }));
      const result = this.injectedWallet.send(Object.assign(Object.assign({}, request), { id }));
      result.then((response) => logDebug("Wallet message received:", response));
      (_a = options === null || options === void 0 ? void 0 : options.onRequestSent) === null || _a === void 0 ? void 0 : _a.call(options);
      return result;
    });
  }
  _connect(protocolVersion, message2) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider connect request: protocolVersion: ${protocolVersion}, message:`, message2);
        const connectEvent = yield this.injectedWallet.connect(protocolVersion, message2);
        logDebug("Injected Provider connect response:", connectEvent);
        if (connectEvent.event === "connect") {
          yield this.updateSession();
          this.makeSubscriptions();
        }
        this.listeners.forEach((listener) => listener(connectEvent));
      } catch (e) {
        logDebug("Injected Provider connect error:", e);
        const connectEventError = {
          event: "connect_error",
          payload: {
            code: 0,
            message: e === null || e === void 0 ? void 0 : e.toString()
          }
        };
        this.listeners.forEach((listener) => listener(connectEventError));
      }
    });
  }
  makeSubscriptions() {
    this.listenSubscriptions = true;
    this.unsubscribeCallback = this.injectedWallet.listen((e) => {
      logDebug("Wallet message received:", e);
      if (this.listenSubscriptions) {
        this.listeners.forEach((listener) => listener(e));
      }
      if (e.event === "disconnect") {
        this.disconnect();
      }
    });
  }
  updateSession() {
    return this.connectionStorage.storeConnection({
      type: "injected",
      jsBridgeKey: this.injectedWalletKey,
      nextRpcRequestId: 0
    });
  }
};
InjectedProvider.window = getWindow();
var DefaultStorage = class {
  constructor() {
    this.localStorage = tryGetLocalStorage();
  }
  getItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.localStorage.getItem(key);
    });
  }
  removeItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      this.localStorage.removeItem(key);
    });
  }
  setItem(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
      this.localStorage.setItem(key, value);
    });
  }
};
function isWalletInfoCurrentlyInjected(value) {
  return isWalletInfoInjectable(value) && value.injected;
}
function isWalletInfoCurrentlyEmbedded(value) {
  return isWalletInfoCurrentlyInjected(value) && value.embedded;
}
function isWalletInfoInjectable(value) {
  return "jsBridgeKey" in value;
}
function isWalletInfoRemote(value) {
  return "bridgeUrl" in value;
}
function isWalletInfoInjected(value) {
  return "jsBridgeKey" in value;
}
var FALLBACK_WALLETS_LIST = [
  {
    app_name: "telegram-wallet",
    name: "Wallet",
    image: "https://wallet.tg/images/logo-288.png",
    about_url: "https://wallet.tg/",
    universal_url: "https://t.me/wallet?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://walletbot.me/tonconnect-bridge/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "tonkeeper",
    name: "Tonkeeper",
    image: "https://tonkeeper.com/assets/tonconnect-icon.png",
    tondns: "tonkeeper.ton",
    about_url: "https://tonkeeper.com",
    universal_url: "https://app.tonkeeper.com/ton-connect",
    deepLink: "tonkeeper-tc://",
    bridge: [
      {
        type: "sse",
        url: "https://bridge.tonapi.io/bridge"
      },
      {
        type: "js",
        key: "tonkeeper"
      }
    ],
    platforms: ["ios", "android", "chrome", "firefox", "macos"]
  },
  {
    app_name: "mytonwallet",
    name: "MyTonWallet",
    image: "https://static.mytonwallet.io/icon-256.png",
    about_url: "https://mytonwallet.io",
    universal_url: "https://connect.mytonwallet.org",
    bridge: [
      {
        type: "js",
        key: "mytonwallet"
      },
      {
        type: "sse",
        url: "https://tonconnectbridge.mytonwallet.org/bridge/"
      }
    ],
    platforms: ["chrome", "windows", "macos", "linux", "ios", "android", "firefox"]
  },
  {
    app_name: "tonhub",
    name: "Tonhub",
    image: "https://tonhub.com/tonconnect_logo.png",
    about_url: "https://tonhub.com",
    universal_url: "https://tonhub.com/ton-connect",
    bridge: [
      {
        type: "js",
        key: "tonhub"
      },
      {
        type: "sse",
        url: "https://connect.tonhubapi.com/tonconnect"
      }
    ],
    platforms: ["ios", "android"]
  },
  {
    app_name: "bitgetTonWallet",
    name: "Bitget Wallet",
    image: "https://raw.githubusercontent.com/bitgetwallet/download/refs/heads/main/logo/png/bitget_wallet_logo_288_mini.png",
    about_url: "https://web3.bitget.com",
    deepLink: "bitkeep://",
    bridge: [
      {
        type: "js",
        key: "bitgetTonWallet"
      },
      {
        type: "sse",
        url: "https://ton-connect-bridge.bgwapi.io/bridge"
      }
    ],
    platforms: ["ios", "android", "chrome"],
    universal_url: "https://bkcode.vip/ton-connect"
  },
  {
    app_name: "okxMiniWallet",
    name: "OKX Mini Wallet",
    image: "https://static.okx.com/cdn/assets/imgs/2411/8BE1A4A434D8F58A.png",
    about_url: "https://www.okx.com/web3",
    universal_url: "https://t.me/OKX_WALLET_BOT?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://www.okx.com/tonbridge/discover/rpc/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "binanceWeb3TonWallet",
    name: "Binance Web3 Wallet",
    image: "https://public.bnbstatic.com/static/binance-w3w/ton-provider/binancew3w.png",
    about_url: "https://www.binance.com/en/web3wallet",
    deepLink: "bnc://app.binance.com/cedefi/ton-connect",
    bridge: [
      {
        type: "js",
        key: "binancew3w"
      },
      {
        type: "sse",
        url: "https://wallet.binance.com/tonbridge/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"],
    universal_url: "https://app.binance.com/cedefi/ton-connect"
  },
  {
    app_name: "fintopio-tg",
    name: "Fintopio",
    image: "https://fintopio.com/tonconnect-icon.png",
    about_url: "https://fintopio.com",
    universal_url: "https://t.me/fintopio?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://wallet-bridge.fintopio.com/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "okxTonWallet",
    name: "OKX Wallet",
    image: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
    about_url: "https://www.okx.com/web3",
    universal_url: "https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect",
    bridge: [
      {
        type: "js",
        key: "okxTonWallet"
      },
      {
        type: "sse",
        url: "https://www.okx.com/tonbridge/discover/rpc/bridge"
      }
    ],
    platforms: ["chrome", "safari", "firefox", "ios", "android"]
  },
  {
    app_name: "hot",
    name: "HOT",
    image: "https://raw.githubusercontent.com/hot-dao/media/main/logo.png",
    about_url: "https://hot-labs.org/",
    universal_url: "https://t.me/herewalletbot?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://sse-bridge.hot-labs.org"
      },
      {
        type: "js",
        key: "hotWallet"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "bybitTonWallet",
    name: "Bybit Wallet",
    image: "https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png",
    about_url: "https://www.bybit.com/web3",
    universal_url: "https://app.bybit.com/ton-connect",
    deepLink: "bybitapp://",
    bridge: [
      {
        type: "js",
        key: "bybitTonWallet"
      },
      {
        type: "sse",
        url: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge"
      }
    ],
    platforms: ["ios", "android", "chrome"]
  },
  {
    app_name: "dewallet",
    name: "DeWallet",
    image: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
    about_url: "https://delabwallet.com",
    universal_url: "https://t.me/dewallet?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://bridge.dewallet.pro/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "safepalwallet",
    name: "SafePal",
    image: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
    tondns: "",
    about_url: "https://www.safepal.com",
    universal_url: "https://link.safepal.io/ton-connect",
    deepLink: "safepal-tc://",
    bridge: [
      {
        type: "sse",
        url: "https://ton-bridge.safepal.com/tonbridge/v1/bridge"
      },
      {
        type: "js",
        key: "safepalwallet"
      }
    ],
    platforms: ["ios", "android", "chrome", "firefox"]
  },
  {
    app_name: "GateWallet",
    name: "GateWallet",
    image: "https://img.gatedataimg.com/prd-ordinal-imgs/036f07bb8730716e/gateio-0925.png",
    about_url: "https://www.gate.io/",
    bridge: [
      {
        type: "js",
        key: "gatetonwallet"
      },
      {
        type: "sse",
        url: "https://dapp.gateio.services/tonbridge_api/bridge/v1"
      }
    ],
    platforms: ["ios", "android"],
    universal_url: "https://gateio.go.link/gateio/web3?adj_t=1ff8khdw_1fu4ccc7"
  },
  {
    app_name: "openmask",
    name: "OpenMask",
    image: "https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png",
    about_url: "https://www.openmask.app/",
    bridge: [
      {
        type: "js",
        key: "openmask"
      }
    ],
    platforms: ["chrome"]
  },
  {
    app_name: "BitgetWeb3",
    name: "BitgetWeb3",
    image: "https://img.bitgetimg.com/image/third/1731638059795.png",
    about_url: "\u200Bhttps://www.bitget.com",
    universal_url: "https://t.me/BitgetOfficialBot?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://ton-connect-bridge.bgwapi.io/bridge"
      }
    ],
    platforms: ["ios", "android", "windows", "macos", "linux"]
  },
  {
    app_name: "tobi",
    name: "Tobi",
    image: "https://app.tobiwallet.app/icons/logo-288.png",
    about_url: "https://tobi.fun",
    universal_url: "https://t.me/TobiCopilotBot?attach=wallet",
    bridge: [
      {
        type: "sse",
        url: "https://ton-bridge.tobiwallet.app/bridge"
      }
    ],
    platforms: ["ios", "android", "macos", "windows", "linux"]
  },
  {
    app_name: "xtonwallet",
    name: "XTONWallet",
    image: "https://xtonwallet.com/assets/img/icon-256-back.png",
    about_url: "https://xtonwallet.com",
    bridge: [
      {
        type: "js",
        key: "xtonwallet"
      }
    ],
    platforms: ["chrome", "firefox"]
  },
  {
    app_name: "tonwallet",
    name: "TON Wallet",
    image: "https://wallet.ton.org/assets/ui/qr-logo.png",
    about_url: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
    bridge: [
      {
        type: "js",
        key: "tonwallet"
      }
    ],
    platforms: ["chrome"]
  }
];
var WalletsListManager = class {
  constructor(options) {
    this.walletsListCache = null;
    this.walletsListCacheCreationTimestamp = null;
    this.walletsListSource = "https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets-v2.json";
    if (options === null || options === void 0 ? void 0 : options.walletsListSource) {
      this.walletsListSource = options.walletsListSource;
    }
    if (options === null || options === void 0 ? void 0 : options.cacheTTLMs) {
      this.cacheTTLMs = options.cacheTTLMs;
    }
  }
  getWallets() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.cacheTTLMs && this.walletsListCacheCreationTimestamp && Date.now() > this.walletsListCacheCreationTimestamp + this.cacheTTLMs) {
        this.walletsListCache = null;
      }
      if (!this.walletsListCache) {
        this.walletsListCache = this.fetchWalletsList();
        this.walletsListCache.then(() => {
          this.walletsListCacheCreationTimestamp = Date.now();
        }).catch(() => {
          this.walletsListCache = null;
          this.walletsListCacheCreationTimestamp = null;
        });
      }
      return this.walletsListCache;
    });
  }
  getEmbeddedWallet() {
    return __awaiter(this, void 0, void 0, function* () {
      const walletsList = yield this.getWallets();
      const embeddedWallets = walletsList.filter(isWalletInfoCurrentlyEmbedded);
      if (embeddedWallets.length !== 1) {
        return null;
      }
      return embeddedWallets[0];
    });
  }
  fetchWalletsList() {
    return __awaiter(this, void 0, void 0, function* () {
      let walletsList = [];
      try {
        const walletsResponse = yield fetch(this.walletsListSource);
        walletsList = yield walletsResponse.json();
        if (!Array.isArray(walletsList)) {
          throw new FetchWalletsError("Wrong wallets list format, wallets list must be an array.");
        }
        const wrongFormatWallets = walletsList.filter((wallet) => !this.isCorrectWalletConfigDTO(wallet));
        if (wrongFormatWallets.length) {
          logError(`Wallet(s) ${wrongFormatWallets.map((wallet) => wallet.name).join(", ")} config format is wrong. They were removed from the wallets list.`);
          walletsList = walletsList.filter((wallet) => this.isCorrectWalletConfigDTO(wallet));
        }
      } catch (e) {
        logError(e);
        walletsList = FALLBACK_WALLETS_LIST;
      }
      let currentlyInjectedWallets = [];
      try {
        currentlyInjectedWallets = InjectedProvider.getCurrentlyInjectedWallets();
      } catch (e) {
        logError(e);
      }
      return this.mergeWalletsLists(this.walletConfigDTOListToWalletConfigList(walletsList), currentlyInjectedWallets);
    });
  }
  walletConfigDTOListToWalletConfigList(walletConfigDTO) {
    return walletConfigDTO.map((walletConfigDTO2) => {
      const walletConfigBase = {
        name: walletConfigDTO2.name,
        appName: walletConfigDTO2.app_name,
        imageUrl: walletConfigDTO2.image,
        aboutUrl: walletConfigDTO2.about_url,
        tondns: walletConfigDTO2.tondns,
        platforms: walletConfigDTO2.platforms
      };
      const walletConfig = walletConfigBase;
      walletConfigDTO2.bridge.forEach((bridge) => {
        if (bridge.type === "sse") {
          walletConfig.bridgeUrl = bridge.url;
          walletConfig.universalLink = walletConfigDTO2.universal_url;
          walletConfig.deepLink = walletConfigDTO2.deepLink;
        }
        if (bridge.type === "js") {
          const jsBridgeKey = bridge.key;
          walletConfig.jsBridgeKey = jsBridgeKey;
          walletConfig.injected = InjectedProvider.isWalletInjected(jsBridgeKey);
          walletConfig.embedded = InjectedProvider.isInsideWalletBrowser(jsBridgeKey);
        }
      });
      return walletConfig;
    });
  }
  mergeWalletsLists(list1, list2) {
    const names = new Set(list1.concat(list2).map((item) => item.name));
    return [...names.values()].map((name) => {
      const list1Item = list1.find((item) => item.name === name);
      const list2Item = list2.find((item) => item.name === name);
      return Object.assign(Object.assign({}, list1Item && Object.assign({}, list1Item)), list2Item && Object.assign({}, list2Item));
    });
  }
  isCorrectWalletConfigDTO(value) {
    if (!value || !(typeof value === "object")) {
      return false;
    }
    const containsName = "name" in value;
    const containsAppName = "app_name" in value;
    const containsImage = "image" in value;
    const containsAbout = "about_url" in value;
    const containsPlatforms = "platforms" in value;
    if (!containsName || !containsImage || !containsAbout || !containsPlatforms || !containsAppName) {
      return false;
    }
    if (!value.platforms || !Array.isArray(value.platforms) || !value.platforms.length) {
      return false;
    }
    if (!("bridge" in value) || !Array.isArray(value.bridge) || !value.bridge.length) {
      return false;
    }
    const bridge = value.bridge;
    if (bridge.some((item) => !item || typeof item !== "object" || !("type" in item))) {
      return false;
    }
    const sseBridge = bridge.find((item) => item.type === "sse");
    if (sseBridge) {
      if (!("url" in sseBridge) || !sseBridge.url || !value.universal_url) {
        return false;
      }
    }
    const jsBridge = bridge.find((item) => item.type === "js");
    if (jsBridge) {
      if (!("key" in jsBridge) || !jsBridge.key) {
        return false;
      }
    }
    return true;
  }
};
var WalletNotSupportFeatureError = class extends TonConnectError {
  get info() {
    return "Wallet doesn't support requested feature method.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, WalletNotSupportFeatureError.prototype);
  }
};
function checkSendTransactionSupport(features, options) {
  const supportsDeprecatedSendTransactionFeature = features.includes("SendTransaction");
  const sendTransactionFeature = features.find((feature) => feature && typeof feature === "object" && feature.name === "SendTransaction");
  if (!supportsDeprecatedSendTransactionFeature && !sendTransactionFeature) {
    throw new WalletNotSupportFeatureError("Wallet doesn't support SendTransaction feature.");
  }
  if (sendTransactionFeature && sendTransactionFeature.maxMessages !== void 0) {
    if (sendTransactionFeature.maxMessages < options.requiredMessagesNumber) {
      throw new WalletNotSupportFeatureError(`Wallet is not able to handle such SendTransaction request. Max support messages number is ${sendTransactionFeature.maxMessages}, but ${options.requiredMessagesNumber} is required.`);
    }
    return;
  }
  logWarning("Connected wallet didn't provide information about max allowed messages in the SendTransaction request. Request may be rejected by the wallet.");
}
function createRequestVersionEvent() {
  return {
    type: "request-version"
  };
}
function createResponseVersionEvent(version2) {
  return {
    type: "response-version",
    version: version2
  };
}
function createVersionInfo(version2) {
  return {
    ton_connect_sdk_lib: version2.ton_connect_sdk_lib,
    ton_connect_ui_lib: version2.ton_connect_ui_lib
  };
}
function createConnectionInfo(version2, wallet) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const isTonProof = ((_a = wallet === null || wallet === void 0 ? void 0 : wallet.connectItems) === null || _a === void 0 ? void 0 : _a.tonProof) && "proof" in wallet.connectItems.tonProof;
  const authType = isTonProof ? "ton_proof" : "ton_addr";
  return {
    wallet_address: (_c = (_b = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _b === void 0 ? void 0 : _b.address) !== null && _c !== void 0 ? _c : null,
    wallet_type: (_d = wallet === null || wallet === void 0 ? void 0 : wallet.device.appName) !== null && _d !== void 0 ? _d : null,
    wallet_version: (_e = wallet === null || wallet === void 0 ? void 0 : wallet.device.appVersion) !== null && _e !== void 0 ? _e : null,
    auth_type: authType,
    custom_data: Object.assign({ chain_id: (_g = (_f = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _f === void 0 ? void 0 : _f.chain) !== null && _g !== void 0 ? _g : null, provider: (_h = wallet === null || wallet === void 0 ? void 0 : wallet.provider) !== null && _h !== void 0 ? _h : null }, createVersionInfo(version2))
  };
}
function createConnectionStartedEvent(version2) {
  return {
    type: "connection-started",
    custom_data: createVersionInfo(version2)
  };
}
function createConnectionCompletedEvent(version2, wallet) {
  return Object.assign({ type: "connection-completed", is_success: true }, createConnectionInfo(version2, wallet));
}
function createConnectionErrorEvent(version2, error_message, errorCode) {
  return {
    type: "connection-error",
    is_success: false,
    error_message,
    error_code: errorCode !== null && errorCode !== void 0 ? errorCode : null,
    custom_data: createVersionInfo(version2)
  };
}
function createConnectionRestoringStartedEvent(version2) {
  return {
    type: "connection-restoring-started",
    custom_data: createVersionInfo(version2)
  };
}
function createConnectionRestoringCompletedEvent(version2, wallet) {
  return Object.assign({ type: "connection-restoring-completed", is_success: true }, createConnectionInfo(version2, wallet));
}
function createConnectionRestoringErrorEvent(version2, errorMessage) {
  return {
    type: "connection-restoring-error",
    is_success: false,
    error_message: errorMessage,
    custom_data: createVersionInfo(version2)
  };
}
function createTransactionInfo(wallet, transaction2) {
  var _a, _b, _c, _d;
  return {
    valid_until: (_a = String(transaction2.validUntil)) !== null && _a !== void 0 ? _a : null,
    from: (_d = (_b = transaction2.from) !== null && _b !== void 0 ? _b : (_c = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _c === void 0 ? void 0 : _c.address) !== null && _d !== void 0 ? _d : null,
    messages: transaction2.messages.map((message2) => {
      var _a2, _b2;
      return {
        address: (_a2 = message2.address) !== null && _a2 !== void 0 ? _a2 : null,
        amount: (_b2 = message2.amount) !== null && _b2 !== void 0 ? _b2 : null
      };
    })
  };
}
function createTransactionSentForSignatureEvent(version2, wallet, transaction2) {
  return Object.assign(Object.assign({ type: "transaction-sent-for-signature" }, createConnectionInfo(version2, wallet)), createTransactionInfo(wallet, transaction2));
}
function createTransactionSignedEvent(version2, wallet, transaction2, signedTransaction) {
  return Object.assign(Object.assign({ type: "transaction-signed", is_success: true, signed_transaction: signedTransaction.boc }, createConnectionInfo(version2, wallet)), createTransactionInfo(wallet, transaction2));
}
function createTransactionSigningFailedEvent(version2, wallet, transaction2, errorMessage, errorCode) {
  return Object.assign(Object.assign({ type: "transaction-signing-failed", is_success: false, error_message: errorMessage, error_code: errorCode !== null && errorCode !== void 0 ? errorCode : null }, createConnectionInfo(version2, wallet)), createTransactionInfo(wallet, transaction2));
}
function createDisconnectionEvent(version2, wallet, scope) {
  return Object.assign({ type: "disconnection", scope }, createConnectionInfo(version2, wallet));
}
var BrowserEventDispatcher = class {
  constructor() {
    this.window = getWindow();
  }
  dispatchEvent(eventName, eventDetails) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const event = new CustomEvent(eventName, { detail: eventDetails });
      (_a = this.window) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
    });
  }
  addEventListener(eventName, listener, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      (_a = this.window) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, listener, options);
      return () => {
        var _a2;
        return (_a2 = this.window) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener(eventName, listener);
      };
    });
  }
};
var TonConnectTracker = class {
  constructor(options) {
    var _a;
    this.eventPrefix = "ton-connect-";
    this.tonConnectUiVersion = null;
    this.eventDispatcher = (_a = options === null || options === void 0 ? void 0 : options.eventDispatcher) !== null && _a !== void 0 ? _a : new BrowserEventDispatcher();
    this.tonConnectSdkVersion = options.tonConnectSdkVersion;
    this.init().catch();
  }
  get version() {
    return createVersionInfo({
      ton_connect_sdk_lib: this.tonConnectSdkVersion,
      ton_connect_ui_lib: this.tonConnectUiVersion
    });
  }
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this.setRequestVersionHandler();
        this.tonConnectUiVersion = yield this.requestTonConnectUiVersion();
      } catch (e) {
      }
    });
  }
  setRequestVersionHandler() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventDispatcher.addEventListener("ton-connect-request-version", () => __awaiter(this, void 0, void 0, function* () {
        yield this.eventDispatcher.dispatchEvent("ton-connect-response-version", createResponseVersionEvent(this.tonConnectSdkVersion));
      }));
    });
  }
  requestTonConnectUiVersion() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
          yield this.eventDispatcher.addEventListener("ton-connect-ui-response-version", (event) => {
            resolve(event.detail.version);
          }, { once: true });
          yield this.eventDispatcher.dispatchEvent("ton-connect-ui-request-version", createRequestVersionEvent());
        } catch (e) {
          reject(e);
        }
      }));
    });
  }
  dispatchUserActionEvent(eventDetails) {
    try {
      this.eventDispatcher.dispatchEvent(`${this.eventPrefix}${eventDetails.type}`, eventDetails).catch();
    } catch (e) {
    }
  }
  trackConnectionStarted(...args) {
    try {
      const event = createConnectionStartedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackConnectionCompleted(...args) {
    try {
      const event = createConnectionCompletedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackConnectionError(...args) {
    try {
      const event = createConnectionErrorEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackConnectionRestoringStarted(...args) {
    try {
      const event = createConnectionRestoringStartedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackConnectionRestoringCompleted(...args) {
    try {
      const event = createConnectionRestoringCompletedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackConnectionRestoringError(...args) {
    try {
      const event = createConnectionRestoringErrorEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackDisconnection(...args) {
    try {
      const event = createDisconnectionEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackTransactionSentForSignature(...args) {
    try {
      const event = createTransactionSentForSignatureEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackTransactionSigned(...args) {
    try {
      const event = createTransactionSignedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  trackTransactionSigningFailed(...args) {
    try {
      const event = createTransactionSigningFailedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
};
var tonConnectSdkVersion = "3.0.6";
var TonConnect = class {
  constructor(options) {
    this.walletsList = new WalletsListManager();
    this._wallet = null;
    this.provider = null;
    this.statusChangeSubscriptions = [];
    this.statusChangeErrorSubscriptions = [];
    this.dappSettings = {
      manifestUrl: (options === null || options === void 0 ? void 0 : options.manifestUrl) || getWebPageManifest(),
      storage: (options === null || options === void 0 ? void 0 : options.storage) || new DefaultStorage()
    };
    this.walletsList = new WalletsListManager({
      walletsListSource: options === null || options === void 0 ? void 0 : options.walletsListSource,
      cacheTTLMs: options === null || options === void 0 ? void 0 : options.walletsListCacheTTLMs
    });
    this.tracker = new TonConnectTracker({
      eventDispatcher: options === null || options === void 0 ? void 0 : options.eventDispatcher,
      tonConnectSdkVersion
    });
    if (!this.dappSettings.manifestUrl) {
      throw new DappMetadataError("Dapp tonconnect-manifest.json must be specified if window.location.origin is undefined. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest");
    }
    this.bridgeConnectionStorage = new BridgeConnectionStorage(this.dappSettings.storage);
    if (!(options === null || options === void 0 ? void 0 : options.disableAutoPauseConnection)) {
      this.addWindowFocusAndBlurSubscriptions();
    }
  }
  static getWallets() {
    return this.walletsList.getWallets();
  }
  get connected() {
    return this._wallet !== null;
  }
  get account() {
    var _a;
    return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.account) || null;
  }
  get wallet() {
    return this._wallet;
  }
  set wallet(value) {
    this._wallet = value;
    this.statusChangeSubscriptions.forEach((callback) => callback(this._wallet));
  }
  getWallets() {
    return this.walletsList.getWallets();
  }
  onStatusChange(callback, errorsHandler) {
    this.statusChangeSubscriptions.push(callback);
    if (errorsHandler) {
      this.statusChangeErrorSubscriptions.push(errorsHandler);
    }
    return () => {
      this.statusChangeSubscriptions = this.statusChangeSubscriptions.filter((item) => item !== callback);
      if (errorsHandler) {
        this.statusChangeErrorSubscriptions = this.statusChangeErrorSubscriptions.filter((item) => item !== errorsHandler);
      }
    };
  }
  connect(wallet, requestOrOptions) {
    var _a, _b;
    const options = {};
    if (typeof requestOrOptions === "object" && "tonProof" in requestOrOptions) {
      options.request = requestOrOptions;
    }
    if (typeof requestOrOptions === "object" && ("openingDeadlineMS" in requestOrOptions || "signal" in requestOrOptions || "request" in requestOrOptions)) {
      options.request = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.request;
      options.openingDeadlineMS = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.openingDeadlineMS;
      options.signal = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.signal;
    }
    if (this.connected) {
      throw new WalletAlreadyConnectedError();
    }
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
    this.abortController = abortController;
    if (abortController.signal.aborted) {
      throw new TonConnectError("Connection was aborted");
    }
    (_b = this.provider) === null || _b === void 0 ? void 0 : _b.closeConnection();
    this.provider = this.createProvider(wallet);
    abortController.signal.addEventListener("abort", () => {
      var _a2;
      (_a2 = this.provider) === null || _a2 === void 0 ? void 0 : _a2.closeConnection();
      this.provider = null;
    });
    this.tracker.trackConnectionStarted();
    return this.provider.connect(this.createConnectRequest(options === null || options === void 0 ? void 0 : options.request), {
      openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
      signal: abortController.signal
    });
  }
  restoreConnection(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      this.tracker.trackConnectionRestoringStarted();
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      const [bridgeConnectionType, embeddedWallet] = yield Promise.all([
        this.bridgeConnectionStorage.storedConnectionType(),
        this.walletsList.getEmbeddedWallet()
      ]);
      if (abortController.signal.aborted) {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      let provider = null;
      try {
        switch (bridgeConnectionType) {
          case "http":
            provider = yield BridgeProvider.fromStorage(this.dappSettings.storage);
            break;
          case "injected":
            provider = yield InjectedProvider.fromStorage(this.dappSettings.storage);
            break;
          default:
            if (embeddedWallet) {
              provider = this.createProvider(embeddedWallet);
            } else {
              return;
            }
        }
      } catch (_c) {
        this.tracker.trackConnectionRestoringError("Provider is not restored");
        yield this.bridgeConnectionStorage.removeConnection();
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        provider = null;
        return;
      }
      if (abortController.signal.aborted) {
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      if (!provider) {
        logError("Provider is not restored");
        this.tracker.trackConnectionRestoringError("Provider is not restored");
        return;
      }
      (_b = this.provider) === null || _b === void 0 ? void 0 : _b.closeConnection();
      this.provider = provider;
      provider.listen(this.walletEventsListener.bind(this));
      const onAbortRestore = () => {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        provider = null;
      };
      abortController.signal.addEventListener("abort", onAbortRestore);
      const restoreConnectionTask = callForSuccess((_options) => __awaiter(this, void 0, void 0, function* () {
        yield provider === null || provider === void 0 ? void 0 : provider.restoreConnection({
          openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
          signal: _options.signal
        });
        abortController.signal.removeEventListener("abort", onAbortRestore);
        if (this.connected) {
          this.tracker.trackConnectionRestoringCompleted(this.wallet);
        } else {
          this.tracker.trackConnectionRestoringError("Connection restoring failed");
        }
      }), {
        attempts: Number.MAX_SAFE_INTEGER,
        delayMs: 2e3,
        signal: options === null || options === void 0 ? void 0 : options.signal
      });
      const restoreConnectionTimeout = new Promise((resolve) => setTimeout(() => resolve(), 12e3));
      return Promise.race([restoreConnectionTask, restoreConnectionTimeout]);
    });
  }
  sendTransaction(transaction2, optionsOrOnRequestSent) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof optionsOrOnRequestSent === "function") {
        options.onRequestSent = optionsOrOnRequestSent;
      } else {
        options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
        options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      }
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      if (abortController.signal.aborted) {
        throw new TonConnectError("Transaction sending was aborted");
      }
      this.checkConnection();
      checkSendTransactionSupport(this.wallet.device.features, {
        requiredMessagesNumber: transaction2.messages.length
      });
      this.tracker.trackTransactionSentForSignature(this.wallet, transaction2);
      const { validUntil } = transaction2, tx = __rest(transaction2, ["validUntil"]);
      const from = transaction2.from || this.account.address;
      const network = transaction2.network || this.account.chain;
      const response = yield this.provider.sendRequest(sendTransactionParser.convertToRpcRequest(Object.assign(Object.assign({}, tx), {
        valid_until: validUntil,
        from,
        network
      })), { onRequestSent: options.onRequestSent, signal: abortController.signal });
      if (sendTransactionParser.isError(response)) {
        this.tracker.trackTransactionSigningFailed(this.wallet, transaction2, response.error.message, response.error.code);
        return sendTransactionParser.parseAndThrowError(response);
      }
      const result = sendTransactionParser.convertFromRpcResponse(response);
      this.tracker.trackTransactionSigned(this.wallet, transaction2, result);
      return result;
    });
  }
  disconnect(options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.connected) {
        throw new WalletNotConnectedError();
      }
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      const prevAbortController = this.abortController;
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        throw new TonConnectError("Disconnect was aborted");
      }
      this.onWalletDisconnected("dapp");
      yield (_a = this.provider) === null || _a === void 0 ? void 0 : _a.disconnect({
        signal: abortController.signal
      });
      prevAbortController === null || prevAbortController === void 0 ? void 0 : prevAbortController.abort();
    });
  }
  pauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return;
    }
    this.provider.pause();
  }
  unPauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return Promise.resolve();
    }
    return this.provider.unPause();
  }
  addWindowFocusAndBlurSubscriptions() {
    const document2 = getDocument();
    if (!document2) {
      return;
    }
    try {
      document2.addEventListener("visibilitychange", () => {
        if (document2.hidden) {
          this.pauseConnection();
        } else {
          this.unPauseConnection().catch();
        }
      });
    } catch (e) {
      logError("Cannot subscribe to the document.visibilitychange: ", e);
    }
  }
  createProvider(wallet) {
    let provider;
    if (!Array.isArray(wallet) && isWalletConnectionSourceJS(wallet)) {
      provider = new InjectedProvider(this.dappSettings.storage, wallet.jsBridgeKey);
    } else {
      provider = new BridgeProvider(this.dappSettings.storage, wallet);
    }
    provider.listen(this.walletEventsListener.bind(this));
    return provider;
  }
  walletEventsListener(e) {
    switch (e.event) {
      case "connect":
        this.onWalletConnected(e.payload);
        break;
      case "connect_error":
        this.onWalletConnectError(e.payload);
        break;
      case "disconnect":
        this.onWalletDisconnected("wallet");
    }
  }
  onWalletConnected(connectEvent) {
    const tonAccountItem = connectEvent.items.find((item) => item.name === "ton_addr");
    const tonProofItem = connectEvent.items.find((item) => item.name === "ton_proof");
    if (!tonAccountItem) {
      throw new TonConnectError("ton_addr connection item was not found");
    }
    const wallet = {
      device: connectEvent.device,
      provider: this.provider.type,
      account: {
        address: tonAccountItem.address,
        chain: tonAccountItem.network,
        walletStateInit: tonAccountItem.walletStateInit,
        publicKey: tonAccountItem.publicKey
      }
    };
    if (tonProofItem) {
      wallet.connectItems = {
        tonProof: tonProofItem
      };
    }
    this.wallet = wallet;
    this.tracker.trackConnectionCompleted(wallet);
  }
  onWalletConnectError(connectEventError) {
    const error = connectErrorsParser.parseError(connectEventError);
    this.statusChangeErrorSubscriptions.forEach((errorsHandler) => errorsHandler(error));
    logDebug(error);
    this.tracker.trackConnectionError(connectEventError.message, connectEventError.code);
    if (error instanceof ManifestNotFoundError || error instanceof ManifestContentErrorError) {
      logError(error);
      throw error;
    }
  }
  onWalletDisconnected(scope) {
    this.tracker.trackDisconnection(this.wallet, scope);
    this.wallet = null;
  }
  checkConnection() {
    if (!this.connected) {
      throw new WalletNotConnectedError();
    }
  }
  createConnectRequest(request) {
    const items = [
      {
        name: "ton_addr"
      }
    ];
    if (request === null || request === void 0 ? void 0 : request.tonProof) {
      items.push({
        name: "ton_proof",
        payload: request.tonProof
      });
    }
    return {
      manifestUrl: this.dappSettings.manifestUrl,
      items
    };
  }
};
TonConnect.walletsList = new WalletsListManager();
TonConnect.isWalletInjected = (walletJSKey) => InjectedProvider.isWalletInjected(walletJSKey);
TonConnect.isInsideWalletBrowser = (walletJSKey) => InjectedProvider.isInsideWalletBrowser(walletJSKey);
var noBounceableTag = 81;
var testOnlyTag = 128;
function toUserFriendlyAddress(hexAddress, testOnly = false) {
  const { wc, hex } = parseHexAddress(hexAddress);
  let tag = noBounceableTag;
  if (testOnly) {
    tag |= testOnlyTag;
  }
  const addr = new Int8Array(34);
  addr[0] = tag;
  addr[1] = wc;
  addr.set(hex, 2);
  const addressWithChecksum = new Uint8Array(36);
  addressWithChecksum.set(addr);
  addressWithChecksum.set(crc16(addr), 34);
  let addressBase64 = Base64.encode(addressWithChecksum);
  return addressBase64.replace(/\+/g, "-").replace(/\//g, "_");
}
function parseHexAddress(hexAddress) {
  if (!hexAddress.includes(":")) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":".`);
  }
  const parts = hexAddress.split(":");
  if (parts.length !== 2) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":" only once.`);
  }
  const wc = parseInt(parts[0]);
  if (wc !== 0 && wc !== -1) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. WC must be eq 0 or -1, but ${wc} received.`);
  }
  const hex = parts[1];
  if ((hex === null || hex === void 0 ? void 0 : hex.length) !== 64) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Hex part must be 64bytes length, but ${hex === null || hex === void 0 ? void 0 : hex.length} received.`);
  }
  return {
    wc,
    hex: hexToBytes(hex)
  };
}
function crc16(data) {
  const poly = 4129;
  let reg = 0;
  const message2 = new Uint8Array(data.length + 2);
  message2.set(data);
  for (let byte of message2) {
    let mask = 128;
    while (mask > 0) {
      reg <<= 1;
      if (byte & mask) {
        reg += 1;
      }
      mask >>= 1;
      if (reg > 65535) {
        reg &= 65535;
        reg ^= poly;
      }
    }
  }
  return new Uint8Array([Math.floor(reg / 256), reg % 256]);
}
var toByteMap = {};
for (let ord = 0; ord <= 255; ord++) {
  let s = ord.toString(16);
  if (s.length < 2) {
    s = "0" + s;
  }
  toByteMap[s] = ord;
}
function hexToBytes(hex) {
  hex = hex.toLowerCase();
  const length2 = hex.length;
  if (length2 % 2 !== 0) {
    throw new ParseHexError("Hex string must have length a multiple of 2: " + hex);
  }
  const length = length2 / 2;
  const result = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    const doubled = i * 2;
    const hexSubstring = hex.substring(doubled, doubled + 2);
    if (!toByteMap.hasOwnProperty(hexSubstring)) {
      throw new ParseHexError("Invalid hex character: " + hexSubstring);
    }
    result[i] = toByteMap[hexSubstring];
  }
  return result;
}

// node_modules/@ijstech/zod/lib/index.mjs
init_buffer_shim();
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2 === null || message2 === void 0 ? void 0 : message2.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message: message2 } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message2 !== null && message2 !== void 0 ? message2 : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message2 !== null && message2 !== void 0 ? message2 : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message2 !== null && message2 !== void 0 ? message2 : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if ((_b = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message2) {
    const getIssueProperties = (val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if (!decoded.typ || !decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch (_a) {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  nanoid(message2) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  base64(message2) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message2) });
  }
  base64url(message2) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message2)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  date(message2) {
    return this._addCheck({ kind: "date", message: message2 });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  duration(message2) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message2) });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch (_a) {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message2).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          var _a2, _b2;
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = (_b2 = (_a2 = params.fatal) !== null && _a2 !== void 0 ? _a2 : fatal) !== null && _b2 !== void 0 ? _b2 : true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = (_b = (_a = params.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// src/client/api/HttpApi.ts
init_buffer_shim();

// src/client/api/TonCache.ts
init_buffer_shim();
var InMemoryCache = class {
  constructor() {
    this.cache = new Map();
    this.set = async (namespace, key, value) => {
      if (value !== null) {
        this.cache.set(namespace + "$$" + key, value);
      } else {
        this.cache.delete(namespace + "$$" + key);
      }
    };
    this.get = async (namespace, key) => {
      let res = this.cache.get(namespace + "$$" + key);
      if (res !== void 0) {
        return res;
      } else {
        return null;
      }
    };
  }
};

// src/client/api/HttpApi.ts
var import_dataloader = __toModule(require_dataloader());

// node_modules/axios/index.js
init_buffer_shim();

// node_modules/axios/lib/axios.js
init_buffer_shim();

// node_modules/axios/lib/utils.js
init_buffer_shim();

// node_modules/axios/lib/helpers/bind.js
init_buffer_shim();
"use strict";
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/axios/lib/utils.js
"use strict";
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype3 = getPrototypeOf(val);
  return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
var isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i = thing.length;
  if (!isNumber(i))
    return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define2 = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define2(arrayOrString) : define2(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction(_global.postMessage));
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};

// node_modules/axios/lib/core/Axios.js
init_buffer_shim();

// node_modules/axios/lib/helpers/buildURL.js
init_buffer_shim();

// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
init_buffer_shim();

// node_modules/axios/lib/helpers/toFormData.js
init_buffer_shim();

// node_modules/axios/lib/core/AxiosError.js
init_buffer_shim();
"use strict";
function AxiosError(message2, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message2;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils_default.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
var prototype = AxiosError.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);
  utils_default.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_default = AxiosError;

// node_modules/axios/lib/helpers/null.js
init_buffer_shim();
var null_default = null;

// node_modules/axios/lib/helpers/toFormData.js
"use strict";
function isVisitable(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (null_default || FormData)();
  options = utils_default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils_default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
var toFormData_default = toFormData;

// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
"use strict";
function encode2(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
}
var prototype2 = AxiosURLSearchParams.prototype;
prototype2.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype2.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode2);
  } : encode2;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/axios/lib/helpers/buildURL.js
"use strict";
function encode3(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode3;
  if (utils_default.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}

// node_modules/axios/lib/core/InterceptorManager.js
init_buffer_shim();
"use strict";
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
};
var InterceptorManager_default = InterceptorManager;

// node_modules/axios/lib/core/dispatchRequest.js
init_buffer_shim();

// node_modules/axios/lib/core/transformData.js
init_buffer_shim();

// node_modules/axios/lib/defaults/index.js
init_buffer_shim();

// node_modules/axios/lib/defaults/transitional.js
init_buffer_shim();
"use strict";
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

// node_modules/axios/lib/helpers/toURLEncodedForm.js
init_buffer_shim();

// node_modules/axios/lib/platform/index.js
init_buffer_shim();

// node_modules/axios/lib/platform/browser/index.js
init_buffer_shim();

// node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
init_buffer_shim();
"use strict";
var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

// node_modules/axios/lib/platform/browser/classes/FormData.js
init_buffer_shim();
"use strict";
var FormData_default = typeof FormData !== "undefined" ? FormData : null;

// node_modules/axios/lib/platform/browser/classes/Blob.js
init_buffer_shim();
"use strict";
var Blob_default = typeof Blob !== "undefined" ? Blob : null;

// node_modules/axios/lib/platform/browser/index.js
var browser_default = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: Blob_default
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};

// node_modules/axios/lib/platform/common/utils.js
var utils_exports = {};
__export(utils_exports, {
  hasBrowserEnv: () => hasBrowserEnv,
  hasStandardBrowserEnv: () => hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
  navigator: () => _navigator,
  origin: () => origin
});
init_buffer_shim();
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";

// node_modules/axios/lib/platform/index.js
var platform_default = {
  ...utils_exports,
  ...browser_default
};

// node_modules/axios/lib/helpers/toURLEncodedForm.js
"use strict";
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new platform_default.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

// node_modules/axios/lib/helpers/formDataToJSON.js
init_buffer_shim();
"use strict";
function parsePropPath(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__")
      return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var formDataToJSON_default = formDataToJSON;

// node_modules/axios/lib/defaults/index.js
"use strict";
function stringifySafely(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils_default.isObject(data);
    if (isObjectPayload && utils_default.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils_default.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
    }
    if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
      return data;
    }
    if (utils_default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils_default.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData_default(isFileList2 ? { "files[]": data } : data, _FormData && new _FormData(), this.formSerializer);
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
      return data;
    }
    if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var defaults_default = defaults;

// node_modules/axios/lib/core/AxiosHeaders.js
init_buffer_shim();

// node_modules/axios/lib/helpers/parseHeaders.js
init_buffer_shim();
"use strict";
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/axios/lib/core/AxiosHeaders.js
"use strict";
var $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value))
    return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders = class {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else if (utils_default.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype3 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype3, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/axios/lib/core/transformData.js
"use strict";
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}

// node_modules/axios/lib/cancel/isCancel.js
init_buffer_shim();
"use strict";
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/axios/lib/cancel/CanceledError.js
init_buffer_shim();
"use strict";
function CanceledError(message2, config, request) {
  AxiosError_default.call(this, message2 == null ? "canceled" : message2, AxiosError_default.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils_default.inherits(CanceledError, AxiosError_default, {
  __CANCEL__: true
});
var CanceledError_default = CanceledError;

// node_modules/axios/lib/adapters/adapters.js
init_buffer_shim();

// node_modules/axios/lib/adapters/xhr.js
init_buffer_shim();

// node_modules/axios/lib/core/settle.js
init_buffer_shim();
"use strict";
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_default("Request failed with status code " + response.status, [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
}

// node_modules/axios/lib/helpers/parseProtocol.js
init_buffer_shim();
"use strict";
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}

// node_modules/axios/lib/helpers/progressEventReducer.js
init_buffer_shim();

// node_modules/axios/lib/helpers/speedometer.js
init_buffer_shim();
"use strict";
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
var speedometer_default = speedometer;

// node_modules/axios/lib/helpers/throttle.js
init_buffer_shim();
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
var throttle_default = throttle;

// node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return throttle_default((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
var progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));

// node_modules/axios/lib/helpers/resolveConfig.js
init_buffer_shim();

// node_modules/axios/lib/helpers/isURLSameOrigin.js
init_buffer_shim();
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform_default.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;

// node_modules/axios/lib/helpers/cookies.js
init_buffer_shim();
var cookies_default = platform_default.hasStandardBrowserEnv ? {
  write(name, value, expires, path, domain, secure) {
    const cookie = [name + "=" + encodeURIComponent(value)];
    utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
    utils_default.isString(path) && cookie.push("path=" + path);
    utils_default.isString(domain) && cookie.push("domain=" + domain);
    secure === true && cookie.push("secure");
    document.cookie = cookie.join("; ");
  },
  read(name) {
    const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
    return match ? decodeURIComponent(match[3]) : null;
  },
  remove(name) {
    this.write(name, "", Date.now() - 864e5);
  }
} : {
  write() {
  },
  read() {
    return null;
  },
  remove() {
  }
};

// node_modules/axios/lib/core/buildFullPath.js
init_buffer_shim();

// node_modules/axios/lib/helpers/isAbsoluteURL.js
init_buffer_shim();
"use strict";
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

// node_modules/axios/lib/helpers/combineURLs.js
init_buffer_shim();
"use strict";
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/axios/lib/core/buildFullPath.js
"use strict";
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/axios/lib/core/mergeConfig.js
init_buffer_shim();
"use strict";
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders_default.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")));
  }
  let contentType;
  if (utils_default.isFormData(data)) {
    if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform_default.hasStandardBrowserEnv) {
    withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};

// node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig_default(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitional_default;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError_default(timeoutErrorMessage, transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/axios/lib/adapters/fetch.js
init_buffer_shim();

// node_modules/axios/lib/helpers/composeSignals.js
init_buffer_shim();
var composeSignals = (signals, timeout2) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout2 || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout2 && setTimeout(() => {
      timer = null;
      onabort(new AxiosError_default(`timeout ${timeout2} of ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout2);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils_default.asap(unsubscribe);
    return signal;
  }
};
var composeSignals_default = composeSignals;

// node_modules/axios/lib/helpers/trackStream.js
init_buffer_shim();
var streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
var readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  });
};

// node_modules/axios/lib/adapters/fetch.js
var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
var test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform_default.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var supportsResponseStream = isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
var resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
var getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils_default.isBlob(body)) {
    return body.size;
  }
  if (utils_default.isSpecCompliantForm(body)) {
    const _request = new Request(platform_default.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils_default.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils_default.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
var resolveBodyLength = async (headers, body) => {
  const length = utils_default.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
var fetch_default = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout: timeout2,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig_default(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals_default([signal, cancelToken && cancelToken.toAbortSignal()], timeout2);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils_default.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
      response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
        flush && flush();
        unsubscribe && unsubscribe();
      }), options);
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders_default.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request), {
        cause: err.cause || err
      });
    }
    throw AxiosError_default.from(err, err && err.code, config, request);
  }
});

// node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: null_default,
  xhr: xhr_default,
  fetch: fetch_default
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
var adapters_default = {
  getAdapter: (adapters) => {
    adapters = utils_default.isArray(adapters) ? adapters : [adapters];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError_default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError_default(`There is no suitable adapter to dispatch the request ` + s, "ERR_NOT_SUPPORT");
    }
    return adapter;
  },
  adapters: knownAdapters
};

// node_modules/axios/lib/core/dispatchRequest.js
"use strict";
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(config, config.transformResponse, response);
    response.headers = AxiosHeaders_default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
        reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

// node_modules/axios/lib/helpers/validator.js
init_buffer_shim();

// node_modules/axios/lib/env/data.js
init_buffer_shim();
var VERSION = "1.7.9";

// node_modules/axios/lib/helpers/validator.js
"use strict";
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional(validator, version2, message2) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message2 ? ". " + message2 : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")), AxiosError_default.ERR_DEPRECATED);
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future"));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === void 0 || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
}
var validator_default = {
  assertOptions,
  validators
};

// node_modules/axios/lib/core/Axios.js
"use strict";
var validators2 = validator_default.validators;
var Axios = class {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_default(),
      response: new InterceptorManager_default()
    };
  }
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator_default.assertOptions(transitional2, {
        silentJSONParsing: validators2.transitional(validators2.boolean),
        forcedJSONParsing: validators2.transitional(validators2.boolean),
        clarifyTimeoutError: validators2.transitional(validators2.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(paramsSerializer, {
          encode: validators2.function,
          serialize: validators2.function
        }, true);
      }
    }
    validator_default.assertOptions(config, {
      baseUrl: validators2.spelling("baseURL"),
      withXsrfToken: validators2.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
    headers && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/axios/lib/cancel/CancelToken.js
init_buffer_shim();
"use strict";
var CancelToken = class {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message2, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message2, config, request);
      resolvePromise(token.reason);
    });
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
var CancelToken_default = CancelToken;

// node_modules/axios/lib/helpers/spread.js
init_buffer_shim();
"use strict";
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/axios/lib/helpers/isAxiosError.js
init_buffer_shim();
"use strict";
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/axios/lib/helpers/HttpStatusCode.js
init_buffer_shim();
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/axios/lib/axios.js
"use strict";
function createInstance(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// src/client/api/HttpApi.ts
var version = require_package().version;
var blockIdExt = z.object({
  "@type": z.literal("ton.blockIdExt"),
  workchain: z.number(),
  shard: z.string(),
  seqno: z.number(),
  root_hash: z.string(),
  file_hash: z.string()
});
var addressInformation = z.object({
  balance: z.union([z.number(), z.string()]),
  extra_currencies: z.array(z.object({
    "@type": z.literal("extraCurrency"),
    id: z.number(),
    amount: z.string()
  })),
  state: z.union([z.literal("active"), z.literal("uninitialized"), z.literal("frozen")]),
  data: z.string(),
  code: z.string(),
  last_transaction_id: z.object({
    "@type": z.literal("internal.transactionId"),
    lt: z.string(),
    hash: z.string()
  }),
  block_id: blockIdExt,
  sync_utime: z.number()
});
var bocResponse = z.object({
  "@type": z.literal("ok")
});
var feeResponse = z.object({
  "@type": z.literal("query.fees"),
  source_fees: z.object({
    "@type": z.literal("fees"),
    in_fwd_fee: z.number(),
    storage_fee: z.number(),
    gas_fee: z.number(),
    fwd_fee: z.number()
  })
});
var callGetMethod = z.object({
  gas_used: z.number(),
  exit_code: z.number(),
  stack: z.array(z.unknown())
});
var messageData = z.union([
  z.object({
    "@type": z.literal("msg.dataRaw"),
    "body": z.string()
  }),
  z.object({
    "@type": z.literal("msg.dataText"),
    "text": z.string()
  }),
  z.object({
    "@type": z.literal("msg.dataDecryptedText"),
    "text": z.string()
  }),
  z.object({
    "@type": z.literal("msg.dataEncryptedText"),
    "text": z.string()
  })
]);
var message = z.object({
  source: z.string(),
  destination: z.string(),
  value: z.string(),
  fwd_fee: z.string(),
  ihr_fee: z.string(),
  created_lt: z.string(),
  body_hash: z.string(),
  msg_data: messageData,
  message: z.string().optional()
});
var transaction = z.object({
  data: z.string(),
  utime: z.number(),
  transaction_id: z.object({
    lt: z.string(),
    hash: z.string()
  }),
  fee: z.string(),
  storage_fee: z.string(),
  other_fee: z.string(),
  in_msg: z.union([z.undefined(), message]),
  out_msgs: z.array(message)
});
var getTransactions = z.array(transaction);
var getMasterchain = z.object({
  state_root_hash: z.string(),
  last: blockIdExt,
  init: blockIdExt
});
var getShards = z.object({
  shards: z.array(blockIdExt)
});
var blockShortTxt = z.object({
  "@type": z.literal("blocks.shortTxId"),
  mode: z.number(),
  account: z.string(),
  lt: z.string(),
  hash: z.string()
});
var getBlockTransactions = z.object({
  id: blockIdExt,
  req_count: z.number(),
  incomplete: z.boolean(),
  transactions: z.array(blockShortTxt)
});
var TypedCache = class {
  constructor(namespace, cache, codec, keyEncoder) {
    this.namespace = namespace;
    this.cache = cache;
    this.codec = codec;
    this.keyEncoder = keyEncoder;
  }
  async get(key) {
    let ex = await this.cache.get(this.namespace, this.keyEncoder(key));
    if (ex) {
      let decoded = this.codec.safeParse(JSON.parse(ex));
      if (decoded.success) {
        return decoded.data;
      }
    }
    return null;
  }
  async set(key, value) {
    if (value !== null) {
      await this.cache.set(this.namespace, this.keyEncoder(key), JSON.stringify(value));
    } else {
      await this.cache.set(this.namespace, this.keyEncoder(key), null);
    }
  }
};
var HttpApi = class {
  constructor(endpoint, parameters) {
    this.endpoint = endpoint;
    this.cache = new InMemoryCache();
    this.parameters = {
      timeout: parameters?.timeout || 3e4,
      apiKey: parameters?.apiKey,
      adapter: parameters?.adapter
    };
    this.shardCache = new TypedCache("ton-shard", this.cache, z.array(blockIdExt), (src) => src + "");
    this.shardLoader = new import_dataloader.default(async (src) => {
      return await Promise.all(src.map(async (v) => {
        const cached = await this.shardCache.get(v);
        if (cached) {
          return cached;
        }
        let loaded = (await this.doCall("shards", { seqno: v }, getShards)).shards;
        await this.shardCache.set(v, loaded);
        return loaded;
      }));
    });
    this.shardTransactionsCache = new TypedCache("ton-shard-tx", this.cache, getBlockTransactions, (src) => src.workchain + ":" + src.shard + ":" + src.seqno);
    this.shardTransactionsLoader = new import_dataloader.default(async (src) => {
      return await Promise.all(src.map(async (v) => {
        const cached = await this.shardTransactionsCache.get(v);
        if (cached) {
          return cached;
        }
        let loaded = await this.doCall("getBlockTransactions", { workchain: v.workchain, seqno: v.seqno, shard: v.shard }, getBlockTransactions);
        await this.shardTransactionsCache.set(v, loaded);
        return loaded;
      }));
    }, { cacheKeyFn: (src) => src.workchain + ":" + src.shard + ":" + src.seqno });
  }
  getAddressInformation(address2) {
    return this.doCall("getAddressInformation", { address: address2.toString() }, addressInformation);
  }
  async getTransactions(address2, opts) {
    const inclusive = opts.inclusive;
    delete opts.inclusive;
    let hash = void 0;
    if (opts.hash) {
      hash = Buffer.from(opts.hash, "base64").toString("hex");
    }
    let limit = opts.limit;
    if (opts.hash && opts.lt && inclusive !== true) {
      limit++;
    }
    let res = await this.doCall("getTransactions", { address: address2.toString(), ...opts, limit, hash }, getTransactions);
    if (res.length > limit) {
      res = res.slice(0, limit);
    }
    if (opts.hash && opts.lt && inclusive !== true) {
      res.shift();
      return res;
    } else {
      return res;
    }
  }
  async getMasterchainInfo() {
    return await this.doCall("getMasterchainInfo", {}, getMasterchain);
  }
  async getShards(seqno) {
    return await this.shardLoader.load(seqno);
  }
  async getBlockTransactions(workchain, seqno, shard) {
    return await this.shardTransactionsLoader.load({ workchain, seqno, shard });
  }
  async getTransaction(address2, lt, hash) {
    let convHash = Buffer.from(hash, "base64").toString("hex");
    let res = await this.doCall("getTransactions", { address: address2.toString(), lt, hash: convHash, limit: 1 }, getTransactions);
    let ex = res.find((v) => v.transaction_id.lt === lt && v.transaction_id.hash === hash);
    if (ex) {
      return ex;
    } else {
      return null;
    }
  }
  async callGetMethod(address2, method, stack) {
    return await this.doCall("runGetMethod", { address: address2.toString(), method, stack: serializeStack(stack) }, callGetMethod);
  }
  async sendBoc(body) {
    await this.doCall("sendBoc", { boc: body.toString("base64") }, bocResponse);
  }
  async estimateFee(address2, args) {
    return await this.doCall("estimateFee", {
      address: address2.toString(),
      body: args.body.toBoc().toString("base64"),
      "init_data": args.initData ? args.initData.toBoc().toString("base64") : "",
      "init_code": args.initCode ? args.initCode.toBoc().toString("base64") : "",
      ignore_chksig: args.ignoreSignature
    }, feeResponse);
  }
  async tryLocateResultTx(source, destination, created_lt) {
    return await this.doCall("tryLocateResultTx", { source: source.toString(), destination: destination.toString(), created_lt }, transaction);
  }
  async tryLocateSourceTx(source, destination, created_lt) {
    return await this.doCall("tryLocateSourceTx", { source: source.toString(), destination: destination.toString(), created_lt }, transaction);
  }
  async doCall(method, body, codec) {
    let headers = {
      "Content-Type": "application/json",
      "X-Ton-Client-Version": version
    };
    if (this.parameters.apiKey) {
      headers["X-API-Key"] = this.parameters.apiKey;
    }
    let res = await axios_default.post(this.endpoint, JSON.stringify({
      id: "1",
      jsonrpc: "2.0",
      method,
      params: body
    }), {
      headers,
      timeout: this.parameters.timeout,
      adapter: this.parameters.adapter
    });
    if (res.status !== 200 || !res.data.ok) {
      throw Error("Received error: " + JSON.stringify(res.data));
    }
    let decoded = codec.safeParse(res.data.result);
    if (decoded.success) {
      return decoded.data;
    } else {
      if ("error" in decoded) {
        throw Error("Malformed response: " + decoded.error.format()._errors.join(", "));
      } else {
        throw Error("Malformed response: ");
      }
    }
  }
};
function serializeStack(src) {
  let stack = [];
  for (let s of src) {
    if (s.type === "int") {
      stack.push(["num", s.value.toString()]);
    } else if (s.type === "cell") {
      stack.push(["tvm.Cell", s.cell.toBoc().toString("base64")]);
    } else if (s.type === "slice") {
      stack.push(["tvm.Slice", s.cell.toBoc().toString("base64")]);
    } else if (s.type === "builder") {
      stack.push(["tvm.Builder", s.cell.toBoc().toString("base64")]);
    } else {
      throw Error("Unsupported stack item type: " + s.type);
    }
  }
  return stack;
}

// src/client/TonClient.ts
init_buffer_shim();
var import_core = __toModule(require("@ijstech/ton-core"));
var TonClient = class {
  constructor(parameters) {
    this.parameters = {
      endpoint: parameters.endpoint
    };
    this.api = new HttpApi(this.parameters.endpoint, {
      timeout: parameters.timeout,
      apiKey: parameters.apiKey,
      adapter: parameters.httpAdapter
    });
  }
  async getBalance(address2) {
    return (await this.getContractState(address2)).balance;
  }
  async runMethod(address2, name, stack = []) {
    let res = await this.api.callGetMethod(address2, name, stack);
    if (res.exit_code !== 0) {
      throw Error("Unable to execute get method. Got exit_code: " + res.exit_code);
    }
    return { gas_used: res.gas_used, stack: parseStack(res.stack) };
  }
  async callGetMethod(address2, name, stack = []) {
    return this.runMethod(address2, name, stack);
  }
  async runMethodWithError(address2, name, params = []) {
    let res = await this.api.callGetMethod(address2, name, params);
    return { gas_used: res.gas_used, stack: parseStack(res.stack), exit_code: res.exit_code };
  }
  async callGetMethodWithError(address2, name, stack = []) {
    return this.runMethodWithError(address2, name, stack);
  }
  async getTransactions(address2, opts) {
    let tx = await this.api.getTransactions(address2, opts);
    let res = [];
    for (let r of tx) {
      res.push((0, import_core.loadTransaction)(import_core.Cell.fromBoc(Buffer.from(r.data, "base64"))[0].beginParse()));
    }
    return res;
  }
  async getTransaction(address2, lt, hash) {
    let res = await this.api.getTransaction(address2, lt, hash);
    if (res) {
      return (0, import_core.loadTransaction)(import_core.Cell.fromBoc(Buffer.from(res.data, "base64"))[0].beginParse());
    } else {
      return null;
    }
  }
  async tryLocateResultTx(source, destination, created_lt) {
    let res = await this.api.tryLocateResultTx(source, destination, created_lt);
    return (0, import_core.loadTransaction)(import_core.Cell.fromBase64(res.data).beginParse());
  }
  async tryLocateSourceTx(source, destination, created_lt) {
    let res = await this.api.tryLocateSourceTx(source, destination, created_lt);
    return (0, import_core.loadTransaction)(import_core.Cell.fromBase64(res.data).beginParse());
  }
  async getMasterchainInfo() {
    let r = await this.api.getMasterchainInfo();
    return {
      workchain: r.init.workchain,
      shard: r.last.shard,
      initSeqno: r.init.seqno,
      latestSeqno: r.last.seqno
    };
  }
  async getWorkchainShards(seqno) {
    let r = await this.api.getShards(seqno);
    return r.map((m) => ({
      workchain: m.workchain,
      shard: m.shard,
      seqno: m.seqno
    }));
  }
  async getShardTransactions(workchain, seqno, shard) {
    let tx = await this.api.getBlockTransactions(workchain, seqno, shard);
    if (tx.incomplete) {
      throw Error("Unsupported");
    }
    return tx.transactions.map((v) => ({
      account: import_core.Address.parseRaw(v.account),
      lt: v.lt,
      hash: v.hash
    }));
  }
  async sendMessage(src) {
    const boc = (0, import_core.beginCell)().store((0, import_core.storeMessage)(src)).endCell().toBoc();
    await this.api.sendBoc(boc);
  }
  async sendFile(src) {
    await this.api.sendBoc(src);
  }
  async estimateExternalMessageFee(address2, args) {
    return await this.api.estimateFee(address2, { body: args.body, initCode: args.initCode, initData: args.initData, ignoreSignature: args.ignoreSignature });
  }
  async sendExternalMessage(contract, src) {
    if (await this.isContractDeployed(contract.address) || !contract.init) {
      const message2 = (0, import_core.external)({
        to: contract.address,
        body: src
      });
      await this.sendMessage(message2);
    } else {
      const message2 = (0, import_core.external)({
        to: contract.address,
        init: contract.init,
        body: src
      });
      await this.sendMessage(message2);
    }
  }
  async isContractDeployed(address2) {
    return (await this.getContractState(address2)).state === "active";
  }
  async getContractState(address2) {
    let info = await this.api.getAddressInformation(address2);
    let balance = BigInt(info.balance);
    let state = info.state;
    return {
      balance,
      extra_currencies: info.extra_currencies,
      state,
      code: info.code !== "" ? Buffer.from(info.code, "base64") : null,
      data: info.data !== "" ? Buffer.from(info.data, "base64") : null,
      lastTransaction: info.last_transaction_id.lt !== "0" ? {
        lt: info.last_transaction_id.lt,
        hash: info.last_transaction_id.hash
      } : null,
      blockId: {
        workchain: info.block_id.workchain,
        shard: info.block_id.shard,
        seqno: info.block_id.seqno
      },
      timestampt: info.sync_utime
    };
  }
  open(src) {
    return (0, import_core.openContract)(src, (args) => createProvider(this, args.address, args.init));
  }
  provider(address2, init) {
    return createProvider(this, address2, init ?? null);
  }
};
function parseStackEntry(x) {
  const typeName = x["@type"];
  switch (typeName) {
    case "tvm.list":
    case "tvm.tuple":
      return x.elements.map(parseStackEntry);
    case "tvm.cell":
      return import_core.Cell.fromBoc(Buffer.from(x.bytes, "base64"))[0];
    case "tvm.slice":
      return import_core.Cell.fromBoc(Buffer.from(x.bytes, "base64"))[0];
    case "tvm.stackEntryCell":
      return parseStackEntry(x.cell);
    case "tvm.stackEntrySlice":
      return parseStackEntry(x.slice);
    case "tvm.stackEntryTuple":
      return parseStackEntry(x.tuple);
    case "tvm.stackEntryList":
      return parseStackEntry(x.list);
    case "tvm.stackEntryNumber":
      return parseStackEntry(x.number);
    case "tvm.numberDecimal":
      return BigInt(x.number);
    default:
      throw Error("Unsupported item type: " + typeName);
  }
}
function parseStackItem(s) {
  if (s[0] === "num") {
    let val = s[1];
    if (val.startsWith("-")) {
      return { type: "int", value: -BigInt(val.slice(1)) };
    } else {
      return { type: "int", value: BigInt(val) };
    }
  } else if (s[0] === "null") {
    return { type: "null" };
  } else if (s[0] === "cell") {
    return { type: "cell", cell: import_core.Cell.fromBoc(Buffer.from(s[1].bytes, "base64"))[0] };
  } else if (s[0] === "slice") {
    return { type: "slice", cell: import_core.Cell.fromBoc(Buffer.from(s[1].bytes, "base64"))[0] };
  } else if (s[0] === "builder") {
    return { type: "builder", cell: import_core.Cell.fromBoc(Buffer.from(s[1].bytes, "base64"))[0] };
  } else if (s[0] === "tuple" || s[0] === "list") {
    if (s[1].elements.length === 0) {
      return { type: "null" };
    }
    return { type: "tuple", items: s[1].elements.map(parseStackEntry) };
  } else {
    throw Error("Unsupported stack item type: " + s[0]);
  }
}
function parseStack(src) {
  let stack = [];
  for (let s of src) {
    stack.push(parseStackItem(s));
  }
  return new import_core.TupleReader(stack);
}
function createProvider(client, address2, init) {
  return {
    async getState() {
      let state = await client.getContractState(address2);
      let balance = state.balance;
      let last = state.lastTransaction ? { lt: BigInt(state.lastTransaction.lt), hash: Buffer.from(state.lastTransaction.hash, "base64") } : null;
      let ecMap = null;
      let storage;
      if (state.state === "active") {
        storage = {
          type: "active",
          code: state.code ? state.code : null,
          data: state.data ? state.data : null
        };
      } else if (state.state === "uninitialized") {
        storage = {
          type: "uninit"
        };
      } else if (state.state === "frozen") {
        storage = {
          type: "frozen",
          stateHash: Buffer.alloc(0)
        };
      } else {
        throw Error("Unsupported state");
      }
      if (state.extra_currencies.length > 0) {
        ecMap = {};
        for (let ec of state.extra_currencies) {
          ecMap[ec.id] = BigInt(ec.amount);
        }
      }
      return {
        balance,
        extracurrency: ecMap,
        last,
        state: storage
      };
    },
    async get(name, args) {
      if (typeof name !== "string") {
        throw new Error("Method name must be a string for TonClient provider");
      }
      let method = await client.runMethod(address2, name, args);
      return { stack: method.stack };
    },
    async external(message2) {
      let neededInit = null;
      if (init && !await client.isContractDeployed(address2)) {
        neededInit = init;
      }
      const ext = (0, import_core.external)({
        to: address2,
        init: neededInit,
        body: message2
      });
      let boc = (0, import_core.beginCell)().store((0, import_core.storeMessage)(ext)).endCell().toBoc();
      await client.sendFile(boc);
    },
    async internal(via, message2) {
      let neededInit = null;
      if (init && !await client.isContractDeployed(address2)) {
        neededInit = init;
      }
      let bounce = true;
      if (message2.bounce !== null && message2.bounce !== void 0) {
        bounce = message2.bounce;
      }
      let value;
      if (typeof message2.value === "string") {
        value = (0, import_core.toNano)(message2.value);
      } else {
        value = message2.value;
      }
      let body = null;
      if (typeof message2.body === "string") {
        body = (0, import_core.comment)(message2.body);
      } else if (message2.body) {
        body = message2.body;
      }
      await via.send({
        to: address2,
        value,
        bounce,
        sendMode: message2.sendMode,
        extracurrency: message2.extracurrency,
        init: neededInit,
        body
      });
    },
    open(contract) {
      return (0, import_core.openContract)(contract, (args) => createProvider(client, args.address, args.init ?? null));
    },
    getTransactions(address3, lt, hash, limit) {
      return client.getTransactions(address3, { limit: limit ?? 100, lt: lt.toString(), hash: hash.toString("base64"), inclusive: true });
    }
  };
}

// src/client/TonClient4.ts
init_buffer_shim();
var import_core2 = __toModule(require("@ijstech/ton-core"));

// src/utils/toUrlSafe.ts
init_buffer_shim();
function toUrlSafe(src) {
  while (src.indexOf("/") >= 0) {
    src = src.replace("/", "_");
  }
  while (src.indexOf("+") >= 0) {
    src = src.replace("+", "-");
  }
  while (src.indexOf("=") >= 0) {
    src = src.replace("=", "");
  }
  return src;
}

// src/client/TonClient4.ts
var TonClient4 = class {
  #endpoint;
  #timeout;
  #adapter;
  #axios;
  constructor(args) {
    this.#axios = axios_default.create();
    this.#endpoint = args.endpoint;
    this.#timeout = args.timeout || 5e3;
    this.#adapter = args.httpAdapter;
    if (args.requestInterceptor) {
      this.#axios.interceptors.request.use(args.requestInterceptor);
    }
  }
  async getLastBlock() {
    let res = await this.#axios.get(this.#endpoint + "/block/latest", { adapter: this.#adapter, timeout: this.#timeout });
    let lastBlock = lastBlockCodec.safeParse(res.data);
    if (!lastBlock.success) {
      throw Error("Mailformed response: " + lastBlock.error.format()._errors.join(", "));
    }
    return lastBlock.data;
  }
  async getBlock(seqno) {
    let res = await this.#axios.get(this.#endpoint + "/block/" + seqno, { adapter: this.#adapter, timeout: this.#timeout });
    let block = blockCodec.safeParse(res.data);
    if (!block.success) {
      throw Error("Mailformed response");
    }
    if (!block.data.exist) {
      throw Error("Block is out of scope");
    }
    return block.data.block;
  }
  async getBlockByUtime(ts) {
    let res = await this.#axios.get(this.#endpoint + "/block/utime/" + ts, { adapter: this.#adapter, timeout: this.#timeout });
    let block = blockCodec.safeParse(res.data);
    if (!block.success) {
      throw Error("Mailformed response");
    }
    if (!block.data.exist) {
      throw Error("Block is out of scope");
    }
    return block.data.block;
  }
  async getAccount(seqno, address2) {
    let res = await this.#axios.get(this.#endpoint + "/block/" + seqno + "/" + address2.toString({ urlSafe: true }), { adapter: this.#adapter, timeout: this.#timeout });
    let account = accountCodec.safeParse(res.data);
    if (!account.success) {
      throw Error("Mailformed response");
    }
    return account.data;
  }
  async getAccountLite(seqno, address2) {
    let res = await this.#axios.get(this.#endpoint + "/block/" + seqno + "/" + address2.toString({ urlSafe: true }) + "/lite", { adapter: this.#adapter, timeout: this.#timeout });
    let account = accountLiteCodec.safeParse(res.data);
    if (!account.success) {
      throw Error("Mailformed response");
    }
    return account.data;
  }
  async isContractDeployed(seqno, address2) {
    let account = await this.getAccountLite(seqno, address2);
    return account.account.state.type === "active";
  }
  async isAccountChanged(seqno, address2, lt) {
    let res = await this.#axios.get(this.#endpoint + "/block/" + seqno + "/" + address2.toString({ urlSafe: true }) + "/changed/" + lt.toString(10), { adapter: this.#adapter, timeout: this.#timeout });
    let changed = changedCodec.safeParse(res.data);
    if (!changed.success) {
      throw Error("Mailformed response");
    }
    return changed.data;
  }
  async getAccountTransactions(address2, lt, hash) {
    let res = await this.#axios.get(this.#endpoint + "/account/" + address2.toString({ urlSafe: true }) + "/tx/" + lt.toString(10) + "/" + toUrlSafe(hash.toString("base64")), { adapter: this.#adapter, timeout: this.#timeout });
    let transactions = transactionsCodec.safeParse(res.data);
    if (!transactions.success) {
      throw Error("Mailformed response");
    }
    let data = transactions.data;
    let tx = [];
    let cells = import_core2.Cell.fromBoc(Buffer.from(data.boc, "base64"));
    for (let i = 0; i < data.blocks.length; i++) {
      tx.push({
        block: data.blocks[i],
        tx: (0, import_core2.loadTransaction)(cells[i].beginParse())
      });
    }
    return tx;
  }
  async getAccountTransactionsParsed(address2, lt, hash, count = 20) {
    let res = await this.#axios.get(this.#endpoint + "/account/" + address2.toString({ urlSafe: true }) + "/tx/parsed/" + lt.toString(10) + "/" + toUrlSafe(hash.toString("base64")), {
      adapter: this.#adapter,
      timeout: this.#timeout,
      params: {
        count
      }
    });
    let parsedTransactionsRes = parsedTransactionsCodec.safeParse(res.data);
    if (!parsedTransactionsRes.success) {
      throw Error("Mailformed response");
    }
    return parsedTransactionsRes.data;
  }
  async getConfig(seqno, ids) {
    let tail = "";
    if (ids && ids.length > 0) {
      tail = "/" + [...ids].sort().join(",");
    }
    let res = await this.#axios.get(this.#endpoint + "/block/" + seqno + "/config" + tail, { adapter: this.#adapter, timeout: this.#timeout });
    let config = configCodec.safeParse(res.data);
    if (!config.success) {
      throw Error("Mailformed response");
    }
    return config.data;
  }
  async runMethod(seqno, address2, name, args) {
    let tail = args && args.length > 0 ? "/" + toUrlSafe((0, import_core2.serializeTuple)(args).toBoc({ idx: false, crc32: false }).toString("base64")) : "";
    let url = this.#endpoint + "/block/" + seqno + "/" + address2.toString({ urlSafe: true }) + "/run/" + encodeURIComponent(name) + tail;
    let res = await this.#axios.get(url, { adapter: this.#adapter, timeout: this.#timeout });
    let runMethod = runMethodCodec.safeParse(res.data);
    if (!runMethod.success) {
      throw Error("Mailformed response");
    }
    let resultTuple = runMethod.data.resultRaw ? (0, import_core2.parseTuple)(import_core2.Cell.fromBoc(Buffer.from(runMethod.data.resultRaw, "base64"))[0]) : [];
    return {
      exitCode: runMethod.data.exitCode,
      result: resultTuple,
      resultRaw: runMethod.data.resultRaw,
      block: runMethod.data.block,
      shardBlock: runMethod.data.shardBlock,
      reader: new import_core2.TupleReader(resultTuple)
    };
  }
  async sendMessage(message2) {
    let res = await this.#axios.post(this.#endpoint + "/send", { boc: message2.toString("base64") }, { adapter: this.#adapter, timeout: this.#timeout });
    let send = sendCodec.safeParse(res.data);
    if (!send.success) {
      throw Error("Mailformed response");
    }
    return { status: res.data.status };
  }
  open(contract) {
    return (0, import_core2.openContract)(contract, (args) => createProvider2(this, null, args.address, args.init));
  }
  openAt(block, contract) {
    return (0, import_core2.openContract)(contract, (args) => createProvider2(this, block, args.address, args.init));
  }
  provider(address2, init) {
    return createProvider2(this, null, address2, init ?? null);
  }
  providerAt(block, address2, init) {
    return createProvider2(this, block, address2, init ?? null);
  }
};
function createProvider2(client, block, address2, init) {
  return {
    async getState() {
      let sq = block;
      if (sq === null) {
        let res = await client.getLastBlock();
        sq = res.last.seqno;
      }
      let state = await client.getAccount(sq, address2);
      let last = state.account.last ? { lt: BigInt(state.account.last.lt), hash: Buffer.from(state.account.last.hash, "base64") } : null;
      let storage;
      if (state.account.state.type === "active") {
        storage = {
          type: "active",
          code: state.account.state.code ? Buffer.from(state.account.state.code, "base64") : null,
          data: state.account.state.data ? Buffer.from(state.account.state.data, "base64") : null
        };
      } else if (state.account.state.type === "uninit") {
        storage = {
          type: "uninit"
        };
      } else if (state.account.state.type === "frozen") {
        storage = {
          type: "frozen",
          stateHash: Buffer.from(state.account.state.stateHash, "base64")
        };
      } else {
        throw Error("Unsupported state");
      }
      let ecMap = null;
      if (state.account.balance.currencies) {
        ecMap = {};
        let currencies = state.account.balance.currencies;
        for (let [k, v] of Object.entries(currencies)) {
          ecMap[Number(k)] = BigInt(v);
        }
      }
      return {
        balance: BigInt(state.account.balance.coins),
        extracurrency: ecMap,
        last,
        state: storage
      };
    },
    async get(name, args) {
      if (typeof name !== "string") {
        throw new Error("Method name must be a string for TonClient4 provider");
      }
      let sq = block;
      if (sq === null) {
        let res = await client.getLastBlock();
        sq = res.last.seqno;
      }
      let method = await client.runMethod(sq, address2, name, args);
      if (method.exitCode !== 0 && method.exitCode !== 1) {
        throw Error("Exit code: " + method.exitCode);
      }
      return {
        stack: new import_core2.TupleReader(method.result)
      };
    },
    async external(message2) {
      let last = await client.getLastBlock();
      let neededInit = null;
      if (init && (await client.getAccountLite(last.last.seqno, address2)).account.state.type !== "active") {
        neededInit = init;
      }
      const ext = (0, import_core2.external)({
        to: address2,
        init: neededInit,
        body: message2
      });
      let pkg = (0, import_core2.beginCell)().store((0, import_core2.storeMessage)(ext)).endCell().toBoc();
      await client.sendMessage(pkg);
    },
    async internal(via, message2) {
      let last = await client.getLastBlock();
      let neededInit = null;
      if (init && (await client.getAccountLite(last.last.seqno, address2)).account.state.type !== "active") {
        neededInit = init;
      }
      let bounce = true;
      if (message2.bounce !== null && message2.bounce !== void 0) {
        bounce = message2.bounce;
      }
      let value;
      if (typeof message2.value === "string") {
        value = (0, import_core2.toNano)(message2.value);
      } else {
        value = message2.value;
      }
      let body = null;
      if (typeof message2.body === "string") {
        body = (0, import_core2.comment)(message2.body);
      } else if (message2.body) {
        body = message2.body;
      }
      await via.send({
        to: address2,
        value,
        extracurrency: message2.extracurrency,
        bounce,
        sendMode: message2.sendMode,
        init: neededInit,
        body
      });
    },
    open(contract) {
      return (0, import_core2.openContract)(contract, (args) => createProvider2(client, block, args.address, args.init ?? null));
    },
    async getTransactions(address3, lt, hash, limit) {
      const useLimit = typeof limit === "number";
      if (useLimit && limit <= 0) {
        return [];
      }
      let transactions = [];
      do {
        const txs = await client.getAccountTransactions(address3, lt, hash);
        const firstTx = txs[0].tx;
        const [firstLt, firstHash] = [firstTx.lt, firstTx.hash()];
        const needSkipFirst = transactions.length > 0 && firstLt === lt && firstHash.equals(hash);
        if (needSkipFirst) {
          txs.shift();
        }
        if (txs.length === 0) {
          break;
        }
        const lastTx = txs[txs.length - 1].tx;
        const [lastLt, lastHash] = [lastTx.lt, lastTx.hash()];
        if (lastLt === lt && lastHash.equals(hash)) {
          break;
        }
        transactions.push(...txs.map((tx) => tx.tx));
        lt = lastLt;
        hash = lastHash;
      } while (useLimit && transactions.length < limit);
      if (useLimit) {
        transactions = transactions.slice(0, limit);
      }
      return transactions;
    }
  };
}
var lastBlockCodec = z.object({
  last: z.object({
    seqno: z.number(),
    shard: z.string(),
    workchain: z.number(),
    fileHash: z.string(),
    rootHash: z.string()
  }),
  init: z.object({
    fileHash: z.string(),
    rootHash: z.string()
  }),
  stateRootHash: z.string(),
  now: z.number()
});
var blockCodec = z.union([z.object({
  exist: z.literal(false)
}), z.object({
  exist: z.literal(true),
  block: z.object({
    shards: z.array(z.object({
      workchain: z.number(),
      seqno: z.number(),
      shard: z.string(),
      rootHash: z.string(),
      fileHash: z.string(),
      transactions: z.array(z.object({
        account: z.string(),
        hash: z.string(),
        lt: z.string()
      }))
    }))
  })
})]);
var storageStatCodec = z.object({
  lastPaid: z.number(),
  duePayment: z.union([z.null(), z.string()]),
  used: z.object({
    bits: z.number(),
    cells: z.number(),
    publicCells: z.number()
  })
});
var accountCodec = z.object({
  account: z.object({
    state: z.union([
      z.object({ type: z.literal("uninit") }),
      z.object({ type: z.literal("active"), code: z.union([z.string(), z.null()]), data: z.union([z.string(), z.null()]) }),
      z.object({ type: z.literal("frozen"), stateHash: z.string() })
    ]),
    balance: z.object({
      coins: z.string(),
      currencies: z.record(z.string(), z.string())
    }),
    last: z.union([
      z.null(),
      z.object({
        lt: z.string(),
        hash: z.string()
      })
    ]),
    storageStat: z.union([z.null(), storageStatCodec])
  }),
  block: z.object({
    workchain: z.number(),
    seqno: z.number(),
    shard: z.string(),
    rootHash: z.string(),
    fileHash: z.string()
  })
});
var accountLiteCodec = z.object({
  account: z.object({
    state: z.union([
      z.object({ type: z.literal("uninit") }),
      z.object({ type: z.literal("active"), codeHash: z.string(), dataHash: z.string() }),
      z.object({ type: z.literal("frozen"), stateHash: z.string() })
    ]),
    balance: z.object({
      coins: z.string(),
      currencies: z.record(z.string(), z.string())
    }),
    last: z.union([
      z.null(),
      z.object({
        lt: z.string(),
        hash: z.string()
      })
    ]),
    storageStat: z.union([z.null(), storageStatCodec])
  })
});
var changedCodec = z.object({
  changed: z.boolean(),
  block: z.object({
    workchain: z.number(),
    seqno: z.number(),
    shard: z.string(),
    rootHash: z.string(),
    fileHash: z.string()
  })
});
var runMethodCodec = z.object({
  exitCode: z.number(),
  resultRaw: z.union([z.string(), z.null()]),
  block: z.object({
    workchain: z.number(),
    seqno: z.number(),
    shard: z.string(),
    rootHash: z.string(),
    fileHash: z.string()
  }),
  shardBlock: z.object({
    workchain: z.number(),
    seqno: z.number(),
    shard: z.string(),
    rootHash: z.string(),
    fileHash: z.string()
  })
});
var configCodec = z.object({
  config: z.object({
    cell: z.string(),
    address: z.string(),
    globalBalance: z.object({
      coins: z.string()
    })
  })
});
var sendCodec = z.object({
  status: z.number()
});
var blocksCodec = z.array(z.object({
  workchain: z.number(),
  seqno: z.number(),
  shard: z.string(),
  rootHash: z.string(),
  fileHash: z.string()
}));
var transactionsCodec = z.object({
  blocks: blocksCodec,
  boc: z.string()
});
var parsedAddressExternalCodec = z.object({
  bits: z.number(),
  data: z.string()
});
var parsedMessageInfoCodec = z.union([
  z.object({
    type: z.literal("internal"),
    value: z.string(),
    dest: z.string(),
    src: z.string(),
    bounced: z.boolean(),
    bounce: z.boolean(),
    ihrDisabled: z.boolean(),
    createdAt: z.number(),
    createdLt: z.string(),
    fwdFee: z.string(),
    ihrFee: z.string()
  }),
  z.object({
    type: z.literal("external-in"),
    dest: z.string(),
    src: z.union([parsedAddressExternalCodec, z.null()]),
    importFee: z.string()
  }),
  z.object({
    type: z.literal("external-out"),
    dest: z.union([parsedAddressExternalCodec, z.null()])
  })
]);
var parsedStateInitCodec = z.object({
  splitDepth: z.union([z.number(), z.null()]),
  code: z.union([z.string(), z.null()]),
  data: z.union([z.string(), z.null()]),
  special: z.union([z.object({ tick: z.boolean(), tock: z.boolean() }), z.null()])
});
var parsedMessageCodec = z.object({
  body: z.string(),
  info: parsedMessageInfoCodec,
  init: z.union([parsedStateInitCodec, z.null()])
});
var accountStatusCodec = z.union([z.literal("uninitialized"), z.literal("frozen"), z.literal("active"), z.literal("non-existing")]);
var txBodyCodec = z.union([
  z.object({ type: z.literal("comment"), comment: z.string() }),
  z.object({ type: z.literal("payload"), cell: z.string() })
]);
var parsedOperationItemCodec = z.union([
  z.object({ kind: z.literal("ton"), amount: z.string() }),
  z.object({ kind: z.literal("token"), amount: z.string() })
]);
var supportedMessageTypeCodec = z.union([
  z.literal("jetton::excesses"),
  z.literal("jetton::transfer"),
  z.literal("jetton::transfer_notification"),
  z.literal("deposit"),
  z.literal("deposit::ok"),
  z.literal("withdraw"),
  z.literal("withdraw::all"),
  z.literal("withdraw::delayed"),
  z.literal("withdraw::ok"),
  z.literal("airdrop")
]);
var opCodec = z.object({
  type: supportedMessageTypeCodec,
  options: z.optional(z.record(z.string()))
});
var parsedOperationCodec = z.object({
  address: z.string(),
  comment: z.optional(z.string()),
  items: z.array(parsedOperationItemCodec),
  op: z.optional(opCodec)
});
var parsedTransactionCodec = z.object({
  address: z.string(),
  lt: z.string(),
  hash: z.string(),
  prevTransaction: z.object({
    lt: z.string(),
    hash: z.string()
  }),
  time: z.number(),
  outMessagesCount: z.number(),
  oldStatus: accountStatusCodec,
  newStatus: accountStatusCodec,
  fees: z.string(),
  update: z.object({
    oldHash: z.string(),
    newHash: z.string()
  }),
  inMessage: z.union([parsedMessageCodec, z.null()]),
  outMessages: z.array(parsedMessageCodec),
  parsed: z.object({
    seqno: z.union([z.number(), z.null()]),
    body: z.union([txBodyCodec, z.null()]),
    status: z.union([z.literal("success"), z.literal("failed"), z.literal("pending")]),
    dest: z.union([z.string(), z.null()]),
    kind: z.union([z.literal("out"), z.literal("in")]),
    amount: z.string(),
    resolvedAddress: z.string(),
    bounced: z.boolean(),
    mentioned: z.array(z.string())
  }),
  operation: parsedOperationCodec
});
var parsedTransactionsCodec = z.object({
  blocks: blocksCodec,
  transactions: z.array(parsedTransactionCodec)
});

// src/wallets/WalletContractV1R1.ts
init_buffer_shim();
var import_core10 = __toModule(require("@ijstech/ton-core"));

// src/wallets/signing/createWalletTransfer.ts
init_buffer_shim();
var import_core9 = __toModule(require("@ijstech/ton-core"));
var import_crypto2 = __toModule(require_dist());

// src/wallets/v5beta/WalletContractV5Beta.ts
init_buffer_shim();
var import_core4 = __toModule(require("@ijstech/ton-core"));

// src/wallets/v5beta/WalletV5BetaWalletId.ts
init_buffer_shim();
var import_core3 = __toModule(require("@ijstech/ton-core"));
var walletV5BetaVersionsSerialisation = {
  v5: 0
};
function storeWalletIdV5Beta(walletId) {
  return (builder) => {
    builder.storeInt(walletId.networkGlobalId, 32);
    builder.storeInt(walletId.workchain, 8);
    builder.storeUint(walletV5BetaVersionsSerialisation[walletId.walletVersion], 8);
    builder.storeUint(walletId.subwalletNumber, 32);
  };
}

// src/wallets/v5beta/WalletContractV5Beta.ts
var _WalletContractV5Beta = class {
  constructor(walletId, publicKey) {
    this.walletId = walletId;
    this.publicKey = publicKey;
    this.walletId = walletId;
    let code = import_core4.Cell.fromBoc(Buffer.from("te6cckEBAQEAIwAIQgLkzzsvTG1qYeoPK1RH0mZ4WyavNjfbLe7mvNGqgm80Eg3NjhE=", "base64"))[0];
    let data = (0, import_core4.beginCell)().storeInt(0, 33).store(storeWalletIdV5Beta(this.walletId)).storeBuffer(this.publicKey, 32).storeBit(0).endCell();
    this.init = { code, data };
    this.address = (0, import_core4.contractAddress)(this.walletId.workchain, { code, data });
  }
  static create(args) {
    const walletId = {
      networkGlobalId: args.walletId?.networkGlobalId ?? -239,
      workchain: args?.walletId?.workchain ?? 0,
      subwalletNumber: args?.walletId?.subwalletNumber ?? 0,
      walletVersion: args?.walletId?.walletVersion ?? "v5"
    };
    return new _WalletContractV5Beta(walletId, args.publicKey);
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async getExtensions(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      const result = await provider.get("get_extensions", []);
      return result.stack.readCellOpt();
    } else {
      return null;
    }
  }
  async getExtensionsArray(provider) {
    const extensions = await this.getExtensions(provider);
    if (!extensions) {
      return [];
    }
    const dict = import_core4.Dictionary.loadDirect(import_core4.Dictionary.Keys.BigUint(256), import_core4.Dictionary.Values.BigInt(8), extensions);
    return dict.keys().map((key) => {
      const wc = dict.get(key);
      const addressHex = key ^ wc + 1n;
      return import_core4.Address.parseRaw(`${wc}:${addressHex.toString(16).padStart(64, "0")}`);
    });
  }
  async getIsSecretKeyAuthEnabled(provider) {
    let res = await provider.get("get_is_signature_auth_allowed", []);
    const result = res.stack.readNumber();
    return result !== 0;
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    const transfer = await this.createTransfer(args);
    await this.send(provider, transfer);
  }
  async sendAddExtension(provider, args) {
    const request = await this.createAddExtension(args);
    await this.send(provider, request);
  }
  async sendRemoveExtension(provider, args) {
    const request = await this.createRemoveExtension(args);
    await this.send(provider, request);
  }
  async sendActionsBatch(provider, args) {
    const request = await this.createRequest(args);
    await this.send(provider, request);
  }
  createActions(args) {
    const actions = args.messages.map((message2) => ({ type: "sendMsg", mode: args.sendMode, outMsg: message2 }));
    return actions;
  }
  createTransfer(args) {
    return this.createRequest({
      ...args,
      actions: this.createActions({ messages: args.messages, sendMode: args.sendMode })
    });
  }
  createAddExtension(args) {
    return this.createRequest({
      ...args,
      actions: [{
        type: "addExtension",
        address: args.extensionAddress
      }]
    });
  }
  createRemoveExtension(args) {
    return this.createRequest({
      ...args,
      actions: [{
        type: "removeExtension",
        address: args.extensionAddress
      }]
    });
  }
  createRequest(args) {
    if (args.authType === "extension") {
      return createWalletTransferV5Beta(args);
    }
    return createWalletTransferV5Beta({
      ...args,
      walletId: storeWalletIdV5Beta(this.walletId)
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode ?? import_core4.SendMode.PAY_GAS_SEPARATELY + import_core4.SendMode.IGNORE_ERRORS,
          messages: [(0, import_core4.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};
var WalletContractV5Beta = _WalletContractV5Beta;
WalletContractV5Beta.OpCodes = {
  auth_extension: 1702392942,
  auth_signed_external: 1936287598,
  auth_signed_internal: 1936289396
};

// src/wallets/v5beta/WalletV5BetaActions.ts
init_buffer_shim();
var import_core5 = __toModule(require("@ijstech/ton-core"));

// src/wallets/v5beta/WalletV5OutActions.ts
init_buffer_shim();
function isOutActionExtended(action) {
  return action.type === "setIsPublicKeyEnabled" || action.type === "addExtension" || action.type === "removeExtension";
}
function isOutActionBasic(action) {
  return !isOutActionExtended(action);
}

// src/wallets/v5beta/WalletV5BetaActions.ts
var outActionSetIsPublicKeyEnabledTag = 550222170;
function storeOutActionSetIsPublicKeyEnabled(action) {
  return (builder) => {
    builder.storeUint(outActionSetIsPublicKeyEnabledTag, 32).storeUint(action.isEnabled ? 1 : 0, 1);
  };
}
var outActionAddExtensionTag = 474012575;
function storeOutActionAddExtension(action) {
  return (builder) => {
    builder.storeUint(outActionAddExtensionTag, 32).storeAddress(action.address);
  };
}
var outActionRemoveExtensionTag = 1588524196;
function storeOutActionRemoveExtension(action) {
  return (builder) => {
    builder.storeUint(outActionRemoveExtensionTag, 32).storeAddress(action.address);
  };
}
function storeOutActionExtendedV5Beta(action) {
  switch (action.type) {
    case "setIsPublicKeyEnabled":
      return storeOutActionSetIsPublicKeyEnabled(action);
    case "addExtension":
      return storeOutActionAddExtension(action);
    case "removeExtension":
      return storeOutActionRemoveExtension(action);
    default:
      throw new Error("Unknown action type" + action?.type);
  }
}
function storeOutListExtendedV5Beta(actions) {
  const [action, ...rest] = actions;
  if (!action || !isOutActionExtended(action)) {
    if (actions.some(isOutActionExtended)) {
      throw new Error("Can't serialize actions list: all extended actions must be placed before out actions");
    }
    return (builder) => {
      builder.storeUint(0, 1).storeRef((0, import_core5.beginCell)().store((0, import_core5.storeOutList)(actions)).endCell());
    };
  }
  return (builder) => {
    builder.storeUint(1, 1).store(storeOutActionExtendedV5Beta(action)).storeRef((0, import_core5.beginCell)().store(storeOutListExtendedV5Beta(rest)).endCell());
  };
}

// src/wallets/signing/singer.ts
init_buffer_shim();
var import_crypto = __toModule(require_dist());
function signPayload(args, signingMessage, packMessage) {
  if ("secretKey" in args) {
    return packMessage((0, import_crypto.sign)(signingMessage.endCell().hash(), args.secretKey), signingMessage);
  } else {
    return args.signer(signingMessage.endCell()).then((signature) => packMessage(signature, signingMessage));
  }
}

// src/wallets/v5r1/WalletContractV5R1.ts
init_buffer_shim();
var import_core7 = __toModule(require("@ijstech/ton-core"));

// src/wallets/v5r1/WalletV5R1WalletId.ts
init_buffer_shim();
var import_core6 = __toModule(require("@ijstech/ton-core"));
function isWalletIdV5R1ClientContext(context) {
  return typeof context !== "number";
}
var walletV5R1VersionsSerialisation = {
  v5r1: 0
};
function storeWalletIdV5R1(walletId) {
  return (builder) => {
    let context;
    if (isWalletIdV5R1ClientContext(walletId.context)) {
      context = (0, import_core6.beginCell)().storeUint(1, 1).storeInt(walletId.context.workchain, 8).storeUint(walletV5R1VersionsSerialisation[walletId.context.walletVersion], 8).storeUint(walletId.context.subwalletNumber, 15).endCell().beginParse().loadInt(32);
    } else {
      context = (0, import_core6.beginCell)().storeUint(0, 1).storeUint(walletId.context, 31).endCell().beginParse().loadInt(32);
    }
    return builder.storeInt(BigInt(walletId.networkGlobalId) ^ BigInt(context), 32);
  };
}

// src/wallets/v5r1/WalletContractV5R1.ts
var _WalletContractV5R1 = class {
  constructor(workchain, publicKey, walletId) {
    this.publicKey = publicKey;
    this.walletId = walletId;
    this.walletId = walletId;
    let code = import_core7.Cell.fromBoc(Buffer.from("b5ee9c7241021401000281000114ff00f4a413f4bcf2c80b01020120020d020148030402dcd020d749c120915b8f6320d70b1f2082106578746ebd21821073696e74bdb0925f03e082106578746eba8eb48020d72101d074d721fa4030fa44f828fa443058bd915be0ed44d0810141d721f4058307f40e6fa1319130e18040d721707fdb3ce03120d749810280b99130e070e2100f020120050c020120060902016e07080019adce76a2684020eb90eb85ffc00019af1df6a2684010eb90eb858fc00201480a0b0017b325fb51341c75c875c2c7e00011b262fb513435c280200019be5f0f6a2684080a0eb90fa02c0102f20e011e20d70b1f82107369676ebaf2e08a7f0f01e68ef0eda2edfb218308d722028308d723208020d721d31fd31fd31fed44d0d200d31f20d31fd3ffd70a000af90140ccf9109a28945f0adb31e1f2c087df02b35007b0f2d0845125baf2e0855036baf2e086f823bbf2d0882292f800de01a47fc8ca00cb1f01cf16c9ed542092f80fde70db3cd81003f6eda2edfb02f404216e926c218e4c0221d73930709421c700b38e2d01d72820761e436c20d749c008f2e09320d74ac002f2e09320d71d06c712c2005230b0f2d089d74cd7393001a4e86c128407bbf2e093d74ac000f2e093ed55e2d20001c000915be0ebd72c08142091709601d72c081c12e25210b1e30f20d74a111213009601fa4001fa44f828fa443058baf2e091ed44d0810141d718f405049d7fc8ca0040048307f453f2e08b8e14038307f45bf2e08c22d70a00216e01b3b0f2d090e2c85003cf1612f400c9ed54007230d72c08248e2d21f2e092d200ed44d0d2005113baf2d08f54503091319c01810140d721d70a00f2e08ee2c8ca0058cf16c9ed5493f2c08de20010935bdb31e1d74cd0b4d6c35e", "hex"))[0];
    let data = (0, import_core7.beginCell)().storeUint(1, 1).storeUint(0, 32).store(storeWalletIdV5R1(this.walletId)).storeBuffer(this.publicKey, 32).storeBit(0).endCell();
    this.init = { code, data };
    this.address = (0, import_core7.contractAddress)(workchain, { code, data });
  }
  static create(args) {
    let workchain = 0;
    if ("workchain" in args && args.workchain != void 0) {
      workchain = args.workchain;
    }
    if (args.walletId?.context && isWalletIdV5R1ClientContext(args.walletId.context) && args.walletId.context.workchain != void 0) {
      workchain = args.walletId.context.workchain;
    }
    return new _WalletContractV5R1(workchain, args.publicKey, {
      networkGlobalId: args.walletId?.networkGlobalId ?? -239,
      context: args.walletId?.context ?? {
        workchain: 0,
        walletVersion: "v5r1",
        subwalletNumber: 0
      }
    });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async getExtensions(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      const result = await provider.get("get_extensions", []);
      return result.stack.readCellOpt();
    } else {
      return null;
    }
  }
  async getExtensionsArray(provider) {
    const extensions = await this.getExtensions(provider);
    if (!extensions) {
      return [];
    }
    const dict = import_core7.Dictionary.loadDirect(import_core7.Dictionary.Keys.BigUint(256), import_core7.Dictionary.Values.BigInt(1), extensions);
    return dict.keys().map((addressHex) => {
      const wc = this.address.workChain;
      return import_core7.Address.parseRaw(`${wc}:${addressHex.toString(16).padStart(64, "0")}`);
    });
  }
  async getIsSecretKeyAuthEnabled(provider) {
    let res = await provider.get("is_signature_allowed", []);
    return res.stack.readBoolean();
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    const transfer = await this.createTransfer(args);
    await this.send(provider, transfer);
  }
  async sendAddExtension(provider, args) {
    const request = await this.createAddExtension(args);
    await this.send(provider, request);
  }
  async sendRemoveExtension(provider, args) {
    const request = await this.createRemoveExtension(args);
    await this.send(provider, request);
  }
  createActions(args) {
    const actions = args.messages.map((message2) => ({ type: "sendMsg", mode: args.sendMode, outMsg: message2 }));
    return actions;
  }
  createTransfer(args) {
    return this.createRequest({
      actions: this.createActions({ messages: args.messages, sendMode: args.sendMode }),
      ...args
    });
  }
  createAddExtension(args) {
    return this.createRequest({
      actions: [{
        type: "addExtension",
        address: args.extensionAddress
      }],
      ...args
    });
  }
  createRemoveExtension(args) {
    return this.createRequest({
      actions: [{
        type: "removeExtension",
        address: args.extensionAddress
      }],
      ...args
    });
  }
  createRequest(args) {
    if (args.authType === "extension") {
      return createWalletTransferV5R1(args);
    }
    return createWalletTransferV5R1({
      ...args,
      walletId: storeWalletIdV5R1(this.walletId)
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode ?? import_core7.SendMode.PAY_GAS_SEPARATELY + import_core7.SendMode.IGNORE_ERRORS,
          messages: [(0, import_core7.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};
var WalletContractV5R1 = _WalletContractV5R1;
WalletContractV5R1.OpCodes = {
  auth_extension: 1702392942,
  auth_signed_external: 1936287598,
  auth_signed_internal: 1936289396
};

// src/wallets/v5r1/WalletV5R1Actions.ts
init_buffer_shim();
var import_core8 = __toModule(require("@ijstech/ton-core"));
var outActionSetIsPublicKeyEnabledTag2 = 4;
function storeOutActionSetIsPublicKeyEnabled2(action) {
  return (builder) => {
    builder.storeUint(outActionSetIsPublicKeyEnabledTag2, 8).storeUint(action.isEnabled ? 1 : 0, 1);
  };
}
var outActionAddExtensionTag2 = 2;
function storeOutActionAddExtension2(action) {
  return (builder) => {
    builder.storeUint(outActionAddExtensionTag2, 8).storeAddress(action.address);
  };
}
var outActionRemoveExtensionTag2 = 3;
function storeOutActionRemoveExtension2(action) {
  return (builder) => {
    builder.storeUint(outActionRemoveExtensionTag2, 8).storeAddress(action.address);
  };
}
function storeOutActionExtendedV5R1(action) {
  switch (action.type) {
    case "setIsPublicKeyEnabled":
      return storeOutActionSetIsPublicKeyEnabled2(action);
    case "addExtension":
      return storeOutActionAddExtension2(action);
    case "removeExtension":
      return storeOutActionRemoveExtension2(action);
    default:
      throw new Error("Unknown action type" + action?.type);
  }
}
function storeOutListExtendedV5R1(actions) {
  const extendedActions = actions.filter(isOutActionExtended);
  const basicActions = actions.filter(isOutActionBasic);
  return (builder) => {
    const outListPacked = basicActions.length ? (0, import_core8.beginCell)().store((0, import_core8.storeOutList)(basicActions.slice().reverse())) : null;
    builder.storeMaybeRef(outListPacked);
    if (extendedActions.length === 0) {
      builder.storeUint(0, 1);
    } else {
      const [first, ...rest] = extendedActions;
      builder.storeUint(1, 1).store(storeOutActionExtendedV5R1(first));
      if (rest.length > 0) {
        builder.storeRef(packExtendedActionsRec(rest));
      }
    }
  };
}
function packExtendedActionsRec(extendedActions) {
  const [first, ...rest] = extendedActions;
  let builder = (0, import_core8.beginCell)().store(storeOutActionExtendedV5R1(first));
  if (rest.length > 0) {
    builder = builder.storeRef(packExtendedActionsRec(rest));
  }
  return builder.endCell();
}
function toSafeV5R1SendMode(sendMode, authType) {
  if (authType === "internal" || authType === "extension") {
    return sendMode;
  }
  return sendMode | import_core8.SendMode.IGNORE_ERRORS;
}
function patchV5R1ActionsSendMode(actions, authType) {
  return actions.map((action) => action.type === "sendMsg" ? {
    ...action,
    mode: toSafeV5R1SendMode(action.mode, authType)
  } : action);
}

// src/wallets/signing/createWalletTransfer.ts
function packSignatureToFront(signature, signingMessage) {
  const body = (0, import_core9.beginCell)().storeBuffer(signature).storeBuilder(signingMessage).endCell();
  return body;
}
function packSignatureToTail(signature, signingMessage) {
  const body = (0, import_core9.beginCell)().storeBuilder(signingMessage).storeBuffer(signature).endCell();
  return body;
}
function createWalletTransferV1(args) {
  let signingMessage = (0, import_core9.beginCell)().storeUint(args.seqno, 32);
  if (args.message) {
    signingMessage.storeUint(args.sendMode, 8);
    signingMessage.storeRef((0, import_core9.beginCell)().store((0, import_core9.storeMessageRelaxed)(args.message)));
  }
  let signature = (0, import_crypto2.sign)(signingMessage.endCell().hash(), args.secretKey);
  const body = (0, import_core9.beginCell)().storeBuffer(signature).storeBuilder(signingMessage).endCell();
  return body;
}
function createWalletTransferV2(args) {
  if (args.messages.length > 4) {
    throw Error("Maximum number of messages in a single transfer is 4");
  }
  let signingMessage = (0, import_core9.beginCell)().storeUint(args.seqno, 32);
  if (args.seqno === 0) {
    for (let i = 0; i < 32; i++) {
      signingMessage.storeBit(1);
    }
  } else {
    signingMessage.storeUint(args.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
  }
  for (let m of args.messages) {
    signingMessage.storeUint(args.sendMode, 8);
    signingMessage.storeRef((0, import_core9.beginCell)().store((0, import_core9.storeMessageRelaxed)(m)));
  }
  let signature = (0, import_crypto2.sign)(signingMessage.endCell().hash(), args.secretKey);
  const body = (0, import_core9.beginCell)().storeBuffer(signature).storeBuilder(signingMessage).endCell();
  return body;
}
function createWalletTransferV3(args) {
  if (args.messages.length > 4) {
    throw Error("Maximum number of messages in a single transfer is 4");
  }
  let signingMessage = (0, import_core9.beginCell)().storeUint(args.walletId, 32);
  if (args.seqno === 0) {
    for (let i = 0; i < 32; i++) {
      signingMessage.storeBit(1);
    }
  } else {
    signingMessage.storeUint(args.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
  }
  signingMessage.storeUint(args.seqno, 32);
  for (let m of args.messages) {
    signingMessage.storeUint(args.sendMode, 8);
    signingMessage.storeRef((0, import_core9.beginCell)().store((0, import_core9.storeMessageRelaxed)(m)));
  }
  return signPayload(args, signingMessage, packSignatureToFront);
}
function createWalletTransferV4(args) {
  if (args.messages.length > 4) {
    throw Error("Maximum number of messages in a single transfer is 4");
  }
  let signingMessage = (0, import_core9.beginCell)().storeUint(args.walletId, 32);
  if (args.seqno === 0) {
    for (let i = 0; i < 32; i++) {
      signingMessage.storeBit(1);
    }
  } else {
    signingMessage.storeUint(args.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
  }
  signingMessage.storeUint(args.seqno, 32);
  signingMessage.storeUint(0, 8);
  for (let m of args.messages) {
    signingMessage.storeUint(args.sendMode, 8);
    signingMessage.storeRef((0, import_core9.beginCell)().store((0, import_core9.storeMessageRelaxed)(m)));
  }
  return signPayload(args, signingMessage, packSignatureToFront);
}
function createWalletTransferV5Beta(args) {
  if (args.actions.length > 255) {
    throw Error("Maximum number of OutActions in a single request is 255");
  }
  if (args.authType === "extension") {
    return (0, import_core9.beginCell)().storeUint(WalletContractV5Beta.OpCodes.auth_extension, 32).store(storeOutListExtendedV5Beta(args.actions)).endCell();
  }
  const signingMessage = (0, import_core9.beginCell)().storeUint(args.authType === "internal" ? WalletContractV5Beta.OpCodes.auth_signed_internal : WalletContractV5Beta.OpCodes.auth_signed_external, 32).store(args.walletId);
  if (args.seqno === 0) {
    for (let i = 0; i < 32; i++) {
      signingMessage.storeBit(1);
    }
  } else {
    signingMessage.storeUint(args.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
  }
  signingMessage.storeUint(args.seqno, 32).store(storeOutListExtendedV5Beta(args.actions));
  return signPayload(args, signingMessage, packSignatureToTail);
}
function createWalletTransferV5R1(args) {
  if (args.actions.length > 255) {
    throw Error("Maximum number of OutActions in a single request is 255");
  }
  args = { ...args };
  if (args.authType === "extension") {
    return (0, import_core9.beginCell)().storeUint(WalletContractV5R1.OpCodes.auth_extension, 32).storeUint(args.queryId ?? 0, 64).store(storeOutListExtendedV5R1(args.actions)).endCell();
  }
  args.actions = patchV5R1ActionsSendMode(args.actions, args.authType);
  const signingMessage = (0, import_core9.beginCell)().storeUint(args.authType === "internal" ? WalletContractV5R1.OpCodes.auth_signed_internal : WalletContractV5R1.OpCodes.auth_signed_external, 32).store(args.walletId);
  if (args.seqno === 0) {
    for (let i = 0; i < 32; i++) {
      signingMessage.storeBit(1);
    }
  } else {
    signingMessage.storeUint(args.timeout || Math.floor(Date.now() / 1e3) + 60, 32);
  }
  signingMessage.storeUint(args.seqno, 32).store(storeOutListExtendedV5R1(args.actions));
  return signPayload(args, signingMessage, packSignatureToTail);
}

// src/wallets/WalletContractV1R1.ts
var WalletContractV1R1 = class {
  static create(args) {
    return new WalletContractV1R1(args.workchain, args.publicKey);
  }
  constructor(workchain, publicKey) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    let code = import_core10.Cell.fromBoc(Buffer.from("te6cckEBAQEARAAAhP8AIN2k8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVEH98Ik=", "base64"))[0];
    let data = (0, import_core10.beginCell)().storeUint(0, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core10.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      return import_core10.Cell.fromBoc(state.state.data)[0].beginParse().loadUint(32);
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    let sendMode = import_core10.SendMode.PAY_GAS_SEPARATELY;
    if (args.sendMode !== null && args.sendMode !== void 0) {
      sendMode = args.sendMode;
    }
    return createWalletTransferV1({
      seqno: args.seqno,
      sendMode,
      secretKey: args.secretKey,
      message: args.message
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          message: (0, import_core10.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV1R2.ts
init_buffer_shim();
var import_core11 = __toModule(require("@ijstech/ton-core"));
var WalletContractV1R2 = class {
  static create(args) {
    return new WalletContractV1R2(args.workchain, args.publicKey);
  }
  constructor(workchain, publicKey) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    let code = import_core11.Cell.fromBoc(Buffer.from("te6cckEBAQEAUwAAov8AIN0gggFMl7qXMO1E0NcLH+Ck8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVNDieG8=", "base64"))[0];
    let data = (0, import_core11.beginCell)().storeUint(0, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core11.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    let sendMode = import_core11.SendMode.PAY_GAS_SEPARATELY;
    if (args.sendMode !== null && args.sendMode !== void 0) {
      sendMode = args.sendMode;
    }
    return createWalletTransferV1({
      seqno: args.seqno,
      sendMode,
      secretKey: args.secretKey,
      message: args.message
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          message: (0, import_core11.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV1R3.ts
init_buffer_shim();
var import_core12 = __toModule(require("@ijstech/ton-core"));
var WalletContractV1R3 = class {
  static create(args) {
    return new WalletContractV1R3(args.workchain, args.publicKey);
  }
  constructor(workchain, publicKey) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    let code = import_core12.Cell.fromBoc(Buffer.from("te6cckEBAQEAXwAAuv8AIN0gggFMl7ohggEznLqxnHGw7UTQ0x/XC//jBOCk8mCBAgDXGCDXCx/tRNDTH9P/0VESuvKhIvkBVBBE+RDyovgAAdMfMSDXSpbTB9QC+wDe0aTIyx/L/8ntVLW4bkI=", "base64"))[0];
    let data = (0, import_core12.beginCell)().storeUint(0, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core12.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(executor, message2) {
    await executor.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    let sendMode = import_core12.SendMode.PAY_GAS_SEPARATELY;
    if (args.sendMode !== null && args.sendMode !== void 0) {
      sendMode = args.sendMode;
    }
    return createWalletTransferV1({
      seqno: args.seqno,
      sendMode,
      secretKey: args.secretKey,
      message: args.message
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          message: (0, import_core12.internal)({
            to: args.to,
            value: args.value,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV2R1.ts
init_buffer_shim();
var import_core13 = __toModule(require("@ijstech/ton-core"));
var WalletContractV2R1 = class {
  static create(args) {
    return new WalletContractV2R1(args.workchain, args.publicKey);
  }
  constructor(workchain, publicKey) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    let code = import_core13.Cell.fromBoc(Buffer.from("te6cckEBAQEAVwAAqv8AIN0gggFMl7qXMO1E0NcLH+Ck8mCDCNcYINMf0x8B+CO78mPtRNDTH9P/0VExuvKhA/kBVBBC+RDyovgAApMg10qW0wfUAvsA6NGkyMsfy//J7VShNwu2", "base64"))[0];
    let data = (0, import_core13.beginCell)().storeUint(0, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core13.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    let sendMode = import_core13.SendMode.PAY_GAS_SEPARATELY;
    if (args.sendMode !== null && args.sendMode !== void 0) {
      sendMode = args.sendMode;
    }
    return createWalletTransferV2({
      seqno: args.seqno,
      sendMode,
      secretKey: args.secretKey,
      messages: args.messages,
      timeout: args.timeout
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          messages: [(0, import_core13.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV2R2.ts
init_buffer_shim();
var import_core14 = __toModule(require("@ijstech/ton-core"));
var WalletContractV2R2 = class {
  static create(args) {
    return new WalletContractV2R2(args.workchain, args.publicKey);
  }
  constructor(workchain, publicKey) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    let code = import_core14.Cell.fromBoc(Buffer.from("te6cckEBAQEAYwAAwv8AIN0gggFMl7ohggEznLqxnHGw7UTQ0x/XC//jBOCk8mCDCNcYINMf0x8B+CO78mPtRNDTH9P/0VExuvKhA/kBVBBC+RDyovgAApMg10qW0wfUAvsA6NGkyMsfy//J7VQETNeh", "base64"))[0];
    let data = (0, import_core14.beginCell)().storeUint(0, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core14.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    let sendMode = import_core14.SendMode.PAY_GAS_SEPARATELY;
    if (args.sendMode !== null && args.sendMode !== void 0) {
      sendMode = args.sendMode;
    }
    return createWalletTransferV2({
      seqno: args.seqno,
      sendMode,
      secretKey: args.secretKey,
      messages: args.messages,
      timeout: args.timeout
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          messages: [(0, import_core14.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV3R1.ts
init_buffer_shim();
var import_core15 = __toModule(require("@ijstech/ton-core"));
var WalletContractV3R1 = class {
  static create(args) {
    return new WalletContractV3R1(args.workchain, args.publicKey, args.walletId);
  }
  constructor(workchain, publicKey, walletId) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    if (walletId !== null && walletId !== void 0) {
      this.walletId = walletId;
    } else {
      this.walletId = 698983191 + workchain;
    }
    let code = import_core15.Cell.fromBoc(Buffer.from("te6cckEBAQEAYgAAwP8AIN0gggFMl7qXMO1E0NcLH+Ck8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVD++buA=", "base64"))[0];
    let data = (0, import_core15.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core15.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    return createWalletTransferV3({
      ...args,
      sendMode: args.sendMode ?? import_core15.SendMode.PAY_GAS_SEPARATELY,
      walletId: this.walletId
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          messages: [(0, import_core15.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV3R2.ts
init_buffer_shim();
var import_core16 = __toModule(require("@ijstech/ton-core"));
var WalletContractV3R2 = class {
  static create(args) {
    return new WalletContractV3R2(args.workchain, args.publicKey, args.walletId);
  }
  constructor(workchain, publicKey, walletId) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    if (walletId !== null && walletId !== void 0) {
      this.walletId = walletId;
    } else {
      this.walletId = 698983191 + workchain;
    }
    let code = import_core16.Cell.fromBoc(Buffer.from("te6cckEBAQEAcQAA3v8AIN0gggFMl7ohggEznLqxn3Gw7UTQ0x/THzHXC//jBOCk8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVBC9ba0=", "base64"))[0];
    let data = (0, import_core16.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(publicKey).endCell();
    this.init = { code, data };
    this.address = (0, import_core16.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    return createWalletTransferV3({
      ...args,
      sendMode: args.sendMode ?? import_core16.SendMode.PAY_GAS_SEPARATELY,
      walletId: this.walletId
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          messages: [(0, import_core16.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV4.ts
init_buffer_shim();
var import_core17 = __toModule(require("@ijstech/ton-core"));
var WalletContractV4 = class {
  static create(args) {
    return new WalletContractV4(args.workchain, args.publicKey, args.walletId);
  }
  constructor(workchain, publicKey, walletId) {
    this.workchain = workchain;
    this.publicKey = publicKey;
    if (walletId !== null && walletId !== void 0) {
      this.walletId = walletId;
    } else {
      this.walletId = 698983191 + workchain;
    }
    let code = import_core17.Cell.fromBoc(Buffer.from("te6ccgECFAEAAtQAART/APSkE/S88sgLAQIBIAIDAgFIBAUE+PKDCNcYINMf0x/THwL4I7vyZO1E0NMf0x/T//QE0VFDuvKhUVG68qIF+QFUEGT5EPKj+AAkpMjLH1JAyx9SMMv/UhD0AMntVPgPAdMHIcAAn2xRkyDXSpbTB9QC+wDoMOAhwAHjACHAAuMAAcADkTDjDQOkyMsfEssfy/8QERITAubQAdDTAyFxsJJfBOAi10nBIJJfBOAC0x8hghBwbHVnvSKCEGRzdHK9sJJfBeAD+kAwIPpEAcjKB8v/ydDtRNCBAUDXIfQEMFyBAQj0Cm+hMbOSXwfgBdM/yCWCEHBsdWe6kjgw4w0DghBkc3RyupJfBuMNBgcCASAICQB4AfoA9AQw+CdvIjBQCqEhvvLgUIIQcGx1Z4MesXCAGFAEywUmzxZY+gIZ9ADLaRfLH1Jgyz8gyYBA+wAGAIpQBIEBCPRZMO1E0IEBQNcgyAHPFvQAye1UAXKwjiOCEGRzdHKDHrFwgBhQBcsFUAPPFiP6AhPLassfyz/JgED7AJJfA+ICASAKCwBZvSQrb2omhAgKBrkPoCGEcNQICEekk30pkQzmkD6f+YN4EoAbeBAUiYcVnzGEAgFYDA0AEbjJftRNDXCx+AA9sp37UTQgQFA1yH0BDACyMoHy//J0AGBAQj0Cm+hMYAIBIA4PABmtznaiaEAga5Drhf/AABmvHfaiaEAQa5DrhY/AAG7SB/oA1NQi+QAFyMoHFcv/ydB3dIAYyMsFywIizxZQBfoCFMtrEszMyXP7AMhAFIEBCPRR8qcCAHCBAQjXGPoA0z/IVCBHgQEI9FHyp4IQbm90ZXB0gBjIywXLAlAGzxZQBPoCFMtqEssfyz/Jc/sAAgBsgQEI1xj6ANM/MFIkgQEI9Fnyp4IQZHN0cnB0gBjIywXLAlAFzxZQA/oCE8tqyx8Syz/Jc/sAAAr0AMntVA==", "base64"))[0];
    let data = (0, import_core17.beginCell)().storeUint(0, 32).storeUint(this.walletId, 32).storeBuffer(this.publicKey).storeBit(0).endCell();
    this.init = { code, data };
    this.address = (0, import_core17.contractAddress)(workchain, { code, data });
  }
  async getBalance(provider) {
    let state = await provider.getState();
    return state.balance;
  }
  async getSeqno(provider) {
    let state = await provider.getState();
    if (state.state.type === "active") {
      let res = await provider.get("seqno", []);
      return res.stack.readNumber();
    } else {
      return 0;
    }
  }
  async send(provider, message2) {
    await provider.external(message2);
  }
  async sendTransfer(provider, args) {
    let transfer = this.createTransfer(args);
    await this.send(provider, transfer);
  }
  createTransfer(args) {
    return createWalletTransferV4({
      ...args,
      sendMode: args.sendMode ?? import_core17.SendMode.PAY_GAS_SEPARATELY,
      walletId: this.walletId
    });
  }
  sender(provider, secretKey) {
    return {
      send: async (args) => {
        let seqno = await this.getSeqno(provider);
        let transfer = this.createTransfer({
          seqno,
          secretKey,
          sendMode: args.sendMode,
          messages: [(0, import_core17.internal)({
            to: args.to,
            value: args.value,
            extracurrency: args.extracurrency,
            init: args.init,
            body: args.body,
            bounce: args.bounce
          })]
        });
        await this.send(provider, transfer);
      }
    };
  }
};

// src/wallets/WalletContractV5Beta.ts
init_buffer_shim();

// src/wallets/WalletContractV5R1.ts
init_buffer_shim();

// src/jetton/JettonMaster.ts
init_buffer_shim();
var import_core18 = __toModule(require("@ijstech/ton-core"));
var JettonMaster = class {
  static create(address2) {
    return new JettonMaster(address2);
  }
  constructor(address2) {
    this.address = address2;
  }
  async getWalletAddress(provider, owner) {
    let res = await provider.get("get_wallet_address", [{ type: "slice", cell: (0, import_core18.beginCell)().storeAddress(owner).endCell() }]);
    return res.stack.readAddress();
  }
  async getJettonData(provider) {
    let res = await provider.get("get_jetton_data", []);
    let totalSupply = res.stack.readBigNumber();
    let mintable = res.stack.readBoolean();
    let adminAddress = res.stack.readAddress();
    let content = res.stack.readCell();
    let walletCode = res.stack.readCell();
    return {
      totalSupply,
      mintable,
      adminAddress,
      content,
      walletCode
    };
  }
};

// src/jetton/JettonWallet.ts
init_buffer_shim();
var JettonWallet = class {
  static create(address2) {
    return new JettonWallet(address2);
  }
  constructor(address2) {
    this.address = address2;
  }
  async getBalance(provider) {
    let state = await provider.getState();
    if (state.state.type !== "active") {
      return 0n;
    }
    let res = await provider.get("get_wallet_data", []);
    return res.stack.readBigNumber();
  }
};

// src/multisig/MultisigOrder.ts
init_buffer_shim();
var import_crypto3 = __toModule(require_dist());
var import_core19 = __toModule(require("@ijstech/ton-core"));
var MultisigOrder = class {
  constructor(payload) {
    this.signatures = {};
    this.payload = payload;
  }
  static fromCell(cell) {
    let s = cell.beginParse();
    let signatures = s.loadMaybeRef()?.beginParse();
    const messagesCell = s.asCell();
    let order = new MultisigOrder(messagesCell);
    if (signatures) {
      while (signatures.remainingBits > 0) {
        const signature = signatures.loadBuffer(64);
        const ownerId = signatures.loadUint(8);
        order.signatures[ownerId] = signature;
        if (signatures.remainingRefs > 0) {
          signatures = signatures.loadRef().asSlice();
        } else {
          signatures.skip(1);
        }
      }
      signatures.endParse();
    }
    return order;
  }
  static fromPayload(payload) {
    return new MultisigOrder(payload);
  }
  addSignature(ownerId, signature, multisig) {
    const signingHash = this.payload.hash();
    if (!(0, import_crypto3.signVerify)(signingHash, signature, multisig.owners.get(ownerId).slice(0, -1))) {
      throw Error("invalid signature");
    }
    this.signatures[ownerId] = signature;
  }
  sign(ownerId, secretKey) {
    const signingHash = this.payload.hash();
    this.signatures[ownerId] = (0, import_crypto3.sign)(signingHash, secretKey);
    return signingHash;
  }
  unionSignatures(other) {
    this.signatures = Object.assign({}, this.signatures, other.signatures);
  }
  clearSignatures() {
    this.signatures = {};
  }
  toCell(ownerId) {
    let b = (0, import_core19.beginCell)().storeBit(0);
    for (const ownerId2 in this.signatures) {
      const signature = this.signatures[ownerId2];
      b = (0, import_core19.beginCell)().storeBit(1).storeRef((0, import_core19.beginCell)().storeBuffer(signature).storeUint(parseInt(ownerId2), 8).storeBuilder(b).endCell());
    }
    return (0, import_core19.beginCell)().storeUint(ownerId, 8).storeBuilder(b).storeBuilder(this.payload.asBuilder()).endCell();
  }
};

// src/multisig/MultisigOrderBuilder.ts
init_buffer_shim();
var import_core20 = __toModule(require("@ijstech/ton-core"));
var MultisigOrderBuilder = class {
  constructor(walletId, offset) {
    this.messages = (0, import_core20.beginCell)();
    this.queryId = 0n;
    this.walletId = walletId;
    this.queryOffset = offset || 7200;
  }
  addMessage(message2, mode) {
    if (this.messages.refs >= 4) {
      throw Error("only 4 refs are allowed");
    }
    this.updateQueryId();
    this.messages.storeUint(mode, 8);
    this.messages.storeRef((0, import_core20.beginCell)().store((0, import_core20.storeMessageRelaxed)(message2)).endCell());
  }
  clearMessages() {
    this.messages = (0, import_core20.beginCell)();
  }
  build() {
    return MultisigOrder.fromPayload((0, import_core20.beginCell)().storeUint(this.walletId, 32).storeUint(this.queryId, 64).storeBuilder(this.messages).endCell());
  }
  updateQueryId() {
    const time = BigInt(Math.floor(Date.now() / 1e3 + this.queryOffset));
    this.queryId = time << 32n;
  }
};

// src/multisig/MultisigWallet.ts
init_buffer_shim();
var import_crypto4 = __toModule(require_dist());
var import_core21 = __toModule(require("@ijstech/ton-core"));
var MULTISIG_CODE = import_core21.Cell.fromBase64("te6ccgECKwEABBgAART/APSkE/S88sgLAQIBIAIDAgFIBAUE2vIgxwCOgzDbPOCDCNcYIPkBAdMH2zwiwAAToVNxePQOb6Hyn9s8VBq6+RDyoAb0BCD5AQHTH1EYuvKq0z9wUwHwCgHCCAGDCryx8mhTFYBA9A5voSCYDqQgwgryZw7f+COqH1NAufJhVCOjU04gIyEiAgLMBgcCASAMDQIBIAgJAgFmCgsAA9GEAiPymAvHoHN9CYbZ5S7Z4BPHohwhJQAtAKkItdJEqCTItdKlwLUAdAT8ArobBKAATwhbpEx4CBukTDgAdAg10rDAJrUAvALyFjPFszJ4HHXI8gBzxb0AMmACASAODwIBIBQVARW77ZbVA0cFUg2zyCoCAUgQEQIBIBITAXOxHXQgwjXGCD5AQHTB4IB1MTtQ9hTIHj0Dm+h8p/XC/9eMfkQ8qCuAfQEIW6TW3Ey4PkBWNs8AaQBgJwA9rtqA6ADoAPoCAXoCEfyAgPyA3XlP+AXkegAA54tkwAAXrhlXP8EA1WZ2oexAAgEgFhcCASAYGQFRtyVbZ4YmRmpGEAgegc30McJNhFpAADMaYeYuAFrgJhwLb+4cC3d0bhAjAYm1WZtnhqvgb+2xxsoicAgej430pBHEoFpAADHDhBACGuQkuuBk9kUWE5kAOeLKhACQCB6IYFImHFImHFImXEA2YlzNijAjAgEgGhsAF7UGtc4QQDVZnah7EAIBIBwdAgOZOB4fARGsGm2eL4G2CUAjABWt+UEAzJV2oewYQAENqTbPBVfBYCMAFa3f3CCAarM7UPYgAiDbPALyZfgAUENxQxPbPO1UIyoACtP/0wcwBKDbPC+uUyCw8mISsQKkJbNTHLmwJYEA4aojoCi8sPJpggGGoPgBBZcCERACPj4wjo0REB/bPEDXePRDEL0F4lQWW1Rz51YQU9zbPFRxClR6vCQlKCYAIO1E0NMf0wfTB9M/9AT0BNEAXgGOGjDSAAHyo9MH0wdQA9cBIPkBBfkBFbrypFAD4GwhIddKqgIi10m68qtwVCATAAwByMv/ywcE1ts87VT4D3AlblOJvrGYEG4QLVDHXwePGzBUJANQTds8UFWgRlAQSRA6SwlTuds8UFQWf+L4AAeDJaGOLCaAQPSWb6UglDBTA7neII4WODk5CNIAAZfTBzAW8AcFkTDifwgHBZJsMeKz5jAGKicoKQBgcI4pA9CDCNcY0wf0BDBTFnj0Dm+h8qXXC/9URUT5EPKmrlIgsVIDvRShI27mbCIyAH5SML6OIF8D+ACTItdKmALTB9QC+wAC6DJwyMoAQBSAQPRDAvAHjhdxyMsAFMsHEssHWM8BWM8WQBOAQPRDAeIBII6KEEUQNEMA2zztVJJfBuIqABzIyx/LB8sHyz/0APQAyQ==");
var MultisigWallet = class {
  constructor(publicKeys, workchain, walletId, k, opts) {
    this.provider = null;
    this.owners = import_core21.Dictionary.empty();
    this.workchain = workchain;
    this.walletId = walletId;
    this.k = k;
    for (let i = 0; i < publicKeys.length; i += 1) {
      this.owners.set(i, Buffer.concat([publicKeys[i], Buffer.alloc(1)]));
    }
    this.init = {
      code: MULTISIG_CODE,
      data: (0, import_core21.beginCell)().storeUint(this.walletId, 32).storeUint(this.owners.size, 8).storeUint(this.k, 8).storeUint(0, 64).storeDict(this.owners, import_core21.Dictionary.Keys.Uint(8), import_core21.Dictionary.Values.Buffer(33)).storeBit(0).endCell()
    };
    this.address = opts?.address || (0, import_core21.contractAddress)(workchain, this.init);
    if (opts?.provider) {
      this.provider = opts.provider;
    } else if (opts?.client) {
      this.provider = opts.client.provider(this.address, {
        code: this.init.code,
        data: this.init.data
      });
    }
  }
  static async fromAddress(address2, opts) {
    let provider;
    if (opts.provider) {
      provider = opts.provider;
    } else {
      if (!opts.client) {
        throw Error("Either provider or client must be specified");
      }
      provider = opts.client.provider(address2, {
        code: null,
        data: null
      });
    }
    const contractState = (await provider.getState()).state;
    if (contractState.type !== "active") {
      throw Error("Contract must be active");
    }
    const data = import_core21.Cell.fromBoc(contractState.data)[0].beginParse();
    const walletId = data.loadUint(32);
    data.skip(8);
    const k = data.loadUint(8);
    data.skip(64);
    const owners = data.loadDict(import_core21.Dictionary.Keys.Uint(8), import_core21.Dictionary.Values.Buffer(33));
    let publicKeys = [];
    for (const [key, value] of owners) {
      const publicKey = value.subarray(0, 32);
      publicKeys.push(publicKey);
    }
    return new MultisigWallet(publicKeys, address2.workChain, walletId, k, {
      address: address2,
      provider,
      client: opts.client
    });
  }
  async deployExternal(provider) {
    if (!provider && !this.provider) {
      throw Error("you must specify provider if there is no such property in MultisigWallet instance");
    }
    if (!provider) {
      provider = this.provider;
    }
    await provider.external(import_core21.Cell.EMPTY);
  }
  async deployInternal(sender, value = 1000000000n) {
    await sender.send({
      sendMode: import_core21.SendMode.PAY_GAS_SEPARATELY + import_core21.SendMode.IGNORE_ERRORS,
      to: this.address,
      value,
      init: this.init,
      body: import_core21.Cell.EMPTY,
      bounce: true
    });
  }
  async sendOrder(order, secretKey, provider) {
    if (!provider && !this.provider) {
      throw Error("you must specify provider if there is no such property in MultisigWallet instance");
    }
    if (!provider) {
      provider = this.provider;
    }
    let publicKey = (0, import_crypto4.keyPairFromSecretKey)(secretKey).publicKey;
    let ownerId = this.getOwnerIdByPubkey(publicKey);
    let cell = order.toCell(ownerId);
    let signature = (0, import_crypto4.sign)(cell.hash(), secretKey);
    cell = (0, import_core21.beginCell)().storeBuffer(signature).storeSlice(cell.asSlice()).endCell();
    await provider.external(cell);
  }
  async sendOrderWithoutSecretKey(order, signature, ownerId, provider) {
    if (!provider && !this.provider) {
      throw Error("you must specify provider if there is no such property in MultisigWallet instance");
    }
    if (!provider) {
      provider = this.provider;
    }
    let cell = order.toCell(ownerId);
    cell = (0, import_core21.beginCell)().storeBuffer(signature).storeSlice(cell.asSlice()).endCell();
    await provider.external(cell);
  }
  getOwnerIdByPubkey(publicKey) {
    for (const [key, value] of this.owners) {
      if (value.subarray(0, 32).equals(publicKey)) {
        return key;
      }
    }
    throw Error("public key is not an owner");
  }
};

// src/elector/ElectorContract.ts
init_buffer_shim();
var import_core22 = __toModule(require("@ijstech/ton-core"));
var FrozenDictValue = {
  serialize(src, builder) {
    throw Error("not implemented");
  },
  parse(src) {
    const address2 = new import_core22.Address(-1, src.loadBuffer(32));
    const weight = src.loadUintBig(64);
    const stake = src.loadCoins();
    return { address: address2, weight, stake };
  }
};
var EntitiesDictValue = {
  serialize(src, builder) {
    throw Error("not implemented");
  },
  parse(src) {
    const stake = src.loadCoins();
    src.skip(64);
    const address2 = new import_core22.Address(-1, src.loadBuffer(32));
    const adnl = src.loadBuffer(32);
    return { stake, address: address2, adnl };
  }
};
var ElectorContract = class {
  constructor() {
    this.address = import_core22.Address.parseRaw("-1:3333333333333333333333333333333333333333333333333333333333333333");
  }
  static create() {
    return new ElectorContract();
  }
  async getReturnedStake(provider, address2) {
    if (address2.workChain !== -1) {
      throw Error("Only masterchain addresses could have stake");
    }
    const res = await provider.get("compute_returned_stake", [{ type: "int", value: BigInt("0x" + address2.hash.toString("hex")) }]);
    return res.stack.readBigNumber();
  }
  async getPastElectionsList(provider) {
    const res = await provider.get("past_elections_list", []);
    const electionsListRaw = new import_core22.TupleReader(res.stack.readLispList());
    const elections = [];
    while (electionsListRaw.remaining > 0) {
      const electionsListEntry = electionsListRaw.readTuple();
      const id = electionsListEntry.readNumber();
      const unfreezeAt = electionsListEntry.readNumber();
      electionsListEntry.pop();
      const stakeHeld = electionsListEntry.readNumber();
      elections.push({ id, unfreezeAt, stakeHeld });
    }
    return elections;
  }
  async getPastElections(provider) {
    const res = await provider.get("past_elections", []);
    const electionsRaw = new import_core22.TupleReader(res.stack.readLispList());
    const elections = [];
    while (electionsRaw.remaining > 0) {
      const electionsEntry = electionsRaw.readTuple();
      const id = electionsEntry.readNumber();
      const unfreezeAt = electionsEntry.readNumber();
      const stakeHeld = electionsEntry.readNumber();
      electionsEntry.pop();
      const frozenDict = electionsEntry.readCell();
      const totalStake = electionsEntry.readBigNumber();
      const bonuses = electionsEntry.readBigNumber();
      let frozen = new Map();
      const frozenData = frozenDict.beginParse().loadDictDirect(import_core22.Dictionary.Keys.Buffer(32), FrozenDictValue);
      for (const [key, value] of frozenData) {
        frozen.set(BigInt("0x" + key.toString("hex")).toString(10), { address: value["address"], weight: value["weight"], stake: value["stake"] });
      }
      elections.push({ id, unfreezeAt, stakeHeld, totalStake, bonuses, frozen });
    }
    return elections;
  }
  async getElectionEntities(provider) {
    const account = await provider.getState();
    if (account.state.type !== "active") {
      throw Error("Unexpected error");
    }
    const cell = import_core22.Cell.fromBoc(account.state.data)[0];
    const cs = cell.beginParse();
    if (!cs.loadBit()) {
      return null;
    }
    const sc = cs.loadRef().beginParse();
    const startWorkTime = sc.loadUint(32);
    const endElectionsTime = sc.loadUint(32);
    const minStake = sc.loadCoins();
    const allStakes = sc.loadCoins();
    const entitiesData = sc.loadDict(import_core22.Dictionary.Keys.Buffer(32), EntitiesDictValue);
    let entities = [];
    if (entitiesData) {
      for (const [key, value] of entitiesData) {
        entities.push({ pubkey: key, stake: value["stake"], address: value["address"], adnl: value["adnl"] });
      }
    }
    return { minStake, allStakes, endElectionsTime, startWorkTime, entities };
  }
  async getActiveElectionId(provider) {
    const res = await provider.get("active_election_id", []);
    const electionId = res.stack.readNumber();
    return electionId > 0 ? electionId : null;
  }
  async getComplaints(provider, electionId) {
    const b = new import_core22.TupleBuilder();
    b.writeNumber(electionId);
    const res = await provider.get("list_complaints", b.build());
    if (res.stack.peek().type === "null") {
      return [];
    }
    const complaintsRaw = new import_core22.TupleReader(res.stack.readLispList());
    const results = [];
    while (complaintsRaw.remaining > 0) {
      const complaintsEntry = complaintsRaw.readTuple();
      const id = complaintsEntry.readBigNumber();
      const completeUnpackedComplaint = complaintsEntry.readTuple();
      const unpackedComplaints = completeUnpackedComplaint.readTuple();
      const publicKey = Buffer.from(unpackedComplaints.readBigNumber().toString(16), "hex");
      const description = unpackedComplaints.readCell();
      const createdAt = unpackedComplaints.readNumber();
      const severity = unpackedComplaints.readNumber();
      const rewardAddress = new import_core22.Address(-1, Buffer.from(unpackedComplaints.readBigNumber().toString(16), "hex"));
      const paid = unpackedComplaints.readBigNumber();
      const suggestedFine = unpackedComplaints.readBigNumber();
      const suggestedFinePart = unpackedComplaints.readBigNumber();
      const votes = [];
      const votersListRaw = new import_core22.TupleReader(completeUnpackedComplaint.readLispList());
      while (votersListRaw.remaining > 0) {
        votes.push(votersListRaw.readNumber());
      }
      const vsetId = completeUnpackedComplaint.readBigNumber();
      const remainingWeight = completeUnpackedComplaint.readBigNumber();
      results.push({
        id,
        publicKey,
        createdAt,
        severity,
        paid,
        suggestedFine,
        suggestedFinePart,
        rewardAddress,
        votes,
        remainingWeight,
        vsetId
      });
    }
    return results;
  }
};

// src/config/ConfigParser.ts
init_buffer_shim();
var import_core23 = __toModule(require("@ijstech/ton-core"));
function configParseMasterAddress(slice) {
  if (slice) {
    return new import_core23.Address(-1, slice.loadBuffer(32));
  } else {
    return null;
  }
}
function readPublicKey(slice) {
  if (slice.loadUint(32) !== 2390828938) {
    throw Error("Invalid config");
  }
  return slice.loadBuffer(32);
}
var ValidatorDescriptionDictValue = {
  serialize(src, builder) {
    throw Error("not implemented");
  },
  parse(src) {
    const header = src.loadUint(8);
    if (header === 83) {
      return {
        publicKey: readPublicKey(src),
        weight: src.loadUintBig(64),
        adnlAddress: null
      };
    } else if (header === 115) {
      return {
        publicKey: readPublicKey(src),
        weight: src.loadUintBig(64),
        adnlAddress: src.loadBuffer(32)
      };
    } else {
      throw Error("Invalid config");
    }
  }
};
function parseValidatorSet(slice) {
  const header = slice.loadUint(8);
  if (header === 17) {
    const timeSince = slice.loadUint(32);
    const timeUntil = slice.loadUint(32);
    const total = slice.loadUint(16);
    const main = slice.loadUint(16);
    const list = slice.loadDictDirect(import_core23.Dictionary.Keys.Uint(16), ValidatorDescriptionDictValue);
    return {
      timeSince,
      timeUntil,
      total,
      main,
      totalWeight: null,
      list
    };
  } else if (header === 18) {
    const timeSince = slice.loadUint(32);
    const timeUntil = slice.loadUint(32);
    const total = slice.loadUint(16);
    const main = slice.loadUint(16);
    const totalWeight = slice.loadUintBig(64);
    const list = slice.loadDict(import_core23.Dictionary.Keys.Uint(16), ValidatorDescriptionDictValue);
    return {
      timeSince,
      timeUntil,
      total,
      main,
      totalWeight,
      list
    };
  }
}
function parseBridge(slice) {
  const bridgeAddress = new import_core23.Address(-1, slice.loadBuffer(32));
  const oracleMultisigAddress = new import_core23.Address(-1, slice.loadBuffer(32));
  const oraclesDict = slice.loadDict(import_core23.Dictionary.Keys.Buffer(32), import_core23.Dictionary.Values.Buffer(32));
  const oracles = new Map();
  for (const [local, remote] of oraclesDict) {
    oracles.set(new import_core23.Address(-1, local).toString(), remote);
  }
  const externalChainAddress = slice.loadBuffer(32);
  return {
    bridgeAddress,
    oracleMultisigAddress,
    oracles,
    externalChainAddress
  };
}
function configParseMasterAddressRequired(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  return configParseMasterAddress(slice);
}
function configParse5(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic === 1) {
    const blackholeAddr = slice.loadBit() ? new import_core23.Address(-1, slice.loadBuffer(32)) : null;
    const feeBurnNominator = slice.loadUint(32);
    const feeBurnDenominator = slice.loadUint(32);
    return {
      blackholeAddr,
      feeBurnNominator,
      feeBurnDenominator
    };
  }
  throw new Error("Invalid config");
}
function configParse13(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic === 26) {
    const deposit = slice.loadCoins();
    const bitPrice = slice.loadCoins();
    const cellPrice = slice.loadCoins();
    return {
      deposit,
      bitPrice,
      cellPrice
    };
  }
  throw new Error("Invalid config");
}
function configParse15(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const validatorsElectedFor = slice.loadUint(32);
  const electorsStartBefore = slice.loadUint(32);
  const electorsEndBefore = slice.loadUint(32);
  const stakeHeldFor = slice.loadUint(32);
  return {
    validatorsElectedFor,
    electorsStartBefore,
    electorsEndBefore,
    stakeHeldFor
  };
}
function configParse16(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const maxValidators = slice.loadUint(16);
  const maxMainValidators = slice.loadUint(16);
  const minValidators = slice.loadUint(16);
  return {
    maxValidators,
    maxMainValidators,
    minValidators
  };
}
function configParse17(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const minStake = slice.loadCoins();
  const maxStake = slice.loadCoins();
  const minTotalStake = slice.loadCoins();
  const maxStakeFactor = slice.loadUint(32);
  return {
    minStake,
    maxStake,
    minTotalStake,
    maxStakeFactor
  };
}
var StoragePricesDictValue = {
  serialize(src, builder) {
    throw Error("not implemented");
  },
  parse(src) {
    const header = src.loadUint(8);
    if (header !== 204) {
      throw Error("Invalid config");
    }
    const utime_since = src.loadUint(32);
    const bit_price_ps = src.loadUintBig(64);
    const cell_price_ps = src.loadUintBig(64);
    const mc_bit_price_ps = src.loadUintBig(64);
    const mc_cell_price_ps = src.loadUintBig(64);
    return {
      utime_since,
      bit_price_ps,
      cell_price_ps,
      mc_bit_price_ps,
      mc_cell_price_ps
    };
  }
};
function configParse18(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  return slice.loadDictDirect(import_core23.Dictionary.Keys.Buffer(4), StoragePricesDictValue).values();
}
function configParse8(slice) {
  if (!slice) {
    return {
      version: 0,
      capabilities: 0n
    };
  }
  const version2 = slice.loadUint(32);
  const capabilities = slice.loadUintBig(64);
  return {
    version: version2,
    capabilities
  };
}
function configParse40(slice) {
  if (!slice) {
    return null;
  }
  const header = slice.loadUint(8);
  if (header !== 1) {
    throw Error("Invalid config");
  }
  const defaultFlatFine = slice.loadCoins();
  const defaultProportionaFine = slice.loadCoins();
  const severityFlatMult = slice.loadUint(16);
  const severityProportionalMult = slice.loadUint(16);
  const unfunishableInterval = slice.loadUint(16);
  const longInterval = slice.loadUint(16);
  const longFlatMult = slice.loadUint(16);
  const longProportionalMult = slice.loadUint(16);
  const mediumInterval = slice.loadUint(16);
  const mediumFlatMult = slice.loadUint(16);
  const mediumProportionalMult = slice.loadUint(16);
  return {
    defaultFlatFine,
    defaultProportionaFine,
    severityFlatMult,
    severityProportionalMult,
    unfunishableInterval,
    longInterval,
    longFlatMult,
    longProportionalMult,
    mediumInterval,
    mediumFlatMult,
    mediumProportionalMult
  };
}
function configParseWorkchainDescriptor(slice) {
  if (slice.loadUint(8) !== 166) {
    throw Error("Invalid config");
  }
  const enabledSince = slice.loadUint(32);
  const actialMinSplit = slice.loadUint(8);
  const min_split = slice.loadUint(8);
  const max_split = slice.loadUint(8);
  const basic = slice.loadBit();
  const active = slice.loadBit();
  const accept_msgs = slice.loadBit();
  const flags = slice.loadUint(13);
  const zerostateRootHash = slice.loadBuffer(32);
  const zerostateFileHash = slice.loadBuffer(32);
  const version2 = slice.loadUint(32);
  if (slice.loadBit()) {
    throw Error("Invalid config");
  }
  const vmVersion = slice.loadUint(32);
  const vmMode = slice.loadUintBig(64);
  return {
    enabledSince,
    actialMinSplit,
    min_split,
    max_split,
    basic,
    active,
    accept_msgs,
    flags,
    zerostateRootHash,
    zerostateFileHash,
    version: version2,
    format: {
      vmVersion,
      vmMode
    }
  };
}
var WorkchainDescriptorDictValue = {
  serialize(src, builder) {
    throw Error("not implemented");
  },
  parse(src) {
    if (src.loadUint(8) !== 166) {
      throw Error("Invalid config");
    }
    const enabledSince = src.loadUint(32);
    const actialMinSplit = src.loadUint(8);
    const min_split = src.loadUint(8);
    const max_split = src.loadUint(8);
    const basic = src.loadBit();
    const active = src.loadBit();
    const accept_msgs = src.loadBit();
    const flags = src.loadUint(13);
    const zerostateRootHash = src.loadBuffer(32);
    const zerostateFileHash = src.loadBuffer(32);
    const version2 = src.loadUint(32);
    if (src.loadBit()) {
      throw Error("Invalid config");
    }
    const vmVersion = src.loadUint(32);
    const vmMode = src.loadUintBig(64);
    return {
      enabledSince,
      actialMinSplit,
      min_split,
      max_split,
      basic,
      active,
      accept_msgs,
      flags,
      zerostateRootHash,
      zerostateFileHash,
      version: version2,
      format: {
        vmVersion,
        vmMode
      }
    };
  }
};
function configParse12(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const wd = slice.loadDict(import_core23.Dictionary.Keys.Uint(32), WorkchainDescriptorDictValue);
  if (wd) {
    return wd;
  }
  throw Error("No workchains exist");
}
function configParseValidatorSet(slice) {
  if (!slice) {
    return null;
  }
  return parseValidatorSet(slice);
}
function configParseBridge(slice) {
  if (!slice) {
    return null;
  }
  return parseBridge(slice);
}
function parseGasLimitsInternal(slice) {
  const tag = slice.loadUint(8);
  if (tag === 222) {
    const gasPrice = slice.loadUintBig(64);
    const gasLimit = slice.loadUintBig(64);
    const specialGasLimit = slice.loadUintBig(64);
    const gasCredit = slice.loadUintBig(64);
    const blockGasLimit = slice.loadUintBig(64);
    const freezeDueLimit = slice.loadUintBig(64);
    const deleteDueLimit = slice.loadUintBig(64);
    return {
      gasPrice,
      gasLimit,
      specialGasLimit,
      gasCredit,
      blockGasLimit,
      freezeDueLimit,
      deleteDueLimit
    };
  } else if (tag === 221) {
    const gasPrice = slice.loadUintBig(64);
    const gasLimit = slice.loadUintBig(64);
    const gasCredit = slice.loadUintBig(64);
    const blockGasLimit = slice.loadUintBig(64);
    const freezeDueLimit = slice.loadUintBig(64);
    const deleteDueLimit = slice.loadUintBig(64);
    return {
      gasPrice,
      gasLimit,
      gasCredit,
      blockGasLimit,
      freezeDueLimit,
      deleteDueLimit
    };
  } else {
    throw Error("Invalid config");
  }
}
function configParseGasLimitsPrices(slice) {
  if (!slice) {
    throw Error("Invalid config");
  }
  const tag = slice.loadUint(8);
  if (tag === 209) {
    const flatLimit = slice.loadUintBig(64);
    const flatGasPrice = slice.loadUintBig(64);
    const other = parseGasLimitsInternal(slice);
    return {
      flatLimit,
      flatGasPrice,
      other
    };
  } else {
    throw Error("Invalid config");
  }
}
function configParseMsgPrices(slice) {
  if (!slice) {
    throw new Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic !== 234) {
    throw new Error("Invalid msg prices param");
  }
  return {
    lumpPrice: slice.loadUintBig(64),
    bitPrice: slice.loadUintBig(64),
    cellPrice: slice.loadUintBig(64),
    ihrPriceFactor: slice.loadUint(32),
    firstFrac: slice.loadUint(16),
    nextFrac: slice.loadUint(16)
  };
}
function configParse28(slice) {
  if (!slice) {
    throw new Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic === 193) {
    const masterCatchainLifetime = slice.loadUint(32);
    const shardCatchainLifetime = slice.loadUint(32);
    const shardValidatorsLifetime = slice.loadUint(32);
    const shardValidatorsCount = slice.loadUint(32);
    return {
      masterCatchainLifetime,
      shardCatchainLifetime,
      shardValidatorsLifetime,
      shardValidatorsCount
    };
  }
  if (magic === 194) {
    const flags = slice.loadUint(7);
    const suffleMasterValidators = slice.loadBit();
    const masterCatchainLifetime = slice.loadUint(32);
    const shardCatchainLifetime = slice.loadUint(32);
    const shardValidatorsLifetime = slice.loadUint(32);
    const shardValidatorsCount = slice.loadUint(32);
    return {
      flags,
      suffleMasterValidators,
      masterCatchainLifetime,
      shardCatchainLifetime,
      shardValidatorsLifetime,
      shardValidatorsCount
    };
  }
  throw new Error("Invalid config");
}
function configParse29(slice) {
  if (!slice) {
    throw new Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic === 214) {
    const roundCandidates = slice.loadUint(32);
    const nextCandidateDelay = slice.loadUint(32);
    const consensusTimeout = slice.loadUint(32);
    const fastAttempts = slice.loadUint(32);
    const attemptDuration = slice.loadUint(32);
    const catchainMaxDeps = slice.loadUint(32);
    const maxBlockBytes = slice.loadUint(32);
    const maxColaltedBytes = slice.loadUint(32);
    return {
      roundCandidates,
      nextCandidateDelay,
      consensusTimeout,
      fastAttempts,
      attemptDuration,
      catchainMaxDeps,
      maxBlockBytes,
      maxColaltedBytes
    };
  } else if (magic === 215) {
    const flags = slice.loadUint(7);
    const newCatchainIds = slice.loadBit();
    const roundCandidates = slice.loadUint(8);
    const nextCandidateDelay = slice.loadUint(32);
    const consensusTimeout = slice.loadUint(32);
    const fastAttempts = slice.loadUint(32);
    const attemptDuration = slice.loadUint(32);
    const catchainMaxDeps = slice.loadUint(32);
    const maxBlockBytes = slice.loadUint(32);
    const maxColaltedBytes = slice.loadUint(32);
    return {
      flags,
      newCatchainIds,
      roundCandidates,
      nextCandidateDelay,
      consensusTimeout,
      fastAttempts,
      attemptDuration,
      catchainMaxDeps,
      maxBlockBytes,
      maxColaltedBytes
    };
  } else if (magic === 216) {
    const flags = slice.loadUint(7);
    const newCatchainIds = slice.loadBit();
    const roundCandidates = slice.loadUint(8);
    const nextCandidateDelay = slice.loadUint(32);
    const consensusTimeout = slice.loadUint(32);
    const fastAttempts = slice.loadUint(32);
    const attemptDuration = slice.loadUint(32);
    const catchainMaxDeps = slice.loadUint(32);
    const maxBlockBytes = slice.loadUint(32);
    const maxColaltedBytes = slice.loadUint(32);
    const protoVersion = slice.loadUint(16);
    return {
      flags,
      newCatchainIds,
      roundCandidates,
      nextCandidateDelay,
      consensusTimeout,
      fastAttempts,
      attemptDuration,
      catchainMaxDeps,
      maxBlockBytes,
      maxColaltedBytes,
      protoVersion
    };
  } else if (magic === 217) {
    const flags = slice.loadUint(7);
    const newCatchainIds = slice.loadBit();
    const roundCandidates = slice.loadUint(8);
    const nextCandidateDelay = slice.loadUint(32);
    const consensusTimeout = slice.loadUint(32);
    const fastAttempts = slice.loadUint(32);
    const attemptDuration = slice.loadUint(32);
    const catchainMaxDeps = slice.loadUint(32);
    const maxBlockBytes = slice.loadUint(32);
    const maxColaltedBytes = slice.loadUint(32);
    const protoVersion = slice.loadUint(16);
    const catchainMaxBlocksCoeff = slice.loadUint(32);
    return {
      flags,
      newCatchainIds,
      roundCandidates,
      nextCandidateDelay,
      consensusTimeout,
      fastAttempts,
      attemptDuration,
      catchainMaxDeps,
      maxBlockBytes,
      maxColaltedBytes,
      protoVersion,
      catchainMaxBlocksCoeff
    };
  }
  throw new Error("Invalid config");
}
function parseProposalSetup(slice) {
  const magic = slice.loadUint(8);
  if (magic !== 54) {
    throw new Error("Invalid config");
  }
  const minTotalRounds = slice.loadUint(8);
  const maxTotalRounds = slice.loadUint(8);
  const minWins = slice.loadUint(8);
  const maxLoses = slice.loadUint(8);
  const minStoreSec = slice.loadUint(32);
  const maxStoreSec = slice.loadUint(32);
  const bitPrice = slice.loadUint(32);
  const cellPrice = slice.loadUint(32);
  return { minTotalRounds, maxTotalRounds, minWins, maxLoses, minStoreSec, maxStoreSec, bitPrice, cellPrice };
}
function parseVotingSetup(slice) {
  if (!slice) {
    throw new Error("Invalid config");
  }
  const magic = slice.loadUint(8);
  if (magic !== 145) {
    throw new Error("Invalid config");
  }
  const normalParams = parseProposalSetup(slice.loadRef().beginParse());
  const criticalParams = parseProposalSetup(slice.loadRef().beginParse());
  return { normalParams, criticalParams };
}
function loadConfigParams(configBase64) {
  const comfigMap = import_core23.Cell.fromBase64(configBase64).beginParse().loadDictDirect(import_core23.Dictionary.Keys.Int(32), import_core23.Dictionary.Values.Cell());
  return comfigMap;
}
function loadConfigParamById(configBase64, id) {
  return loadConfigParams(configBase64).get(id);
}
function loadConfigParamsAsSlice(configBase64) {
  const pramsAsCells = loadConfigParams(configBase64);
  const params = new Map();
  for (const [key, value] of pramsAsCells) {
    params.set(key, value.beginParse());
  }
  return params;
}
function parseFullConfig(configs) {
  return {
    configAddress: configParseMasterAddressRequired(configs.get(0)),
    electorAddress: configParseMasterAddressRequired(configs.get(1)),
    minterAddress: configParseMasterAddress(configs.get(2)),
    feeCollectorAddress: configParseMasterAddress(configs.get(3)),
    dnsRootAddress: configParseMasterAddress(configs.get(4)),
    burningConfig: configParse5(configs.get(5)),
    globalVersion: configParse8(configs.get(8)),
    workchains: configParse12(configs.get(12)),
    voting: parseVotingSetup(configs.get(11)),
    validators: {
      ...configParse15(configs.get(15)),
      ...configParse16(configs.get(16)),
      ...configParse17(configs.get(17))
    },
    storagePrices: configParse18(configs.get(18)),
    gasPrices: {
      masterchain: configParseGasLimitsPrices(configs.get(20)),
      workchain: configParseGasLimitsPrices(configs.get(21))
    },
    msgPrices: {
      masterchain: configParseMsgPrices(configs.get(24)),
      workchain: configParseMsgPrices(configs.get(25))
    },
    validatorSets: {
      prevValidators: configParseValidatorSet(configs.get(32)),
      prevTempValidators: configParseValidatorSet(configs.get(33)),
      currentValidators: configParseValidatorSet(configs.get(34)),
      currentTempValidators: configParseValidatorSet(configs.get(35)),
      nextValidators: configParseValidatorSet(configs.get(36)),
      nextTempValidators: configParseValidatorSet(configs.get(37))
    },
    validatorsPunish: configParse40(configs.get(40)),
    bridges: {
      ethereum: configParseBridge(configs.get(71)),
      binance: configParseBridge(configs.get(72)),
      polygon: configParseBridge(configs.get(73))
    },
    catchain: configParse28(configs.get(28)),
    consensus: configParse29(configs.get(29))
  };
}

// src/utils/fees.ts
init_buffer_shim();
var import_core24 = __toModule(require("@ijstech/ton-core"));
function computeStorageFees(data) {
  const {
    lastPaid,
    now,
    storagePrices,
    storageStat,
    special,
    masterchain
  } = data;
  if (now <= lastPaid || storagePrices.length === 0 || now < storagePrices[0].utime_since || special) {
    return BigInt(0);
  }
  let upto = Math.max(lastPaid, storagePrices[0].utime_since);
  let total = BigInt(0);
  for (let i = 0; i < storagePrices.length && upto < now; i++) {
    let valid_until = i < storagePrices.length - 1 ? Math.min(now, storagePrices[i + 1].utime_since) : now;
    let payment = BigInt(0);
    if (upto < valid_until) {
      let delta = valid_until - upto;
      payment += BigInt(storageStat.cells) * (masterchain ? storagePrices[i].mc_cell_price_ps : storagePrices[i].cell_price_ps);
      payment += BigInt(storageStat.bits) * (masterchain ? storagePrices[i].mc_bit_price_ps : storagePrices[i].bit_price_ps);
      payment = payment * BigInt(delta);
    }
    upto = valid_until;
    total += payment;
  }
  return shr16ceil(total);
}
function computeFwdFees(msgPrices, cells, bits) {
  return msgPrices.lumpPrice + shr16ceil(msgPrices.bitPrice * bits + msgPrices.cellPrice * cells);
}
function computeGasPrices(gasUsed, prices) {
  if (gasUsed <= prices.flatLimit) {
    return prices.flatPrice;
  } else {
    return prices.flatPrice + (prices.price * (gasUsed - prices.flatLimit) >> 16n);
  }
}
function computeExternalMessageFees(msgPrices, cell) {
  let storageStats = collectCellStats(cell);
  storageStats.bits -= cell.bits.length;
  storageStats.cells -= 1;
  return computeFwdFees(msgPrices, BigInt(storageStats.cells), BigInt(storageStats.bits));
}
function computeMessageForwardFees(msgPrices, cell) {
  let msg = (0, import_core24.loadMessageRelaxed)(cell.beginParse());
  let storageStats = { bits: 0, cells: 0 };
  if (msg.init) {
    const rawBuilder = new import_core24.Cell().asBuilder();
    (0, import_core24.storeStateInit)(msg.init)(rawBuilder);
    const raw = rawBuilder.endCell();
    let c = collectCellStats(raw);
    c.bits -= raw.bits.length;
    c.cells -= 1;
    storageStats.bits += c.bits;
    storageStats.cells += c.cells;
  }
  let bc = collectCellStats(msg.body);
  bc.bits -= msg.body.bits.length;
  bc.cells -= 1;
  storageStats.bits += bc.bits;
  storageStats.cells += bc.cells;
  let fees = computeFwdFees(msgPrices, BigInt(storageStats.cells), BigInt(storageStats.bits));
  let res = fees * BigInt(msgPrices.firstFrac) >> 16n;
  let remaining = fees - res;
  return { fees: res, remaining };
}
function collectCellStats(cell) {
  let bits = cell.bits.length;
  let cells = 1;
  for (let ref of cell.refs) {
    let r = collectCellStats(ref);
    cells += r.cells;
    bits += r.bits;
  }
  return { bits, cells };
}
function shr16ceil(src) {
  let rem = src % 65536n;
  let res = src >> 16n;
  if (rem !== 0n) {
    res += 1n;
  }
  return res;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

  window.TonCore = exports;
});