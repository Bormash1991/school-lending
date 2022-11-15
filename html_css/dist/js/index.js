/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lodash.throttle/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.throttle/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;


/***/ }),

/***/ "./src/ts/app.ts":
/*!***********************!*\
  !*** ./src/ts/app.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _mobile_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-menu */ "./src/ts/mobile-menu.ts");
/* harmony import */ var _header_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-scroll */ "./src/ts/header-scroll.ts");
/* harmony import */ var _paginator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paginator */ "./src/ts/paginator.ts");
/* harmony import */ var _courses_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./courses-slider */ "./src/ts/courses-slider.ts");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slider */ "./src/ts/slider.ts");
/* harmony import */ var _data_for_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-for-sliders */ "./src/ts/data-for-sliders.ts");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form */ "./src/ts/form.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scroll */ "./src/ts/scroll.ts");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select */ "./src/ts/select.ts");
/* harmony import */ var _customers_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customers-paginator */ "./src/ts/customers-paginator.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










class App {
    constructor() {
        this.slider;
        this.baseUrl;
    }
    getSliderData(num = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`https://jsonplaceholder.typicode.com/albums/${num}/photos`);
            return yield response.json();
        });
    }
    updateSlider(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.slider.setData(yield this.getSliderData(id));
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            (0,_mobile_menu__WEBPACK_IMPORTED_MODULE_0__.hamburger)();
            (0,_header_scroll__WEBPACK_IMPORTED_MODULE_1__.headerAppearsWithScroll)();
            (0,_paginator__WEBPACK_IMPORTED_MODULE_2__.paginator)(_data_for_sliders__WEBPACK_IMPORTED_MODULE_5__.dataForPaginator);
            (0,_courses_slider__WEBPACK_IMPORTED_MODULE_3__.coursesSlider)(_data_for_sliders__WEBPACK_IMPORTED_MODULE_5__.dataForCoursesSlider, "course__slider-wrap");
            (0,_form__WEBPACK_IMPORTED_MODULE_6__.initForm)();
            (0,_scroll__WEBPACK_IMPORTED_MODULE_7__.smoothScroll)();
            this.slider = new _slider__WEBPACK_IMPORTED_MODULE_4__.PreferSlider("slider", "prefer");
            this.slider.initSlider();
            let response = yield this.getSliderData();
            this.slider.setData(response);
            new _select__WEBPACK_IMPORTED_MODULE_8__.Select(this.updateSlider.bind(this), "prefer").initList();
            (0,_customers_paginator__WEBPACK_IMPORTED_MODULE_9__.customersPaginator)(_data_for_sliders__WEBPACK_IMPORTED_MODULE_5__.dataForCustomersSlider);
        });
    }
}


/***/ }),

/***/ "./src/ts/courses-slider.ts":
/*!**********************************!*\
  !*** ./src/ts/courses-slider.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coursesSlider": () => (/* binding */ coursesSlider)
/* harmony export */ });
function coursesSlider(data, selector) {
    let sliderWrap = document.querySelector(`.${selector}`);
    addSlides(data, sliderWrap);
    initSlickSlider(selector);
}
function checkStars(stars) {
    return (100 * stars) / 5;
}
function addSlides(data, sliderWrap) {
    data.forEach((elem, i) => {
        sliderWrap.innerHTML += slideTemplate(elem);
    });
}
function slideTemplate(elem) {
    let width = checkStars(elem.countOfStars);
    let { id, personImg, backUrl, category, title, price, oldPrice, countOfStars, } = elem;
    return ` <div>
  <a id= ${id} href="#" class="course__item  price-item" 
   style="background: url('${backUrl}') center
                      center / cover no-repeat;
                  ">
                <div class="price-item__overlay"></div>
                <img
                  src="${personImg}"
                  alt="person"
                  class="price-item__img"
                  width="48"
                />
                <h4 class="price-item__title">${category}</h4>
                <div class="price-item__subtitle">${title}</div>
                <div class="price-item__line"></div>
                <div class="price-item__bottom-wrap">
                  <div class="price-item__price-wrap">
                    <div class="price-item__price">$${price}</div>
                    <div class="price-item__price-old">$${oldPrice}</div>
                  </div>
                  <div class="price-item__star-wrap rating">
                   <div class="rating__body">
                      <div class="rating__active" style='width:${width}%'></div>
                      </div>
                    <div class="rating__value">(${countOfStars})</div>
                  </div>
                </div>
              </a></div>`;
}
function initSlickSlider(selector) {
    $(`.${selector}`)
        .not(".slick-initialized")
        .slick({
        slidesToShow: 3,
        speed: 500,
        prevArrow: document.querySelector(".course__slider-btn_left"),
        nextArrow: document.querySelector(".course__slider-btn_right"),
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                },
            },
        ],
    });
}


/***/ }),

/***/ "./src/ts/customers-paginator.ts":
/*!***************************************!*\
  !*** ./src/ts/customers-paginator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customersPaginator": () => (/* binding */ customersPaginator)
/* harmony export */ });
let dotsWrapper = document.querySelector(".customer__dots");
let active = "customer__dot_active";
let img = document.querySelector(".customer__img");
let square = document.querySelector(".customer__square");
let icon = document.querySelector(".customer__icon_elem");
function setActiveClass(dot) {
    dot.classList.add(active);
}
function setData(data, number) {
    let textField = document.querySelector(".customer__text"), nameField = document.querySelector(".customer__name");
    let { imgUrl, color, text, author } = data[number];
    textField.innerHTML = text;
    nameField.innerHTML = author;
    img.style.cssText = `
  background: url("${imgUrl}") center center/ cover no-repeat;
  `;
    square.style.cssText = `
  background-color:${color};
  `;
    icon.style.cssText = `
      fill: ${color};
      stroke: ${color};
  `;
}
function clickHandler(data) {
    let dots = document.querySelectorAll(".customer__dot");
    dotsWrapper.addEventListener("click", (e) => {
        let target = e.target;
        if (target.classList.contains("customer__dot")) {
            dots.forEach((elem, i) => {
                if (elem == target) {
                    clearActiveClass(dots);
                    setActiveClass(target);
                    setData(data, i);
                }
            });
        }
    });
}
function clearActiveClass(dots) {
    dots.forEach((d) => {
        d.classList.remove(active);
    });
}
function createDot(data) {
    for (let i = 0; i < data.length; i++) {
        let dot = document.createElement("div");
        dot.classList.add("customer__dot");
        dotsWrapper.appendChild(dot);
        if (i == 0) {
            dot.classList.add(active);
            setData(data, 0);
        }
    }
}
function customersPaginator(data) {
    createDot(data);
    clickHandler(data);
}


/***/ }),

/***/ "./src/ts/data-for-sliders.ts":
/*!************************************!*\
  !*** ./src/ts/data-for-sliders.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataForCoursesSlider": () => (/* binding */ dataForCoursesSlider),
/* harmony export */   "dataForCustomersSlider": () => (/* binding */ dataForCustomersSlider),
/* harmony export */   "dataForPaginator": () => (/* binding */ dataForPaginator)
/* harmony export */ });
const dataForPaginator = [
    {
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        userImage: "https://via.placeholder.com/150/92c952",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        userImage: "https://via.placeholder.com/150/771796",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        url: "https://via.placeholder.com/600/24f355",
        userImage: "https://via.placeholder.com/150/24f355",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        url: "https://via.placeholder.com/600/d32776",
        userImage: "https://via.placeholder.com/150/d32776",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
    {
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        userImage: "https://via.placeholder.com/150/f66b97",
        redirectLink: "https://jsonplaceholder.typicode.com",
        category: "Design",
    },
];
const dataForCoursesSlider = [
    {
        id: 1,
        personImg: "img/course/persone/first.jpg",
        backUrl: "img/course/itemBack/first.jpg",
        category: "Design",
        title: "Learn Photoshop title",
        price: "260",
        oldPrice: "360",
        countOfStars: 4.2,
    },
    {
        id: 2,
        personImg: "img/course/persone/third.jpg",
        backUrl: "img/course/itemBack/second.jpg",
        category: "Marketing",
        title: " Learn Photoshop title trun",
        price: "260",
        oldPrice: "360",
        countOfStars: 4,
    },
    {
        id: 3,
        personImg: "img/course/persone/second.jpg",
        backUrl: "img/course/itemBack/third.jpg",
        category: "Web design",
        title: "Learn Photoshop",
        price: "260",
        oldPrice: "360",
        countOfStars: 5,
    },
    {
        id: 4,
        personImg: "img/course/persone/third.jpg",
        backUrl: "img/course/itemBack/second.jpg",
        category: "Test Slide",
        title: "Learn Photoshop test",
        price: "260",
        oldPrice: "360",
        countOfStars: 2.5,
    },
];
const dataForCustomersSlider = [
    {
        imgUrl: "https://img.freepik.com/fotos-kostenlos/schliessen-sie-herauf-mann-der-code-auf-dem-laptop-schreibt_158595-5169.jpg?w=900&t=st=1667926250~exp=1667926850~hmac=9b14d736ec96f8b12087148cd023bd39ebfc67172d5f5762ea33d616a0506f30",
        color: "red",
        text: "An investment in knowledge always pays the best interest. <br> <br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium, illo eveniet, in pariatur eum dolore dolorum quis ad quasi, laboriosam ex? Doloremque explicabo, perspiciatis fugit suscipit quod ipsa quae.",
        author: "Benjamin Franklin",
    },
    {
        imgUrl: "https://img.freepik.com/fotos-kostenlos/mitarbeiter-eines-it-unternehmens-die-an-einem-computer-arbeiten_1303-19428.jpg?w=900&t=st=1667926529~exp=1667927129~hmac=07404a17c3337a4f2415822687cec6446ffad9c066831fd54df34af87e76159b",
        color: "blue",
        text: "Wisdom is knowing how little we know <br> <br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium, illo eveniet, in pariatur eum dolore dolorum quis ad quasi, laboriosam ex? Doloremque explicabo, perspiciatis fugit suscipit quod ipsa quae.",
        author: "Oscar Wilde",
    },
];



/***/ }),

/***/ "./src/ts/form.ts":
/*!************************!*\
  !*** ./src/ts/form.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initForm": () => (/* binding */ initForm)
/* harmony export */ });
let form = document.querySelector(".form"), inputs = form.querySelectorAll(".form__input"), obj = {}, valid = false;
function initForm() {
    setData();
    submitHendler();
    changeHendler();
}
function submitHendler() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        inputs.forEach((input, i) => {
            if (input.value == "") {
                document.querySelector(`label[for="${input.getAttribute("id")}"]`).innerText = "You must fill in the field";
            }
            else if (i == inputs.length - 1) {
                const formData = new FormData(form);
                let formObj = {};
                for (let [key, value] of formData.entries()) {
                    formObj[key] = value;
                }
                clearInput();
                clearStorage();
                obj = {};
                console.log(formObj);
            }
        });
    });
}
function formValidate(input) {
    let id = input.getAttribute("id");
    if (id == "fullname") {
        let reg = new RegExp(/^[a-zA-Z, \s]+$/);
        if (input.value == "") {
            return "";
        }
        else if (!reg.test(input.value)) {
            return "You must enter only English letters";
        }
        else if (input.value.length < 3 || input.value.length > 20) {
            return "You must enter more than 2 or less then 20 letters";
        }
        else if (input.value.length >= 3 && input.value.length <= 20) {
            return "";
        }
    }
    else if (id == "phone") {
        let reg = new RegExp(/^[\d\+][\d\(\)\ -]{4,14}\d$/);
        if (input.value == "") {
            return "";
        }
        else if (!reg.test(input.value)) {
            return "You must enter +380000000000";
        }
        else {
            return "";
        }
    }
    else if (id == "email") {
        let reg = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        if (input.value == "") {
            return "";
        }
        else if (!reg.test(input.value)) {
            return "You must enter email as in example: 'lutsenko@gmail.com'";
        }
        else {
            return "";
        }
    }
}
function illuminationForInput(text, input) {
    if (text) {
        input.classList.add("form__input_invalid");
    }
    else {
        input.classList.remove("form__input_invalid");
    }
}
function changeHendler() {
    form.addEventListener("keyup", (e) => {
        let target = e.target;
        if (target.classList.contains("form__input")) {
            let text = formValidate(target);
            let label = document.querySelector(`label[for="${target.getAttribute("id")}"]`);
            label.innerText = text;
            illuminationForInput(text, target);
            let d = JSON.parse(localStorage.getItem("formData"));
            if (d) {
                if (Object.keys(d).length >= 1) {
                    obj = JSON.parse(localStorage.getItem("formData"));
                }
            }
            obj[target.getAttribute("name")] = target.value;
            localStorage.setItem("formData", JSON.stringify(obj));
        }
    });
}
function clearInput() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function clearStorage() {
    localStorage.removeItem("formData");
}
function setData() {
    let data = JSON.parse(localStorage.getItem("formData"));
    if (data && localStorage.getItem("formData") != null) {
        inputs.forEach((input) => {
            if (data[input.getAttribute("name")]) {
                input.value = data[input.getAttribute("name")];
                let text = formValidate(input);
                document.querySelector(`label[for="${input.getAttribute("id")}"]`).innerText = text;
                illuminationForInput(text, input);
            }
        });
    }
}


/***/ }),

/***/ "./src/ts/header-scroll.ts":
/*!*********************************!*\
  !*** ./src/ts/header-scroll.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "headerAppearsWithScroll": () => (/* binding */ headerAppearsWithScroll)
/* harmony export */ });
let header = document.querySelector(".header"), headerBack = document.querySelector(".header__back"), inform = document.querySelector(".inform");
function headerAppearsWithScroll() {
    window.addEventListener("scroll", () => {
        if (window.scrollY >= inform.clientHeight) {
            header.style.position = "sticky";
            headerBack.style.display = "none";
            header.classList.add("header__fix");
        }
        else {
            header.style.position = "unset";
            headerBack.style.display = "block";
            header.classList.remove("header__fix");
        }
    });
}


/***/ }),

/***/ "./src/ts/mobile-menu.ts":
/*!*******************************!*\
  !*** ./src/ts/mobile-menu.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hamburger": () => (/* binding */ hamburger)
/* harmony export */ });
let humburgerElem = document.querySelector(".header__humburger"), nav = document.querySelector(".header__nav"), cross = document.querySelector(".header__cross"), link = document.querySelector(".header__list"), activeClass = "header__nav_active";
function hamburger() {
    clickHundlers();
}
function clickHundlers() {
    humburgerElem.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        nav.classList.add(activeClass);
    });
    cross.addEventListener("click", closeMenu);
    link.addEventListener("click", (e) => {
        let target = e.target;
        if (target.className == "header__link") {
            closeMenu();
        }
    });
}
function closeMenu() {
    document.body.style.overflow = "";
    nav.classList.remove(activeClass);
}


/***/ }),

/***/ "./src/ts/models/enum.model.ts":
/*!*************************************!*\
  !*** ./src/ts/models/enum.model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumOptions": () => (/* binding */ AlbumOptions)
/* harmony export */ });
var AlbumOptions;
(function (AlbumOptions) {
    AlbumOptions["LabelOne"] = "1";
    AlbumOptions["LabelTwo"] = "2";
    AlbumOptions["LabelThree"] = "3";
})(AlbumOptions || (AlbumOptions = {}));


/***/ }),

/***/ "./src/ts/paginator.ts":
/*!*****************************!*\
  !*** ./src/ts/paginator.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "paginator": () => (/* binding */ paginator)
/* harmony export */ });
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.throttle */ "./node_modules/lodash.throttle/index.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_0__);

let buttonsParent = document.querySelector(".blog__list"), elementsWrapper = document.querySelector(".blog__wrap-elements"), slides = 2, activeClass = "blog__btn_active", horizontal = false;
function paginator(data) {
    window.addEventListener("resize", lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(resizeCallback.bind(this, data), 700));
    createButtons(data);
    clickHandler(data);
}
function templateBlogElements(id, title, url, userImage, redirectLink, category) {
    return `
              <div id="${id}" class="blog__wrap-item flex_justify-c">
                <div class="blog__wrap-left">
                  <div class="blog__name">${category}</div>
                  <img
                    src="${userImage}"
                    alt="person"
                    class="blog__person-img"
                    width="48"
                  />
                </div>
                <div class="blog__wrap-right">
                  <img
                    src="${url}"
                    alt="laptops"
                    class="blog__img"
                    width="328"
                  />
                  <div class="blog__text">
                   ${title}
                  </div>
                  <a href="${redirectLink}" class="blog__more">Read Now</a>
                </div>
              </div>
        `;
}
function templateButtons(num) {
    return `
      <li class="blog__elem ">
                <button class="blog__btn">${num}</button>
              </li>
    `;
}
function checkWindowWidth() {
    if (window.innerWidth < 1440) {
        slides = 1;
    }
    if (window.innerWidth >= 1440) {
        horizontal = false;
        slides = 2;
    }
    if (window.innerWidth < 768) {
        horizontal = true;
    }
}
function resizeCallback(data) {
    checkWindowWidth();
    elementsWrapper.innerHTML = "";
    buttonsParent.innerHTML = "";
    buttonsParent.setAttribute("style", `transform:transform(0px,0px )`);
    createButtons(data);
    clickHandler(data);
}
checkWindowWidth();
function checkActiveButton(count, data) {
    let btns = document.querySelectorAll(".blog__btn");
    if (count % 2 == 0 && btns.length < 5) {
        btns[0].classList.add(activeClass);
        createElements(data, 1, slides);
    }
    else if (count % 2 != 0 && btns.length <= 5) {
        let num = Math.trunc(count / 2);
        btns[num].classList.add(activeClass);
        createElements(data, num + 1, slides);
    }
    else {
        btns[2].classList.add(activeClass);
        createElements(data, 3, slides);
    }
    clickHandler(data);
}
function clickHandler(data) {
    let btns = document.querySelectorAll(".blog__btn"), arrs = [...btns];
    buttonsParent.addEventListener("click", (e) => {
        let target = e.target;
        arrs.forEach((elem, i) => {
            if (target == elem && !target.classList.contains(activeClass)) {
                arrs.forEach((e, index) => {
                    if (e.classList.contains(activeClass)) {
                        e.classList.remove(activeClass);
                    }
                });
                elem.classList.add(activeClass);
                elementsWrapper.innerHTML = "";
                createElements(data, i + 1, slides);
                if (btns.length > 5) {
                    autoScrollListOfButtons(i, btns);
                }
            }
        });
    });
}
function setTransformValue(trigger) {
    if (trigger) {
        return {
            value: "translateX",
            number: 62,
        };
    }
    else {
        return {
            value: "translateY",
            number: 58,
        };
    }
}
function autoScrollListOfButtons(index, btns) {
    let { value, number } = setTransformValue(horizontal);
    if (index <= 3) {
        buttonsParent.setAttribute("style", `transform: ${value}(-0px)`);
    }
    if (index > 3 && index < btns.length - 1) {
        buttonsParent.setAttribute("style", `transform: ${value}(-${number * (index - 3)}px)`);
    }
}
function createElements(data, numberOfBtn, coutOfSlides) {
    let halfData = data.slice(numberOfBtn * coutOfSlides - coutOfSlides, numberOfBtn * coutOfSlides);
    halfData.forEach((el, index) => {
        let { id, title, url, userImage, redirectLink, category } = el;
        elementsWrapper.innerHTML += templateBlogElements(id, title, url, userImage, redirectLink, category);
    });
}
function createButtons(data) {
    let dataLength = data.length;
    let counter = 0;
    if (dataLength % slides == 0) {
        for (let i = 0; i < dataLength / slides; i++) {
            counter += 1;
            if (counter > 5) {
                buttonsParent.innerHTML += templateButtons(i + 1);
            }
            else {
                buttonsParent.innerHTML += templateButtons(i + 1);
            }
        }
    }
    else {
        for (let i = 0; i < Math.ceil(dataLength / slides); i++) {
            counter += 1;
            if (counter > 5) {
                buttonsParent.innerHTML += templateButtons(i + 1);
            }
            else {
                buttonsParent.innerHTML += templateButtons(i + 1);
            }
        }
    }
    checkActiveButton(counter, data);
}


/***/ }),

/***/ "./src/ts/scroll.ts":
/*!**************************!*\
  !*** ./src/ts/scroll.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "smoothScroll": () => (/* binding */ smoothScroll)
/* harmony export */ });
function smoothScroll() {
    document.querySelectorAll('a[href^="#"').forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let href = this.getAttribute("href").substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector(".header").offsetHeight / 2;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: "smooth",
            });
        });
    });
}


/***/ }),

/***/ "./src/ts/select.ts":
/*!**************************!*\
  !*** ./src/ts/select.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _models_enum_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/enum.model */ "./src/ts/models/enum.model.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Select_select;

class Select {
    constructor(changeCallback, selector) {
        _Select_select.set(this, void 0);
        this.numberOflabel;
        this.selector = selector;
        __classPrivateFieldSet(this, _Select_select, `.${this.selector}__label`, "f");
        this.data;
        this.changeCallback = changeCallback;
        this.list;
        this.label;
        this.span;
        this.arrow;
        this.quantitiOfAlbumId = 3;
    }
    onChange(value) {
        this.changeCallback(value);
    }
    get select() {
        return __classPrivateFieldGet(this, _Select_select, "f");
    }
    templateButtonAndList() {
        return `
    <button class="label__button ${this.selector}__button">
        <span class="label__button_text ${this.selector}__button_text">Label</span>
        <i class="label__arrow ${this.selector}__arrow"></i>
    </button>
    <ul class="label__list ${this.selector}__list"></ul>
    `;
    }
    initVariables() {
        this.list = document.querySelector(`.${this.selector}__list`);
        this.label = document.querySelector(`.${this.selector}__button`);
        this.span = document.querySelector(`.${this.selector}__button_text`);
        this.arrow = document.querySelector(`.${this.selector}__arrow`);
    }
    initList() {
        let item = document.querySelector(this.select);
        item.classList.add("label");
        item.innerHTML = this.templateButtonAndList();
        this.initVariables();
        if (this.quantitiOfAlbumId != 2) {
            this.labelClickHandler();
        }
        else {
            this.label.classList.add("label__button_disabled");
        }
        this.addListItem();
    }
    addListItem() {
        for (let i = 0; i < this.quantitiOfAlbumId; i++) {
            this.list.innerHTML += this.labelTemplate(+Object.values(_models_enum_model__WEBPACK_IMPORTED_MODULE_0__.AlbumOptions)[i]);
        }
        this.onChange(1);
    }
    labelTemplate(number) {
        return `<li id="${number}" class="label__list-item ${this.selector}__list-item">Label ${number}</li>`;
    }
    labelClickHandler() {
        this.label.addEventListener("click", () => {
            this.label.classList.toggle(`${this.selector}__button_active`);
            this.label.classList.toggle("label__button_active");
            this.list.classList.toggle("label__list_show");
            this.arrow.classList.toggle(`${this.selector}__arrow_active`);
            this.arrow.classList.toggle("label__arrow_active");
        });
        this.list.addEventListener("click", (e) => {
            let target = e.target;
            if (target.classList.contains(`${this.selector}__list-item`)) {
                this.list.classList.toggle(`${this.selector}__list_show`);
                this.list.classList.toggle("label__list_show");
                this.numberOflabel = +target.getAttribute("id");
                this.span.textContent = target.textContent;
                this.label.classList.toggle(`${this.selector}__button_active`);
                this.label.classList.toggle("label__button_active");
                this.arrow.classList.toggle("label__arrow_active");
                this.arrow.classList.toggle(`${this.selector}__arrow_active`);
                this.onChange(+Object.values(_models_enum_model__WEBPACK_IMPORTED_MODULE_0__.AlbumOptions)[this.numberOflabel - 1]);
            }
        });
    }
}
_Select_select = new WeakMap();


/***/ }),

/***/ "./src/ts/slider.ts":
/*!**************************!*\
  !*** ./src/ts/slider.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreferSlider": () => (/* binding */ PreferSlider)
/* harmony export */ });
class PreferSlider {
    constructor(id, selector) {
        this.translate = 0;
        this.coutOfClick = 0;
        this.numberOfSlider = 0;
        this.numberOflabel = 0;
        this.slider = document.querySelector(`#${id}`);
        this.nextButton;
        this.prevButton;
        this.box;
        this.selector = selector;
    }
    creatSliderСascade() {
        return `<div class="slider__item-wrap ${this.selector}__item-wrap">
             ${this.renderButtons("left")}
              <div class="slider__item-box ${this.selector}__item-box"></div>
            ${this.renderButtons("right")}
            </div> `;
    }
    renderButtons(side) {
        return ` <button
                class="slider-btn slider-btn_${side} ${this.selector}__slider-btn ${this.selector}__slider-btn-${side}"
              >
              ${this.templateButtons(side)}
              </button>`;
    }
    templateButtons(side) {
        return ` <svg class="slider-btn__img slider-btn__img-${side}">
                  <use href="img/sprite.svg#icon-${side}" width="10"></use>
                </svg>`;
    }
    checkWindowWidth() {
        if (window.innerWidth >= 1440) {
            return 4;
        }
        if (window.innerWidth < 1440 && window.innerWidth >= 768) {
            return 2;
        }
        if (window.innerWidth < 768) {
            return 1;
        }
    }
    slideTemplate({ albumId, id, title, url, thumbnailUrl, }) {
        return `  <a href="${thumbnailUrl}" id="${id}" class="slider__item ${this.selector}__item flex">
                <div class="${this.selector}__overlay ${this.selector}__overlay_blue"
                style="background: url(${url}) center center/cover no-repeat;"></div>
                <div class="${this.selector}__name">${title}</div></div>
              </a>`;
    }
    setData(data) {
        this.box.innerHTML = "";
        this.translate = 0;
        this.assignTranslate();
        this.numberOfSlider = 0;
        this.coutOfClick = 0;
        data = data.slice(0, 7);
        data.forEach((elem, i) => {
            this.box.innerHTML += this.slideTemplate(elem);
            this.numberOfSlider += 1;
        });
        this.prevSlide();
    }
    assignTranslate() {
        this.box.style.cssText = `transform: translateX(${this.translate}px)`;
    }
    nextSlide() {
        if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
            this.translate -= 217;
            this.coutOfClick += 1;
            this.assignTranslate();
        }
        if (this.coutOfClick == this.numberOfSlider - this.checkWindowWidth()) {
            this.nextButton.style.opacity = "0.5";
        }
        if (this.translate != 0) {
            this.prevButton.style.opacity = "1";
        }
    }
    prevSlide() {
        if (this.translate != 0) {
            this.translate += 217;
            this.coutOfClick -= 1;
            this.assignTranslate();
        }
        if (this.translate == 0) {
            this.prevButton.style.opacity = "0.5";
        }
        if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
            this.nextButton.style.opacity = "1";
        }
    }
    clickHendler() {
        this.nextButton.addEventListener("click", () => {
            this.nextSlide();
        });
        this.prevButton.addEventListener("click", () => {
            this.prevSlide();
        });
    }
    initSlider() {
        this.slider.innerHTML = this.creatSliderСascade();
        this.nextButton = document.querySelector(`.${this.selector}__slider-btn-right`);
        this.prevButton = document.querySelector(`.${this.selector}__slider-btn-left`);
        this.box = document.querySelector(`.${this.selector}__item-box`);
        this.prevSlide();
        this.clickHendler();
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/ts/app.ts");

window.addEventListener("DOMContentLoaded", () => {
    new _app__WEBPACK_IMPORTED_MODULE_0__.App().init();
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map