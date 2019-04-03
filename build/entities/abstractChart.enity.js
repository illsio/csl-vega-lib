"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractChartEnity = /** @class */ (function () {
    function AbstractChartEnity() {
        this._shema = 'https://vega.github.io/schema/vega/v3.0.json';
        this._width = 0;
        this._height = 0;
        this._autoSize = 'fit';
        this._data = null;
        this._colorScheme = "tableau20";
        this._countElementName = '';
        this._colorElementName = '';
    }
    AbstractChartEnity.prototype.createChart = function () {
    };
    Object.defineProperty(AbstractChartEnity.prototype, "shema", {
        get: function () {
            return this._shema;
        },
        set: function (value) {
            this._shema = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "autoSize", {
        get: function () {
            return this._autoSize;
        },
        set: function (value) {
            this._autoSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "countElementName", {
        get: function () {
            return this._countElementName;
        },
        set: function (value) {
            this._countElementName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "colorElementName", {
        get: function () {
            return this._colorElementName;
        },
        set: function (value) {
            this._colorElementName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractChartEnity.prototype, "colorScheme", {
        get: function () {
            return this._colorScheme;
        },
        set: function (value) {
            this._colorScheme = value;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractChartEnity;
}());
exports.AbstractChartEnity = AbstractChartEnity;
//# sourceMappingURL=abstractChart.enity.js.map