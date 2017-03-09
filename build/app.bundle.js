/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mortgage = function () {
    function Mortgage(principal, years, rate) {
        _classCallCheck(this, Mortgage);

        this.principal = principal;
        this.years = years;
        this.rate = rate;
    }

    _createClass(Mortgage, [{
        key: "monthlyRatePercent",
        get: function get() {
            var monthlyRate = this.rate / 100 / 12;
            return monthlyRate * 100;
        }
    }, {
        key: "monthlyPayment",
        get: function get() {
            var monthlyRate = this.rate / 100 / 12;
            return this.principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), this.years * 12));
        }
    }, {
        key: "amortization",
        get: function get() {
            var monthlyPayment = this.monthlyPayment;
            var monthlyRate = 0;
            monthlyRate = this.rate / 100 / 12;
            var balance = this.principal;
            var amortization = [];

            for (var y = 0; y < this.years; y++) {
                var interestForYearY = 0;
                var principalForYearY = 0;

                for (var m = 0; m < 12; m++) {
                    var interestForMonthM = balance * monthlyRate;
                    var principalForMonthM = monthlyPayment - interestForMonthM;
                    interestForYearY += interestForMonthM;
                    principalForYearY += principalForMonthM;
                    balance -= principalForMonthM;
                };
                amortization.push({ principalForYearY: principalForYearY, interestForYearY: interestForYearY, balance: balance });
            };
            return amortization;
        }
    }]);

    return Mortgage;
}();

exports.default = Mortgage;
;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mortgage = __webpack_require__(0);

var _mortgage2 = _interopRequireDefault(_mortgage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById('principal').value;
    var years = document.getElementById('years').value;
    var rate = document.getElementById('rate').value;
    var mortgage = new _mortgage2.default(principal, years, rate);

    document.getElementById('monthlyPayment').innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = mortgage.monthlyRatePercent.toFixed(2);
    var html = '';

    mortgage.amortization.forEach(function (year, index) {
        return html += '\n\n         <tr>\n            <td>Year: ' + (index + 1) + '</td><br/>\n            <td class="currency">\n                Principal: $' + Math.round(year.principalForYearY) + '\n            </td><br/>\n\n            <td class="currency left">\n                Interest: $' + Math.round(year.interestForYearY) + '\n            </td><br/>\n\n            <td class="currency">\n                Balance: $' + Math.round(year.balance) + '\n            </td>\n\n            <td class="stretch">\n                <div class="flex">\n                    <div class="bar principal"\n                         style="flex:' + year.principalForYearY + ';\n                         -webkit-flex:' + year.principalForYearY + '">\n                    </div>\n                    <div class="bar interest"\n                         style="flex:' + year.interestForYearY + ';\n                         -webkit-flex:' + year.interestForYearY + '">\n                    </div>\n                </div>\n                <br/>\n            </td>\n        </tr>\n    ';
    });
    document.getElementById('amortization').innerHTML = html;
});

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map