export class AbstractChartEnity {

  private _shema = 'https://vega.github.io/schema/vega/v3.0.json';
  private _width: number = 0;
  private _height: number = 0;
  private _autoSize = 'fit';
  private _data: any;
  private _colorScheme = "tableau20";

  private _countElementName: string = '';
  private _colorElementName: string = '';

  public createChart() {
  }

  get shema(): string {
    return this._shema;
  }

  set shema(value: string) {
    this._shema = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get autoSize(): string {
    return this._autoSize;
  }

  set autoSize(value: string) {
    this._autoSize = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  get countElementName(): string {
    return this._countElementName;
  }

  set countElementName(value: string) {
    this._countElementName = value;
  }

  get colorElementName(): string {
    return this._colorElementName;
  }

  set colorElementName(value: string) {
    this._colorElementName = value;
  }

  get colorScheme(): string {
    return this._colorScheme;
  }

  set colorScheme(value: string) {
    this._colorScheme = value;
  }
}
