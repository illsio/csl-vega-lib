var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let DataLoaderService = class DataLoaderService {
    constructor(_http) {
        this._http = _http;
    }
    ngOnInit() {
    }
    /*
    *   Request data from
    */
    getDataObservable(url) {
        console.log(url);
        return this._http.get(url)
            .toPromise()
            .then(data => {
            return data;
        });
    }
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    /*
    *   Testing
    */
    getPlain(JSONUrl) {
        return this._http.get(JSONUrl, { responseType: 'text' });
    }
    getPlainRequestTest(JSONUrl) {
        let encodedUri = encodeURIComponent(JSONUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getPlainResponse' + `?jsonUrl=${encodedUri}`);
    }
    getJsonTest(JSONUrl) {
        let encodedUri = encodeURIComponent(JSONUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + `?jsonUrl=${encodedUri}`);
    }
    getTextTest(textUrl) {
        let encodedUri = encodeURIComponent(textUrl);
        return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + `?jsonUrl=${encodedUri}`, { responseType: 'text' });
    }
    getPlainHeroku(url) {
        return this._http.get('https://cors-anywhere.herokuapp.com/' + url, { responseType: 'text' });
    }
    getContextUrl(currentUrl) {
        return currentUrl.indexOf('localhost') > -1 ? 'http://localhost:8080' : 'https://hub-backend.herokuapp.com';
    }
    /*
    *   Downloading files
    */
    getCSVData(csvUrl) {
        return this._http.get(csvUrl, { responseType: 'text' });
    }
    /*
    *   WFS Requests
    */
    getNumberOfFeatures(wfsUrl) {
        return this.getPlainHeroku('https://geodienste.hamburg.de/HH_WFS_Beteiligungsverfahren?service=WFS&version=1.1.0&request=GetFeature&typename=beteiligungsverfahren'
            + '&resultType=hits');
    }
};
DataLoaderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], DataLoaderService);
export { DataLoaderService };
//# sourceMappingURL=dataLoader.service.js.map