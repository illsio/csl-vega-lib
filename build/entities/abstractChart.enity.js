export class AbstractChartEnity {
    constructor() {
        this._shema = 'https://vega.github.io/schema/vega/v3.0.json';
        this._width = 0;
        this._height = 0;
        this._autoSize = 'fit';
        this._data = null;
        this._colorScheme = "tableau20";
        this._countElementName = '';
        this._colorElementName = '';
    }
    createChart() {
    }
    get shema() {
        return this._shema;
    }
    set shema(value) {
        this._shema = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(value) {
        this._autoSize = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get countElementName() {
        return this._countElementName;
    }
    set countElementName(value) {
        this._countElementName = value;
    }
    get colorElementName() {
        return this._colorElementName;
    }
    set colorElementName(value) {
        this._colorElementName = value;
    }
    get colorScheme() {
        return this._colorScheme;
    }
    set colorScheme(value) {
        this._colorScheme = value;
    }
}
//# sourceMappingURL=abstractChart.enity.js.map