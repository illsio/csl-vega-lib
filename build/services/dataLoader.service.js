"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var DataLoaderService = /** @class */ (function () {
    function DataLoaderService(_http) {
        this._http = _http;
    }
    /*
    *   Request data from
    */
    DataLoaderService.prototype.getDataObservable = function (url) {
        console.log(url);
        return this._http.get(url)
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    DataLoaderService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    /*
    *   Testing
    */
    DataLoaderService.prototype.getPlain = function (JSONUrl) {
        return this._http.get(JSONUrl, { responseType: 'text' });
    };
    DataLoaderService.prototype.getPlainRequestTest = function (JSONUrl) {
        var encodedUri = encodeURIComponent(JSONUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getPlainResponse' + ("?jsonUrl=" + encodedUri));
    };
    DataLoaderService.prototype.getJsonTest = function (JSONUrl) {
        var encodedUri = encodeURIComponent(JSONUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + ("?jsonUrl=" + encodedUri));
    };
    DataLoaderService.prototype.getTextTest = function (textUrl) {
        var encodedUri = encodeURIComponent(textUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + ("?jsonUrl=" + encodedUri), { responseType: 'text' });
    };
    DataLoaderService.prototype.getPlainHeroku = function (url) {
        return this._http.get('https://cors-anywhere.herokuapp.com/' + url, { responseType: 'text' });
    };
    DataLoaderService.prototype.getContextUrl = function (currentUrl) {
        return currentUrl.indexOf('localhost') > -1 ? 'http://localhost:8080' : 'https://hub-backend.herokuapp.com';
    };
    /*
    *   Downloading files
    */
    DataLoaderService.prototype.getCSVData = function (csvUrl) {
        return this._http.get(csvUrl, { responseType: 'text' });
    };
    /*
    *   WFS Requests
    */
    DataLoaderService.prototype.getNumberOfFeatures = function (wfsUrl) {
        return this.getPlainHeroku('https://geodienste.hamburg.de/HH_WFS_Beteiligungsverfahren?service=WFS&version=1.1.0&request=GetFeature&typename=beteiligungsverfahren'
            + '&resultType=hits');
    };
    DataLoaderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataLoaderService);
    return DataLoaderService;
}());
exports.DataLoaderService = DataLoaderService;
//# sourceMappingURL=dataLoader.service.js.map