'use strict';

require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.array.join.js');
require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.number.constructor.js');
require('core-js/modules/es.object.keys.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.match.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/web.dom-collections.iterator.js');
function _createForOfIteratorHelper(r, e) {
  var t =
    ('undefined' != typeof _Symbol && _getIteratorMethod(r)) || r['@@iterator'];
  if (!t) {
    if (
      _Array$isArray2(r) ||
      (t = _unsupportedIterableToArray(r)) ||
      (e && r && 'number' == typeof r.length)
    ) {
      t && (r = t);
      var _n2 = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n2 >= r.length
            ? {
                done: !0,
              }
            : {
                done: !1,
                value: r[_n2++],
              };
        },
        e: function e(r) {
          throw r;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return (a = r.done), r;
    },
    e: function e(r) {
      (u = !0), (o = r);
    },
    f: function f() {
      try {
        a || null == t['return'] || t['return']();
      } finally {
        if (u) throw o;
      }
    },
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    var _context34;
    if ('string' == typeof r) return _arrayLikeToArray(r, a);
    var t = _sliceInstanceProperty2((_context34 = {}.toString.call(r))).call(
      _context34,
      8,
      -1
    );
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? _Array$from(r)
        : 'Arguments' === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(r, a)
        : void 0
    );
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function ownKeys(e, r) {
  var t = _Object$keys2(e);
  if (_Object$getOwnPropertySymbols) {
    var o = _Object$getOwnPropertySymbols(e);
    r &&
      (o = _filterInstanceProperty2(o).call(o, function (r) {
        return _Object$getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var _context32, _context33;
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? _forEachInstanceProperty2((_context32 = ownKeys(Object(t), !0))).call(
          _context32,
          function (r) {
            (0, _defineProperty3['default'])(e, r, t[r]);
          }
        )
      : _Object$getOwnPropertyDescriptors
      ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t))
      : _forEachInstanceProperty2((_context33 = ownKeys(Object(t)))).call(
          _context33,
          function (r) {
            _Object$defineProperty2(
              e,
              r,
              _Object$getOwnPropertyDescriptor(t, r)
            );
          }
        );
  }
  return e;
}
!(function (e, t) {
  'object' ==
    (typeof exports === 'undefined'
      ? 'undefined'
      : (0, _typeof2['default'])(exports)) &&
  'object' ==
    (typeof module === 'undefined'
      ? 'undefined'
      : (0, _typeof2['default'])(module))
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' ==
      (typeof exports === 'undefined'
        ? 'undefined'
        : (0, _typeof2['default'])(exports))
    ? (exports.AirDatepicker = t())
    : (e.AirDatepicker = t());
})(void 0, function () {
  return (function () {
    'use strict';

    var e = {
        d: function d(t, i) {
          for (var s in i)
            e.o(i, s) &&
              !e.o(t, s) &&
              (0, _defineProperty2['default'])(t, s, {
                enumerable: !0,
                get: i[s],
              });
        },
        o: function o(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
      },
      t = {};
    e.d(t, {
      default: function _default() {
        return R;
      },
    });
    var i = {
        days: 'days',
        months: 'months',
        years: 'years',
        day: 'day',
        month: 'month',
        year: 'year',
        eventChangeViewDate: 'changeViewDate',
        eventChangeCurrentView: 'changeCurrentView',
        eventChangeFocusDate: 'changeFocusDate',
        eventChangeSelectedDate: 'changeSelectedDate',
        eventChangeTime: 'changeTime',
        eventChangeLastSelectedDate: 'changeLastSelectedDate',
        actionSelectDate: 'selectDate',
        actionUnselectDate: 'unselectDate',
        cssClassWeekend: '-weekend-',
      },
      s = {
        classes: '',
        inline: !1,
        locale: {
          days: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
          ],
          daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
          daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
          ],
          today: 'Сегодня',
          clear: 'Очистить',
          dateFormat: 'dd.MM.yyyy',
          timeFormat: 'HH:mm',
          firstDay: 1,
        },
        startDate: new Date(),
        firstDay: '',
        weekends: [6, 0],
        dateFormat: '',
        altField: '',
        altFieldDateFormat: 'T',
        toggleSelected: !0,
        keyboardNav: !0,
        selectedDates: !1,
        container: '',
        isMobile: !1,
        visible: !1,
        position: 'bottom left',
        offset: 12,
        view: i.days,
        minView: i.days,
        showOtherMonths: !0,
        selectOtherMonths: !0,
        moveToOtherMonthsOnSelect: !0,
        showOtherYears: !0,
        selectOtherYears: !0,
        moveToOtherYearsOnSelect: !0,
        minDate: '',
        maxDate: '',
        disableNavWhenOutOfRange: !0,
        multipleDates: !1,
        multipleDatesSeparator: ', ',
        range: !1,
        dynamicRange: !0,
        buttons: !1,
        monthsField: 'monthsShort',
        showEvent: 'focus',
        autoClose: !1,
        fixedHeight: !1,
        prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
        nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
        navTitles: {
          days: 'MMMM, <i>yyyy</i>',
          months: 'yyyy',
          years: 'yyyy1 - yyyy2',
        },
        timepicker: !1,
        onlyTimepicker: !1,
        dateTimeSeparator: ' ',
        timeFormat: '',
        minHours: 0,
        maxHours: 24,
        minMinutes: 0,
        maxMinutes: 59,
        hoursStep: 1,
        minutesStep: 1,
        onSelect: !1,
        onChangeViewDate: !1,
        onChangeView: !1,
        onRenderCell: !1,
        onShow: !1,
        onHide: !1,
        onClickDayName: !1,
      };
    function a(e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : document;
      return 'string' == typeof e ? t.querySelector(e) : e;
    }
    function n() {
      var _n$classList;
      var _ref =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        _ref$tagName = _ref.tagName,
        e = _ref$tagName === void 0 ? 'div' : _ref$tagName,
        _ref$className = _ref.className,
        t = _ref$className === void 0 ? '' : _ref$className,
        _ref$innerHtml = _ref.innerHtml,
        i = _ref$innerHtml === void 0 ? '' : _ref$innerHtml,
        _ref$id = _ref.id,
        s = _ref$id === void 0 ? '' : _ref$id,
        _ref$attrs = _ref.attrs,
        a = _ref$attrs === void 0 ? {} : _ref$attrs,
        n = document.createElement(e);
      return (
        t &&
          (_n$classList = n.classList).add.apply(
            _n$classList,
            (0, _toConsumableArray2['default'])(t.split(' '))
          ),
        s && (n.id = s),
        i && (n.innerHTML = i),
        a && r(n, a),
        n
      );
    }
    function r(e, t) {
      for (
        var _i = 0, _Object$entries = (0, _entries['default'])(t);
        _i < _Object$entries.length;
        _i++
      ) {
        var _Object$entries$_i = (0, _slicedToArray2['default'])(
            _Object$entries[_i],
            2
          ),
          _i2 = _Object$entries$_i[0],
          _s = _Object$entries$_i[1];
        void 0 !== _s && e.setAttribute(_i2, _s);
      }
      return e;
    }
    function o(e) {
      return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
    }
    function h(e) {
      var t = e.getHours(),
        _l = l(t),
        i = _l.hours,
        s = _l.dayPeriod;
      return {
        year: e.getFullYear(),
        month: e.getMonth(),
        fullMonth:
          e.getMonth() + 1 < 10 ? '0' + (e.getMonth() + 1) : e.getMonth() + 1,
        date: e.getDate(),
        fullDate: e.getDate() < 10 ? '0' + e.getDate() : e.getDate(),
        day: e.getDay(),
        hours: t,
        fullHours: d(t),
        hours12: i,
        dayPeriod: s,
        fullHours12: d(i),
        minutes: e.getMinutes(),
        fullMinutes:
          e.getMinutes() < 10 ? '0' + e.getMinutes() : e.getMinutes(),
      };
    }
    function l(e) {
      return {
        dayPeriod: e > 11 ? 'pm' : 'am',
        hours: e % 12 == 0 ? 12 : e % 12,
      };
    }
    function d(e) {
      return e < 10 ? '0' + e : e;
    }
    function c(e) {
      var t = 10 * Math.floor(e.getFullYear() / 10);
      return [t, t + 9];
    }
    function u() {
      var e = [];
      for (var t = arguments.length, i = new Array(t), s = 0; s < t; s++)
        i[s] = arguments[s];
      return (
        (0, _forEach['default'])(i).call(i, function (t) {
          if ('object' == (0, _typeof2['default'])(t))
            for (var _i3 in t) t[_i3] && e.push(_i3);
          else t && e.push(t);
        }),
        e.join(' ')
      );
    }
    function p(e, t) {
      var s =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.days;
      if (!e || !t) return !1;
      var a = h(e),
        n = h(t);
      return (0,
      _defineProperty3[
        'default'
      ])((0, _defineProperty3['default'])((0, _defineProperty3['default'])({}, i.days, a.date === n.date && a.month === n.month && a.year === n.year), i.months, a.month === n.month && a.year === n.year), i.years, a.year === n.year)[s];
    }
    function m(e, t, i) {
      var s = g(e, !1).getTime(),
        a = g(t, !1).getTime();
      return i ? s >= a : s > a;
    }
    function v(e, t) {
      return !m(e, t, !0);
    }
    function g(e) {
      var t =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        i = new Date(e.getTime());
      return (
        'boolean' != typeof t ||
          t ||
          (function (e) {
            e.setHours(0, 0, 0, 0);
          })(i),
        i
      );
    }
    function D(e, t, i) {
      e.length
        ? (0, _forEach['default'])(e).call(e, function (e) {
            e.addEventListener(t, i);
          })
        : e.addEventListener(t, i);
    }
    function y(e, t) {
      return (
        !(!e || e === document || e instanceof DocumentFragment) &&
        (e.matches(t) ? e : y(e.parentNode, t))
      );
    }
    function f(e, t, i) {
      return e > i ? i : e < t ? t : e;
    }
    function w(e) {
      var _context;
      for (
        var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1;
        s < t;
        s++
      )
        i[s - 1] = arguments[s];
      return (
        (0, _forEach['default'])(
          (_context = (0, _filter['default'])(i).call(i, function (e) {
            return e;
          }))
        ).call(_context, function (t) {
          for (
            var _i4 = 0, _Object$entries3 = (0, _entries['default'])(t);
            _i4 < _Object$entries3.length;
            _i4++
          ) {
            var _Object$entries3$_i = (0, _slicedToArray2['default'])(
                _Object$entries3[_i4],
                2
              ),
              _i5 = _Object$entries3$_i[0],
              _s2 = _Object$entries3$_i[1];
            if (void 0 !== _s2 && '[object Object]' === _s2.toString()) {
              var _t = void 0 !== e[_i5] ? e[_i5].toString() : void 0,
                _a = _s2.toString(),
                _n = (0, _isArray['default'])(_s2) ? [] : {};
              (e[_i5] = e[_i5] ? (_t !== _a ? _n : e[_i5]) : _n),
                w(e[_i5], _s2);
            } else e[_i5] = _s2;
          }
        }),
        e
      );
    }
    function b(e) {
      var t = e;
      return (
        e instanceof Date ||
          ('string' == typeof e &&
            /^\d{4}-\d{2}-\d{2}$/.test(e) &&
            (e += 'T00:00:00'),
          (t = new Date(e))),
        isNaN(t.getTime()) &&
          (console.log(
            'Unable to convert value "'.concat(e, '" to Date object')
          ),
          (t = !1)),
        t
      );
    }
    function k(e) {
      var t = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
      return new RegExp('(^|>|' + t + ')(' + e + ')($|<|' + t + ')', 'g');
    }
    function $(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var C = /*#__PURE__*/ (function () {
      function C() {
        var _this = this,
          _context2;
        (0, _classCallCheck2['default'])(this, C);
        var _ref2 =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = _ref2.type,
          t = _ref2.date,
          i = _ref2.dp,
          s = _ref2.opts,
          a = _ref2.body;
        $(this, 'focus', function () {
          _this.$cell.classList.add('-focus-'), (_this.focused = !0);
        }),
          $(this, 'removeFocus', function () {
            _this.$cell.classList.remove('-focus-'), (_this.focused = !1);
          }),
          $(this, 'select', function () {
            _this.$cell.classList.add('-selected-'), (_this.selected = !0);
          }),
          $(this, 'removeSelect', function () {
            _this.$cell.classList.remove(
              '-selected-',
              '-range-from-',
              '-range-to-'
            ),
              (_this.selected = !1);
          }),
          $(this, 'onChangeSelectedDate', function () {
            _this.isDisabled ||
              (_this._handleSelectedStatus(),
              _this.opts.range && _this._handleRangeStatus());
          }),
          $(this, 'onChangeFocusDate', function (e) {
            if (!e) return void (_this.focused && _this.removeFocus());
            var t = p(e, _this.date, _this.type);
            t ? _this.focus() : !t && _this.focused && _this.removeFocus(),
              _this.opts.range && _this._handleRangeStatus();
          }),
          $(this, 'render', function () {
            return (
              (_this.$cell.innerHTML = _this._getHtml()),
              _this._handleClasses(),
              _this.$cell
            );
          }),
          (this.type = e),
          (this.singleType = (0, _slice['default'])(
            (_context2 = this.type)
          ).call(_context2, 0, -1)),
          (this.date = t),
          (this.dp = i),
          (this.opts = s),
          (this.body = a),
          (this.customData = !1),
          this.init();
      }
      return (0, _createClass2['default'])(C, [
        {
          key: 'init',
          value: function init() {
            var e;
            var t = this.opts.onRenderCell;
            t &&
              (this.customData = t({
                date: this.date,
                cellType: this.singleType,
                datepicker: this.dp,
              })),
              this._createElement(),
              this._bindDatepickerEvents(),
              null !== (e = this.customData) &&
                void 0 !== e &&
                e.disabled &&
                this.dp.disableDate(this.date);
          },
        },
        {
          key: '_bindDatepickerEvents',
          value: function _bindDatepickerEvents() {
            this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate),
              this.dp.on(i.eventChangeFocusDate, this.onChangeFocusDate);
          },
        },
        {
          key: 'unbindDatepickerEvents',
          value: function unbindDatepickerEvents() {
            this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate),
              this.dp.off(i.eventChangeFocusDate, this.onChangeFocusDate);
          },
        },
        {
          key: '_createElement',
          value: function _createElement() {
            var e;
            var _h = h(this.date),
              t = _h.year,
              i = _h.month,
              s = _h.date,
              a =
                (null === (e = this.customData) || void 0 === e
                  ? void 0
                  : e.attrs) || {};
            (this.$cell = n({
              attrs: _objectSpread(
                {
                  'data-year': t,
                  'data-month': i,
                  'data-date': s,
                },
                a
              ),
            })),
              (this.$cell.adpCell = this);
          },
        },
        {
          key: '_getClassName',
          value: function _getClassName() {
            var e;
            var t = new Date(),
              _this$opts = this.opts,
              s = _this$opts.selectOtherMonths,
              a = _this$opts.selectOtherYears,
              _this$dp = this.dp,
              n = _this$dp.minDate,
              r = _this$dp.maxDate,
              o = _this$dp.isDateDisabled,
              _h2 = h(this.date),
              l = _h2.day,
              d = this._isOutOfMinMaxRange(),
              c = o(this.date),
              m = u('air-datepicker-cell', '-'.concat(this.singleType, '-'), {
                '-current-': p(t, this.date, this.type),
                '-min-date-': n && p(n, this.date, this.type),
                '-max-date-': r && p(r, this.date, this.type),
              }),
              v = '';
            switch (this.type) {
              case i.days:
                v = u({
                  '-weekend-': this.dp.isWeekend(l),
                  '-other-month-': this.isOtherMonth,
                  '-disabled-': (this.isOtherMonth && !s) || d || c,
                });
                break;
              case i.months:
                v = u({
                  '-disabled-': d,
                });
                break;
              case i.years:
                v = u({
                  '-other-decade-': this.isOtherDecade,
                  '-disabled-': d || (this.isOtherDecade && !a),
                });
            }
            return u(
              m,
              v,
              null === (e = this.customData) || void 0 === e
                ? void 0
                : e.classes
            ).split(' ');
          },
        },
        {
          key: '_getHtml',
          value: function _getHtml() {
            var e;
            var _h3 = h(this.date),
              t = _h3.year,
              s = _h3.month,
              a = _h3.date,
              _this$opts2 = this.opts,
              n = _this$opts2.showOtherMonths,
              r = _this$opts2.showOtherYears;
            if (null !== (e = this.customData) && void 0 !== e && e.html)
              return this.customData.html;
            switch (this.type) {
              case i.days:
                return !n && this.isOtherMonth ? '' : a;
              case i.months:
                return this.dp.locale[this.opts.monthsField][s];
              case i.years:
                return !r && this.isOtherDecade ? '' : t;
            }
          },
        },
        {
          key: '_isOutOfMinMaxRange',
          value: function _isOutOfMinMaxRange() {
            var _this$dp2 = this.dp,
              e = _this$dp2.minDate,
              t = _this$dp2.maxDate,
              s = this.type,
              a = this.date,
              _h4 = h(a),
              n = _h4.month,
              r = _h4.year,
              o = _h4.date,
              l = s === i.days,
              d = s === i.years,
              c = !!e && new Date(r, d ? e.getMonth() : n, l ? o : e.getDate()),
              u = !!t && new Date(r, d ? t.getMonth() : n, l ? o : t.getDate());
            return e && t
              ? v(c, e) || m(u, t)
              : e
              ? v(c, e)
              : t
              ? m(u, t)
              : void 0;
          },
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.unbindDatepickerEvents();
          },
        },
        {
          key: '_handleRangeStatus',
          value: function _handleRangeStatus() {
            var _this$$cell$classList;
            var _this$dp3 = this.dp,
              e = _this$dp3.selectedDates,
              t = _this$dp3.focusDate,
              i = _this$dp3.rangeDateTo,
              s = _this$dp3.rangeDateFrom,
              a = e.length;
            if (!a) return;
            var n = s,
              r = i;
            if (1 === a && t) {
              var _i6 = m(t, e[0]);
              (n = _i6 ? e[0] : t), (r = _i6 ? t : e[0]);
            }
            var o = u({
              '-in-range-':
                n &&
                r &&
                ((h = this.date), (l = n), (d = r), m(h, l) && v(h, d)),
              '-range-from-': n && p(this.date, n, this.type),
              '-range-to-': r && p(this.date, r, this.type),
            });
            var h, l, d;
            this.$cell.classList.remove(
              '-range-from-',
              '-range-to-',
              '-in-range-'
            ),
              o &&
                (_this$$cell$classList = this.$cell.classList).add.apply(
                  _this$$cell$classList,
                  (0, _toConsumableArray2['default'])(o.split(' '))
                );
          },
        },
        {
          key: '_handleSelectedStatus',
          value: function _handleSelectedStatus() {
            var e = this.dp._checkIfDateIsSelected(this.date, this.type);
            e ? this.select() : !e && this.selected && this.removeSelect();
          },
        },
        {
          key: '_handleInitialFocusStatus',
          value: function _handleInitialFocusStatus() {
            p(this.dp.focusDate, this.date, this.type) && this.focus();
          },
        },
        {
          key: '_handleClasses',
          value: function _handleClasses() {
            var _this$$cell$classList2;
            this.$cell.setAttribute('class', ''),
              this._handleInitialFocusStatus(),
              this.dp.hasSelectedDates &&
                (this._handleSelectedStatus(),
                this.dp.opts.range && this._handleRangeStatus()),
              (_this$$cell$classList2 = this.$cell.classList).add.apply(
                _this$$cell$classList2,
                (0, _toConsumableArray2['default'])(this._getClassName())
              );
          },
        },
        {
          key: 'isDisabled',
          get: function get() {
            return this.$cell.matches('.-disabled-');
          },
        },
        {
          key: 'isOtherMonth',
          get: function get() {
            return this.dp.isOtherMonth(this.date);
          },
        },
        {
          key: 'isOtherDecade',
          get: function get() {
            return this.dp.isOtherDecade(this.date);
          },
        },
      ]);
    })();
    function _(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var M = (0, _defineProperty3['default'])(
      (0, _defineProperty3['default'])(
        (0, _defineProperty3['default'])(
          {},
          i.days,
          '<div class="air-datepicker-body--day-names"></div><div class="air-datepicker-body--cells -'.concat(
            i.days,
            '-"></div>'
          )
        ),
        i.months,
        '<div class="air-datepicker-body--cells -'.concat(i.months, '-"></div>')
      ),
      i.years,
      '<div class="air-datepicker-body--cells -'.concat(i.years, '-"></div>')
    );
    var S = '.air-datepicker-cell';
    var T = /*#__PURE__*/ (function () {
      function T(e) {
        var _this2 = this;
        (0, _classCallCheck2['default'])(this, T);
        var t = e.dp,
          s = e.type,
          a = e.opts;
        _(this, 'handleClick', function (e) {
          var t = e.target.closest(S).adpCell;
          if (t.isDisabled) return;
          if (!_this2.dp.isMinViewReached) return void _this2.dp.down();
          var i = _this2.dp._checkIfDateIsSelected(t.date, t.type);
          i
            ? _this2.dp._handleAlreadySelectedDates(i, t.date)
            : _this2.dp.selectDate(t.date);
        }),
          _(this, 'handleDayNameClick', function (e) {
            var t = e.target.getAttribute('data-day-index');
            _this2.opts.onClickDayName({
              dayIndex: Number(t),
              datepicker: _this2.dp,
            });
          }),
          _(this, 'onChangeCurrentView', function (e) {
            e !== _this2.type
              ? _this2.hide()
              : (_this2.show(), _this2.render());
          }),
          _(this, 'onMouseOverCell', function (e) {
            var t = y(e.target, S);
            _this2.dp.setFocusDate(!!t && t.adpCell.date);
          }),
          _(this, 'onMouseOutCell', function () {
            _this2.dp.setFocusDate(!1);
          }),
          _(this, 'onClickBody', function (e) {
            var t = _this2.opts.onClickDayName,
              i = e.target;
            i.closest(S) && _this2.handleClick(e),
              t &&
                i.closest('.air-datepicker-body--day-name') &&
                _this2.handleDayNameClick(e);
          }),
          _(this, 'onMouseDown', function (e) {
            _this2.pressed = !0;
            var t = y(e.target, S),
              i = t && t.adpCell;
            p(i.date, _this2.dp.rangeDateFrom) &&
              (_this2.rangeFromFocused = !0),
              p(i.date, _this2.dp.rangeDateTo) && (_this2.rangeToFocused = !0);
          }),
          _(this, 'onMouseMove', function (e) {
            if (!_this2.pressed || !_this2.dp.isMinViewReached) return;
            e.preventDefault();
            var t = y(e.target, S),
              i = t && t.adpCell,
              _this2$dp = _this2.dp,
              s = _this2$dp.selectedDates,
              a = _this2$dp.rangeDateTo,
              n = _this2$dp.rangeDateFrom;
            if (!i || i.isDisabled) return;
            var r = i.date;
            if (2 === s.length) {
              if (_this2.rangeFromFocused && !m(r, a)) {
                var _h5 = h(n),
                  _e = _h5.hours,
                  _t2 = _h5.minutes;
                r.setHours(_e),
                  r.setMinutes(_t2),
                  (_this2.dp.rangeDateFrom = r),
                  _this2.dp.replaceDate(n, r);
              }
              if (_this2.rangeToFocused && !v(r, n)) {
                var _h6 = h(a),
                  _e2 = _h6.hours,
                  _t3 = _h6.minutes;
                r.setHours(_e2),
                  r.setMinutes(_t3),
                  (_this2.dp.rangeDateTo = r),
                  _this2.dp.replaceDate(a, r);
              }
            }
          }),
          _(this, 'onMouseUp', function () {
            (_this2.pressed = !1),
              (_this2.rangeFromFocused = !1),
              (_this2.rangeToFocused = !1);
          }),
          _(this, 'onChangeViewDate', function (e, t) {
            if (!_this2.isVisible) return;
            var s = c(e),
              a = c(t);
            switch (_this2.dp.currentView) {
              case i.days:
                if (p(e, t, i.months)) return;
                break;
              case i.months:
                if (p(e, t, i.years)) return;
                break;
              case i.years:
                if (s[0] === a[0] && s[1] === a[1]) return;
            }
            _this2.render();
          }),
          _(this, 'render', function () {
            var _context3;
            _this2.destroyCells(),
              _this2._generateCells(),
              (0, _forEach['default'])((_context3 = _this2.cells)).call(
                _context3,
                function (e) {
                  _this2.$cells.appendChild(e.render());
                }
              );
          }),
          (this.dp = t),
          (this.type = s),
          (this.opts = a),
          (this.cells = []),
          (this.$el = ''),
          (this.pressed = !1),
          (this.isVisible = !0),
          this.init();
      }
      return (0, _createClass2['default'])(
        T,
        [
          {
            key: 'init',
            value: function init() {
              this._buildBaseHtml(),
                this.type === i.days && this.renderDayNames(),
                this.render(),
                this._bindEvents(),
                this._bindDatepickerEvents();
            },
          },
          {
            key: '_bindEvents',
            value: function _bindEvents() {
              var _this$opts3 = this.opts,
                e = _this$opts3.range,
                t = _this$opts3.dynamicRange;
              D(this.$el, 'mouseover', this.onMouseOverCell),
                D(this.$el, 'mouseout', this.onMouseOutCell),
                D(this.$el, 'click', this.onClickBody),
                e &&
                  t &&
                  (D(this.$el, 'mousedown', this.onMouseDown),
                  D(this.$el, 'mousemove', this.onMouseMove),
                  D(window.document, 'mouseup', this.onMouseUp));
            },
          },
          {
            key: '_bindDatepickerEvents',
            value: function _bindDatepickerEvents() {
              this.dp.on(i.eventChangeViewDate, this.onChangeViewDate),
                this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView);
            },
          },
          {
            key: '_buildBaseHtml',
            value: function _buildBaseHtml() {
              (this.$el = n({
                className: 'air-datepicker-body -'.concat(this.type, '-'),
                innerHtml: M[this.type],
              })),
                (this.$names = a('.air-datepicker-body--day-names', this.$el)),
                (this.$cells = a('.air-datepicker-body--cells', this.$el));
            },
          },
          {
            key: '_getDayNamesHtml',
            value: function _getDayNamesHtml() {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.dp.locale.firstDay,
                t = '',
                s = this.dp.isWeekend,
                a = this.opts.onClickDayName,
                n = e,
                r = 0;
              for (; r < 7; ) {
                var _context4, _context5;
                var _e3 = n % 7;
                (t += (0, _concat['default'])(
                  (_context4 = (0, _concat['default'])(
                    (_context5 = '<div class="'.concat(
                      u(
                        'air-datepicker-body--day-name',
                        (0, _defineProperty3['default'])(
                          (0, _defineProperty3['default'])(
                            {},
                            i.cssClassWeekend,
                            s(_e3)
                          ),
                          '-clickable-',
                          !!a
                        )
                      ),
                      '" data-day-index=\''
                    ))
                  ).call(_context5, _e3, "'>"))
                ).call(_context4, this.dp.locale.daysMin[_e3], '</div>')),
                  r++,
                  n++;
              }
              return t;
            },
          },
          {
            key: 'renderDayNames',
            value: function renderDayNames() {
              this.$names.innerHTML = this._getDayNamesHtml();
            },
          },
          {
            key: '_generateCell',
            value: function _generateCell(e) {
              var t = this.type,
                i = this.dp,
                s = this.opts;
              return new C({
                type: t,
                dp: i,
                opts: s,
                date: e,
                body: this,
              });
            },
          },
          {
            key: '_generateCells',
            value: function _generateCells() {
              var _this3 = this;
              T.getDatesFunction(this.type)(this.dp, function (e) {
                _this3.cells.push(_this3._generateCell(e));
              });
            },
          },
          {
            key: 'show',
            value: function show() {
              (this.isVisible = !0), this.$el.classList.remove('-hidden-');
            },
          },
          {
            key: 'hide',
            value: function hide() {
              (this.isVisible = !1), this.$el.classList.add('-hidden-');
            },
          },
          {
            key: 'destroyCells',
            value: function destroyCells() {
              var _context6;
              (0, _forEach['default'])((_context6 = this.cells)).call(
                _context6,
                function (e) {
                  return e.destroy();
                }
              ),
                (this.cells = []),
                (this.$cells.innerHTML = '');
            },
          },
          {
            key: 'destroy',
            value: function destroy() {
              this.destroyCells(),
                this.dp.off(i.eventChangeViewDate, this.onChangeViewDate),
                this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView);
            },
          },
        ],
        [
          {
            key: 'getDaysDates',
            value: function getDaysDates(e, t) {
              var i = e.viewDate,
                s = e.opts.fixedHeight,
                a = e.locale.firstDay,
                n = o(i),
                _h7 = h(i),
                r = _h7.year,
                l = _h7.month,
                d = new Date(r, l, 1),
                c = new Date(r, l, n),
                u = d.getDay() - a,
                p = 6 - c.getDay() + a;
              (u = u < 0 ? u + 7 : u), (p = p > 6 ? p - 7 : p);
              var m = (function (e, t) {
                  var _h9 = h(e),
                    i = _h9.year,
                    s = _h9.month,
                    a = _h9.date;
                  return new Date(i, s, a - t);
                })(d, u),
                v = n + u + p,
                g = m.getDate(),
                _h8 = h(m),
                D = _h8.year,
                y = _h8.month,
                f = 0;
              s && (v = 42);
              var w = [];
              for (; f < v; ) {
                var _e4 = new Date(D, y, g + f);
                t && t(_e4), w.push(_e4), f++;
              }
              return w;
            },
          },
          {
            key: 'getMonthsDates',
            value: function getMonthsDates(e, t) {
              var i = e.parsedViewDate.year,
                s = 0,
                a = [];
              for (; s < 12; ) {
                var _e5 = new Date(i, s);
                a.push(_e5), t && t(_e5), s++;
              }
              return a;
            },
          },
          {
            key: 'getYearsDates',
            value: function getYearsDates(e, t) {
              var i = c(e.viewDate),
                s = i[0] - 1,
                a = i[1] + 1,
                n = s,
                r = [];
              for (; n <= a; ) {
                var _e6 = new Date(n, 0);
                r.push(_e6), t && t(_e6), n++;
              }
              return r;
            },
          },
          {
            key: 'getDatesFunction',
            value: function getDatesFunction() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : i.days;
              return (0, _defineProperty3['default'])(
                (0, _defineProperty3['default'])(
                  (0, _defineProperty3['default'])({}, i.days, T.getDaysDates),
                  i.months,
                  T.getMonthsDates
                ),
                i.years,
                T.getYearsDates
              )[e];
            },
          },
        ]
      );
    })();
    function F(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var V = /*#__PURE__*/ (function () {
      function V(e) {
        var _this4 = this;
        (0, _classCallCheck2['default'])(this, V);
        var t = e.dp,
          i = e.opts;
        F(this, 'onClickNav', function (e) {
          var t = y(e.target, '.air-datepicker-nav--action');
          if (!t) return;
          var i = t.dataset.action;
          _this4.dp[i]();
        }),
          F(this, 'onChangeViewDate', function () {
            _this4.render(), _this4._resetNavStatus(), _this4.handleNavStatus();
          }),
          F(this, 'onChangeCurrentView', function () {
            _this4.render(), _this4._resetNavStatus(), _this4.handleNavStatus();
          }),
          F(this, 'onClickNavTitle', function () {
            _this4.dp.isFinalView || _this4.dp.up();
          }),
          F(this, 'update', function () {
            var _this4$opts = _this4.opts,
              e = _this4$opts.prevHtml,
              t = _this4$opts.nextHtml;
            (_this4.$prev.innerHTML = e),
              (_this4.$next.innerHTML = t),
              _this4._resetNavStatus(),
              _this4.render(),
              _this4.handleNavStatus();
          }),
          F(this, 'renderDelay', function () {
            (0, _setTimeout2['default'])(_this4.render);
          }),
          F(this, 'render', function () {
            (_this4.$title.innerHTML = _this4._getTitle()),
              (function (e, t) {
                for (var _i7 in t)
                  t[_i7] ? e.classList.add(_i7) : e.classList.remove(_i7);
              })(_this4.$title, {
                '-disabled-': _this4.dp.isFinalView,
              });
          }),
          (this.dp = t),
          (this.opts = i),
          this.init();
      }
      return (0, _createClass2['default'])(V, [
        {
          key: 'init',
          value: function init() {
            this._createElement(),
              this._buildBaseHtml(),
              this._defineDOM(),
              this.render(),
              this.handleNavStatus(),
              this._bindEvents(),
              this._bindDatepickerEvents();
          },
        },
        {
          key: '_defineDOM',
          value: function _defineDOM() {
            (this.$title = a('.air-datepicker-nav--title', this.$el)),
              (this.$prev = a('[data-action="prev"]', this.$el)),
              (this.$next = a('[data-action="next"]', this.$el));
          },
        },
        {
          key: '_bindEvents',
          value: function _bindEvents() {
            this.$el.addEventListener('click', this.onClickNav),
              this.$title.addEventListener('click', this.onClickNavTitle);
          },
        },
        {
          key: '_bindDatepickerEvents',
          value: function _bindDatepickerEvents() {
            this.dp.on(i.eventChangeViewDate, this.onChangeViewDate),
              this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView),
              this.isNavIsFunction &&
                (this.dp.on(i.eventChangeSelectedDate, this.renderDelay),
                this.dp.opts.timepicker &&
                  this.dp.on(i.eventChangeTime, this.render));
          },
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.dp.off(i.eventChangeViewDate, this.onChangeViewDate),
              this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView),
              this.isNavIsFunction &&
                (this.dp.off(i.eventChangeSelectedDate, this.renderDelay),
                this.dp.opts.timepicker &&
                  this.dp.off(i.eventChangeTime, this.render));
          },
        },
        {
          key: '_createElement',
          value: function _createElement() {
            this.$el = n({
              tagName: 'nav',
              className: 'air-datepicker-nav',
            });
          },
        },
        {
          key: '_getTitle',
          value: function _getTitle() {
            var e = this.dp,
              t = this.opts,
              i = t.navTitles[e.currentView];
            return 'function' == typeof i ? i(e) : e.formatDate(e.viewDate, i);
          },
        },
        {
          key: 'handleNavStatus',
          value: function handleNavStatus() {
            var e = this.opts.disableNavWhenOutOfRange,
              _this$dp4 = this.dp,
              t = _this$dp4.minDate,
              s = _this$dp4.maxDate;
            if ((!t && !s) || !e) return;
            var _this$dp$parsedViewDa = this.dp.parsedViewDate,
              a = _this$dp$parsedViewDa.year,
              n = _this$dp$parsedViewDa.month,
              r = !!t && h(t),
              o = !!s && h(s);
            switch (this.dp.currentView) {
              case i.days:
                t && r.month >= n && r.year >= a && this._disableNav('prev'),
                  s && o.month <= n && o.year <= a && this._disableNav('next');
                break;
              case i.months:
                t && r.year >= a && this._disableNav('prev'),
                  s && o.year <= a && this._disableNav('next');
                break;
              case i.years: {
                var _e7 = c(this.dp.viewDate);
                t && r.year >= _e7[0] && this._disableNav('prev'),
                  s && o.year <= _e7[1] && this._disableNav('next');
                break;
              }
            }
          },
        },
        {
          key: '_disableNav',
          value: function _disableNav(e) {
            a('[data-action="' + e + '"]', this.$el).classList.add(
              '-disabled-'
            );
          },
        },
        {
          key: '_resetNavStatus',
          value: function _resetNavStatus() {
            !(function (e) {
              var _e$classList2;
              for (
                var t = arguments.length,
                  i = new Array(t > 1 ? t - 1 : 0),
                  s = 1;
                s < t;
                s++
              )
                i[s - 1] = arguments[s];
              e.length
                ? (0, _forEach['default'])(e).call(e, function (e) {
                    var _e$classList;
                    (_e$classList = e.classList).remove.apply(_e$classList, i);
                  })
                : (_e$classList2 = e.classList).remove.apply(_e$classList2, i);
            })(
              this.$el.querySelectorAll('.air-datepicker-nav--action'),
              '-disabled-'
            );
          },
        },
        {
          key: '_buildBaseHtml',
          value: function _buildBaseHtml() {
            var _context7;
            var _this$opts4 = this.opts,
              e = _this$opts4.prevHtml,
              t = _this$opts4.nextHtml;
            this.$el.innerHTML = (0, _concat['default'])(
              (_context7 =
                '<div class="air-datepicker-nav--action" data-action="prev">'.concat(
                  e,
                  '</div><div class="air-datepicker-nav--title"></div><div class="air-datepicker-nav--action" data-action="next">'
                ))
            ).call(_context7, t, '</div>');
          },
        },
        {
          key: 'isNavIsFunction',
          get: function get() {
            var _context8;
            var e = this.opts.navTitles;
            return (0, _find['default'])(
              (_context8 = (0, _keys['default'])(e))
            ).call(_context8, function (t) {
              return 'function' == typeof e[t];
            });
          },
        },
      ]);
    })();
    var x = {
      today: {
        content: function content(e) {
          return e.locale.today;
        },
        onClick: function onClick(e) {
          return e.setViewDate(new Date());
        },
      },
      clear: {
        content: function content(e) {
          return e.locale.clear;
        },
        onClick: function onClick(e) {
          return e.clear();
        },
      },
    };
    var H = /*#__PURE__*/ (function () {
      function H(e) {
        (0, _classCallCheck2['default'])(this, H);
        var t = e.dp,
          i = e.opts;
        (this.dp = t), (this.opts = i), this.init();
      }
      return (0, _createClass2['default'])(H, [
        {
          key: 'init',
          value: function init() {
            this.createElement(), this.render();
          },
        },
        {
          key: 'createElement',
          value: function createElement() {
            this.$el = n({
              className: 'air-datepicker-buttons',
            });
          },
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.$el.parentNode.removeChild(this.$el);
          },
        },
        {
          key: 'clearHtml',
          value: function clearHtml() {
            return (this.$el.innerHTML = ''), this;
          },
        },
        {
          key: 'generateButtons',
          value: function generateButtons() {
            var _this5 = this;
            var e = this.opts.buttons;
            (0, _isArray['default'])(e) || (e = [e]),
              (0, _forEach['default'])(e).call(e, function (e) {
                var t = e;
                'string' == typeof e && x[e] && (t = x[e]);
                var i = _this5.createButton(t);
                t.onClick && _this5.attachEventToButton(i, t.onClick),
                  _this5.$el.appendChild(i);
              });
          },
        },
        {
          key: 'attachEventToButton',
          value: function attachEventToButton(e, t) {
            var _this6 = this;
            e.addEventListener('click', function () {
              t(_this6.dp);
            });
          },
        },
        {
          key: 'createButton',
          value: function createButton(e) {
            var t = e.content,
              i = e.className,
              _e$tagName = e.tagName,
              s = _e$tagName === void 0 ? 'button' : _e$tagName,
              _e$attrs = e.attrs,
              a = _e$attrs === void 0 ? {} : _e$attrs;
            return n({
              tagName: s,
              innerHtml: "<span tabindex='-1'>".concat(
                'function' == typeof t ? t(this.dp) : t,
                '</span>'
              ),
              className: u('air-datepicker-button', i),
              attrs: a,
            });
          },
        },
        {
          key: 'render',
          value: function render() {
            this.generateButtons();
          },
        },
      ]);
    })();
    function E(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var L = /*#__PURE__*/ (function () {
      function L() {
        var _this7 = this;
        (0, _classCallCheck2['default'])(this, L);
        var _ref3 =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = _ref3.opts,
          t = _ref3.dp;
        E(this, 'toggleTimepickerIsActive', function (e) {
          _this7.dp.timepickerIsActive = e;
        }),
          E(this, 'onChangeSelectedDate', function (e) {
            var t = e.date,
              _e$updateTime = e.updateTime,
              i = _e$updateTime === void 0 ? !1 : _e$updateTime;
            t &&
              (_this7.setMinMaxTime(t),
              _this7.setCurrentTime(!!i && t),
              _this7.addTimeToDate(t));
          }),
          E(this, 'onChangeLastSelectedDate', function (e) {
            e && (_this7.setTime(e), _this7.render());
          }),
          E(this, 'onChangeInputRange', function (e) {
            var t = e.target;
            (_this7[t.getAttribute('name')] = t.value),
              _this7.updateText(),
              _this7.dp.trigger(i.eventChangeTime, {
                hours: _this7.hours,
                minutes: _this7.minutes,
              });
          }),
          E(this, 'onMouseEnterLeave', function (e) {
            var t = e.target.getAttribute('name'),
              i = _this7.$minutesText;
            'hours' === t && (i = _this7.$hoursText),
              i.classList.toggle('-focus-');
          }),
          E(this, 'onFocus', function () {
            _this7.toggleTimepickerIsActive(!0);
          }),
          E(this, 'onBlur', function () {
            _this7.toggleTimepickerIsActive(!1);
          }),
          (this.opts = e),
          (this.dp = t);
        var s = this.dp.locale.timeFormat;
        s && (s.match(k('h')) || s.match(k('hh'))) && (this.ampm = !0),
          this.init();
      }
      return (0, _createClass2['default'])(L, [
        {
          key: 'init',
          value: function init() {
            this.setTime(this.dp.lastSelectedDate || this.dp.viewDate),
              this.createElement(),
              this.buildHtml(),
              this.defineDOM(),
              this.render(),
              this.bindDatepickerEvents(),
              this.bindDOMEvents();
          },
        },
        {
          key: 'bindDatepickerEvents',
          value: function bindDatepickerEvents() {
            this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate),
              this.dp.on(
                i.eventChangeLastSelectedDate,
                this.onChangeLastSelectedDate
              );
          },
        },
        {
          key: 'bindDOMEvents',
          value: function bindDOMEvents() {
            var e = 'input';
            navigator.userAgent.match(/trident/gi) && (e = 'change'),
              D(this.$ranges, e, this.onChangeInputRange),
              D(this.$ranges, 'mouseenter', this.onMouseEnterLeave),
              D(this.$ranges, 'mouseleave', this.onMouseEnterLeave),
              D(this.$ranges, 'focus', this.onFocus),
              D(this.$ranges, 'mousedown', this.onFocus),
              D(this.$ranges, 'blur', this.onBlur);
          },
        },
        {
          key: 'createElement',
          value: function createElement() {
            this.$el = n({
              className: u('air-datepicker-time', {
                '-am-pm-': this.dp.ampm,
              }),
            });
          },
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate),
              this.dp.off(
                i.eventChangeLastSelectedDate,
                this.onChangeLastSelectedDate
              ),
              this.$el.parentNode.removeChild(this.$el);
          },
        },
        {
          key: 'buildHtml',
          value: function buildHtml() {
            var _context9,
              _context0,
              _context1,
              _context10,
              _context11,
              _context12,
              _context13;
            var e = this.ampm,
              t = this.hours,
              i = this.displayHours,
              s = this.minutes,
              a = this.minHours,
              n = this.minMinutes,
              r = this.maxHours,
              o = this.maxMinutes,
              h = this.dayPeriod,
              _this$opts5 = this.opts,
              l = _this$opts5.hoursStep,
              c = _this$opts5.minutesStep;
            this.$el.innerHTML =
              (0, _concat['default'])(
                (_context9 =
                  '<div class="air-datepicker-time--current">   <span class="air-datepicker-time--current-hours">'.concat(
                    d(i),
                    '</span>   <span class="air-datepicker-time--current-colon">:</span>   <span class="air-datepicker-time--current-minutes">'
                  ))
              ).call(_context9, d(s), '</span>   ') +
              (e
                ? "<span class='air-datepicker-time--current-ampm'>".concat(
                    h,
                    '</span>'
                  )
                : '') +
              '</div><div class="air-datepicker-time--sliders">   <div class="air-datepicker-time--row">' +
              (0, _concat['default'])(
                (_context0 = (0, _concat['default'])(
                  (_context1 = (0, _concat['default'])(
                    (_context10 =
                      '      <input type="range" name="hours" value="'.concat(
                        t,
                        '" min="'
                      ))
                  ).call(_context10, a, '" max="'))
                ).call(_context1, r, '" step="'))
              ).call(
                _context0,
                l,
                '"/>   </div>   <div class="air-datepicker-time--row">'
              ) +
              (0, _concat['default'])(
                (_context11 = (0, _concat['default'])(
                  (_context12 = (0, _concat['default'])(
                    (_context13 =
                      '      <input type="range" name="minutes" value="'.concat(
                        s,
                        '" min="'
                      ))
                  ).call(_context13, n, '" max="'))
                ).call(_context12, o, '" step="'))
              ).call(_context11, c, '"/>   </div></div>');
          },
        },
        {
          key: 'defineDOM',
          value: function defineDOM() {
            var _this8 = this;
            var e = function e(_e8) {
              return a(_e8, _this8.$el);
            };
            (this.$ranges = this.$el.querySelectorAll('[type="range"]')),
              (this.$hours = e('[name="hours"]')),
              (this.$minutes = e('[name="minutes"]')),
              (this.$hoursText = e('.air-datepicker-time--current-hours')),
              (this.$minutesText = e('.air-datepicker-time--current-minutes')),
              (this.$ampm = e('.air-datepicker-time--current-ampm'));
          },
        },
        {
          key: 'setTime',
          value: function setTime(e) {
            this.setMinMaxTime(e), this.setCurrentTime(e);
          },
        },
        {
          key: 'addTimeToDate',
          value: function addTimeToDate(e) {
            e && (e.setHours(this.hours), e.setMinutes(this.minutes));
          },
        },
        {
          key: 'setMinMaxTime',
          value: function setMinMaxTime(e) {
            if ((this.setMinMaxTimeFromOptions(), e)) {
              var _this$dp5 = this.dp,
                _t4 = _this$dp5.minDate,
                _i8 = _this$dp5.maxDate;
              _t4 && p(e, _t4) && this.setMinTimeFromMinDate(_t4),
                _i8 && p(e, _i8) && this.setMaxTimeFromMaxDate(_i8);
            }
          },
        },
        {
          key: 'setCurrentTime',
          value: function setCurrentTime(e) {
            var _ref4 = e ? h(e) : this,
              t = _ref4.hours,
              i = _ref4.minutes;
            (this.hours = f(t, this.minHours, this.maxHours)),
              (this.minutes = f(i, this.minMinutes, this.maxMinutes));
          },
        },
        {
          key: 'setMinMaxTimeFromOptions',
          value: function setMinMaxTimeFromOptions() {
            var _this$opts6 = this.opts,
              e = _this$opts6.minHours,
              t = _this$opts6.minMinutes,
              i = _this$opts6.maxHours,
              s = _this$opts6.maxMinutes;
            (this.minHours = f(e, 0, 23)),
              (this.minMinutes = f(t, 0, 59)),
              (this.maxHours = f(i, 0, 23)),
              (this.maxMinutes = f(s, 0, 59));
          },
        },
        {
          key: 'setMinTimeFromMinDate',
          value: function setMinTimeFromMinDate(e) {
            var t = this.dp.lastSelectedDate;
            (this.minHours = e.getHours()),
              t && t.getHours() > e.getHours()
                ? (this.minMinutes = this.opts.minMinutes)
                : (this.minMinutes = e.getMinutes());
          },
        },
        {
          key: 'setMaxTimeFromMaxDate',
          value: function setMaxTimeFromMaxDate(e) {
            var t = this.dp.lastSelectedDate;
            (this.maxHours = e.getHours()),
              t && t.getHours() < e.getHours()
                ? (this.maxMinutes = this.opts.maxMinutes)
                : (this.maxMinutes = e.getMinutes());
          },
        },
        {
          key: 'updateSliders',
          value: function updateSliders() {
            (r(this.$hours, {
              min: this.minHours,
              max: this.maxHours,
            }).value = this.hours),
              (r(this.$minutes, {
                min: this.minMinutes,
                max: this.maxMinutes,
              }).value = this.minutes);
          },
        },
        {
          key: 'updateText',
          value: function updateText() {
            (this.$hoursText.innerHTML = d(this.displayHours)),
              (this.$minutesText.innerHTML = d(this.minutes)),
              this.ampm && (this.$ampm.innerHTML = this.dayPeriod);
          },
        },
        {
          key: 'hours',
          get: function get() {
            return this._hours;
          },
          set: function set(e) {
            this._hours = e;
            var _l2 = l(e),
              t = _l2.hours,
              i = _l2.dayPeriod;
            (this.displayHours = this.ampm ? t : e), (this.dayPeriod = i);
          },
        },
        {
          key: 'render',
          value: function render() {
            this.updateSliders(), this.updateText();
          },
        },
      ]);
    })();
    function O(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var A = /*#__PURE__*/ (function () {
      function A(e) {
        var _this9 = this;
        (0, _classCallCheck2['default'])(this, A);
        var t = e.dp,
          i = e.opts;
        O(this, 'pressedKeys', new _set['default']()),
          O(
            this,
            'hotKeys',
            new _map['default']([
              [
                [
                  ['Control', 'ArrowRight'],
                  ['Control', 'ArrowUp'],
                ],
                function (e) {
                  return e.month++;
                },
              ],
              [
                [
                  ['Control', 'ArrowLeft'],
                  ['Control', 'ArrowDown'],
                ],
                function (e) {
                  return e.month--;
                },
              ],
              [
                [
                  ['Shift', 'ArrowRight'],
                  ['Shift', 'ArrowUp'],
                ],
                function (e) {
                  return e.year++;
                },
              ],
              [
                [
                  ['Shift', 'ArrowLeft'],
                  ['Shift', 'ArrowDown'],
                ],
                function (e) {
                  return e.year--;
                },
              ],
              [
                [
                  ['Alt', 'ArrowRight'],
                  ['Alt', 'ArrowUp'],
                ],
                function (e) {
                  return (e.year += 10);
                },
              ],
              [
                [
                  ['Alt', 'ArrowLeft'],
                  ['Alt', 'ArrowDown'],
                ],
                function (e) {
                  return (e.year -= 10);
                },
              ],
              [
                ['Control', 'Shift', 'ArrowUp'],
                function (e, t) {
                  return t.up();
                },
              ],
            ])
          ),
          O(this, 'handleHotKey', function (e) {
            var t = _this9.hotKeys.get(e),
              i = h(_this9.getInitialFocusDate());
            t(i, _this9.dp);
            var s = i.year,
              a = i.month,
              n = i.date,
              r = o(new Date(s, a));
            r < n && (n = r);
            var l = _this9.dp.getClampedDate(new Date(s, a, n));
            _this9.dp.setFocusDate(l, {
              viewDateTransition: !0,
            });
          }),
          O(this, 'isHotKeyPressed', function () {
            var e = !1,
              t = _this9.pressedKeys.size,
              i = function i(e) {
                return _this9.pressedKeys.has(e);
              };
            var _iterator = _createForOfIteratorHelper(_this9.hotKeys),
              _step;
            try {
              var _loop = function _loop() {
                  var _step$value = (0, _slicedToArray2['default'])(
                      _step.value,
                      1
                    ),
                    s = _step$value[0];
                  if (e) return 0; // break
                  if ((0, _isArray['default'])(s[0]))
                    (0, _forEach['default'])(s).call(s, function (a) {
                      e ||
                        t !== a.length ||
                        (e = (0, _every['default'])(a).call(a, i) && s);
                    });
                  else {
                    if (t !== s.length) return 1; // continue
                    e = (0, _every['default'])(s).call(s, i) && s;
                  }
                },
                _ret;
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                _ret = _loop();
                if (_ret === 0) break;
                if (_ret === 1) continue;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return e;
          }),
          O(this, 'isArrow', function (e) {
            return e >= 37 && e <= 40;
          }),
          O(this, 'onKeyDown', function (e) {
            var t = e.key,
              i = e.which,
              s = _this9.dp,
              a = _this9.dp.focusDate,
              n = _this9.opts;
            _this9.registerKey(t);
            var r = _this9.isHotKeyPressed();
            if (r) return e.preventDefault(), void _this9.handleHotKey(r);
            if (_this9.isArrow(i))
              return e.preventDefault(), void _this9.focusNextCell(t);
            if ('Enter' === t) {
              if (s.currentView !== n.minView) return void s.down();
              if (a) {
                var _e9 = s._checkIfDateIsSelected(a);
                return void (_e9
                  ? s._handleAlreadySelectedDates(_e9, a)
                  : s.selectDate(a));
              }
            }
            'Escape' === t && _this9.dp.hide();
          }),
          O(this, 'onKeyUp', function (e) {
            _this9.removeKey(e.key);
          }),
          (this.dp = t),
          (this.opts = i),
          this.init();
      }
      return (0, _createClass2['default'])(A, [
        {
          key: 'init',
          value: function init() {
            this.bindKeyboardEvents();
          },
        },
        {
          key: 'bindKeyboardEvents',
          value: function bindKeyboardEvents() {
            var e = this.dp.$el;
            e.addEventListener('keydown', this.onKeyDown),
              e.addEventListener('keyup', this.onKeyUp);
          },
        },
        {
          key: 'destroy',
          value: function destroy() {
            var e = this.dp.$el;
            e.removeEventListener('keydown', this.onKeyDown),
              e.removeEventListener('keyup', this.onKeyUp),
              (this.hotKeys = null),
              (this.pressedKeys = null);
          },
        },
        {
          key: 'getInitialFocusDate',
          value: function getInitialFocusDate() {
            var _this$dp6 = this.dp,
              e = _this$dp6.focusDate,
              t = _this$dp6.currentView,
              s = _this$dp6.selectedDates,
              _this$dp6$parsedViewD = _this$dp6.parsedViewDate,
              a = _this$dp6$parsedViewD.year,
              n = _this$dp6$parsedViewD.month,
              r = e || s[s.length - 1];
            if (!r)
              switch (t) {
                case i.days:
                  r = new Date(a, n, new Date().getDate());
                  break;
                case i.months:
                  r = new Date(a, n, 1);
                  break;
                case i.years:
                  r = new Date(a, 0, 1);
              }
            return r;
          },
        },
        {
          key: 'focusNextCell',
          value: function focusNextCell(e) {
            var t = this.getInitialFocusDate(),
              s = this.dp.currentView,
              a = i.days,
              n = i.months,
              r = i.years,
              o = h(t),
              l = o.year,
              d = o.month,
              c = o.date;
            switch (e) {
              case 'ArrowLeft':
                s === a && (c -= 1), s === n && (d -= 1), s === r && (l -= 1);
                break;
              case 'ArrowUp':
                s === a && (c -= 7), s === n && (d -= 3), s === r && (l -= 4);
                break;
              case 'ArrowRight':
                s === a && (c += 1), s === n && (d += 1), s === r && (l += 1);
                break;
              case 'ArrowDown':
                s === a && (c += 7), s === n && (d += 3), s === r && (l += 4);
            }
            var u = this.dp.getClampedDate(new Date(l, d, c));
            this.dp.setFocusDate(u, {
              viewDateTransition: !0,
            });
          },
        },
        {
          key: 'registerKey',
          value: function registerKey(e) {
            this.pressedKeys.add(e);
          },
        },
        {
          key: 'removeKey',
          value: function removeKey(e) {
            this.pressedKeys['delete'](e);
          },
        },
      ]);
    })();
    var N = {
      on: function on(e, t) {
        this.__events || (this.__events = {}),
          this.__events[e]
            ? this.__events[e].push(t)
            : (this.__events[e] = [t]);
      },
      off: function off(e, t) {
        var _context14;
        this.__events &&
          this.__events[e] &&
          (this.__events[e] = (0, _filter['default'])(
            (_context14 = this.__events[e])
          ).call(_context14, function (e) {
            return e !== t;
          }));
      },
      removeAllEvents: function removeAllEvents() {
        this.__events = {};
      },
      trigger: function trigger(e) {
        var _context15;
        for (
          var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1;
          s < t;
          s++
        )
          i[s - 1] = arguments[s];
        this.__events &&
          this.__events[e] &&
          (0, _forEach['default'])((_context15 = this.__events[e])).call(
            _context15,
            function (e) {
              e.apply(void 0, i);
            }
          );
      },
    };
    function I(e, t, i) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ('object' != (0, _typeof2['default'])(e) || null === e) return e;
            var i = e[_toPrimitive['default']];
            if (void 0 !== i) {
              var s = i.call(e, 'string');
              if ('object' != (0, _typeof2['default'])(s)) return s;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            }
            return String(e);
          })(e);
          return 'symbol' == (0, _typeof2['default'])(t) ? t : String(t);
        })(t)) in e
          ? (0, _defineProperty2['default'])(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var P = '',
      j = '',
      B = !1;
    var R = /*#__PURE__*/ (function () {
      function R(e, t) {
        var _this0 = this;
        (0, _classCallCheck2['default'])(this, R);
        var r = this;
        if (
          (I(this, 'viewIndexes', [i.days, i.months, i.years]),
          I(this, 'next', function () {
            var _this0$parsedViewDate = _this0.parsedViewDate,
              e = _this0$parsedViewDate.year,
              t = _this0$parsedViewDate.month;
            switch (_this0.currentView) {
              case i.days:
                _this0.setViewDate(new Date(e, t + 1, 1));
                break;
              case i.months:
                _this0.setViewDate(new Date(e + 1, t, 1));
                break;
              case i.years:
                _this0.setViewDate(new Date(e + 10, 0, 1));
            }
          }),
          I(this, 'prev', function () {
            var _this0$parsedViewDate2 = _this0.parsedViewDate,
              e = _this0$parsedViewDate2.year,
              t = _this0$parsedViewDate2.month;
            switch (_this0.currentView) {
              case i.days:
                _this0.setViewDate(new Date(e, t - 1, 1));
                break;
              case i.months:
                _this0.setViewDate(new Date(e - 1, t, 1));
                break;
              case i.years:
                _this0.setViewDate(new Date(e - 10, 0, 1));
            }
          }),
          I(this, '_finishHide', function () {
            (_this0.hideAnimation = !1),
              _this0._destroyComponents(),
              _this0.$container.removeChild(_this0.$datepicker);
          }),
          I(this, 'setPosition', function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if ('function' == typeof (e = e || r.opts.position))
              return void (r.customHide = e({
                $datepicker: r.$datepicker,
                $target: r.$el,
                $pointer: r.$pointer,
                isViewChange: t,
                done: r._finishHide,
              }));
            var i,
              s,
              a = r.opts.isMobile,
              n = r.$el.getBoundingClientRect(),
              o = r.$el.getBoundingClientRect(),
              h = r.$datepicker.offsetParent,
              l = r.$el.offsetParent,
              d = r.$datepicker.getBoundingClientRect(),
              c = e.split(' '),
              u = window.scrollY,
              p = window.scrollX,
              m = r.opts.offset,
              v = c[0],
              g = c[1];
            if (a) r.$datepicker.style.cssText = 'left: 50%; top: 50%';
            else {
              var _context16;
              if (
                (h === l &&
                  h !== document.body &&
                  ((o = {
                    top: r.$el.offsetTop,
                    left: r.$el.offsetLeft,
                    width: n.width,
                    height: r.$el.offsetHeight,
                  }),
                  (u = 0),
                  (p = 0)),
                h !== l && h !== document.body)
              ) {
                var _e0 = h.getBoundingClientRect();
                (o = {
                  top: n.top - _e0.top,
                  left: n.left - _e0.left,
                  width: n.width,
                  height: n.height,
                }),
                  (u = 0),
                  (p = 0);
              }
              switch (v) {
                case 'top':
                  i = o.top - d.height - m;
                  break;
                case 'right':
                  s = o.left + o.width + m;
                  break;
                case 'bottom':
                  i = o.top + o.height + m;
                  break;
                case 'left':
                  s = o.left - d.width - m;
              }
              switch (g) {
                case 'top':
                  i = o.top;
                  break;
                case 'right':
                  s = o.left + o.width - d.width;
                  break;
                case 'bottom':
                  i = o.top + o.height - d.height;
                  break;
                case 'left':
                  s = o.left;
                  break;
                case 'center':
                  /left|right/.test(v)
                    ? (i = o.top + o.height / 2 - d.height / 2)
                    : (s = o.left + o.width / 2 - d.width / 2);
              }
              r.$datepicker.style.cssText = (0, _concat['default'])(
                (_context16 = 'left: '.concat(s + p, 'px; top: '))
              ).call(_context16, i + u, 'px');
            }
          }),
          I(this, '_setInputValue', function () {
            var e = _this0.opts,
              t = _this0.$altField,
              i = _this0.locale.dateFormat,
              s = e.altFieldDateFormat,
              a = e.altField;
            a && t && (t.value = _this0._getInputValue(s)),
              (_this0.$el.value = _this0._getInputValue(i));
          }),
          I(this, '_getInputValue', function (e) {
            var t = _this0.selectedDates,
              i = _this0.opts,
              s = i.multipleDates,
              a = i.multipleDatesSeparator;
            if (!t.length) return '';
            var n = 'function' == typeof e,
              r = n
                ? e(s ? t : t[0])
                : (0, _map2['default'])(t).call(t, function (t) {
                    return _this0.formatDate(t, e);
                  });
            return (r = n ? r : r.join(a)), r;
          }),
          I(this, '_checkIfDateIsSelected', function (e) {
            var _context17;
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : i.days,
              s = !1;
            return (
              (0, _some['default'])((_context17 = r.selectedDates)).call(
                _context17,
                function (i) {
                  var a = p(e, i, t);
                  return (s = a && i), a;
                }
              ),
              s
            );
          }),
          I(this, '_scheduleCallAfterTransition', function (e) {
            _this0._cancelScheduledCall(),
              e && e(!1),
              (_this0._onTransitionEnd = function () {
                e && e(!0);
              }),
              _this0.$datepicker.addEventListener(
                'transitionend',
                _this0._onTransitionEnd,
                {
                  once: !0,
                }
              );
          }),
          I(this, '_cancelScheduledCall', function () {
            _this0.$datepicker.removeEventListener(
              'transitionend',
              _this0._onTransitionEnd
            );
          }),
          I(this, 'setViewDate', function (e) {
            if (!((e = b(e)) instanceof Date)) return;
            if (p(e, _this0.viewDate)) return;
            var t = _this0.viewDate;
            _this0.viewDate = e;
            var s = _this0.opts.onChangeViewDate;
            if (s) {
              var _this0$parsedViewDate3 = _this0.parsedViewDate,
                _e1 = _this0$parsedViewDate3.month,
                _t5 = _this0$parsedViewDate3.year;
              s({
                month: _e1,
                year: _t5,
                decade: _this0.curDecade,
              });
            }
            _this0.trigger(i.eventChangeViewDate, e, t);
          }),
          I(this, 'setFocusDate', function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            (!e || (e = b(e)) instanceof Date) &&
              ((r.focusDate = e), r.trigger(i.eventChangeFocusDate, e, t));
          }),
          I(this, 'setCurrentView', function (e) {
            var _context18;
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            if (
              (0, _includes['default'])((_context18 = r.viewIndexes)).call(
                _context18,
                e
              )
            ) {
              if (
                ((r.currentView = e),
                r.elIsInput && r.visible && r.setPosition(void 0, !0),
                r.trigger(i.eventChangeCurrentView, e),
                !r.views[e])
              ) {
                var _t6 = (r.views[e] = new T({
                  dp: r,
                  opts: r.opts,
                  type: e,
                }));
                r.shouldUpdateDOM && r.$content.appendChild(_t6.$el);
              }
              r.opts.onChangeView && !t.silent && r.opts.onChangeView(e);
            }
          }),
          I(this, '_updateLastSelectedDate', function (e) {
            (_this0.lastSelectedDate = e),
              _this0.trigger(i.eventChangeLastSelectedDate, e);
          }),
          I(this, 'destroy', function () {
            if (_this0.isDestroyed) return;
            var _this0$opts = _this0.opts,
              e = _this0$opts.showEvent,
              t = _this0$opts.isMobile,
              i = _this0.$datepicker.parentNode;
            i && i.removeChild(_this0.$datepicker),
              _this0.$el.removeEventListener(e, _this0._onFocus),
              _this0.$el.removeEventListener('blur', _this0._onBlur),
              window.removeEventListener('resize', _this0._onResize),
              t && _this0._removeMobileAttributes(),
              _this0.keyboardNav && _this0.keyboardNav.destroy(),
              (_this0.views = null),
              (_this0.nav = null),
              (_this0.$datepicker = null),
              (_this0.opts = {}),
              (_this0.$customContainer = null),
              (_this0.viewDate = null),
              (_this0.focusDate = null),
              (_this0.selectedDates = []),
              (_this0.rangeDateFrom = null),
              (_this0.rangeDateTo = null),
              (_this0.isDestroyed = !0);
          }),
          I(this, 'update', function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              s = w({}, r.opts),
              a = t.silent;
            w(r.opts, e);
            var _r$opts = r.opts,
              n = _r$opts.timepicker,
              o = _r$opts.buttons,
              h = _r$opts.range,
              l = _r$opts.selectedDates,
              d = _r$opts.isMobile,
              c = r.visible || r.treatAsInline;
            r._createMinMaxDates(),
              r._limitViewDateByMaxMinDates(),
              r._handleLocale(),
              l &&
                ((r.selectedDates = []),
                r.selectDate(l, {
                  silent: a,
                })),
              e.view &&
                r.setCurrentView(e.view, {
                  silent: a,
                }),
              r._setInputValue(),
              s.range && !h
                ? ((r.rangeDateTo = !1), (r.rangeDateFrom = !1))
                : !s.range &&
                  h &&
                  r.selectedDates.length &&
                  ((r.rangeDateFrom = r.selectedDates[0]),
                  (r.rangeDateTo = r.selectedDates[1])),
              s.timepicker && !n
                ? (c && r.timepicker.destroy(),
                  (r.timepicker = !1),
                  r.$timepicker.parentNode.removeChild(r.$timepicker))
                : !s.timepicker && n && r._addTimepicker(),
              !s.buttons && o
                ? r._addButtons()
                : s.buttons && !o
                ? (r.buttons.destroy(),
                  r.$buttons.parentNode.removeChild(r.$buttons))
                : c && s.buttons && o && r.buttons.clearHtml().render(),
              !s.isMobile && d
                ? (r.treatAsInline || j || r._createMobileOverlay(),
                  r._addMobileAttributes(),
                  r.visible && r._showMobileOverlay())
                : s.isMobile &&
                  !d &&
                  (r._removeMobileAttributes(),
                  r.visible &&
                    (j.classList.remove('-active-'),
                    'function' != typeof r.opts.position && r.setPosition())),
              c &&
                (r.nav.update(),
                r.views[r.currentView].render(),
                r.currentView === i.days &&
                  r.views[r.currentView].renderDayNames());
          }),
          I(this, 'disableDate', function (e, t) {
            var _context19;
            (0, _forEach['default'])(
              (_context19 = (0, _isArray['default'])(e) ? e : [e])
            ).call(
              _context19,
              function (e) {
                var i = b(e);
                if (!i) return;
                var s = t ? 'delete' : 'add';
                _this0.disabledDates[s](_this0.formatDate(i, 'yyyy-MM-dd'));
                var a = _this0.getCell(i, _this0.currentViewSingular);
                a && a.adpCell.render();
              },
              []
            );
          }),
          I(this, 'enableDate', function (e) {
            _this0.disableDate(e, !0);
          }),
          I(this, 'isDateDisabled', function (e) {
            var t = b(e);
            return _this0.disabledDates.has(_this0.formatDate(t, 'yyyy-MM-dd'));
          }),
          I(this, 'isOtherMonth', function (e) {
            var _h0 = h(e),
              t = _h0.month;
            return t !== _this0.parsedViewDate.month;
          }),
          I(this, 'isOtherYear', function (e) {
            var _h1 = h(e),
              t = _h1.year;
            return t !== _this0.parsedViewDate.year;
          }),
          I(this, 'isOtherDecade', function (e) {
            var _h10 = h(e),
              t = _h10.year,
              _c = c(_this0.viewDate),
              _c2 = (0, _slicedToArray2['default'])(_c, 2),
              i = _c2[0],
              s = _c2[1];
            return t < i || t > s;
          }),
          I(this, '_onChangeSelectedDate', function (e) {
            var t = e.silent;
            (0, _setTimeout2['default'])(function () {
              _this0._setInputValue(),
                _this0.opts.onSelect && !t && _this0._triggerOnSelect();
            });
          }),
          I(this, '_onChangeFocusedDate', function (e) {
            var _ref5 =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              t = _ref5.viewDateTransition;
            if (!e) return;
            var i = !1;
            t &&
              (i = r.isOtherMonth(e) || r.isOtherYear(e) || r.isOtherDecade(e)),
              i && r.setViewDate(e),
              r.opts.onFocus &&
                r.opts.onFocus({
                  datepicker: r,
                  date: e,
                });
          }),
          I(this, '_onChangeTime', function (e) {
            var t = e.hours,
              i = e.minutes,
              s = new Date(),
              a = _this0.lastSelectedDate,
              n = _this0.opts.onSelect,
              r = a;
            a || (r = s);
            var o = _this0.getCell(r, _this0.currentViewSingular),
              h = o && o.adpCell;
            (h && h.isDisabled) ||
              (r.setHours(t),
              r.setMinutes(i),
              a
                ? (_this0._setInputValue(), n && _this0._triggerOnSelect())
                : _this0.selectDate(r));
          }),
          I(this, '_onFocus', function (e) {
            _this0.visible || _this0.show();
          }),
          I(this, '_onBlur', function (e) {
            _this0.inFocus ||
              !_this0.visible ||
              _this0.opts.isMobile ||
              _this0.hide();
          }),
          I(this, '_onMouseDown', function (e) {
            _this0.inFocus = !0;
          }),
          I(this, '_onMouseUp', function (e) {
            (_this0.inFocus = !1), _this0.$el.focus();
          }),
          I(this, '_onResize', function () {
            _this0.visible &&
              'function' != typeof _this0.opts.position &&
              _this0.setPosition();
          }),
          I(this, '_onClickOverlay', function () {
            _this0.visible && _this0.hide();
          }),
          I(this, 'getViewDates', function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : i.days;
            return T.getDatesFunction(e)(r);
          }),
          I(this, 'isWeekend', function (e) {
            var _context20;
            return (0, _includes['default'])(
              (_context20 = _this0.opts.weekends)
            ).call(_context20, e);
          }),
          I(this, 'getClampedDate', function (e) {
            var t = _this0.minDate,
              i = _this0.maxDate,
              s = e;
            return i && m(e, i) ? (s = i) : t && v(e, t) && (s = t), s;
          }),
          (this.$el = a(e)),
          !this.$el)
        )
          return;
        (this.$datepicker = n({
          className: 'air-datepicker',
        })),
          (this.opts = w({}, s, t)),
          (this.$customContainer =
            !!this.opts.container && a(this.opts.container)),
          (this.$altField = a(this.opts.altField || !1));
        var _this$opts7 = this.opts,
          o = _this$opts7.view,
          l = _this$opts7.startDate;
        l || (this.opts.startDate = new Date()),
          'INPUT' === this.$el.nodeName && (this.elIsInput = !0),
          (this.inited = !1),
          (this.visible = !1),
          (this.viewDate = b(this.opts.startDate)),
          (this.focusDate = !1),
          (this.initialReadonly = this.$el.getAttribute('readonly')),
          (this.customHide = !1),
          (this.currentView = o),
          (this.selectedDates = []),
          (this.disabledDates = new _set['default']()),
          (this.isDestroyed = !1),
          (this.views = {}),
          (this.keys = []),
          (this.rangeDateFrom = ''),
          (this.rangeDateTo = ''),
          (this.timepickerIsActive = !1),
          (this.treatAsInline = this.opts.inline || !this.elIsInput),
          this.init();
      }
      return (0, _createClass2['default'])(
        R,
        [
          {
            key: 'init',
            value: function init() {
              var e = this.opts,
                t = this.treatAsInline,
                _this$opts8 = this.opts,
                i = _this$opts8.inline,
                s = _this$opts8.isMobile,
                n = _this$opts8.selectedDates,
                r = _this$opts8.keyboardNav,
                o = _this$opts8.onlyTimepicker,
                h = a('body');
              (!B || (B && P && !h.contains(P))) &&
                !i &&
                this.elIsInput &&
                !this.$customContainer &&
                R.buildGlobalContainer(R.defaultGlobalContainerId),
                !s || j || t || this._createMobileOverlay(),
                this._handleLocale(),
                this._bindSubEvents(),
                this._createMinMaxDates(),
                this._limitViewDateByMaxMinDates(),
                this.elIsInput &&
                  (i || this._bindEvents(),
                  r &&
                    !o &&
                    (this.keyboardNav = new A({
                      dp: this,
                      opts: e,
                    }))),
                n &&
                  this.selectDate(n, {
                    silent: !0,
                  }),
                this.opts.visible && !t && this.show(),
                s && !t && this.$el.setAttribute('readonly', !0),
                t && this._createComponents();
            },
          },
          {
            key: '_createMobileOverlay',
            value: function _createMobileOverlay() {
              (j = n({
                className: 'air-datepicker-overlay',
              })),
                P.appendChild(j);
            },
          },
          {
            key: '_createComponents',
            value: function _createComponents() {
              var _this$$datepicker$cla;
              var e = this.opts,
                t = this.treatAsInline,
                _this$opts9 = this.opts,
                i = _this$opts9.inline,
                s = _this$opts9.buttons,
                a = _this$opts9.timepicker,
                n = _this$opts9.position,
                r = _this$opts9.classes,
                o = _this$opts9.onlyTimepicker,
                h = _this$opts9.isMobile;
              this._buildBaseHtml(),
                this.elIsInput && (i || this._setPositionClasses(n)),
                (!i && this.elIsInput) ||
                  this.$datepicker.classList.add('-inline-'),
                r &&
                  (_this$$datepicker$cla =
                    this.$datepicker.classList).add.apply(
                    _this$$datepicker$cla,
                    (0, _toConsumableArray2['default'])(r.split(' '))
                  ),
                o && this.$datepicker.classList.add('-only-timepicker-'),
                h && !t && this._addMobileAttributes(),
                (this.views[this.currentView] = new T({
                  dp: this,
                  type: this.currentView,
                  opts: e,
                })),
                (this.nav = new V({
                  dp: this,
                  opts: e,
                })),
                a && this._addTimepicker(),
                s && this._addButtons(),
                this.$content.appendChild(this.views[this.currentView].$el),
                this.$nav.appendChild(this.nav.$el);
            },
          },
          {
            key: '_destroyComponents',
            value: function _destroyComponents() {
              for (var _e10 in this.views) this.views[_e10].destroy();
              (this.views = {}),
                this.nav.destroy(),
                this.timepicker && this.timepicker.destroy();
            },
          },
          {
            key: '_addMobileAttributes',
            value: function _addMobileAttributes() {
              j.addEventListener('click', this._onClickOverlay),
                this.$datepicker.classList.add('-is-mobile-'),
                this.$el.setAttribute('readonly', !0);
            },
          },
          {
            key: '_removeMobileAttributes',
            value: function _removeMobileAttributes() {
              j.removeEventListener('click', this._onClickOverlay),
                this.$datepicker.classList.remove('-is-mobile-'),
                this.initialReadonly ||
                  '' === this.initialReadonly ||
                  this.$el.removeAttribute('readonly');
            },
          },
          {
            key: '_createMinMaxDates',
            value: function _createMinMaxDates() {
              var _this$opts0 = this.opts,
                e = _this$opts0.minDate,
                t = _this$opts0.maxDate;
              (this.minDate = !!e && b(e)), (this.maxDate = !!t && b(t));
            },
          },
          {
            key: '_addTimepicker',
            value: function _addTimepicker() {
              (this.$timepicker = n({
                className: 'air-datepicker--time',
              })),
                this.$datepicker.appendChild(this.$timepicker),
                (this.timepicker = new L({
                  dp: this,
                  opts: this.opts,
                })),
                this.$timepicker.appendChild(this.timepicker.$el);
            },
          },
          {
            key: '_addButtons',
            value: function _addButtons() {
              (this.$buttons = n({
                className: 'air-datepicker--buttons',
              })),
                this.$datepicker.appendChild(this.$buttons),
                (this.buttons = new H({
                  dp: this,
                  opts: this.opts,
                })),
                this.$buttons.appendChild(this.buttons.$el);
            },
          },
          {
            key: '_bindSubEvents',
            value: function _bindSubEvents() {
              this.on(i.eventChangeSelectedDate, this._onChangeSelectedDate),
                this.on(i.eventChangeFocusDate, this._onChangeFocusedDate),
                this.on(i.eventChangeTime, this._onChangeTime);
            },
          },
          {
            key: '_buildBaseHtml',
            value: function _buildBaseHtml() {
              var e = this.opts.inline;
              var t, i;
              this.elIsInput
                ? e
                  ? ((t = this.$datepicker),
                    (i = this.$el).parentNode.insertBefore(t, i.nextSibling))
                  : this.$container.appendChild(this.$datepicker)
                : this.$el.appendChild(this.$datepicker),
                (this.$datepicker.innerHTML =
                  '<i class="air-datepicker--pointer"></i><div class="air-datepicker--navigation"></div><div class="air-datepicker--content"></div>'),
                (this.$content = a(
                  '.air-datepicker--content',
                  this.$datepicker
                )),
                (this.$pointer = a(
                  '.air-datepicker--pointer',
                  this.$datepicker
                )),
                (this.$nav = a(
                  '.air-datepicker--navigation',
                  this.$datepicker
                ));
            },
          },
          {
            key: '_handleLocale',
            value: function _handleLocale() {
              var _this$opts1 = this.opts,
                e = _this$opts1.locale,
                t = _this$opts1.dateFormat,
                i = _this$opts1.firstDay,
                s = _this$opts1.timepicker,
                a = _this$opts1.onlyTimepicker,
                n = _this$opts1.timeFormat,
                r = _this$opts1.dateTimeSeparator;
              var o;
              (this.locale =
                ((o = e), JSON.parse((0, _stringify['default'])(o)))),
                t && (this.locale.dateFormat = t),
                void 0 !== n && '' !== n && (this.locale.timeFormat = n);
              var h = this.locale.timeFormat;
              if (
                ('' !== i && (this.locale.firstDay = i),
                s && 'function' != typeof t)
              ) {
                var _e11 = h ? r : '';
                this.locale.dateFormat = [this.locale.dateFormat, h || ''].join(
                  _e11
                );
              }
              a &&
                'function' != typeof t &&
                (this.locale.dateFormat = this.locale.timeFormat);
            },
          },
          {
            key: '_setPositionClasses',
            value: function _setPositionClasses(e) {
              var _context21, _context22, _this$$datepicker$cla2;
              if ('function' == typeof e)
                return void this.$datepicker.classList.add('-custom-position-');
              var t = (e = e.split(' '))[0],
                i = (0, _concat['default'])(
                  (_context21 = (0, _concat['default'])(
                    (_context22 = 'air-datepicker -'.concat(t, '-'))
                  ).call(_context22, e[1], '- -from-'))
                ).call(_context21, t, '-');
              (_this$$datepicker$cla2 = this.$datepicker.classList).add.apply(
                _this$$datepicker$cla2,
                (0, _toConsumableArray2['default'])(i.split(' '))
              );
            },
          },
          {
            key: '_bindEvents',
            value: function _bindEvents() {
              this.$el.addEventListener(this.opts.showEvent, this._onFocus),
                this.$el.addEventListener('blur', this._onBlur),
                this.$datepicker.addEventListener(
                  'mousedown',
                  this._onMouseDown
                ),
                this.$datepicker.addEventListener('mouseup', this._onMouseUp),
                window.addEventListener('resize', this._onResize);
            },
          },
          {
            key: '_limitViewDateByMaxMinDates',
            value: function _limitViewDateByMaxMinDates() {
              var e = this.viewDate,
                t = this.minDate,
                i = this.maxDate;
              i && m(e, i) && this.setViewDate(i),
                t && v(e, t) && this.setViewDate(t);
            },
          },
          {
            key: 'formatDate',
            value: function formatDate() {
              var _context23;
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.viewDate,
                t = arguments.length > 1 ? arguments[1] : void 0;
              if (((e = b(e)), !(e instanceof Date))) return;
              var i = t,
                s = this.locale,
                a = h(e),
                n = a.dayPeriod,
                r = c(e),
                o = R.replacer,
                l = {
                  T: e.getTime(),
                  m: a.minutes,
                  mm: a.fullMinutes,
                  h: a.hours12,
                  hh: a.fullHours12,
                  H: a.hours,
                  HH: a.fullHours,
                  aa: n,
                  AA: n.toUpperCase(),
                  E: s.daysShort[a.day],
                  EEEE: s.days[a.day],
                  d: a.date,
                  dd: a.fullDate,
                  M: a.month + 1,
                  MM: a.fullMonth,
                  MMM: s.monthsShort[a.month],
                  MMMM: s.months[a.month],
                  yy: (0, _slice['default'])(
                    (_context23 = a.year.toString())
                  ).call(_context23, -2),
                  yyyy: a.year,
                  yyyy1: r[0],
                  yyyy2: r[1],
                };
              for (
                var _i9 = 0, _Object$entries4 = (0, _entries['default'])(l);
                _i9 < _Object$entries4.length;
                _i9++
              ) {
                var _Object$entries4$_i = (0, _slicedToArray2['default'])(
                    _Object$entries4[_i9],
                    2
                  ),
                  _e12 = _Object$entries4$_i[0],
                  _t7 = _Object$entries4$_i[1];
                i = o(i, k(_e12), _t7);
              }
              return i;
            },
          },
          {
            key: 'down',
            value: function down(e) {
              this._handleUpDownActions(e, 'down');
            },
          },
          {
            key: 'up',
            value: function up(e) {
              this._handleUpDownActions(e, 'up');
            },
          },
          {
            key: 'selectDate',
            value: function selectDate(e) {
              var _this1 = this;
              var t,
                s =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                a = this.currentView,
                n = this.parsedViewDate,
                r = this.selectedDates,
                o = s.updateTime,
                _this$opts10 = this.opts,
                h = _this$opts10.moveToOtherMonthsOnSelect,
                l = _this$opts10.moveToOtherYearsOnSelect,
                d = _this$opts10.multipleDates,
                c = _this$opts10.range,
                u = _this$opts10.autoClose,
                p = _this$opts10.onBeforeSelect,
                v = r.length;
              if ((0, _isArray['default'])(e))
                return (
                  (0, _forEach['default'])(e).call(e, function (e) {
                    _this1.selectDate(e, s);
                  }),
                  new _promise['default'](function (e) {
                    (0, _setTimeout2['default'])(e);
                  })
                );
              if ((e = b(e)) instanceof Date) {
                if (
                  p &&
                  !p({
                    date: e,
                    datepicker: this,
                  })
                )
                  return _promise['default'].resolve();
                if (
                  (a === i.days &&
                    e.getMonth() !== n.month &&
                    h &&
                    (t = new Date(e.getFullYear(), e.getMonth(), 1)),
                  a === i.years &&
                    e.getFullYear() !== n.year &&
                    l &&
                    (t = new Date(e.getFullYear(), 0, 1)),
                  t && this.setViewDate(t),
                  d && !c)
                ) {
                  if (v === d) return;
                  this._checkIfDateIsSelected(e) || r.push(e);
                } else if (c)
                  switch (v) {
                    case 1:
                      r.push(e),
                        this.rangeDateTo || (this.rangeDateTo = e),
                        m(this.rangeDateFrom, this.rangeDateTo) &&
                          ((this.rangeDateTo = this.rangeDateFrom),
                          (this.rangeDateFrom = e)),
                        (this.selectedDates = [
                          this.rangeDateFrom,
                          this.rangeDateTo,
                        ]);
                      break;
                    case 2:
                      (this.selectedDates = [e]),
                        (this.rangeDateFrom = e),
                        (this.rangeDateTo = '');
                      break;
                    default:
                      (this.selectedDates = [e]), (this.rangeDateFrom = e);
                  }
                else this.selectedDates = [e];
                return (
                  this.trigger(i.eventChangeSelectedDate, {
                    action: i.actionSelectDate,
                    silent: null == s ? void 0 : s.silent,
                    date: e,
                    updateTime: o,
                  }),
                  this._updateLastSelectedDate(e),
                  u &&
                    !this.timepickerIsActive &&
                    this.visible &&
                    (d || c ? c && 1 === v && this.hide() : this.hide()),
                  new _promise['default'](function (e) {
                    (0, _setTimeout2['default'])(e);
                  })
                );
              }
            },
          },
          {
            key: 'unselectDate',
            value: function unselectDate(e) {
              var _this10 = this;
              var t = this.selectedDates,
                s = this;
              if ((e = b(e)) instanceof Date)
                return (0, _some['default'])(t).call(t, function (a, n) {
                  if (p(a, e))
                    return (
                      (0, _splice['default'])(t).call(t, n, 1),
                      s.selectedDates.length
                        ? ((s.rangeDateTo = ''),
                          (s.rangeDateFrom = t[0]),
                          s._updateLastSelectedDate(
                            s.selectedDates[s.selectedDates.length - 1]
                          ))
                        : ((s.rangeDateFrom = ''),
                          (s.rangeDateTo = ''),
                          s._updateLastSelectedDate(!1)),
                      _this10.trigger(i.eventChangeSelectedDate, {
                        action: i.actionUnselectDate,
                        date: e,
                      }),
                      !0
                    );
                });
            },
          },
          {
            key: 'replaceDate',
            value: function replaceDate(e, t) {
              var _context24,
                _this11 = this,
                _context25;
              var s = (0, _find['default'])(
                  (_context24 = this.selectedDates)
                ).call(_context24, function (t) {
                  return p(t, e, _this11.currentView);
                }),
                a = (0, _indexOf['default'])(
                  (_context25 = this.selectedDates)
                ).call(_context25, s);
              a < 0 ||
                p(this.selectedDates[a], t, this.currentView) ||
                ((this.selectedDates[a] = t),
                this.trigger(i.eventChangeSelectedDate, {
                  action: i.actionSelectDate,
                  date: t,
                  updateTime: !0,
                }),
                this._updateLastSelectedDate(t));
            },
          },
          {
            key: 'clear',
            value: function clear() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              return (
                (this.selectedDates = []),
                (this.rangeDateFrom = !1),
                (this.rangeDateTo = !1),
                (this.lastSelectedDate = !1),
                this.trigger(i.eventChangeSelectedDate, {
                  action: i.actionUnselectDate,
                  silent: e.silent,
                }),
                new _promise['default'](function (e) {
                  (0, _setTimeout2['default'])(e);
                })
              );
            },
          },
          {
            key: 'show',
            value: function show() {
              var _this$opts11 = this.opts,
                e = _this$opts11.onShow,
                t = _this$opts11.isMobile;
              this._cancelScheduledCall(),
                this.visible || this.hideAnimation || this._createComponents(),
                this.setPosition(this.opts.position),
                this.$datepicker.classList.add('-active-'),
                (this.visible = !0),
                e && this._scheduleCallAfterTransition(e),
                t && this._showMobileOverlay();
            },
          },
          {
            key: 'hide',
            value: function hide() {
              var _this12 = this;
              var _this$opts12 = this.opts,
                e = _this$opts12.onHide,
                t = _this$opts12.isMobile,
                i = this._hasTransition();
              (this.visible = !1),
                (this.hideAnimation = !0),
                this.$datepicker.classList.remove('-active-'),
                this.customHide && this.customHide(),
                this.elIsInput && this.$el.blur(),
                this._scheduleCallAfterTransition(function (t) {
                  !_this12.customHide &&
                    ((t && i) || (!t && !i)) &&
                    _this12._finishHide(),
                    e && e(t);
                }),
                t && j.classList.remove('-active-');
            },
          },
          {
            key: '_triggerOnSelect',
            value: function _triggerOnSelect() {
              var _this13 = this;
              var e = [],
                t = [],
                i = this.selectedDates,
                s = this.locale,
                _this$opts13 = this.opts,
                a = _this$opts13.onSelect,
                n = _this$opts13.multipleDates,
                r = _this$opts13.range,
                o = n || r,
                h = 'function' == typeof s.dateFormat;
              i.length &&
                ((e = (0, _map2['default'])(i).call(i, g)),
                (t = h
                  ? n
                    ? s.dateFormat(e)
                    : (0, _map2['default'])(e).call(e, function (e) {
                        return s.dateFormat(e);
                      })
                  : (0, _map2['default'])(e).call(e, function (e) {
                      return _this13.formatDate(e, s.dateFormat);
                    }))),
                a({
                  date: o ? e : e[0],
                  formattedDate: o ? t : t[0],
                  datepicker: this,
                });
            },
          },
          {
            key: '_handleAlreadySelectedDates',
            value: function _handleAlreadySelectedDates(e, t) {
              var i = this.selectedDates,
                s = this.rangeDateFrom,
                a = this.rangeDateTo,
                _this$opts14 = this.opts,
                n = _this$opts14.range,
                r = _this$opts14.toggleSelected,
                o = i.length,
                h =
                  'function' == typeof r
                    ? r({
                        datepicker: this,
                        date: t,
                      })
                    : r,
                l = Boolean(n && 1 === o && e),
                d = l ? g(t) : t;
              (n &&
                !h &&
                (2 !== o && this.selectDate(d), 2 === o && p(s, a))) ||
                (h
                  ? this.unselectDate(d)
                  : this._updateLastSelectedDate(l ? d : e));
            },
          },
          {
            key: '_handleUpDownActions',
            value: function _handleUpDownActions(e, t) {
              if (
                !((e = b(e || this.focusDate || this.viewDate)) instanceof Date)
              )
                return;
              var i = 'up' === t ? this.viewIndex + 1 : this.viewIndex - 1;
              i > 2 && (i = 2),
                i < 0 && (i = 0),
                this.setViewDate(new Date(e.getFullYear(), e.getMonth(), 1)),
                this.setCurrentView(this.viewIndexes[i]);
            },
          },
          {
            key: 'getCell',
            value: function getCell(e) {
              var _context26, _context27, _context28;
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : i.day;
              if (!((e = b(e)) instanceof Date)) return;
              var _h11 = h(e),
                s = _h11.year,
                a = _h11.month,
                n = _h11.date,
                r = '[data-year="'.concat(s, '"]'),
                o = '[data-month="'.concat(a, '"]'),
                l = (0, _defineProperty3['default'])(
                  (0, _defineProperty3['default'])(
                    (0, _defineProperty3['default'])(
                      {},
                      i.day,
                      (0, _concat['default'])(
                        (_context26 = (0, _concat['default'])(
                          (_context27 = ''.concat(r))
                        ).call(_context27, o, '[data-date="'))
                      ).call(_context26, n, '"]')
                    ),
                    i.month,
                    (0, _concat['default'])((_context28 = ''.concat(r))).call(
                      _context28,
                      o
                    )
                  ),
                  i.year,
                  ''.concat(r)
                );
              return this.views[this.currentView]
                ? this.views[this.currentView].$el.querySelector(l[t])
                : void 0;
            },
          },
          {
            key: '_showMobileOverlay',
            value: function _showMobileOverlay() {
              j.classList.add('-active-');
            },
          },
          {
            key: '_hasTransition',
            value: function _hasTransition() {
              var _context29;
              return (
                (0, _reduce['default'])(
                  (_context29 = window
                    .getComputedStyle(this.$datepicker)
                    .getPropertyValue('transition-duration')
                    .split(', '))
                ).call(
                  _context29,
                  function (e, t) {
                    return (0, _parseFloat2['default'])(t) + e;
                  },
                  0
                ) > 0
              );
            },
          },
          {
            key: 'shouldUpdateDOM',
            get: function get() {
              return this.visible || this.treatAsInline;
            },
          },
          {
            key: 'parsedViewDate',
            get: function get() {
              return h(this.viewDate);
            },
          },
          {
            key: 'currentViewSingular',
            get: function get() {
              var _context30;
              return (0, _slice['default'])(
                (_context30 = this.currentView)
              ).call(_context30, 0, -1);
            },
          },
          {
            key: 'curDecade',
            get: function get() {
              return c(this.viewDate);
            },
          },
          {
            key: 'viewIndex',
            get: function get() {
              var _context31;
              return (0, _indexOf['default'])(
                (_context31 = this.viewIndexes)
              ).call(_context31, this.currentView);
            },
          },
          {
            key: 'isFinalView',
            get: function get() {
              return this.currentView === i.years;
            },
          },
          {
            key: 'hasSelectedDates',
            get: function get() {
              return this.selectedDates.length > 0;
            },
          },
          {
            key: 'isMinViewReached',
            get: function get() {
              return (
                this.currentView === this.opts.minView ||
                this.currentView === i.days
              );
            },
          },
          {
            key: '$container',
            get: function get() {
              return this.$customContainer || P;
            },
          },
        ],
        [
          {
            key: 'buildGlobalContainer',
            value: function buildGlobalContainer(e) {
              (B = !0),
                (P = n({
                  className: e,
                  id: e,
                })),
                a('body').appendChild(P);
            },
          },
          {
            key: 'replacer',
            value: function replacer(e, t, i) {
              return e.replace(t, function (e, t, s, a) {
                return t + i + a;
              });
            },
          },
        ]
      );
    })();
    var K;
    return (
      I(R, 'defaults', s),
      I(R, 'version', '3.5.3'),
      I(R, 'defaultGlobalContainerId', 'air-datepicker-global-container'),
      (K = R.prototype),
      (0, _assign['default'])(K, N),
      t['default']
    );
  })();
});
